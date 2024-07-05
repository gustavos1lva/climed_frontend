import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CommonStyles.css"; // Importa o arquivo de estilos comuns

const PesquisarConsulta = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState("");

  const handleSearch = async (e) => {
    e.preventDefault();

    //mock pra teste da tela, apagar na versao final
    // navigate("/consulta", {
    //   state: {
    //     consultaData: [
    //       {
    //         IdCon: 1,
    //         CRM: 1234,
    //         IdEsp: 3,
    //         IdPac: 4,
    //         Data: "23/11/2000",
    //         HoraInicCon: "23:59",
    //         HoraFimCon: "00:30",
    //         Pagou: "Sim",
    //         ValorPago: 200,
    //         FormaPagamento: "Dinheiro",
    //       },
    //       {
    //         IdCon: 2,
    //         CRM: 1235,
    //         IdEsp: 4,
    //         IdPac: 5,
    //         Data: "24/11/2000",
    //         HoraInicCon: "10:00",
    //         HoraFimCon: "10:30",
    //         Pagou: "Não",
    //         ValorPago: 0,
    //         FormaPagamento: "Cartão",
    //       },
    //       // Adicione mais consultas conforme necessário
    //     ],
    //   },
    // });

    try {
      const response = await fetch(
        "http://localhost:5000/api/pesquisa-consulta",
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
        navigate("/consulta", { state: { consultaData: data } });
      }
    } catch (error) {
      setError("Erro no servidor");
    }
  };

  return (
    <div className="container">
      <h2>Pesquisar Consultas</h2>
      <form onSubmit={handleSearch} className="form">
        <div className="form-group">
          <label htmlFor="searchQuery">CPF:</label>
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

export default PesquisarConsulta;
