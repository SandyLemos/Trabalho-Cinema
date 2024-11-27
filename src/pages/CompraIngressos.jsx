import { useState, useEffect } from 'react';
import styles from '../styles/compra.ingresso.module.css'; 
import { useLocation } from 'react-router-dom';
import IngressoService from '../services/IngressoService'; 
import ReservaService from '../repositories/IngressoRepository'; // Certifique-se de que tem um serviço de reserva
import { useNavigate } from 'react-router-dom'
const CompraIngressos = () => {
  const location = useLocation(); // Usando o hook useLocation para acessar os dados passados pela navegação
  const { selectedSeats, id_sessao } = location.state || { selectedSeats: [], id_sessao: null }; // Pegando os dados da navegação
  const [ticketPrices, setTicketPrices] = useState([]);
  const [ticketTypes, setTicketTypes] = useState([]);
  const [filteredPrices, setFilteredPrices] = useState([]);
  const [inteiraCount, setInteiraCount] = useState(0);
  const [meiaCount, setMeiaCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [reservationLoading, setReservationLoading] = useState(false); // Estado para controlar o loading da reserva
  const [error, setError] = useState(null); // Estado para erro de reserva
  const [selectedTicketType, setSelectedTicketType] = useState(null); // Armazena o tipo de ingresso selecionado
  const navigate = useNavigate();
  const totalSelectedSeats = selectedSeats.length;  // Quantidade total de assentos selecionados

  // Função para pegar todos os preços de ingressos
  const getTicketPrice = async () => {
    try {
      const prices = await IngressoService.getAllTickePrice();
      return prices || [];
    } catch (error) {
      console.error('Erro ao buscar os preços dos ingressos:', error);
      return [];
    }
  };

  // Função para pegar todos os tipos de ingressos
  const getTicketType = async () => {
    try {
      const types = await IngressoService.getAllTicketType(); 
      return types.ticketType || [];
    } catch (error) {
      console.error('Erro ao buscar os tipos de ingressos:', error);
      return [];
    }
  };

  // Função para filtrar os preços baseados no id_sessao
  const getFilteredPrices = async () => {
    setLoading(true);
    try {
      const prices = await getTicketPrice(); // Pega todos os preços
      const types = await getTicketType();   // Pega todos os tipos de ingressos

      // Filtra os preços para pegar apenas os que correspondem ao id_sessao
      const filteredPrices = prices.filter(price => price.id_sessao === id_sessao);

      // Mapeia os preços filtrados com os tipos de ingresso
      const pricesWithTypes = filteredPrices.map(price => {
        const ticketType = types.find(type => type.id_tipo === price.id_tipo);
        return {
          ...price,
          descricao: ticketType ? ticketType.descricao : 'Desconhecido',
        };
      });

      // Atualiza o estado com os preços filtrados e mapeados
      setFilteredPrices(pricesWithTypes);
      setTicketTypes(types); // Armazena os tipos de ingresso disponíveis
    } catch (error) {
      console.error('Erro ao buscar os preços filtrados:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id_sessao) {
      getFilteredPrices(); // Carrega os preços filtrados assim que a sessão é selecionada
    }
  }, [id_sessao]);

const createReservation = async () => {
 setReservationLoading(true);
 setError(null);
 
 try {
   // Verifica se há assentos selecionados
   if (selectedSeats.length === 0) {
     throw new Error("Nenhum assento selecionado");
   }

   const chairsData = selectedSeats.map((seat, index) => ({
     id_cadeira: seat.id,
     id_tipo_ingresso: index < inteiraCount ? 1 : 2
   }));

   const reservationPayload = {
     id_sessao,
     Cadeiras: chairsData
   };

   const response = await ReservaService.createReservation(id_sessao, reservationPayload);

   if (response.success) {
     alert('Reserva criada com sucesso!');
     
     navigate('/perfil');

     setInteiraCount(0);
     setMeiaCount(0);
     setSelectedTicketType(null);
   } else {
     throw new Error("Erro ao criar a reserva.");
   }
 } catch (error) {
   console.error('Erro ao criar a reserva:', error);
   setError("Ocorreu um erro ao criar a reserva. Tente novamente.");
 } finally {
   setReservationLoading(false);
 }
};






  // Calcula o preço total com base na contagem de ingressos Inteira e Meia
  const totalPrice = () => {
    const inteiraPrice = filteredPrices.find(price => price.id_tipo === 1)?.preco || 30;
    const meiaPrice = filteredPrices.find(price => price.id_tipo === 2)?.preco || 25;
    
    return (inteiraCount * inteiraPrice) + (meiaCount * meiaPrice);
  };

  // Função para ajustar a quantidade de ingressos Inteira ou Meia
  const adjustTicketCount = (type, action) => {
    if (action === 'increment' && inteiraCount + meiaCount < totalSelectedSeats) {
      if (type === 'Inteira') {
        setInteiraCount(inteiraCount + 1); // Incrementa Inteira
        setSelectedTicketType('Inteira'); // Marca o tipo de ingresso selecionado como Inteira
      } else if (type === 'Meia') {
        setMeiaCount(meiaCount + 1); // Incrementa Meia
        setSelectedTicketType('Meia'); // Marca o tipo de ingresso selecionado como Meia
      }
    } else if (action === 'decrement') {
      if (type === 'Inteira' && inteiraCount > 0) {
        setInteiraCount(inteiraCount - 1); // Decrementa Inteira
      } else if (type === 'Meia' && meiaCount > 0) {
        setMeiaCount(meiaCount - 1); // Decrementa Meia
      }
    }
  };

  if (loading) {
    return <div>Carregando...</div>; // Exibe mensagem enquanto os dados são carregados
  }

  return (
    <div className={styles.container}>
      <div className={styles.rightSection}>
        <div className={styles.sessionDetails}>
          <h2>Detalhes da Sessão</h2>
          <p><strong>Assentos Selecionados:</strong> {selectedSeats.length ? selectedSeats.map(seat => `${seat.linha}${seat.numero}`).join(', ') : 'Nenhum assento selecionado'}</p>
          <div className={styles.totalPrice}>
            <h3>Total</h3>
            <p>R$ {totalPrice().toFixed(2)}</p>
          </div>
        </div>
        <button 
          className={styles.confirmButton}
          onClick={createReservation}
          disabled={reservationLoading} // Desabilita enquanto a reserva está sendo criada
        >
          {reservationLoading ? 'Confirmando...' : 'Confirmar Compra'}
        </button>
        {error && <p className={styles.errorMessage}>{error}</p>} {/* Exibe erro, se houver */}
      </div>

      <div className={styles.leftSection}>
        <h3>Tipos de Ingresso</h3>
        {filteredPrices.map(price => (
          <div className={styles.ticketType} key={price.id_tipo}>
            <div className={styles.ticketCount}>
              <button 
                className={styles.decrementButton} 
                onClick={() => adjustTicketCount(price.descricao, 'decrement')}
                disabled={price.descricao === 'Inteira' ? inteiraCount <= 0 : meiaCount <= 0} // Desabilita se o número for 0
              >
                -
              </button>
              <p>{price.descricao} - R$ {Number(price.preco).toFixed(2)}</p>
              <button 
                className={styles.incrementButton} 
                onClick={() => adjustTicketCount(price.descricao, 'increment')}
                disabled={inteiraCount + meiaCount >= totalSelectedSeats} // Desabilita se ultrapassar o limite de assentos
              >
                +
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CompraIngressos;
