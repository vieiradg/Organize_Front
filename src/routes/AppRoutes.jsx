import { BrowserRouter, Routes, Route } from "react-router-dom";

import DashboardLayout from "../layouts/DashboardLayout";
import ClienteDashboardLayout from "../layouts/ClienteDashboardLayout";

import LandingPage from "../features/landing/pages/LandingPage";
import LoginPage from "../features/auth/pages/LoginPage";
import RegisterPage from "../features/auth/pages/RegisterPage";
import ForgotPasswordPage from "../features/auth/pages/ForgotPasswordPage";
import ResetPasswordPage from "../features/auth/pages/ResetPasswordPage";
import FaleConosco from "../features/landing/pages/Contato";

import DashboardPage from "../features/dashboard/pages/DashboardPage";
import AgendaPage from "../features/agenda/pages/AgendaPage";
import CustomerPage from "../features/customer/pages/CustomerPage";
import ServicePage from "../features/products/pages/ServicePage";
import FinanceiroPage from "../features/financeiro/pages/FinanceiroPage";
import ConfiguracoesPage from "../features/configuracoes/pages/ConfiguracoesPage";
import EquipePage from "../features/equipe/pages/EquipePage";
import EstablishmentPage from "../features/establishment/pages/EstablishmentPage";

import UpcomingAppointmentsPage from "../features/cliente/pages/UpcomingAppointmentsPage";
import ScheduleServicePage from "../features/cliente/pages/ScheduleServicePage";
import ClientSettingsPage from "../features/cliente/pages/ClientSettingsPage";

import ProtectedRoute from "./ProtectedRoute";

import "../features/auth/Auth.css";
import "../layouts/DashboardLayout.css";
import ReportPage from "../features/reports/pages/ReportPage";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route path="/contato" element={<FaleConosco />} />

        <Route element={<ProtectedRoute />}>
          <Route element={<DashboardLayout />}>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/agenda" element={<AgendaPage />} />
            <Route path="/customers" element={<CustomerPage />} />
            <Route path="/services" element={<ServicePage />} />
            <Route path="/financeiro" element={<FinanceiroPage />} />
            <Route path="/configuracoes" element={<ConfiguracoesPage />} />
            <Route path="/equipe" element={<EquipePage />} />
            <Route path="/establishment" element={<EstablishmentPage />} />
            <Route path="/relatorios" element={<ReportPage />} />
          </Route>

          <Route path="/cliente" element={<ClienteDashboardLayout />}>
            <Route index element={<UpcomingAppointmentsPage />} />
            <Route path="agendar" element={<ScheduleServicePage />} />
            <Route path="configuracoes" element={<ClientSettingsPage />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
