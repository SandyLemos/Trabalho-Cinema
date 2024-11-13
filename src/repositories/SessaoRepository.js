import api from "../utils/api.js";

class SessaoRepository {

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
}

export default new SessaoRepository();
