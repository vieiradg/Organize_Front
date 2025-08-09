import React, { useState, useEffect, useCallback } from 'react';
import "../components/Agenda.css";
import DailyCalendar from '../components/DailyCalendar';
import WeeklyCalendar from '../components/WeeklyCalendar';
import AppointmentModal from '../../../components/AppointmentModal/AppointmentModal';
import api from '@services/api.js';

const AgendaPage = () => {
    const [view, setView] = useState('weekly');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedHour, setSelectedHour] = useState(null);
    const [appointments, setAppointments] = useState([]);
    const [currentDate, setCurrentDate] = useState(new Date());

    const fetchAppointments = useCallback(async () => {
        try {
            const year = currentDate.getFullYear();
            const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
            const day = currentDate.getDate().toString().padStart(2, '0');
            const formattedDate = `${year}-${month}-${day}`;

            const response = await api.get(`/api/appointments?date=${formattedDate}`);
            setAppointments(response.data);
        } catch (error) {
            console.error('Erro ao buscar agendamentos:', error);
        }
    }, [currentDate]);

    useEffect(() => {
        fetchAppointments();
    }, [fetchAppointments]);

    const handleTimeSlotClick = (hour) => {
        setSelectedHour(hour);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedHour(null);
    };

    const handleAppointmentCreated = () => {
        fetchAppointments();
    };

    return (
        <div className="agenda-page">
            <header className="agenda-header">
                <h1>Agenda Semanal</h1>
                <div className="view-controls">
                    <button 
                        className={view === 'daily' ? 'active' : ''}
                        onClick={() => setView('daily')}
                    >
                        Diária
                    </button>
                    <button 
                        className={view === 'weekly' ? 'active' : ''}
                        onClick={() => setView('weekly')}
                    >
                        Semanal
                    </button>
                </div>
            </header>
            <main>
                {view === 'daily' && 
                    <DailyCalendar 
                        onTimeSlotClick={handleTimeSlotClick} 
                        appointments={appointments}
                    />
                }
                {view === 'weekly' && 
                    <WeeklyCalendar 
                        appointments={appointments}
                    />
                }
            </main>
            <AppointmentModal 
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                selectedHour={selectedHour}
                onAppointmentCreated={handleAppointmentCreated}
            />
        </div>
    );
};

export default AgendaPage;