import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CommonStyles.css"; // Importa o arquivo de estilos comuns

const PacienteOperations = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [pacienteData, setPacienteData] = useState({
    IdPac: "",
    CPF: "",
    NomeP: "",
    TelefonePac: "",
    Endereco: "",
    Idade: "",
    Sexo: "",
  });
  const [error, setError] = useState("");
  const [operation, setOperation] = useState("");

  const handleBack = () => {
    navigate("/home");
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    // Implementar a lógica de busca aqui
    try {
      // Exemplo de busca mockada
      navigate("/paciente", {
        state: {
          pacienteData: [
            {
              IdPac: 1,
              CPF: "123.456.789-00",
              NomeP: "Fulano de Tal",
              TelefonePac: "(99) 99999-9999",
              Endereco: "Rua Exemplo, 123",
              Idade: 35,
              Sexo: "Masculino",
            },
            // Adicionar mais pacientes conforme necessário
          ],
        },
      });
    } catch (error) {
      setError("Erro ao buscar paciente");
    }
  };

  const handleCreateOrUpdate = async (e) => {
    e.preventDefault();
    // Filtra dados vazios
    const filteredData = Object.fromEntries(
      Object.entries(pacienteData).filter(([_, v]) => v !== "")
    );

    try {
      const response = await fetch("http://localhost:5000/api/paciente", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(filteredData),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Algo deu errado");
      } else {
        alert("Paciente cadastrado com sucesso");
        // Limpar os dados do formulário após o sucesso
        setPacienteData({
          IdPac: "",
          CPF: "",
          NomeP: "",
          TelefonePac: "",
          Endereco: "",
          Idade: "",
          Sexo: "",
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
            <label htmlFor="searchQuery">CPF do Paciente:</label>
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
            <label htmlFor="CPF">CPF:</label>
            <input
              type="text"
              id="CPF"
              value={pacienteData.CPF}
              onChange={(e) =>
                setPacienteData({ ...pacienteData, CPF: e.target.value })
              }
              required
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label htmlFor="NomeP">Nome:</label>
            <input
              type="text"
              id="NomeP"
              value={pacienteData.NomeP}
              onChange={(e) =>
                setPacienteData({ ...pacienteData, NomeP: e.target.value })
              }
              required
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label htmlFor="TelefonePac">Telefone:</label>
            <input
              type="text"
              id="TelefonePac"
              value={pacienteData.TelefonePac}
              onChange={(e) =>
                setPacienteData({
                  ...pacienteData,
                  TelefonePac: e.target.value,
                })
              }
              required
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label htmlFor="Sexo">Sexo:</label>
            <input
              type="text"
              id="Sexo"
              value={pacienteData.Sexo}
              onChange={(e) =>
                setPacienteData({ ...pacienteData, Sexo: e.target.value })
              }
              required
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label htmlFor="Endereco">Endereço:</label>
            <input
              type="text"
              id="Endereco"
              value={pacienteData.Endereco}
              onChange={(e) =>
                setPacienteData({ ...pacienteData, Endereco: e.target.value })
              }
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label htmlFor="Idade">Idade:</label>
            <input
              type="text"
              id="Idade"
              value={pacienteData.Idade}
              onChange={(e) =>
                setPacienteData({ ...pacienteData, Idade: e.target.value })
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
