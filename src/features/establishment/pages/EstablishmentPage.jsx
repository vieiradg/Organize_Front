import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../../services/api.js';

import Card from '../../../components/UI/Card/Card';
import Input from '../../../components/UI/Input/Input';
import Button from '../../../components/UI/Button/Button';

export default function EstablishmentPage() {
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const [establishment, setEstablishment] = useState(null); // Adicionamos um estado para o estabelecimento
    const navigate = useNavigate();

    // Efeito para carregar o ID do estabelecimento e os dados do estabelecimento
    useEffect(() => {
        const storedEstablishmentId = localStorage.getItem('establishmentId');
        if (storedEstablishmentId) {
            fetchEstablishment(storedEstablishmentId);
        }
    }, []);

    const fetchEstablishment = async (id) => {
        setLoading(true);
        setError(null);
        try {
            const response = await api.get(`/api/establishments/${id}`);
            setEstablishment(response.data);
        } catch (err) {
            console.error('Erro ao buscar estabelecimento:', err);
            setError('Erro ao carregar dados do estabelecimento. Verifique a conexão com a API.');
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const establishmentData = { name, address, phone };

        try {
            const response = await api.post('/api/establishments', establishmentData);
            
            // Salvar o ID do estabelecimento no localStorage
            localStorage.setItem('establishmentId', response.data.id);
            
            setSuccess(true);
            setTimeout(() => {
                navigate('/dashboard'); 
            }, 2000);
            
        } catch (err) {
            console.error('Erro ao criar estabelecimento:', err);
            setError('Erro ao criar estabelecimento. Verifique os dados e tente novamente.');
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <div>Carregando...</div>;
    }

    if (establishment) {
        return (
            <div>
                <h1 className="titulo-secao-dashboard">Meu Estabelecimento</h1>
                <Card>
                    <h3 className="widget-titulo">Detalhes do Estabelecimento</h3>
                    <p><strong>Nome:</strong> {establishment.name}</p>
                    <p><strong>Endereço:</strong> {establishment.address}</p>
                    <p><strong>Telefone:</strong> {establishment.contactPhone}</p>
                </Card>
            </div>
        );
    }

    return (
        <div>
            <h1 className="titulo-secao-dashboard">Criar Estabelecimento</h1>
            <Card>
                <h3 className="widget-titulo">Detalhes do Estabelecimento</h3>
                {error && <p className="error-message">{error}</p>}
                {success && <p className="success-message">Estabelecimento criado com sucesso! Redirecionando...</p>}
                <form onSubmit={handleSubmit} className="add-item-form">
                    <div className="form-group">
                        <label htmlFor="name">Nome do Estabelecimento</label>
                        <Input
                            id="name"
                            type="text"
                            placeholder="Nome do seu salão, barbearia, etc."
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="address">Endereço</label>
                        <Input
                            id="address"
                            type="text"
                            placeholder="Endereço completo"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="phone">Telefone</label>
                        <Input
                            id="phone"
                            type="text"
                            placeholder="(xx) xxxxx-xxxx"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            required
                        />
                    </div>
                    <Button type="submit" disabled={loading}>
                        {loading ? 'A Criar...' : 'Criar Estabelecimento'}
                    </Button>
                </form>
            </Card>
        </div>
    );
}