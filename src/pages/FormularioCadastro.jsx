import { useState } from 'react'
import './App.css'
import fundo from "../src/assets/fundo_cinema.png"

function App() {

  const [form, setForm] = useState({
    titulo: '',
    descricao: '',
    genero: '',
    duracao: '',
    classificacao: '',
    ano: '',
    diretor: '',
    elenco: '',
    imagem: null,
    trailer: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleFileChange = (e) => {
    setForm({ ...form, imagem: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // lógica para enviar o formulário
    console.log(form);
  };

  return (
  <body style={{ backgroundImage: `url(${fundo})`, backgroundSize:"100% 100%" }}>
    
  
  <div className="form-container">
  <div className="form-card">
    <h1 className="form-title"> Formulário de Cadastro - Filmes</h1>
    <form onSubmit={handleSubmit} className="form-content">
      <div className="form-group">
        <label>Título</label>
        <input
          type="text"
          name="titulo"
          placeholder="Informe o Título do filme"
          value={form.titulo}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label>Descrição</label>
        <input
          type="text"
          name="descricao"
          placeholder="Informe a descrição do filme"
          value={form.descricao}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label>Gênero</label>
        <select
          name="genero"
          value={form.genero}
          onChange={handleChange}
        >
          <option value="">Escolha o gênero do filme</option>
          <option value="acao">Ação</option>
          <option value="comedia">Comédia</option>
          <option value="drama">Drama</option>
          <option value="terror">Terror</option>
        </select>
      </div>
      <div className="form-group">
            <label>Duração</label>
            <input
              type="text"
              name="duracao"
              placeholder="Informe a duração em minutos"
              value={form.duracao}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Classificação Etária</label>
            <input
              type="text"
              name="classificacao"
              placeholder="Informe a faixa etária recomendada"
              value={form.classificacao}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Ano de Lançamento</label>
            <input
              type="text"
              name="ano"
              placeholder="Informe o ano de lançamento"
              value={form.ano}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Diretor</label>
            <input
              type="text"
              name="diretor"
              placeholder="Informe o nome do diretor"
              value={form.diretor}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Elenco</label>
            <input
              type="text"
              name="elenco"
              placeholder="Informe os principais atores"
              value={form.elenco}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Imagem do Filme</label>
            <input
              type="file"
              name="imagem"
              onChange={handleFileChange}
            />
            </div>
          <div className="form-group">
            <label>Trailer</label>
            <input
              type="text"
              name="trailer"
              placeholder="Link para o trailer (URL do vídeo)"
              value={form.trailer}
              onChange={handleChange}
            />
          </div>
          <div className="form-actions">
            <button type="button" className="cancel-button">Cancelar</button>
            <button type="submit" className="save-button">Salvar</button>
          </div>
        </form>
      </div>
    </div>
    </body>
);
}

    


export default App
