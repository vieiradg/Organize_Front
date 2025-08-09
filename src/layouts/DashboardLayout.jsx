import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  FiHome,
  FiCalendar,
  FiUsers,
  FiBriefcase,
  FiDollarSign,
  FiSettings,
} from 'react-icons/fi';

const DashboardLayout = ({ children }) => {
  return (
    <div style={{
      display: 'flex',
      height: '100vh',
      backgroundColor: 'var(--primary-background)',
      width:'100%'
    }}>
      <div style={{
        width: '250px',
        backgroundColor: 'var(--sidebar-background)',
        color: 'var(--text-sidebar)',
        padding: '20px',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}>
        <h2 style={{ color: 'var(--text-sidebar)', marginTop: '0' }}>Organize</h2>
        <nav style={{ width: '100%', marginTop: '30px' }}>
          <ul style={{ listStyle: 'none', padding: '0' }}>
            <li style={{ marginBottom: '10px' }}>
              <NavLink to="/dashboard" style={{ textDecoration: 'none', color: 'var(--text-sidebar)', padding: '10px', display: 'flex', alignItems: 'center', borderRadius: '5px' }} className={({ isActive }) => isActive ? 'active-nav-link' : ''}>
                <FiHome style={{ marginRight: '10px' }} />
                Dashboard
              </NavLink>
            </li>
            <li style={{ marginBottom: '10px' }}>
              <NavLink to="/agenda" style={{ textDecoration: 'none', color: 'var(--text-sidebar)', padding: '10px', display: 'flex', alignItems: 'center', borderRadius: '5px' }} className={({ isActive }) => isActive ? 'active-nav-link' : ''}>
                <FiCalendar style={{ marginRight: '10px' }} />
                Agenda
              </NavLink>
            </li>
            <li style={{ marginBottom: '10px' }}>
              <NavLink to="/customers" style={{ textDecoration: 'none', color: 'var(--text-sidebar)', padding: '10px', display: 'flex', alignItems: 'center', borderRadius: '5px' }} className={({ isActive }) => isActive ? 'active-nav-link' : ''}>
                <FiUsers style={{ marginRight: '10px' }} />
                Clientes
              </NavLink>
            </li>
            <li style={{ marginBottom: '10px' }}>
              <NavLink to="/services" style={{ textDecoration: 'none', color: 'var(--text-sidebar)', padding: '10px', display: 'flex', alignItems: 'center', borderRadius: '5px' }} className={({ isActive }) => isActive ? 'active-nav-link' : ''}>
                <FiBriefcase style={{ marginRight: '10px' }} />
                Serviços
              </NavLink>
            </li>
            <li style={{ marginBottom: '10px' }}>
              <NavLink to="/financeiro" style={{ textDecoration: 'none', color: 'var(--text-sidebar)', padding: '10px', display: 'flex', alignItems: 'center', borderRadius: '5px' }} className={({ isActive }) => isActive ? 'active-nav-link' : ''}>
                <FiDollarSign style={{ marginRight: '10px' }} />
                Financeiro
              </NavLink>
            </li>
            <li style={{ marginBottom: '10px' }}>
              <NavLink to="/configuracoes" style={{ textDecoration: 'none', color: 'var(--text-sidebar)', padding: '10px', display: 'flex', alignItems: 'center', borderRadius: '5px' }} className={({ isActive }) => isActive ? 'active-nav-link' : ''}>
                <FiSettings style={{ marginRight: '10px' }} />
                Configurações
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
      <div style={{
        flexGrow: 1,
        padding: '20px',
        boxSizing: 'border-box',
        overflowY: 'auto'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '20px',
          paddingBottom: '10px',
          borderBottom: '1px solid #eee'
        }}>
          <h1 style={{ margin: 0, fontSize: '24px' }}>Olá, Aline!</h1>
          <div style={{
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            backgroundColor: 'var(--highlight-orange)',
            color: 'white',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            fontWeight: 'bold'
          }}>AS</div>
        </div>

        <div>
          {children}
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
