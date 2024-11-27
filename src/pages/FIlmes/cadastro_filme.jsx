import styles from "../styles/cadastro_filme.module.css";

function CadastroFilme() {

    const generos = [
        "Ação",
        "Comédia",
        "Drama",
        "Suspense",
        "Romance",
        "Ficção Científica",
        "Terror",
        "Animação",
        "Fantasia",
        "Documentário",
      ];

  return (
    <div id={styles.centralizar}>
        <div className={styles.container}>
            <div id={styles.cabecalho}>
                <h2>Cadastro Filme</h2>
            </div>

            <div className={styles.info_filme}>
                <div className={styles.espaco}>
                    <h3>Titulo do Filmes</h3>
                    <input type="text"/>
                </div>

                <div className={styles.espaco} style={{marginTop:'2rem'}}>
                    <h3>Descrição</h3>
                    <textarea name="" id=""></textarea>
                </div>

                <div className={styles.espaco}>
                    <h3>Gênero</h3>
                    <select name="" id="">
                    id="genero"
                  name="genero"
                  required
                  className={styles.input}
                
                  <option value="">Selecione um gênero</option>
                  {generos.map((genero, index) => (
                    <option key={index} value={genero.toLowerCase()}>
                      {genero}
                    </option>
                  ))}
                    </select>
                </div>

                <div className={styles.espaco}>
                    <h3>Data de Lançamento</h3>
                    <input type="date"/>
                </div>

                <button> Cadastrar </button>
            </div>
        </div>
    </div>
  );
}

export default CadastroFilme;
