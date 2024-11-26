import { useEffect, useState } from 'react';
import cinemaLogo from '../assets/cinema_logo.png';
import tapeImage from '../assets/tape.png';
import iconePipoca from '../assets/icone_pipoca.png';
import cadastroImage from '../assets/cadastro.png';
import iconePipocaViva from '../assets/icone_pipoca_viva.png';
import '../styles/entrar.css';
import { useNavigate } from "react-router-dom";
import AuthService from "../services/AuthService.js";

const Entrar = () => {
    useEffect(() => {
        document.title = "Entrar";
    }, []);

    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [mensagemErro, setMensagemErro] = useState('');
    const navigate = useNavigate(); // Criando a instância de navigate

    // Função para lidar com o envio do formulário
    const handleLogin = async (e) => {
        e.preventDefault(); // Previne o comportamento padrão do formulário
        setMensagemErro(''); // Reseta a mensagem de erro

        try {
            const userData = await AuthService.login(email, senha);
            console.log('Login bem-sucedido:', userData);
            // Redireciona o usuário para a página inicial após o login
            navigate('/');
        } catch (error) {
            setMensagemErro(error.message); // Define a mensagem de erro
        }
    };

    // Função para redirecionar para a página de registro
    const handleRegisterClick = () => {
        navigate('/registrar');
    };

    return (
        <div className="entrar-container">
            {/* Início: Cabeçalho */}
            <header className="header">
                <div id="logo">
                    <img src={cinemaLogo} alt="Logo" id="icone" />
                </div>
                <img src={tapeImage} className="enfeite" id="esquerda" alt="Enfeite Esquerdo" />
                <img src={tapeImage} className="enfeite" id="direita" alt="Enfeite Direito" />
            </header>
            {/* Fim: Cabeçalho */}

            {/* Meio: Formulário de Login */}
            <section className="login-form">
                <div className="centralizar">
                    <img src={iconePipoca} alt="Ícone" className="mini fig1" />
                    <div id="area_cadastro">
                        <div id="cabecalho">
                            <img src={cadastroImage} alt="Registrar" className="cabecalho-imagem" id="cadastroIcone"/>
                            <h1 className="cabecalho-titulo">Login</h1>
                        </div>
                        <div id="parte_info">
                            <ul>
                                <li style={{ paddingBottom: '40px' }}>
                                    <h2>Email</h2>
                                    <input
                                        type="text"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </li>
                                <li>
                                    <h2>Senha</h2>
                                    <input
                                        type="password"
                                        value={senha}
                                        onChange={(e) => setSenha(e.target.value)}
                                    />
                                </li>
                            </ul>
                        </div>
                        {mensagemErro && <p style={{ color: 'red' }}>{mensagemErro}</p>}
                        <div id="parte_botao">
                            <button className="button" onClick={handleRegisterClick}>Registrar-se</button>
                            <button className="button" onClick={handleLogin}>Entrar</button>
                        </div>
                    </div>
                    <img src={iconePipocaViva} alt="Mascote" className="mini fig2" />
                </div>
            </section>
            {/* Fim: Formulário de Login */}

            {/* Fim: Rodapé */}
            <footer className="footer">
                <div id="imagem_fundo"></div>
            </footer>
            {/* Fim: Rodapé */}
        </div>
    );
};

export default Entrar;
