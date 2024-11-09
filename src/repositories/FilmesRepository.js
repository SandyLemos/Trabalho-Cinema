import api from "../utils/api.js";

class FilmesRepository {

    async getAllFilms(page = 1, limit = 10) {
        try {
            const response = await api.get('/filmes', {
                params: { page, limit }
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

    async getFilmById(id) {
        try {
            const response = await api.get(`/films/${id}`);
            return this.handleFilmResponse(response);
        } catch (error) {
            throw this.handleError(error, "Erro desconhecido ao buscar filme");
        }
    }


    async createFilm(filmData) {
        try {
            const response = await api.post('/films', filmData, {
                withCredentials: true,
            });
            return this.handleResponse(response, "Erro ao criar o filme");
        } catch (error) {
            throw this.handleError(error, "Erro desconhecido ao criar filme");
        }
    }

    async updateFilm(id, filmData) {
        try {
            const response = await api.put(`/films/${id}`, filmData, {
                withCredentials: true,
            });
            return this.handleResponse(response, "Erro ao atualizar o filme");
        } catch (error) {
            throw this.handleError(error, "Erro desconhecido ao atualizar filme");
        }
    }

    async deleteFilm(id) {
        try {
            const response = await api.delete(`/films/${id}`, {
                withCredentials: true,
            });
            return this.handleResponse(response, "Erro ao deletar o filme");
        } catch (error) {
            throw this.handleError(error, "Erro desconhecido ao deletar filme");
        }
    }

    async getFilmsByGenre(genreId, page = 1, limit = 10) {
        try {
            const response = await api.get(`/films/genre`, {
                params: { genreId, page, limit }
            });
            return this.handleLimitResponse(response);
        } catch (error) {
            throw this.handleError(error, "Erro desconhecido ao buscar filmes por gênero");
        }
    }

    async getFilmsByAgeRating(ageRating, page = 1, limit = 10) {
        try {
            const response = await api.get('/films/age-rating', {
                params: { ageRating, page, limit }
            });
            return this.handleLimitResponse(response, "Erro ao buscar filmes por classificação etária");
        } catch (error) {
            throw this.handleError(error, "Erro desconhecido ao buscar filmes por classificação etária");
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
                films: response.data.films, // Retorna os filmes diretamente
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
        if (error.response && error.response.data && error.response.data.msg) {
            return new Error(error.response.data.msg);
        }
        return new Error(defaultErrorMsg);
    }
}

export default new FilmesRepository();
