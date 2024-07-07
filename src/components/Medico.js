import React from "react";
import { useLocation } from "react-router-dom";
import "./CommonStyles.css"; // Importa o arquivo de estilos comuns

const Medico = () => {
  const location = useLocation();
  const { medicoData } = location.state || {};

  if (!Array.isArray(medicoData) || medicoData.length === 0) {
    return <div className="container">Nenhum dado disponível.</div>;
  }

  return (
    <div className="container">
      <h2>Resultado da Pesquisa de Médicos</h2>
      <div className="diagnosticos">
        {medicoData.map((medico, index) => (
          <div key={index} className="diagnostico-item">
            <div className="diagnostico-detail">
              <label>CRM:</label>
              <p>{medico.crm}</p>
            </div>
            <div className="diagnostico-detail">
              <label>Nome:</label>
              <p>{medico.nomeMedico}</p>
            </div>
            <div className="diagnostico-detail">
              <label>Telefone:</label>
              <p>{medico.telefoneMedico}</p>
            </div>
            <div className="diagnostico-detail">
              <label>Percentual:</label>
              <p>{medico.percentual}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Medico;
