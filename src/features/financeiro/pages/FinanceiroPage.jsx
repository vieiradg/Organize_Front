import React, { useState, useEffect } from 'react';

export default function FinanceiroPage() {
    const financialData = {
        receitaMes: 12500.00,
        receitaAnterior: 11160.71,
        despesasMes: 3100.00,
        lucroMes: 9400.00,
        lucroAnterior: 8173.91,
        mediaAgendamento: 150.00,
        totalAgendamentos: 83, // Exemplo
        transacoes: [
            { id: 1, descricao: 'Agendamento - João da Silva', valor: 200.00, data: '25/10/2024', status: 'Pago' },
            { id: 2, descricao: 'Material de trabalho', valor: -150.00, data: '24/10/2024', status: 'Pendente' },
            { id: 3, descricao: 'Agendamento - Ana Nogueira', valor: 180.00, data: '22/10/2024', status: 'Pago' },
        ]
    };

    const calcularCrescimento = (atual, anterior) => {
        if (anterior === 0) return 'N/A';
        const percentual = ((atual - anterior) / anterior) * 100;
        return `${percentual > 0 ? '+' : ''}${percentual.toFixed(0)}%`;
    };

    return (
        <div>
            <h1 className="titulo-secao-dashboard">Financeiro</h1>
            
            <div className="grid-widgets">
                <div className="widget-card">
                    <p className="widget-titulo">Receita do Mês</p>
                    <h2 className="widget-valor">R$ {financialData.receitaMes.toFixed(2).replace('.', ',')}</h2>
                    <p className="widget-subtexto">{calcularCrescimento(financialData.receitaMes, financialData.receitaAnterior)} em relação ao mês anterior</p>
                </div>
                <div className="widget-card">
                    <p className="widget-titulo">Despesas do Mês</p>
                    <h2 className="widget-valor">R$ {financialData.despesasMes.toFixed(2).replace('.', ',')}</h2>
                    <p className="widget-subtexto">Materiais e despesas operacionais</p>
                </div>
                <div className="widget-card">
                    <p className="widget-titulo">Lucro do Mês</p>
                    <h2 className="widget-valor">R$ {financialData.lucroMes.toFixed(2).replace('.', ',')}</h2>
                    <p className="widget-subtexto">{calcularCrescimento(financialData.lucroMes, financialData.lucroAnterior)} em relação ao mês anterior</p>
                </div>
                <div className="widget-card">
                    <p className="widget-titulo">Média por Agendamento</p>
                    <h2 className="widget-valor">R$ {financialData.mediaAgendamento.toFixed(2).replace('.', ',')}</h2>
                    <p className="widget-subtexto">Baseado em {financialData.totalAgendamentos} agendamentos</p>
                </div>
            </div>

            <div className="widget-card" style={{ marginTop: '1.5rem' }}>
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
                            {financialData.transacoes.map(t => (
                                <tr key={t.id}>
                                    <td>{t.descricao}</td>
                                    <td style={{ color: t.valor < 0 ? '#ef4444' : '#16a34a' }}>
                                        R$ {t.valor.toFixed(2).replace('.', ',')}
                                    </td>
                                    <td>{t.data}</td>
                                    <td style={{ color: t.status === 'Pendente' ? '#f97316' : '#16a34a' }}>
                                        {t.status}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};
