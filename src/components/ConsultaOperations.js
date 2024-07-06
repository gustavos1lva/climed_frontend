import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CommonStyles.css"; // Importa o arquivo de estilos comuns

const ConsultaOperations = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [consultaData, setConsultaData] = useState({
    nomePaciente: "",
    telefonePaciente: "",
    date: "",
    crm: "",
    idEsp: "",
    horaInicioCon: "",
    idConsulta: "",
    horaFimCon: "",
    pagou: false,
    valorPago: "",
    idDiagnostico: "",
    formaPagamento: "",
  });
  const [error, setError] = useState("");
  const [operation, setOperation] = useState("");

  const handleBack = () => {
    navigate("/home");
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      let endpoint = "";
      let queryParams = "";

      switch (operation) {
        case "searchEspecialidade":
          endpoint = "especialidade";
          queryParams = `date=${consultaData.date}&especialidade=${searchQuery}`;
          break;
        case "searchMedico":
          endpoint = "medico";
          queryParams = `date=${consultaData.date}&especialidade=${consultaData.idEsp}&medico=${searchQuery}`;
          break;
        default:
          setError("Operação de pesquisa inválida");
          return;
      }

      const response = await fetch(
        `http://localhost:5000/api/consulta/${endpoint}?${queryParams}`,
        {
          method: "GET",
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

  const handleCreateOrUpdate = async (e) => {
    e.preventDefault();
    const endpoint = "consulta";
    const method = operation === "create" ? "POST" : "PUT";

    // Filtra dados vazios
    const filteredData = Object.fromEntries(
      Object.entries(consultaData).filter(([_, v]) => v !== "")
    );

    try {
      const response = await fetch(`http://localhost:5000/api/${endpoint}`, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(filteredData),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Algo deu errado");
      } else {
        alert(
          `Consulta ${
            operation === "create" ? "criada" : "atualizada"
          } com sucesso`
        );
        // Limpar os dados do formulário após o sucesso
        setConsultaData({
          nomePaciente: "",
          telefonePaciente: "",
          date: "",
          crm: "",
          idEsp: "",
          horaInicioCon: "",
          idConsulta: "",
          horaFimCon: "",
          pagou: false,
          valorPago: "",
          idDiagnostico: "",
          formaPagamento: "",
        });
      }
    } catch (error) {
      setError("Erro no servidor");
    }
  };

  const renderForm = () => {
    switch (operation) {
      case "searchEspecialidade":
        return (
          <form onSubmit={handleSearch} className="form">
            <div className="form-group">
              <label htmlFor="consultaData.date">Data:</label>
              <input
                type="date"
                id="consultaData.date"
                value={consultaData.date}
                onChange={(e) =>
                  setConsultaData({ ...consultaData, date: e.target.value })
                }
                required
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label htmlFor="searchQuery">Especialidade:</label>
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
              Pesquisar por Especialidade
            </button>
          </form>
        );
      case "searchMedico":
        return (
          <form onSubmit={handleSearch} className="form">
            <div className="form-group">
              <label htmlFor="consultaData.date">Data:</label>
              <input
                type="date"
                id="consultaData.date"
                value={consultaData.date}
                onChange={(e) =>
                  setConsultaData({ ...consultaData, date: e.target.value })
                }
                required
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label htmlFor="consultaData.idEsp">Especialidade:</label>
              <input
                type="text"
                id="consultaData.idEsp"
                value={consultaData.idEsp}
                onChange={(e) =>
                  setConsultaData({ ...consultaData, idEsp: e.target.value })
                }
                required
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label htmlFor="searchQuery">Médico:</label>
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
              Pesquisar por Médico
            </button>
          </form>
        );
      case "create":
      case "update":
        return (
          <form onSubmit={handleCreateOrUpdate} className="form">
            <div className="form-group">
              <label htmlFor="nomePaciente">Nome do Paciente:</label>
              <input
                type="text"
                id="nomePaciente"
                value={consultaData.nomePaciente}
                onChange={(e) =>
                  setConsultaData({
                    ...consultaData,
                    nomePaciente: e.target.value,
                  })
                }
                required
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label htmlFor="telefonePaciente">Telefone do Paciente:</label>
              <input
                type="text"
                id="telefonePaciente"
                value={consultaData.telefonePaciente}
                onChange={(e) =>
                  setConsultaData({
                    ...consultaData,
                    telefonePaciente: e.target.value,
                  })
                }
                required
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label htmlFor="date">Data:</label>
              <input
                type="date"
                id="date"
                value={consultaData.date}
                onChange={(e) =>
                  setConsultaData({ ...consultaData, date: e.target.value })
                }
                required
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label htmlFor="crm">CRM:</label>
              <input
                type="text"
                id="crm"
                value={consultaData.crm}
                onChange={(e) =>
                  setConsultaData({ ...consultaData, crm: e.target.value })
                }
                required
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label htmlFor="idEsp">ID da Especialidade:</label>
              <input
                type="text"
                id="idEsp"
                value={consultaData.idEsp}
                onChange={(e) =>
                  setConsultaData({ ...consultaData, idEsp: e.target.value })
                }
                required
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label htmlFor="horaInicioCon">Hora de Início:</label>
              <input
                type="text"
                id="horaInicioCon"
                value={consultaData.horaInicioCon}
                onChange={(e) =>
                  setConsultaData({
                    ...consultaData,
                    horaInicioCon: e.target.value,
                  })
                }
                required
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label htmlFor="idConsulta">ID da Consulta:</label>
              <input
                type="text"
                id="idConsulta"
                value={consultaData.idConsulta}
                onChange={(e) =>
                  setConsultaData({
                    ...consultaData,
                    idConsulta: e.target.value,
                  })
                }
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label htmlFor="horaFimCon">Hora de Fim:</label>
              <input
                type="text"
                id="horaFimCon"
                value={consultaData.horaFimCon}
                onChange={(e) =>
                  setConsultaData({
                    ...consultaData,
                    horaFimCon: e.target.value,
                  })
                }
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label htmlFor="pagou">Pagou:</label>
              <input
                type="checkbox"
                id="pagou"
                checked={consultaData.pagou}
                onChange={(e) =>
                  setConsultaData({ ...consultaData, pagou: e.target.checked })
                }
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label htmlFor="valorPago">Valor Pago:</label>
              <input
                type="text"
                id="valorPago"
                value={consultaData.valorPago}
                onChange={(e) =>
                  setConsultaData({
                    ...consultaData,
                    valorPago: e.target.value,
                  })
                }
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label htmlFor="idDiagnostico">ID do Diagnóstico:</label>
              <input
                type="text"
                id="idDiagnostico"
                value={consultaData.idDiagnostico}
                onChange={(e) =>
                  setConsultaData({
                    ...consultaData,
                    idDiagnostico: e.target.value,
                  })
                }
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label htmlFor="formaPagamento">Forma de Pagamento:</label>
              <input
                type="text"
                id="formaPagamento"
                value={consultaData.formaPagamento}
                onChange={(e) =>
                  setConsultaData({
                    ...consultaData,
                    formaPagamento: e.target.value,
                  })
                }
                className="form-input"
              />
            </div>
            <button type="submit" className="btn-submit">
              {operation === "create" ? "Criar" : "Atualizar"} Consulta
            </button>
          </form>
        );
      default:
        return null;
    }
  };

  return (
    <div className="container">
      <h2>Operações de Consultas</h2>
      <div className="form">
        <button
          className="btn-submit"
          onClick={() => setOperation("searchEspecialidade")}
        >
          Pesquisar por Especialidade
        </button>
        <button
          className="btn-submit"
          onClick={() => setOperation("searchMedico")}
        >
          Pesquisar por Médico
        </button>
        <button className="btn-submit" onClick={() => setOperation("create")}>
          Criar Consulta
        </button>
        <button className="btn-submit" onClick={() => setOperation("update")}>
          Atualizar Consulta
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

export default ConsultaOperations;