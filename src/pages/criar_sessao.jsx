import styles from "../styles/criar_sessao.module.css";
import sessao from "../assets/sessao_icon.png"

function Criar_sessao()
{
    return(
            <div className={styles.centralizar}>
                <div id={styles.container}>
                    <div id={styles.cabecalho}>
                        <img src={sessao} style={{border:"solid white", borderRadius:'40rem'}}/>
                        <h2 style={{marginLeft:'1rem', paddingTop:'0.5rem'}}> Cadastrar Sessão </h2>
                    </div>
                    <div id={styles.grid}>
                        <div className={styles.elementos_grid} id={styles.criacao}>
                            <h3 style={{marginBottom:'2rem'}}>Criar Sessão</h3>
                            <div className={styles.campo}>
                                <h4>Filme:</h4>
                                <select> </select>
                            </div>
                            <div className={styles.campo}>
                                <h4>Sala:</h4>
                                <select> </select>
                            </div>
                            <div className={styles.campo}>
                                <h4>Tipo:</h4>
                                <select> </select>
                            </div>
                            <div className={styles.campo} style={{marginBottom:'2.5rem'}}>
                                <h4>Horário:</h4>
                                <select> </select>
                            </div>
                            <button className={styles.botao}> 
                                Confirmar
                            </button>
                        </div>

                        <div className={styles.elementos_grid}>

                        </div>
                    </div>
                </div>
            </div>
    );
}

export default Criar_sessao;