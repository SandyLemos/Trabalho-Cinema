import axios from 'axios';

// Cria uma instância do axios
const api = axios.create({
    baseURL: 'https://roasted-haley-cinema-tech-02703ea5.koyeb.app/v1', // URL base da API
    timeout: 10000, // Tempo limite da requisição
});

// Função para configurar o token de autorização
const setAuthToken = (token) => {
    if (token) {
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
        delete api.defaults.headers.common['Authorization'];
    }
};

// Verifica o token no localStorage e aplica no axios, se existir
const token = localStorage.getItem('token');
setAuthToken(token);

export { api, setAuthToken };
