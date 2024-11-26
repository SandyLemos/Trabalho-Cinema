import styles from "../styles/compra_ingressos.module.css";

function Compra_Ingressos() {
  // Função para gerar horas no formato 00:00
  const generateHours = () => {
    const hours = [];
    for (let i = 0; i < 24; i++) {
      const formattedHour = i.toString().padStart(2, "0") + ":00";
      hours.push(formattedHour);
    }
    return hours;
  };

  // Função para gerar números de 1 a 10
  const generateNumbers = () => Array.from({ length: 10 }, (_, i) => i + 1);

  return (
    <>
      <div className={styles.centralizar}>
        <div className={styles.info}>
          <div style={{ height: "100%", display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <label>Data: </label>
            <input type="date" className={styles.date_picker} />
          </div>

          <div className={styles.campos}>
            <label>Tempo: </label>
            <select id={styles.box}>
              {generateHours().map((hour, index) => (
                <option key={index} value={hour}>
                  {hour}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.campos}>
            <label>Idioma:</label>
            <select id={styles.box}>
              <option value="Dublado">Dublado</option>
              <option value="Legendado">Legendado</option>
            </select>
          </div>

          <div className={styles.campos} style={{ borderRight: "none" }}>
            <label>Tipo da Seção:</label>
            <select id={styles.box}>
              <option value="2D">2D</option>
              <option value="3D">3D</option>
            </select>
          </div>
        </div>

        <div className={styles.compra}>
          <div style={{ display: "flex", flexDirection: "column", paddingTop: "2rem" }}>
            <div className={styles.filme_info}>
              <label>Filme:</label>
              <label> </label>
            </div>

            <div className={styles.filme_info}>
              <label>Preço por Ingresso:</label>
              <label> </label>
            </div>

            <div className={styles.filme_info}>
              <label>Classificação:</label>
              <label></label>
            </div>
          </div>

          <div id={styles.info_compra} style={{color:'black'}}>
            <div style={{borderBottom:'solid black', width:"100%" , paddingBottom:'1rem', marginBottom:'1rem'}}>
              <label>Total de Ingressos: &nbsp;&nbsp; </label>
              <select>
                {generateNumbers().map((number, index) => (
                  <option key={index} value={number}>
                    {number}
                  </option>
                ))}
              </select>
            </div>
            <div>
                <label >Preço Total:</label>&nbsp;&nbsp;<label ></label>
            </div>
            <div id={styles.div_botao}>
                <button id={styles.botao}>Comprar Ingressos</button>
            </div>


          </div>
        </div>
      </div>
    </>
  );
}

export default Compra_Ingressos;

