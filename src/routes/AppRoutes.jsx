import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import DashboardLayout from '../layouts/DashboardLayout';
import LandingPage from '../features/landing/pages/LandingPage';
import LoginPage from '../features/auth/pages/LoginPage';
import RegisterPage from '../features/auth/pages/RegisterPage';
import ForgotPasswordPage from '../features/auth/pages/ForgotPasswordPage';
import ResetPasswordPage from '../features/auth/pages/ResetPasswordPage';
import DashboardPage from '../features/dashboard/pages/DashboardPage';
import AgendaPage from '../features/agenda/pages/AgendaPage';
import CustomerPage from '../features/customer/pages/CustomerPage';
import ServicePage from '../features/products/pages/ServicePage';
import FinanceiroPage from '../features/financeiro/pages/FinanceiroPage';
import ConfiguracoesPage from '../features/configuracoes/pages/ConfiguracoesPage';
import EquipePage from '../features/equipe/pages/EquipePage';


import '../features/auth/Auth.css';
import '../layouts/DashboardLayout.css';
import FaleConosco from '../features/landing/pages/Contato';

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route path="/faleConosco" element={<FaleConosco />} />

        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/agenda" element={<AgendaPage />} />
          <Route path="/customers" element={<CustomerPage />} />
          <Route path="/services" element={<ServicePage />} />
          <Route path="/financeiro" element={<FinanceiroPage />} />
          <Route path="/configuracoes" element={<ConfiguracoesPage />} />
          <Route path="/equipe" element={<EquipePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
