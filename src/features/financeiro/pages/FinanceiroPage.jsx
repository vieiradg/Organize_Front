import React, { useState, useEffect } from "react";
import api from "../../../services/api";

export default function FinanceiroPage() {
  const [monthRevenue, setMonthRevenue] = useState(0);
  const [monthExpenses, setMonthExpenses] = useState(0);
  const [monthProfit, setMonthProfit] = useState(0);
  const [avarageRevenuePerAppointment, setAvarageRevenuePerAppointment] =
    useState(0);
  const [revenueGrowthPercent, setRevenueGrowthPercent] = useState(0);
  const [profitGrowthPercent, setProfitGrowthPercent] = useState(0);
  const [totalAppointments, setTotalAppointments] = useState(0);
  const [transactions, setTransactions] = useState([]);

  const storedUserId = localStorage.getItem("userId");

  useEffect(() => {
    try {
      const response = api.get("/api/dashboard/finance", {
        headers: {
          adminId: storedUserId,
        },
      });

      response.then((res) => {
        setMonthRevenue(res.data.monthlyRevenue);
        setMonthExpenses(res.data.monthlyExpenses);
        setMonthProfit(res.data.monthlyProfit);
        setAvarageRevenuePerAppointment(res.data.averageRevenuePerAppointment);
        setRevenueGrowthPercent(res.data.revenueGrowthPercent);
        setProfitGrowthPercent(res.data.profitGrowthPercent);
        setTotalAppointments(res.data.totalAppointments);
      });
    } catch (err) {
      console.log(err);
    }
  });

  useEffect(() => {
    try {
      const response = api.get("/api/admin/transactions", {
        headers: {
          adminId: storedUserId,
        },
      });

      response.then((res) => {
        setTransactions(res.data);
      });
    } catch (err) {
      console.log(err);
    }
  }, [storedUserId]);

  const formatCurrency = (value) => {
    return (value / 100).toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  };

  return (
    <div>
      <h1 className="titulo-secao-dashboard">Financeiro</h1>

      <div className="grid-widgets">
        <div className="widget-card">
          <p className="widget-titulo">Receita do Mês</p>
          <h2 className="widget-valor">{formatCurrency(monthRevenue)}</h2>
          <p className="widget-subtexto">
            {formatCurrency(revenueGrowthPercent)} em relação ao mês anterior
          </p>
        </div>
        <div className="widget-card">
          <p className="widget-titulo">Despesas do Mês</p>
          <h2 className="widget-valor">{formatCurrency(monthExpenses)}</h2>
          <p className="widget-subtexto">Materiais e despesas operacionais</p>
        </div>
        <div className="widget-card">
          <p className="widget-titulo">Lucro do Mês</p>
          <h2 className="widget-valor">{formatCurrency(monthProfit)}</h2>
          <p className="widget-subtexto">
            {formatCurrency(profitGrowthPercent)} em relação ao mês anterior
          </p>
        </div>
        <div className="widget-card">
          <p className="widget-titulo">Média por Agendamento</p>
          <h2 className="widget-valor">
            {formatCurrency(avarageRevenuePerAppointment)}
          </h2>
          {totalAppointments <= 0 ? (
            <p className="widget-subtexto">Nenhum agendamento realizado</p>
          ) : (
            <p className="widget-subtexto">
              Baseado em {totalAppointments} agendamentos
            </p>
          )}
        </div>
      </div>

      <div className="widget-card" style={{ marginTop: "1.5rem" }}>
        <h3 className="widget-titulo">Transações Recentes</h3>
        <div className="table-container">
          <table className="dashboard-table">
            <thead>
              <tr>
                <th>Descrição</th>
                <th>Valor</th>
                <th>Data</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((t) => (
                <tr key={t.id}>
                  <td>{t.description}</td>
                  <td
                    style={{
                      color:
                        formatCurrency(t.amount_cents) < 0
                          ? "#ef4444"
                          : "#16a34a",
                    }}
                  >
                    {formatCurrency(t.amount_cents)}
                  </td>
                  <td>{t.transaction_date}</td>
                  <td
                    style={{
                      color:
                        {
                          PENDING: "#f97316",
                          PAID: "#16a34a",
                          CANCELED: "#dc2626",
                        }[t.status] || "#6b7280",
                    }}
                  >
                    {(() => {
                      const status = {
                        PAID: "Pago",
                        PENDING: "Pendente",
                        CANCELED: "Cancelado",
                      };
                      return status[t.status] || "Desconhecido";
                    })()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
