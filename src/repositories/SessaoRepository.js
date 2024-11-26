import { api } from "../utils/api.js";

class SessaoRepository {
   async createSession(id_filme, id_sala, data_sessao) {
    try {
      const token = localStorage.getItem("token");

      // Chamada à API para criar a sessão
      const response = await api.post(
        "/sessions",
        { id_filme, id_sala, data_sessao },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        return response.data.sessionData; // Retorna a sessão criada
      } else {
        throw new Error("Formato de resposta inesperado");
      }
    } catch (e) {
      console.error("Erro ao criar sessão:", e);
      throw e; // Lança o erro para ser tratado no componente
    }
  }


  async getAllSessions() {
    try {
      const response = await api.get("/sessions");

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
      const response = await api.get("/sessions/with-future-sessions");

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

  async getSessionById(id) {
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
