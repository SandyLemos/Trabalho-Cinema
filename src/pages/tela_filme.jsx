import styles from '../styles/tela_filmes.module.css'
import BarraMenu from './components/BarraMenu';


function Tela_filme()
{
    return(
    <>
        {/* Centralziando elementos na tela */}
        <div id={styles.centralizar} className={styles.divs}>
            {/* Area onde serão apresentadas as informações do filme */}
            <div id={styles.info} className={styles.divs}>
                
                {/* Div que armazena a imagem */}
                <div id={styles.info_imagem}>
                    <img src="" alt="" id={styles.imagem} />
                </div>

                {/*Div que contem as informações do filme*/}
                <div id={styles.info_descricao}>
                    <h1 style={{fontSize:'40px'}}>Filme</h1>
                    <div id={styles.classificadores}>
                        <div className={styles.blocos_c}>ssss</div>
                        <div className={styles.blocos_c}></div>
                        <div className={styles.blocos_c}></div>
                    </div>
                    <div id={styles.classificadores}>
                        <div className={styles.blocos_extras}>ssss</div>
                        <div className={styles.blocos_extras}></div>
                        <div className={styles.blocos_extras}></div>
                    </div>
                    <p></p>
                </div>

                {/*Div contendo informações sobre diretores dos filmes */}
                <div id={styles.diretores}>
                    <div className={styles.info_diretores}  style={{borderTop:'solid whitesmoke', paddingTop:'0.9rem'}}>
                        <h4 style={{fontWeight:'normal', color:'lightblue'}}>Diretores</h4>
                        <label style={{fontSize:'0.8rem'}}>Diretor</label>
                    </div>

                    <div className={styles.info_diretores}>
                        <h4 style={{fontWeight:'normal', color:'lightblue'}}>Diretores</h4>
                        <label style={{fontSize:'0.8rem'}}>Diretor</label>
                    </div>

                    <div className={styles.info_diretores}>
                        <h4 style={{fontWeight:'normal', color:'lightblue'}}>Diretores</h4>
                        <label style={{fontSize:'0.8rem'}}>Diretor</label>
                    </div>
                </div>

            </div>

        </div>
    </>
    );
}

export default Tela_filme