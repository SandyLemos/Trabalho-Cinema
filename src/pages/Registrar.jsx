import React, {useEffect} from 'react';
import cinemaLogo from '../assets/cinema_logo.png';
import tape from '../assets/tape.png';
import iconeCadastro from '../assets/cadastro.png';
import styles from '../styles/registrar.module.css'
import cadastroIcon from '../assets/cadastro.png'

const Registrar = () => {
    useEffect(() => {
        document.title = "Registrar";
    }, []);
    return (
        <>
            <div className={styles.centralizar} style={{ width: "100%" }}>
                <div id={styles.logo}>
                    <img src={cinemaLogo} id="icone" alt="Logo" />
                </div>
                <img src={tape} className="enfeite" id="esquerda" alt="Tape Left" />
                <img src={tape} className="enfeite" id="direita" alt="Tape Right" />

                <div id={styles.area_cadastro}>
                    <div id={styles.cabecalho}>
                        <img src={cadastroIcon} alt="Icone Cdastro" style={{width:'3rem', height:'3rem'}}/>
                        <h1 style={{paddingLeft:'0.4rem'}}>Cadastro</h1>
                    </div>
                    <div id={styles.informacoes}>
                        <h2 className={styles.h2}>Sobre Você</h2>
                        <div id={styles.sobre}>
                            <input type="text" placeholder='Nome Completo:' style={{gridArea:'nome', width:'100%'}} className={styles.input}/>
                            <input type="text" placeholder='CPF: ' style={{gridArea:'cpf'}} className={styles.input} />
                            <input type="date" style={{gridArea:"data_nasc"}} className={styles.input} />
                        </div>

                        <h2 className={styles.h2}>Informações de Contato</h2>
                        <div id={styles.container}>
                            <input type="text" style={{gridArea:'parte'}} className={styles.input} placeholder='Email:' />
                            <input type="text" style={{gridArea:'resto'}} className={styles.input} placeholder='Telefone: '/>                       
                        </div>
                        
                        <h2 className={styles.h2} style={{paddingTop:'0rem'}}>Endereço</h2>
                        <div id={styles.container}>
                            <input type="text" style={{gridArea:'parte'}} className={styles.input} placeholder='Cidade: '/>
                            <input type="text" style={{gridArea:'resto'}} className={styles.input} placeholder='Estado: '/>                       
                        </div>

                        <h2 className={styles.h2} style={{paddingTop:'0rem'}}>Crie sua Senha</h2>
                        <div id={styles.container} style={{marginBottom:'2rem'}}>
                            <input type="password" style={{gridArea:'parte'}} className={styles.input} placeholder='Senha: '/>
                            <input type="password" style={{gridArea:'resto'}} className={styles.input} placeholder='Confirme Senha: ' />                       
                        </div>
                        <p>A senha deve conter entre 8 e 16 caracteres e cumprir com os requisitos abaixo:
                            Pelo menos 8 caracteres
                        </p>
                    </div>
                    <div className={styles.check}>
                        <input type="checkbox" className={styles.checkbox}/>
                        <p style={{paddingLeft:"1.5rem"}}>Li e aceito os termos de condição da empresa.</p>
                    </div>
                    <div className={styles.check}>
                        <input type="checkbox" className={styles.checkbox}/>
                        <p style={{paddingLeft:"1.5rem"}}>Declaro que todas informações inseridas aqui são verdadeiras.</p>
                    </div>
                    <button className={styles.button}>Cadastre-se</button>
                </div>
            </div>
        </>
            
    );
};

export default Registrar;
