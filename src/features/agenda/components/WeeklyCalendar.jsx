import React, { useEffect, useState } from "react";
import styles from "./WeeklyCalendar.module.css";
import agendaService from "../agendaService";
import AppointmentDetailsModal from "../../../components/AppointmentModal/AppointmentDetailsModal";

const WeeklyCalendar = ({ initialDate = new Date() }) => {
  const [currentDate] = useState(initialDate);
  const [appointments, setAppointments] = useState([]);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [loading, setLoading] = useState(false);

  const daysOfWeek = ["Segunda", "Terça", "Quarta", "Quinta", "Sexta"];
  const hours = Array.from({ length: 17 }, (_, i) => i + 6); 

  const startOfWeek = new Date(currentDate);
  const day = startOfWeek.getDay(); 
  const diff = startOfWeek.getDate() - day + (day === 0 ? -6 : 1);
  startOfWeek.setDate(diff);

  const weekDates = Array.from({ length: 5 }, (_, i) => {
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

      return sameDay && inHourRange;
    });
  };


  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        let allAppointments = [];
        for (const date of weekDates) {
          const data = await agendaService.getAppointmentsByDate(date);
          allAppointments = [...allAppointments, ...data];
        }
        setAppointments(allAppointments);
      } catch (error) {
        console.error("Erro ao carregar agendamentos:", error);
      }
    };
    fetchAppointments();
  }, [currentDate]);

  const updateStatus = async (id, newStatus) => {
    try {
      setLoading(true);
      await agendaService.updateAppointmentStatus(id, newStatus);

      setAppointments((prev) =>
        prev.map((a) => (a.id === id ? { ...a, status: newStatus } : a))
      );
      setSelectedAppointment(null);
    } catch (error) {
      console.error("Erro ao atualizar status:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.weeklyCalendar}>
      {/* Cabeçalho dos dias */}
      <div className={styles.timeColumn}></div>
      {weekDates.map((date, index) => (
        <div key={index} className={styles.dayHeader}>
          {daysOfWeek[index]} <br />
          <span>
            {date.toLocaleDateString("pt-BR", {
              day: "2-digit",
              month: "short",
            })}
          </span>
        </div>
      ))}

      {/* Grade de horários */}
      {hours.map((hour) => (
        <React.Fragment key={hour}>
          <div className={styles.hourLabel}>{`${hour}:00h`}</div>
          {weekDates.map((_, dayIndex) => {
            const slotAppointments = getAppointmentsForSlot(dayIndex, hour);
            return (
              <div key={`${dayIndex}-${hour}`} className={styles.timeSlot}>
                {slotAppointments.length > 0 &&
                  slotAppointments.map((appointment) => (
                    <div
                      key={appointment.id}
                      className={`${styles.appointment} ${
                        styles[`status-${appointment.status.toLowerCase()}`]
                      }`}
                      onClick={() => setSelectedAppointment(appointment)}
                    >
                      <i className="fas fa-user"></i>{" "}
                      {appointment.clientName || "Cliente"}
                    </div>
                  ))}
              </div>
            );
          })}
        </React.Fragment>
      ))}

      {/* Modal de Detalhes */}
      {selectedAppointment && (
        <AppointmentDetailsModal
          appointment={selectedAppointment}
          onClose={() => setSelectedAppointment(null)}
          onUpdateStatus={updateStatus}
          loading={loading}
        />
      )}
    </div>
  );
};

export default WeeklyCalendar;
