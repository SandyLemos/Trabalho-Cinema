import { useEffect, useState } from 'react';
import cinemaLogo from '../assets/cinema_logo.png';
import iconePipoca from '../assets/icone_pipoca.png';
import cadastroImage from '../assets/cadastro.png';
import iconePipocaViva from '../assets/icone_pipoca_viva.png';
import pipocaImg from '../assets/pipoca.png';
import AuthController from "../controllers/AuthController.js";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import '../styles/entrar.css';

const Entrar = () => {
    useEffect(() => {
        document.title = "Entrar";
    }, []);

    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [mostrarSenha, setMostrarSenha] = useState(false);
    const [mensagemErro, setMensagemErro] = useState('');
    const [isLoading, setIsLoading] = useState(false); // Estado de loading
    const navigate = useNavigate(); // Criando a instância de navigate


    const isVisiblePassword = () => {
        setMostrarSenha(!mostrarSenha);
    };

    // Função para lidar com o envio do formulário
    const handleLogin = async (e) => {
        e.preventDefault();
        setMensagemErro(''); // Reseta a mensagem de erro
        setIsLoading(true); // Inicia o loading

        try {
            const userData = await AuthController.login(email, senha);
            console.log('Login bem-sucedido:', userData);
            // Aqui você pode redirecionar o usuário ou armazenar dados no contexto/global state
        } catch (error) {
            setMensagemErro(error.message); // Define a mensagem de erro
        } finally {
            setIsLoading(false); // Finaliza o loading
        }
    };

    // Função para redirecionar para a página de registro
    const handleRegisterClick = () => {
        navigate('/registrar');
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-color-grad relative">
            <div className="bg-white rounded-full w-96 h-96 mb-16 mt-6 items-center justify-center flex shadow-lg z-10">
                <img src={cinemaLogo} alt="Logo" className="w-72"/>
            </div>
            <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-screen-sm relative z-10">
                <img src={iconePipoca} alt="Ícone" className="h-[20%] mx-auto mb-4 absolute -top-8 right-[-6%]"/>
                <img src={iconePipocaViva} alt="Mascote" className="h-[35%] mx-auto mt-4 absolute -bottom-[15%] left-[-8%]"/>

                <form onSubmit={handleLogin}>
                    <div className="flex items-center mb-6">
                        <img src={cadastroImage} alt="Registrar" className="w-10 mr-2 h-10"/>
                        <h1 className="text-4xl font-bold">Login</h1>
                    </div>
                        <ul>
                            <li className="mb-4">
                                <h2 className="text-2xl pb-2 font-semibold">Email</h2>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="border-[1px] border-black shadow-md h-14 focus:outline-none focus- focus:shadow-lg focus:shadow-gray-300/50 transition-shadow duration-200 rounded-lg p-2 w-full mr-2"
                                    placeholder="Digite seu email"
                                    required
                                />
                            </li>
                            <li>
                                <h2 className="text-2xl pb-2 pt-4 font-semibold">Senha</h2>
                                <div className="relative w-full mr-2">
                                    <input
                                        type={mostrarSenha ? "text" : "password"}
                                        value={senha}
                                        onChange={(e) => setSenha(e.target.value)}
                                        className="border-[1px] border-black shadow-md h-14 focus:outline-none focus- focus:shadow-lg focus:shadow-gray-300/50 transition-shadow duration-200 rounded-lg p-2 w-full mr-2"
                                        placeholder="Digite sua senha"
                                        required
                                    />
                                    <div
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                                        onClick={isVisiblePassword}
                                    >
                                        {mostrarSenha ? <FaEyeSlash /> : <FaEye />}
                                    </div>
                                </div>
                            </li>
                        </ul>
                    {mensagemErro && (
                        <div className="flex items-center text-red-500 mt-2 transition-opacity duration-300">
                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                      d="M12 8v4m0 4h.01M12 4a8 8 0 100 16 8 8 0 000-16z"/>
                            </svg>
                            <p>{mensagemErro}</p>
                        </div>
                    )}
                    <div id="parte_botao" className="pt-4 pb-12 flex items-center justify-between">
                        <a
                            className="text-blue-500 hover:cursor-pointer"
                            onClick={handleRegisterClick}
                        >
                            Registrar-se
                        </a>
                        <div className="relative flex items-center">
                            <button
                                type="submit"
                                className={`bg-purple-500 text-white rounded-lg px-4 py-2 transition flex items-center ${isLoading ? 'bg-purple-300 cursor-not-allowed' : 'hover:bg-purple-600'}`}
                                disabled={isLoading}
                            >
                                {isLoading && (
                                    <div className="loader mr-2"></div>
                                )}
                                {isLoading ? 'Carregando...' : 'Entrar'}
                            </button>
                        </div>
                    </div>
                </form>
            </div>

            <footer className="fixed bottom-0 left-0 w-full h-[100px] bg-repeat">
                <div
                    className="relative w-full h-full bg-no-repeat"
                    style={{
                        backgroundImage: `url(${pipocaImg})`,
                        backgroundSize: '180px 180px',
                        backgroundRepeat: 'round',
                        backgroundPosition: 'top',
                    }}
                />
            </footer>
        </div>
    );
};

export default Entrar;
