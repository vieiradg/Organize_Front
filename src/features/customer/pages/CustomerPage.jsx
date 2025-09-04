import React, { useState, useEffect } from 'react';
import api from '../../../services/api.js';

const AcoesIcone = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icone-acao">
        <circle cx="12" cy="12" r="1"></circle>
        <circle cx="19" cy="12" r="1"></circle>
        <circle cx="5" cy="12" r="1"></circle>
    </svg>
);


export default function CustomerPage() {
    const [customers, setCustomers] = useState([]);
    const [newCustomerName, setNewCustomerName] = useState('');
    const [newCustomerEmail, setNewCustomerEmail] = useState(''); 
    const [newCustomerPhone, setNewCustomerPhone] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchCustomers = async () => {
        setLoading(true);
        setError(null); // Limpa erros anteriores
        try {
            const response = await api.get('/api/customers');
            setCustomers(response.data);
        } catch (err) {
            console.error('Erro ao buscar clientes:', err);
            setError('Erro ao carregar clientes. Verifique a conexão com a API.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCustomers();
    }, []);

    const handleAddCustomer = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        try {
            await api.post('/auth/register', {
                name: newCustomerName,
                email: newCustomerEmail,
                phone: newCustomerPhone,
                password: 'default_password_for_new_customer',
            });
            setNewCustomerName('');
            setNewCustomerEmail('');
            setNewCustomerPhone('');
            fetchCustomers();
        } catch (err) {
            console.error('Erro ao adicionar cliente:', err);
            setError('Erro ao adicionar cliente. Verifique os dados.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h1 className="titulo-secao-dashboard">Meus Clientes</h1>

            <div className="widget-card" style={{ marginBottom: '1.5rem' }}>
                <h3 className="widget-titulo">Adicionar Novo Cliente</h3>
                <form onSubmit={handleAddCustomer} className="add-item-form">
                    <div className="form-row">
                        <div className="form-group">
                            <input 
                                type="text" 
                                placeholder="Nome do Cliente" 
                                value={newCustomerName}
                                onChange={(e) => setNewCustomerName(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <input 
                                type="email" 
                                placeholder="Email" 
                                value={newCustomerEmail}
                                onChange={(e) => setNewCustomerEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <input 
                                type="text" 
                                placeholder="Telefone" 
                                value={newCustomerPhone}
                                onChange={(e) => setNewCustomerPhone(e.target.value)}
                            />
                        </div>
                    </div>
                    <button type="submit" className="add-button" disabled={loading}>
                        {loading ? 'A Adicionar...' : 'Adicionar Cliente'}
                    </button>
                </form>
            </div>

            <div className="widget-card">
                <h3 className="widget-titulo">Lista de Clientes</h3>
                {error && <p className="error-message">{error}</p>}
                <div className="table-container">
                    <table className="dashboard-table">
                        <thead>
                            <tr>
                                <th>Nome</th>
                                <th>Email</th>
                                <th>Telefone</th>
                                <th>Última Visita</th>
                                <th>Agendamentos</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr>
                                    <td colSpan="6">A carregar clientes...</td>
                                </tr>
                            ) : customers.length > 0 ? (
                                customers.map(customer => (
                                    <tr key={customer.id}>
                                        <td>{customer.name}</td>
                                        <td>{customer.email || 'N/A'}</td>
                                        <td>{customer.phone || 'N/A'}</td>
                                        <td>{customer.lastVisit || 'N/A'}</td> 
                                        <td>{customer.appointmentsCount || 0}</td> 
                                        <td>
                                            <button className="action-button">
                                                <AcoesIcone />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6">Nenhum cliente cadastrado ainda.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};
