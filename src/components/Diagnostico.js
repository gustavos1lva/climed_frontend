import React from "react";
import { useLocation } from "react-router-dom";
import "./CommonStyles.css"; // Importa o arquivo de estilos comuns

const Diagnostico = () => {
  const location = useLocation();
  const { diagnosticoData } = location.state || {};

  if (!Array.isArray(diagnosticoData) || diagnosticoData.length === 0) {
    return <div className="container">Nenhum dado disponível.</div>;
  }

  return (
    <div className="container">
      <h2>Resultado dos Diagnósticos</h2>
      <div className="diagnosticos">
        {diagnosticoData.map((diagnostico, index) => (
          <div key={index} className="diagnostico-item">
            <div className="diagnostico-detail">
              <label>ID do Diagnóstico:</label>
              <p>{diagnostico.IdDiagnostico}</p>
            </div>
            <div className="diagnostico-detail">
              <label>Tratamento Recomendado:</label>
              <p>{diagnostico.TratamentoRecomendado}</p>
            </div>
            <div className="diagnostico-detail">
              <label>Remédios Receitados:</label>
              <p>{diagnostico.RemediosReceitados}</p>
            </div>
            <div className="diagnostico-detail">
              <label>Observações:</label>
              <p>{diagnostico.Observacoes}</p>
            </div>
            <div className="diagnostico-detail">
              <label>ID da Consulta:</label>
              <p>{diagnostico.IdCon}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Diagnostico;
