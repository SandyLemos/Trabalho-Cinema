import styles from "../styles/tela.principal.module.css";
import seta from "../assets/seta.png";
import classNames from 'classnames';
import SessaoService from "../services/SessaoService.js";
import { useEffect, useState } from'react';

function TelaPrincipal() {

    const [filmes, setFilmes] = useState([]);

    useEffect(() => {
        // Carrega os filmes da API assim que o componente for montado
        const fetchFilmes = async () => {
            try {
                const filmesDaSemana = await SessaoService.getSessionByWeek();
                setFilmes(filmesDaSemana);
            } catch (error) {
                console.error('Erro ao carregar filmes:', error);
            }
        };

        fetchFilmes();
    }, []);

    return(
        <div id={styles.area_filmes}>

            <div id={styles.filmes_principais}>

                <h1 className={styles.elementos_filmes_principais} ></h1>

                <p className={styles.elementos_filmes_principais} style={{fontSize:'12px'}}></p>

                <button id={classNames(styles.botao_proximo,styles.botao)}>
                    <img src={seta} className={styles.icone_seta} title="arrow icons"/>
                </button>
            </div>

    {/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/}

            <h2 style={{color:'white', marginBottom:'2rem'}}>Em exibição</h2>
            <div className={styles.cartaz}>

                {filmes.slice().map((filme, index) => (
                    <div className={styles.filme_cartaz} key={index}>
                        <div className={styles.parte_imagem}>
                            <img src={filme.poster} alt={filme.titulo}/>
                        </div>
                        <div className={styles.parte_info}>
                            <div className={styles.imdb}><h1>{ "IMDB "+ filme.nota_imdb}</h1></div> {/* Nota IMDb */}
                            <h4 style={{
                                fontSize: '18px',
                                fontWeight: 'bold',
                                fontColor: 'white'
                            }}>{filme.titulo}</h4> {/* Título do filme */}
                            <div className={styles.row_info}>
                                <span>{filme.data_lancamento}</span> {/* Ano de lançamento */}
                                <span>{filme.classificacao_etaria+"+"}</span> {/* Idade recomendada */}
                                <span>{filme.duracao}</span> {/* Duração */}
                            </div>
                        </div>
                    </div>
                ))}

            </div>

            {/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/}
            <h2 style={{color: 'white', marginBottom: '2rem'}}>Em Breve</h2>
            <div className={styles.cartaz}>

                <div className={styles.filme_cartaz}>

                    <div className={styles.parte_imagem}>
                        <img src="" alt="" id="imagem_filme1"/>
                    </div>

                    <div className={styles.parte_info}>
                        <h3 style={{fontSize:'15px'}} id="label_filme1"></h3>
                    </div>

                </div>

                <div className={styles.filme_cartaz}>

                    <div className={styles.parte_imagem}>
                        <img src="" alt="" id="imagem_filme2"/>
                    </div>

                    <div className={styles.parte_info}>
                        <h3 style={{fontSize:'15px'}} id="label_filme2"></h3>
                    </div>

                </div>

                <div className={styles.filme_cartaz}>

                    <div className={styles.parte_imagem}>
                        <img src="" alt="" id="imagem_filme3"/>
                    </div>

                    <div className={styles.parte_info}>
                        <h3 style={{fontSize:'15px'}} id="label_filme3"></h3>
                    </div>

                </div>

                <div className={styles.filme_cartaz}>

                    <div className={styles.parte_imagem}>
                        <img src="" alt="" id="imagem_filme4"/>
                    </div>

                    <div className={styles.parte_info}>
                        <h3 style={{fontSize:'15px'}} id="label_filme4"></h3>
                    </div>

                </div>

            </div>


        </div>
    );
}

export default TelaPrincipal;