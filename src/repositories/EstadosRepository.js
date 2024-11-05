import api from '../utils/api';

class EstadosRepository {
    async getAllStates() {
        try {
            const response = await api.get('/states');
            // Verificamos se a resposta está no formato esperado
            if (response.data.success && response.data.states) {
                return response.data.states;
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
                throw new Error("Erro desconhecido");
            }
        }
    }
}

export default new EstadosRepository;
