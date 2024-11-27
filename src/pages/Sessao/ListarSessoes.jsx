import { useEffect, useState } from 'react';
import SessaoService from '../../services/SessaoService.js';  
import styles from "../../styles/listar.sessoes.module.css";
import { useNavigate } from "react-router-dom";

const ListarSessoes = () => {
    const [sessions, setSessions] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const loadSessions = async () => {
        try {
            const films = await SessaoService.getSesionsCreated();
            console.log("Dados recebidos da API:", films);
            if (Array.isArray(films)) {
                setSessions(films);
            } else {
                throw new Error("Formato de resposta inesperado");
            }
        } catch (error) {
            console.error("Erro ao carregar sessões:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadSessions();
    }, []);

    const handleEdit = (id) => {
        navigate(`/editar-sessao/${id}`);
    };

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("Tem certeza que deseja deletar esta sessão?");
        if (confirmDelete) {
            try {
                const result = await SessaoService.deleteSession(parseInt(id));
                console.log(result);

                setSessions(prevSessions => 
                    prevSessions.map(film => {
                        if (film.sessoes) {
                            film.sessoes = film.sessoes.filter(session => session.id_sessao !== id);
                        }
                        return film;
                    })
                );

                alert("Sessão deletada com sucesso!");
            } catch (error) {
                alert("Erro ao deletar a sessão: " + error.message);
            }
        }
    };

    if (loading) {
        return <div>Carregando...</div>;
    }

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Lista de Sessões</h2>
            <div className={styles.layoutContainer}>
                {sessions && sessions.length > 0 ? (
                    sessions.map((film) => (
                        <div key={film.id} className={styles.sessaoItem}>
                            <h3>{film.titulo}</h3>
                            {film.sessoes && film.sessoes.length > 0 ? (
                                film.sessoes.map((session) => (
                                    <div key={session.id_sessao} className={styles.sessaoInfo}>
                                        <p><strong>Filme:</strong> {film.titulo}</p>
                                        <p><strong>Sala:</strong> {session.sala}</p>
                                        <p><strong>Data:</strong> {new Date(session.data_sessao).toLocaleDateString("pt-BR")}</p>
                                        <p><strong>Horário:</strong> {new Date(session.data_sessao).toLocaleTimeString("pt-BR")}</p>
                                        <div className={styles.sessaoActions}>
                                            <button className={styles.actionButton} onClick={() => handleEdit(session.id_sessao)}>
                                                Editar
                                            </button>
                                            <button className={styles.actionButton} onClick={() => handleDelete(session.id_sessao)}>
                                                Deletar
                                            </button>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p><strong>Sem sessões disponíveis</strong></p>
                            )}
                        </div>
                    ))
                ) : (
                    <p>Não há filmes ou sessões para exibir.</p>
                )}
            </div>
        </div>
    );
};

export default ListarSessoes;
