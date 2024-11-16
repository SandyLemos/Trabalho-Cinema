import SalaRepository from "../repositories/SalaRepository.js";

class RoomService {
    // Função para criar a sala e adicionar cadeiras
    async createRoomWithChairs(nome_sala, id_tipo_sala, ativo, chairsData) {
        try {
            // Cria a sala e pega a resposta completa, incluindo o ID da sala
            const roomResponse = await SalaRepository.createRoom(nome_sala, parseInt(id_tipo_sala), ativo);
            console.log("Dados da sala criada:", roomResponse);
            // Verifica se a criação foi bem-sucedida
            if (roomResponse && roomResponse.id_sala) {

                const roomId = roomResponse.id_sala;

                const chairsResponse = await SalaRepository.addChairsToRoom(roomId, chairsData);

                // Retorna a resposta completa com informações da sala e das cadeiras
                return {
                    success: true,
                    msg: roomResponse.msg,
                    roomDetails: roomResponse.rooms,
                    chairsDetails: chairsResponse
                };
            } else {
                throw new Error("Erro ao criar a sala.");
            }
        } catch (e) {
            console.error("Erro ao criar a sala e adicionar cadeiras:", e);
            throw e;
        }
    }

    // Metodo para obter os tipos de salas
    async getRoomTypes() {
        try {
            const types = await SalaRepository.getRoomTypes();
            return types;
        } catch (e) {
            console.error("Erro ao obter os tipos de salas:", e);
            throw e;
        }
    }

    // Metodo para obter os tipos de salas
    async getRooms() {
        try {
            const rooms = await SalaRepository.getRooms();
            return rooms;
        } catch (e) {
            console.error(e);
            throw e;
        }
    }

    async deleteRoom(id) {
        try {
            const roomId = parseInt(id, 10);

            if (isNaN(roomId)) {
                throw new Error("ID da sala inválido");
            }

            const room = await SalaRepository.deleteRoom(roomId);
            return room;
        } catch (e) {
            console.error(e);
            throw e;
        }
    }


    async getRoomById(id) {
        try {
            const roomId = parseInt(id, 10);

            if (isNaN(roomId)) {
                throw new Error("ID da sala inválido");
            }

            const room = await SalaRepository.getRoomById(roomId);
            return room;
        } catch (e) {
            console.error(e);
            throw e;
        }
    }

}

export default new RoomService();
