import React, { useEffect, useState } from "react";
import {
  WeeklyCalendarContainer,
  TimeColumnSpacer,
  DayHeader,
  HourLabel,
  TimeSlot,
  AppointmentCard,
  CalendarHeader,
  NavButton,
  AppointmentTitle,
  AppointmentInfo,
  FilterContainer,
  SelectFilter,
} from "./WeeklyCalendar.styles";
import agendaService from "../agendaService";
import AppointmentDetailsModal from "../../../components/AppointmentModal/AppointmentDetailsModal";
import api from "../../../services/api";

const WeeklyCalendar = ({ initialDate = new Date() }) => {
  const [currentDate, setCurrentDate] = useState(initialDate);
  const [appointments, setAppointments] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState("all");
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [loading, setLoading] = useState(false);

  const establishmentId = localStorage.getItem("establishmentId");
  const token = localStorage.getItem("token");

  const daysOfWeek = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
  const hours = Array.from({ length: 17 }, (_, i) => i + 6); // 06h–22h

  const startOfWeek = new Date(currentDate);
  const day = startOfWeek.getDay();
  const diff = startOfWeek.getDate() - day;
  startOfWeek.setDate(diff);

  const weekDates = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(startOfWeek);
    d.setDate(startOfWeek.getDate() + i);
    return d;
  });

  const getAppointmentsForSlot = (dayIndex, hour) => {
    return appointments.filter((app) => {
      const appDate = new Date(app.startTime);
      const slotDate = weekDates[dayIndex];

      const sameDay =
        appDate.getDate() === slotDate.getDate() &&
        appDate.getMonth() === slotDate.getMonth() &&
        appDate.getFullYear() === slotDate.getFullYear();

      const inHourRange =
        appDate.getHours() >= hour && appDate.getHours() < hour + 1;

      const sameEmployee =
        selectedEmployee === "all" || app.employeeId === selectedEmployee;

      return sameDay && inHourRange && sameEmployee;
    });
  };

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        let all = [];
        for (const date of weekDates) {
          const data = await agendaService.getAppointmentsByDate(date);
          all = [...all, ...data];
        }
        setAppointments(all);
      } catch (error) {
        console.error("Erro ao carregar agendamentos:", error);
      }
    };
    fetchAppointments();
  }, [currentDate]);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const res = await api.get(
          `/api/establishments/${establishmentId}/employees`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setEmployees(res.data);
      } catch (error) {
        console.error("Erro ao carregar funcionários:", error);
      }
    };
    if (establishmentId && token) fetchEmployees();
  }, [establishmentId, token]);

  const updateStatus = async (id, newStatus) => {
    try {
      setLoading(true);
      await agendaService.updateAppointmentStatus(id, newStatus);

      setSelectedAppointment(null);
    } catch (error) {
      console.error("Erro ao atualizar status:", error);
    } finally {
      setLoading(false);
    }
  };

  const previousWeek = () =>
    setCurrentDate((prev) => new Date(prev.setDate(prev.getDate() - 7)));
  const nextWeek = () =>
    setCurrentDate((prev) => new Date(prev.setDate(prev.getDate() + 7)));

  return (
    <WeeklyCalendarContainer>
      <CalendarHeader>
        <NavButton onClick={previousWeek}>‹</NavButton>
        <h3>
          {weekDates[0].toLocaleDateString("pt-BR", {
            day: "2-digit",
            month: "short",
          })}{" "}
          –{" "}
          {weekDates[6].toLocaleDateString("pt-BR", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          })}
        </h3>

        <FilterContainer>
          <SelectFilter
            value={selectedEmployee}
            onChange={(e) => setSelectedEmployee(e.target.value)}
          >
            <option value="all">Todos os profissionais</option>
            {employees.map((emp) => (
              <option key={emp.id} value={emp.id}>
                {emp.name}
              </option>
            ))}
          </SelectFilter>
        </FilterContainer>

        <NavButton onClick={nextWeek}>›</NavButton>
      </CalendarHeader>

      <TimeColumnSpacer />
      {weekDates.map((date, index) => (
        <DayHeader key={index} isWeekend={index === 0 || index === 6}>
          {daysOfWeek[index]} <br />
          <span>
            {date.toLocaleDateString("pt-BR", {
              day: "2-digit",
              month: "short",
            })}
          </span>
        </DayHeader>
      ))}

      {hours.map((hour) => (
        <React.Fragment key={hour}>
          <HourLabel>{`${hour}:00h`}</HourLabel>

          {weekDates.map((_, dayIndex) => {
            const slotAppointments = getAppointmentsForSlot(dayIndex, hour);

            return (
              <TimeSlot key={`${dayIndex}-${hour}`}>
                {slotAppointments.map((appointment) => (
                  <AppointmentCard
                    key={appointment.id}
                    $status={appointment.status?.toLowerCase()}
                    onClick={() => setSelectedAppointment(appointment)}
                  >
                    <AppointmentTitle>
                      {appointment.serviceName || "Serviço não informado"}
                    </AppointmentTitle>

                    <AppointmentInfo>
                      🕒{" "}
                      {new Date(appointment.startTime).toLocaleTimeString(
                        "pt-BR",
                        { hour: "2-digit", minute: "2-digit" }
                      )}{" "}
                      — {appointment.clientName || "Cliente"}
                    </AppointmentInfo>
                  </AppointmentCard>
                ))}
              </TimeSlot>
            );
          })}
        </React.Fragment>
      ))}

      {selectedAppointment && (
        <AppointmentDetailsModal
          appointment={selectedAppointment}
          onClose={() => setSelectedAppointment(null)}
          onUpdateStatus={updateStatus}
          loading={loading}
        />
      )}
    </WeeklyCalendarContainer>
  );
};

export default WeeklyCalendar;
