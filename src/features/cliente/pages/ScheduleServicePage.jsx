import React, { useState, useEffect } from "react";
import api from "../../../services/api";
import {
  Container,
  Title,
  Form,
  FormGroup,
  Label,
  Select,
  Input,
  TextArea,
  Button,
  Message
} from "./scheduleService.styles";

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [empRes, srvRes] = await Promise.all([
          api.get(`/api/establishments/${establishmentId}/employees`),
          api.get(`/api/establishments/${establishmentId}/services`),
        ]);

        setEmployees(empRes.data);
        setServices(srvRes.data);
      } catch (err) {
        setMessage("Falha ao carregar profissionais ou serviços.");
      }
    };

    if (establishmentId && token) fetchData();
  }, [establishmentId, token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

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

      // 🔧 Monta Date sem timezone errado
      const rawStart = new Date(`${formData.date}T${formData.time}:00`);

      if (isNaN(rawStart.getTime())) {
        setMessage("Data ou hora inválida.");
        setLoading(false);
        return;
      }

      // 🔧 AJUSTE DE FUSO HORÁRIO (corrige UTC → horário do Brasil)
      const offsetMs = 3 * 60 * 60 * 1000; // 3 horas
      const startDate = new Date(rawStart.getTime() - offsetMs);

      // transforma em ISO novamente
      const startTimeISO = startDate.toISOString();

      // 🔧 calcula fim
      const service = services.find((s) => String(s.id) === String(formData.serviceId));

      let endTimeISO = startTimeISO;

      if (service) {
        const duration = Number(service.durationMinutes) || 30;
        const endDate = new Date(startDate);
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

      await api.post(`/api/appointments`, payload);

      setMessage("Agendamento realizado com sucesso!");

      setFormData({
        employeeId: "",
        serviceId: "",
        date: "",
        time: "",
        clientNotes: "",
      });

    } catch (err) {
      const backendMsg = err.response?.data?.message;
      const status = err.response?.status;

      if (backendMsg?.includes("Funcionário já possui agendamento")) {
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
    <Container>
      <Title>Agendar um Serviço</Title>

      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label>Profissional</Label>
          <Select
            name="employeeId"
            value={formData.employeeId}
            onChange={handleChange}
            required
          >
            <option value="">Selecione...</option>
            {employees.map((emp) => (
              <option key={emp.id} value={emp.id}>{emp.name}</option>
            ))}
          </Select>
        </FormGroup>

        <FormGroup>
          <Label>Serviço</Label>
          <Select
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
          </Select>
        </FormGroup>

        <FormGroup>
          <Label>Data</Label>
          <Input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </FormGroup>

        <FormGroup>
          <Label>Horário</Label>
          <Input
            type="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
            required
          />
        </FormGroup>

        <FormGroup>
          <Label>Observações</Label>
          <TextArea
            name="clientNotes"
            value={formData.clientNotes}
            onChange={handleChange}
            placeholder="Algum detalhe importante?"
          />
        </FormGroup>

        <Button type="submit" disabled={loading}>
          {loading ? "Agendando..." : "Confirmar Agendamento"}
        </Button>
      </Form>

      {message && <Message>{message}</Message>}
    </Container>
  );
}
