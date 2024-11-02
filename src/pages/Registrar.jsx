import { useEffect, useState } from 'react';
import cinemaLogo from '../assets/cinema_logo.png';
import tapeImage from "../assets/tape.png";
import iconeCadastro from '../assets/cadastro.png';
import AuthController from "../controllers/AuthController.js";
import EstadosController from "../controllers/EstadosController.js";
import CidadesController from "../controllers/CidadesController.js";
import {formatarCpf} from "../utils/formatarCpf.js";
import {formatarTelefone} from "../utils/formatarTelefone.js";
import '../styles/entrar.css'

const Registrar = () => {
    useEffect(() => {
        document.title = "Registrar";
    }, []);

    const [nome, setNome] = useState('');
    const [cpf, setCpf] = useState('');
    const [dataNascimento, setDataNascimento] = useState('');
    const [email, setEmail] = useState('');
    const [telefone, setTelefone] = useState('');
    const [estado, setEstado] = useState('');
    const [cidade, setCidade] = useState('');
    const [senha, setSenha] = useState('');
    const [confirmarSenha, setConfirmarSenha] = useState('');
    const [concordaTermos, setConcordaTermos] = useState(false);
    const [mensagemErro, setMensagemErro] = useState('');
    const [isLoading, setIsLoading] = useState(false); // Estado de loading
    const [estados, setEstados] = useState([]);
    const [cidades, setCidades] = useState([]);

    const [loadingEstados, setLoadingEstados] = useState(true);
    const [loadingCidades, setLoadingCidades] = useState(false);


    const handleCpfChange = (event) => {
        const value = event.target.value;
        const formattedValue = formatarCpf(value);
        setCpf(formattedValue);
    };

    const handleTelefoneChange = (event) => {
        const value = event.target.value;
        const formattedValue = formatarTelefone(value);
        setTelefone(formattedValue);
    };


// Função utilitária para tratar erros
    const handleAsyncOperation = async (operation, onSuccess, onError) => {
        try {
            const response = await operation();
            if (response.success) {
                onSuccess(response);
            } else {
                onError(response.msg || 'Operação falhou.');
            }
        } catch (error) {
            onError(error.message);
        }
    };

// useEffect para carregar estados
    useEffect(() => {
        const fetchStates = async () => {
            setLoadingEstados(true);
            await handleAsyncOperation(
                () => EstadosController.getAllStates(),
                (response) => setEstados(response.states),
                (errorMsg) => setMensagemErro('Falha ao carregar estados: ' + errorMsg)
            );
            setLoadingEstados(false);
        };

        fetchStates();
    }, []);

// Função para carregar cidades ao selecionar um estado
    const handleEstadoChange = async (e) => {
        const selectedEstado = e.target.value;
        setEstado(selectedEstado);
        setCidade(''); // Reseta a cidade ao mudar de estado
        setCidades([]); // Limpa as cidades anteriores

        if (selectedEstado) {
            setLoadingCidades(true);
            try {
                const response = await CidadesController.getCidadesByEstado(selectedEstado);
                setCidades(response.cities); // Use o array correto
            } catch (error) {
                setMensagemErro('Erro ao buscar cidades: ' + error.message);
            } finally {
                setLoadingCidades(false);
            }
        }
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        if (senha !== confirmarSenha) {
            setMensagemErro('As senhas não coincidem.');
            setIsLoading(false);
            return;
        }
        if (!concordaTermos) {
            setMensagemErro('Você deve concordar com os termos.');
            setIsLoading(false);
            return;
        }

        try {
            const response = await AuthController.register(
                nome,
                email,
                senha,
                confirmarSenha,
                cpf.replace(/\D/g, ''), // Remove a formatação do CPF
                dataNascimento,
                estado,
                cidade,
            );
            console.log('Cadastro bem-sucedido:', response);
            // Lógica para redirecionar ou armazenar dados
        } catch (error) {
            setMensagemErro(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-color-grad relative">
            <div className="bg-white rounded-full w-72 h-72 mb-16 mt-6 items-center justify-center flex shadow-lg z-10">
                <img src={cinemaLogo} alt="Logo" className="w-52"/>
            </div>
            <img src={tapeImage} className="absolute left-0 top-[9%] w-1/4" alt="Enfeite Esquerdo"/>
            <img src={tapeImage} className="absolute right-0 top-[9%] w-1/4" alt="Enfeite Direito"/>

            <div className="bg-white shadow-lg rounded-lg p-8 mb-4 w-full max-w-screen-md relative z-10">
                <div id="cabecalho" className="flex items-center mb-6">
                    <img src={iconeCadastro} alt="Ícone de Registrar" className="w-10 mr-2"/>
                    <h1 className="text-2xl font-bold">Registrar</h1>
                </div>
                <form id="area_cadastro" onSubmit={handleRegister}>
                    <h2 className="text-lg font-semibold mb-2">Sobre Você</h2>
                    <input
                        type="text"
                        maxLength='14'
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                        placeholder="Nome Completo"
                        className="border border-gray-300 rounded-lg p-2 w-full mb-4"
                        required
                    />
                    <div className="flex justify-between mb-4">
                        <input
                            type="text"
                            value={cpf}
                            onChange={handleCpfChange}
                            placeholder="CPF"
                            className="border border-gray-300 rounded-lg p-2 w-1/2 mr-2"
                            required
                        />
                        <input
                            type="date"
                            value={dataNascimento}
                            onChange={(e) => setDataNascimento(e.target.value)}
                            className="border border-gray-300 rounded-lg p-2 w-1/2 ml-2"
                            required
                        />
                    </div>
                    <h2 className="text-lg font-semibold mb-2">Informações de Contato</h2>
                    <div className="flex justify-between mb-4">
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Email"
                            className="border border-gray-300 rounded-lg p-2 w-1/2 mr-2"
                            required
                        />
                        <input
                            type={'tel'}
                            value={telefone}
                            onChange={handleTelefoneChange}
                            placeholder="Telefone"
                            className="border border-gray-300 rounded-lg p-2 w-1/2 ml-2"
                            required
                        />
                    </div>
                    <h2 className="text-lg font-semibold mb-2">Endereço</h2>
                    <div className="flex justify-between mb-4">
                        <select
                            value={estado}
                            onChange={handleEstadoChange}
                            className="border border-gray-300 rounded-lg p-2 w-1/2 mr-2"
                            required
                        >
                            {estado === "" && <option value="">Selecione o Estado</option>}

                            {loadingEstados ? (
                                <option>Carregando estados...</option>
                            ) : (
                                estados.map((state) => (
                                    <option key={state.id} value={state.id}>
                                        {state.nome}
                                    </option>
                                ))
                            )}
                        </select>

                        <select
                            value={cidade}
                            onChange={(e) => setCidade(e.target.value)}
                            className="border border-gray-300 rounded-lg p-2 w-1/2 ml-2"
                            required
                            disabled={!estado}
                        >
                            {cidade === "" && <option value="">Selecione a Cidade</option>}

                            {loadingCidades ? (
                                <option>Carregando cidades...</option>
                            ) : (
                                cidades.length > 0 ? (
                                    cidades.map((city) => (
                                        <option key={city.id} value={city.id}>
                                            {city.nome}
                                        </option>
                                    ))
                                ) : (
                                    !loadingCidades && <option value="">Nenhuma cidade disponível</option>
                                )
                            )}
                        </select>
                    </div>
                    <h2 className="text-lg font-semibold mb-2">Crie sua Senha</h2>
                    <div className="flex justify-between mb-4">
                        <input
                            type="password"
                            value={senha}
                            onChange={(e) => setSenha(e.target.value)}
                            placeholder="Senha"
                            className="border border-gray-300 rounded-lg p-2 w-1/2 mr-2"
                            required
                        />
                        <input
                            type="password"
                            value={confirmarSenha}
                            onChange={(e) => setConfirmarSenha(e.target.value)}
                            placeholder="Confirme sua Senha"
                            className="border border-gray-300 rounded-lg p-2 w-1/2 ml-2"
                            required
                        />
                    </div>
                    <span className="block mb-2">A senha deve conter entre 8 a 16 caracteres:</span>

                    <div className="flex items-center mb-4">
                        <input
                            type="checkbox"
                            checked={concordaTermos}
                            onChange={(e) => setConcordaTermos(e.target.checked)}
                            className="mr-2"
                            required
                        />
                        <span>Li e Concordo com os termos de uso da empresa.</span>
                    </div>
                    {mensagemErro && (
                        <div className="text-red-500 mb-2">{mensagemErro}</div>
                    )}
                    <div className="flex justify-center mt-4">
                        <button
                            type="submit"
                            className="bg-purple-500 text-white rounded-lg px-4 py-2 transition hover:bg-purple-600"
                            disabled={isLoading}
                        >
                            {isLoading && (
                                <div className="loader mr-2"></div>
                            )}
                            {isLoading ? '' : 'Cadastrar'}
                        </button>

                    </div>
                </form>
            </div>
        </div>
    );
};

export default Registrar;
