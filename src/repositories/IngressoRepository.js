import { api } from "../utils/api.js";

class IngressoRepository {
  async createTicketPrice(id_sessao, id_tipo, preco) {
    try {
      const token = localStorage.getItem("token");
      const response = await api.post(
        "/ticket-price",
        {
          id_sessao,
          id_tipo,
          preco,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        return response.data.session;
      } else {
        throw new Error("Formato de resposta inesperado");
      }
    } catch (e) {
      console.error("Erro ao criar tipo de preco:", e);
      throw e;
    }
  }

  async createReservation(id_sessao, payload) {
    try {
      const token = localStorage.getItem("token");
      const response = await api.post(
        "/bookings",
        payload, // Usa o payload completo já preparado
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        return response.data;
      } else {
        throw new Error("Formato de resposta inesperado");
      }
    } catch (e) {
      console.error("Erro ao criar reserva:", e);
      throw e;
    }
  }
  async getTicketType() {
    try {
      const response = await api.get("/ticket-type");

      if (response.data.success) {
        return response.data;
      } else {
        throw new Error("Erro ao buscar o tipo de ingresso");
      }
    } catch (e) {
      console.error("Erro ao buscar o tipo de ingresso:", e);
      throw e;
    }
  }

  async getTicketPrice() {
    try {
      const response = await api.get("/ticket-price");

      if (response.data.success) {
        return response.data.ticketPrices;
      } else {
        throw new Error("Erro ao buscar o tipo de ingresso");
      }
    } catch (e) {
      console.error("Erro ao buscar o tipo de ingresso:", e);
      throw e;
    }
  }
}
export default new IngressoRepository();
