import React, { useEffect, useState, useMemo } from "react";
import api from "/src/services/api";
import "./UpcomingAppointmentsPage.css";

export default function UpcomingAppointmentsPage() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState("");

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const today = new Date().toISOString().split("T")[0];
        const response = await api.get(`/api/appointments?date=${today}`);

        setAppointments(response.data || []);
      } catch (err) {
        console.error("Erro ao carregar agendamentos:", err);
        setErro("Não foi possível carregar seus agendamentos.");
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);


  const sortedAppointments = useMemo(() => {
    return [...appointments].sort(
      (a, b) => new Date(a.startTime) - new Date(b.startTime)
    );
  }, [appointments]);

  const next = sortedAppointments[0];


  if (loading)
    return (
      <div className="dashboard-cliente-container">
        <p className="loading">Carregando seus agendamentos...</p>
      </div>
    );

  if (erro)
    return (
      <div className="dashboard-cliente-container">
        <p className="error-message">{erro}</p>
      </div>
    );

  if (!appointments.length)
    return (
      <div className="dashboard-cliente-container">
        <h1 className="titulo-secao-dashboard">Seus Agendamentos</h1>
        <p>Nenhum agendamento encontrado para hoje.</p>
      </div>
    );


  return (
    <div className="dashboard-cliente-container">
      <h1 className="titulo-secao-dashboard">Seus Agendamentos</h1>

      <div className="cards-resumo-wrapper">
        {/* Card: Próximo Agendamento */}
        <div className="card-resumo">
          <span className="card-resumo-titulo">Próximo Agendamento</span>

          <span className="card-resumo-dado-principal">
            {next?.startTime
              ? new Date(next.startTime).toLocaleString("pt-BR", {
                  dateStyle: "short",
                  timeStyle: "short",
                })
              : "-"}
          </span>

          <span className="card-resumo-descricao">
            {next?.serviceName
              ? `${next.serviceName} com ${next.employeeName}`
              : ""}
          </span>
        </div>

        <div className="card-resumo">
          <span className="card-resumo-titulo">Total de Agendamentos</span>

          <span className="card-resumo-dado-principal">
            {appointments.length}
          </span>

          <span className="card-resumo-descricao">Desde que você entrou</span>
        </div>
      </div>


      <div className="historico-container">
        <h2 className="historico-titulo">Histórico de Agendamentos</h2>

        <div className="historico-lista">
          {sortedAppointments.map((item) => (
            <div className="historico-item" key={item.id}>
              <div className="historico-item-info">
                <span className="historico-item-servico">
                  {item.serviceName}
                </span>
                <span className="historico-item-profissional">
                  Com {item.employeeName}
                </span>
              </div>

              <span className="historico-item-data">
                {new Date(item.startTime).toLocaleDateString("pt-BR")}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
