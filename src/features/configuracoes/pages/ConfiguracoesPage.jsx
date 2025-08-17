import React, { useState } from 'react';
import Card from '../../../components/UI/Card/Card';
import Input from '../../../components/UI/Input/Input';
import Button from '../../../components/UI/Button/Button';

export default function ConfiguracoesPage() {
    const [profileData, setProfileData] = useState({
        fullName: 'Diego Vieira Diniz',
        email: 'diegorusty40@gmail.com',
        role: 'Desenvolvedor Fullstack'
    });

    const [passwordData, setPasswordData] = useState({
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
    });

    const handleProfileChange = (e) => {
        const { id, value } = e.target;
        setProfileData(prev => ({ ...prev, [id]: value }));
    };

    const handlePasswordChange = (e) => {
        const { id, value } = e.target;
        setPasswordData(prev => ({ ...prev, [id]: value }));
    };

    const handleUpdateInfo = (e) => {
        e.preventDefault();
        console.log("Atualizando informações:", profileData);
        alert('Informações atualizadas com sucesso!');
    };

    const handleUpdatePassword = (e) => {
        e.preventDefault();
        if (passwordData.newPassword !== passwordData.confirmPassword) {
            alert("As novas senhas não coincidem!");
            return;
        }

        console.log("Atualizando senha...");
        alert('Senha atualizada com sucesso!');
        setPasswordData({ oldPassword: '', newPassword: '', confirmPassword: '' });
    };

    return (
        <div>
            <h1 className="titulo-secao-dashboard">Configurações do Perfil</h1>
          
            <Card className="profile-header-card">
                <div className="profile-header">
                    <div className="avatar-large">DN</div>
                    <div>
                        <h2 className="profile-name">{profileData.fullName}</h2>
                        <p className="profile-details">{profileData.email}</p>
                        <p className="profile-details">{profileData.role}</p>
                    </div>
                </div>
            </Card>

           
            <div className="config-grid">
                <Card>
                    <form onSubmit={handleUpdateInfo} className="add-item-form">
                        <h3 className="widget-titulo">Atualizar Informações</h3>
                        <div className="form-group">
                            <label htmlFor="fullName">Nome Completo</label>
                            <Input id="fullName" name="fullName" type="text" value={profileData.fullName} onChange={handleProfileChange} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <Input id="email" name="email" type="email" value={profileData.email} onChange={handleProfileChange} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="role">Tipo de Profissional</label>
                            <Input id="role" name="role" type="text" value={profileData.role} onChange={handleProfileChange} />
                        </div>
                        <Button type="submit">Salvar Informações</Button>
                    </form>
                </Card>

            
                <Card>
                    <form onSubmit={handleUpdatePassword} className="add-item-form">
                        <h3 className="widget-titulo">Alterar Senha</h3>
                        <div className="form-group">
                            <label htmlFor="oldPassword">Senha Antiga</label>
                            <Input id="oldPassword" name="oldPassword" type="password" placeholder="••••••••" value={passwordData.oldPassword} onChange={handlePasswordChange} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="newPassword">Nova Senha</label>
                            <Input id="newPassword" name="newPassword" type="password" placeholder="••••••••" value={passwordData.newPassword} onChange={handlePasswordChange} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="confirmPassword">Confirmar Nova Senha</label>
                            <Input id="confirmPassword" name="confirmPassword" type="password" placeholder="••••••••" value={passwordData.confirmPassword} onChange={handlePasswordChange} />
                        </div>
                        <Button type="submit">Alterar Senha</Button>
                    </form>
                </Card>
            </div>
        </div>
    );
};
