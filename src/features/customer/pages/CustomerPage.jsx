import React, { useState, useEffect } from 'react';
import api from '../../../services/api.js';

import Card from '../../../components/UI/Card/Card';
import Button from '../../../components/UI/Button/Button';
import Input from '../../../components/UI/Input/Input';
import Modal from '../../../components/UI/Modal/Modal';

const EditarIcone = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" /></svg>
);

const DeletarIcone = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6" /><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /><line x1="10" y1="11" x2="10" y2="17" /><line x1="14" y1="11" x2="14" y2="17" /></svg>
);

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
    const [showModal, setShowModal] = useState(false);
    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const [privateNotes, setPrivateNotes] = useState('');


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
            establishmentId: establishmentId,
            privateNotes: privateNotes,
        };

        try {
            await api.post(`/api/establishments/${establishmentId}/clients`, customerData);
            setNewCustomerName('');
            setNewCustomerEmail('');
            setNewCustomerPhone('');
            fetchCustomers(establishmentId);
            setPrivateNotes('');
            closeModal();
        } catch (err) {
            console.error('Erro ao adicionar cliente:', err);
            setError('Erro ao adicionar cliente. Verifique os dados.');
        } finally {
            setLoading(false);
        }
    };

    const handleEditCustomer = async () => {
        if (!establishmentId || !selectedCustomer) return;

        const updatedData = {
            clientId: selectedCustomer.id,
            privateNotes: privateNotes,
        };

        try {
            await api.put(`/api/establishments/${establishmentId}/clients/${selectedCustomer.clientDataId}`, updatedData);
            fetchCustomers(establishmentId);
            closeModal();
        } catch (err) {
            console.error('Erro ao editar cliente:', err);
            setError('Erro ao editar cliente. Verifique os dados.');
        }
    };

    const handleDeleteCustomer = async (clientDataId) => {
        if (!establishmentId || !clientDataId) return;

        if (window.confirm('Tem certeza que deseja apagar este cliente?')) {
            try {
                await api.delete(`/api/establishments/${establishmentId}/clients/${clientDataId}`);
                fetchCustomers(establishmentId);
            } catch (err) {
                console.error('Erro ao deletar cliente:', err);
                setError('Erro ao deletar cliente. Verifique a conexão com a API.');
            }
        }
    };
    
    const openModal = (customer = null) => {
        setSelectedCustomer(customer);
        setPrivateNotes(customer?.privateNotes || '');
        setShowModal(true);
    };

    const closeModal = () => {
        setSelectedCustomer(null);
        setPrivateNotes('');
        setShowModal(false);
    };

    return (
        <div>
            <div className="page-header">
                <h1 className="titulo-secao-dashboard">Meus Clientes</h1>
                <Button onClick={() => openModal()}>Adicionar Cliente</Button>
            </div>

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
                                    <td colSpan="6">Carregando clientes...</td>
                                </tr>
                            ) : customers.length > 0 ? (
                                customers.map(customer => (
                                    <tr key={customer.id}>
                                        <td>{customer.clientName}</td>
                                        <td>{customer.clientEmail || 'N/A'}</td>
                                        <td>{customer.clientPhone || 'N/A'}</td>
                                        <td>{customer.lastVisit || 'N/A'}</td>
                                        <td>{customer.appointments || 0}</td>
                                        <td className="actions-cell">
                                            <button className="action-button icon-button" onClick={() => openModal(customer)}>
                                                <EditarIcone />
                                            </button>
                                            <button className="action-button icon-button delete" onClick={() => handleDeleteCustomer(customer.id)}>
                                                <DeletarIcone />
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

            {showModal && (
                <Modal onClose={closeModal}>
                    <h2>{selectedCustomer ? 'Editar Cliente' : 'Adicionar Cliente'}</h2>
                    <form onSubmit={selectedCustomer ? handleEditCustomer : handleAddCustomer}>
                        <div className="form-group">
                            <label htmlFor="name">Nome</label>
                            <Input
                                type="text"
                                id="name"
                                value={selectedCustomer ? selectedCustomer.clientName : newCustomerName}
                                onChange={(e) => setNewCustomerName(e.target.value)}
                                disabled={!!selectedCustomer} // Desabilita o campo de nome na edição
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <Input
                                type="email"
                                id="email"
                                value={selectedCustomer ? selectedCustomer.clientEmail : newCustomerEmail}
                                onChange={(e) => setNewCustomerEmail(e.target.value)}
                                disabled={!!selectedCustomer} // Desabilita o campo de email na edição
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="phone">Telefone</label>
                            <Input
                                type="text"
                                id="phone"
                                value={selectedCustomer ? selectedCustomer.clientPhone : newCustomerPhone}
                                onChange={(e) => setNewCustomerPhone(e.target.value)}
                                disabled={!!selectedCustomer} // Desabilita o campo de telefone na edição
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="privateNotes">Notas Privadas</label>
                            <Input
                                as="textarea"
                                id="privateNotes"
                                value={privateNotes}
                                onChange={(e) => setPrivateNotes(e.target.value)}
                            />
                        </div>
                        <div className="modal-actions">
                            <Button type="secondary" onClick={closeModal}>Cancelar</Button>
                            <Button type="submit">{selectedCustomer ? 'Salvar' : 'Adicionar'}</Button>
                        </div>
                    </form>
                </Modal>
            )}
        </div>
    );
}