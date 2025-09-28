import React from "react";
import styles from "./AppointmentDetailsModal.module.css";

const CalendarioIcone = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line><path d="m9 16 2 2 4-4"></path></svg>;
const ClienteIcone = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>;
const ServicoIcone = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>;
const ProfissionalIcone = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle><line x1="12" y1="2" x2="12" y2="3"></line><line x1="12" y1="11" x2="12" y2="13"></line></svg>;
const HorarioIcone = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>;
const StatusIcone = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path><line x1="7" y1="7" x2="7.01" y2="7"></line></svg>;
const FecharIcone = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>;
const CancelarIcone = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"></line></svg>;
const ConfirmarIcone = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>;

const AppointmentDetailsModal = ({ appointment, onClose, onUpdateStatus, loading }) => {
  if (!appointment) return null;

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <h3>
          <CalendarioIcone /> Detalhes do Agendamento
        </h3>

        <p><ClienteIcone /> <b> Cliente:</b> {appointment.clientName}</p>
        <p><ServicoIcone /> <b> Serviço:</b> {appointment.serviceName}</p>
        <p><ProfissionalIcone /> <b> Profissional:</b> {appointment.employeeName}</p>
        <p>
          <HorarioIcone /> <b> Horário:</b>{" "}
          {new Date(appointment.startTime).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })} -{" "}
          {new Date(appointment.endTime).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
        </p>
        <p>
          <StatusIcone /> <b> Status:</b>{" "}
          <span className={`${styles.statusTag} ${styles[`status-${appointment.status.toLowerCase()}`]}`}>
            {appointment.status}
          </span>
        </p>

        <div className={styles.modalActions}>
          <button className={styles.btnSecondary} onClick={onClose}>
            <FecharIcone /> Fechar
          </button>
          <button className={styles.btnSecondary} disabled={loading || appointment.status === 'CANCELED'} onClick={() => onUpdateStatus(appointment.id, "CANCELED")}>
            <CancelarIcone /> {loading ? "Cancelando..." : "Cancelar"}
          </button>
          <button className={styles.btnPrimary} disabled={loading || appointment.status === 'CONFIRMED'} onClick={() => onUpdateStatus(appointment.id, "CONFIRMED")}>
            <ConfirmarIcone /> {loading ? "Confirmando..." : "Confirmar"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AppointmentDetailsModal;