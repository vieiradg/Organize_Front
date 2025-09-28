import api from '../../services/api';

const getAppointmentsByDate = async (date) => {
  const token = localStorage.getItem("token");

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const formattedDate = `${year}-${month}-${day}`;

  try {
    const response = await api.get(`/api/appointments?date=${formattedDate}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("❌ Erro ao buscar agendamentos por data:", error);
    return [];
  }
};

const getAppointmentsByCustomer = async () => {
  const token = localStorage.getItem("token");
  try {
    const response = await api.get(`/api/appointments/me`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("❌ Erro ao buscar agendamentos do cliente:", error);
    return [];
  }
};

const createAppointment = async (appointmentData) => {
  const token = localStorage.getItem("token");
  try {
    const response = await api.post(`/api/appointments`, appointmentData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("❌ Erro ao criar agendamento:", error);
    throw error;
  }
};

const updateAppointmentStatus = async (id, newStatus) => {
  const token = localStorage.getItem("token");
  try {
    const response = await api.patch(
      `/api/appointments/${id}/status`,
      { status: newStatus },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data;
  } catch (error) {
    console.error("❌ Erro ao atualizar status do agendamento:", error);
    throw error;
  }
};

const getServices = async (establishmentId) => {
  const token = localStorage.getItem("token");
  try {
    const response = await api.get(
      `/api/establishments/${establishmentId}/services`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data;
  } catch (error) {
    console.error("❌ Erro ao buscar serviços:", error);
    return [];
  }
};

const getEmployees = async (establishmentId) => {
  const token = localStorage.getItem("token");
  try {
    const response = await api.get(
      `/api/establishments/${establishmentId}/employees`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data;
  } catch (error) {
    console.error("❌ Erro ao buscar funcionários:", error);
    return [];
  }
};

const agendaService = {
  getAppointmentsByDate,
  getAppointmentsByCustomer,
  createAppointment,
  updateAppointmentStatus, 
  getServices,
  getEmployees,
};

export default agendaService;
