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

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
`;

export const Title = styled.h2`
  display: flex;
  align-items: center;
  gap: 8px;
  color: #111827;
  font-size: 1.2rem;
  font-weight: 600;
`;

export const CloseButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  color: #6b7280;
  transition: color 0.2s ease;

  &:hover {
    color: #111827;
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

export const Label = styled.label`
  font-size: 0.9rem;
  color: #374151;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 6px;
`;

export const Input = styled.input`
  padding: 10px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 0.9rem;
  color: #111827;
  background-color: #fff;

  &:focus {
    outline: none;
    border-color: #2563eb;
    box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.15);
  }
`;

export const Select = styled.select`
  padding: 10px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 0.9rem;
  background-color: #fff;
  color: #111827;

  &:focus {
    outline: none;
    border-color: #2563eb;
    box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.15);
  }
`;

export const TextArea = styled.textarea`
  padding: 10px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 0.9rem;
  resize: none;
  min-height: 80px;
  color: #111827;
  background-color: #fff;

  &:focus {
    outline: none;
    border-color: #2563eb;
    box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.15);
  }
`;

export const ButtonPrimary = styled.button`
  background: #2563eb;
  color: #fff;
  border: none;
  padding: 10px 14px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  margin-top: 8px;
  transition: background 0.2s ease;

  &:hover:not(:disabled) {
    background: #1d4ed8;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export const ErrorMessage = styled.p`
  background: #fee2e2;
  color: #b91c1c;
  padding: 8px 10px;
  border-radius: 6px;
  font-size: 0.85rem;
  text-align: left;
`;
