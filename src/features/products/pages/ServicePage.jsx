import React, { useState, useEffect } from 'react';
import api from '@services/api.js';
import Card from '../../../components/UI/Card/Card';
import Input from '../../../components/UI/Input/Input';
import Button from '../../../components/UI/Button/Button';

const ServicePage = () => {
    const [services, setServices] = useState([]);
    const [newServiceName, setNewServiceName] = useState('');
    const [newServicePrice, setNewServicePrice] = useState('');
    const [newServiceDuration, setNewServiceDuration] = useState('');
    const [newServiceImageUrl, setNewServiceImageUrl] = useState(''); 
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchServices = async () => {
        setLoading(true);
        try {
            const response = await api.get('/api/services');
            setServices(response.data);
        } catch (err) {
            console.error('Erro ao buscar serviços:', err);
            setError('Erro ao carregar serviços.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchServices();
    }, []);

    const handleAddService = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        try {
            await api.post('/api/services', {
                name: newServiceName,
                price: parseFloat(newServicePrice),
                duration: parseInt(newServiceDuration),
                imageUrl: newServiceImageUrl,
            });
            setNewServiceName('');
            setNewServicePrice('');
            setNewServiceDuration('');
            setNewServiceImageUrl('');
            fetchServices();
        } catch (err) {
            console.error('Erro ao adicionar serviço:', err);
            setError('Erro ao adicionar serviço. Verifique os dados.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h1>Gerenciar Serviços</h1>

            <Card>
                <h3>Adicionar Novo Serviço</h3>
                <form onSubmit={handleAddService}>
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                    <Input 
                        type="text" 
                        placeholder="Nome do Serviço" 
                        value={newServiceName}
                        onChange={(e) => setNewServiceName(e.target.value)}
                        required
                    />
                    <Input 
                        type="number" 
                        placeholder="Duração (minutos)" 
                        value={newServiceDuration}
                        onChange={(e) => setNewServiceDuration(e.target.value)}
                        required
                    />
                    <Input 
                        type="number" 
                        step="0.01"
                        placeholder="Preço (R$)" 
                        value={newServicePrice}
                        onChange={(e) => setNewServicePrice(e.target.value)}
                        required
                    />
                    <Input 
                        type="text" 
                        placeholder="URL da Foto do Serviço" 
                        value={newServiceImageUrl}
                        onChange={(e) => setNewServiceImageUrl(e.target.value)}
                    />
                    <Button type="submit" disabled={loading}>
                        {loading ? 'Adicionando...' : 'Adicionar Serviço'}
                    </Button>
                </form>
            </Card>

            <Card>
                <h3>Serviços Oferecidos</h3>
                {loading && <p>Carregando serviços...</p>}
                {services.length === 0 && !loading && <p>Nenhum serviço cadastrado ainda.</p>}
                <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '15px' }}>
                    <thead>
                        <tr style={{ borderBottom: '1px solid #eee' }}>
                            <th style={{ textAlign: 'left', padding: '8px 0' }}>Foto</th>
                            <th style={{ textAlign: 'left', padding: '8px 0' }}>Serviço</th>
                            <th style={{ textAlign: 'left', padding: '8px 0' }}>Duração</th>
                            <th style={{ textAlign: 'left', padding: '8px 0' }}>Preço</th>
                            <th style={{ textAlign: 'left', padding: '8px 0' }}>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {services.map(service => (
                            <tr key={service.id} style={{ borderBottom: '1px solid #eee' }}>
                                <td style={{ padding: '8px 0' }}>
                                    {service.imageUrl ? (
                                        <img src={service.imageUrl} alt={service.name} style={{ width: '50px', height: '50px', borderRadius: '5px', objectFit: 'cover' }} />
                                    ) : (
                                        <div style={{ width: '50px', height: '50px', backgroundColor: '#ccc', borderRadius: '5px', display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#666' }}>No Img</div>
                                    )}
                                </td>
                                <td style={{ padding: '8px 0' }}>{service.name}</td>
                                <td style={{ padding: '8px 0' }}>{service.duration} min</td>
                                <td style={{ padding: '8px 0' }}>R$ {service.price ? service.price.toFixed(2) : '0.00'}</td>
                                <td style={{ padding: '8px 0' }}>
                                    <span style={{ cursor: 'pointer', marginRight: '10px' }}>✏️</span>
                                    <span style={{ cursor: 'pointer' }}>🗑️</span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </Card>
        </div>
    );
};

export default ServicePage;
