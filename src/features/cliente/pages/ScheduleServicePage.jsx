import React, { useState, useEffect } from "react";
import api from "../../../services/api";
import "./ScheduleServicePage.css";

export default function ScheduleServicePage() {
  const [employees, setEmployees] = useState([]);
  const [services, setServices] = useState([]);
  const [formData, setFormData] = useState({
    employeeId: "",
    serviceId: "",
    date: "",
    time: "",
    clientNotes: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const establishmentId = localStorage.getItem("establishmentId");
  const token = localStorage.getItem("token"); // token JWT

  // carregar equipe e serviços
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [empRes, srvRes] = await Promise.all([
          api.get(`/api/establishments/${establishmentId}/employees`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          api.get(`/api/establishments/${establishmentId}/services`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);
        setEmployees(empRes.data);
        setServices(srvRes.data);
      } catch (err) {
        console.error("Erro ao carregar dados:", err);
        setMessage("Falha ao carregar profissionais ou serviços.");
      }
    };

    if (establishmentId && token) fetchData();
  }, [establishmentId, token]);

  // captura inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      if (!formData.date || !formData.time) {
        setMessage("Escolha uma data e um horário válidos.");
        setLoading(false);
        return;
      }

      const startDate = new Date(`${formData.date}T${formData.time}:00`);
      if (isNaN(startDate.getTime())) {
        setMessage("Data ou hora inválida.");
        setLoading(false);
        return;
      }

      const startTimeISO = startDate.toISOString();

      const service = services.find((s) => s.id === formData.serviceId);

      let endTimeISO = startTimeISO;
      if (service) {
        const duration = Number(service.durationMinutes) || 30;
        const endDate = new Date(startTimeISO);
        endDate.setMinutes(endDate.getMinutes() + duration);
        endTimeISO = endDate.toISOString();
      }

      // 🔑 payload sem customerId (o backend pega do token)
      const payload = {
        serviceId: formData.serviceId,
        establishmentId,
        employeeId: formData.employeeId,
        startTime: startTimeISO,
        endTime: endTimeISO,
        status: "PENDING",
        clientNotes: formData.clientNotes,
      };

      console.log("Payload enviado:", payload);

      await api.post(`/api/appointments`, payload, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setMessage("Agendamento realizado com sucesso!");
      setFormData({
        employeeId: "",
        serviceId: "",
        date: "",
        time: "",
        clientNotes: "",
      });
    } catch (err) {
      console.error("Erro ao agendar:", err);
      setMessage("Erro ao realizar o agendamento. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="schedule-service-container">
      <h1 className="titulo-secao-dashboard">Agendar um Serviço</h1>
      <form className="schedule-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="employee">Profissional</label>
          <select
            id="employee"
            name="employeeId"
            value={formData.employeeId}
            onChange={handleChange}
            required
          >
            <option value="">Selecione...</option>
            {employees.map((emp) => (
              <option key={emp.id} value={emp.id}>
                {emp.name}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="service">Serviço</label>
          <select
            id="service"
            name="serviceId"
            value={formData.serviceId}
            onChange={handleChange}
            required
          >
            <option value="">Selecione...</option>
            {services.map((srv) => (
              <option key={srv.id} value={srv.id}>
                {srv.name} ({srv.durationMinutes} min)
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="date">Data</label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="time">Horário</label>
          <input
            type="time"
            id="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="clientNotes">Observações</label>
          <textarea
            id="clientNotes"
            name="clientNotes"
            value={formData.clientNotes}
            onChange={handleChange}
            placeholder="Algum detalhe importante?"
          />
        </div>

        <button type="submit" className="btn-primary" disabled={loading}>
          {loading ? "Agendando..." : "Confirmar Agendamento"}
        </button>
      </form>

      {message && <p className="form-message">{message}</p>}
    </div>
  );
}
