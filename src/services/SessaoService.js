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


    async getSessionByFilmId(id) {
        try {
            const response = await SessaoRepository.getSessionByFilmId(id);

            if (response.success) {
                const { session } = response;

                const formattedSessions = this.mapSessions(session.sessoes);

                return {
                    id: session.id,
                    titulo: session.titulo,
                    slug: session.slug,
                    sinopse: session.sinopse,
                    data_lancamento: new Date(session.data_lancamento),
                    duracao: `${Math.floor(session.duracao / 60)}h ${session.duracao % 60}min`,
                    classificacao_etaria: session.classificacao_etaria,
                    poster: session.poster,
                    nota_imdb: session.nota_imdb,
                    trailer_url: session.trailer_url,
                    generos: session.generos.map((g) => g.nome_genero),
                    sessoes: formattedSessions
                };
            } else {
                throw new Error("Formato de resposta inesperado");
            }
        } catch (e) {
            console.error("Erro ao buscar sessões:", e);
            throw e;
        }
    }

    mapSessions(sessoes) {
        const sessionsByDate = {};

        sessoes.forEach((sessao) => {
            const date = new Date(sessao.data_sessao).toISOString().split('T')[0];
            const time = new Date(sessao.data_sessao).toLocaleTimeString('pt-BR', {
                hour: '2-digit',
                minute: '2-digit',
            });

            if (!sessionsByDate[date]) {
                sessionsByDate[date] = {
                    id_sessao: sessao.id_sessao,
                    date,
                    sala: sessao.sala,
                    times: [],
                };
            }

            sessionsByDate[date].times.push(time);
        });

        return Object.values(sessionsByDate);
    }

    async getSessionById(id_sessao) {
        try {
            // Chama o repositório para obter uma sessão específica pelo ID
            const response = await SessaoRepository.getSessionById(id_sessao);
            if (response.success) {
                const { session } = response;

                // Mapeando a resposta para um formato estruturado
                const mappedSession = {
                    id_sessao: session.id,
                    data_sessao: new Date(session.data_sessao), // Convertendo para objeto Date
                    filme: {
                        id: session.filme.id,
                        titulo: session.filme.titulo,
                        slug: session.filme.slug,
                        sinopse: session.filme.sinopse,
                        data_lancamento: new Date(session.filme.data_lancamento),
                        duracao: `${Math.floor(session.filme.duracao / 60)}h ${session.filme.duracao % 60}min`,
                        classificacao_etaria: session.filme.classificacao_etaria,
                        poster: session.filme.poster,
                        trailer_url: session.filme.trailer_url,
                        nota_imdb: session.filme.nota_imdb
                    },
                    sala: {
                        id: session.sala.id,
                        nome: session.sala.nome,
                        capacidade: session.sala.capacidade,
                        tipo: session.sala.tipo.descricao
                    },
                    precos: session.precos.map(preco => ({
                        id: preco.id,
                        valor: preco.valor,
                        tipo: preco.tipo
                    })),
                    cadeirasReservadas: session.cadeirasReservadas.map(cadeira => ({
                        id_cadeira: cadeira.id_cadeira,
                        linha: cadeira.linha,
                        numero: cadeira.numero
                    }))
                };

                return mappedSession;
            } else {
                throw new Error("Formato de resposta inesperado");
            }
        } catch (e) {
            console.error("Erro ao buscar sessão pelo ID:", e);
            throw e;
        }
    }

}

export default new SessaoService();
