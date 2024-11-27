import { useState } from "react";
import styles from "../../styles/admin.dashboard.module.css";
import {
  FaFilm,
  FaList,
  FaPlus,
  FaTheaterMasks,
  FaChair,
  FaClock,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function AdminDashboard() {
  const [selectedSection, setSelectedSection] = useState("");
  const navigate = useNavigate();

  const renderSection = () => {
    switch (selectedSection) {
      case "filmes":
        return (
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>
              <FaFilm className={styles.icon} /> Gerenciar Filmes
            </h2>
            <div className={styles.movieActions}>
              <button
                className={styles.actionButton}
                onClick={() => navigate("/listar-filmes")}
              >
                <FaList className={styles.buttonIcon} /> Listar Filmes
              </button>
              <button
                className={styles.actionButton}
                onClick={() => navigate("/criar-filme")}
              >
                <FaPlus className={styles.buttonIcon} /> Criar Filme
              </button>
            </div>
          </div>
        );
      case "generos":
        return (
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>
              <FaTheaterMasks className={styles.icon} /> Gerenciar Gêneros
            </h2>
            <div className={styles.movieActions}>
              <button
                className={styles.actionButton}
                onClick={() => navigate("/listar-generos")}
              >
                <FaList className={styles.buttonIcon} /> Todas os generos
              </button>
              <button
                className={styles.actionButton}
                onClick={() => navigate("/criar-generos")}
              >
                <FaPlus className={styles.buttonIcon} /> Criar generos
              </button>
            </div>
          </div>
        );
      case "salas":
        return (
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>
              <FaChair className={styles.icon} /> Gerenciar Salas
            </h2>
            <div className={styles.movieActions}>
              <button
                className={styles.actionButton}
                onClick={() => navigate("/listar-salas")}
              >
                <FaList className={styles.buttonIcon} /> Todas as salas
              </button>
              <button
                className={styles.actionButton}
                onClick={() => navigate("/criar-sala")}
              >
                <FaPlus className={styles.buttonIcon} /> Criar Sala
              </button>
            </div>
          </div>
        );
      case "sessoes":
        return (
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>
              <FaClock className={styles.icon} /> Gerenciar Sessões
            </h2>
            <div className={styles.movieActions}>
              <button
                className={styles.actionButton}
                onClick={() => navigate("/listar-sessoes")}
              >
                <FaList className={styles.buttonIcon} /> Todas as Sessoes
              </button>
              <button
                className={styles.actionButton}
                onClick={() => navigate("/criar-sessao")}
              >
                <FaPlus className={styles.buttonIcon} /> Criar Sessao
              </button>
            </div>
          </div>
        );
      default:
        return (
          <p className={styles.placeholderText}>
            Selecione uma seção para gerenciar.
          </p>
        );
    }
  };

  return (
    <div className={styles.dashboardContainer}>
      <h1 className={styles.title}>Gerenciamento de Cinema</h1>
      <div className={styles.gridContainer}>
        <div
          className={styles.gridItem}
          onClick={() => setSelectedSection("filmes")}
        >
          <FaFilm className={styles.gridIcon} />
          <span className={styles.gridLabel}>Gerenciar Filmes</span>
        </div>
        <div
          className={styles.gridItem}
          onClick={() => setSelectedSection("generos")}
        >
          <FaTheaterMasks className={styles.gridIcon} />
          <span className={styles.gridLabel}>Gerenciar Gêneros</span>
        </div>
        <div
          className={styles.gridItem}
          onClick={() => setSelectedSection("salas")}
        >
          <FaChair className={styles.gridIcon} />
          <span className={styles.gridLabel}>Gerenciar Salas</span>
        </div>
        <div
          className={styles.gridItem}
          onClick={() => setSelectedSection("sessoes")}
        >
          <FaClock className={styles.gridIcon} />
          <span className={styles.gridLabel}>Gerenciar Sessões</span>
        </div>
      </div>
      <div className={styles.contentContainer}>{renderSection()}</div>
    </div>
  );
}

export default AdminDashboard;
