import React from "react";
import { useLocation } from "react-router-dom";
import "./CommonStyles.css"; // Importa o arquivo de estilos comuns

const Especialidade = () => {
  const location = useLocation();
  const { especialidadeData } = location.state || {};

  if (!Array.isArray(especialidadeData) || especialidadeData.length === 0) {
    return <div className="container">Nenhum dado disponível.</div>;
  }

  return (
    <div className="container">
      <h2>Resultado da Pesquisa de Especialidades</h2>
      <div className="diagnosticos">
        {especialidadeData.map((especialidade, index) => (
          <div key={index} className="diagnostico-item">
            <div className="diagnostico-detail">
              <label>ID da Especialidade:</label>
              <p>{especialidade.IdEsp}</p>
            </div>
            <div className="diagnostico-detail">
              <label>Nome:</label>
              <p>{especialidade.NomeE}</p>
            </div>
            <div className="diagnostico-detail">
              <label>Índice:</label>
              <p>{especialidade.Indice}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Especialidade;
