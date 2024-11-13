import SessaoRepository from "../repositories/SessaoRepository.js";

class SessaoService {

    async getSessionMonth() {
        try {
            // Faz a chamada ao repositório para obter os filmes
            const films = await SessaoRepository.getSessionByMonth();

            // Mapeia os filmes e suas sessões
            const filmsWithSessions = films.map(film => ({
                id: film.id,
                titulo: film.titulo,
                slug: film.slug,
                sinopse: film.sinopse,
                data_lancamento: new Date(film.data_lancamento),
                duracao: `${Math.floor(film.duracao / 60)}h ${film.duracao % 60}min`,
                classificacao_etaria: film.classificacao_etaria,
                poster: film.poster,
                nota_imdb: film.nota_imdb,
                trailer_url: film.trailer_url,
                generos: film.generos,
                sessoes: film.sessoes.map(sessao => ({
                    id_sessao: sessao.id_sessao,
                    data_sessao: new Date(sessao.data_sessao), // Convertendo para objeto Date
                    sala: sessao.sala
                }))
            }));

            // Categoriza os filmes
            const now = new Date();

            // Filmes principais (com as maiores notas IMDB do mês atual)
            const principal = filmsWithSessions
                .sort((a, b) => b.nota_imdb - a.nota_imdb)  // Ordenando por nota IMDB
                .slice(0, 3);  // Pegando os 3 filmes com maior nota

            // Filmes em exibição (com lançamento passado ou no mesmo mês e com sessões agendadas)
            const exibicao = filmsWithSessions.filter(film =>
                film.data_lancamento <= now && film.sessoes.length > 0
            ).slice(0, 4); // Limitando a 4 filmes

            // Filmes em breve (com lançamento futuro)
            const emBreve = filmsWithSessions.filter(film =>
                film.data_lancamento > now
            ).slice(0, 4); // Limitando a 4 filmes

            return {
                principal,
                exibicao,
                emBreve
            };

        } catch (e) {
            console.error("Erro ao mapear sessões do mês:", e);
            throw e;
        }
    }
}

export default new SessaoService();
