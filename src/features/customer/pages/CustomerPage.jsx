import React, { useState, useEffect } from 'react';
import api from '../../../services/api.js';

import Card from '../../../components/UI/Card/Card';
import Button from '../../../components/UI/Button/Button';
import Input from '../../../components/UI/Input/Input';
import Modal from '../../../components/UI/Modal/Modal';

const AcoesIcone = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icone-acao">
        <circle cx="12" cy="12" r="1"></circle>
        <circle cx="19" cy="12" r="1"></circle>
        <circle cx="5" cy="12" r="1"></circle>
    </svg>
);

export default function CustomerPage() {
    const [establishmentId, setEstablishmentId] = useState('');
    const [customers, setCustomers] = useState([]);
    const [newCustomerName, setNewCustomerName] = useState('');
    const [newCustomerEmail, setNewCustomerEmail] = useState('');
    const [newCustomerPhone, setNewCustomerPhone] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const storedEstablishmentId = localStorage.getItem('establishmentId');
        if (storedEstablishmentId) {
            setEstablishmentId(storedEstablishmentId);
            fetchCustomers(storedEstablishmentId);
        } else {
            setError('ID do estabelecimento não encontrado. Faça login novamente.');
        }
    }, []);

    const fetchCustomers = async (id) => {
        if (!id) return;
        setLoading(true);
        setError(null);
        try {
            const response = await api.get(`/api/establishments/${id}/clients`);
            setCustomers(response.data);
        } catch (err) {
            console.error('Erro ao buscar clientes:', err);
            setError('Erro ao carregar clientes. Verifique a conexão com a API.');
        } finally {
            setLoading(false);
        }
    };

    const handleAddCustomer = async (e) => {
        e.preventDefault();
        
        if (!establishmentId) {
            setError('ID do estabelecimento não encontrado. Não é possível salvar.');
            return;
        }

        const customerData = {
            name: newCustomerName,
            email: newCustomerEmail,
            phone: newCustomerPhone,
        };

        try {
            await api.post(`/api/establishments/${establishmentId}/clients`, customerData);
            setNewCustomerName('');
            setNewCustomerEmail('');
            setNewCustomerPhone('');
            fetchCustomers(establishmentId);
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

            <Card style={{ marginBottom: '1.5rem' }}>
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
            </Card>

            <Card>
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
                                        <td>{customer.clientName}</td>
                                        <td>{customer.clientEmail || 'N/A'}</td>
                                        <td>{customer.clientPhone || 'N/A'}</td>
                                        <td>{customer.lastVisit || 'N/A'}</td>
                                        <td>{customer.appointments || 0}</td>
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
            </Card>
        </div>
    );
};