import React, { useState } from 'react';
import api from '../../../services/api';

import Button from '../../../components/UI/Button/Button'; 
import Input from '../../../components/UI/Input/Input';

export default function AddClientForm({ onClientAdded, onClose }) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [privateNotes, setPrivateNotes] = useState('');
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsSubmitting(true);

        const establishmentId = localStorage.getItem('establishmentId');

        try {

            const response = await api.post(`/api/establishments/${establishmentId}/clients`, {
                name,
                email,
                phone,
                privateNotes,
            });
            
            onClientAdded(response.data); 
            onClose(); 

        } catch (err) {
            setError(err.response?.data?.message || 'Erro ao criar a ficha. Verifique os dados.');
            console.error(err);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            {error && <p className="error-message" style={{ marginBottom: '1rem' }}>{error}</p>}
            
            <div className="form-group">
                <label htmlFor="name">Nome Completo:</label>
                <Input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Nome do cliente"
                    required
                />
            </div>

            <div className="form-group">
                <label htmlFor="email">Email:</label>
                <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email do cliente"
                    required
                />
            </div>

            <div className="form-group">
                <label htmlFor="phone">Telefone:</label>
                <Input
                    id="phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Telefone será a senha inicial"
                    required
                />
            </div>

            <div className="form-group">
                <label htmlFor="privateNotes">Anotações Privadas:</label>
                <Input
                    as="textarea" 
                    id="privateNotes"
                    value={privateNotes}
                    onChange={(e) => setPrivateNotes(e.target.value)}
                    placeholder="Adicione observações sobre o cliente (opcional)..."
                    rows="4"
                />
            </div>
            
            <div className="modal-actions">
                 <Button type="button" variant="secondary" onClick={onClose}>Cancelar</Button>
                 <Button type="submit" disabled={isSubmitting}>
                     {isSubmitting ? 'Salvando...' : 'Criar e Adicionar Cliente'}
                 </Button>
            </div>
        </form>
    );
}