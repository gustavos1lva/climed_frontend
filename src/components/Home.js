import React from "react";
import { useNavigate } from "react-router-dom";
import "./CommonStyles.css"; // Importa o arquivo de estilos comuns

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="container">
      <h2>Gestão Climed</h2>
      <div className="form">
        <button
          className="btn-submit"
          onClick={() => navigate("/pesquisar-medicos")}
        >
          Pesquisar Médicos
        </button>
        <button
          className="btn-submit"
          onClick={() => navigate("/consulta-operations")}
        >
          Operações de Consultas
        </button>
        <button
          className="btn-submit"
          onClick={() => navigate("/pesquisar-especialidade")}
        >
          Pesquisar Especialidade
        </button>
        <button
          className="btn-submit"
          onClick={() => navigate("/paciente-operations")}
        >
          Operações de Paciente
        </button>
      </div>
    </div>
  );
};

export default Home;
