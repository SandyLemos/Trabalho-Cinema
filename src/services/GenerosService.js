import GenerosRepository from "../repositories/GenerosRepository.js";

class GenerosService {
  async createGenre(nome_genero) {
    try {
      const genre = {
        nome_genero,
      };
      return await GenerosRepository.createGenre(genre);
    } catch (error) {
      throw new Error(error.message || "Erro na criação do genero");
    }
  }

  async getAllGenres() {
    try {
      return await GenerosRepository.getAllGenres();
    } catch (error) {
      throw new Error(error.message || "Erro ao buscar os gêneros");
    }
  }

  async updateGenre(id, nome_genero) {
    try {
      return await GenerosRepository.updateGenre(id, nome_genero);
    } catch (error) {
      throw new Error(error.message || "Erro na atualização do gênero");
    }
  }
  async getGenreById(id) {
    try {
      return await GenerosRepository.getGenreById(id);
    } catch (error) {
      throw new Error(error.message || "Erro ao buscar o gênero");
    }
  }

  async deleteGenre(id) {
    try {
      return await GenerosRepository.deleteGenre(id);
    } catch (error) {
      throw new Error(error.message || "Erro ao deletar o gênero");
    }
  }
}

export default new GenerosService();