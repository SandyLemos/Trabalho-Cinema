import styles from '../../styles/menu.module.css'
import logo from '../../assets/cinema_logo.png'
import { FaSearch, FaSpinner } from "react-icons/fa";
import { useState, useEffect } from "react";
import FilmesService from "../../services/FilmesService.js";
import { useNavigate } from 'react-router-dom';

function BarraMenu() {
    const [query, setQuery] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false); // Novo estado para verificar se o usuário está logado
    const navigate = useNavigate();

    // Verificar o token no localStorage
    useEffect(() => {
        const token = localStorage.getItem('token');
        setIsLoggedIn(!!token); // Se o token estiver presente, o usuário está logado
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!query.trim()) {
            return;
        }

        setLoading(true);
        setError('');

        try {
            const response = await FilmesService.getFilmsByTitle(query);

            if (Array.isArray(response.films) && response.success && response) {
                const films = response.films;
                navigate(`/search?title=${encodeURIComponent(query)}`, { state: { films } });
            }
        } catch (err) {
            setError(err.message || 'Erro desconhecido ao buscar filmes');
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (event) => {
        setQuery(event.target.value);
    };

    const handleLogout = () => {
        localStorage.removeItem('token'); // Remove o token
        setIsLoggedIn(false); // Atualiza o estado
        navigate('/');
    };

    return (
        <div className={styles.menu}>
            <div id={styles.logo}>
                <img
                    src={logo}
                    alt="logo"
                    style={{height: '80%', width: '100%', paddingTop: '4px'}}
                    tabIndex={0}
                    onClick={() => navigate('/')}
                />
            </div>

            <div>
                <form onSubmit={handleSubmit}>
                    <div className={styles.searchWrapper}>
                        <input
                            type="search"
                            id={styles.pesquisa}
                            value={query}
                            onChange={handleChange}
                            placeholder="Pesquisar Filme"
                        />
                        <button type="submit" className={styles.searchButton}>
                            {loading ? <FaSpinner className={styles.spinner} /> : <FaSearch className={styles.searchIcon} />}
                        </button>
                    </div>
                </form>
            </div>

            <div className={styles.p_botao}>
                <button className={styles.botao} onClick={() => navigate('/')}> Menu </button>
                <button className={styles.botao}> Filmes </button>
                <button className={styles.botao}> Programação </button>
            </div>

            <div className={styles.p_botao2}>
                {isLoggedIn ? (
                    <>
                        <button className={styles.botao2} onClick={() => navigate('/perfil')}> Perfil </button>
                        <button className={styles.botao2} onClick={handleLogout}> Sair </button>
                    </>
                ) : (
                    <>
                        <button className={styles.botao2} onClick={() => navigate('/entrar')}> Entrar </button>
                        <button className={styles.botao2} onClick={() => navigate('/registrar')}> Cadastrar </button>
                    </>
                )}
            </div>
        </div>
    );
}

export default BarraMenu;
