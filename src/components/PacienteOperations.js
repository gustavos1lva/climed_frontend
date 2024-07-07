import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CommonStyles.css"; // Importa o arquivo de estilos comuns

const PacienteOperations = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [pacienteData, setPacienteData] = useState({
    idPac: "",
    cpf: "",
    nomePac: "",
    telefonePac: "",
    endereco: "",
    idade: "",
    sexo: "",
  });
  const [error, setError] = useState("");
  const [operation, setOperation] = useState("");

  const handleBack = () => {
    navigate("/home");
  };

  const handleSearch = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `http://localhost:8080/paciente/buscarPorcpf`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ cpf: pacienteData.cpf }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Algo deu errado");
      } else {
        navigate("/paciente", {
          state: { pacienteData: Array.isArray(data) ? data : [data] },
        });
      }
    } catch (error) {
      setError("Erro no servidor");
    }
  };

  const handleCreateOrUpdate = async (e) => {
    e.preventDefault();
    // Filtra dados vazios
    const filteredData = Object.fromEntries(
      Object.entries(pacienteData).filter(([_, v]) => v !== "")
    );

    try {
      const response = await fetch("http://localhost:8080/paciente", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(filteredData),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Algo deu errado");
      } else {
        alert("Paciente salvo com sucesso");
        setPacienteData({
          cpf: "",
          nomePac: "",
          telefonePac: "",
          endereco: "",
          idade: "",
          sexo: "",
        });
      }
    } catch (error) {
      setError("Erro no servidor");
    }
  };

  const renderForm = () => {
    if (operation === "search") {
      return (
        <form onSubmit={handleSearch} className="form">
          <div className="form-group">
            <label htmlFor="searchQuery">cpf do Paciente:</label>
            <input
              type="text"
              id="searchQuery"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              required
              className="form-input"
            />
          </div>
          <button type="submit" className="btn-submit">
            Pesquisar
          </button>
        </form>
      );
    } else if (operation === "create") {
      return (
        <form onSubmit={handleCreateOrUpdate} className="form">
          <div className="form-group">
            <label htmlFor="cpf">cpf:</label>
            <input
              type="text"
              id="cpf"
              value={pacienteData.cpf}
              onChange={(e) =>
                setPacienteData({ ...pacienteData, cpf: e.target.value })
              }
              required
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label htmlFor="nomePac">Nome:</label>
            <input
              type="text"
              id="nomePac"
              value={pacienteData.nomePac}
              onChange={(e) =>
                setPacienteData({ ...pacienteData, nomePac: e.target.value })
              }
              required
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label htmlFor="telefonePac">Telefone:</label>
            <input
              type="text"
              id="telefonePac"
              value={pacienteData.telefonePac}
              onChange={(e) =>
                setPacienteData({
                  ...pacienteData,
                  telefonePac: e.target.value,
                })
              }
              required
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label htmlFor="sexo">sexo:</label>
            <input
              type="text"
              id="sexo"
              value={pacienteData.sexo}
              onChange={(e) =>
                setPacienteData({ ...pacienteData, sexo: e.target.value })
              }
              required
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label htmlFor="endereco">Endereço:</label>
            <input
              type="text"
              id="endereco"
              value={pacienteData.endereco}
              onChange={(e) =>
                setPacienteData({ ...pacienteData, endereco: e.target.value })
              }
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label htmlFor="idade">idade:</label>
            <input
              type="text"
              id="idade"
              value={pacienteData.idade}
              onChange={(e) =>
                setPacienteData({ ...pacienteData, idade: e.target.value })
              }
              className="form-input"
            />
          </div>
          <button type="submit" className="btn-submit">
            Criar Paciente
          </button>
        </form>
      );
    }
    return null;
  };

  return (
    <div className="container">
      <h2>Operações de Paciente</h2>
      <div className="form">
        <button className="btn-submit" onClick={() => setOperation("search")}>
          Pesquisar Paciente
        </button>
        <button className="btn-submit" onClick={() => setOperation("create")}>
          Cadastrar Paciente
        </button>
        <button onClick={handleBack} className="btn-submit btn-voltar">
          Voltar
        </button>
      </div>
      {renderForm()}
      {error && <div className="error">{error}</div>}
    </div>
  );
};

export default PacienteOperations;
