import {api} from "../utils/api.js";

class RoomRepository {
    // Metodo para criar uma nova sala
    async createRoom(nome_sala, id_tipo_sala, ativo) {
        try {
            const token = localStorage.getItem('token');
            const response = await api.post('/rooms', {
                nome_sala,
                id_tipo_sala,
                ativo
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (response.data.success) {
                return response.data.newRoom;  // Retorna os dados da sala criada
            } else {
                throw new Error(`Erro ao criar a sala: ${response.data.message || 'Mensagem de erro não fornecida'}`);
            }
        } catch (e) {
            console.error("Erro ao criar a sala:", e);
            throw new Error(e.message || "Erro desconhecido ao criar a sala");
        }
    }

    // Metodo para buscar todas as salas
    async getRooms() {
        try {
            const response = await api.get('/rooms');

            if (response.data.success) {
                return response.data.rooms;
            } else {
                throw new Error("Erro ao buscar as salas");
            }
        } catch (e) {
            console.error("Erro ao buscar salas:", e);
            throw e;
        }
    }

    // Metodo para buscar salas por id
    async getRoomById(id) {
        try {
            const response = await api.get(`/rooms/${id}`);

            if (response.data.success) {
                return response.data.room;
            } else {
                throw new Error("Erro ao buscar sala");
            }
        } catch (e) {
            console.error("Erro ao buscar a sala:", e);
            throw e;
        }
    }


    // Metodo para buscar os tipos de salas
    async getRoomTypes() {
        try {
            const response = await api.get('/room-type');

            if (response.data.success) {
                return response.data.typeRooms;  // Retorna os tipos de salas
            } else {
                throw new Error("Erro ao buscar tipos de sala");
            }
        } catch (e) {
            console.error("Erro ao buscar tipos de sala:", e);
            throw e;
        }
    }

    async addChairsToRoom(roomId, chairsData) {
        try {
            const token = localStorage.getItem('token')
            const response = await api.post(`/rooms/${roomId}/chairs`, chairsData,
                {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (response.data.success) {
                return response.data;
            } else {
                throw new Error("Erro ao adicionar cadeiras");
            }
        } catch (e) {
            console.error("Erro ao adicionar cadeiras:", e);
            throw e;
        }
    }

    async deleteRoom(id) {
        try {
            const token = localStorage.getItem('token')
            const response = await api.delete(`/rooms/${id}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (response.data.success) {
                return response.data;
            } else {
                throw new Error("Erro ao apagar a sala");
            }
        } catch (e) {
            console.error("Erro ao apagar a sala", e);
            throw e;
        }
    }

    async deleteChairsToRoom(chairId){
        try {
            const token = localStorage.getItem('token')
            const response = await api.delete(`chairs/${chairId}`,
                {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (response.data.success) {
                return response.data;
            } else {
                throw new Error("Erro ao apagar cadeira");
            }
        } catch (e) {
            console.error("Erro ao apagar cadeira:", e);
            throw e;
        }
    }
}

export default new RoomRepository();
