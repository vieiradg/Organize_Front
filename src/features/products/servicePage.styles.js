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
    opacity: 0.7;
  }
`;

export const DangerButton = styled(ActionButton)`
  svg {
    stroke: #e53e3e;
  }
`;

export const PrimaryButton = styled.button`
  background: #ea580c;
  color: #fff;
  border: none;
  padding: 0.6rem 1.2rem;
  border-radius: 6px;
  cursor: pointer;

  &:hover {
    background: #e96118ff;
  }
`;

export const SecondaryButton = styled.button`
  background: #e2e8f0;
  border: none;
  padding: 0.6rem 1.2rem;
  border-radius: 6px;
  cursor: pointer;

  &:hover {
    background: #cbd5e0;
  }
`;

export const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 50;
`;

export const ModalContent = styled.div`
  background: #fff;
  padding: 2rem;
  width: 420px;
  border-radius: 10px;

  h2 {
    margin-bottom: 1rem;
  }

  form {
    display: flex;
    flex-direction: column;

    label {
      margin-top: 1rem;
      font-weight: 500;
    }

    input {
      margin-top: 0.3rem;
      padding: 0.6rem;
      border-radius: 6px;
      border: 1px solid #cbd5e0;
    }
  }
`;

export const ModalActions = styled.div`
  margin-top: 1.5rem;
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
`;
