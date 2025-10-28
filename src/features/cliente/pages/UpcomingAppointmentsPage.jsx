import React, { useEffect, useState } from 'react';
import api from '/src/services/api';
import './UpcomingAppointmentsPage.css';

export default function UpcomingAppointmentsPage() {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState('');

  useEffect(() => {
    const fetchDashboard = async () => {
      const userId = localStorage.getItem('userId'); 
      const token = localStorage.getItem('token');
      
      if (!token || !userId) {
        setErro('Usuário não autenticado. Faça login.');
        setLoading(false);
        return;
      }
      
      const config = {
          headers: {
              'adminId': userId, 
              'Authorization': `Bearer ${token}` 
          }
      };

      try {
        setLoading(true);
        const response = await api.get('/api/dashboard', config); 
        setDashboardData(response.data);
      } catch (err) {
        console.error("Erro ao carregar dashboard do cliente:", err);
        setErro('Erro ao carregar seus agendamentos.');
      } finally {
        setLoading(false);
      }
    };
    fetchDashboard();
  }, []);

  if (loading) return <p>Carregando dashboard...</p>;
  if (erro) return <p className="error-message">{erro}</p>;
  if (!dashboardData) return <p>Você ainda não possui agendamentos.</p>;

  const { nextAppointmentTime, nextAppointmentDescription, appointmentsToday, upcomingAppointments } = dashboardData;
  
  return (
    <div className="dashboard-cliente-container">
      <h1 className="titulo-secao-dashboard">Dashboard</h1>

      <div className="cards-resumo-wrapper">
        {/* Próximo agendamento */}
        <div className="card-resumo">
          <span className="card-resumo-titulo">Próximo Agendamento</span>
          <span className="card-resumo-dado-principal">{nextAppointmentTime || '-'}</span>
          <span className="card-resumo-descricao">{nextAppointmentDescription || 'Nenhum agendamento futuro'}</span>
        </div>

        {/* Total */}
        <div className="card-resumo">
          <span className="card-resumo-titulo">Total de Agendamentos</span>
          <span className="card-resumo-dado-principal">{appointmentsToday || 0}</span> 
          <span className="card-resumo-descricao">Desde que você entrou</span>
        </div>
      </div>

      {/* Histórico */}
      <div className="historico-container">
        <h2 className="historico-titulo">Próximos Agendamentos</h2>
        <div className="historico-lista">
          {upcomingAppointments && upcomingAppointments.length > 0 ? (
            upcomingAppointments.map((item) => (
              <div className="historico-item" key={item.id}>
                <div className="historico-item-info">
                  <span className="historico-item-servico">{item.serviceName}</span>
                  <span className="historico-item-profissional">Com {item.employeeName}</span>
                </div>
                <span className="historico-item-data">
                  {new Date(item.startTime).toLocaleDateString('pt-BR')}
                </span>
              </div>
            ))
          ) : (
            <p>Você não tem agendamentos futuros.</p>
          )}
        </div>
      </div>
    </div>
  );
}