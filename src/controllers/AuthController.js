import AuthRepository from '../repositories/AuthRepository';

class AuthController {
    async login(email, senha) {
        try {
            const userData = await AuthRepository.login(email, senha);
            return userData; // Retorna os dados do usuário ou token
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async register(nome, email, senha, re_senha, cpf, data_nascimento, id_estado, id_cidade, codigo_ref = "") {
        try {
            const registeredUserData = await AuthRepository.registrar(
                nome,
                email,
                senha,
                re_senha,
                cpf.replace(/\D/g, ''),
                data_nascimento,
                parseInt(id_estado, 10),
                parseInt(id_cidade, 10),
                codigo_ref
            );
            return registeredUserData; // Retorna os dados do usuário registrado
        } catch (error) {
            throw new Error(error.message); // Retorna o erro se ocorrer
        }
    }
}



export default new AuthController();