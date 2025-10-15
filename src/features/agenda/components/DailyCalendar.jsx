import React, { useEffect, useMemo, useState } from "react";
import { format, isSameDay } from "date-fns";
import { ptBR } from "date-fns/locale";
import { ChevronLeft, ChevronRight, Clock, User, Scissors } from "lucide-react";

import agendaService from "../agendaService";
import AppointmentDetailsModal from "../../../components/AppointmentModal/AppointmentDetailsModal";
import AppointmentModal from "../../../components/AppointmentModal/AppointmentModal";

import {
  DailyContainer,
  Header,
  NavButton,
  DateLabel,
  HourRow,
  HourLabel,
  Slot,
  AppointmentCard,
  ServiceName,
  ClientName,
  AppointmentTime,
  EmptySlot,
  StatusTag,
} from "./DailyCalendar.styles";

const HOURS_START = 6;
const HOURS_END = 22;

const DailyCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [appointments, setAppointments] = useState([]);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [loading, setLoading] = useState(false);

  const [isNewAppointmentOpen, setIsNewAppointmentOpen] = useState(false);
  const [selectedHourForNew, setSelectedHourForNew] = useState(null);

  const hours = useMemo(
    () => Array.from({ length: HOURS_END - HOURS_START }, (_, i) => i + HOURS_START),
    []
  );

  const goPrevDay = () =>
    setCurrentDate((prev) => {
      const d = new Date(prev);
      d.setDate(d.getDate() - 1);
      return d;
    });

  const goNextDay = () =>
    setCurrentDate((prev) => {
      const d = new Date(prev);
      d.setDate(d.getDate() + 1);
      return d;
    });

  const goToday = () => setCurrentDate(new Date());
  const isToday = (date) => isSameDay(date, new Date());

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        setLoading(true);
        const data = await agendaService.getAppointmentsByDate(currentDate);
        setAppointments(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Erro ao carregar agendamentos (dia):", err);
        setAppointments([]);
      } finally {
        setLoading(false);
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

  const handleEmptySlotClick = (hour) => {
    setSelectedHourForNew(hour);
    setIsNewAppointmentOpen(true);
  };

  const getAppointmentsAtHour = (hour) => {
    return appointments.filter((a) => {
      const d = new Date(a.startTime);
      return (
        d.getFullYear() === currentDate.getFullYear() &&
        d.getMonth() === currentDate.getMonth() &&
        d.getDate() === currentDate.getDate() &&
        d.getHours() === hour
      );
    });
  };

  const formatLabel = (date) =>
    format(date, "EEEE, dd 'de' MMMM", { locale: ptBR });

  const formatTime = (iso) =>
    format(new Date(iso), "HH:mm", { locale: ptBR });

  return (
    <DailyContainer>
      <Header>
        <NavButton onClick={goPrevDay} aria-label="Dia anterior">
          <ChevronLeft size={18} />
        </NavButton>

        <DateLabel>
          {formatLabel(currentDate)}
          {!isToday(currentDate) && (
            <button className="today-btn" onClick={goToday}>
              Hoje
            </button>
          )}
        </DateLabel>

        <NavButton onClick={goNextDay} aria-label="Próximo dia">
          <ChevronRight size={18} />
        </NavButton>
      </Header>

      {/* 🔹 Loader */}
      {loading && (
        <div style={{ padding: "8px 12px", fontSize: 14, color: "#6b7280" }}>
          Carregando agendamentos...
        </div>
      )}

      {hours.map((hour) => {
        const apps = getAppointmentsAtHour(hour);
        return (
          <HourRow key={hour}>
            <HourLabel>{String(hour).padStart(2, "0")}:00</HourLabel>
            <Slot>
              {apps.length > 0 ? (
                apps.map((a) => (
                  <AppointmentCard
                    key={a.id}
                    $status={a.status?.toLowerCase()}
                    onClick={() => setSelectedAppointment(a)}
                  >
                    <ServiceName>
                      <Scissors size={14} />
                      {a.serviceName || "Serviço"}
                    </ServiceName>

                    <ClientName>
                      <User size={14} />
                      {a.clientName || "Cliente"}
                    </ClientName>

                    <AppointmentTime>
                      <Clock size={14} />
                      {formatTime(a.startTime)} – {formatTime(a.endTime)}
                    </AppointmentTime>

                    <StatusTag $status={a.status?.toLowerCase()}>
                      {a.status?.replace("_", " ").toLowerCase()}
                    </StatusTag>
                  </AppointmentCard>
                ))
              ) : (
                <EmptySlot onClick={() => handleEmptySlotClick(hour)}>
                  + Novo agendamento
                </EmptySlot>
              )}
            </Slot>
          </HourRow>
        );
      })}

      {selectedAppointment && (
        <AppointmentDetailsModal
          appointment={selectedAppointment}
          onClose={() => setSelectedAppointment(null)}
          onUpdateStatus={updateStatus}
          loading={loading}
        />
      )}

      {isNewAppointmentOpen && (
        <AppointmentModal
          isOpen={isNewAppointmentOpen}
          onClose={() => setIsNewAppointmentOpen(false)}
          selectedHour={selectedHourForNew}
          onAppointmentCreated={() => {
            setIsNewAppointmentOpen(false);
            agendaService.getAppointmentsByDate(currentDate).then((data) =>
              setAppointments(Array.isArray(data) ? data : [])
            );
          }}
        />
      )}
    </DailyContainer>
  );
};

export default DailyCalendar;
