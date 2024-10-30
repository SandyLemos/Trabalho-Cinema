import api from '../utils/api';

class AuthRepository {
    async login(email, senha) {
        try {
            const response = await api.post('/login', {
                email,
                senha,
            }, { withCredentials: true });
            return response.data; // Retorna os dados do usuário ou token
        } catch (error) {
            // Verifica se o erro tem a estrutura esperada
            if (error.response && error.response.data) {
                const errorData = error.response.data;

                // Lida com diferentes estruturas de erro
                if (Array.isArray(errorData.erro)) {
                    // Caso tenha um array de erros, pega a primeira mensagem
                    const primeiroErro = errorData.erro[0].msg;
                    throw new Error(primeiroErro || "Erro desconhecido");
                } else if (errorData.msg) {
                    // Se houver uma mensagem, usa essa mensagem
                    throw new Error(errorData.msg);
                }
            }
            // Caso o erro não tenha a estrutura esperada
            throw new Error("Erro desconhecido");
        }
    }
}

export default new AuthRepository();
