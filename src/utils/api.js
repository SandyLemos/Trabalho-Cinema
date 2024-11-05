import axios from 'axios';

// Cria uma conexão com a API
const api = axios.create({
    baseURL: 'https://roasted-haley-cinema-tech-02703ea5.koyeb.app/v1', // URL base da API
    withCredentials: true,
    timeout: 10000, // Tempo limite da requisição
});

export default api;