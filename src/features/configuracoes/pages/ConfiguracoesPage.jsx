import React from 'react';
import Card from '../../../components/UI/Card/Card';
import Input from '../../../components/UI/Input/Input';
import Button from '../../../components/UI/Button/Button';

const ConfiguracoesPage = () => {
  return (
    <div>
      <h1>Configurações do Perfil</h1>
      <Card>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
          <div style={{
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            backgroundColor: 'var(--highlight-orange)',
            color: 'white',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            fontSize: '24px',
            fontWeight: 'bold',
            marginRight: '15px'
          }}>AS</div>
          <div>
            <h2 style={{ margin: 0 }}>Aline Barbosa</h2>
            <p style={{ margin: 0, color: 'gray' }}>aline.barbosa@email.com</p>
            <p style={{ margin: 0, color: 'gray' }}>Desenvolvedora Fullstack</p>
          </div>
        </div>

        <h3>Atualizar Informações</h3>
        <Input type="text" placeholder="Nome Completo" value="Aline Barbosa Silva" />
        <Input type="email" placeholder="Email" value="aline.barbosa@email.com" />
        <Input type="text" placeholder="Tipo de Profissional" value="Desenvolvedora Fullstack" />

        <h3>Alterar Senha</h3>
        <Input type="password" placeholder="Senha Antiga" />
        <Input type="password" placeholder="Nova Senha" />
        <Input type="password" placeholder="Confirmar Nova Senha" />

        <Button onClick={() => alert('Informações atualizadas!')}>Atualizar Informações</Button>
      </Card>
    </div>
  );
};

export default ConfiguracoesPage;
