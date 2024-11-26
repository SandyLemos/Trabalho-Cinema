import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../../styles/criar_genero.module.css"; 
import GeneroService from "../../services/GenerosService";

function CriarGenero() {
  const [nomeGenero, setNomeGenero] = useState("");
  const [erro, setErro] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const criarGenero = async () => {
    if (!nomeGenero) {
      setErro("O nome do gênero é obrigatório.");
      return;
    }

    setLoading(true);
    try {
      const response = await GeneroService.createGenre(nomeGenero);

      if (response.success) {
        alert("Gênero criado com sucesso!");
        navigate("/listar-generos");
      } else {
        setErro("Erro ao criar o gênero.");
      }
    } catch (error) {
      setErro(error.message || "Erro desconhecido ao criar o gênero.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.containerPrincipal}>
      <div className={styles.cabecalho}>
        <h1>Cadastrar Gênero</h1>
      </div>

      <div className={styles.conteudo}>
        <div className={styles.generoContainer}>
          <h2>Criar Gênero</h2>

          <div className={styles.campo}>
            <input
              type="text"
              value={nomeGenero}
              onChange={(e) => setNomeGenero(e.target.value)}
              className={styles.input}
              placeholder="Digite o nome do gênero"
            />
          </div>

          {erro && <div className={styles.erro}>{erro}</div>}

          <button
            className={styles.botao}
            onClick={criarGenero}
            disabled={loading}
          >
            {loading ? "Carregando..." : "Confirmar"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default CriarGenero;
