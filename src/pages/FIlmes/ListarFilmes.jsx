import { useEffect, useState } from 'react';
import FilmesService from '../../services/FilmesService.js'; 
import styles from "../../styles/listar.filmes.module.css";
import { useNavigate } from "react-router-dom";

const ListarFilmes = () => {
    const [films, setFilms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    // Função para carregar os filmes
    const loadFilms = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await FilmesService.getAllFilms();
            setFilms(response.films || []);
        } catch (error) {
            console.error("Erro ao carregar filmes:", error.message);
            setError("Não foi possível carregar os filmes. Tente novamente mais tarde.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadFilms();
    }, []);

    // Funções para editar e deletar
    const handleEdit = (id) => {
        navigate(`/editar-filme/${id}`);
    };

    const handleDelete = (id) => {
        const confirmDelete = window.confirm("Tem certeza que deseja deletar este filme?");

        if (confirmDelete) {
            FilmesService.deleteFilm(id)
                .then(() => {
                    setFilms(films.filter(film => film.id_filme !== id));
                    alert("Filme deletado com sucesso!");
                })
                .catch(error => {
                    console.error("Erro ao deletar filme:", error);
                    alert("Erro ao deletar filme.");
                });
        }
    };

    // Função para formatar data
    const formatDate = (dateString) => {
        return new Intl.DateTimeFormat("pt-BR", {
            year: "numeric",
            month: "long",
            day: "2-digit",
        }).format(new Date(dateString));
    };

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Lista de Filmes</h2>
            <div className={styles.layoutContainer}>
                {films.map((film) => (
                    <div key={film.id_filme} className={styles.filmItem}>
                        <div className={styles.filmDetails}>
                            <p><strong>Título:</strong> {film.titulo}</p>
                            <p><strong>Gêneros:</strong> {film.generos.map(g => g.nome_genero).join(", ")}</p>
                            <p><strong>Lançamento:</strong> {formatDate(film.data_lancamento)}</p>
                        </div>
                        <div className={styles.filmActions}>
                            <button className={styles.actionButton} onClick={() => handleEdit(film.id_filme)}>
                                Editar
                            </button>
                            <button className={styles.actionButton} onClick={() => handleDelete(film.id_filme)}>
                                Deletar
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ListarFilmes;
