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
  // ADIÇÃO 1: Pegamos o token de autenticação, igual é feito no AppointmentModal.
  const token = localStorage.getItem("token");

  const calcularCrescimento = (atual, anterior) => {
    if (anterior === 0 || anterior === undefined) return "N/A";
    const percentual = ((atual - anterior) / anterior) * 100;
    return `${percentual > 0 ? "+" : ""}${percentual.toFixed(0)}%`;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // MUDANÇA 2: Adicionamos o token nas chamadas GET também por segurança.
        const [financeRes, transRes] = await Promise.all([
          api.get("/api/dashboard/finance", { headers: { adminId, Authorization: `Bearer ${token}` } }),
          api.get("/api/admin/transactions", { headers: { adminId, Authorization: `Bearer ${token}` } }),
        ]);

        const initialTransactions = transRes.data;
        setData(financeRes.data);

        const clientNamePromises = initialTransactions.map(transaction => {
          if (transaction.appointment_id) {
            return api.get(`/api/appointments/${transaction.appointment_id}`, { headers: { Authorization: `Bearer ${token}` } })
              .then(response => response.data.clientName)
              .catch(error => {
                console.error(`Falha ao buscar agendamento ${transaction.appointment_id}:`, error);
                return "Cliente não encontrado";
              });
          }
          return Promise.resolve("Transação Manual");
        });

        const clientNames = await Promise.all(clientNamePromises);

        const enrichedTransactions = initialTransactions.map((transaction, index) => ({
          ...transaction,
          clientName: clientNames[index],
        }));

        setTransactions(enrichedTransactions);

      } catch (err) {
        console.error("❌ Erro ao buscar dados financeiros:", err);
        setError("Erro ao carregar dados financeiros.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [adminId, token]);

  // MUDANÇA 3: Lógica de salvar e editar unificada e corrigida.
  const handleSaveTransaction = async (transaction) => {
    try {
      const headers = {
        adminId: adminId,
        Authorization: `Bearer ${token}`, // Enviamos o token aqui!
      };

      if (transaction.id) {
        // Lógica para editar o status
        await api.patch(
          `/api/admin/transactions/${transaction.id}/status`,
          { status: transaction.status },
          { headers }
        );
      } else {
        // Lógica para criar uma nova transação manual
        await api.post("/api/admin/transactions", transaction, { headers });
      }

      window.location.reload();
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
            {calcularCrescimento(data.revenueGrowthPercent, 100)} em relação ao mês anterior
          </WidgetSub>
        </WidgetCard>

        <WidgetCard>
          <WidgetTitle>Despesas do Mês</WidgetTitle>
          <WidgetValue>
            R$ {(Math.abs(data.monthlyExpenses) / 100).toFixed(2).replace(".", ",")}
          </WidgetValue>
          <WidgetSub>Materiais e despesas operacionais</WidgetSub>
        </WidgetCard>

        <WidgetCard>
          <WidgetTitle>Lucro do Mês</WidgetTitle>
          <WidgetValue>
            R$ {(data.monthlyProfit / 100).toFixed(2).replace(".", ",")}
          </WidgetValue>
          <WidgetSub>
            {calcularCrescimento(data.profitGrowthPercent, 100)} em relação ao mês anterior
          </WidgetSub>
        </WidgetCard>

        <WidgetCard>
          <WidgetTitle>Média por Agendamento</WidgetTitle>
          <WidgetValue>
            R$ {(data.averageRevenuePerAppointment / 100).toFixed(2).replace(".", ",")}
          </WidgetValue>
          <WidgetSub>Baseado em {data.totalAppointments} agendamentos</WidgetSub>
        </WidgetCard>
      </WidgetGrid>

      <AddButton onClick={() => { setSelectedTransaction(null); setModalOpen(true); }}>
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

/* Styled Components (seu código de estilos permanece o mesmo) */
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
  background: #1e90ff;
  color: #fff;
  padding: 0.6rem 1.2rem;
  border: none;
  border-radius: 8px;
  margin-top: 1.5rem;
  cursor: pointer;
  transition: 0.3s;
  &:hover {
    background: #187bcd;
  }
`;