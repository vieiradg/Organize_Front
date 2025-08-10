import api from '../../services/api';

const getAppointmentsByDate = async (date) => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;

    try {
        const response = await api.get(`/api/appointments?date=${formattedDate}`);
        return response.data; 
    } catch (error) {
        console.error('Erro ao buscar agendamentos:', error);
        throw error;
    }
};

const agendaService = {
    getAppointmentsByDate,
};

export default agendaService;
