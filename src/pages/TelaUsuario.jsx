import styles from "../styles/tela.usuario.module.css";
import icone from "../assets/user.png";

function TelaUsuario()
{
    return(
        <>
            <div id={styles.principal}>
                <div id={styles.cabecalho}>Minha Conta</div>
            </div>
            <div id={styles.perfil_usu}>
                <div>
                    <img src={icone} alt="" id={styles.icone}/>
                </div>
                <div id={styles.info}>
                    <input type="text" id={styles.nome} className={styles.campos} placeholder="Nome Completo:" />
                    <input type="text" id={styles.cpf} className={styles.campos} placeholder="CPF:"/>
                    <input type="date" id={styles.data_nc} className={styles.campos} />
                    <input type="text" id={styles.telefone} className={styles.campos} placeholder="Telefone:" />
                    <input type="text" id={styles.email} className={styles.campos} placeholder="Email:"/>
                    <select id={styles.estado} className={styles.campos}>
                        <option value="">Selecione seu estado</option>
                        <option value="AC">Acre (AC)</option>
                        <option value="AL">Alagoas (AL)</option>
                        <option value="AP">Amapá (AP)</option>
                        <option value="AM">Amazonas (AM)</option>
                        <option value="BA">Bahia (BA)</option>
                        <option value="CE">Ceará (CE)</option>
                        <option value="DF">Distrito Federal (DF)</option>
                        <option value="ES">Espírito Santo (ES)</option>
                        <option value="GO">Goiás (GO)</option>
                        <option value="MA">Maranhão (MA)</option>
                        <option value="MT">Mato Grosso (MT)</option>
                        <option value="MS">Mato Grosso do Sul (MS)</option>
                        <option value="MG">Minas Gerais (MG)</option>
                        <option value="PA">Pará (PA)</option>
                        <option value="PB">Paraíba (PB)</option>
                        <option value="PR">Paraná (PR)</option>
                        <option value="PE">Pernambuco (PE)</option>
                        <option value="PI">Piauí (PI)</option>
                        <option value="RJ">Rio de Janeiro (RJ)</option>
                        <option value="RN">Rio Grande do Norte (RN)</option>
                        <option value="RS">Rio Grande do Sul (RS)</option>
                        <option value="RO">Rondônia (RO)</option>
                        <option value="RR">Roraima (RR)</option>
                        <option value="SC">Santa Catarina (SC)</option>
                        <option value="SP">São Paulo (SP)</option>
                        <option value="SE">Sergipe (SE)</option>
                        <option value="TO">Tocantins (TO)</option>
                    </select>
                <input type="text" id={styles.cidade} className={styles.campos} placeholder="Cidade:" />
            
            <button></button>

                </div>
            </div>
        </>
    );
}

export default TelaUsuario;