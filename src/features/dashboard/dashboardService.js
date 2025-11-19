import api from "../../services/api";

const getDashboardData = async () => {
  try {
    const token = localStorage.getItem("token");
    const adminId = localStorage.getItem("userId");
    if (!token) {
      throw new Error("Token de autenticação não encontrado.");
    }
    const response = await api.get("/api/dashboard", {
      headers: {
        Authorization: `Bearer ${token}`,
        adminId,
      },
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar dados do dashboard:", error);
    throw error;
  }
};

const dashboardService = {
  getDashboardData,
};

export default dashboardService;
