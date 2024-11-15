import CidadesRepository from "../repositories/CidadesRepository.js";

class CidadesService {
    async getCidadesByEstado(idEstado) {
        try {
            const cities = await CidadesRepository.getCidadesByEstado(idEstado);

            const allCities = cities.map (cities => ({
                id: cities.id_cidade,
                nome: cities.nome_cidade,
                estadoId: cities.id_estado,
            }))
            return {
                allCities
            };
        } catch (error) {
            throw new Error(error.message);
        }
    }
}

export default new CidadesService();
