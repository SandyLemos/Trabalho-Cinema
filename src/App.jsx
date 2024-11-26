import {BrowserRouter as Router, Routes, Route, Outlet} from 'react-router-dom';
import Registrar from './pages/Registrar.jsx';
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
import CompraIngressos from './pages/CompraIngressos.jsx';
import { AssentoProvider } from './contexts/AssentoContext.jsx';

const App = () => {
    return (
        <AssentoProvider>
            <Router>
                <Routes>
                    <Route element={<LayoutWithMenu />}>
                        <Route path="/" element={<TelaPrincipal />} />
                        <Route path="/compra-ingresso" element={<CompraIngressos />} />
                        <Route path="/programacao" element={<Programacao />} />
                        <Route path="/search" element={<Search />} />
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/criar-sala" element={<CriarSala />} />
                        <Route path="/listar-salas" element={<ListarSalas />} />
                        <Route path="/editar-sala/:id_sala" element={<EditarSala />} />
                        <Route path="/filme/:id/:slug" element={<TelaFilme />} />
                    </Route>
                    <Route path="/entrar" element={<Entrar />} />
                    <Route path="/registrar" element={<Registrar />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </Router>
        </AssentoProvider>
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
