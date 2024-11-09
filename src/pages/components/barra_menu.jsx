import styles from '../../styles/menu.module.css'
import logo from '../../assets/cinema_logo.png'
import {FaSearch, FaSpinner} from "react-icons/fa";
import {useState} from "react";
import FilmesService from "../../services/FilmesService.js";
import { useNavigate } from 'react-router-dom';

function Barra_menu() {
    const [query, setQuery] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Verifica se há algo digitado no campo de pesquisa
        if (!query.trim()) {
            return;
        }

        setLoading(true);
        setError('');

        try {
            // Chama a API para buscar filmes
            const response = await FilmesService.getFilmsByTitle(query);

            if (response && response.success && Array.isArray(response.films)) {
                const films = response.films;
                // Navega para a página de resultados, passando os filmes
                navigate(`/search?title=${encodeURIComponent(query)}`, { state: { films } });
            }
        } catch (err) {
            setError(err.message || 'Erro desconhecido ao buscar filmes');
        } finally {
            setLoading(false);
        }
    };

    // Função para lidar com mudanças no campo de pesquisa
    const handleChange = (event) => {
        setQuery(event.target.value);
    };


    return (
        <div className={styles.menu}>
            {/* Div Responsavel pela Logo*/}
            <div id={styles.logo}>
                <img src={logo} alt="logo" style={{height:'80%',width:'100%', paddingTop:'4px', }}/>
            </div>

            {/* Div Responsavel pelo campo de pesquisa*/}
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
                            {loading ? <FaSpinner className={styles.spinner}/> : <FaSearch className={styles.searchIcon}/>}
                        </button>
                    </div>
                </form>
            </div>

            <div className={styles.p_botao}>
                <button className={styles.botao}> Menu </button>
                <button className={styles.botao}> Filmes </button>
                <button className={styles.botao} style={{width:'8.5rem'}}> Programação </button>
            </div>

            <div className={styles.p_botao2}>
                <button className={styles.botao2}> Entrar </button>
                <button className={styles.botao2} style={{width:'8rem'}}> Cadastrar </button>
            </div>

        </div>
    );
}

export default Barra_menu;
