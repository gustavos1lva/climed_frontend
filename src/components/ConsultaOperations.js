import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CommonStyles.css"; // Importa o arquivo de estilos comuns

const ConsultaOperations = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [consultaData, setConsultaData] = useState({
    idCon: "",
    medico: {
      crm: "",
      nomeMedico: "",
      telefoneMedico: "",
      percentual: "",
    },
    especialidade: {
      idEsp: "",
      nomeEsp: "",
      indice: "",
    },
    paciente: {
      idPac: "",
      cpf: "",
      nomePac: "",
      telefonePac: "",
      endereco: "",
      idade: "",
      sexo: "",
    },
    data: "",
    horaInicCon: "",
    horaFimCon: "",
    pagou: false,
    valorPago: "",
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
          queryParams = `date=${consultaData.data}&especialidade=${consultaData.especialidade.idEsp}&medico=${searchQuery}`;
          break;
        default:
          setError("Operação de pesquisa inválida");
          return;
      }

      const response = await fetch(
        `http://localhost:8080/${endpoint}?${queryParams}`,
        {
          method: "GET",
          mode: "no-cors",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Algo deu errado");
      } else {
        navigate("/consulta", { state: { consultaData: data } });
      }
    } catch (erro) {
      console.log(erro);
      setError("Erro no servidor");
    }
  };

  const handleCreateOrUpdate = async (e) => {
    e.preventDefault();
    const endpoint = "consulta";
    const method = operation === "create" ? "POST" : "PUT";
    const func = operation === "create" ? "/create" : "/update";

    // Filtra dados vazios
    const filteredData = Object.fromEntries(
      Object.entries(consultaData).filter(([_, v]) => v !== "")
    );

    try {
      const response = await fetch(`http://localhost:8080/${endpoint + func}`, {
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
        setConsultaData({
          idCon: "",
          medico: {
            crm: "",
            nomeMedico: "",
            telefoneMedico: "",
            percentual: "",
          },
          especialidade: {
            idEsp: "",
            nomeEsp: "",
            indice: "",
          },
          paciente: {
            idPac: "",
            cpf: "",
            nomePac: "",
            telefonePac: "",
            endereco: "",
            idade: "",
            sexo: "",
          },
          data: "",
          horaInicCon: "",
          horaFimCon: "",
          pagou: false,
          valorPago: "",
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
              <label htmlFor="consultaData.especialidade.idEsp">
                Especialidade:
              </label>
              <input
                type="text"
                id="consultaData.especialidade.idEsp"
                value={consultaData.especialidade.idEsp}
                onChange={(e) =>
                  setConsultaData({
                    ...consultaData,
                    especialidade: {
                      ...consultaData.especialidade,
                      idEsp: e.target.value,
                    },
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
              <label htmlFor="nomePac">Nome do Paciente:</label>
              <input
                type="text"
                id="nomePac"
                value={consultaData.paciente.nomePac}
                onChange={(e) =>
                  setConsultaData({
                    ...consultaData,
                    paciente: {
                      ...consultaData.paciente,
                      nomePac: e.target.value,
                    },
                  })
                }
                required
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label htmlFor="telefonePac">Telefone do Paciente:</label>
              <input
                type="text"
                id="telefonePac"
                value={consultaData.paciente.telefonePac}
                onChange={(e) =>
                  setConsultaData({
                    ...consultaData,
                    paciente: {
                      ...consultaData.paciente,
                      telefonePac: e.target.value,
                    },
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
                value={consultaData.medico.crm}
                onChange={(e) =>
                  setConsultaData({
                    ...consultaData,
                    medico: { ...consultaData.medico, crm: e.target.value },
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
                value={consultaData.especialidade.idEsp}
                onChange={(e) =>
                  setConsultaData({
                    ...consultaData,
                    especialidade: {
                      ...consultaData.especialidade,
                      idEsp: e.target.value,
                    },
                  })
                }
                required
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label htmlFor="horaInicCon">Hora de Início:</label>
              <input
                type="text"
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
