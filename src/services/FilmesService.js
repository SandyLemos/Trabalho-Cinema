import FilmesRepository from "../repositories/FilmesRepository.js";

class FilmesService {
  async getFilmsByTitle(title) {
    try {
      return await FilmesRepository.getFilmsByTitle(title);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async createFilm(
    titulo,
    sinopse,
    data_lancamento,
    duracao,
    classificacao_etaria,
    poster_path,
    trailer_url,
    nota_imdb,
    generos
  ) {
    try {
      const filme = {
        titulo,
        sinopse,
        data_lancamento,
        duracao: parseInt(duracao, 10),
        classificacao_etaria: parseInt(classificacao_etaria, 10),
        poster_path,
        trailer_url: trailer_url,
        nota_imdb: parseFloat(nota_imdb),
        generos: generos.map((genero) => parseInt(genero, 10)),
      };

      const response = await FilmesRepository.createFilm(filme);

      return response;
    } catch (error) {
      throw new Error(error.message || "Erro na criação do filme");
    }
  }

  async getFilmByTitleAI(titulo) {
    try {
      const movieName = titulo;
      const response = await FilmesRepository.getFilmeByTitleAI(movieName);

      return response;
    } catch (error) {
      throw new Error(error.message || "Erro na criação do filme");
    }
  }

  async getFilmById(id) {
    try {
      return await FilmesRepository.getFilmById(id);
    } catch (error) {
      throw new Error(error.message || "Erro ao buscar filme por ID");
    }
  }

  async updateFilm(
    id,
    {
      titulo,
      sinopse,
      data_lancamento,
      duracao,
      classificacao_etaria,
      poster_path,
      trailer_url,
      nota_imdb,
      generos,
    }
  ) {
    try {
      // Certifique-se de que os valores de duracao, classificacao_etaria e nota_imdb não sejam nulos ou indefinidos antes de enviar
      const filme = {
        titulo,
        sinopse,
        data_lancamento,
        duracao:
          duracao !== null && duracao !== undefined
            ? parseInt(duracao, 10)
            : null,
        classificacao_etaria:
          classificacao_etaria !== null && classificacao_etaria !== undefined
            ? parseInt(classificacao_etaria, 10)
            : null,
        poster_path,
        trailer_url,
        nota_imdb:
          nota_imdb !== null && nota_imdb !== undefined
            ? parseFloat(nota_imdb)
            : null,
        generos: generos.map((genero) => parseInt(genero, 10)),
      };

      const response = await FilmesRepository.updateFilm(id, filme);
      return response;
    } catch (error) {
      throw new Error(error.message || "Erro ao atualizar filme");
    }
  }

  async deleteFilm(id) {
    try {
      return await FilmesRepository.deleteFilm(id);
    } catch (error) {
      throw new Error(error.message || "Erro ao deletar filme");
    }
  }

  async getFilmsByGenre(genreId, page = 1, limit = 10) {
    try {
      return await FilmesRepository.getFilmsByGenre(genreId, page, limit);
    } catch (error) {
      throw new Error(error.message || "Erro ao buscar filmes por gênero");
    }
  }

  async getFilmsByAgeRating(ageRating, page = 1, limit = 10) {
    try {
      return await FilmesRepository.getFilmsByAgeRating(ageRating, page, limit);
    } catch (error) {
      throw new Error(
        error.message || "Erro ao buscar filmes por classificação etária"
      );
    }
  }

  async getAllFilms(page = 1, limit = 10) {
    try {
      return await FilmesRepository.getAllFilms(page, limit);
    } catch (error) {
      throw new Error(error.message || "Erro ao buscar filmes");
    }
  }
}

export default new FilmesService;