import EstadosRepository from "../repositories/EstadosRepository.js";

class EstadosController {
    async getAllStates() {
        try {
            const states = await EstadosRepository.getAllStates();
            return { success: true, states };
        } catch (error) {
            throw new Error(error.message);
        }
    }
}

export default new EstadosController;