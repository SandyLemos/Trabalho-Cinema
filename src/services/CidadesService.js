import CidadesRepository from "../repositories/CidadesRepository.js";

class CidadesService {
    async getCidadesByEstado(idEstado) {
        try {
            return await CidadesRepository.getCidadesByEstado(idEstado) ;
        } catch (error) {
            throw new Error(error.message);
        }
    }
}

export default new CidadesService();
