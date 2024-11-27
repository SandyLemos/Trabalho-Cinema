import { useEffect, useState } from 'react';
import SalaService from '../../services/SalaService.js'; 
import styles from "../../styles/listar.salas.module.css";
import {useNavigate} from "react-router-dom";

const ListarSalas = () => {
    const [rooms, setRooms] = useState([]);
    const navigate = useNavigate();

    // Função para carregar as salas
    const loadRooms = async () => {
        try {
            const roomList = await SalaService.getRooms(); 
            setRooms(roomList);
        } catch (error) {
            console.error("Erro ao carregar salas:", error);
        }
    };

    // Carrega as salas assim que o componente for montado
    useEffect(() => {
        loadRooms();
    }, []);

    // Funções para editar e deletar
    const handleEdit = (id) => {
        navigate(`/editar-sala/${id}`);
    };

    const handleDelete = (id) => {
        const confirmDelete = window.confirm("Tem certeza que deseja deletar esta sala?");

        if (confirmDelete) {
            console.log("Deletando sala com ID:", id);
            SalaService.deleteRoom(id)
                .then(() => {
                    setRooms(rooms.filter(room => room.id_sala !== id));
                    alert("Sala deletada com sucesso!");
                })
                .catch(error => {
                    console.error("Erro ao deletar sala:", error);
                    alert("Erro ao deletar sala.");
                });
        }
    };

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Lista de Salas</h2>
            <div className={styles.layoutContainer}>
                {rooms.map((room) => (
                    <div key={room.id_sala} className={styles.roomItem}>
                        <div className={styles.roomDetails}>
                            <p><strong>Nome:</strong> {room.nome_sala}</p>
                            <p><strong>Capacidade:</strong> {room.capacidade}</p>
                            <p><strong>Ativo:</strong> {room.ativo ? "Sim" : "Não"}</p>
                        </div>
                        <div className={styles.roomActions}>
                            <button className={styles.actionButton} onClick={() => handleEdit(room.id_sala)}>
                                Editar
                            </button>
                            <button className={styles.actionButton} onClick={() => handleDelete(room.id_sala)}>
                                Deletar
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ListarSalas;
