import React, { useState, useEffect } from "react";
import "../UI/Modal/Modal.module.css";
import api from "@services/api.js";

const AppointmentModal = ({ isOpen, onClose, selectedHour, onAppointmentCreated }) => {
  const [customers, setCustomers] = useState([]);
  const [services, setServices] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [selectedCustomerId, setSelectedCustomerId] = useState("");
  const [newCustomerName, setNewCustomerName] = useState("");
  const [newCustomerPhone, setNewCustomerPhone] = useState("");
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
          const [customersResponse, servicesResponse, employeesResponse] = await Promise.all([
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
          setCustomers(customersResponse.data);
          setServices(servicesResponse.data);
          setEmployees(employeesResponse.data);
        } catch (err) {
          console.error("Erro ao buscar dados:", err);
          setError("Erro ao carregar dados (clientes/serviços/funcionários).");
        }
      };
      fetchData();
    }
  }, [isOpen, establishmentId, token]);

  if (!isOpen) return null;

  const handleCreateCustomer = async () => {
    try {
      const response = await api.post(
        `/api/establishments/${establishmentId}/clients`,
        {
          name: newCustomerName,
          phone: newCustomerPhone,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setCustomers([...customers, response.data]);
      setSelectedCustomerId(response.data.id);
      setNewCustomerName("");
      setNewCustomerPhone("");
      return response.data.id;
    } catch (err) {
      console.error("Erro ao criar cliente:", err);
      setError("Erro ao criar novo cliente.");
      throw err;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    let finalCustomerId = selectedCustomerId;

    try {
      if (selectedCustomerId === "new" && newCustomerName) {
        finalCustomerId = await handleCreateCustomer();
      } else if (!selectedCustomerId) {
        setError("Selecione um cliente ou crie um novo.");
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
        customerId: finalCustomerId,
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
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>
            <i className="fas fa-calendar-plus"></i> Novo Agendamento
          </h2>
          <button onClick={onClose} className="close-button">
            &times;
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          {error && <p className="error-message">{error}</p>}

          <div className="form-group">
            <label>
              <i className="fas fa-clock"></i> Horário:
            </label>
            <input type="text" value={`${selectedHour}:00`} readOnly />
          </div>

          <div className="form-group">
            <label>
              <i className="fas fa-user"></i> Cliente:
            </label>
            <select
              value={selectedCustomerId}
              onChange={(e) => setSelectedCustomerId(e.target.value)}
              required
            >
              <option value="">Selecione um cliente</option>
              {customers.map((customer) => (
                <option key={customer.id} value={customer.id}>
                  {customer.clientName || customer.name} ({customer.clientPhone || customer.phone})
                </option>
              ))}
              <option value="new">Criar novo cliente</option>
            </select>
          </div>

          {selectedCustomerId === "new" && (
            <>
              <div className="form-group">
                <label>
                  <i className="fas fa-user-plus"></i> Nome do Novo Cliente:
                </label>
                <input
                  type="text"
                  placeholder="Nome do novo cliente"
                  value={newCustomerName}
                  onChange={(e) => setNewCustomerName(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label>
                  <i className="fas fa-phone"></i> Telefone do Novo Cliente:
                </label>
                <input
                  type="text"
                  placeholder="Telefone do novo cliente"
                  value={newCustomerPhone}
                  onChange={(e) => setNewCustomerPhone(e.target.value)}
                />
              </div>
            </>
          )}

          <div className="form-group">
            <label>
              <i className="fas fa-briefcase"></i> Serviço:
            </label>
            <select
              value={selectedServiceId}
              onChange={(e) => setSelectedServiceId(e.target.value)}
              required
            >
              <option value="">Selecione um serviço</option>
              {services.map((service) => (
                <option key={service.id} value={service.id}>
                  {service.name} (R$ {(service.priceCents / 100).toFixed(2)}) - {service.durationMinutes} min
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>
              <i className="fas fa-user-tie"></i> Funcionário:
            </label>
            <select
              value={selectedEmployeeId}
              onChange={(e) => setSelectedEmployeeId(e.target.value)}
              required
            >
              <option value="">Selecione um funcionário</option>
              {employees.map((employee) => (
                <option key={employee.id} value={employee.id}>
                  {employee.name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>
              <i className="fas fa-flag"></i> Status do Agendamento:
            </label>
            <select value={status} onChange={(e) => setStatus(e.target.value)}>
              <option value="PENDING">Pendente</option>
              <option value="CONFIRMED">Confirmado</option>
              <option value="CANCELED">Cancelado</option>
              <option value="COMPLETED">Concluído</option>
              <option value="NO_SHOW">Não Compareceu</option>
              <option value="RESCHEDULED">Reagendado</option>
              <option value="REJECTED">Rejeitado</option>
            </select>
          </div>

          <div className="form-group">
            <label>
              <i className="fas fa-sticky-note"></i> Notas do Cliente:
            </label>
            <textarea
              placeholder="Notas do cliente"
              value={clientNotes}
              onChange={(e) => setClientNotes(e.target.value)}
            />
          </div>

          <button type="submit" className="login-button" disabled={loading}>
            {loading ? "Salvando..." : "Salvar Agendamento"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AppointmentModal;
