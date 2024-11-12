import axios from 'axios';

// Cria uma conexão com a API
const api = axios.create({
    baseURL: 'https://roasted-haley-cinema-tech-02703ea5.koyeb.app/v1', // URL base da API
    timeout: 10000, // Tempo limite da requisição
});

// Verifica se há um token no localStorage e adiciona o Authorization header se existir
const token = localStorage.getItem('token');
if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

export default api;
