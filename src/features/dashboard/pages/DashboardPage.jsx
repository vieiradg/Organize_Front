import React from 'react';
import Card from '../../../components/UI/Card/Card';

const DashboardPage = () => {
  return (
    <div>
      <h1>Dashboard</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginBottom: '20px' }}>
        <Card>
          <h2>Faturamento do Mês</h2>
          <p style={{ fontSize: '2em', fontWeight: 'bold', color: 'var(--highlight-orange)' }}>R$ 12.500,00</p>
          <p>+12% em relação ao mês anterior</p>
        </Card>
        <Card>
          <h2>Agendamentos Hoje</h2>
          <p style={{ fontSize: '2em', fontWeight: 'bold' }}>8</p>
          <p>3 agendamentos confirmados</p>
        </Card>
        <Card>
          <h2>Próximo Agendamento</h2>
          <p style={{ fontSize: '2em', fontWeight: 'bold' }}>14:00h</p>
          <p>Com Maria Clara - Consultoria</p>
        </Card>
        <Card>
          <h2>Novos Clientes</h2>
          <p style={{ fontSize: '2em', fontWeight: 'bold' }}>5</p>
          <p>Aumento de 20%</p>
        </Card>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        <Card>
          <h2>Próximos Agendamentos</h2>
          <div style={{ marginBottom: '10px' }}>
            <p><strong>Samuel Alejandro</strong> - Consultoria - 15:00h <span style={{ float: 'right', color: 'gray' }}>Hoje</span></p>
          </div>
          <div style={{ marginBottom: '10px' }}>
            <p><strong>Ana Julia</strong> - Fisioterapia - 10:00h <span style={{ float: 'right', color: 'gray' }}>Amanhã</span></p>
          </div>
          <div>
            <p><strong>Alex Silva</strong> - Mentoria - 16:30h <span style={{ float: 'right', color: 'gray' }}>Amanhã</span></p>
          </div>
        </Card>

        <Card>
          <h2>Principais Clientes do Mês</h2>
          <div style={{ marginBottom: '10px' }}>
            <p><strong>Sofia Gomez</strong> <span style={{ float: 'right', color: 'gray' }}>R$ 1.200,00</span></p>
          </div>
          <div style={{ marginBottom: '10px' }}>
            <p><strong>Gelsa Barbosa</strong> <span style={{ float: 'right', color: 'gray' }}>R$ 950,00</span></p>
          </div>
          <div>
            <p><strong>Thaina Costa</strong> <span style={{ float: 'right', color: 'gray' }}>R$ 800,00</span></p>
          </div>
        </Card>
      </div>

      <Card>
        <h2>Avaliações Recentes</h2>
        <div style={{ marginBottom: '10px' }}>
          <p>⭐⭐⭐⭐⭐</p>
          <p><strong>João da Silva</strong></p>
          <p>"Ótimo atendimento, super pontual!"</p>
        </div>
        <div>
          <p>⭐⭐⭐⭐</p>
          <p><strong>Marta Souza</strong></p>
          <p>"Profissionalismo impecável. Recomendo muito!"</p>
        </div>
      </Card>
    </div>
  );
};

export default DashboardPage;
