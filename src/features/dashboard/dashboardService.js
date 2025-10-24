import api from '../../services/api'; // Garanta que o caminho para seu 'api.js' está correto

const getDashboardData = async () => {
    try {
        // Pega o token de autenticação do localStorage
        const token = localStorage.getItem('token');
        if (!token) {
            throw new Error('Token de autenticação não encontrado.');
        }

        // Faz a chamada para o endpoint do dashboard, enviando o token
        const response = await api.get('/api/dashboard', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return response.data;
    } catch (error) {
        console.error('Erro ao buscar dados do dashboard:', error);
        // Lança o erro para que o componente que chamou possa tratá-lo
        throw error;
    }
};

const dashboardService = {
    getDashboardData,
};

export default dashboardService;