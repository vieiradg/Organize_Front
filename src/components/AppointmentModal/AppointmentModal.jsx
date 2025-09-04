import React, { useState, useEffect } from 'react';
import '../UI/Modal/Modal.module.css';

import api from '@services/api.js';

const AppointmentModal = ({ isOpen, onClose, selectedHour, onAppointmentCreated }) => {
    const [customers, setCustomers] = useState([]);
    const [services, setServices] = useState([]);
    const [selectedCustomerId, setSelectedCustomerId] = useState('');
    const [newCustomerName, setNewCustomerName] = useState('');
    const [newCustomerPhone, setNewCustomerPhone] = useState('');
    const [selectedServiceId, setSelectedServiceId] = useState('');
    const [clientNotes, setClientNotes] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (isOpen) {
            const fetchData = async () => {
                try {
                    const [customersResponse, servicesResponse] = await Promise.all([
                        api.get('/api/customers'),
                        api.get('/api/services'),
                    ]);
                    setCustomers(customersResponse.data);
                    setServices(servicesResponse.data);
                } catch (err) {
                    console.error('Erro ao buscar dados:', err);
                    setError('Erro ao carregar dados (clientes/serviços).');
                }
            };
            fetchData();
        }
    }, [isOpen]);

    if (!isOpen) {
        return null;
    }

    const handleCreateCustomer = async () => {
        try {
            const response = await api.post('/api/customers', {
                name: newCustomerName,
                phone: newCustomerPhone,
            });
            setCustomers([...customers, response.data]);
            setSelectedCustomerId(response.data.id);
            setNewCustomerName('');
            setNewCustomerPhone('');
            return response.data.id;
        } catch (err) {
            console.error('Erro ao criar cliente:', err);
            setError('Erro ao criar novo cliente.');
            throw err;
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        let finalCustomerId = selectedCustomerId;

        try {
            if (selectedCustomerId === 'new' && newCustomerName) {
                finalCustomerId = await handleCreateCustomer();
            } else if (!selectedCustomerId) {
                setError('Selecione um cliente ou crie um novo.');
                setLoading(false);
                return;
            }

            const startTime = new Date();
            startTime.setHours(selectedHour, 0, 0, 0);
            const endTime = new Date(startTime);
            endTime.setHours(selectedHour + 1, 0, 0, 0);

            const appointmentData = {
                customerId: finalCustomerId,
                serviceId: selectedServiceId,
                establishmentId: '00000000-0000-00,00-0000-000000000000',
                employeeId: '00000000-0000-0000-0000-000000000000', 
                startTime: startTime.toISOString(),
                endTime: endTime.toISOString(),
                status: 'CONFIRMED',
                clientNotes: clientNotes,
            };

            await api.post('/api/appointments', appointmentData);
            onAppointmentCreated();
            onClose();
        } catch (err) {
            console.error('Erro ao criar agendamento:', err);
            setError(err.response?.data?.message || 'Erro ao criar agendamento. Tente novamente.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <div className="modal-header">
                    <h2>Novo Agendamento</h2>
                    <button onClick={onClose} className="close-button">&times;</button>
                </div>
                <form onSubmit={handleSubmit}>
                    {error && <p className="error-message">{error}</p>}
                    <div className="form-group">
                        <label>Horário:</label>
                        <input type="text" value={`${selectedHour}:00`} readOnly />
                    </div>
                    
                    <div className="form-group">
                        <label>Cliente:</label>
                        <select 
                            value={selectedCustomerId}
                            onChange={(e) => setSelectedCustomerId(e.target.value)}
                            required
                        >
                            <option value="">Selecione um cliente</option>
                            {customers.map(customer => (
                                <option key={customer.id} value={customer.id}>
                                    {customer.name} ({customer.phone})
                                </option>
                            ))}
                            <option value="new">Criar novo cliente</option>
                        </select>
                    </div>

                    {selectedCustomerId === 'new' && (
                        <>
                            <div className="form-group">
                                <label>Nome do Novo Cliente:</label>
                                <input 
                                    type="text" 
                                    placeholder="Nome do novo cliente" 
                                    value={newCustomerName}
                                    onChange={(e) => setNewCustomerName(e.target.value)}
                                    required={selectedCustomerId === 'new'}
                                />
                            </div>
                            <div className="form-group">
                                <label>Telefone do Novo Cliente:</label>
                                <input 
                                    type="text" 
                                    placeholder="Telefone do novo cliente" 
                                    value={newCustomerPhone}
                                    onChange={(e) => setNewCustomerPhone(e.target.value)}
                                />
                            </div>
                        </>
                    )}

                    <div className="form-group">
                        <label>Serviço:</label>
                        <select 
                            value={selectedServiceId}
                            onChange={(e) => setSelectedServiceId(e.target.value)}
                            required
                        >
                            <option value="">Selecione um serviço</option>
                            {services.map(service => (
                                <option key={service.id} value={service.id}>
                                    {service.name} (R$ {(service.priceCents / 100).toFixed(2)}) - {service.duration} min
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Notas do Cliente:</label>
                        <textarea
                            placeholder="Notas do cliente"
                            value={clientNotes}
                            onChange={(e) => setClientNotes(e.target.value)}
                        />
                    </div>
                    <button type="submit" className="login-button" disabled={loading}>
                        {loading ? 'Salvando...' : 'Salvar Agendamento'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AppointmentModal;