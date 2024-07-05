import React from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css"; // Importa o arquivo de estilos CSS

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <h2 className="home-title">Home</h2>
      <button
        className="home-button"
        onClick={() => navigate("/agendar-consulta")}
      >
        Agendar consulta
      </button>
      <button
        className="home-button"
        onClick={() => navigate("/pesquisar-diagnostico")}
      >
        Pesquisar Diagnóstico
      </button>
      <button
        className="home-button"
        onClick={() => navigate("/pesquisar-medicos")}
      >
        Pesquisar médicos
      </button>
      <button
        className="home-button"
        onClick={() => navigate("/pesquisar-consulta")}
      >
        Pesquisar consultas
      </button>
    </div>
  );
};

export default Home;
