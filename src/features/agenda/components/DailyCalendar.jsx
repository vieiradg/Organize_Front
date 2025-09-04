import React from 'react';
import './DailyCalendar.css';

const DailyCalendar = ({ onTimeSlotClick, appointments }) => {
    const hours = Array.from({ length: 24 }, (_, i) => i); // 0 to 23

    const formatTime = (hour) => {
        const h = hour % 12 === 0 ? 12 : hour % 12;
        const ampm = hour < 12 ? 'AM' : 'PM';
        return `${h}:00 ${ampm}`;
    };

    return (
        <div className="daily-calendar">
            {hours.map((hour) => {
                const appointment = appointments.find(
                    (app) => new Date(app.startTime).getHours() === hour
                );
                return (
                    <div
                        key={hour}
                        className="time-slot"
                        onClick={() => onTimeSlotClick(hour)}
                    >
                        <div className="time-label">{formatTime(hour)}</div>
                        <div className="appointment-details">
                            {appointment ? (
                                <span>{appointment.serviceName} - {appointment.clientName}</span>
                            ) : (
                                <span>Sem agendamentos</span>
                            )}
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default DailyCalendar;
