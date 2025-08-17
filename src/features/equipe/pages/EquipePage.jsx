import React, { useState, useEffect } from 'react';
import Card from '../../../components/UI/Card/Card';
import Input from '../../../components/UI/Input/Input';
import Button from '../../../components/UI/Button/Button';

const EditarIcone = () => ( <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg> );
const DeletarIcone = () => ( <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg> );

export default function EquipePage() {
    const [team, setTeam] = useState([
        { id: 1, name: 'Ana Melo', role: 'Barbeira', commission: '40%' },
        { id: 2, name: 'João Batista', role: 'Manicure', commission: '50%' },
    ]);
    const [showModal, setShowModal] = useState(false);
    const [selectedMember, setSelectedMember] = useState(null);
    const [formData, setFormData] = useState({ name: '', role: '', commission: '' });

    return (
        <div>
            <h1 className="titulo-secao-dashboard">Gerir Equipa</h1>

            <Card style={{ marginBottom: '1.5rem' }}>
                <h3 className="widget-titulo">Adicionar Novo Membro</h3>
                <form className="add-item-form">
                    <div className="form-row">
                        <div className="form-group">
                            <Input type="text" placeholder="Nome do Membro" required />
                        </div>
                        <div className="form-group">
                            <Input type="text" placeholder="Função (ex: Barbeiro)" required />
                        </div>
                        <div className="form-group">
                            <Input type="text" placeholder="Comissão (ex: 40%)" required />
                        </div>
                    </div>
                    <Button type="submit">Adicionar Membro</Button>
                </form>
            </Card>

            <Card>
                <h3 className="widget-titulo">Membros da Equipa</h3>
                <div className="table-container">
                    <table className="dashboard-table">
                        <thead>
                            <tr>
                                <th>Nome</th>
                                <th>Função</th>
                                <th>Comissão</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {team.map(member => (
                                <tr key={member.id}>
                                    <td>{member.name}</td>
                                    <td>{member.role}</td>
                                    <td>{member.commission}</td>
                                    <td className="actions-cell">
                                        <button className="action-button icon-button"><EditarIcone /></button>
                                        <button className="action-button icon-button delete"><DeletarIcone /></button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>
        </div>
    );
};
