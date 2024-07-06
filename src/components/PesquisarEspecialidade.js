import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CommonStyles.css"; // Importa o arquivo de estilos comuns

const PesquisarEspecialidade = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState("");
  const [operation, setOperation] = useState("");

  const handleBack = () => {
    navigate("/home");
  };

  const handleSearchByName = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `http://localhost:8080/especialidade/nome?nome=${searchQuery}`
      );

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Algo deu errado");
      } else {
        navigate("/especialidade", {
          state: { especialidadeData: Array.isArray(data) ? data : [data] },
        });
      }
    } catch (error) {
      setError("Erro no servidor");
    }
  };

  const handleSearchById = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `http://localhost:8080/especialidade/id/?id=${searchQuery}`
      );

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Algo deu errado");
      } else {
        navigate("/especialidade", {
          state: { especialidadeData: [data] },
        });
      }
    } catch (error) {
      setError("Erro no servidor");
    }
  };

  const renderForm = () => {
    if (operation === "searchByName") {
      return (
        <form onSubmit={handleSearchByName} className="form">
          <div className="form-group">
            <label htmlFor="searchQuery">Nome da Especialidade:</label>
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
            Pesquisar por Nome
          </button>
        </form>
      );
    } else if (operation === "searchById") {
      return (
        <form onSubmit={handleSearchById} className="form">
          <div className="form-group">
            <label htmlFor="searchQuery">ID da Especialidade:</label>
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
            Pesquisar por ID
          </button>
        </form>
      );
    }
    return null;
  };

  return (
    <div className="container">
      <h2>Pesquisar Especialidades</h2>
      <div className="form">
        <button
          className="btn-submit"
          onClick={() => setOperation("searchByName")}
        >
          Pesquisar por Nome
        </button>
        <button
          className="btn-submit"
          onClick={() => setOperation("searchById")}
        >
          Pesquisar por ID
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

export default PesquisarEspecialidade;
