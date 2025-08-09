import React from 'react';
import Card from '../../../components/UI/Card/Card';

const FinanceiroPage = () => {
  return (
    <div>
      <h1>Financeiro</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginBottom: '20px' }}>
        <Card>
          <h2>Receita do Mês</h2>
          <p style={{ fontSize: '2em', fontWeight: 'bold', color: 'var(--highlight-orange)' }}>R$ 12.500,00</p>
          <p>+12% em relação ao mês anterior</p>
        </Card>
        <Card>
          <h2>Despesas do Mês</h2>
          <p style={{ fontSize: '2em', fontWeight: 'bold' }}>R$ 3.100,00</p>
          <p>Materiais e despesas operacionais</p>
        </Card>
        <Card>
          <h2>Lucro do Mês</h2>
          <p style={{ fontSize: '2em', fontWeight: 'bold' }}>R$ 9.400,00</p>
          <p>+15% em relação ao mês anterior</p>
        </Card>
        <Card>
          <h2>Média por Agendamento</h2>
          <p style={{ fontSize: '2em', fontWeight: 'bold' }}>R$ 150,00</p>
          <p>Baseado em 50 agendamentos</p>
        </Card>
      </div>

      <Card>
        <h2>Transações Recentes</h2>
        <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '15px' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid #eee' }}>
              <th style={{ textAlign: 'left', padding: '8px 0' }}>Descrição</th>
              <th style={{ textAlign: 'left', padding: '8px 0' }}>Valor</th>
              <th style={{ textAlign: 'left', padding: '8px 0' }}>Data</th>
              <th style={{ textAlign: 'left', padding: '8px 0' }}>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ padding: '8px 0' }}>Agendamento - João da Silva</td>
              <td style={{ padding: '8px 0' }}>R$ 200,00</td>
              <td style={{ padding: '8px 0' }}>25/10/2024</td>
              <td style={{ padding: '8px 0', color: 'green' }}>Pago</td>
            </tr>
            <tr>
              <td style={{ padding: '8px 0' }}>Material de trabalho</td>
              <td style={{ padding: '8px 0' }}>R$ -150,00</td>
              <td style={{ padding: '8px 0' }}>24/10/2024</td>
              <td style={{ padding: '8px 0', color: 'orange' }}>Pendente</td>
            </tr>
            <tr>
              <td style={{ padding: '8px 0' }}>Agendamento - Ana Nogueira</td>
              <td style={{ padding: '8px 0' }}>R$ 180,00</td>
              <td style={{ padding: '8px 0' }}>22/10/2024</td>
              <td style={{ padding: '8px 0', color: 'green' }}>Pago</td>
            </tr>
          </tbody>
        </table>
      </Card>
    </div>
  );
};

export default FinanceiroPage;
