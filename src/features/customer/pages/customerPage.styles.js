import styled from "styled-components";

export const PageContainer = styled.div``;

export const PageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  h1 {
    font-size: 1.75rem;
    color: #333;
  }
`;

export const StyledCard = styled.div`
  background: #fff;
  border-radius: 10px;
  padding: 1.5rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
`;

export const WidgetTitulo = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: #4a5568;
  margin-bottom: 1rem;
  border-bottom: 2px solid #edf2f7;
  padding-bottom: 0.5rem;
`;

export const DashboardTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  th,
  td {
    padding: 10px;
    border-bottom: 1px solid #e2e8f0;
  }
  th {
    text-align: left;
  }
  thead tr {
    background-color: #f7fafc;
  }
  tbody tr:hover {
    background-color: #f0f4f8;
  }
`;

export const ErrorMessage = styled.p`
  color: #e53e3e;
  margin-bottom: 1rem;
`;

export const ActionButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.4rem;
  &:hover {
    color: #ea580c;
  }
  &.delete:hover {
    color: #e53e3e;
  }
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
  padding: 2rem;
  border-radius: 12px;
  width: 400px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
  h2,
  h3 {
    margin-bottom: 1rem;
    color: #333;
  }
  form {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }
  input,
  textarea {
    width: 100%;
    padding: 0.6rem;
    border: 1px solid #ccc;
    border-radius: 6px;
  }
`;

export const ModalActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 1rem;
`;

export const PrimaryButton = styled.button`
  background: #ea580c;
  color: #fff;
  border: none;
  padding: 0.6rem 1.2rem;
  border-radius: 6px;
  cursor: pointer;
  &:hover {
    background: #ea580c;
  }
`;

export const SecondaryButton = styled.button`
  background: #edf2f7;
  border: none;
  padding: 0.6rem 1.2rem;
  border-radius: 6px;
  cursor: pointer;
  &:hover {
    background: #e2e8f0;
  }
`;

export const DangerButton = styled(PrimaryButton)`
  background: #e53e3e;
  &:hover {
    background: #c53030;
  }
`;
