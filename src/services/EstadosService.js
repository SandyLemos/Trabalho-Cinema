import EstadosRepository from "../repositories/EstadosRepository.js";

class EstadosService {
    async getAllStates() {
        try {
            const states = await EstadosRepository.getAllStates();

            const allState = states.map ( state =>( {
                id: state.id_estado,
                nome: state.nome_estado,
                sigla: state.sigla_estado,
            }));

            return {
                allState
            };
        } catch (error) {
            throw new Error(error.message);
        }
    }
}

export default new EstadosService;