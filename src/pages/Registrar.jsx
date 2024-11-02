import { useEffect, useState } from 'react';
import cinemaLogo from '../assets/cinema_logo.png';
import tapeImage from "../assets/tape.png";
import iconeCadastro from '../assets/cadastro.png';

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

    const handleRegister = (e) => {
        e.preventDefault();
        if (senha !== confirmarSenha) {
            setMensagemErro('As senhas não coincidem.');
            return;
        }
        if (!concordaTermos) {
            setMensagemErro('Você deve concordar com os termos.');
            return;
        }
    };

    // Função para formatar CPF
    const formatarCpf = (value) => {
        return value
            .replace(/\D/g, '')
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d{1,2})$/, '$1-$2')
            .substring(0, 14);
    };

    // Função para formatar Telefone
    const formatarTelefone = (value) => {
        return value
            .replace(/\D/g, '')
            .replace(/(\d{2})(\d)/, '($1) $2')
            .replace(/(\d{5})(\d)/, '$1-$2')
            .substring(0, 15);
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
                            onChange={(e) => setCpf(formatarCpf(e.target.value))}
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
                            onChange={(e) => setTelefone(formatarTelefone(e.target.value))}
                            placeholder="Telefone"
                            className="border border-gray-300 rounded-lg p-2 w-1/2 ml-2"
                            required
                        />
                    </div>
                    <h2 className="text-lg font-semibold mb-2">Endereço</h2>
                    <div className="flex justify-between mb-4">
                        <select
                            value={estado}
                            onChange={(e) => setEstado(e.target.value)}
                            className="border border-gray-300 rounded-lg p-2 w-1/2 mr-2"
                            required
                        >
                            <option value="">Selecione o Estado</option>
                        </select>
                        <select
                            value={cidade}
                            onChange={(e) => setCidade(e.target.value)}
                            className="border border-gray-300 rounded-lg p-2 w-1/2 ml-2"
                            required
                            disabled={!estado}  // Desabilita o campo cidade se nenhum estado estiver selecionado
                        >
                            <option value="">Selecione a Cidade</option>
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
                    <span className="block mb-2">A senha deve conter entre 8 a 16 caracteres e cumprir com os requisitos abaixo:</span>
                    <ul className="list-disc pl-5 mb-4">
                        <li>Pelo menos um caractere</li>
                        <li>Pelo menos um número</li>
                    </ul>
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
