import React from "react";
import styled from "styled-components";
import { IconDownload } from "./Icons";

export default function EmptyState() {
  return (
    <Wrapper>
      <Illustration>
        <IconDownload />
      </Illustration>
      <h2>Nenhum relatório encontrado 📭</h2>
      <p>
        Gere um novo relatório mensal para visualizar seus dados financeiros
        aqui.
      </p>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  text-align: center;
  color: #444;
  padding: 4rem 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;

  h2 {
    font-weight: 600;
    font-size: 1.4rem;
  }

  p {
    max-width: 380px;
    font-size: 0.95rem;
    color: #666;
  }
`;

const Illustration = styled.div`
  background: #f3f4f6;
  border-radius: 50%;
  width: 90px;
  height: 90px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #6b7280;
  svg {
    width: 40px;
    height: 40px;
  }
`;
