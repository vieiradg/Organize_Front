import React, { useState, useEffect } from "react";
import api from "@services/api";
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
} from "./AppointmentModal.styles";
import {
  CalendarPlus,
  Clock,
  User,
  Briefcase,
  FileText,
  Flag,
  UserCog,
  X,
} from "lucide-react";

const AppointmentModal = ({ isOpen, onClose, selectedHour, onAppointmentCreated }) => {
  const [customers, setCustomers] = useState([]);
  const [services, setServices] = useState([]);
  const [employees, setEmployees] = useState([]);

  const [selectedCustomerId, setSelectedCustomerId] = useState("");
  const [selectedServiceId, setSelectedServiceId] = useState("");
  const [selectedEmployeeId, setSelectedEmployeeId] = useState("");
  const [clientNotes, setClientNotes] = useState("");
  const [status, setStatus] = useState("PENDING");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const establishmentId = localStorage.getItem("establishmentId");
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (isOpen && establishmentId && token) {
      const fetchData = async () => {
        try {
          const [customersRes, servicesRes, employeesRes] = await Promise.all([
            api.get(`/api/establishments/${establishmentId}/clients`, {
              headers: { Authorization: `Bearer ${token}` },
            }),
            api.get(`/api/establishments/${establishmentId}/services`, {
              headers: { Authorization: `Bearer ${token}` },
            }),
            api.get(`/api/establishments/${establishmentId}/employees`, {
              headers: { Authorization: `Bearer ${token}` },
            }),
          ]);

          // Normaliza para sempre ter name, independente de como o backend envia
          const normalizedClients = customersRes.data.map((c) => ({
            id: c.id,
            name: c.clientName || c.name || "Cliente sem nome",
          }));

          setCustomers(normalizedClients);
          setServices(servicesRes.data || []);
          setEmployees(employeesRes.data || []);
        } catch (err) {
          console.error("Erro ao buscar dados:", err);
          setError("Erro ao carregar dados (clientes, serviços ou funcionários).");
        }
      };
      fetchData();
    }
  }, [isOpen, establishmentId, token]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (!selectedCustomerId || !selectedServiceId || !selectedEmployeeId) {
        setError("Preencha todos os campos obrigatórios.");
        setLoading(false);
        return;
      }

      const startTime = new Date();
      startTime.setHours(selectedHour, 0, 0, 0);

      const service = services.find((s) => s.id === selectedServiceId);
      const duration = service?.durationMinutes || 60;

      const endTime = new Date(startTime);
      endTime.setMinutes(startTime.getMinutes() + duration);

      const appointmentData = {
        customerId: selectedCustomerId,
        serviceId: selectedServiceId,
        establishmentId,
        employeeId: selectedEmployeeId,
        startTime: startTime.toISOString(),
        endTime: endTime.toISOString(),
        status,
        clientNotes,
      };

      await api.post("/api/appointments", appointmentData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      onAppointmentCreated();
      onClose();
    } catch (err) {
      console.error("Erro ao criar agendamento:", err);
      setError(err.response?.data?.message || "Erro ao criar agendamento. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Overlay onClick={onClose}>
      <Modal onClick={(e) => e.stopPropagation()}>
        <Header>
          <Title>
            <CalendarPlus size={20} /> Novo Agendamento
          </Title>
          <CloseButton onClick={onClose}>
            <X size={18} />
          </CloseButton>
        </Header>

        <Form onSubmit={handleSubmit}>
          {error && <ErrorMessage>{error}</ErrorMessage>}

          <FormGroup>
            <Label>
              <Clock size={16} /> Horário:
            </Label>
            <Input type="text" value={`${selectedHour}:00`} readOnly />
          </FormGroup>

          <FormGroup>
            <Label>
              <User size={16} /> Cliente:
            </Label>
            <Select
              value={selectedCustomerId}
              onChange={(e) => setSelectedCustomerId(e.target.value)}
              required
            >
              <option value="">Selecione um cliente</option>
              {customers.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </Select>
          </FormGroup>

          <FormGroup>
            <Label>
              <Briefcase size={16} /> Serviço:
            </Label>
            <Select
              value={selectedServiceId}
              onChange={(e) => setSelectedServiceId(e.target.value)}
              required
            >
              <option value="">Selecione um serviço</option>
              {services.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name} — R$ {(s.priceCents / 100).toFixed(2)} ({s.durationMinutes} min)
                </option>
              ))}
            </Select>
          </FormGroup>

          <FormGroup>
            <Label>
              <UserCog size={16} /> Funcionário:
            </Label>
            <Select
              value={selectedEmployeeId}
              onChange={(e) => setSelectedEmployeeId(e.target.value)}
              required
            >
              <option value="">Selecione um funcionário</option>
              {employees.map((emp) => (
                <option key={emp.id} value={emp.id}>
                  {emp.name}
                </option>
              ))}
            </Select>
          </FormGroup>

          <FormGroup>
            <Label>
              <Flag size={16} /> Status:
            </Label>
            <Select value={status} onChange={(e) => setStatus(e.target.value)}>
              <option value="PENDING">Pendente</option>
              <option value="CONFIRMED">Confirmado</option>
              <option value="CANCELED">Cancelado</option>
              <option value="COMPLETED">Concluído</option>
              <option value="NO_SHOW">Não Compareceu</option>
              <option value="RESCHEDULED">Reagendado</option>
              <option value="REJECTED">Rejeitado</option>
            </Select>
          </FormGroup>

          <FormGroup>
            <Label>
              <FileText size={16} /> Notas:
            </Label>
            <TextArea
              placeholder="Observações sobre o cliente ou serviço"
              value={clientNotes}
              onChange={(e) => setClientNotes(e.target.value)}
            />
          </FormGroup>

          <ButtonPrimary type="submit" disabled={loading}>
            {loading ? "Salvando..." : "Salvar Agendamento"}
          </ButtonPrimary>
        </Form>
      </Modal>
    </Overlay>
  );
};

export default AppointmentModal;
