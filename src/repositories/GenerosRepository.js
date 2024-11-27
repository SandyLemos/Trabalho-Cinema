import {api} from "../utils/api.js";

class GenerosRepository {
  async createGenre(genresData) {
    try {
      const token = localStorage.getItem("token");
      const response = await api.post("/genres", genresData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return this.handleResponse(response, "Erro ao criar o gênero");
    } catch (error) {
      throw this.handleError(error, "Erro desconhecido ao criar o gênero");
    }
  }

  async getAllGenres() {
    try {
      const response = await api.get("/genres");
      return response.data;
    } catch (error) {
      throw this.handleError(error, "Erro desconhecido ao buscar os gêneros");
    }
  }

  async updateGenre(id, genre) {
    try {
      const response = await api.put(`/genres/${id}`, genre, {
        withCredentials: true,
      });
      return this.handleResponse(response, "Erro ao atualizar o gênero");
    } catch (error) {
      throw this.handleError(error, "Erro desconhecido ao atualizar o gênero");
    }
  }

  async getGenreById(id) {
    try {
      const response = await api.get(`/genres/${id}`, {
        withCredentials: true,
      });
      return this.handleResponse(response, "Erro ao buscar o gênero", "data");
    } catch (error) {
      throw this.handleError(error, "Erro desconhecido ao buscar o gênero");
    }
  }

  async deleteGenre(id) {
    try {
      const token = localStorage.getItem("token");
      const response = await api.delete(`/genres/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return this.handleResponse(response, "Erro ao deletar o gênero");
    } catch (error) {
      throw this.handleError(error, "Erro desconhecido ao deletar o gênero");
    }
  }

  // Métodos auxiliares para manipulação de respostas e erros
  handleResponse(response, defaultErrorMsg) {
    if (response.data.success) {
      return response.data;
    } else {
      throw new Error(response.data.msg || defaultErrorMsg);
    }
  }

  handleError(error, defaultErrorMsg) {
    if (error.response && error.response.data && error.response.data.msg) {
      return new Error(error.response.data.msg);
    }
    return new Error(defaultErrorMsg);
  }
}

export default new GenerosRepository();
