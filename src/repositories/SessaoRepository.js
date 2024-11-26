import {api} from "../utils/api.js";

class SessaoRepository {
    async getAllSessions() {
        try {
            const response = await api.get('/sessions');

            if (response.data.success) {
                return response.data.session;
            } else {
                throw new Error("Formato de resposta inesperado");
            }
        } catch (e) {
            console.error("Erro ao buscar sessões:", e);
            throw e;
        }
    }

    async getSessionByMonth() {
        try {
            const response = await api.get('/sessions/with-future-sessions');

            if (response.data.success) {
                return response.data.films;
            } else {
                throw new Error("Formato de resposta inesperado");
            }
        } catch (e) {
            console.error("Erro ao buscar sessões:", e);
            throw e;
        }
    }

    async getSessionByFilmId(id) {
        try {
            const response = await api.get(`/sessions/movie/${id}`);

            if (response.data.success) {
                return response.data;
            } else {
                throw new Error("Formato de resposta inesperado");
            }
        } catch (e) {
            console.error("Erro ao buscar sessões:", e);
            throw e;
        }
    }

    async getSessionById(id){
        try {
            const response = await api.get(`/sessions/${id}`);

            if (response.data.success) {
                return response.data;
            } else {
                throw new Error("Formato de resposta inesperado");
            }
        } catch (e) {
            console.error("Erro ao buscar a sessão:", e);
            throw e;
        }
    }
}

export default new SessaoRepository();
