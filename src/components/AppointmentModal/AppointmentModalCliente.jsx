import React, { useState, useEffect } from "react";
import agendaService from "/src/features/agenda/agendaService";
import {
  Overlay,
  Modal,
  Header,
  Title,
  CloseButton,
  Form,
  FormGroup,
  Label,
  Input,
  Select,
  TextArea,
  ErrorMessage,
  ButtonPrimary,
} from "./AppointmentModalCliente.styles";
import { X, CalendarDays, Clock, Scissors, User } from "lucide-react";

const AppointmentModalCliente = ({ isOpen, onClose, onAppointmentCreated }) => {
  const [services, setServices] = useState([]);
  const [employees, setEmployees] = useState([]);

  const [selectedServiceId, setSelectedServiceId] = useState("");
  const [selectedEmployeeId, setSelectedEmployeeId] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedHour, setSelectedHour] = useState("");
  const [clientNotes, setClientNotes] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const establishmentId = localStorage.getItem("establishmentId");
  const clientId = localStorage.getItem("clientId");

  useEffect(() => {
    if (isOpen) {
      setSelectedServiceId("");
      setSelectedEmployeeId("");
      setSelectedDate("");
      setSelectedHour("");
      setClientNotes("");
      setError(null);
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && establishmentId) {
      const fetchData = async () => {
        try {
          const [servicesRes, employeesRes] = await Promise.all([
            agendaService.getServices(establishmentId),
            agendaService.getEmployees(establishmentId),
          ]);
          setServices(servicesRes);
          setEmployees(employeesRes);
        } catch (err) {
          console.error("Erro ao carregar dados:", err);
          setError("Erro ao carregar serviços/funcionários.");
        }
      };
      fetchData();
    }
  }, [isOpen, establishmentId]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (!selectedServiceId || !selectedEmployeeId || !selectedDate || !selectedHour) {
        setError("Preencha todos os campos obrigatórios.");
        setLoading(false);
        return;
      }

      const startTime = new Date(`${selectedDate}T${selectedHour}`);
      const endTime = new Date(startTime);
      endTime.setHours(startTime.getHours() + 1);

      const appointmentData = {
        customerId: clientId,
        serviceId: selectedServiceId,
        employeeId: selectedEmployeeId,
        establishmentId,
        startTime: startTime.toISOString(),
        endTime: endTime.toISOString(),
        status: "PENDING",
        clientNotes,
      };

      await agendaService.createAppointment(appointmentData);
      onAppointmentCreated();
      onClose();
    } catch (err) {
      console.error("Erro ao criar agendamento:", err);
      setError(
        err.response?.data?.message || "Erro ao criar agendamento. Tente novamente."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Overlay onClick={onClose}>
      <Modal onClick={(e) => e.stopPropagation()}>
        <Header>
          <Title>
            <CalendarDays size={20} /> Novo Agendamento
          </Title>
          <CloseButton onClick={onClose}>
            <X size={18} />
          </CloseButton>
        </Header>

        <Form onSubmit={handleSubmit}>
          {error && <ErrorMessage>{error}</ErrorMessage>}

          <FormGroup>
            <Label>
              <CalendarDays size={16} /> Data:
            </Label>
            <Input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              required
            />
          </FormGroup>

          <FormGroup>
            <Label>
              <Clock size={16} /> Horário:
            </Label>
            <Input
              type="time"
              value={selectedHour}
              onChange={(e) => setSelectedHour(e.target.value)}
              required
            />
          </FormGroup>

          <FormGroup>
            <Label>
              <Scissors size={16} /> Serviço:
            </Label>
            <Select
              value={selectedServiceId}
              onChange={(e) => setSelectedServiceId(e.target.value)}
              required
            >
              <option value="">Selecione um serviço</option>
              {services.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name} — R$ {(s.priceCents / 100).toFixed(2)} ({s.duration} min)
                </option>
              ))}
            </Select>
          </FormGroup>

          <FormGroup>
            <Label>
              <User size={16} /> Profissional:
            </Label>
            <Select
              value={selectedEmployeeId}
              onChange={(e) => setSelectedEmployeeId(e.target.value)}
              required
            >
              <option value="">Selecione um profissional</option>
              {employees.map((emp) => (
                <option key={emp.id} value={emp.id}>
                  {emp.name}
                </option>
              ))}
            </Select>
          </FormGroup>

          <FormGroup>
            <Label>Observações:</Label>
            <TextArea
              value={clientNotes}
              onChange={(e) => setClientNotes(e.target.value)}
              placeholder="Ex: Prefiro atendimento com shampoo neutro"
            />
          </FormGroup>

          <ButtonPrimary type="submit" disabled={loading}>
            {loading ? "Agendando..." : "Agendar"}
          </ButtonPrimary>
        </Form>
      </Modal>
    </Overlay>
  );
};

export default AppointmentModalCliente;
