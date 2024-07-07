import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Home from "./components/Home";
import PesquisarEspecialidade from "./components/PesquisarEspecialidade";
import PesquisarMedicos from "./components/PesquisarMedicos";
import Especialidade from "./components/Especialidade";
import ConsultaOperations from "./components/ConsultaOperations";
import Consulta from "./components/Consulta";
import PacienteOperations from "./components/PacienteOperations"; // Importa o componente PacienteOperations
import Medico from "./components/Medico";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route
          path="/pesquisar-especialidade"
          element={<PesquisarEspecialidade />}
        />
        <Route path="/pesquisar-medicos" element={<PesquisarMedicos />} />
        <Route path="/medico" element={<Medico />} />
        <Route path="/consulta-operations" element={<ConsultaOperations />} />
        <Route
          path="/paciente-operations"
          element={<PacienteOperations />}
        />{" "}
        <Route path="/especialidade" element={<Especialidade />} />
        <Route path="/consulta" element={<Consulta />} />
        <Route path="*" element={<Navigate to="/home" />} />
      </Routes>
    </Router>
  );
};

export default App;
