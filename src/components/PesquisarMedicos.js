import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CommonStyles.css"; // Importa o arquivo de estilos comuns

const PesquisarMedicos = () => {
  const navigate = useNavigate();
  const [nomeMedico, setNomeMedico] = useState("");
  const [especialidade, setEspecialidade] = useState("");
  const [error, setError] = useState("");
  const [operation, setOperation] = useState("");

  const handleBack = () => {
    navigate("/home");
  };

  const handleSearchByNameAndEspecialidade = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `http://localhost:8080/medico/nome_especialidade`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            nome: nomeMedico,
            especialidade: especialidade,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Algo deu errado");
      } else {
        navigate("/medico", {
          state: { medicoData: Array.isArray(data) ? data : [data] },
        });
      }
    } catch (error) {
      setError("Erro no servidor");
    }
  };

  const handleSearchByNomeMedico = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:8080/medico/nome`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nome: nomeMedico }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Algo deu errado");
      } else {
        navigate("/medico", {
          state: { medicoData: Array.isArray(data) ? data : [data] },
        });
      }
    } catch (error) {
      setError("Erro no servidor");
    }
  };

  const handleSearchByEspecialidade = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `http://localhost:8080/medico/especialidade`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ especialidade: especialidade }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Algo deu errado");
      } else {
        navigate("/medico", {
          state: { medicoData: Array.isArray(data) ? data : [data] },
        });
      }
    } catch (error) {
      setError("Erro no servidor");
    }
  };

  const renderForm = () => {
    if (operation === "searchByNameAndEspecialidade") {
      return (
        <form onSubmit={handleSearchByNameAndEspecialidade} className="form">
          <div className="form-group">
            <label htmlFor="nomeMedico">Nome do Médico:</label>
            <input
              type="text"
              id="nomeMedico"
              value={nomeMedico}
              onChange={(e) => setNomeMedico(e.target.value)}
              className="form-input"
              placeholder="Nome do médico"
            />
          </div>
          <div className="form-group">
            <label htmlFor="especialidade">Especialidade:</label>
            <input
              type="text"
              id="especialidade"
              value={especialidade}
              onChange={(e) => setEspecialidade(e.target.value)}
              className="form-input"
              placeholder="Especialidade do médico"
            />
          </div>
          <button type="submit" className="btn-submit">
            Pesquisar por Nome e Especialidade
          </button>
        </form>
      );
    } else if (operation === "searchByNomeMedico") {
      return (
        <form onSubmit={handleSearchByNomeMedico} className="form">
          <div className="form-group">
            <label htmlFor="nomeMedico">Nome do Médico:</label>
            <input
              type="text"
              id="nomeMedico"
              value={nomeMedico}
              onChange={(e) => setNomeMedico(e.target.value)}
              className="form-input"
              placeholder="Nome do médico"
            />
          </div>
          <button type="submit" className="btn-submit">
            Pesquisar por Nome
          </button>
        </form>
      );
    } else if (operation === "searchByEspecialidade") {
      return (
        <form onSubmit={handleSearchByEspecialidade} className="form">
          <div className="form-group">
            <label htmlFor="especialidade">Especialidade:</label>
            <input
              type="text"
              id="especialidade"
              value={especialidade}
              onChange={(e) => setEspecialidade(e.target.value)}
              className="form-input"
              placeholder="Especialidade do médico"
            />
          </div>
          <button type="submit" className="btn-submit">
            Pesquisar por Especialidade
          </button>
        </form>
      );
    }
    return null;
  };

  return (
    <div className="container">
      <h2>Pesquisar Médicos</h2>
      <div className="form">
        <button
          className="btn-submit"
          onClick={() => setOperation("searchByNameAndEspecialidade")}
        >
          Pesquisar por Nome e Especialidade
        </button>
        <button
          className="btn-submit"
          onClick={() => setOperation("searchByNomeMedico")}
        >
          Pesquisar por Nome
        </button>
        <button
          className="btn-submit"
          onClick={() => setOperation("searchByEspecialidade")}
        >
          Pesquisar por Especialidade
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

export default PesquisarMedicos;
