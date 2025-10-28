import React, { useState, useEffect, useCallback } from "react"; // ✅ SINTAXE CORRIGIDA
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
  const token = localStorage.getItem("token");

  // Encapsulamento da lógica de busca para usar useCallback e garantir a estabilidade
  const fetchData = useCallback(async () => {
    if (!establishmentId || !token) return;

    try {
      // Configuração do cabeçalho de autenticação para as chamadas GET
      const config = {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      };

      const [empRes, srvRes] = await Promise.all([
        api.get(`/api/establishments/${establishmentId}/employees`, config),
        api.get(`/api/establishments/${establishmentId}/services`, config),
      ]);

      setEmployees(empRes.data);
      setServices(srvRes.data);
    } catch (err) {
      setMessage("Falha ao carregar profissionais ou serviços.");
      console.error("Erro ao buscar dados iniciais:", err);
    }
  }, [establishmentId, token]);

  useEffect(() => {
    fetchData();
  }, [fetchData]); // Dependência correta para useCallback

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    // ✅ CORREÇÃO 1: Configuração do cabeçalho de autenticação (JWT) para o POST
    const config = {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    };

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

      const payload = {
        serviceId: String(formData.serviceId),
        establishmentId: String(establishmentId),
        employeeId: String(formData.employeeId),
        startTime: startTimeISO,
        endTime: endTimeISO,
        status: "PENDING",
        clientNotes: formData.clientNotes,
      };

      // ✅ CORREÇÃO 2: Envia a requisição POST com o cabeçalho 'config'
      await api.post(`/api/appointments`, payload, config); 

      setMessage("Agendamento realizado com sucesso!");
      setFormData({
        employeeId: "",
        serviceId: "",
        date: "",
        time: "",
        clientNotes: "",
      });
    } catch (err) {
      const status = err.response?.status;

      if (status === 403) {
         // Erro 403 por falta de permissão, mesmo com token (backend precisa conferir o Role)
         setMessage("Você não tem permissão para agendar. Verifique sua conta."); 
      } else if (err.response?.data?.message?.includes("Funcionário já possui agendamento")) {
        setMessage("Esse horário já está ocupado. Escolha outro.");
      } else if (status === 401) {
        setMessage("Sessão expirada. Faça login novamente.");
      } else if (status === 500) {
        setMessage("Erro interno no servidor.");
      } else {
        setMessage("Erro ao realizar o agendamento. Tente novamente.");
      }
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