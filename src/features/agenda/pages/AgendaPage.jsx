import React, { useState, useEffect, useCallback } from 'react';
import DailyCalendar from '../components/DailyCalendar';
import WeeklyCalendar from '../components/WeeklyCalendar';
import AppointmentModal from '../../../components/AppointmentModal/AppointmentModal';
import agendaService from '../agendaService.js';

export default function AgendaPage() {
    const [view, setView] = useState('weekly');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedHour, setSelectedHour] = useState(null);
    const [appointments, setAppointments] = useState([]);
    const [currentDate, setCurrentDate] = useState(new Date());

    const fetchAppointments = useCallback(async () => {
        try {
            const data = await agendaService.getAppointmentsByDate(currentDate);
            setAppointments(data);
        } catch (error) {
            console.error('Falha ao carregar agendamentos na página.');
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
                <h1 className="titulo-secao-dashboard">Agenda</h1>
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
            
            <main className="widget-card">
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