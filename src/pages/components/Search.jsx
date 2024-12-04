import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import filmes from "../../services/FilmesService.js";
import styles from "../../styles/tela.principal.module.css";
const Search = () => {
    const location = useLocation();
    const [films, setFilms] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const query = new URLSearchParams(location.search).get('title');

    useEffect(() => {
        const fetchFilms = async () => {
            if (location.state && location.state.films) {
                setFilms(location.state.films);
            }
            else if (location.state && location.state.error) {
                setError(location.state.error);
            }
            else if (query) {
                setLoading(true);
                setError('');
                try {
                    const response = await filmes.getFilmsByTitle(query);
                    if (response.films.length > 0 && Array.isArray(response.films) && response.success) {
                        setFilms(response.films);
                    } else {
                        setError('Nenhum filme encontrado.');
                    }
                } catch (err) {
                    setError('Erro ao buscar filmes');
                } finally {
                    setLoading(false);
                }
            }
        };

        fetchFilms();
    }, [location, query]);

    return (
        <div className={styles.area_filmes}>
            <h1>Resultados da Pesquisa</h1>
            {loading && <p>Carregando...</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {films.length > 0 ? (
                <div className={styles.filmes_principais}>
                    <div className={styles.carrossel_conteudo}>
                        {films.map((film) => (
                            <div key={film.id_filme} className={styles.filme_cartaz}>
                                <div className={styles.parte_imagem}>
                                    <img src={film.poster_path} alt={film.titulo} />
                                </div>
                                <div className={styles.parte_info}>
                                    <h4>{film.titulo}</h4>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                !loading && !error && <p>Nenhum filme encontrado.</p>
            )}
        </div>
    );
};

export default Search;
