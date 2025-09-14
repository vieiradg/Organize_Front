import React, { useState, useEffect } from 'react';
import Card from '../../../components/UI/Card/Card';
import Input from '../../../components/UI/Input/Input';
import Button from '../../../components/UI/Button/Button';
import Modal from '../../../components/UI/Modal/Modal';
import api from '../../../services/api.js';

const EditarIcone = () => ( <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg> );
const DeletarIcone = () => ( <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg> );

export default function EquipePage() {
    const [team, setTeam] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [formData, setFormData] = useState({ name: '', role: '' });
    const [establishmentId, setEstablishmentId] = useState('');
    const [userId, setUserId] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [selectedMember, setSelectedMember] = useState(null);

    useEffect(() => {
        const storedEstablishmentId = localStorage.getItem('establishmentId');
        const storedUserId = localStorage.getItem('userId');
        
        if (storedEstablishmentId && storedUserId) {
            setEstablishmentId(storedEstablishmentId);
            setUserId(storedUserId);
            fetchTeam(storedEstablishmentId);
        } else {
            setError('ID do estabelecimento ou usuário não encontrado. Faça login novamente.');
        }
    }, []);

    const fetchTeam = async (id) => {
        if (!id) return;
        setLoading(true);
        setError(null);
        try {
            const response = await api.get(`/api/establishments/${id}/employees`);
            setTeam(response.data);
        } catch (err) {
            console.error('Erro ao buscar a equipe:', err);
            setError('Erro ao carregar a equipe. Verifique a conexão com a API.');
        } finally {
            setLoading(false);
        }
    };
    
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSaveMember = async (e) => {
        e.preventDefault();
        if (!establishmentId || !userId) {
            setError('Dados de autenticação incompletos. Faça login novamente.');
            return;
        }

        setLoading(true);
        setError(null);

        const requestBody = {
            name: formData.name,
            role: formData.role,
            userId: userId,
            establishmentId: establishmentId,
        };
        
        try {
            if (selectedMember) {
                await api.put(`/api/establishments/${establishmentId}/employees/${selectedMember.id}`, requestBody);
            } else {
                await api.post(`/api/establishments/${establishmentId}/employees`, requestBody);
            }
            setFormData({ name: '', role: '' });
            fetchTeam(establishmentId);
            closeModal();
        } catch (err) {
            console.error('Erro ao salvar membro:', err);
            setError('Erro ao salvar membro. Verifique os dados e as permissões.');
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteMember = async (memberId) => {
        if (!establishmentId) {
            setError('ID do estabelecimento não encontrado. Não é possível deletar.');
            return;
        }

        if (window.confirm('Tem certeza que deseja deletar este membro?')) {
            try {
                await api.delete(`/api/establishments/${establishmentId}/employees/${memberId}`);
                fetchTeam(establishmentId);
            } catch (err) {
                console.error('Erro ao deletar membro:', err);
                setError('Falha ao deletar o membro.');
            }
        }
    };

    const openModal = (member = null) => {
        setSelectedMember(member);
        if (member) {
            setFormData({
                name: member.name || '',
                role: member.role || '',
            });
        } else {
            setFormData({ name: '', role: '' });
        }
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setSelectedMember(null);
        setFormData({ name: '', role: '' });
    };

    return (
        <div>
            <h1 className="titulo-secao-dashboard">Gerir Equipe</h1>
            
            <Card style={{ marginBottom: '1.5rem' }}>
                <h3 className="widget-titulo">Adicionar Novo Membro</h3>
                <form onSubmit={handleSaveMember} className="add-item-form">
                    <div className="form-row">
                        <div className="form-group">
                            <Input
                                type="text"
                                name="name"
                                placeholder="Nome do Membro"
                                value={formData.name}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <Input
                                type="text"
                                name="role"
                                placeholder="Função (ex: Cabeleireiro)"
                                value={formData.role}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                    </div>
                    <Button type="submit" disabled={loading}>
                        {loading ? 'A Adicionar...' : 'Adicionar Membro'}
                    </Button>
                </form>
            </Card>

            <Card>
                <h3 className="widget-titulo">Membros da Equipe</h3>
                {error && <p className="error-message">{error}</p>}
                <div className="table-container">
                    <table className="dashboard-table">
                        <thead>
                            <tr>
                                <th>Nome</th>
                                <th>Função</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr>
                                    <td colSpan="3">A carregar equipe...</td>
                                </tr>
                            ) : team.length > 0 ? (
                                team.map(member => (
                                    <tr key={member.id}>
                                        <td>{member.name}</td>
                                        <td>{member.role}</td>
                                        <td className="actions-cell">
                                            <button className="action-button icon-button" onClick={() => openModal(member)}>
                                                <EditarIcone />
                                            </button>
                                            <button className="action-button icon-button delete" onClick={() => handleDeleteMember(member.id)}>
                                                <DeletarIcone />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="3">Nenhum membro na equipe ainda.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </Card>
            
            {showModal && (
                <Modal onClose={closeModal}>
                    <h2>{selectedMember ? 'Editar Membro' : 'Adicionar Membro'}</h2>
                    <form onSubmit={handleSaveMember} className="add-item-form">
                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="name">Nome</label>
                                <Input id="name" name="name" type="text" placeholder="Nome do Membro" value={formData.name} onChange={handleInputChange} required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="role">Função</label>
                                <Input id="role" name="role" type="text" placeholder="Função" value={formData.role} onChange={handleInputChange} required />
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