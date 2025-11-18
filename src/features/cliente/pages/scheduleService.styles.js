import styled from "styled-components";

export const Container = styled.div`
  background: #fff;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 5px 20px rgba(0,0,0,0.06);
  font-family: "Poppins", sans-serif;
  max-width: 650px;
`;

export const Title = styled.h1`
  font-size: 1.7rem;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 1.5rem;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.4rem;
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
`;

export const Label = styled.label`
  font-weight: 500;
  color: #374151;
`;

export const Select = styled.select`
  padding: 0.8rem;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.2s;

  &:focus {
    border-color: #4f46e5;
    outline: none;
    box-shadow: 0 0 0 2px rgba(79,70,229,0.2);
  }
`;

export const Input = styled.input`
  padding: 0.8rem;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.2s;

  &:focus {
    border-color: #4f46e5;
    outline: none;
    box-shadow: 0 0 0 2px rgba(79,70,229,0.2);
  }
`;

export const TextArea = styled.textarea`
  padding: 0.8rem;
  height: 90px;
  resize: none;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 1rem;

  &:focus {
    border-color: #4f46e5;
    outline: none;
  }
`;

export const Button = styled.button`
  padding: 0.9rem 1.2rem;
  background: #4f46e5;
  color: #fff;
  font-weight: 600;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background .2s;

  &:hover {
    background: #4338ca;
  }

  &:disabled {
    background: #93a3f0;
    cursor: not-allowed;
  }
`;

export const Message = styled.p`
  margin-top: 1rem;
  font-weight: 500;
  color: #1f2937;
`;
