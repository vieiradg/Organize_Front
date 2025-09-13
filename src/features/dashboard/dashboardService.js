import api from '../../services/api';

const getDashboardData = async () => {
    try {
        const response = await api.get('/api/dashboard');
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar dados do dashboard:', error);
        throw error;
    }
};

const dashboardService = {
    getDashboardData,
};

export default dashboardService;
