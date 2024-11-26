import {
    BrowserRouter as Router,
    Routes,
    Route,
    Outlet,
    useLocation,
  } from "react-router-dom";
  import { useEffect } from "react";
  import Registrar from "./pages/Registrar.jsx";
  import BarraMenu from "./pages/components/BarraMenu.jsx";
  import Search from "./pages/components/Search.jsx";
  import Entrar from "./pages/Entrar.jsx";
  import TelaPrincipal from "./pages/TelaPrincipal.jsx";
  import NotFound from "./pages/components/NotFound.jsx";
  import Dashboard from "./pages/components/Dashboard.jsx";
  import CriarSala from "./pages/Salas/CriarSala.jsx";
  import ListarSalas from "./pages/Salas/ListarSalas.jsx";
  import EditarSala from "./pages/Salas/EditarSala.jsx";
  import TelaFilme from "./pages/TelaFilme.jsx";
  import Programacao from "./pages/Programacao.jsx";
  import Criar_sessao from "./pages/criar_sessao.jsx";
  
  const App = () => {
    return (
      <Router>
        <ThemedRoutes /> {/* Separa as rotas e o uso de temas */}
      </Router>
    );
  };
  
  const ThemedRoutes = () => {
    const location = useLocation();
  
    // Define temas com base na rota
    useEffect(() => {
      document.body.className = ""; // Remove todas as classes anteriores
      if (location.pathname === "/entrar" || location.pathname === "/registrar") {
        document.body.classList.add("tema1");
      } else {
        document.body.classList.add("tema2");
      }
    }, [location]);
  
    return (
      <Routes>
        <Route element={<LayoutWithMenu />}>
          <Route path="/" element={<TelaPrincipal />} />
          <Route path="/programacao" element={<Programacao />} />
          <Route path="/search" element={<Search />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/criar-sala" element={<CriarSala />} />
          <Route path="/listar-salas" element={<ListarSalas />} />
          <Route path="/editar-sala/:id_sala" element={<EditarSala />} />
          <Route path="/filme/:id/:slug" element={<TelaFilme />} />
          <Route path="/sessao" element={<Criar_sessao/>} />
        </Route>
        <Route path="/entrar" element={<Entrar />} />
        <Route path="/registrar" element={<Registrar />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    );
  };
  
  const LayoutWithMenu = () => {
    return (
      <div>
        <BarraMenu />
        <main>
          <Outlet />
        </main>
      </div>
    );
  };
  
  export default App;
  
