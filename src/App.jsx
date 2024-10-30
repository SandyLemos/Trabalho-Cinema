import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Entrar from './pages/Entrar.jsx';
import Registrar from './pages/Registrar.jsx';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/entrar" element={<Entrar />} />
                <Route path="/registrar" element={<Registrar />} />
            </Routes>
        </Router>
    );
};

export default App;
