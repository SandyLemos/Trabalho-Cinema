import SessaoRepository from "../repositories/SessaoRepository.js";

class SessaoService {

    // Método para buscar sessões da semana, mapear e ordenar os filmes
    async getSessionByWeek() {
        try {
            // Faz a chamada ao repositório para obter os filmes
            const films = await SessaoRepository.getSessionByWeek();

            // Mapeia os filmes e suas sessões
            const filmsWithSessions = films.map(film => ({
                id: film.id,
                titulo: film.titulo,
                sinopse: film.sinopse,
                data_lancamento: new Date(film.data_lancamento).getFullYear(),
                duracao: `${Math.floor(film.duracao / 60)}h ${film.duracao % 60}min`,
                classificacao_etaria: film.classificacao_etaria,
                poster: film.poster,
                nota_imdb: film.nota_imdb,
                generos: film.generos,
                sessoes: film.sessoes.map(sessao => ({
                    id_sessao: sessao.id_sessao,
                    data_sessao: new Date(sessao.data_sessao), // Convertendo para objeto Date
                    sala: sessao.sala
                }))
            }));

            // Ordena os filmes pela quantidade de sessões (mais sessões primeiro) e limita a 4 filmes
            return filmsWithSessions
                .sort((a, b) => b.sessoes.length - a.sessoes.length)  // Ordenando por quantidade de sessões
                .slice(0, 4);

        } catch (e) {
            console.error("Erro ao mapear e ordenar sessões:", e);
            throw e;
        }
    }
}

export default new SessaoService();
