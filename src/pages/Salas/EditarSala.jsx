import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from '../../styles/criar.sala.module.css';
import SalaService from "../../services/SalaService.js";
import SalaRepository from "../../repositories/SalaRepository.js";

function EditarSala() {
    const { id_sala } = useParams();  // Pegando o parâmetro id_sala da URL
    const [selectedSeats, setSelectedSeats] = useState([]);  // Cadeiras selecionadas
    const [salaName, setSalaName] = useState('');
    const [salaType, setSalaType] = useState('');
    const [ativo, setAtivo] = useState(true);
    const [loading, setLoading] = useState(false);
    const seatRows = 10;  // Número de linhas de cadeiras
    const seatColumns = 10;  // Número de colunas de cadeiras
    const [roomTypes, setRoomTypes] = useState([]);

    // Função para alternar a seleção de cadeiras ou excluir se já estiver selecionada
    const toggleSeatSelection = (row, col) => {
        const seat = { linha: row, numero: col };
        const seatIndex = selectedSeats.findIndex(s => s.linha === seat.linha && s.numero === seat.numero);

        if (seatIndex > -1) {
            // Se a cadeira já está na seleção, perguntamos se o usuário deseja excluir
            const confirmDelete = window.confirm('Deseja excluir esta cadeira?');
            if (confirmDelete) {
                // Remove cadeira da seleção
                setSelectedSeats(prevSeats => prevSeats.filter(s => s.linha !== seat.linha || s.numero !== seat.numero));
            }
        } else {
            // Adiciona cadeira à seleção
            setSelectedSeats(prevSeats => [...prevSeats, seat]);
        }
    };

    // Carregar os tipos de sala
    useEffect(() => {
        const fetchRoomTypes = async () => {
            try {
                const types = await SalaRepository.getRoomTypes();
                setRoomTypes(types);
            } catch (error) {
                console.error("Erro ao carregar tipos de sala:", error);
            }
        };

        const fetchRoomData = async () => {
            if (id_sala) {
                try {
                    const room = await SalaRepository.getRoomById(id_sala);
                    setSalaName(room.nome_sala);
                    setSalaType(room.id_tipo_sala);
                    setAtivo(room.ativo);

                    // Carregando as cadeiras associadas à sala
                    const chairs = room.cadeiras.map(cadeira => ({
                        linha: cadeira.linha,
                        numero: cadeira.numero,
                    }));
                    setSelectedSeats(chairs);  // As cadeiras já cadastradas
                } catch (error) {
                    console.error("Erro ao carregar dados da sala:", error);
                }
            }
        };

        fetchRoomTypes();
        fetchRoomData();
    }, [id_sala]);

    // Função para salvar as alterações da sala
    const handleSaveRoom = async () => {
        setLoading(true);
        try {
            // Formatando as cadeiras para o formato esperado pelo backend
            const chairsData = selectedSeats.map(seat => ({
                linha: seat.linha,
                numero: seat.numero,
            }));

            const response = await SalaService.updateRoomWithChairs(id_sala, salaName, salaType, ativo, chairsData);

            if (response.success) {
                alert("Sala atualizada com sucesso!");
            } else {
                alert("Erro ao atualizar a sala");
            }
        } catch (error) {
            console.error("Erro:", error);
            alert("Erro ao salvar sala");
        } finally {
            setLoading(false);
        }
    };

    // Função para renderizar os assentos
    const renderSeats = () => {
        let seats = [];
        for (let row = 1; row <= seatRows; row++) {
            for (let col = 1; col <= seatColumns; col++) {
                const seat = { linha: String.fromCharCode(64 + row), numero: col };
                const isSelected = selectedSeats.some(s => s.linha === seat.linha && s.numero === seat.numero);
                seats.push(
                    <div
                        key={`${seat.linha}${seat.numero}`}
                        className={`${styles.seat} ${isSelected ? styles.selected : ''}`}
                        onClick={() => toggleSeatSelection(seat.linha, seat.numero)}
                    >
                        {isSelected ? `${seat.linha}${seat.numero}` : ''}
                    </div>
                );
            }
        }
        return seats;
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Editar Sala</h1>
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

export default EditarSala;
