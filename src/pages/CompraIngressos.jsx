import { useState, useEffect } from 'react';
import styles from '../styles/compra.ingresso.module.css'; 
import { useAssentoContext } from '../contexts/AssentoContext';

const CompraIngressos = () => {
  const { selectedSeats } = useAssentoContext(); // Obtém os assentos selecionados do contexto
  const ticketPrice = 30; // Preço do ingresso inteiro
  const meiaPrice = 25;   // Preço do ingresso meia

  const totalSelectedSeats = selectedSeats.length;  // Quantidade total de assentos selecionados

  const [inteiraCount, setInteiraCount] = useState(0);
  const [meiaCount, setMeiaCount] = useState(0);

  useEffect(() => {
    // Inicializa a contagem de Inteira e Meia para o número total de assentos selecionados
    if (totalSelectedSeats > 0) {
      setInteiraCount(0);
      setMeiaCount(0);
    }
  }, [totalSelectedSeats]); // Recalcula sempre que a quantidade de assentos selecionados mudar

  // Função para ajustar a quantidade de ingressos Inteira ou Meia
  const adjustTicketCount = (type, action) => {
    if (type === 'Inteira') {
      if (action === 'increment' && inteiraCount + meiaCount < totalSelectedSeats) {
        setInteiraCount(inteiraCount + 1); // Incrementa Inteira
      } else if (action === 'decrement' && inteiraCount > 0) {
        setInteiraCount(inteiraCount - 1); // Decrementa Inteira
      }
    } else if (type === 'Meia') {
      if (action === 'increment' && inteiraCount + meiaCount < totalSelectedSeats) {
        setMeiaCount(meiaCount + 1); // Incrementa Meia
      } else if (action === 'decrement' && meiaCount > 0) {
        setMeiaCount(meiaCount - 1); // Decrementa Meia
      }
    }
  };

  // Calcula o preço total com base na contagem de ingressos Inteira e Meia
  const totalPrice = (inteiraCount * ticketPrice) + (meiaCount * meiaPrice);

  // Formata os assentos selecionados em uma string de formato: A1, A2, A3, etc.
  const formattedSeats = selectedSeats.map(seat => `${seat.linha}${seat.numero}`).join(', ');

  return (
    <div className={styles.container}>
      <div className={styles.rightSection}>
        <div className={styles.sessionDetails}>
          <h2>Detalhes da Sessão</h2>
          <p><strong>Assentos Selecionados:</strong> {formattedSeats || 'Nenhum assento selecionado'}</p>
          <div className={styles.totalPrice}>
            <h3>Total</h3>
            <p>R$ {totalPrice.toFixed(2)}</p>
          </div>
        </div>
        <button className={styles.confirmButton}>Confirmar Compra</button>
      </div>

      <div className={styles.leftSection}>
        <h3>Tipos de Ingresso</h3>
        
        {/* Ingresso Inteira */}
        <div className={styles.ticketType}>
          <div className={styles.ticketCount}>
            <button 
              className={styles.decrementButton} 
              onClick={() => adjustTicketCount('Inteira', 'decrement')}
              disabled={inteiraCount <= 0}  // Desabilita se o número de Inteira for 0
            >
              -
            </button>
            <p>{inteiraCount} x Inteira</p>
            <button 
              className={styles.incrementButton} 
              onClick={() => adjustTicketCount('Inteira', 'increment')}
              disabled={inteiraCount + meiaCount >= totalSelectedSeats}  // Desabilita se ultrapassar o limite
            >
              +
            </button>
          </div>
        </div>
        
        {/* Ingresso Meia */}
        <div className={styles.ticketType}>
          <div className={styles.ticketCount}>
            <button 
              className={styles.decrementButton} 
              onClick={() => adjustTicketCount('Meia', 'decrement')}
              disabled={meiaCount <= 0}  // Desabilita se o número de Meia for 0
            >
              -
            </button>
            <p>{meiaCount} x Meia</p>
            <button 
              className={styles.incrementButton} 
              onClick={() => adjustTicketCount('Meia', 'increment')}
              disabled={inteiraCount + meiaCount >= totalSelectedSeats}  // Desabilita se ultrapassar o limite
            >
              +
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompraIngressos;
