import {api} from '../utils/api';

class EstadosRepository {
    async getAllStates() {
        try {
            const response = await api.get('/states');
            // Verificamos se a resposta está no formato esperado
            if (response.data.success) {
                return response.data.states;
            } else {
                throw new Error("Formato de resposta inesperado");
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

export default new EstadosRepository;
