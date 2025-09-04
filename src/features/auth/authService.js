import api from '../../services/api';

const login = async (username, password) => {
    try {
        const response = await api.post('/auth/login', { username, password });
        if (response.data.token) {
            localStorage.setItem('token', response.data.token);
        }
        return response.data;
    } catch (error) {
        console.error('Erro ao fazer login:', error);
        throw error;
    }
};

const logout = () => {
    localStorage.removeItem('token');
};

const authService = {
    login,
    logout,
};

export default authService;
