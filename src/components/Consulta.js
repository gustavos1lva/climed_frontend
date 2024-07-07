import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./CommonStyles.css"; // Importa o arquivo de estilos comuns

const Consulta = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { consultaData } = location.state || {};

  if (!Array.isArray(consultaData) || consultaData.length === 0) {
    return <div className="container">Nenhum dado disponível.</div>;
  }

  const handleBack = () => {
    navigate("/pesquisar-consulta");
  };


  return (
    <div className="container">
      <h2>Resultado das Consultas</h2>
      <div className="consultas">
        {consultaData.map((consulta, index) => (
          <div key={index} className="consulta-item">
            <div className="consulta-detail">
              <label>ID da Consulta:</label>
              <p>{consulta.idCon}</p>
            </div>
            <div className="consulta-detail">
              <label>CRM:</label>
              <p>{consulta.medico.crm}</p>
            </div>
            <div className="consulta-detail">
              <label>Nome do Médico:</label>
              <p>{consulta.medico.nomeMedico}</p>
            </div>
            <div className="consulta-detail">
              <label>Telefone do Médico:</label>
              <p>{consulta.medico.telefoneMedico}</p>
            </div>
            <div className="consulta-detail">
              <label>Percentual:</label>
              <p>{consulta.medico.percentual}</p>
            </div>
            <div className="consulta-detail">
              <label>ID do Especialista:</label>
              <p>{consulta.especialidade.idEsp}</p>
            </div>
            <div className="consulta-detail">
              <label>Nome da Especialidade:</label>
              <p>{consulta.especialidade.nomeEsp}</p>
            </div>
            <div className="consulta-detail">
              <label>Índice:</label>
              <p>{consulta.especialidade.indice}</p>
            </div>
            <div className="consulta-detail">
              <label>ID do Paciente:</label>
              <p>{consulta.paciente.idPac}</p>
            </div>
            <div className="consulta-detail">
              <label>CPF:</label>
              <p>{consulta.paciente.cpf}</p>
            </div>
            <div className="consulta-detail">
              <label>Nome do Paciente:</label>
              <p>{consulta.paciente.nomePac}</p>
            </div>
            <div className="consulta-detail">
              <label>Telefone do Paciente:</label>
              <p>{consulta.paciente.telefonePac}</p>
            </div>
            <div className="consulta-detail">
              <label>Endereço:</label>
              <p>{consulta.paciente.endereco}</p>
            </div>
            <div className="consulta-detail">
              <label>Idade:</label>
              <p>{consulta.paciente.idade}</p>
            </div>
            <div className="consulta-detail">
              <label>Sexo:</label>
              <p>{consulta.paciente.sexo}</p>
            </div>
            <div className="consulta-detail">
              <label>Data da Consulta:</label>
              <p>{new Date(consulta.data).toLocaleDateString()}</p>
            </div>
            <div className="consulta-detail">
              <label>Hora Início da Consulta:</label>
              <p>{new Date(consulta.horaInicCon).toLocaleTimeString()}</p>
            </div>
            <div className="consulta-detail">
              <label>Hora Fim da Consulta:</label>
              <p>{new Date(consulta.horaFimCon).toLocaleTimeString()}</p>
            </div>
            <div className="consulta-detail">
              <label>Pagou:</label>
              <p>{consulta.pagou ? "Sim" : "Não"}</p>
            </div>
            <div className="consulta-detail">
              <label>Valor Pago:</label>
              <p>{consulta.valorPago}</p>
            </div>
            <div className="consulta-detail">
              <label>Forma de Pagamento:</label>
              <p>{consulta.formaPagamento}</p>
            </div>
            <div className="consulta-detail">
              <label>Diagnóstico:</label>
              <p>{consulta.diagnostico || "Não informado"}</p>
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

export default Consulta;
