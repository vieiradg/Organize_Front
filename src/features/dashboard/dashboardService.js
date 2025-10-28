import api from '../../services/api'; // Garanta que o caminho para seu 'api.js' está correto

const getDashboardData = async () => {
    try {
        // ✅ NOVO: Pega o adminId e o token
        const adminId = localStorage.getItem('userId');
        const token = localStorage.getItem('token');
        
        if (!token || !adminId) {
            throw new Error('Dados de autenticação (Token ou ID do Admin) incompletos.');
        }

        // Faz a chamada, enviando o Token e o adminId no cabeçalho
        const response = await api.get('/api/dashboard', {
            headers: {
                'adminId': adminId, // ⬅️ CAMPO REQUERIDO PELO BACKEND!
                'Authorization': `Bearer ${token}`,
            },
        });

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