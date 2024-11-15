import {BrowserRouter as Router, Routes, Route, Outlet} from 'react-router-dom';
import Registrar from './pages/Registrar.jsx';
import BarraMenu from "./pages/components/BarraMenu.jsx";
import Search from "./pages/components/Search.jsx";
import Entrar from "./pages/Entrar.jsx";
import TelaPrincipal from "./pages/TelaPrincipal.jsx";
import NotFound from "./pages/components/NotFound.jsx";

const App = () => {
    return (
        <Router>
            <Routes>
                <Route element={<LayoutWithMenu />}>
                    <Route path="/" element={<TelaPrincipal />} />
                    <Route path="/search" element={<Search />} />
                </Route>
                <Route path="/entrar" element={<Entrar />} />
                <Route path="/registrar" element={<Registrar />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </Router>
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
