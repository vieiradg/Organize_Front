import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';

// Layout Principal
import DashboardLayout from '../layouts/DashboardLayout';

// Páginas de Autenticação
import LoginPage from '../features/auth/pages/LoginPage';
import RegisterPage from '../features/auth/pages/RegisterPage';
import ForgotPasswordPage from '../features/auth/pages/ForgotPasswordPage';
import ResetPasswordPage from '../features/auth/pages/ResetPasswordPage';

// Páginas do Dashboard
import DashboardPage from '../features/dashboard/pages/DashboardPage';
import AgendaPage from '../features/agenda/pages/AgendaPage';
import CustomerPage from '../features/customer/pages/CustomerPage';
import ServicePage from '../features/products/pages/ServicePage';
import FinanceiroPage from '../features/financeiro/pages/FinanceiroPage';
import ConfiguracoesPage from '../features/configuracoes/pages/ConfiguracoesPage';
import EquipePage from '../features/equipe/pages/EquipePage';

// Página de Marketing
import LandingPage from '../features/landing/pages/LandingPage';

// Estilos Globais
import '../features/auth/Auth.css';
import '../layouts/DashboardLayout.css';


export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rota da Landing Page (Portal) */}
        <Route path="/" element={<LandingPage />} />

        {/* Rotas de Autenticação (não usam o layout do dashboard) */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />

        {/* Rotas Protegidas que usam o Layout do Dashboard */}
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/agenda" element={<AgendaPage />} />
          <Route path="/customers" element={<CustomerPage />} />
          <Route path="/services" element={<ServicePage />} />
          <Route path="/equipe" element={<EquipePage />} />
          <Route path="/financeiro" element={<FinanceiroPage />} />
          <Route path="/configuracoes" element={<ConfiguracoesPage />} />
        </Route>
        
      </Routes>
    </BrowserRouter>
  );
}
