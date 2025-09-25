import React, { useState, useEffect } from "react";
import agendaService from "/src/features/agenda/agendaService";
import styles from "./AppointmentModal.module.css";

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
        setError("Preencha todos os campos.");
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
      setError(err.response?.data?.message || "Erro ao criar agendamento. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles["modal-overlay"]}>
      <div className={styles["modal-content"]}>
        <div className={styles["modal-header"]}>
          <h2>Novo Agendamento</h2>
          <button onClick={onClose} className={styles["close-button"]}>
            &times;
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          {error && <p className={styles["error-message"]}>{error}</p>}

          {/* Data */}
          <div className={styles["form-group"]}>
            <label>Data:</label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              required
            />
          </div>

          {/* Horário */}
          <div className={styles["form-group"]}>
            <label>Horário:</label>
            <input
              type="time"
              value={selectedHour}
              onChange={(e) => setSelectedHour(e.target.value)}
              required
            />
          </div>

          {/* Serviço */}
          <div className={styles["form-group"]}>
            <label>Serviço:</label>
            <select
              value={selectedServiceId}
              onChange={(e) => setSelectedServiceId(e.target.value)}
              required
            >
              <option value="">Selecione um serviço</option>
              {services.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name} (R$ {(s.priceCents / 100).toFixed(2)}) - {s.duration} min
                </option>
              ))}
            </select>
          </div>

          {/* Funcionário */}
          <div className={styles["form-group"]}>
            <label>Profissional:</label>
            <select
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
            </select>
          </div>

          {/* Notas */}
          <div className={styles["form-group"]}>
            <label>Notas:</label>
            <textarea
              value={clientNotes}
              onChange={(e) => setClientNotes(e.target.value)}
              placeholder="Observações adicionais"
            />
          </div>

          <button type="submit" className={styles["login-button"]} disabled={loading}>
            {loading ? "Agendando..." : "Agendar"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AppointmentModalCliente;
