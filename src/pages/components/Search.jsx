import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import filmes from "../../services/FilmesService.js";

const Search = () => {
    const location = useLocation();
    const [films, setFilms] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    // Pegando o parâmetro 'title' da URL
    const query = new URLSearchParams(location.search).get('title');

    useEffect(() => {
        const fetchFilms = async () => {
            // Se filmes foram passados através da navegação (state)
            if (location.state && location.state.films) {
                setFilms(location.state.films);
            }
            // Se houve erro na navegação anterior (state.error)
            else if (location.state && location.state.error) {
                setError(location.state.error);
            }
            // Caso contrário, realiza a busca com base no título na URL
            else if (query) {
                setLoading(true);
                setError(''); // Limpa erro anterior
                try {
                    const response = await filmes.getFilmsByTitle(query);
                    if (response && response.success && Array.isArray(response.films) && response.films.length > 0) {
                        setFilms(response.films); // Atualiza a lista de filmes
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
        <div>
            <h1>Resultados da Pesquisa</h1>
            {loading && <p>Carregando...</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {films.length > 0 ? (
                <ul>
                    {films.map((film) => (
                        <li key={film.id_filme}>
                            <h2>{film.titulo}</h2>
                            <img src={film.poster_path} alt={film.titulo} />
                            <p>{film.sinopse}</p>
                            <p>Classificação: {film.classificacao_etaria}</p>
                        </li>
                    ))}
                </ul>
            ) : (
                !loading && !error && <p>Nenhum filme encontrado.</p>
            )}
        </div>
    );
};

export default Search;
