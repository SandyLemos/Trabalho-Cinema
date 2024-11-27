import { useState, useEffect } from 'react';
import axios from 'axios';
import styles from '../styles/tela.usuario.module.css'; // Importe o arquivo CSS

const UserReservations = () => {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Função para buscar as reservas do usuário
  const fetchReservations = async () => {
    try {
      const token = localStorage.getItem("token"); // Adapte para seu mecanismo de autenticação
      const response = await axios.get(
        'https://roasted-haley-cinema-tech-02703ea5.koyeb.app/v1/bookings/user/all-my-user',
        {
          headers: {
            Authorization: `Bearer ${token}`, // Certifique-se de enviar o token se necessário
          },
        }
      );

      if (response.data.success) {
        setReservations(response.data.bookings);
      } else {
        setError('Erro ao carregar as reservas');
      }
    } catch (error) {
      setError('Erro ao buscar as reservas. Tente novamente.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReservations();
  }, []); // Chama a função assim que o componente for montado

  if (loading) {
    return <div className={styles.loading}>Carregando suas reservas...</div>;
  }

  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Minhas Reservas</h2>
      <div className={styles.reservationList}>
        {reservations.length === 0 ? (
          <p className={styles.noReservations}>Você não tem reservas feitas.</p>
        ) : (
          <ul>
            {reservations.map((reservation) => (
              <li key={reservation.id_reserva} className={styles.reservationItem}>
                <h3 className={styles.reservationTitle}>Reserva #{reservation.id_reserva}</h3>
                <p><strong>Sessão:</strong> {reservation.id_sessao}</p>
                <p><strong>Status:</strong> <span className={styles.status}>{reservation.status}</span></p>
                <p><strong>Total:</strong> R$ {parseFloat(reservation.total).toFixed(2)}</p>
                <div>
                  <strong>Cadeiras:</strong>
                  <ul>
                    {reservation.cadeiras.map((cadeira, index) => (
                      <li key={index} className={styles.seatInfo}>
                        Linha {cadeira.linha} - Número {cadeira.numero} ({cadeira.tipo_ingresso})
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default UserReservations;
