import FilmesRepository from "../repositories/FilmesRepository.js";

class FilmesService {
    async getFilmsByTitle(title) {
        try {
            return await FilmesRepository.getFilmsByTitle(title);
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async createFilm(titulo, sinopse, data_lancamento, duracao, classificacao_etaria, poster_path, backdrop_path, nota_imdb, generos) {
        try {
            const filme = {
                titulo,
                sinopse,
                data_lancamento,
                duracao: parseInt(duracao, 10),
                classificacao_etaria: parseInt(classificacao_etaria, 10),
                poster_path,
                backdrop_path,
                nota_imdb: parseFloat(nota_imdb),
                generos: generos.map(genero => parseInt(genero, 10))
            };

            return await FilmesRepository.createFilm(filme);
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

    async updateFilm(id, titulo, sinopse, data_lancamento, duracao, classificacao_etaria, poster_path, backdrop_path, nota_imdb, generos) {
        try {
            const filme = {
                titulo,
                sinopse,
                data_lancamento,
                duracao: parseInt(duracao, 10),
                classificacao_etaria: parseInt(classificacao_etaria, 10),
                poster_path,
                backdrop_path,
                nota_imdb: parseFloat(nota_imdb),
                generos: generos.map(genero => parseInt(genero, 10))
            };

            return await FilmesRepository.updateFilm(id, filme);
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
            throw new Error(error.message || "Erro ao buscar filmes por classificação etária");
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