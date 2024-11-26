import React, { useState } from "react";
import styles from "../styles/programacao.module.css";

const Programacao = () => {
  const [selectedVersion, setSelectedVersion] = useState("Dublado");
  const [selectedExperience, setSelectedExperience] = useState("Digital");
  const [selectedDate, setSelectedDate] = useState("2024-11-25");
  const [dataSelecionada, setDataSelecionada] = useState("nov. 25");

  const diasDaSemana = ["seg.", "ter.", "qua.", "qui.", "sex.", "sáb.", "dom."];

  const datas = [
    { dia: "seg.", num: 25, mes: "nov." },
    { dia: "ter.", num: 26, mes: "nov." },
    { dia: "qua.", num: 27, mes: "nov." },
    { dia: "qui.", num: 28, mes: "nov." },
    { dia: "sex.", num: 29, mes: "nov." },
    { dia: "sáb.", num: 30, mes: "nov." },
    { dia: "dom.", num: 1, mes: "dez." },
    { dia: "seg.", num: 2, mes: "dez." },
    { dia: "ter.", num: 3, mes: "dez." },
    { dia: "qua.", num: 4, mes: "dez." },
  ];

  const filmes = [
    {
      titulo: "Filme A",
      descricao: "Descrição do Filme A",
      horarios: ["14:00", "16:30", "19:00"],
    },
    {
      titulo: "Filme B",
      descricao: "Descrição do Filme B",
      horarios: ["15:00", "18:00", "20:30"],
    },
  ];

  const dates = ["2024-11-25", "2024-11-26", "2024-11-27", "2024-11-28"];

  const handlePrevDate = () => {
    const currentIndex = dates.indexOf(selectedDate);
    if (currentIndex > 0) setSelectedDate(dates[currentIndex - 1]);
  };

  const handleNextDate = () => {
    const currentIndex = dates.indexOf(selectedDate);
    if (currentIndex < dates.length - 1) setSelectedDate(dates[currentIndex + 1]);
  };

  return (
    <div>
      {/* Topo da página */}
      <div className={styles.header}>
        <div className={styles.title}>Cinema Tech</div>
        <div className={styles.versionExperienceSelector}>
          <select
            value={selectedVersion}
            onChange={(e) => setSelectedVersion(e.target.value)}
          >
            <option value="Dublado">Dublado</option>
            <option value="Legendado">Legendado</option>
          </select>
          <select
            value={selectedExperience}
            onChange={(e) => setSelectedExperience(e.target.value)}
          >
            <option value="Digital">Digital</option>
            <option value="3D">3D</option>
          </select>
        </div>
      </div>

      {/* Carrossel de datas */}
      <div className={styles.dateCarousel}>
        <button onClick={handlePrevDate} className={styles.button}>
          Anterior
        </button>
        <span>{selectedDate}</span>
        <button onClick={handleNextDate} className={styles.button}>
          Próximo
        </button>
      </div>

      <div className={styles.carrosselDeDatas}>
        {datas.map((data, index) => (
          <div
            key={index}
            className={styles.itemData}
            onClick={() => setDataSelecionada(`${data.dia} ${data.num} ${data.mes}`)}
          >
            <div className={styles.dia}>{data.dia}</div>
            <div className={styles.data}>
              {data.num} {data.mes}
            </div>
          </div>
        ))}
        <div className={styles.dataSelecionada}>
          <h3>Data Selecionada: {dataSelecionada}</h3>
        </div>
      </div>

      {/* Conteúdo principal */}
      <div className={styles.content}>
        {filmes.map((filme, index) => (
          <div key={index} className={styles.filmeCard}>
            <h3>{filme.titulo}</h3>
            <p>{filme.descricao}</p>
            <div className={styles.horarios}>
              {filme.horarios.map((horario, idx) => (
                <button key={idx} className={styles.buyButton}>
                  {horario} - Comprar
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Final da página */}
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
