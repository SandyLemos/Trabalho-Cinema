import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Importar useNavigate do React Router
import styles from "../../styles/criar_sessao.module.css";
import FilmesService from "../../services/FilmesService";
import SalasService from "../../services/SalaService";
import IngressoService from "../../services/IngressoService";
import SessaoService from "../../services/SessaoService"; 

function CriarSessao() {
  const [filmeSelecionado, setFilmeSelecionado] = useState("");
  const [filmes, setFilmes] = useState([]);
  const [salas, setSalas] = useState([]);
  const [tiposDeIngresso, setTiposDeIngresso] = useState([]);
  const [precosIngresso, setPrecosIngresso] = useState([]);
  const [erroCarregamentoFilmes, setErroCarregamentoFilmes] = useState("");
  const [erroCarregamentoSalas, setErroCarregamentoSalas] = useState("");
  const [setErroCarregamentoIngressos] = useState("");
  const [setIdSessaoCriada] = useState(null);
  const [dataSessao, setDataSessao] = useState("");
  const [loading, setLoading] = useState(false); // Estado de carregamento

  const navigate = useNavigate(); // Hook do React Router para navegação

  // Carregar filmes
  useEffect(() => {
    const fetchFilmes = async () => {
      try {
        const response = await FilmesService.getAllFilms(1, 10);
        if (Array.isArray(response.films)) {
          setFilmes(response.films);
        } else {
          setErroCarregamentoFilmes("Erro ao carregar filmes.");
        }
      } catch (error) {
        setErroCarregamentoFilmes(error.message || "Erro desconhecido ao carregar filmes.");
      }
    };

    fetchFilmes();
  }, []);

  // Carregar salas
  useEffect(() => {
    const fetchSalas = async () => {
      try {
        const response = await SalasService.getRooms();
        if (Array.isArray(response)) {
          setSalas(response);
        } else {
          setErroCarregamentoSalas("Erro ao carregar salas.");
        }
      } catch (error) {
        setErroCarregamentoSalas(error.message || "Erro desconhecido ao carregar salas.");
      }
    };

    fetchSalas();
  }, []);

  // Carregar tipos de ingressos
  useEffect(() => {
    const fetchTiposDeIngresso = async () => {
      try {
        const response = await IngressoService.getAllTicketType();
        if (response.success && Array.isArray(response.ticketType)) {
          setTiposDeIngresso(response.ticketType);
          setPrecosIngresso(response.ticketType.map(() => ""));
        } else {
          setErroCarregamentoIngressos("Erro ao carregar tipos de ingresso.");
        }
      } catch (error) {
        setErroCarregamentoIngressos(error.message || "Erro desconhecido ao carregar tipos de ingresso.");
      }
    };

    fetchTiposDeIngresso();
  }, []);

  // Atualiza o preço de um ingresso específico
  const atualizarPrecoIngresso = (index, value) => {
    const novosPrecos = [...precosIngresso];
    novosPrecos[index] = value;
    setPrecosIngresso(novosPrecos);
  };

  // Função para criar a sessão e depois cadastrar os preços de ingresso
  const criarSessaoEIngressos = async () => {
    setLoading(true); // Ativa o estado de carregamento
    try {
      const dataFormatada = new Date(dataSessao).toISOString();

      // Criando a sessão
      const sessaoCriada = await SessaoService.createSession(parseInt(filmeSelecionado), parseInt(salas[0].id_sala), dataFormatada);

      if (sessaoCriada) {
        setIdSessaoCriada(sessaoCriada.id_sessao);

        // Criando os preços dos ingressos
        for (let i = 0; i < tiposDeIngresso.length; i++) {
          const precoIngresso = precosIngresso[i];
          if (precoIngresso) {
            await IngressoService.createTickerPrice(parseInt(sessaoCriada.id_sessao),parseInt(tiposDeIngresso[i].id_tipo),precoIngresso);
          }
        }

        alert("Sessão e preços de ingressos criados com sucesso!");

        // Redireciona para a página inicial após o sucesso
        navigate("/");

      }
    } catch (error) {
      console.error("Erro ao criar a sessão ou os preços:", error);
      alert("Erro ao criar a sessão ou os preços dos ingressos.");
    } finally {
      setLoading(false); // Desativa o estado de carregamento
    }
  };

  return (
    <div className={styles.containerPrincipal}>
      <div className={styles.cabecalho}>
        <h1>Cadastrar Sessão</h1>
      </div>

      <div className={styles.conteudo}>
        <div className={styles.sessaoContainer}>
          <h2>Criar Sessão</h2>

          {/* Filme */}
          <div className={styles.campo}>
            <label>Filme:</label>
            <select
              value={filmeSelecionado}
              onChange={(e) => setFilmeSelecionado(e.target.value)}
              className={styles.input}
            >
              <option value="">Selecione um filme</option>
              {filmes.length > 0 ? (
                filmes.map((filme) => (
                  <option key={filme.id_filme} value={filme.id_filme}>
                    {filme.titulo}
                  </option>
                ))
              ) : (
                <option value="">Nenhum filme disponível</option>
              )}
            </select>
            {erroCarregamentoFilmes && (
              <div className={styles.erro}>{erroCarregamentoFilmes}</div>
            )}
          </div>

          {/* Sala */}
          <div className={styles.campo}>
            <label>Sala:</label>
            <select className={styles.input}>
              <option value="">Selecione uma sala</option>
              {salas.length > 0 ? (
                salas.map((sala) => (
                  <option key={sala.id_sala} value={sala.id_sala}>
                    {sala.nome_sala}
                  </option>
                ))
              ) : (
                <option value="">Nenhuma sala disponível</option>
              )}
            </select>
            {erroCarregamentoSalas && (
              <div className={styles.erro}>{erroCarregamentoSalas}</div>
            )}
          </div>

          {/* Horário */}
          <div className={styles.campo}>
            <label>Horário:</label>
            <input 
            type="datetime-local" 
            value={dataSessao}
            onChange={(e) => setDataSessao(e.target.value)}
            className={styles.input} />
          </div>

          <button className={styles.botao} onClick={criarSessaoEIngressos} disabled={loading}>
            {loading ? "Carregando..." : "Confirmar"}
          </button>
        </div>

        <div className={styles.ingressosContainer}>
          <h2>Tipos de Ingressos</h2>
          {tiposDeIngresso.length > 0 ? (
            tiposDeIngresso.map((tipo, index) => (
              <div className={styles.ingressoLinha} key={tipo.id_tipo}>
                <div className={styles.inputContainer}>
                  <label className={styles.inputx}>{tipo.descricao}:</label>
                  <input
                    type="number"
                    placeholder="Preço"
                    value={precosIngresso[index]}
                    onChange={(e) =>
                      atualizarPrecoIngresso(index, e.target.value)
                    }
                    className={styles.inputx}
                  />
                </div>
              </div>
            ))
          ) : (
            <div className={styles.erro}>Nenhum tipo de ingresso disponível</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CriarSessao;
