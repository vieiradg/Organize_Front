import React from 'react';
import './DailyCalendar.css';

const DailyCalendar = ({ onTimeSlotClick, appointments = [] }) => {
  const hours = Array.from({ length: 24 }, (_, i) => i); 
  const formatTime = (hour) => {
    const h = hour % 12 === 0 ? 12 : hour % 12;
    const ampm = hour < 12 ? 'AM' : 'PM';
    return `${h}:00 ${ampm}`;
  };

  return (
    <div className="daily-calendar">
      {hours.map((hour) => {
        const slotAppointments = appointments.filter(
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
              {slotAppointments.length > 0 ? (
                slotAppointments.map((appointment) => (
                  <div key={appointment.id} className="appointment-item">
                    <strong>{appointment.service?.name || "Serviço"}</strong> –{" "}
                    {appointment.client?.name || "Cliente"}
                  </div>
                ))
              ) : (
                <span className="no-appointment">Sem agendamentos</span>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default DailyCalendar;
