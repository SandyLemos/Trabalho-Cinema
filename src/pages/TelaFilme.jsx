import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styles from '../styles/tela.filmes.module.css';
import BarraMenu from './components/BarraMenu';
import SessionService from '../services/SessaoService.js';
import { FaHourglass } from "react-icons/fa";

function TelaFilme() {
    const { id, slug } = useParams();
    const navigate = useNavigate();
    const [filme, setFilme] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedSala, setSelectedSala] = useState('');
    const [selectedData, setSelectedData] = useState('');
    const [selectedHora, setSelectedHora] = useState('');
    const [salasDisponiveis, setSalasDisponiveis] = useState([]);
    const [datasDisponiveis, setDatasDisponiveis] = useState([]);
    const [horasDisponiveis, setHorasDisponiveis] = useState([]);

    useEffect(() => {
        async function fetchFilme() {
            try {
                const data = await SessionService.getSessionByFilmId(parseInt(id));

                if (!data) {
                    throw new Error('Filme não encontrado');
                }

                setFilme(data);
                setError(null);
            } catch (error) {
                console.error('Erro ao buscar informações do filme:', error);
                setError(error.message || 'Erro ao carregar o filme');
            } finally {
                setLoading(false);
            }
        }

        fetchFilme(); // Chama a função de buscar o filme quando o componente for montado
    }, [id]); // O useEffect vai ser executado toda vez que o 'id' mudar

    useEffect(() => {
        if (filme?.sessoes) {
            // Preenche as datas disponíveis a partir das sessões
            const datas = [...new Set(filme.sessoes.map(sessao => sessao.date))];
            setDatasDisponiveis(datas);
        }
    }, [filme]);

    useEffect(() => {
        if (filme?.sessoes && selectedData) {
            // Filtra as horas disponíveis conforme a data selecionada
            const sessoesDaData = filme.sessoes.filter(sessao => sessao.date === selectedData);
            const horas = [...new Set(sessoesDaData.flatMap(sessao => sessao.times))];
            setHorasDisponiveis(horas);
            setSelectedHora(''); // Resetando a hora quando mudar a data
            setSelectedSala(''); // Resetando a sala quando mudar a data
        }
    }, [selectedData, filme]);

    useEffect(() => {
        if (filme?.sessoes && selectedData && selectedHora) {
            // Filtra as salas disponíveis conforme a data e hora selecionadas
            const sessoesDaDataEHora = filme.sessoes.filter(
                (sessao) => sessao.date === selectedData && sessao.times.includes(selectedHora)
            );
            const salas = [...new Set(sessoesDaDataEHora.map(sessao => sessao.sala))];
            setSalasDisponiveis(salas);
        }
    }, [selectedHora, selectedData, filme]);

    if (loading) {
        return (
            <div className={styles.centralizar}>
                <div className={styles.spinner}></div>
                <p>Carregando informações do filme...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className={styles.centralizar}>
                <h2>Erro ao carregar o filme</h2>
                <p>{error}</p>
                <button onClick={() => navigate('/')}>Voltar para página inicial</button>
            </div>
        );
    }

    return (
            <div id={styles.centralizar} className={styles.divs}>
                <div id={styles.info} className={styles.divs}>
                    <div id={styles.info_imagem}>
                        <img src={filme?.poster || ""} alt={filme?.titulo || "Filme"} id={styles.imagem} />
                    </div>

                    <div id={styles.info_descricao}>
                        <h1 style={{ fontSize: '40px' }}>{filme?.titulo || 'Filme'}</h1>
                        <div id={styles.classificadores}>
                            {filme?.generos && filme.generos.length > 0 ? (
                                filme.generos.map((genero, index) => (
                                    <div key={index} className={styles.blocos_c}>
                                        {genero}
                                    </div>
                                ))
                            ) : (
                                <div className={styles.blocos_c}>Gêneros não disponíveis</div>
                            )}
                        </div>
                        <div id={styles.classificadores}>
                            <div className={styles.blocos_extras}>{'IMDB ' + filme?.nota_imdb || 'IMDB'}</div>
                            <div className={styles.blocos_extras}>{'+' + filme?.classificacao_etaria || '0'}</div>
                            <div className={styles.blocos_extras}>
                                <FaHourglass style={{ marginRight: '8px' }} />
                                {filme?.duracao || '0'}
                            </div>
                        </div>
                        <p>{filme?.sinopse || 'Sinopse não disponível.'}</p>
                    </div>

                    <div id={styles.selecaoSessao}>
                        {/* Primeiro a Data */}
                        <div className={styles.selecaoItem}>
                            <h4>Selecione a Data</h4>
                            <select
                                value={selectedData}
                                onChange={(e) => setSelectedData(e.target.value)}
                                className={styles.selecaoInput}
                            >
                                <option value="">Escolha uma data</option>
                                {datasDisponiveis.map((data, index) => (
                                    <option key={index} value={data}>
                                        {data}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Depois a Hora */}
                        <div className={styles.selecaoItem}>
                            <h4>Selecione a Hora</h4>
                            <select
                                value={selectedHora}
                                onChange={(e) => setSelectedHora(e.target.value)}
                                className={styles.selecaoInput}
                                disabled={!selectedData}
                            >
                                <option value="">Escolha uma hora</option>
                                {horasDisponiveis.length === 0 ? (
                                    <option value="">Nenhuma hora disponível</option>
                                ) : (
                                    horasDisponiveis.map((hora, index) => (
                                        <option key={index} value={hora}>
                                            {hora}
                                        </option>
                                    ))
                                )}
                            </select>
                        </div>

                        {/* Por último a Sala */}
                        <div className={styles.selecaoItem}>
                            <h4>Selecione a Sala</h4>
                            <select
                                value={selectedSala}
                                onChange={(e) => setSelectedSala(e.target.value)}
                                className={styles.selecaoInput}
                                disabled={!selectedHora}
                            >
                                <option value="">Escolha uma sala</option>
                                {salasDisponiveis.length === 0 ? (
                                    <option value="">Nenhuma sala disponível</option>
                                ) : (
                                    salasDisponiveis.map((sala, index) => (
                                        <option key={index} value={sala}>
                                            {sala}
                                        </option>
                                    ))
                                )}
                            </select>
                        </div>
                    </div>
                </div>
            </div>
    );
}

export default TelaFilme;
