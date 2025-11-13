import styled, { keyframes } from "styled-components";

export const Container = styled.div``;

export const Title = styled.h1`
  font-size: 1.8rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  color: #222;
`;

export const Subtitle = styled.h3`
  margin-bottom: 1rem;
  font-weight: 500;
  color: #333;
`;

export const Card = styled.div`
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
  padding: 1.5rem;
  margin-bottom: 1.5rem;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
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
    background: ${({ secondary }) => (secondary ? "#e0e0e0" : "#c2410c")};
  }
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export const ErrorMsg = styled.p`
  color: #d9534f;
`;

export const SuccessMsg = styled.p`
  color: #16a34a;
`;

export const fadeIn = keyframes`
  from { opacity: 0; transform: scale(0.96); }
  to { opacity: 1; transform: scale(1); }
`;

export const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.35);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
`;

export const ModalContainer = styled.div`
  background: #fff;
  border-radius: 12px;
  padding: 2rem;
  width: 90%;
  max-width: 420px;
  box-shadow: 0 6px 24px rgba(0, 0, 0, 0.15);
  animation: ${fadeIn} 0.25s ease;
  text-align: center;
`;

export const ModalTitle = styled.h2`
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: #222;
`;

export const ModalMessage = styled.p`
  color: #555;
  margin-bottom: 1.5rem;
  line-height: 1.4;
`;

export const ModalActions = styled.div`
  display: flex;
  justify-content: center;
  gap: 12px;
`;

export const ModalButton = styled.button`
  padding: 10px 18px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 500;
  font-size: 0.95rem;
  transition: background 0.2s ease;

  ${({ $variant }) =>
    $variant === "confirm"
      ? `
    background: #2563eb;
    color: #fff;
    &:hover { background: #1d4ed8; }
  `
      : `
    background: #e5e7eb;
    color: #111;
    &:hover { background: #d1d5db; }
  `}
`;

export const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.25rem;
  margin-top: 1rem;

  @media (min-width: 600px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

export const InfoItem = styled.div`
  background: #f9fafb;
  border-radius: 10px;
  padding: 1rem 1.25rem;
  border: 1px solid #eee;
  transition: all 0.2s ease;

  &:hover {
    background: #f3f4f6;
    border-color: #ddd;
  }
`;

export const InfoLabel = styled.span`
  display: block;
  font-size: 0.85rem;
  font-weight: 600;
  color: #6b7280;
  margin-bottom: 0.3rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

export const InfoValue = styled.p`
  font-size: 1rem;
  color: #111827;
  font-weight: 500;
  word-break: break-word;
`;
