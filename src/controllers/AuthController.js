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
}

export default new AuthController();