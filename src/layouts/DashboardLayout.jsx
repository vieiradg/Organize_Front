import React, { useState, useEffect } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import './DashboardLayout.css'; 

// Ícones
const GraficoIcone = () => ( <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icone"><path d="M12 20V10"></path><path d="M18 20V4"></path><path d="M6 20v-4"></path></svg> );
const CalendarioIcone = () => ( <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icone"><path d="M8 2v4"></path><path d="M16 2v4"></path><rect width="18" height="18" x="3" y="4" rx="2"></rect><path d="M3 10h18"></path></svg> );
const UsuariosIcone = () => ( <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icone"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M22 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg> );
const LapisIcone = () => ( <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icone"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path></svg> );
const EquipeIcone = () => ( <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icone"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg> );
const DinheiroIcone = () => ( <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icone"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg> );
const ConfigIcone = () => ( <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icone"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.44.25a2 2 0 0 0-2 0l-.18-.08a2 2 0 0 0-2.61.73l-.4.63a2 2 0 0 0 .73 2.61l.18.08a2 2 0 0 1 1 1.73l-.44.25a2 2 0 0 0-1 1.73v.18a2 2 0 0 0 2 2l.44-.25a2 2 0 0 1 1-1.73l.44-.25a2 2 0 0 0 2 0l.18.08a2 2 0 0 0 2.61-.73l.4-.63a2 2 0 0 0-.73-2.61l-.18-.08a2 2 0 0 1-1-1.73l.44-.25a2 2 0 0 0 1-1.73v-.18a2 2 0 0 0-2-2z"></path><circle cx="12" cy="12" r="3"></circle></svg> );
const SairIcone = () => ( <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icone"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg> );

export default function DashboardLayout() {
    const [userName, setUserName] = useState('Usuário');
    const navigate = useNavigate();

    useEffect(() => {
        const storedUserName = localStorage.getItem('userName');
        if (storedUserName) {
            setUserName(storedUserName);
        }
    }, []);

    const getInitials = (name) => {
        if (!name) return 'DN';
        const names = name.split(' ');
        if (names.length === 1) {
            return names[0].charAt(0).toUpperCase();
        }
        return (names[0].charAt(0) + names[names.length - 1].charAt(0)).toUpperCase();
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userName');
        localStorage.removeItem('establishmentId');
        localStorage.removeItem('userId');
        navigate('/login', { replace: true });
    };

    return (
        <div className="container-dashboard">
            <aside className="barra-lateral">
                <div className="logo-app">Organize</div>
                <nav className="menu-lateral">
                    <NavLink to="/dashboard" className={({ isActive }) => isActive ? 'link-menu-lateral ativo' : 'link-menu-lateral'}>
                        <GraficoIcone />
                        <span>Dashboard</span>
                    </NavLink>
                    <NavLink to="/establishment" className={({ isActive }) => isActive ? 'link-menu-lateral ativo' : 'link-menu-lateral'}>
                         <ConfigIcone />
                         <span>Estabelecimento</span>
                    </NavLink>
                    <NavLink to="/agenda" className={({ isActive }) => isActive ? 'link-menu-lateral ativo' : 'link-menu-lateral'}>
                        <CalendarioIcone />
                        <span>Agenda</span>
                    </NavLink>
                    <NavLink to="/customers" className={({ isActive }) => isActive ? 'link-menu-lateral ativo' : 'link-menu-lateral'}>
                        <UsuariosIcone />
                        <span>Clientes</span>
                    </NavLink>
                    <NavLink to="/services" className={({ isActive }) => isActive ? 'link-menu-lateral ativo' : 'link-menu-lateral'}>
                        <LapisIcone />
                        <span>Serviços</span>
                    </NavLink>
                    <NavLink to="/equipe" className={({ isActive }) => isActive ? 'link-menu-lateral ativo' : 'link-menu-lateral'}>
                        <EquipeIcone />
                        <span>Equipe</span>
                    </NavLink>
                    <NavLink to="/financeiro" className={({ isActive }) => isActive ? 'link-menu-lateral ativo' : 'link-menu-lateral'}>
                        <DinheiroIcone />
                        <span>Financeiro</span>
                    </NavLink>
                    <NavLink to="/configuracoes" className={({ isActive }) => isActive ? 'link-menu-lateral ativo' : 'link-menu-lateral'}>
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

                <main className="secao-principal-dashboard">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}