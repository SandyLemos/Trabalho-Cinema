import api from '../utils/api';

class AuthRepository {
    async login(email, senha) {
        try {
            const response = await api.post('/login', {
                email,
                senha,
            }, );
            localStorage.setItem('token', response.data.token);
            return response.data; // Retorna os dados do usuário ou token
        } catch (error) {
            // Verifica se o erro tem a estrutura esperada
            if (error.response.data && error.response) {
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


    async registrar(nome, email, senha, re_senha, cpf, data_nascimento, id_estado, id_cidade, codigo_ref) {
        try {
            const response = await api.post('/register', {
                nome,
                email,
                senha,
                re_senha,
                cpf,
                data_nascimento,
                id_estado,
                id_cidade,
                codigo_ref,
            }, );
            localStorage.setItem('token', response.data.token);
            return response.data; // Retorna os dados do usuário ou token
        } catch (error) {
            // Verifica se o erro tem a estrutura esperada
            if (error.response.data && error.response) {
                const errorData = error.response.data;

                // Lida com diferentes estruturas de erro
                if (Array.isArray(errorData.errors)) {
                    // Caso tenha um array de erros, pega a primeira mensagem
                    const primeiroErro = errorData.errors[0].msg;
                    throw new Error(primeiroErro || "Erro desconhecido");
                } else if (errorData.msg) {
                    // Se houver uma mensagem, usa essa mensagem
                    throw new Error(errorData.msg);
                }
            }
            // Caso o erro não tenha a estrutura esperada
            throw new Error(error);
        }
    }

}

export default new AuthRepository();
