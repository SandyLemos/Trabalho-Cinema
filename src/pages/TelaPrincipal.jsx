import { useEffect, useState } from 'react';
import styles from "../styles/tela.principal.module.css";
import seta from "../assets/seta.png";
import classNames from 'classnames';
import SessaoService from "../services/SessaoService.js";

function TelaPrincipal() {
    const [filmes, setFilmes] = useState({ principal: [], exibicao: [], emBreve: [] });
    const [indexPrincipal, setIndexPrincipal] = useState(0);

    useEffect(() => {
        const fetchFilmes = async () => {
            try {
                const filmesDaSemana = await SessaoService.getSessionMonth();
                setFilmes(filmesDaSemana);
            } catch (error) {
                console.error('Erro ao carregar filmes:', error);
            }
        };

        fetchFilmes();
    }, []);

    const handleNext = () => {
        setIndexPrincipal((prevIndex) => (prevIndex + 1) % filmes.principal.length);
    };

    const filmePrincipal = filmes.principal[indexPrincipal] || {};

    return (
        <div id={styles.area_filmes}>
            {/* Filmes Principais */}
            <div id={styles.filmes_principais} className={styles.carrossel}>
                <div className={styles.carrossel_conteudo}>
                    <div className={styles.trailer_container}>
                        <iframe
                            width="100%"
                            height="400"
                            src={`https://www.youtube.com/embed/${filmePrincipal.trailer_url || ''}?cc_load_policy=0&showinfo=0&rel=0&modestbranding=1`}
                            title={`Trailer de ${filmePrincipal.titulo || 'Filme'}`}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            style={{border: 'none'}}
                        />
                    </div>
                    <div className={styles.info_filme}>
                        <div className={styles.imdb}>
                            <h1>{`IMDB ${filmePrincipal.nota_imdb || ''}`}</h1>
                        </div>
                        <h1>{filmePrincipal.titulo || 'Título do Filme'}</h1>
                        <p>{filmePrincipal.sinopse || 'Sinopse do filme'}</p>

                        <div className={styles.generos_container}>
                            <div className={styles.row_info}>
                                <span>{filmePrincipal.data_lancamento ? filmePrincipal.data_lancamento.getFullYear() : 'Ano'}</span>
                                <span>{`${filmePrincipal.classificacao_etaria || '0'}+`}</span>
                                <span>{filmePrincipal.duracao || 'Duração'}</span>
                            </div>
                            <span className={styles.spanGenres}>
                                {filmePrincipal.generos ?
                                    filmePrincipal.generos.map((genero, index) => (
                                        <span key={genero.id_genero} className={styles.generoItem}>
                                            {genero.nome_genero}{index < filmePrincipal.generos.length - 1 ? ' | ' : ''}
                                        </span>
                                    )) : 'Gêneros'}
                            </span>
                        </div>
                        <button id={classNames(styles.botao_proximo, styles.botao)} onClick={handleNext}>
                            <img src={seta} className={styles.icone_seta} title="Seta para próximo" alt="seta"/>
                        </button>
                    </div>
                </div>
            </div>

            {/* Filmes em Exibição */}
            <h2 style={{color: 'white', marginBottom: '2rem'}}>Em Exibição</h2>
            <div className={styles.cartaz}>
                {filmes.exibicao.map((filme, index) => (
                    <div className={styles.filme_cartaz} key={index}>
                        <div className={styles.parte_imagem}>
                            <img src={filme.poster} alt={filme.slug}/>
                        </div>
                        <div className={styles.parte_info}>
                            <div className={styles.imdb}>
                                <h1>{`IMDB ${filme.nota_imdb}`}</h1>
                            </div>
                            <h4 style={{fontSize: '18px', fontWeight: 'bold'}}>{filme.titulo}</h4>
                            <div className={styles.row_info}>
                                <span>{filme.data_lancamento.getFullYear()}</span> {/* Ano de lançamento */}
                                <span>{`${filme.classificacao_etaria}+`}</span> {/* Idade recomendada */}
                                <span>{filme.duracao}</span> {/* Duração */}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Filmes em Breve */}
            <h2 style={{color: 'white', marginBottom: '2rem'}}>Em Breve</h2>
            <div className={styles.cartaz}>
                {filmes.emBreve.length > 0 ? (
                    filmes.emBreve.map((filme, index) => (
                        <div className={styles.filme_cartaz} key={index}>
                            <div className={styles.parte_imagem}>
                                <img src={filme.poster} alt={filme.slug}/>
                            </div>
                            <div className={styles.parte_info}>
                                <div className={styles.imdb}>
                                    <h1>{`IMDB ${filme.nota_imdb}`}</h1>
                                </div>
                                <h4 style={{fontSize: '18px', fontWeight: 'bold'}}>{filme.titulo}</h4>
                                <div className={styles.row_info}>
                                    <span>{filme.data_lancamento.getFullYear()}</span> {/* Ano de lançamento */}
                                    <span>{`${filme.classificacao_etaria}+`}</span> {/* Idade recomendada */}
                                    <span>{filme.duracao}</span> {/* Duração */}
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className={styles.mensagem}>
                        <h3 style={{color: 'white', fontSize: '18px', textAlign: 'center'}}>
                            Nenhum lançamento futuro disponível no momento
                        </h3>
                    </div>
                )}
            </div>
        </div>
    );
}

export default TelaPrincipal;
