import {useEffect, useState} from 'react';
import styles from '../../styles/criar.sala.module.css';
import axios from 'axios';
import SalaRepository from "../../repositories/SalaRepository.js";
import SalaService from "../../services/SalaService.js";

function CriarSala() {
    const [selectedSeats, setSelectedSeats] = useState([]);  // Armazena os assentos selecionados
    const [salaName, setSalaName] = useState('');  // Nome da sala
    const [salaType, setSalaType] = useState('');  // Tipo da sala
    const [ativo, setAtivo] = useState(true);  // Sala ativa
    const [loading, setLoading] = useState(false);  // Carregando
    const seatRows = 10; // Número de linhas
    const seatColumns = 10; // Número de colunas
    const [roomTypes, setRoomTypes] = useState([]);

    // Função que alterna a seleção de um assento
    const toggleSeatSelection = (row, col) => {
        const seat = `${String.fromCharCode(64 + row)}${col}`;
        setSelectedSeats(prevSeats =>
            prevSeats.includes(seat)
                ? prevSeats.filter(s => s !== seat)
                : [...prevSeats, seat]
        );
    };


    useEffect(() => {
        // Função para carregar os tipos de sala quando o componente for montado
        const fetchRoomTypes = async () => {
            try {
                const types = await SalaRepository.getRoomTypes();
                setRoomTypes(types);
            } catch (error) {
                console.error("Erro ao carregar tipos de sala:", error);
            }
        };

        fetchRoomTypes();
    }, []);

    const handleSaveRoom = async () => {
        setLoading(true);
        try {
            const chairsData = selectedSeats.map(seat => {
                const row = seat.charAt(0); // Letra da linha
                const col = seat.slice(1); // Número da coluna
                return { linha: row, numero: parseInt(col, 10) };
            });

            // Criar sala e adicionar cadeiras em sequência
            const response = await SalaService.createRoomWithChairs(salaName, salaType, ativo, chairsData);

            if (response.success) {
                alert("Sala criada e cadeiras adicionadas com sucesso!");
            } else {
                alert("Erro ao adicionar cadeiras");
            }
        } catch (error) {
            console.error("Erro:", error);
            alert("Erro ao salvar sala");
        } finally {
            setLoading(false);
        }
    };

    const renderSeats = () => {
        let seats = [];
        for (let row = 1; row <= seatRows; row++) {
            for (let col = 1; col <= seatColumns; col++) {
                const seat = `${String.fromCharCode(64 + row)}${col}`; // Gera as letras (A, B, C...)
                const isSelected = selectedSeats.includes(seat);
                seats.push(
                    <div
                        key={seat}
                        className={`${styles.seat} ${isSelected ? styles.selected : ''}`}
                        onClick={() => toggleSeatSelection(row, col)}
                    >
                        {isSelected ? `${String.fromCharCode(64 + row)}${col}` : ''}
                    </div>
                );
            }
        }
        return seats;
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Criar Sala</h1>
            <form className={styles.form}>
                <div className={styles.formGroup}>
                    <input
                        type="text"
                        id="salaName"
                        value={salaName}
                        onChange={(e) => setSalaName(e.target.value)}
                        placeholder="Digite o nome da sala"
                        className={styles.inputField}
                    />
                </div>
                <div className={styles.formGroup}>
                    <select
                        id="salaType"
                        value={salaType}
                        onChange={(e) => setSalaType(e.target.value)}
                        className={styles.inputField}
                    >
                        <option value="">Selecione o tipo de sala</option>
                        {roomTypes.map((type) => (
                            <option key={type.id_tipo_sala} value={type.id_tipo_sala}>
                                {type.descricao}
                            </option>
                        ))}
                    </select>
                </div>
            </form>
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
                <h3>Teste</h3>
                <p>Legenda: Assentos selecionados estão em roxo.</p>
                <button
                    className={styles.submitButton}
                    onClick={handleSaveRoom}
                    disabled={loading}
                >
                    {loading ? 'Salvando...' : 'Salvar Sala'}
                </button>
            </div>
        </div>
    );
}

export default CriarSala;
