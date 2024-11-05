import EstadosRepository from "../repositories/EstadosRepository.js";

class EstadosService {
    async getAllStates() {
        try {
            return await EstadosRepository.getAllStates();
        } catch (error) {
            throw new Error(error.message);
        }
    }
}

export default new EstadosService;