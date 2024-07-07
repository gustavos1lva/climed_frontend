import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./CommonStyles.css"; // Importa o arquivo de estilos comuns

const Especialidade = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { especialidadeData } = location.state || {};

  // Verifica se especialidadeData existe e é um array com dados válidos
  if (!Array.isArray(especialidadeData) || especialidadeData.length === 0) {
    return <div className="container">Nenhum dado disponível.</div>;
  }

  const handleBack = () => {
    navigate("/pesquisar-especialidade");
  };

  return (
    <div className="container">
      <h2>Resultado da Pesquisa de Especialidades</h2>
      <div className="diagnosticos">
        {especialidadeData.map((especialidade, index) => (
          <div key={index} className="diagnostico-item">
            <div className="diagnostico-detail">
              <label>ID da Especialidade:</label>
              <p>{especialidade.idEsp}</p>
            </div>
            <div className="diagnostico-detail">
              <label>Nome:</label>
              <p>{especialidade.nomeEsp}</p>
            </div>
            <div className="diagnostico-detail">
              <label>Índice:</label>
              <p>{especialidade.indice}</p>
            </div>
          </div>
        ))}
      </div>
      <button onClick={handleBack} className="btn-submit btn-voltar">
        Voltar
      </button>
    </div>
  );
};

export default Especialidade;
