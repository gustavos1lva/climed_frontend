import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Login from "./components/Login";
import Home from "./components/Home";
import ProtectedRoute from "./components/ProtectedRoute";
import PesquisarDiagnosticos from "./components/PesquisarDiagnosticos";
import PesquisarMedicos from "./components/PesquisarMedicos";
import AgendarConsulta from "./components/AgendarConsulta";
import Diagnostico from "./components/Diagnostico";
import Medico from "./components/Medico";
import Consulta from "./components/Consulta";
import PesquisarConsulta from "./components/PesquisarConsulta";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/login" />} />
        <Route
          path="/pesquisar-diagnostico"
          element={<PesquisarDiagnosticos />}
        />
        <Route path="/pesquisar-medicos" element={<PesquisarMedicos />} />
        <Route path="/agendar-consulta" element={<AgendarConsulta />} />
        <Route path="/pesquisar-consulta" element={<PesquisarConsulta />} />
        <Route path="/diagnostico" element={<Diagnostico />} />
        <Route path="/medico" element={<Medico />} />
        <Route path="/consulta" element={<Consulta />} />
      </Routes>
    </Router>
  );
};

export default App;
