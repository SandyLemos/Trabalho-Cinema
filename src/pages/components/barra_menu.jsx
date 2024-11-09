import  styles from'./menu.module.css'
import logo from '../assets/cinema_logo.png'

function Barra_menu() {
    return (
        <div className={styles.menu}>
            {/* Div Responsavel pela Logo*/}
            <div id={styles.logo}>
                <img src={logo} alt="logo" style={{height:'80%',width:'100%', paddingTop:'4px', }}/>
            </div>

            {/* Div Responsavel pelo campo de pesquisa*/}
            <div>
                <form action="">
                     <input type="text" id={styles.pesquisa} placeholder='Pesquisar Filme'/>
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
