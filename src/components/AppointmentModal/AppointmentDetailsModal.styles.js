import styled from "styled-components";

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
`;

export const Modal = styled.div`
  background: #fff;
  border-radius: 14px;
  padding: 26px 30px;
  max-width: 460px;
  width: 92%;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.25);
  animation: fadeIn 0.25s ease-in-out;
  font-family: "Inter", sans-serif;

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(-8px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

export const Title = styled.h3`
  display: flex;
  align-items: center;
  gap: 0.6rem;
  font-size: 1.2rem;
  color: #111827;
  margin-bottom: 1rem;
`;

export const InfoRow = styled.p`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin: 6px 0;
  color: #374151;
  font-size: 0.95rem;

  b {
    font-weight: 600;
    color: #1f2937;
  }
`;

export const IconWrapper = styled.span`
  color: #4b5563;
  min-width: 18px;
  display: flex;
  justify-content: center;
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

export const StatusTag = styled.span`
  display: inline-block;
  padding: 4px 10px;
  font-size: 0.78rem;
  font-weight: 600;
  border-radius: 9999px;
  text-transform: capitalize;
  color: ${({ $status }) =>
    $status === "rescheduled" ? "#111827" : "#fff"};
  background-color: ${({ $status }) =>
    statusColors[$status] || "#9ca3af"};
`;

export const Actions = styled.div`
  display: flex;
  justify-content: flex-end;
  flex-wrap: wrap;
  margin-top: 24px;
  gap: 10px;
`;

export const ButtonPrimary = styled.button`
  background: #2563eb;
  color: #fff;
  border: none;
  padding: 8px 16px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 6px;
  transition: background 0.2s ease;

  &:hover:not(:disabled) {
    background: #1d4ed8;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export const ButtonSecondary = styled(ButtonPrimary)`
  background: #f3f4f6;
  color: #374151;

  &:hover:not(:disabled) {
    background: #e5e7eb;
  }
`;

export const ButtonDanger = styled(ButtonPrimary)`
  background: #dc2626;
  color: #fff;

  &:hover:not(:disabled) {
    background: #b91c1c;
  }
`;
