import {api} from '../utils/api';

class CidadesRepository {
    async getCidadesByEstado(idEstado) {
        try {
            const response = await api.get(`/states/${idEstado}/cities`);
            if (response.data.success) {
                return response.data.cities;
            } else {
                throw new Error(response.data.msg || "Erro desconhecido");
            }
        } catch (error) {
            // Lida com possíveis erros da requisição
            if (error.response.data.msg && error.response.data && error.response) {
                throw new Error(error.response.data.msg);
            }
            throw new Error("Erro desconhecido");
        }
    }

}


export default new CidadesRepository();
