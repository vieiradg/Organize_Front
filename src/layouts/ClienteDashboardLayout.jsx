import React, { useEffect, useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import './DashboardLayout.css';

const CalendarioIcone = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icone"><path d="M8 2v4"></path><path d="M16 2v4"></path><rect width="18" height="18" x="3" y="4" rx="2"></rect><path d="M3 10h18"></path></svg>
);

const ConfigIcone = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icone"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.44.25a2 2 0 0 0-2 0l-.18-.08a2 2 0 0 0-2.61.73l-.4.63a2 2 0 0 0 .73 2.61l.18.08a2 2 0 0 1 1 1.73l-.44.25a2 2 0 0 0-1 1.73v.18a2 2 0 0 0 2 2l.44-.25a2 2 0 0 1 1-1.73l.44-.25a2 2 0 0 0 2 0l.18.08a2 2 0 0 0 2.61-.73l.4-.63a2 2 0 0 0-.73-2.61l-.18-.08a2 2 0 0 1-1-1.73l.44-.25a2 2 0 0 0 1-1.73v-.18a2 2 0 0 0-2-2z"></path><circle cx="12" cy="12" r="3"></circle></svg>
);

const SairIcone = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icone"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
);

export default function ClienteDashboardLayout() {
  const [userName, setUserName] = useState('Cliente');
  const navigate = useNavigate();

  useEffect(() => {
    const nome = localStorage.getItem('userName');
    if (nome) setUserName(nome);
  }, []);

  const getInitials = (name) => {
    if (!name) return 'CL';
    const names = name.split(' ');
    return names.length === 1
      ? names[0].charAt(0).toUpperCase()
      : (names[0].charAt(0) + names[names.length - 1].charAt(0)).toUpperCase();
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login', { replace: true });
  };

  return (
    <div className="container-dashboard">
      <aside className="barra-lateral">
        <div className="logo-app">Organize</div>
        <nav className="menu-lateral">
          <NavLink to="/cliente" className={({ isActive }) => isActive ? 'link-menu-lateral ativo' : 'link-menu-lateral'}>
            <CalendarioIcone />
            <span>Agendamentos</span>
          </NavLink>
          <NavLink to="/cliente/configuracoes" className={({ isActive }) => isActive ? 'link-menu-lateral ativo' : 'link-menu-lateral'}>
            <ConfigIcone />
            <span>Configurações</span>
          </NavLink>
          <button onClick={handleLogout} className="link-menu-lateral link-sair">
            <SairIcone />
            <span>Sair</span>
          </button>
        </nav>
      </aside>

      <div className="conteudo-principal-dashboard">
        <header className="cabecalho-dashboard">
          <div className="saudacao">Olá, {userName}!</div>
          <div className="seletor-perfil">
            <div className="avatar">{getInitials(userName)}</div>
          </div>
        </header>

        <main className="secao-principasl-dashboard">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
