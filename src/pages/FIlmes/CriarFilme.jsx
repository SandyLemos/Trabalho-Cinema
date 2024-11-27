import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa"; // Ícone de pesquisa
import FilmesService from "../../services/FilmesService.js";
import GenerosService from "../../services/GenerosService.js";
import styles from "../../styles/cadastrar.filmes.module.css";

const CriarFilme = () => {
  const navigate = useNavigate();
  const [generos, setGeneros] = useState([]); // Gêneros carregados, inicialmente um array vazio
  const [titulo, setTitulo] = useState("");
  const [sinopse, setSinopse] = useState("");
  const [dataLancamento, setDataLancamento] = useState("");
  const [duracao, setDuracao] = useState("");
  const [classificacaoEtaria, setClassificacaoEtaria] = useState("");
  const [posterPath, setPosterPath] = useState("");
  const [trailerUrl, setTrailerUrl] = useState("");
  const [notaImdb, setNotaImdb] = useState("");
  const [generosSelecionados, setGenerosSelecionados] = useState([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  // Carregar os gêneros da API
const loadGeneros = async () => {
  try {
    console.log("Carregando gêneros...");
    const response = await GenerosService.getAllGenres();
    console.log("Resposta de gêneros:", response);
    // Verifique se a resposta tem a estrutura esperada
    setGeneros(response?.genres || []);
  } catch (error) {
    console.error("Erro ao carregar gêneros:", error);
    setError(`Erro desconhecido ao buscar os gêneros: ${error.message || error}`);
  }
};

  useEffect(() => {
    loadGeneros();
  }, []);

  // Função para buscar as informações do filme pela API
  const buscarFilme = async () => {
    if (!titulo) {
      alert("Por favor, insira um título para buscar.");
      return;
    }

    setLoading(true);
    try {
      const response = await FilmesService.getFilmByTitleAI(titulo); // Chama o método de busca
      if (response) {
        const confirma = window.confirm(
          `Encontramos o filme "${response.titulo}". Deseja adicionar as informações ao formulário?`
        );

        if (confirma) {
          setTitulo(response.titulo);
          setSinopse(response.sinopse);
          setDataLancamento(response.data_lancamento);
          setDuracao(response.duracao);
          setClassificacaoEtaria(response.classificacao_etaria);
          setNotaImdb(response.nota_imdb);
          setGenerosSelecionados(response.generos);
          setPosterPath(response.poster_path);
          setTrailerUrl(response.trailer_url);
        }
      } else {
        alert("Filme não encontrado.");
      }
    } catch (error) {
      console.error("Erro ao buscar filme:", error);
      alert("Erro ao buscar filme. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  // Enviar formulário
const handleSubmit = async (event) => {
  event.preventDefault();
  setLoading(true);
  setError(null);
  setSuccess(false);

  try {
    const filmToSubmit = {
      titulo,
      sinopse,
      data_lancamento: dataLancamento,
      duracao: parseInt(duracao, 10),
      classificacao_etaria: parseInt(classificacaoEtaria, 10),
      poster_path: posterPath,
      trailer_url: trailerUrl,
      nota_imdb: parseFloat(notaImdb),
      generos: generosSelecionados,
    };

    // Certifique-se de que o método createFilm do FilmesService está correto
    await FilmesService.createFilm(
      titulo,
      sinopse,
      dataLancamento,
      duracao,
      classificacaoEtaria,
      posterPath,
      trailerUrl,
      notaImdb,
      generosSelecionados
    );

    setSuccess(true);
    navigate("/listar-filmes");
  } catch (error) {
    console.error("Erro ao cadastrar filme:", error.message);
    setError("Erro ao cadastrar o filme. Tente novamente.");
  } finally {
    setLoading(false);
  }
};


  // Atualizar campos do formulário
  const handleChange = (setter) => (event) => {
    setter(event.target.value);
  };

  // Adicionar gênero selecionado
const handleGenreChange = (event) => {
  const selectedGenreId = parseInt(event.target.value, 10);  // Garantindo que o valor seja um número
  if (!generosSelecionados.includes(selectedGenreId)) {
    setGenerosSelecionados((prevGeneros) => [
      ...prevGeneros,
      selectedGenreId,
    ]);
  }
};


  // Remover gênero ao clicar na lista de selecionados
  const removeSelectedGenre = (id) => {
    setGenerosSelecionados((prevGeneros) =>
      prevGeneros.filter((generoId) => generoId !== id)
    );
  };

  return (
    <div className={styles["criar-filme-container"]}>
      <h2 className={styles["criar-filme-title"]}>Cadastrar Filme</h2>
      <form className={styles["criar-filme-form"]} onSubmit={handleSubmit}>
        <div className={styles["criar-filme-field"]}>
          <div className={styles["titulo-container"]}>
            <input
              type="text"
              id="titulo"
              value={titulo}
              onChange={handleChange(setTitulo)}
              placeholder="Nome do Filme"
              required
            />
            {/* Ícone de Pesquisa */}
            <FaSearch
              onClick={buscarFilme}
              className={styles["search-icon"]}
              title="Buscar filme"
            />
          </div>
        </div>
        <div className={styles["criar-filme-field"]}>
          <textarea
            id="sinopse"
            value={sinopse}
            onChange={handleChange(setSinopse)}
            placeholder="Sinopse do Filme"
            required
          />
        </div>
        <div className={styles["criar-filme-field"]}>
          <label htmlFor="data_lancamento">Data de Lançamento:</label>
          <input
            type="date"
            id="data_lancamento"
            value={dataLancamento}
            onChange={handleChange(setDataLancamento)}
            required
          />
        </div>
        <div className={styles["criar-filme-field"]}>
          <input
            type="number"
            id="duracao"
            value={duracao}
            onChange={handleChange(setDuracao)}
            placeholder="Duração do Filme (em minutos)"
            required
          />
        </div>
        <div className={styles["criar-filme-field"]}>
          <input
            type="number"
            id="classificacao_etaria"
            value={classificacaoEtaria}
            onChange={handleChange(setClassificacaoEtaria)}
            placeholder="Classificação Etária"
            required
          />
        </div>
        <div className={styles["criar-filme-field"]}>
          <input
            type="url"
            id="poster_path"
            value={posterPath}
            onChange={handleChange(setPosterPath)}
            placeholder="URL do Pôster"
            required
          />
        </div>
        <div className={styles["criar-filme-field"]}>
          <input
            type="text"
            id="trailer_url"
            value={trailerUrl}
            onChange={handleChange(setTrailerUrl)}
            placeholder="URL do Trailer (ID do YouTube)"
            required
          />
        </div>
        <div className={styles["criar-filme-field"]}>
          <input
            type="text"
            id="nota_imdb"
            value={notaImdb}
            onChange={handleChange(setNotaImdb)}
            placeholder="Nota IMDb"
            required
          />
        </div>
        <div className={styles["criar-filme-field"]}>
          <label htmlFor="generos">Gêneros:</label>
          <select id="generos" onChange={handleGenreChange}>
            <option value="" disabled>
              Selecione um gênero
            </option>
            {generos.map((genero) => (
              <option key={genero.id_genero} value={genero.id_genero}>
                {genero.nome_genero}
              </option>
            ))}
          </select>
        </div>
        <div className={styles["criar-filme-selectedGenres"]}>
          <h4>Gêneros Selecionados:</h4>
          <ul>
            {generosSelecionados.map((id) => {
              const genero = generos.find((g) => g.id_genero === id);
              return (
                <li key={id} onClick={() => removeSelectedGenre(id)}>
                  {genero?.nome_genero} (clique para remover)
                </li>
              );
            })}
          </ul>
        </div>
        {error && <p className={styles["criar-filme-error"]}>{error}</p>}
        {success && (
          <p className={styles["criar-filme-success"]}>
            Filme cadastrado com sucesso!
          </p>
        )}
        <div className={styles["criar-filme-buttons"]}>
          <button type="submit" disabled={loading}>
            {loading ? "Cadastrando..." : "Cadastrar Filme"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CriarFilme;
