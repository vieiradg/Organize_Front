import React, { useState, useEffect } from 'react';
import api from "@services/api.js";
import Card from '../../../components/UI/Card/Card';
import Input from '../../../components/UI/Input/Input';
import Button from '../../../components/UI/Button/Button';

const CustomerPage = () => {
    const [customers, setCustomers] = useState([]);
    const [newCustomerName, setNewCustomerName] = useState('');
    const [newCustomerEmail, setNewCustomerEmail] = useState(''); 
    const [newCustomerPhone, setNewCustomerPhone] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchCustomers = async () => {
        setLoading(true);
        try {
            const response = await api.get('/api/customers');
            setCustomers(response.data);
        } catch (err) {
            console.error('Erro ao buscar clientes:', err);
            setError('Erro ao carregar clientes.');
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
            await api.post('/api/customers', {
                name: newCustomerName,
                email: newCustomerEmail,
                phone: newCustomerPhone,
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
            <h1>Meus Clientes</h1>

            <Card>
                <h3>Adicionar Novo Cliente</h3>
                <form onSubmit={handleAddCustomer}>
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                    <Input 
                        type="text" 
                        placeholder="Nome do Cliente" 
                        value={newCustomerName}
                        onChange={(e) => setNewCustomerName(e.target.value)}
                        required
                    />
                    <Input 
                        type="email" 
                        placeholder="Email" 
                        value={newCustomerEmail}
                        onChange={(e) => setNewCustomerEmail(e.target.value)}
                        required
                    />
                    <Input 
                        type="text" 
                        placeholder="Telefone" 
                        value={newCustomerPhone}
                        onChange={(e) => setNewCustomerPhone(e.target.value)}
                    />
                    <Button type="submit" disabled={loading}>
                        {loading ? 'Adicionando...' : 'Adicionar Cliente'}
                    </Button>
                </form>
            </Card>

            <Card>
                <h3>Meus Clientes</h3>
                {loading && <p>Carregando clientes...</p>}
                {customers.length === 0 && !loading && <p>Nenhum cliente cadastrado ainda.</p>}
                <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '15px' }}>
                    <thead>
                        <tr style={{ borderBottom: '1px solid #eee' }}>
                            <th style={{ textAlign: 'left', padding: '8px 0' }}>Nome</th>
                            <th style={{ textAlign: 'left', padding: '8px 0' }}>Email</th>
                            <th style={{ textAlign: 'left', padding: '8px 0' }}>Telefone</th>
                            <th style={{ textAlign: 'left', padding: '8px 0' }}>Última Visita</th>
                            <th style={{ textAlign: 'left', padding: '8px 0' }}>Agendamentos</th>
                        </tr>
                    </thead>
                    <tbody>
                        {customers.map(customer => (
                            <tr key={customer.id} style={{ borderBottom: '1px solid #eee' }}>
                                <td style={{ padding: '8px 0' }}>{customer.name}</td>
                                <td style={{ padding: '8px 0' }}>{customer.email || 'N/A'}</td>
                                <td style={{ padding: '8px 0' }}>{customer.phone || 'N/A'}</td>
                                <td style={{ padding: '8px 0' }}>{customer.lastVisit || 'N/A'}</td> 
                                <td style={{ padding: '8px 0' }}>{customer.appointments || 0}</td> 
                            </tr>
                        ))}
                    </tbody>
                </table>
            </Card>
        </div>
    );
};

export default CustomerPage;
