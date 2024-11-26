import { useEffect, useState } from 'react';
import styles from '../../styles/cadeiras.disponiveis.module.css';
import SessaoService from "../../services/SessaoService.js";
import SalaService from "../../services/SalaService.js";  
import { useAssentoContext } from '../../contexts/AssentoContext';
import { useNavigate } from 'react-router-dom';

// eslint-disable-next-line react/prop-types
function Assentos({ id_sessao }) {
    const { selectedSeats, setSelectedSeats } = useAssentoContext();
    const [reservedSeats, setReservedSeats] = useState([]);
    const [salaName, setSalaName] = useState('');
    const [existingSeats, setExistingSeats] = useState([]);
    const [loading] = useState(false);
    const seatRows = 10; // Número total de linhas
    const seatColumns = 10; // Número total de colunas
    const navigate = useNavigate();

    useEffect(() => {
        const fetchRoomAndSessionData = async () => {
            if (id_sessao) {
                try {
                    const session = await SessaoService.getSessionById(id_sessao);
                    setSalaName(session.sala.nome);

                    const reserved = session.cadeirasReservadas.map(cadeira => ({
                        linha: cadeira.linha,
                        numero: cadeira.numero,
                    }));
                    setReservedSeats(reserved);

                    const room = await SalaService.getRoomById(session.sala.id);
                    const chairs = room.cadeiras.map(cadeira => ({
                        linha: cadeira.linha,
                        numero: cadeira.numero,
                    }));
                    setExistingSeats(chairs); // Assentos existentes na sala
                } catch (error) {
                    console.error("Erro ao carregar dados da sala e sessão:", error);
                }
            }
        };

        fetchRoomAndSessionData();
    }, [id_sessao]);

    const renderSeats = () => {
        let seats = [];
        for (let row = 1; row <= seatRows; row++) {
            for (let col = 1; col <= seatColumns; col++) {
                const seat = { linha: String.fromCharCode(64 + row), numero: col };
                const isReserved = reservedSeats.some(s => s.linha === seat.linha && s.numero === seat.numero);
                const isSelected = selectedSeats.some(s => s.linha === seat.linha && s.numero === seat.numero);
                const isExisting = existingSeats.some(s => s.linha === seat.linha && s.numero === seat.numero);

                seats.push(
                    <div
                        key={`${seat.linha}${seat.numero}`}
                        className={`${styles.seat}
                        ${isExisting ? '' : styles.inexistent} 
                        ${isReserved ? styles.reserved : ''} 
                        ${isSelected ? styles.selected : ''}`}
                        onClick={() => {
                            if (isExisting && !isReserved) {
                                toggleSeatSelection(seat.linha, seat.numero);
                            }
                        }}
                    >
                        {isExisting ? `${seat.linha}${seat.numero}` : ''}
                    </div>
                );
            }
        }
        return seats;
    };

    const toggleSeatSelection = (linha, numero) => {
        setSelectedSeats(prevSeats => {
            const seatIndex = prevSeats.findIndex(seat => seat.linha === linha && seat.numero === numero);
            if (seatIndex >= 0) {
                return prevSeats.filter(seat => seat.linha !== linha || seat.numero !== numero);
            } else {
                return [...prevSeats, { linha, numero }];
            }
        });
    };

        const handleSaveReservation = () => {
        if (selectedSeats.length > 0) {
            navigate('/compra-ingresso');
        } else {
            alert('Selecione ao menos um assento');
        }
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>{salaName}</h1>
            <div className={styles.layoutContainer}>
                <div className={styles.rowLabels}>
                    {Array.from({ length: seatRows }, (_, index) => (
                        <div key={index} className={styles.rowLabel}>
                            {String.fromCharCode(65 + index)}
                        </div>
                    ))}
                </div>
                <div className={styles.seatLayout}>
                    {renderSeats()}
                </div>
            </div>
            <div className={styles.tableRepresentation}>
                <p> Reservados 🟥 | Selecionados 🟩</p>
                <button
                    className={styles.submitButton}
                    disabled={loading}
                    onClick={handleSaveReservation}
                >
                    {loading ? 'Salvando...' : 'Salvar Reserva'}
                </button>
            </div>
        </div>
    );
}

export default Assentos;
