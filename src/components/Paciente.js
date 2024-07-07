import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./CommonStyles.css";

const Paciente = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [pacienteData, setPacienteData] = useState(null);

  useEffect(() => {
    if (location.state && location.state.pacienteData) {
      setPacienteData(location.state.pacienteData);
    }
  }, [location.state]);

  const handleBack = () => {
    navigate("/pesquisar-pacientes");
  };

  return (
    <div className="container">
      <h2>Dados do Paciente</h2>
      {pacienteData ? (
        <div className="data-container">
          <p>
            <strong>ID:</strong> {pacienteData.idPac}
          </p>
          <p>
            <strong>CPF:</strong> {pacienteData.cpf}
          </p>
          <p>
            <strong>Nome:</strong> {pacienteData.nomePac}
          </p>
          <p>
            <strong>Telefone:</strong> {pacienteData.telefonePac}
          </p>
          <p>
            <strong>Endereço:</strong> {pacienteData.endereco}
          </p>
          <p>
            <strong>Idade:</strong> {pacienteData.idade}
          </p>
          <p>
            <strong>Sexo:</strong> {pacienteData.sexo}
          </p>
        </div>
      ) : (
        <p>Dados do paciente não encontrados.</p>
      )}
      <button onClick={handleBack} className="btn-submit btn-voltar">
        Voltar
      </button>
    </div>
  );
};

export default Paciente;
