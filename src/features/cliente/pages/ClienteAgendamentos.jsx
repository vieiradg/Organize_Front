import React, { useEffect, useState } from 'react';
import api from '/src/services/api';
import Card from '/src/components/UI/Card/Card';

export default function ClienteAgendamentos() {
  const [agendamentos, setAgendamentos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState('');

  useEffect(() => {
    const fetchAgendamentos = async () => {
      try {
        const response = await api.get('/api/appointments');
        setAgendamentos(response.data);
      } catch (err) {
        setErro('Erro ao carregar seus agendamentos.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAgendamentos();
  }, []);

  return (
    <div>
      <h1 className="titulo-secao-dashboard">Meuss Agendamentos</h1>

      {loading ? (
        <p>Carregando agendamentos...</p>
      ) : erro ? (
        <p className="error-message">{erro}</p>
      ) : agendamentos.length === 0 ? (
        <p>Você ainda não possui agendamentos.</p>
      ) : (
        <div className="agendamentos-lista">
          {agendamentos.map((agendamento) => (
            <Card key={agendamento.id}>
              <p>
                <strong>Data:</strong>{' '}
                {new Date(agendamento.startTime).toLocaleDateString('pt-BR')}
              </p>
              <p>
                <strong>Horário:</strong>{' '}
                {new Date(agendamento.startTime).toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </p>
              <p>
                <strong>Profissional:</strong> {agendamento.employeeName}
              </p>
              <p>
                <strong>Serviço:</strong> {agendamento.serviceName}
              </p>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
