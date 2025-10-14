import styled from "styled-components";

export const WeeklyCalendarContainer = styled.div`
  display: grid;
  grid-template-columns: 80px repeat(7, 1fr); /* Domingo a sábado */
  gap: 1px;
  background-color: #e5e7eb;
  border: 1px solid #d1d5db;
  border-radius: 12px;
  overflow-y: auto;
  overflow-x: auto;
  max-height: 800px;
  font-family: "Inter", sans-serif;

  /* 🔹 Evita que as colunas fiquem esmagadas em telas menores */
  min-width: 1100px;
`;

/* ===================== CABEÇALHO ===================== */

export const CalendarHeader = styled.div`
  grid-column: span 8; /* 1 (horas) + 7 dias */
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 22px;
  background: #f9fafb;
  border-bottom: 1px solid #e5e7eb;

  h3 {
    font-weight: 600;
    color: #1f2937;
    font-size: 1rem;
    display: flex;
    align-items: center;
    gap: 10px;
    white-space: nowrap;
  }
`;

/* 🔹 Grupo central (setas + título) */
export const NavGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const NavButton = styled.button`
  background: transparent;
  color: #2563eb;
  font-size: 1.6rem;
  font-weight: bold;
  border: none;
  cursor: pointer;
  padding: 4px 8px;
  line-height: 1;
  transition: color 0.2s ease;

  &:hover {
    color: #1d4ed8;
  }

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
`;

/* ===================== CABEÇALHO DOS DIAS ===================== */

export const TimeColumnSpacer = styled.div`
  background: #fff;
  border-bottom: 2px solid #e5e7eb;
`;

export const DayHeader = styled.div`
  background-color: ${({ isWeekend }) => (isWeekend ? "#f3f4f6" : "#f9fafb")};
  text-align: center;
  font-weight: 600;
  padding: 16px 8px;
  border-bottom: 2px solid #e5e7eb;
  font-size: 0.95rem;
  color: #1f2937;
  min-width: 140px;

  span {
    display: block;
    font-size: 0.8rem;
    color: #6b7280;
    margin-top: 2px;
  }
`;

/* ===================== HORÁRIOS ===================== */

export const HourLabel = styled.div`
  background-color: #f3f4f6;
  font-weight: 500;
  font-size: 0.85rem;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-right: 12px;
  border-right: 1px solid #e5e7eb;
  color: #4b5563;
  min-height: 70px;
`;

export const TimeSlot = styled.div`
  background-color: #fff;
  min-height: 70px;
  display: flex;
  flex-direction: column;
  padding: 4px;
  border-top: 1px dashed #e5e7eb;
  cursor: pointer;
  transition: background-color 0.15s ease;

  &:hover {
    background-color: #f9fafb;
  }
`;

/* ===================== AGENDAMENTOS ===================== */

const statusBg = {
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
  padding: 8px 10px;
  border-radius: 10px;
  color: ${({ $status }) => ($status === "rescheduled" ? "#111827" : "#fff")};
  font-size: 0.85rem;
  margin: 3px 0;
  background-color: ${({ $status }) => statusBg[$status] || statusBg.pending};
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.08);
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const AppointmentTitle = styled.div`
  font-weight: 600;
  font-size: 0.9rem;
`;

export const AppointmentInfo = styled.div`
  font-weight: 400;
  font-size: 0.8rem;
  opacity: 0.9;
`;

/* ===================== FILTRO ===================== */

export const FilterContainer = styled.div`
  margin-left: auto;
  margin-right: 12px;
`;

export const SelectFilter = styled.select`
  padding: 6px 10px;
  border-radius: 6px;
  border: 1px solid #d1d5db;
  font-size: 0.85rem;
  background-color: #fff;
  color: #374151;
  outline: none;
  cursor: pointer;
  transition: all 0.15s ease;

  &:focus {
    border-color: #2563eb;
    box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.3);
  }
`;
