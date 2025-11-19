import React, { useState, useEffect } from "react";
import styled from "styled-components";
import api from "../../../services/api";
import TransactionsTable from "../../../components/Financial/TransactionsTable";
import TransactionModal from "../../../components/Financial/TransactionModal";

export default function FinanceiroPage() {
  const [data, setData] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  const adminId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const [financeRes, transRes] = await Promise.all([
          api.get("/api/dashboard/finance", {
            headers: { adminId, Authorization: `Bearer ${token}` },
          }),
          api.get("/api/admin/transactions", {
            headers: { adminId, Authorization: `Bearer ${token}` },
          }),
        ]);

        setData(financeRes.data);
        setTransactions(transRes.data);
      } catch (err) {
        setError("Erro ao carregar dados financeiros.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [adminId, token]);

  const handleSaveTransaction = async (transaction) => {
    try {
      const headers = {
        adminId,
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };

      if (transaction.id) {
        const response = await api.patch(
          `/api/admin/transactions/${transaction.id}/status`,
          { status: transaction.status },
          { headers }
        );

        setTransactions((prev) =>
          prev.map((t) => (t.id === transaction.id ? response.data : t))
        );

        const dashboardRes = await api.get("/api/dashboard/finance", {
          headers,
        });
        setData(dashboardRes.data);

        setModalOpen(false);
        return;
      }

      const newTransactionPayload = {
        appointment_id: transaction.appointment_id || null,
        description: transaction.description || "",
        amount_cents: Number(transaction.amount_cents) || 0,
        transaction_date: transaction.transaction_date,
        status: transaction.status || "PENDING",
      };

      const response = await api.post(
        "/api/admin/transactions",
        newTransactionPayload,
        { headers }
      );

      setTransactions((prev) => [...prev, response.data]);

      const dashboardRes = await api.get("/api/dashboard/finance", { headers });
      setData(dashboardRes.data);

      setModalOpen(false);
    } catch (err) {
      console.error("Erro ao salvar transação:", err);
      alert("Não foi possível salvar a transação.");
    }
  };

  if (loading) return <p>Carregando dados financeiros...</p>;
  if (error) return <p>{error}</p>;
  if (!data) return <p>Nenhum dado encontrado.</p>;

  return (
    <Container>
      <Title>Financeiro</Title>

      <WidgetGrid>
        <WidgetCard>
          <WidgetTitle>Receita do Mês</WidgetTitle>
          <WidgetValue>
            R$ {(data.monthlyRevenue / 100).toFixed(2).replace(".", ",")}
          </WidgetValue>
          <WidgetSub>
            {data.revenueGrowthPercent !== 0 &&
              `${data.revenueGrowthPercent}% em relação ao mês anterior`}
          </WidgetSub>
        </WidgetCard>

        <WidgetCard>
          <WidgetTitle>Despesas do Mês</WidgetTitle>
          <WidgetValue>
            R${" "}
            {(Math.abs(data.monthlyExpenses) / 100)
              .toFixed(2)
              .replace(".", ",")}
          </WidgetValue>
          <WidgetSub>Materiais e despesas operacionais</WidgetSub>
        </WidgetCard>

        <WidgetCard>
          <WidgetTitle>Lucro do Mês</WidgetTitle>
          <WidgetValue>
            R$ {(data.monthlyProfit / 100).toFixed(2).replace(".", ",")}
          </WidgetValue>
          <WidgetSub>
            {data.profitGrowthPercent !== 0 &&
              `${data.profitGrowthPercent}% em relação ao mês anterior`}
          </WidgetSub>
        </WidgetCard>

        <WidgetCard>
          <WidgetTitle>Média por Agendamento</WidgetTitle>
          <WidgetValue>
            R${" "}
            {(data.averageRevenuePerAppointment / 100)
              .toFixed(2)
              .replace(".", ",")}
          </WidgetValue>
          <WidgetSub>
            Baseado em {data.totalAppointments} agendamentos pagos
          </WidgetSub>
        </WidgetCard>
      </WidgetGrid>

      <AddButton
        onClick={() => {
          setSelectedTransaction(null);
          setModalOpen(true);
        }}
      >
        + Nova Transação
      </AddButton>

      <TransactionsTable
        transactions={transactions}
        onEdit={(t) => {
          setSelectedTransaction(t);
          setModalOpen(true);
        }}
      />

      <TransactionModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSaveTransaction}
        initialData={selectedTransaction}
      />
    </Container>
  );
}

/* ------- ESTILOS ------- */

const Container = styled.div`
  padding: 1.5rem;
`;

const Title = styled.h1`
  font-size: 1.75rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
`;

const WidgetGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.25rem;
`;

const WidgetCard = styled.div`
  background: #fff;
  border-radius: 12px;
  padding: 1rem 1.25rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
`;

const WidgetTitle = styled.p`
  color: #555;
  font-size: 0.9rem;
`;

const WidgetValue = styled.h2`
  font-size: 1.6rem;
  font-weight: bold;
  margin: 0.25rem 0;
  color: #222;
`;

const WidgetSub = styled.p`
  color: #777;
  font-size: 0.85rem;
`;

const AddButton = styled.button`
  background: #ea580c;
  color: #fff;
  padding: 0.6rem 1.2rem;
  border: none;
  border-radius: 8px;
  margin-top: 1.5rem;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    background: #ea8148ff;
  }
`;
