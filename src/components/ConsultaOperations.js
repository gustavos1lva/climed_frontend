import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CommonStyles.css";

const ConsultaOperations = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [consultaData, setConsultaData] = useState({
    idCon: null,
    nomePaciente: "",
    telefonePaciente: "",
    data: "",
    crm: null,
    idEsp: null,
    horaInicCon: "",
    horaFimCon: "",
    pagou: false,
    valorPago: null,
    formaPagamento: "",
    diagnostico: null,
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
          endpoint = "consulta/especialidade";
          queryParams = `date=${consultaData.data}&especialidade=${searchQuery}`;
          break;
        case "searchMedico":
          endpoint = "consulta/medico";
          queryParams = `date=${consultaData.data}&especialidade=${consultaData.idEsp}&medico=${searchQuery}`;
          break;
        default:
          setError("Operação de pesquisa inválida");
          return;
      }

      const response = await fetch(
        `http://localhost:8080/${endpoint}?${queryParams}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Response object:", response);

      if (!response.ok) {
        const errorData = await response.json();
        console.log("Error data:", errorData);
        setError(errorData.message || "Algo deu errado");
      } else {
        const data = await response.json();
        console.log("Data received:", data);
        navigate("/consulta", { state: { consultaData: data } });
      }
    } catch (erro) {
      console.log("Fetch error:", erro);
      setError("Erro no servidor");
    }
  };

  const handleCreateOrUpdate = async (e) => {
    e.preventDefault();
    const endpoint = "consulta";
    const method = operation === "create" ? "POST" : "PUT";
    const func = operation === "create" ? "/create" : "/update";

    const combineDateAndTime = (date, time) => {
      return `${date}T${time}:00Z`; // Formato ISO 8601
    };

    const createConsultaRequest = {
      nomePaciente: consultaData.nomePaciente,
      telefonePaciente: consultaData.telefonePaciente,
      date: consultaData.data,
      crm: consultaData.crm,
      idEsp: consultaData.idEsp,
      horaInicioCon: combineDateAndTime(
        consultaData.data,
        consultaData.horaInicCon
      ),
    };

    const updateConsultaRequest = {
      idConsulta: consultaData.idCon,
      horaFimCon: combineDateAndTime(
        consultaData.data,
        consultaData.horaFimCon
      ),
      valorPago: consultaData.valorPago,
      idDiagnostico: consultaData.diagnostico?.idDiagnostico,
      formaPagamento: consultaData.formaPagamento,
      pagou: consultaData.pagou,
    };

    const requestBody =
      method === "POST" ? createConsultaRequest : updateConsultaRequest;

    try {
      const response = await fetch(`http://localhost:8080/${endpoint}`, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
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
        setConsultaData({
          idCon: null,
          nomePaciente: "",
          telefonePaciente: "",
          data: "",
          crm: null,
          idEsp: null,
          horaInicCon: "",
          horaFimCon: "",
          pagou: false,
          valorPago: null,
          formaPagamento: "",
          diagnostico: null,
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
              <label htmlFor="consultaData.data">Data:</label>
              <input
                type="date"
                id="consultaData.data"
                value={consultaData.data}
                onChange={(e) =>
                  setConsultaData({ ...consultaData, data: e.target.value })
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
              <label htmlFor="consultaData.data">Data:</label>
              <input
                type="date"
                id="consultaData.data"
                value={consultaData.data}
                onChange={(e) =>
                  setConsultaData({ ...consultaData, data: e.target.value })
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
                  setConsultaData({
                    ...consultaData,
                    idEsp: e.target.value,
                  })
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
              <label htmlFor="data">Data:</label>
              <input
                type="date"
                id="data"
                value={consultaData.data}
                onChange={(e) =>
                  setConsultaData({ ...consultaData, data: e.target.value })
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
                  setConsultaData({
                    ...consultaData,
                    crm: e.target.value,
                  })
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
                  setConsultaData({
                    ...consultaData,
                    idEsp: e.target.value,
                  })
                }
                required
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label htmlFor="horaInicCon">Hora de Início:</label>
              <input
                type="time"
                id="horaInicCon"
                value={consultaData.horaInicCon}
                onChange={(e) =>
                  setConsultaData({
                    ...consultaData,
                    horaInicCon: e.target.value,
                  })
                }
                required
                className="form-input"
              />
            </div>
            {operation === "update" && (
              <>
                <div className="form-group">
                  <label htmlFor="idCon">ID da Consulta:</label>
                  <input
                    type="text"
                    id="idCon"
                    value={consultaData.idCon}
                    onChange={(e) =>
                      setConsultaData({
                        ...consultaData,
                        idCon: e.target.value,
                      })
                    }
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="horaFimCon">Hora de Fim:</label>
                  <input
                    type="time"
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
                      setConsultaData({
                        ...consultaData,
                        pagou: e.target.checked,
                      })
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
              </>
            )}
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
