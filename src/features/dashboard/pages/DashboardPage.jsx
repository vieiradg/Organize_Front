import React, { useState, useEffect } from "react";
import dashboardService from "../dashboardService";

const EstrelaIcone = ({ preenchida }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill={preenchida ? "currentColor" : "none"}
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="icone"
  >
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
  </svg>
);

export default function DashboardPage() {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await dashboardService.getDashboardData();
        setDashboardData(data);
      } catch (error) {
        console.error("Não foi possível carregar os dados do Dashboard", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (!dashboardData) {
    return <div>Falha ao carregar os dados do dashboard.</div>;
  }

  return (
    <div className="dashboard-content">
      <h1 className="titulo-secao-dashboard">Dashboard</h1>
      <div className="grid-widgets">
        <div className="widget-card">
          <p className="widget-titulo">Faturamento do Mês</p>
          <h2 className="widget-valor">
            R$ {(dashboardData.monthlyRevenue / 100).toFixed(2)}
          </h2>
        </div>
        <div className="widget-card">
          <p className="widget-titulo">Agendamentos Hoje</p>
          <h2 className="widget-valor">{dashboardData.appointmentsToday}</h2>
          <p className="widget-subtexto">
            {dashboardData.confirmedAppointmentsToday} agendamentos confirmados
          </p>
        </div>
        <div className="widget-card">
          <p className="widget-titulo">Próximo Agendamento</p>
          <h2 className="widget-valor">{dashboardData.nextAppointmentTime}</h2>
          <p className="widget-subtexto">
            {dashboardData.nextAppointmentDescription}
          </p>
        </div>
        <div className="widget-card">
          <p className="widget-titulo">Novos Clientes</p>
          <h2 className="widget-valor">{dashboardData.newCustomers}</h2>
        </div>
        <div className="widget-card card-lista">
          <h3 className="widget-titulo">Próximos Agendamentos</h3>
          <ul className="lista-simples">
            {dashboardData.upcomingAppointments.map((appointment, index) => (
              <li key={index} className="lista-item">
                <div className="item-info">
                  <div className="item-avatar">
                    {appointment.clientName.substring(0, 2)}
                  </div>
                  <div>
                    <p className="item-nome">{appointment.clientName}</p>
                    <p className="item-meta">
                      {appointment.serviceName} -{" "}
                      {new Date(appointment.startTime).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                </div>
                <span className="item-meta">Hoje</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="widget-card card-lista">
          <h3 className="widget-titulo">Principais Clientes do Mês</h3>
          <ul className="lista-simples">
            {dashboardData.topCustomers.map((customer, index) => (
              <li key={index} className="lista-item">
                <div className="item-info">
                  <div className="item-avatar">
                    {customer.name.substring(0, 2)}
                  </div>
                  <div>
                    <p className="item-nome">{customer.name}</p>
                    <p className="item-meta">
                      R$ {(customer.revenue / 100).toFixed(2)}
                    </p>
                  </div>
                </div>
                <span className="item-meta">
                  {customer.appointmentCount} agendamentos
                </span>
              </li>
            ))}
          </ul>
        </div>
        <div className="widget-card card-lista">
          <h3 className="widget-titulo">Avaliações Recentes</h3>
          <ul className="lista-simples">
            {dashboardData.recentReviews.map((review, index) => (
              <li key={index} className="lista-item-avaliacao">
                <div className="avaliacao-estrelas">
                  {[...Array(5)].map((_, i) => (
                    <EstrelaIcone key={i} preenchida={i < review.rating} />
                  ))}
                </div>
                <p className="item-nome">{review.customerName}</p>
                <p className="item-meta">"{review.comment}"</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
