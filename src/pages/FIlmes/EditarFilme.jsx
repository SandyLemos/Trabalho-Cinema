import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import FilmesService from "../../services/FilmesService.js";
import GenerosService from "../../services/GenerosService.js";
import styles from "../../styles/editar.filme.module.css";

function EditarFilme() {
  const { id_filme } = useParams();
  const navigate = useNavigate();
  const [titulo, setTitulo] = useState("");
  const [sinopse, setSinopse] = useState("");
  const [dataLancamento, setDataLancamento] = useState("");
  const [duracao, setDuracao] = useState("");
  const [classificacaoEtaria, setClassificacaoEtaria] = useState("");
  const [posterPath, setPosterPath] = useState("");
  const [trailerUrl, setTrailerUrl] = useState("");
  const [notaImdb, setNotaImdb] = useState("");
  const [generos, setGeneros] = useState([]);
  const [generosSelecionados, setGenerosSelecionados] = useState([]);
  const [generosMap, setGenerosMap] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    // Função para carregar dados do filme
    const fetchFilmData = async () => {
      try {
        const response = await FilmesService.getFilmById(id_filme);
        if (response?.filmData) {
          const filmData = response.filmData;
          setTitulo(filmData.titulo || "");
          setSinopse(filmData.sinopse || "");
          setDataLancamento(filmData.data_lancamento?.slice(0, 10) || ""); // Ajuste para data no formato YYYY-MM-DD
          setDuracao(filmData.duracao || "");
          setClassificacaoEtaria(filmData.classificacao_etaria || "");
          setPosterPath(filmData.poster_path || "");
          setTrailerUrl(filmData.trailer_url || "");
          setNotaImdb(filmData.nota_imdb || "");
          setGenerosSelecionados(
            filmData.generos?.map((g) => g.id_genero) || []
          ); 
        } else {
          console.error("Erro: Dados do filme não encontrados.");
        }
      } catch (error) {
        console.error("Erro ao carregar dados do filme:", error);
      }
    };

    // Função para carregar a lista de gêneros
    const fetchGeneros = async () => {
      try {
        const response = await GenerosService.getAllGenres();
        const genres = response?.genres || [];
        setGeneros(genres);
        const genresMap = genres.reduce((acc, genre) => {
          acc[genre.id_genero] = genre.nome_genero;
          return acc;
        }, {});
        setGenerosMap(genresMap);
      } catch (error) {
        console.error("Erro ao carregar gêneros:", error);
      }
    };

    fetchFilmData();
    fetchGeneros();
  }, [id_filme]);

const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  setSuccess(false);

  // Garantir que duracao, classificacao_etaria e nota_imdb sejam números válidos ou nulos
  const updatedFilm = {
    titulo,
    sinopse,
    data_lancamento: dataLancamento,
    duracao: duracao ? parseInt(duracao, 10) : null, // Verifica se é válido, senão, atribui null
    classificacao_etaria: classificacaoEtaria ? parseInt(classificacaoEtaria, 10) : null, // Mesmo tratamento para classificacao_etaria
    poster_path: posterPath,
    trailer_url: trailerUrl,
    nota_imdb: notaImdb ? parseFloat(notaImdb) : null, // Verifica se é válido, senão, atribui null
    generos: generosSelecionados,  // Presumo que você tenha a lista de gêneros corretamente configurada
  };

  try {
    const response = await FilmesService.updateFilm(id_filme, updatedFilm);
    if (response.success) {
      navigate("/listar-filmes");
    } else {
      alert("Erro ao atualizar filme.");
    }
  } catch (error) {
    console.error("Erro ao atualizar filme:", error);
    alert("Erro ao atualizar filme.");
  } finally {
    setLoading(false);
  }
};


const handleGenreChange = (e) => {
  const selectedGenreId = parseInt(e.target.value, 10);  // Garantir que o valor seja um número
  if (selectedGenreId && !generosSelecionados.includes(selectedGenreId)) {
    setGenerosSelecionados((prevGeneros) => [
      ...prevGeneros,
      selectedGenreId,
    ]);
  }
};
  const handleRemoveGenre = (genreId) => {
    setGenerosSelecionados((prevGeneros) =>
      prevGeneros.filter((generoId) => generoId !== genreId)
    );
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Editar Filme</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label htmlFor="titulo">Título</label>
          <input
            type="text"
            id="titulo"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            placeholder="Digite o título do filme"
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="sinopse">Sinopse</label>
          <textarea
            id="sinopse"
            value={sinopse}
            onChange={(e) => setSinopse(e.target.value)}
            placeholder="Digite a sinopse do filme"
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="dataLancamento">Data de Lançamento</label>
          <input
            type="date"
            id="dataLancamento"
            value={dataLancamento}
            onChange={(e) => setDataLancamento(e.target.value)}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="duracao">Duração (em minutos)</label>
          <input
            type="number"
            id="duracao"
            value={duracao}
            onChange={(e) => setDuracao(e.target.value)}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="classificacaoEtaria">Classificação Etária</label>
          <input
            type="number"
            id="classificacaoEtaria"
            value={classificacaoEtaria}
            onChange={(e) => setClassificacaoEtaria(e.target.value)}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="posterPath">URL do Poster</label>
          <input
            type="text"
            id="posterPath"
            value={posterPath}
            onChange={(e) => setPosterPath(e.target.value)}
            placeholder="URL do poster do filme"
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="trailerUrl">URL do Trailer</label>
          <input
            type="text"
            id="trailerUrl"
            value={trailerUrl}
            onChange={(e) => setTrailerUrl(e.target.value)}
            placeholder="URL do trailer do filme"
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="notaImdb">Nota IMDB</label>
          <input
            type="number"
            id="notaImdb"
            value={notaImdb}
            onChange={(e) => setNotaImdb(e.target.value)}
            step="0.1"
            min="0"
            max="10"
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="generos">Selecione os Gêneros</label>
          <select id="generos" value="" onChange={handleGenreChange}>
            <option value="">Selecione...</option>
            {generos.map((genre) => (
              <option key={genre.id_genero} value={genre.id_genero}>
                {genre.nome_genero}
              </option>
            ))}
          </select>
          <div className={styles.selectedGenres}>
            {generosSelecionados.map((genreId) => (
              <div key={genreId} className={styles.selectedGenre}>
                <span>{generosMap[genreId]}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveGenre(genreId)}
                >
                  &times;
                </button>
              </div>
            ))}
          </div>
        </div>
        <button
          className={styles.submitButton}
          type="submit"
          disabled={loading}
        >
          {loading ? "Salvando..." : "Salvar Alterações"}
        </button>
        {success && (
          <p className={styles.successMessage}>Filme atualizado com sucesso!</p>
        )}
      </form>
    </div>
  );
}

export default EditarFilme;
