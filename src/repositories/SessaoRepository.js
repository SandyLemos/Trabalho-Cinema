import api from "../utils/api.js";

class SessaoRepository {

    // Método para buscar sessões da semana
    async getSessionByWeek() {
        try {
            const response = await api.get('/sessions/this-week');

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
