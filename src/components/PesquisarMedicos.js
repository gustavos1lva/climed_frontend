import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CommonStyles.css"; // Importa o arquivo de estilos comuns

const PesquisarMedicos = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState("");

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "http://localhost:5000/api/pesquisa-medico",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ searchQuery }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Algo deu errado");
      } else {
        navigate("/medico");
      }
    } catch (error) {
      setError("Erro no servidor");
    }
  };

  return (
    <div className="container">
      <h2>Pesquisar Médicos</h2>
      <form onSubmit={handleSearch} className="form">
        <div className="form-group">
          <label htmlFor="searchQuery">Nome ou CRM:</label>
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
    </div>
  );
};

export default PesquisarMedicos;
