import React, { useState, useEffect } from 'react';
import Card from '../../../components/UI/Card/Card';
import Input from '../../../components/UI/Input/Input';
import Button from '../../../components/UI/Button/Button';
import api from '../../../services/api'; 

export default function ConfiguracoesPage() {

  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    phone: '',
  });

  const [passwordData, setPasswordData] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState({ message: '', type: '' });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await api.get('/api/me');
        setProfileData(response.data);
      } catch (err) {
        console.error("Falha ao buscar dados do perfil", err);
        setNotification({ message: 'Não foi possível carregar seus dados.', type: 'error' });
      }
    };

    fetchProfile();
  }, []); 

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
    setLoading(true);
    setNotification({ message: '', type: '' });
    
    try {
      await api.put('/api/me', {
        name: profileData.name,
        email: profileData.email,
      });
      setNotification({ message: 'Informações atualizadas com sucesso!', type: 'success' });
    } catch (err) {
      console.error(err);
      const errorMessage = err.response?.data?.message || 'Falha ao atualizar informações.';
      setNotification({ message: errorMessage, type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setNotification({ message: "As novas senhas não coincidem!", type: 'error' });
      return;
    }
    setLoading(true);
    setNotification({ message: '', type: '' });

    try {
      await api.put('/api/me/password', {
        oldPassword: passwordData.oldPassword,
        newPassword: passwordData.newPassword,
      });
      setNotification({ message: 'Senha atualizada com sucesso!', type: 'success' });
      setPasswordData({ oldPassword: '', newPassword: '', confirmPassword: '' });
    } catch (err) {
      console.error(err);
      const errorMessage = err.response?.data?.message || 'Falha ao atualizar senha. Verifique sua senha antiga.';
      setNotification({ message: errorMessage, type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const Notification = () => {
    if (!notification.message) return null;
    const notificationStyle = {
      padding: '10px',
      margin: '10px 0',
      borderRadius: '5px',
      color: 'white',
      textAlign: 'center',
      backgroundColor: notification.type === 'success' ? '#28a745' : '#dc3545',
    };
    return <div style={notificationStyle}>{notification.message}</div>;
  };

  return (
    <div>
      <h1 className="titulo-secao-dashboard">Configurações do Perfil</h1>

      <Card className="profile-header-card">
        <div className="profile-header">
          <div className="avatar-large">{profileData.name.charAt(0)}</div>
          <div>
            <h2 className="profile-name">{profileData.name}</h2>
            <p className="profile-details">{profileData.email}</p>
            <p className="profile-details">Cliente</p> 
          </div>
        </div>
      </Card>

      <Notification />

      <div className="config-grid">
        <Card>
          <form onSubmit={handleUpdateInfo} className="add-item-form">
            <h3 className="widget-titulo">Atualizar Informações</h3>
            <div className="form-group">
              <label htmlFor="name">Nome Completo</label>
              <Input
                id="name"
                type="text"
                value={profileData.name}
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
            <Button type="submit" disabled={loading}>
              {loading ? 'Salvando...' : 'Salvar Informações'}
            </Button>
          </form>
        </Card>

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
            <Button type="submit" disabled={loading}>
              {loading ? 'Alterando...' : 'Alterar Senha'}
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
}