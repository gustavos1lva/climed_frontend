import React from "react";
import { useLocation } from "react-router-dom";
import "./CommonStyles.css"; // Importa o arquivo de estilos comuns

const Consulta = () => {
  const location = useLocation();
  const { consultaData } = location.state || {};

  if (!Array.isArray(consultaData) || consultaData.length === 0) {
    return <div className="container">Nenhum dado disponível.</div>;
  }

  return (
    <div className="container">
      <h2>Resultado das Consultas</h2>
      <div className="consultas">
        {consultaData.map((consulta, index) => (
          <div key={index} className="consulta-item">
            <div className="consulta-detail">
              <label>ID da Consulta:</label>
              <p>{consulta.IdCon}</p>
            </div>
            <div className="consulta-detail">
              <label>CRM:</label>
              <p>{consulta.CRM}</p>
            </div>
            <div className="consulta-detail">
              <label>ID do Especialista:</label>
              <p>{consulta.IdEsp}</p>
            </div>
            <div className="consulta-detail">
              <label>ID do Paciente:</label>
              <p>{consulta.IdPac}</p>
            </div>
            <div className="consulta-detail">
              <label>Data da Consulta:</label>
              <p>{consulta.Data}</p>
            </div>
            <div className="consulta-detail">
              <label>Hora Início da Consulta:</label>
              <p>{consulta.HoraInicCon}</p>
            </div>
            <div className="consulta-detail">
              <label>Hora Fim da Consulta:</label>
              <p>{consulta.HoraFimCon}</p>
            </div>
            <div className="consulta-detail">
              <label>Pagou:</label>
              <p>{consulta.Pagou}</p>
            </div>
            <div className="consulta-detail">
              <label>Valor Pago:</label>
              <p>{consulta.ValorPago}</p>
            </div>
            <div className="consulta-detail">
              <label>Forma de Pagamento:</label>
              <p>{consulta.FormaPagamento}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Consulta;
