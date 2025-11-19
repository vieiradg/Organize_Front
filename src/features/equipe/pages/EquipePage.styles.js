import styled, { keyframes } from "styled-components";

export const Container = styled.div`
  padding: 1rem;
`;

export const Title = styled.h1`
  font-size: 1.6rem;
  font-weight: 600;
  margin-bottom: 1.2rem;
  color: #1e293b;
`;

export const Card = styled.div`
  background: #ffffff;
  border-radius: 14px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  box-shadow: 0 4px 12px rgba(0,0,0,0.06);

  @media (max-width: 600px) {
    padding: 1rem;
  }
`;

export const Subtitle = styled.h3`
  margin-bottom: 0.8rem;
  font-size: 1.1rem;
  font-weight: 500;
  color: #334155;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const FormRow = styled.div`
  display: flex;
  gap: 1rem;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 0.75rem;
  }
`;

export const Input = styled.input`
  flex: 1;
  padding: 0.7rem 0.9rem;
  border-radius: 8px;
  border: 1px solid #d0d7df;
  color: #1e293b;
  font-size: 0.95rem;

  &:focus {
    border-color: #ea580c;
    box-shadow: 0 0 0 1px #ea580c28;
    outline: none;
  }
`;

export const Button = styled.button`
  width: fit-content;
  align-self: flex-end;
  background: ${({ secondary }) => (secondary ? "#f1f5f9" : "#ea580c")};
  color: ${({ secondary }) => (secondary ? "#475569" : "#fff")};
  border: none;
  padding: 0.65rem 1.4rem;
  border-radius: 8px;
  font-size: 0.95rem;
  font-weight: 500;
  cursor: pointer;
  transition: 0.2s;

  &:hover {
    background: ${({ secondary }) => (secondary ? "#e2e8f0" : "#d94e08")};
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export const ErrorMsg = styled.p`
  color: #dc2626;
  margin-bottom: 1rem;
`;

export const TableContainer = styled.div`
  overflow-x: auto;
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 0.93rem;

  th {
    text-align: left;
    padding: 0.75rem;
    background: #f8fafc;
    color: #475569;
    font-weight: 600;
    border-bottom: 1px solid #e2e8f0;
  }

  td {
    padding: 0.75rem;
    color: #334155;
    border-bottom: 1px solid #f1f5f9;
  }

  tr:hover td {
    background: #f8fafc;
  }

  td.actions {
    display: flex;
    gap: 0.5rem;
  }
`;

export const IconButton = styled.button`
  background: none;
  border: none;
  padding: 4px;
  cursor: pointer;
  border-radius: 6px;
  color: ${({ delete: isDelete }) => (isDelete ? "#dc2626" : "#0c63e7")};
  transition: 0.2s;

  &:hover {
    background: #f1f5f9;
  }

  svg {
    width: 18px;
    height: 18px;
  }
`;

export const fadeIn = keyframes`
  from { opacity: 0; transform: scale(0.96) translateY(-4px); }
  to { opacity: 1; transform: scale(1) translateY(0); }
`;

export const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.35);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
`;

export const ModalContent = styled.div`
  background: #fff;
  border-radius: 12px;
  padding: 2rem;
  width: 90%;
  max-width: 460px;
  animation: ${fadeIn} 0.25s ease;

  @media (max-width: 600px) {
    padding: 1.4rem;
  }
`;

export const ModalTitle = styled.h2`
  margin-bottom: 1rem;
  font-weight: 600;
  color: #1e293b;
`;

export const ModalActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 1.5rem;
`;
