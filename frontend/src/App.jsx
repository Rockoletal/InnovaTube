import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from "./Components/Login/Login.jsx";
import Registro from "./Components/Registro/Registro.jsx";
import Principal from "./Components/Seccion_principal/Principal.jsx";
import "./App.css";
import React from "react";
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
