import {useEffect, useState} from 'react';
import cinemaLogo from '../assets/cinema_logo.png';
import tape from '../assets/tape.png';
import styles from '../styles/registrar.module.css'
import cadastroIcon from '../assets/cadastro.png'
import {formatarCpf} from "../utils/FormatarCpf.js";
import {formatarTelefone} from "../utils/FormatarTelefone.js";
import CidadesService from "../services/CidadesService.js";
import EstadosService from "../services/EstadosService.js";
import AuthService from "../services/AuthService.js";
import {useNavigate} from "react-router-dom";

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
    const [concordaTermosEmpresa, setConcordaTermosEmpresa] = useState(false);
    const [informacoesVerdadeiras, setInformacoesVerdadeiras] = useState(false);
    const [mensagemErro, setMensagemErro] = useState('');
    const [isLoading, setIsLoading] = useState(false); // Estado de loading
    const [estados, setEstados] = useState([]);
    const [cidades, setCidades] = useState([]);


    const [loadingEstados, setLoadingEstados] = useState(true);
    const [loadingCidades, setLoadingCidades] = useState(false);
    const navigate = useNavigate();


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

    // Carregar estados ao montar o componente
    useEffect(() => {
        const carregarEstados = async () => {
            try {
                const response = await EstadosService.getAllStates();
                setEstados(response.allState);
                setLoadingEstados(false);
            } catch (error) {
                setMensagemErro(`Erro ao carregar estados: ${error.message}`);
                setLoadingEstados(false);
            }
        };

        carregarEstados();
    }, []);

    // Carregar cidades quando um estado é selecionado
    useEffect(() => {
        if (estado) {
            setLoadingCidades(true);
            CidadesService.getCidadesByEstado(estado)
                .then((response) => {
                    setCidades(response.allCities);
                    setLoadingCidades(false);
                })
                .catch((error) => {
                    setMensagemErro(`Erro ao carregar cidades: ${error.message}`);
                    setLoadingCidades(false);
                });
        }
    }, [estado]);


    const handleRegister = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        if (senha !== confirmarSenha) {
            setMensagemErro('As senhas não coincidem.');
            setIsLoading(false);
            return;
        }

        if (!concordaTermosEmpresa || !informacoesVerdadeiras) {
            setMensagemErro('Você deve concordar com os termos e declarar que as informações são verdadeiras.');
            setIsLoading(false);
            return;
        }

        try {
            const response = await AuthService.register(
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
            navigate('/');
        } catch (error) {
            setMensagemErro(error.message);
        } finally {
            setIsLoading(false);
        }
    };


    return (
            <div className={styles.centralizar} style={{ width: "100%" }}>
                <div id={styles.logo}>
                    <img src={cinemaLogo} id="icone" alt="Logo" />
                </div>
                <img src={tape} className="enfeite" id="esquerda" alt="Tape Left" />
                <img src={tape} className="enfeite" id="direita" alt="Tape Right" />

                <form id={styles.area_cadastro} onSubmit={handleRegister} >
                    <div id={styles.cabecalho}>
                        <img src={cadastroIcon} alt="Icone Cdastro" style={{width:'3rem', height:'3rem'}}/>
                        <h1 style={{paddingLeft:'0.4rem'}}>Cadastro</h1>
                    </div>
                    <div id={styles.informacoes}>
                        <h2 className={styles.h2}>Sobre Você</h2>
                        <div id={styles.sobre}>
                            <input type="text"
                                   value={nome}
                                   onChange={(e) => setNome(e.target.value)}
                                   placeholder='Nome Completo:'
                                   style={{gridArea: 'nome', width: '100%'}} className={styles.input}

                                   required={true}
                            />
                            <input type="text"
                                   value={cpf}
                                   onChange={handleCpfChange}
                                   placeholder='CPF: '
                                   style={{gridArea: 'cpf'}}
                                   className={styles.input}

                                   required={true}
                            />
                            <input type="date"
                                   value={dataNascimento}
                                   onChange={(e) => setDataNascimento(e.target.value)}
                                   style={{gridArea: "data_nasc"}}
                                   className={styles.input}

                                   required={true}
                            />
                        </div>

                        <h2 className={styles.h2}>Informações de Contato</h2>
                        <div id={styles.container}>
                            <input type="email"
                                   value={email}
                                   onChange={(e) => setEmail(e.target.value)}
                                   style={{gridArea: 'parte'}}
                                   className={styles.input}
                                   placeholder='Email:'

                                   required={true}
                            />
                            <input type="tel"
                                   value={telefone}
                                   onChange={handleTelefoneChange}
                                   style={{gridArea: 'resto'}}
                                   className={styles.input}
                                   placeholder='Telefone: '

                                   required={true}
                            />
                        </div>

                        <h2 className={styles.h2} style={{paddingTop: '0rem'}}>Endereço</h2>
                        <div id={styles.container}>
                            <select
                                value={estado}
                                onChange={(e) => setEstado(e.target.value)}
                                disabled={loadingEstados}
                                style={{gridArea: 'parte'}}
                                required={true}
                                className={styles.input}
                            >
                                <option value="">Selecione um estado</option>
                                {estados.map((estado) => (
                                    <option key={estado.id} value={estado.id}>
                                        {estado.nome}
                                    </option>
                                ))}
                            </select>
                            {loadingEstados && <p>Carregando estados...</p>}
                            <select value={cidade}
                                    onChange={(e) => setCidade(e.target.value)}
                                    disabled={!estado || loadingCidades}
                                    style={{gridArea: 'resto'}}
                                    required={true}
                                    className={styles.input}
                            >
                                <option value="">Selecione uma cidade</option>
                                {cidades.map((cidade) => (
                                    <option key={cidade.id} value={cidade.id}>
                                        {cidade.nome}
                                    </option>
                                ))}
                            </select>
                            {loadingCidades && <p>Carregando cidades...</p>}
                        </div>

                        <h2 className={styles.h2} style={{paddingTop: '0rem'}}>Crie sua Senha</h2>
                        <div id={styles.container} style={{marginBottom: '2rem'}}>
                            <input
                                type="password"
                                value={senha}
                                onChange={(e) => setSenha(e.target.value)}
                                style={{gridArea: 'parte'}}
                                className={styles.input}
                                placeholder='Senha: '

                                required={true}
                            />
                            <input type="password"
                                   value={confirmarSenha}
                                   onChange={(e) => setConfirmarSenha(e.target.value)}
                                   style={{gridArea: 'resto'}}
                                   className={styles.input}
                                   placeholder='Confirme Senha: '

                                   required={true}
                            />

                        </div>

                        <p>A senha deve conter entre 8 e 16 caracteres e cumprir com
                            os requisitos abaixo:
                            Pelo menos 8 caracteres
                        </p>

                    </div>
                    <div className={styles.check}>
                        <input type="checkbox"
                               checked={concordaTermosEmpresa}
                               onChange={(e) => setConcordaTermosEmpresa(e.target.checked)}
                               className={styles.checkbox}/>
                        <p style={{paddingLeft:"1.5rem"}}>Li e aceito os termos de condição da empresa.</p>
                    </div>
                    <div className={styles.check}>
                        <input type="checkbox"
                               checked={informacoesVerdadeiras}
                               onChange={(e) => setInformacoesVerdadeiras(e.target.checked)}
                               className={styles.checkbox}/>
                        <p style={{paddingLeft:"1.5rem"}}>Declaro que todas informações inseridas aqui são verdadeiras.</p>
                    </div>
                    {mensagemErro && (
                        <div className={styles.mensagemErro}>{mensagemErro}</div>
                    )}
                    <button
                        type="submit"
                        disabled={isLoading}
                        className={styles.button}
                    >
                        {isLoading && (
                            <div className={styles.loader}></div>
                        )}
                        {isLoading ? '' : 'Cadastrar'}
                    </button>
                </form>
            </div>
    );
};

export default Registrar;
