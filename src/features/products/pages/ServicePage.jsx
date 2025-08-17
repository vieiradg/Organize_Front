import React, { useState, useEffect } from 'react';
import api from '../../../services/api.js';

import Card from '../../../components/UI/Card/Card';
import Button from '../../../components/UI/Button/Button';
import Input from '../../../components/UI/Input/Input';
import Modal from '../../../components/UI/Modal/Modal';

const EditarIcone = () => ( <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg> );
const DeletarIcone = () => ( <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg> );

export default function ServicePage() {
    const [services, setServices] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedService, setSelectedService] = useState(null);
    const [formData, setFormData] = useState({ name: '', duration: '', price: '', imageUrl: '' });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchServices();
    }, []);

    useEffect(() => {
        if (selectedService) {
            setFormData({
                name: selectedService.name || '',
                duration: selectedService.duration || '',
                price: selectedService.price || '',
                imageUrl: selectedService.imageUrl || ''
            });
        } else {
            setFormData({ name: '', duration: '', price: '', imageUrl: '' });
        }
    }, [selectedService]);

    const fetchServices = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await api.get('/api/services');
            setServices(response.data);
        } catch (err) {
            setError('Erro ao carregar serviços.');
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSave = async (e) => {
        e.preventDefault();
        const serviceData = {
            ...formData,
            price: parseFloat(formData.price),
            duration: parseInt(formData.duration)
        };

        try {
            if (selectedService) {
                await api.put(`/api/services/${selectedService.id}`, serviceData);
            } else {
                await api.post('/api/services', serviceData);
            }
            fetchServices();
            closeModal();
        } catch (err) {
            setError("Não foi possível salvar o serviço.");
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Tem certeza que deseja apagar este serviço?')) {
            try {
                await api.delete(`/api/services/${id}`);
                fetchServices();
            } catch (err) {
                setError("Não foi possível apagar o serviço.");
            }
        }
    };
    
    const openModal = (service = null) => {
        setSelectedService(service);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setSelectedService(null);
    };

    return (
        <div>
            <div className="page-header">
                <h1 className="titulo-secao-dashboard">Gerir Serviços</h1>
                <Button onClick={() => openModal()}>Adicionar Serviço</Button>
            </div>

            <Card>
                <h3 className="widget-titulo">Serviços Oferecidos</h3>
                {error && <p className="error-message">{error}</p>}
                <div className="table-container">
                    <table className="dashboard-table">
                        <thead>
                            <tr>
                                <th>Foto</th>
                                <th>Serviço</th>
                                <th>Duração</th>
                                <th>Preço</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr><td colSpan="5">A carregar...</td></tr>
                            ) : services.map(service => (
                                <tr key={service.id}>
                                    <td><img src={service.imageUrl || 'https://placehold.co/50x50/e5e7eb/6b7280?text=Img'} alt={service.name} className="table-image" /></td>
                                    <td>{service.name}</td>
                                    <td>{service.duration} min</td>
                                    <td>R$ {service.price ? service.price.toFixed(2).replace('.', ',') : '0,00'}</td>
                                    <td className="actions-cell">
                                        <button onClick={() => openModal(service)} className="action-button icon-button"><EditarIcone /></button>
                                        <button onClick={() => handleDelete(service.id)} className="action-button icon-button delete"><DeletarIcone /></button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>

            {showModal && (
                <Modal onClose={closeModal}>
                    <h2>{selectedService ? 'Editar Serviço' : 'Adicionar Serviço'}</h2>
                    <form onSubmit={handleSave} className="add-item-form">
                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="name">Nome</label>
                                <Input id="name" name="name" type="text" placeholder="Nome do Serviço" value={formData.name} onChange={handleInputChange} required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="duration">Duração (min)</label>
                                <Input id="duration" name="duration" type="number" placeholder="60" value={formData.duration} onChange={handleInputChange} required />
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="price">Preço (R$)</label>
                                <Input id="price" name="price" type="number" step="0.01" placeholder="150.00" value={formData.price} onChange={handleInputChange} required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="imageUrl">URL da Foto</label>
                                <Input id="imageUrl" name="imageUrl" type="text" placeholder="https://..." value={formData.imageUrl} onChange={handleInputChange} />
                            </div>
                        </div>
                        <div className="modal-actions">
                            <Button onClick={closeModal} type="secondary">Cancelar</Button>
                            <Button type="submit">Salvar</Button>
                        </div>
                    </form>
                </Modal>
            )}
        </div>
    );
};
