import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from '../features/auth/pages/LoginPage';
import RegisterPage from '../features/auth/pages/RegisterPage';
import ForgotPasswordPage from '../features/auth/pages/ForgotPasswordPage';
import ResetPasswordPage from '../features/auth/pages/ResetPasswordPage';
import AgendaPage from '../features/agenda/pages/AgendaPage';
import CustomerPage from '../features/customer/pages/CustomerPage';
import ServicePage from '../features/products/pages/ServicePage';
import DashboardLayout from '../layouts/DashboardLayout';
import DashboardPage from '../features/dashboard/pages/DashboardPage';
import FinanceiroPage from '../features/financeiro/pages/FinanceiroPage';
import ConfiguracoesPage from '../features/configuracoes/pages/ConfiguracoesPage';

function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route path="/agenda" element={<DashboardLayout><AgendaPage /></DashboardLayout>} />
        <Route path="/customers" element={<DashboardLayout><CustomerPage /></DashboardLayout>} />
        <Route path="/services" element={<DashboardLayout><ServicePage /></DashboardLayout>} />
        <Route path="/dashboard" element={<DashboardLayout><DashboardPage /></DashboardLayout>} />
        <Route path="/financeiro" element={<DashboardLayout><FinanceiroPage /></DashboardLayout>} />
        <Route path="/configuracoes" element={<DashboardLayout><ConfiguracoesPage /></DashboardLayout>} />
      </Routes>
    </Router>
  );
}

export default AppRoutes;
