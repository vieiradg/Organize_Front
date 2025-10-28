import React from "react";
import {
  Overlay,
  Modal,
  Title,
  InfoRow,
  IconWrapper,
  StatusTag,
  Actions,
  ButtonPrimary,
  ButtonSecondary,
  ButtonDanger,
} from "./AppointmentDetailsModal.styles";
import {
  CalendarDays,
  User,
  Scissors,
  Clock, 
  Briefcase,
  X,
  Check,
  XCircle,
  Ban,
  Flag,
} from "lucide-react";


const AppointmentDetailsModal = ({ appointment, onClose, onUpdateStatus, loading, onReschedule }) => {
  if (!appointment) return null;

  const formatTime = (iso) =>
    new Date(iso).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

  const formatStatusLabel = (status) => {
    const map = {
      PENDING: "Pendente",
      CONFIRMED: "Confirmado",
      CANCELED: "Cancelado",
      COMPLETED: "Concluído",
      NO_SHOW: "Não Compareceu",
      RESCHEDULED: "Reagendado",
      REJECTED: "Rejeitado",
    };
    return map[status] || status;
  };

  return (
    <Overlay onClick={onClose}>
      <Modal onClick={(e) => e.stopPropagation()}>
        <Title>
          <CalendarDays size={20} /> Detalhes do Agendamento
        </Title>

        <InfoRow>
          <IconWrapper><User size={16} /></IconWrapper>
          <b>Cliente:</b> {appointment.clientName || "Não informado"}
        </InfoRow>

        <InfoRow>
          <IconWrapper><Scissors size={16} /></IconWrapper>
          <b>Serviço:</b> {appointment.serviceName || "Não informado"}
        </InfoRow>

        <InfoRow>
          <IconWrapper><Briefcase size={16} /></IconWrapper>
          <b>Profissional:</b> {appointment.employeeName || "Não informado"}
        </InfoRow>

        <InfoRow>
          <IconWrapper><Clock size={16} /></IconWrapper>
          <b>Horário:</b> {formatTime(appointment.startTime)} – {formatTime(appointment.endTime)}
        </InfoRow>

        <InfoRow>
          <IconWrapper><Flag size={16} /></IconWrapper>
          <b>Status:</b>
          <StatusTag $status={appointment.status?.toLowerCase()}>
            {formatStatusLabel(appointment.status)}
          </StatusTag>
        </InfoRow>

        {appointment.clientNotes && (
          <InfoRow>
            <IconWrapper><Clock size={16} /></IconWrapper>
            <b>Notas:</b> {appointment.clientNotes}
          </InfoRow>
        )}

        <Actions>
          <ButtonSecondary onClick={onClose}>
            <X size={16} /> Fechar
          </ButtonSecondary>
          
          <ButtonSecondary
            disabled={loading || appointment.status === "COMPLETED" || appointment.status === "CANCELED"}
            onClick={() => onReschedule(appointment)} 
          >
            <Clock size={16} /> Reagendar
          </ButtonSecondary>

          {/* Cancelar */}
          <ButtonDanger
            disabled={loading || appointment.status === "CANCELED"}
            onClick={() => onUpdateStatus(appointment.id, "CANCELED")}
          >
            <XCircle size={16} /> {loading ? "Cancelando..." : "Cancelar"}
          </ButtonDanger>

          {/* Não Compareceu */}
          <ButtonSecondary
            disabled={loading || appointment.status === "NO_SHOW"}
            onClick={() => onUpdateStatus(appointment.id, "NO_SHOW")}
          >
            <Ban size={16} /> {loading ? "Salvando..." : "Não Compareceu"}
          </ButtonSecondary>

          {/* Concluir */}
          <ButtonPrimary
            disabled={loading || appointment.status === "COMPLETED"}
            onClick={() => onUpdateStatus(appointment.id, "COMPLETED")}
          >
            <Check size={16} /> {loading ? "Salvando..." : "Concluir"}
          </ButtonPrimary>
        </Actions>
      </Modal>
    </Overlay>
  );
};

export default AppointmentDetailsModal;