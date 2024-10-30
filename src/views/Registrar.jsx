import React, {useEffect} from 'react';
import cinemaLogo from '../assets/cinema_logo.png';
import tape from '../assets/tape.png';
import iconeCadastro from '../assets/cadastro.png';

const Registrar = () => {
    useEffect(() => {
        document.title = "Registrar";
    }, []);
    return (
        <div>
            <div className="centralizar" style={{ width: "100%" }}>
                <div id="logo">
                    <img src={cinemaLogo} id="icone" alt="Logo" />
                </div>
                <img src={tape} className="enfeite" id="esquerda" alt="Tape Left" />
                <img src={tape} className="enfeite" id="direita" alt="Tape Right" />
            </div>
            <div id="area_cadastro">
                <div id="cabecalho">
                    <img src={iconeCadastro} style={{ width: "60px", height: "60px", marginTop: "10px", marginRight: "5px" }} alt="Ícone de Registrar" />
                    <h1>Registrar</h1>
                </div>
                <h2 style={{ marginBottom: "15px", paddingLeft: "30px" }}>Sobre Você</h2>
                <input type="text" id="input_nome" placeholder="Nome Completo" />
                <div className="informacoes">
                    <input type="text" placeholder="CPF:" id="CPF" />
                    <input type="date" placeholder="Data de Nascimento" id="data" />
                </div>
                <h2>Informações de contato</h2>
                <div className="informacoes">
                    <input type="text" placeholder="Email:" id="email" />
                    <input type="text" placeholder="Telefone:" id="telefone" />
                </div>
                <h2>Endereço</h2>
                <div className="informacoes">
                    <select name="Estado" id="estado" style={{ width: "80%", paddingLeft: "10px", height: "45px" }}>
                        <option value="AC">Acre</option>
                        <option value="AL">Alagoas</option>
                        <option value="AP">Amapá</option>
                        <option value="AM">Amazonas</option>
                        <option value="BA">Bahia</option>
                        <option value="CE">Ceará</option>
                        <option value="DF">Distrito Federal</option>
                        <option value="ES">Espírito Santo</option>
                        <option value="GO">Goiás</option>
                        <option value="MA">Maranhão</option>
                        <option value="MT">Mato Grosso</option>
                        <option value="MS">Mato Grosso do Sul</option>
                        <option value="MG">Minas Gerais</option>
                        <option value="PA">Pará</option>
                        <option value="PB">Paraíba</option>
                        <option value="PR">Paraná</option>
                        <option value="PE">Pernambuco</option>
                        <option value="PI">Piauí</option>
                        <option value="RJ">Rio de Janeiro</option>
                        <option value="RN">Rio Grande do Norte</option>
                        <option value="RS">Rio Grande do Sul</option>
                        <option value="RO">Rondônia</option>
                        <option value="RR">Roraima</option>
                        <option value="SC">Santa Catarina</option>
                        <option value="SP">São Paulo</option>
                        <option value="SE">Sergipe</option>
                        <option value="TO">Tocantins</option>
                    </select>
                    <input type="text" placeholder="Cidade:" id="cidade" />
                </div>
                <h2>Crie sua Senha</h2>
                <div className="informacoes">
                    <input type="text" placeholder="Senha:" id="senha" />
                    <input type="text" placeholder="Confirme sua senha:" id="Confirme" />
                </div>
                <span style={{ paddingLeft: "30px", marginTop: "10px" }}>
                    A senha deve conter entre 8 a 16 caracteres e cumprir com os requisitos abaixo:
                </span>
                <ul style={{ marginLeft: "30px" }}>
                    <li>Pelo menos um caractere</li>
                    <li>Pelo menos um número</li>
                </ul>
                <div id="check_box">
                    <input type="checkbox" name="li_concordo" id="concordo_li" style={{ margin: "1px", paddingRight: "10px" }} />
                    &nbsp;&nbsp;Li e Concordo com os termos de uso da empresa.
                </div>
                <div id="area_botao">
                    <button className="button">
                        Registrar-se
                    </button>
                </div>
            </div>
            <script src="../../Scripts/botao.js"></script>
        </div>
    );
};

export default Registrar;
