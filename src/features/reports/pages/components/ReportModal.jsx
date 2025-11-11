import React from "react";
import ReactMarkdown from "react-markdown";
import styled from "styled-components";

export default function ReportModal({
  selectedReport,
  markdown,
  loading,
  onClose,
}) {
  return (
    <Overlay onClick={onClose}>
      <Content onClick={(e) => e.stopPropagation()}>
        <Header>
          <h2>
            Relatório de{" "}
            {new Date(selectedReport.reportMonth).toLocaleDateString("pt-BR", {
              month: "long",
              year: "numeric",
            })}
          </h2>
          <CloseButton onClick={onClose}>×</CloseButton>
        </Header>
        {loading ? (
          <Loading>Carregando relatório...</Loading>
        ) : (
          <MarkdownWrapper>
            <ReactMarkdown>{markdown}</ReactMarkdown>
          </MarkdownWrapper>
        )}
      </Content>
    </Overlay>
  );
}

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 50;
`;

const Content = styled.div`
  background: #fff;
  border-radius: 10px;
  width: 90%;
  max-width: 800px;
  max-height: 80vh;
  overflow-y: auto;
  padding: 1.5rem;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #eee;
  padding-bottom: 0.5rem;
  margin-bottom: 1rem;
`;

const CloseButton = styled.button`
  font-size: 1.5rem;
  background: none;
  border: none;
  cursor: pointer;
  color: #888;
  &:hover {
    color: #000;
  }
`;

const MarkdownWrapper = styled.div`
  color: #333;
  line-height: 1.6;
  h1,
  h2,
  h3 {
    margin-top: 1.25rem;
    margin-bottom: 0.75rem;
  }
`;

const Loading = styled.p`
  text-align: center;
  padding: 2rem;
  color: #666;
`;
