import styled from "styled-components";
const mobileBreakpoint = '768px';

export const DailyContainer = styled.div`
  display: flex;
  flex-direction: column;
  background: #f9fafb;
  border-radius: 12px;
  border: 1px solid #e5e7eb;
  font-family: "Inter", sans-serif;
  overflow-y: auto;
  max-height: 88vh;
  width: 100%; /* Garantir que ocupe a largura total */
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 20px;
  background-color: #fff;
  border-bottom: 1px solid #e5e7eb;
  position: sticky;
  top: 0;
  z-index: 5;
`;

export const NavButton = styled.button`
  border: none;
  background: #f3f4f6;
  border-radius: 6px;
  padding: 6px 8px;
  cursor: pointer;
  transition: background 0.2s ease;

  &:hover {
    background: #e5e7eb;
  }
`;

export const DateLabel = styled.h3`
  text-transform: capitalize;
  font-weight: 600;
  font-size: 1.1rem;
  color: #1f2937;
  display: flex;
  align-items: center;
  gap: 10px;
  text-align: center; /* Centraliza em telas pequenas */
  
  /* Ajuste do tamanho da fonte em telas menores */
  @media (max-width: ${mobileBreakpoint}) {
    font-size: 1rem;
  }

  .today-btn {
    border: none;
    background: #2563eb;
    color: #fff;
    font-size: 0.8rem;
    border-radius: 6px;
    padding: 4px 8px;
    cursor: pointer;
    transition: background 0.2s ease;

    &:hover {
      background: #1d4ed8;
    }
  }
`;

export const HourRow = styled.div`
  display: flex;
  align-items: flex-start;
  border-bottom: 1px dashed #e5e7eb;
  padding: 10px 16px;
  gap: 16px;
  background-color: #fff;

  &:nth-child(even) {
    background-color: #f9fafb;
  }

  @media (max-width: ${mobileBreakpoint}) {
    padding: 8px 10px;
    gap: 10px;
  }
`;

export const HourLabel = styled.div`
  flex: 0 0 70px;
  text-align: right;
  color: #4b5563;
  font-weight: 600;
  font-size: 0.9rem;
  padding-top: 8px;

  @media (max-width: ${mobileBreakpoint}) {
    flex: 0 0 55px; /* Reduz a largura para economizar espaço */
    font-size: 0.8rem;
  }
`;

export const Slot = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 6px;
  /* Garante que o slot ocupe o espaço restante */
  min-width: 0; 
`;

const statusColors = {
  pending: "#9ca3af",
  confirmed: "#2563eb",
  canceled: "#dc2626",
  completed: "#059669",
  no_show: "#7c3aed",
  rescheduled: "#facc15",
  rejected: "#ea580c",
};

export const AppointmentCard = styled.div`
  width: 100%;
  box-sizing: border-box; 
  
  background: #fff;
  border-left: 4px solid ${({ $status }) => statusColors[$status] || "#9ca3af"};
  border-radius: 10px;
  padding: 10px 12px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.05);
  font-size: 0.9rem;
  color: #111827;
  display: flex;
  flex-direction: column;
  gap: 4px;
  cursor: pointer; /* Adicionado cursor pointer para indicar que é clicável */
  
  @media (max-width: ${mobileBreakpoint}) {
    padding: 8px 10px;
    font-size: 0.85rem;
  }
`;

export const ServiceName = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  font-weight: 600;
  color: #1f2937;
  white-space: nowrap; 
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const ClientName = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 0.85rem;
  color: #4b5563;
`;

export const AppointmentTime = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 0.8rem;
  color: #6b7280;
`;

export const EmptySlot = styled.div`
  font-size: 0.85rem;
  color: #9ca3af;
  font-style: italic;
  padding-top: 6px;
  cursor: pointer;
  border-radius: 6px;
  transition: background 0.2s ease;

  &:hover {
    background: #f3f4f6;
    color: #374151;
  }
`;

export const StatusTag = styled.span`
  align-self: flex-start;
  padding: 3px 8px;
  border-radius: 9999px;
  font-size: 0.7rem;
  font-weight: 600;
  text-transform: capitalize;
  color: ${({ $status }) =>
    $status === "rescheduled" ? "#111827" : "#fff"};
  background-color: ${({ $status }) =>
    statusColors[$status] || "#9ca3af"};
`;  