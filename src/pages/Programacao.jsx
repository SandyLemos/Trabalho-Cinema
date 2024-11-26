import { useState, useEffect } from "react";
import styles from "../styles/programacao.module.css";
import SessaoService from "../services/SessaoService";
import { useNavigate } from "react-router-dom";

const Programacao = () => {
  const [sessions, setSessions] = useState([]);
  const [datesWithSessions, setDatesWithSessions] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const navigate = useNavigate();

  // Função para carregar as sessões ao montar o componente
  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const fetchedSessions = await SessaoService.getAllSessions();
        setSessions(fetchedSessions);

        // Extrai as datas disponíveis com sessões (YYYY-MM-DD)
        const uniqueDates = [
          ...new Set(
              fetchedSessions.map((sessao) => {
                return new Date(sessao.data_sessao).toISOString().split("T")[0];
              })
          ),
        ];
        setDatesWithSessions(uniqueDates);

        // Seleciona o primeiro dia com sessões como padrão
        setSelectedDate(uniqueDates[0] || "");
      } catch (error) {
        console.error("Erro ao carregar sessões:", error);
      }
    };

    fetchSessions();
  }, []);

  // Funções para navegar entre os meses com sessões
  const handlePrevMonth = () => {
    const currentMonth = new Date(selectedDate).getMonth(); // Pega o mês atual
    const prevMonthDate = new Date(selectedDate);
    prevMonthDate.setMonth(currentMonth - 1); // Muda para o mês anterior

    const prevMonthString = prevMonthDate.toISOString().slice(0, 7); // Formata como YYYY-MM

    // Encontre o primeiro dia disponível no mês anterior
    const prevMonthAvailableDate = datesWithSessions.find((date) =>
        date.startsWith(prevMonthString)
    );
    if (prevMonthAvailableDate) {
      setSelectedDate(prevMonthAvailableDate);
    }
  };

  const handleNextMonth = () => {
    const currentMonth = new Date(selectedDate).getMonth(); // Pega o mês atual
    const nextMonthDate = new Date(selectedDate);
    nextMonthDate.setMonth(currentMonth + 1); // Muda para o mês seguinte

    const nextMonthString = nextMonthDate.toISOString().slice(0, 7); // Formata como YYYY-MM

    // Encontre o primeiro dia disponível no mês seguinte
    const nextMonthAvailableDate = datesWithSessions.find((date) =>
        date.startsWith(nextMonthString)
    );
    if (nextMonthAvailableDate) {
      setSelectedDate(nextMonthAvailableDate);
    }
  };

  // Função para verificar se há filmes no próximo mês
  const isNextMonthAvailable = () => {
    const currentMonth = selectedDate.slice(0, 7); // Pega apenas o ano e mês no formato YYYY-MM
    const nextMonth = new Date(currentMonth + "-01");
    nextMonth.setMonth(nextMonth.getMonth() + 1);
    const nextMonthString = nextMonth.toISOString().slice(0, 7);
    return datesWithSessions.some((date) => date.startsWith(nextMonthString));
  };

  // Função para verificar se a data já passou (para desabilitar botões de sessão passados)
  const isSessionPassed = (date, time) => {
    const sessionDate = new Date(date);
    const [hour, minute] = time.split(":").map(Number);
    sessionDate.setHours(hour, minute, 0, 0); // Ajusta para o horário da sessão

    return sessionDate < new Date(); // Se o horário da sessão já passou
  };

  // Agrupar sessões por filme e horário, considerando a data selecionada
  const groupedSessions = sessions.reduce((acc, session) => {
    const sessionDate = new Date(session.data_sessao)
        .toISOString()
        .split("T")[0]; // YYYY-MM-DD
    if (sessionDate === selectedDate) {
      const filmId = session.filme.id;
      if (!acc[filmId]) {
        acc[filmId] = {
          filme: session.filme,
          horarios: [],
        };
      }
      const horario = session.data_sessao
          .toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });
      acc[filmId].horarios.push(horario);
    }
    return acc;
  }, {});

  // Filtra as datas do mês selecionado
  const getMonthDates = () => {
    const selectedMonth = new Date(selectedDate).getMonth(); // Extrai o mês do selectedDate
    return datesWithSessions.filter(
        (date) => new Date(date).getMonth() === selectedMonth
    );
  };

  const handleClickFilme = (id, slug) => {
    navigate(`/filme/${id}/${slug}`); // Redireciona para a página do filme com base no slug
  };

  return (
      <div>
        {/* Carrossel de meses */}
        <div className={styles.dateCarousel}>
          <button onClick={handlePrevMonth} className={styles.button}>
            Anterior
          </button>
          <span>
          {selectedDate &&
              new Date(selectedDate).toLocaleDateString("pt-BR", {
                month: "long",
                year: "numeric",
              })}
        </span>
          <button
              onClick={handleNextMonth}
              className={styles.button}
              disabled={!isNextMonthAvailable()}
          >
            Próximo
          </button>
        </div>

        {/* Carrossel de datas */}
        <div className={styles.carrosselDeDatas}>
          {getMonthDates().map((date) => (
              <div
                  key={date}
                  className={`${styles.itemData} ${
                      date === selectedDate ? styles.selected : ""
                  }`}
                  onClick={() => setSelectedDate(date)}
              >
                <div className={styles.data}>
                  {new Date(date).toLocaleDateString("pt-BR", {
                    day: "2-digit",
                    month: "short",
                  })}
                </div>
              </div>
          ))}
        </div>

        {/* Conteúdo principal */}
        <div className={styles.content}>
          {Object.values(groupedSessions).map(({ filme, horarios }) => (
              <div key={filme.id} className={styles.filmeCard}>
                <h3>{filme.titulo}</h3>
                <p>{filme.sinopse}</p>

                {/* Exibindo os horários da sessão */}
                <div className={styles.horarios}>
                  {horarios.length > 0 ? (
                      horarios.map((horario, idx) => {
                        const disabled = isSessionPassed(selectedDate, horario);
                        return (
                            <button
                                key={idx}
                                className={`${styles.buyButton} ${disabled ? styles.disabled : ""}`}
                                disabled={disabled}
                                onClick={() => !disabled && handleClickFilme(filme.id, filme.slug)}
                            >
                              {horario} - Comprar
                            </button>
                        );
                      })
                  ) : (
                      <p>Sem horários disponíveis para este dia.</p>
                  )}
                </div>
              </div>
          ))}
        </div>

        {/* Rodapé */}
        <div className={styles.footer}>
          <div className={styles.button}>Voltar ao topo</div>
          <div className={styles.socialLinks}>
            <a href="#facebook">Facebook</a> | <a href="#twitter">Twitter</a>
          </div>
          <div>© 2024 Cinema Tech</div>
        </div>
      </div>
  );
};

export default Programacao;
