import {BrowserRouter as Router, Routes, Route, Outlet} from 'react-router-dom';
import Registrar from './pages/Registrar.jsx';
import Barra_menu from "./pages/components/barra_menu.jsx";
import Search from "./pages/components/Search.jsx";
import Entrar from "./pages/Entrar.jsx";

const App = () => {
    return (
        <Router>
            <Routes>
                <Route element={<LayoutWithMenu />}>
                    <Route path="/" element={<Barra_menu />} />
                    <Route path="/search" element={<Search />} />
                </Route>
                <Route path="/entrar" element={<Entrar />} />
                <Route path="/registrar" element={<Registrar />} />
            </Routes>
        </Router>
    );
};

const LayoutWithMenu = () => {
    return (
        <div>
            <Barra_menu />
            <main>
                <Outlet />
            </main>
        </div>
    );
};

export default App;
