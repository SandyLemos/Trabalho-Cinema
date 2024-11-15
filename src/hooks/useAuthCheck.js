import { useState, useEffect } from "react";
import { api, setAuthToken } from "../utils/api"; // Importa a função para atualizar o token no axios

const useAuthCheck = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [role, setRole] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const checkAuth = async () => {
            const token = localStorage.getItem('token');

            if (!token) {
                setIsAuthenticated(false);
                setRole(null);
                setLoading(false);
                return;
            }

            setAuthToken(token); // Atualiza o token no axios

            try {
                // Envia o token para o backend para verificação
                const response = await api.get('/verify', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                });

                if (response.status === 200) {
                    setIsAuthenticated(true);
                    setRole(response.data.role); // Supondo que o backend retorne o role do usuário
                } else {
                    setIsAuthenticated(false);
                    setRole(null);
                }
            } catch (error) {
                setIsAuthenticated(false);
                setRole(null);
                setError(error.message || "Erro ao verificar o token");
            } finally {
                setLoading(false);
            }
        };

        checkAuth();
    }, []); // Esse hook é executado apenas uma vez, na montagem do componente

    return { isAuthenticated, role, loading, error };
};

export default useAuthCheck;
