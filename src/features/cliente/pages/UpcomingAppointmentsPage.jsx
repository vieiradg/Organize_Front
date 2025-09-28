import React from 'react';
import './UpcomingAppointmentsPage.css'; 


export default function UpcomingAppointmentsPage() {
  const proximoAgendamento = {
    horario: '15:00h',
    profissional: 'João Barbeiro',
    especialidade: 'Corte de Cabelo',
  };

  const totalAgendamentos = 27;

  const historico = [
    {
      id: 1,
      servico: 'Corte de Cabelo',
      profissional: 'João Barbeiro',
      data: '20/09/2025',
    },
    {
      id: 2,
      servico: 'Barba Completa',
      profissional: 'Carlos Ferreira',
      data: '10/09/2025',
    },
    {
      id: 3,
      servico: 'Corte + Barba',
      profissional: 'Pedro Santos',
      data: '02/09/2025',
    },
    {
      id: 4,
      servico: 'Sobrancelha',
      profissional: 'Ana Paula',
      data: '25/08/2025',
    },
  ];



  return (
    <div className="dashboard-cliente-container">
      <h1 className="titulo-secao-dashboard">Dashboard</h1>

      <div className="cards-resumo-wrapper">
        <div className="card-resumo">
          <span className="card-resumo-titulo">Próximo Agendamento</span>
          <span className="card-resumo-dado-principal">{proximoAgendamento.horario}</span>
          <span className="card-resumo-descricao">
            {proximoAgendamento.especialidade} com {proximoAgendamento.profissional}
          </span>
        </div>
        <div className="card-resumo">
          <span className="card-resumo-titulo">Total de Agendamentos</span>
          <span className="card-resumo-dado-principal">{totalAgendamentos}</span>
          <span className="card-resumo-descricao">Desde que você se cadastrou</span>
        </div>
      </div>

      <div className="historico-container">
        <h2 className="historico-titulo">Histórico de Agendamentos</h2>
        <div className="historico-lista">
          {historico.map((item) => (
            <div className="historico-item" key={item.id}>
              <div className="historico-item-info">
                <span className="historico-item-servico">{item.servico}</span>
                <span className="historico-item-profissional">Com {item.profissional}</span>
              </div>
              <span className="historico-item-data">{item.data}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
