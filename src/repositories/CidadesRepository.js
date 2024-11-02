import api from '../utils/api';
import CidadeModel from "../models/CidadeModel.js";

class CidadesRepository {
    async getCidadesByEstado(idEstado) {
        try {
            const response = await api.get(`/states/${idEstado}/cities`);
            if (response.data.success && response.data.cities) {
                return response.data.cities.map(CidadeModel.fromApi);
            } else {
                throw new Error("Formato de resposta inesperado");
            }
        } catch (error) {
            // Lida com possíveis erros da requisição
            if (error.response && error.response.data) {
                const errorData = error.response.data;

                if (Array.isArray(errorData.erro)) {
                    const primeiroErro = errorData.erro[0].msg;
                    throw new Error(primeiroErro);
                } else if (errorData.msg) {
                    throw new Error(errorData.msg);
                }
            }
            throw new Error("Erro desconhecido");
        }
    }
}


export default new CidadesRepository();
