import React from 'react';
const EstrelaIcone = ({ preenchida }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill={preenchida ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icone">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
  </svg>
);

export default function DashboardPage() {
  return (
    <div className="dashboard-content">
      <h1 className="titulo-secao-dashboard">Dashboard</h1>
      <div className="grid-widgets">
        <div className="widget-card">
          <p className="widget-titulo">Faturamento do Mês</p>
          <h2 className="widget-valor">R$ 12.500,00</h2>
          <p className="widget-subtexto">+12% em relação ao mês anterior</p>
        </div>
        <div className="widget-card">
          <p className="widget-titulo">Agendamentos Hoje</p>
          <h2 className="widget-valor">8</h2>
          <p className="widget-subtexto">3 agendamentos confirmados</p>
        </div>
        <div className="widget-card">
          <p className="widget-titulo">Próximo Agendamento</p>
          <h2 className="widget-valor">14:00h</h2>
          <p className="widget-subtexto">Com Maria Clara - Consultoria</p>
        </div>
        <div className="widget-card">
          <p className="widget-titulo">Novos Clientes</p>
          <h2 className="widget-valor">5</h2>
          <p className="widget-subtexto">Aumento de 20%</p>
        </div>
        <div className="widget-card card-lista">
          <h3 className="widget-titulo">Próximos Agendamentos</h3>
          <ul className="lista-simples">
            <li className="lista-item">
              <div className="item-info">
                <div className="item-avatar">JD</div>
                <div>
                  <p className="item-nome">João da Silva</p>
                  <p className="item-meta">Consultoria - 15:00h</p>
                </div>
              </div>
              <span className="item-meta">Hoje</span>
            </li>
            <li className="lista-item">
              <div className="item-info">
                <div className="item-avatar">AN</div>
                <div>
                  <p className="item-nome">Ana Nogueira</p>
                  <p className="item-meta">Fisioterapia - 10:00h</p>
                </div>
              </div>
              <span className="item-meta">Amanhã</span>
            </li>
            <li className="lista-item">
              <div className="item-info">
                <div className="item-avatar">RC</div>
                <div>
                  <p className="item-nome">Ricardo Costa</p>
                  <p className="item-meta">Mentoria - 16:30h</p>
                </div>
              </div>
              <span className="item-meta">Amanhã</span>
            </li>
          </ul>
        </div>
        <div className="widget-card card-lista">
          <h3 className="widget-titulo">Principais Clientes do Mês</h3>
          <ul className="lista-simples">
            <li className="lista-item">
              <div className="item-info">
                <div className="item-avatar">MS</div>
                <div>
                  <p className="item-nome">Marta Souza</p>
                  <p className="item-meta">R$ 1.200,00</p>
                </div>
              </div>
              <span className="item-meta">3 agendamentos</span>
            </li>
            <li className="lista-item">
              <div className="item-info">
                <div className="item-avatar">PA</div>
                <div>
                  <p className="item-nome">Pedro Alves</p>
                  <p className="item-meta">R$ 950,00</p>
                </div>
              </div>
              <span className="item-meta">2 agendamentos</span>
            </li>
            <li className="lista-item">
              <div className="item-info">
                <div className="item-avatar">FL</div>
                <div>
                  <p className="item-nome">Fernanda Lima</p>
                  <p className="item-meta">R$ 800,00</p>
                </div>
              </div>
              <span className="item-meta">4 agendamentos</span>
            </li>
          </ul>
        </div>
        <div className="widget-card card-lista">
          <h3 className="widget-titulo">Avaliações Recentes</h3>
          <ul className="lista-simples">
            <li className="lista-item-avaliacao">
              <div className="avaliacao-estrelas">
                  <EstrelaIcone preenchida={true} />
                  <EstrelaIcone preenchida={true} />
                  <EstrelaIcone preenchida={true} />
                  <EstrelaIcone preenchida={true} />
                  <EstrelaIcone preenchida={true} />
              </div>
              <p className="item-nome">João da Silva</p>
              <p className="item-meta">"Ótimo atendimento, super pontual!"</p>
            </li>
            <li className="lista-item-avaliacao">
              <div className="avaliacao-estrelas">
                  <EstrelaIcone preenchida={true} />
                  <EstrelaIcone preenchida={true} />
                  <EstrelaIcone preenchida={true} />
                  <EstrelaIcone preenchida={true} />
                  <EstrelaIcone preenchida={true} />
              </div>
              <p className="item-nome">Marta Souza</p>
              <p className="item-meta">"Profissionalismo impecável. Recomendo muito!"</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
