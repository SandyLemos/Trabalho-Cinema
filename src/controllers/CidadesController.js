import CidadesRepository from "../repositories/CidadesRepository.js";

class CidadesController {
    async getCidadesByEstado(idEstado) {
        try {
            const cities = await CidadesRepository.getCidadesByEstado(idEstado);
            return { success: true, cities };
        } catch (error) {
            throw new Error(error.message);
        }
    }
}

export default new CidadesController();
