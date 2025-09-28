import React from 'react';

export default function ClientList({ clients }) {
    if (clients.length === 0) {
        return <p>Nenhum cliente cadastrado ainda.</p>;
    }

    return (
        <div className="customer-list">
            <ul>
                {clients.map((client) => (
                    <li key={client.id}>
                        {/* Informações do cliente à esquerda */}
                        <div>
                            <span><strong>{client.clientName}</strong></span>
                            <br />
                            <span style={{ color: '#777', fontSize: '0.9em' }}>
                                {client.clientEmail}
                            </span>
                        </div>

                        {/* Botões de ação à direita */}
                        <div className="action-buttons">
                            <button className="btn-secondary">Editar</button>
                            <button className="btn-danger">Excluir</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}