import styled, { keyframes } from "styled-components";

export const Container = styled.div``;

export const Title = styled.h1`
  font-size: 1.8rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  color: #222;
`;

export const Card = styled.div`
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
  padding: 1.5rem;
  margin-bottom: 1.5rem;
`;

export const Subtitle = styled.h3`
  margin-bottom: 1rem;
  font-weight: 500;
  color: #333;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const FormRow = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
`;

export const Input = styled.input`
  flex: 1;
  padding: 0.75rem 1rem;
  border-radius: 8px;
  border: 1px solid #ddd;
  font-size: 0.95rem;
  &:focus {
    border-color: #0077ff;
    outline: none;
  }
`;

export const Button = styled.button`
  background: ${({ secondary }) => (secondary ? "#f2f2f2" : "#ea580c")};
  color: ${({ secondary }) => (secondary ? "#333" : "#fff")};
  border: none;
  border-radius: 8px;
  padding: 0.75rem 1.2rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  &:hover {
    background: ${({ secondary }) => (secondary ? "#e0e0e0" : "#ea580c")};
  }
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export const ErrorMsg = styled.p`
  color: #d9534f;
  margin-bottom: 1rem;
`;

export const TableContainer = styled.div`
  overflow-x: auto;
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  th,
  td {
    padding: 0.75rem;
    border-bottom: 1px solid #eee;
  }
  th {
    text-align: left;
    color: #666;
    font-weight: 500;
  }
  td.actions {
    display: flex;
    gap: 0.5rem;
  }
`;

export const IconButton = styled.button`
  background: none;
  border: none;
  color: ${({ delete: isDelete }) => (isDelete ? "#d9534f" : "#0077ff")};
  cursor: pointer;
  transition: color 0.2s;
  &:hover {
    color: ${({ delete: isDelete }) => (isDelete ? "#b52b27" : "#005fcc")};
  }
`;

export const fadeIn = keyframes`
  from { opacity: 0; transform: scale(0.95) translateY(-10px); }
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
  max-width: 480px;
  box-shadow: 0 6px 24px rgba(0, 0, 0, 0.15);
  animation: ${fadeIn} 0.25s ease;
`;

export const ModalTitle = styled.h2`
  margin-bottom: 1rem;
  font-weight: 600;
  color: #222;
`;

export const ModalActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 1.5rem;
`;
