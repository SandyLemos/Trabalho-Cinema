import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Entrar from './views/Entrar.jsx';
import Registrar from './views/Registrar.jsx'; // Supondo que você tenha um componente Registrar

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
