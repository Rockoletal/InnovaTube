import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login/Login.jsx';
import Registro from './Registro/Registro.jsx';
import Principal from './Seccion_principal/Principal.jsx';
import React from 'react';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/principal" element={<Principal />} />
      </Routes>  
    </Router>
  );
}

export default App;
