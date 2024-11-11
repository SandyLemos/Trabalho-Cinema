import Barra_menu from "../Componentes_para_telas/barra_menu";
import styles from "./tela_principal.module.css";
import seta from "../assets/seta.png";
import classNames from 'classnames';

function Tela_principal()
{
    return(
        <>
        <Barra_menu></Barra_menu>
        <div id={styles.area_filmes}>
            
            <div id={styles.filmes_principais}>
                
                <h1 className={styles.elementos_filmes_principais} style={{fontSize:'60px', marginTop:'5rem;'}}></h1>
                
                <p className={styles.elementos_filmes_principais} style={{fontSize:'12px'}}></p>
                
                <button id={classNames(styles.botao_proximo,styles.botao)}>
                    <img src={seta} className={styles.icone_seta} title="arrow icons"/>
                </button>
            </div>

{/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/} 

            <h2 style={{color:'white', marginBottom:'2rem'}}>Em exibição</h2>
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

{/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/} 
            <h2 style={{color:'white', marginBottom:'2rem'}}>Em Breve</h2>
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
    </>
    );
}

export default Tela_principal;