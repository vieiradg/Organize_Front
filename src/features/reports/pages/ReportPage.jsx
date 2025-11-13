import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import ReportsSection from "./components/ReportSection";
import api from "../../../services/api";

const loadingMessages = [
  "Acordando o Otto",
  "Otto está fazendo seu relatório...",
  "Analisando seus dados financeiros...",
  "Consultando Otto para insights inteligentes...",
  "Organizando gráficos e tendências...",
  "Finalizando seu relatório...",
];

export default function ReportPage() {
  const [loading, setLoading] = useState(false);
  const [messageIndex, setMessageIndex] = useState(0);
  const [fade, setFade] = useState(true);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    if (loading) {
      let index = 0;
      const interval = setInterval(() => {
        setFade(false);
        setTimeout(() => {
          index = (index + 1) % loadingMessages.length;
          setMessageIndex(index);
          setFade(true);
        }, 400);
      }, 2500);
      return () => clearInterval(interval);
    }
  }, [loading]);

  const TrendingUpIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20.2 7.8l-7.7 7.7-4-4-5.7 5.7" />
      <path d="M15 7h6v6" />
    </svg>
  );

  const handleGenerateReport = async () => {
    setLoading(true);
    try {
      const adminId = localStorage.getItem("userId");

      await api.post("/api/reports/monthly", null, {
        params: { adminId },
      });

      setRefreshKey((prev) => prev + 1);
    } catch (error) {
      console.error("Erro ao gerar relatório:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <HeadContainer>
        <div>
          <Title>Meus Relatórios</Title>
          <P>Visualize e gere seus relatórios mensais com IA</P>
        </div>

        <AddButton onClick={handleGenerateReport} disabled={loading}>
          {loading ? (
            <>
              <SmallSpinner />
              <span>Gerando...</span>
            </>
          ) : (
            <>
              <TrendingUpIcon /> <span>Gerar Relatório</span>
            </>
          )}
        </AddButton>
      </HeadContainer>

      <ReportsWrapper key={refreshKey}>
        <ReportsSection />
      </ReportsWrapper>

      {loading && (
        <ModalOverlay>
          <ModalContent>
            <BigSpinner />
            <AnimatedText $fade={fade}>
              {loadingMessages[messageIndex]}
            </AnimatedText>
          </ModalContent>
        </ModalOverlay>
      )}
    </Container>
  );
}

const spin = keyframes`
  to {
    transform: rotate(360deg);
  }
`;
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(5px); }
  to { opacity: 1; transform: translateY(0); }
`;
const fadeOut = keyframes`
  from { opacity: 1; transform: translateY(0); }
  to { opacity: 0; transform: translateY(-5px); }
`;

const Container = styled.div`
  padding: 1.5rem;
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

const HeadContainer = styled.div`
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
`;

const Title = styled.h1`
  font-size: 1.75rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
`;

const P = styled.p`
  font-size: 0.95rem;
  font-weight: 400;
  margin-bottom: 1rem;
`;

const AddButton = styled.button`
  background: #ea580c;
  display: flex;
  gap: 0.5rem;
  color: #fff;
  padding: 0.6rem 1.2rem;
  justify-content: center;
  align-items: center;
  border: none;
  border-radius: 8px;
  margin-top: 1.5rem;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    background: #ea8148ff;
  }

  &:disabled {
    background: #bdbdbd;
    cursor: not-allowed;
  }
`;

const ReportsWrapper = styled.div`
  flex: 1;
  overflow-y: auto;
  padding-right: 0.5rem;
  scrollbar-width: thin;
  scrollbar-color: #c5c5c5 transparent;

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #c5c5c5;
    border-radius: 4px;
  }
`;

const SmallSpinner = styled.div`
  width: 18px;
  height: 18px;
  border: 3px solid rgba(255, 255, 255, 0.4);
  border-top-color: white;
  border-radius: 50%;
  animation: ${spin} 0.8s linear infinite;
`;

const BigSpinner = styled.div`
  width: 45px;
  height: 45px;
  border: 4px solid rgba(234, 88, 12, 0.3);
  border-top-color: #ea580c;
  border-radius: 50%;
  animation: ${spin} 0.9s linear infinite;
  margin-bottom: 1.5rem;
`;

const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.35);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
`;

const ModalContent = styled.div`
  background: white;
  padding: 2.5rem 3rem;
  border-radius: 12px;
  text-align: center;
  color: #333;
  font-weight: 500;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  min-width: 50%;
  min-height: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const AnimatedText = styled.p`
  font-size: 1rem;
  color: #333;
  font-weight: 500;
  animation: ${({ $fade }) => ($fade ? fadeIn : fadeOut)} 0.5s ease forwards;
`;
