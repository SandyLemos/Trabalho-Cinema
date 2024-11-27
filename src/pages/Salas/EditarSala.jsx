import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from '../../styles/criar.sala.module.css';
import SalaService from "../../services/SalaService.js";
import SalaRepository from "../../repositories/SalaRepository.js";

function EditarSala() {
    const { id_sala } = useParams();
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [salaName, setSalaName] = useState('');
    const [salaType, setSalaType] = useState('');
    const [setAtivo] = useState(true);
    const [loading, setLoading] = useState(false);
    const seatRows = 10;
    const seatColumns = 10;
    const [roomTypes, setRoomTypes] = useState([]);

    const toggleSeatSelection = (row, col) => {
        const existingSeat = selectedSeats.find(s => s.linha === row && s.numero === col);

        if (existingSeat) {
            const confirmDelete = window.confirm('Deseja excluir esta cadeira?');
            if (confirmDelete) {
                handleRemoveSeat(existingSeat);  // Remover cadeira
            }
        } else {
            const confirmAdd = window.confirm('Deseja adicionar esta cadeira?');
            if (confirmAdd) {
                handleAddSeat(row, col);
            }
        }
    };

    const handleAddSeat = async (row, col) => {
        const seat = { linha: row, numero: col, id_cadeira: null }; 

        setLoading(true);
        try {
            const chairsData = [
                {
                    linha: row,
                    numero: col,
                }
            ];

            const response = await SalaService.addChairsToRoom(id_sala, chairsData);
            console.log("Resposta do backend:", response);

            if (response.success) {
                const newChair = response.results[0].newChair;

                seat.id_cadeira = newChair.id_cadeira;

                setSelectedSeats(prevSeats => [...prevSeats, seat]);

                alert("Cadeira adicionada com sucesso!");
            } else {
                alert("Erro ao adicionar cadeira.");
            }
        } catch (error) {
            console.error("Erro ao adicionar cadeira:", error);
            alert("Erro ao adicionar cadeira.");
        } finally {
            setLoading(false);
        }
    };


    // Função para remover cadeira da seleção
    const handleRemoveSeat = async (seat) => {
        if (!seat.id_cadeira) {
            // Se a cadeira não tem id, apenas remove da seleção local (sem interagir com a API)
            setSelectedSeats(prevSeats => prevSeats.filter(s => s.linha !== seat.linha || s.numero !== seat.numero));
            alert("Cadeira removida da seleção (não foi cadastrada no banco).");
            return;
        }

        setLoading(true);
        try {
            // Enviando a requisição para remover a cadeira
            const response = await SalaService.removeChairFromRoom(seat.id_cadeira);

            // Verificando se a resposta da API indica sucesso
            if (response.success) {
                // A resposta indica sucesso, então removemos a cadeira localmente
                setSelectedSeats(prevSeats => prevSeats.filter(s => s.id_cadeira !== seat.id_cadeira));
                alert("Cadeira removida com sucesso!");
            } else {
                // Se não houver sucesso, mostramos uma mensagem de erro
                alert("Erro ao remover cadeira: " + response.msg || "Erro desconhecido.");
            }
        } catch (error) {
            // Se ocorrer algum erro durante a requisição
            console.error("Erro ao remover cadeira:", error);
            alert("Erro ao remover cadeira.");
        } finally {
            setLoading(false);
        }
    };

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

                    // Mapeia as cadeiras com seus dados (id_cadeira ou null)
                    const chairs = room.cadeiras.map(cadeira => ({
                        id_cadeira: cadeira.id_cadeira || null, // Se não tiver id, coloca null
                        linha: cadeira.linha,
                        numero: cadeira.numero,
                    }));
                    setSelectedSeats(chairs);
                } catch (error) {
                    console.error("Erro ao carregar dados da sala:", error);
                }
            }
        };

        fetchRoomTypes();
        fetchRoomData();
    }, [id_sala]);

    const renderSeats = () => {
        let seats = [];
        for (let row = 1; row <= seatRows; row++) {
            for (let col = 1; col <= seatColumns; col++) {
                const seat = { linha: String.fromCharCode(64 + row), numero: col };

                // Verifique se a cadeira já foi selecionada
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

    const handleSaveRoom = async () => {};

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
