import React from "react";
import styled from "styled-components";

export default function TransactionsTable({ transactions = [], onEdit }) {
  if (!transactions.length) return <Empty>Nenhuma transação encontrada.</Empty>;

  const formatDatePlusOne = (dateString) => {
    const date = new Date(dateString);
    date.setDate(date.getDate() + 1);
    return date.toLocaleDateString("pt-BR");
  };

  return (
    <TableCard>
      <h3>Transações Recentes</h3>
      <Table>
        <thead>
          <tr>
            <th>Cliente</th>
            <th>Descrição</th>
            <th>Valor</th>
            <th>Data</th>
            <th>Status</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((t) => (
            <tr key={t.id}>
              <td>{t.clientName || "N/A"}</td>

              <td>{t.description}</td>
              <td style={{ color: t.amount_cents < 0 ? "#ef4444" : "#16a34a" }}>
                R$ {(t.amount_cents / 100).toFixed(2).replace(".", ",")}
              </td>
              <td>{formatDatePlusOne(t.transaction_date)}</td>
              <td
                style={{ color: t.status === "PAID" ? "#16a34a" : "#f97316" }}
              >
                {t.status === "PAID" ? "Pago" : "Pendente"}
              </td>
              <td>
                <EditButton onClick={() => onEdit(t)}>Editar</EditButton>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </TableCard>
  );
}

const TableCard = styled.div`
  background: #fff;
  border-radius: 12px;
  padding: 1rem 1.25rem;
  margin-top: 1.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 0.75rem;

  th,
  td {
    text-align: left;
    padding: 0.5rem 0.75rem;
  }

  th {
    color: #555;
    font-size: 0.9rem;
    border-bottom: 2px solid #eee;
  }

  td {
    border-bottom: 1px solid #f3f3f3;
    color: #333;
    font-size: 0.9rem;
  }
`;

const EditButton = styled.button`
  background: transparent;
  border: 1px solid #1e90ff;
  color: #1e90ff;
  padding: 0.25rem 0.6rem;
  border-radius: 6px;
  font-size: 0.8rem;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    background: #1e90ff;
    color: #fff;
  }
`;

const Empty = styled.p`
  margin-top: 1.5rem;
  color: #666;
  text-align: center;
`;
