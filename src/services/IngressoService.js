import IngressoRepository from "../repositories/IngressoRepository.js";

class IngressoService {
  async getAllTicketType() {
    try {
      return await IngressoRepository.getTicketType();
    } catch (error) {
      throw new Error(error.message || "Erro ao buscar o tipo de ingresso");
    }
  }

  async getAllTickePrice() {
    try {
      return await IngressoRepository.getTicketPrice();
    } catch (error) {
      throw new Error(error.message || "Erro ao buscar o tipo de ingresso");
    }
  }

  async createTickerPrice(id_sessao, id_tipo, preco) {
    try {
      const session = await IngressoRepository.createTicketPrice(
        id_sessao,
        id_tipo,
        preco
      );

      return session;
    } catch (e) {
      console.error("Erro ao criar sessão:", e);
      throw e;
    }
  }
}

export default new IngressoService();
