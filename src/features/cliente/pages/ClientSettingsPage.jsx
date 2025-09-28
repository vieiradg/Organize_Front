import React, { useState } from 'react';
import Card from '../../../components/UI/Card/Card';
import Input from '../../../components/UI/Input/Input';
import Button from '../../../components/UI/Button/Button';

export default function ConfiguracoesPage() {
  const [profileData, setProfileData] = useState({
    fullName: 'Cliente Teste',
    email: 'cliente@exemplo.com',
    role: 'Cliente',
  });

  const [passwordData, setPasswordData] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const handleProfileChange = (e) => {
    const { id, value } = e.target;
    setProfileData((prev) => ({ ...prev, [id]: value }));
  };

  const handlePasswordChange = (e) => {
    const { id, value } = e.target;
    setPasswordData((prev) => ({ ...prev, [id]: value }));
  };

  const handleUpdateInfo = async (e) => {
    e.preventDefault();
    alert('Informações atualizadas (mock)!');
  };

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert('As novas senhas não coincidem!');
      return;
    }
    alert('Senha atualizada (mock)!');
    setPasswordData({ oldPassword: '', newPassword: '', confirmPassword: '' });
  };

  return (
    <div>
      <h1 className="titulo-secao-dashboard">Configurações do Perfil</h1>

      <Card className="profile-header-card">
        <div className="profile-header">
          <div className="avatar-large">CL</div>
          <div>
            <h2 className="profile-name">{profileData.fullName}</h2>
            <p className="profile-details">{profileData.email}</p>
            <p className="profile-details">{profileData.role}</p>
          </div>
        </div>
      </Card>

      <div className="config-grid">
        {/* Atualizar dados */}
        <Card>
          <form onSubmit={handleUpdateInfo} className="add-item-form">
            <h3 className="widget-titulo">Atualizar Informações</h3>
            <div className="form-group">
              <label htmlFor="fullName">Nome Completo</label>
              <Input
                id="fullName"
                type="text"
                value={profileData.fullName}
                onChange={handleProfileChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <Input
                id="email"
                type="email"
                value={profileData.email}
                onChange={handleProfileChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="role">Perfil</label>
              <Input
                id="role"
                type="text"
                value={profileData.role}
                onChange={handleProfileChange}
              />
            </div>
            <Button type="submit">Salvar Informações</Button>
          </form>
        </Card>

        {/* Alterar senha */}
        <Card>
          <form onSubmit={handleUpdatePassword} className="add-item-form">
            <h3 className="widget-titulo">Alterar Senha</h3>
            <div className="form-group">
              <label htmlFor="oldPassword">Senha Antiga</label>
              <Input
                id="oldPassword"
                type="password"
                value={passwordData.oldPassword}
                onChange={handlePasswordChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="newPassword">Nova Senha</label>
              <Input
                id="newPassword"
                type="password"
                value={passwordData.newPassword}
                onChange={handlePasswordChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirmar Nova Senha</label>
              <Input
                id="confirmPassword"
                type="password"
                value={passwordData.confirmPassword}
                onChange={handlePasswordChange}
              />
            </div>
            <Button type="submit">Alterar Senha</Button>
          </form>
        </Card>
      </div>
    </div>
  );
}
