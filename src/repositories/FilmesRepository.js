import {api} from "../utils/api.js";

class FilmesRepository {
  async getAllFilms(page = 1, limit = 10) {
    try {
      const response = await api.get("/films", {
        params: { page, limit },
      });
      return this.handleLimitResponse(response, "Erro ao buscar filmes");
    } catch (error) {
      throw this.handleError(error, "Erro desconhecido ao buscar filmes");
    }
  }

  async getFilmsByTitle(title) {
    try {
      const response = await api.get(`/films/title?title=${title}`);
      return this.handleFilmsResponse(response);
    } catch (error) {
      throw this.handleError(error, "Erro desconhecido ao buscar filmes");
    }
  }

  async getFilmeByTitleAI(movieName) {
    try {
      const sanitizedMovieName = movieName
        .trim()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");
      const token = localStorage.getItem("token");
      const response = await api.post(
        `/films-ai`,
        { movieName: sanitizedMovieName },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error, "Erro desconhecido ao buscar filmes");
    }
  }

  async getFilmById(id) {
    try {
      const response = await api.get(`/films/${id}`);
      return response.data;
    } catch (error) {
      throw this.handleError(error, "Erro desconhecido ao buscar filme");
    }
  }

  async createFilm(filme) {
    try {
      const token = localStorage.getItem("token");
      const response = await api.post("/films", filme, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      return this.handleResponse(response, "Erro ao criar o filme");
    } catch (error) {
      throw this.handleError(error, "Erro desconhecido ao criar filme");
    }
  }

  async updateFilm(
    id,
    titulo,
    sinopse,
    data_lancamento,
    duracao,
    classificacao_etaria,
    poster_path,
    trailer_url,
    nota_imdb) {
    try {
      const token = localStorage.getItem("token");
      const response = await api.put(
        `/films/${id}`,
        titulo,
        sinopse,
        data_lancamento,
        duracao,
        classificacao_etaria,
        poster_path,
        trailer_url,
        nota_imdb,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error, "Erro desconhecido ao atualizar filme");
    }
  }

  async deleteFilm(id) {
    try {
      const token = localStorage.getItem("token");
      const response = await api.delete(`/films/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      return this.handleResponse(response, "Erro ao deletar o filme");
    } catch (error) {
      throw this.handleError(error, "Erro desconhecido ao deletar filme");
    }
  }

  async getFilmsByGenre(genreId, page = 1, limit = 10) {
    try {
      const response = await api.get(`/films/genre`, {
        params: { genreId, page, limit },
      });
      return this.handleLimitResponse(response);
    } catch (error) {
      throw this.handleError(
        error,
        "Erro desconhecido ao buscar filmes por gênero"
      );
    }
  }

  async getFilmsByAgeRating(ageRating, page = 1, limit = 10) {
    try {
      const response = await api.get("/films/age-rating", {
        params: { ageRating, page, limit },
      });
      return this.handleLimitResponse(
        response,
        "Erro ao buscar filmes por classificação etária"
      );
    } catch (error) {
      throw this.handleError(
        error,
        "Erro desconhecido ao buscar filmes por classificação etária"
      );
    }
  }

  // Métodos auxiliares
  handleFilmsResponse(response) {
    if (response.data.success && Array.isArray(response.data.films)) {
      return response.data;
    } else {
      throw new Error("Formato de resposta inesperado");
    }
  }

  handleLimitResponse(response) {
    if (response.data.success && Array.isArray(response.data.films)) {
      return {
        films: response.data.films,
        totalCount: response.data.totalCount,
        totalPages: response.data.totalPages,
        currentPage: response.data.currentPage,
      };
    } else {
      throw new Error("Formato de resposta inesperado ao buscar filmes");
    }
  }

  handleResponse(response, defaultErrorMsg) {
    if (response.data.success) {
      return response.data.msg;
    } else {
      throw new Error(response.data.msg || defaultErrorMsg);
    }
  }

  handleError(error, defaultErrorMsg) {
    if (error.response) {
      return new Error(error.response.data.msg || defaultErrorMsg);
    }
    return new Error(defaultErrorMsg);
  }
}

export default new FilmesRepository();
