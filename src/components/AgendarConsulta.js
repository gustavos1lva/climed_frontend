import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CommonStyles.css"; // Importa o arquivo de estilos comuns

const AgendarConsulta = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    IdCon: "",
    CRM: "",
    IdEsp: "",
    IdPac: "",
    Data: "",
    HoraInicCon: "",
    HoraFimCon: "",
    Pagou: "",
    ValorPago: "",
    FormaPagamento: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aqui você pode enviar os dados do formulário para o backend ou fazer ações necessárias
    console.log("Dados do formulário:", form);
    // Exemplo: navigate('/resultado-agendamento') para uma página de confirmação
  };

  return (
    <div className="container">
      <h2>Agendar Consulta</h2>
      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <label htmlFor="IdCon">IdCon:</label>
          <input
            type="text"
            id="IdCon"
            name="IdCon"
            value={form.IdCon}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="CRM">CRM:</label>
          <input
            type="text"
            id="CRM"
            name="CRM"
            value={form.CRM}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="IdEsp">IdEsp:</label>
          <input
            type="text"
            id="IdEsp"
            name="IdEsp"
            value={form.IdEsp}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="IdPac">IdPac:</label>
          <input
            type="text"
            id="IdPac"
            name="IdPac"
            value={form.IdPac}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="Data">Data:</label>
          <input
            type="date"
            id="Data"
            name="Data"
            value={form.Data}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="HoraInicCon">Hora Início:</label>
          <input
            type="time"
            id="HoraInicCon"
            name="HoraInicCon"
            value={form.HoraInicCon}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="HoraFimCon">Hora Fim:</label>
          <input
            type="time"
            id="HoraFimCon"
            name="HoraFimCon"
            value={form.HoraFimCon}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="Pagou">Pagou:</label>
          <input
            type="text"
            id="Pagou"
            name="Pagou"
            value={form.Pagou}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="ValorPago">Valor Pago:</label>
          <input
            type="text"
            id="ValorPago"
            name="ValorPago"
            value={form.ValorPago}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="FormaPagamento">Forma de Pagamento:</label>
          <input
            type="text"
            id="FormaPagamento"
            name="FormaPagamento"
            value={form.FormaPagamento}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn-submit">
          Agendar
        </button>
      </form>
    </div>
  );
};

export default AgendarConsulta;
