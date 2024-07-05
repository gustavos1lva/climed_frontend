import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CommonStyles.css"; // Importa o arquivo de estilos comuns

const PesquisarDiagnosticos = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState("");

  const handleSearch = async (e) => {
    e.preventDefault();

    //mock pra teste da tela, apagar na versao final
    // navigate("/diagnostico", {
    //   state: {
    //     diagnosticoData: [
    //       {
    //         IdDiagnostico: 1,
    //         TratamentoRecomendado: "Repouso e hidratação",
    //         RemediosReceitados: "Paracetamol",
    //         Observacoes: "Paciente deve evitar esforço físico",
    //         IdCon: 1,
    //       },
    //       {
    //         IdDiagnostico: 2,
    //         TratamentoRecomendado: "Fisioterapia",
    //         RemediosReceitados: "Ibuprofeno",
    //         Observacoes: "Retorno em 15 dias",
    //         IdCon: 2,
    //       },
    //       // Adicione mais diagnósticos conforme necessário
    //     ],
    //   },
    // });

    try {
      const response = await fetch(
        "http://localhost:5000/api/pesquisa-diagnostico",
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
        navigate("/diagnostico", {
          state: { diagnosticoData: Array.isArray(data) ? data : [data] },
        });
      }
    } catch (error) {
      setError("Erro no servidor");
    }
  };

  return (
    <div className="container">
      <h2>Pesquisar Diagnósticos</h2>
      <form onSubmit={handleSearch} className="form">
        <div className="form-group">
          <label htmlFor="searchQuery">CPF ou ID do Paciente:</label>
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
      {error && <div className="error">{error}</div>}
    </div>
  );
};

export default PesquisarDiagnosticos;
