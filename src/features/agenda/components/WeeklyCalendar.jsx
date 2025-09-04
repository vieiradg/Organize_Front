import React from 'react';
import styles from './WeeklyCalendar.module.css';

const WeeklyCalendar = ({ appointments }) => {
  const daysOfWeek = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta'];
  const hours = Array.from({ length: 10 }, (_, i) => `${i + 8}:00h`);

  const getAppointment = (dayIndex, hour) => {
    return appointments.find(app => {
        const appDate = new Date(app.startTime);
        const appDay = appDate.getDay() - 1; // 0 for Monday, 1 for Tuesday, etc.
        const appHour = `${appDate.getHours()}:00h`;
        return appDay === dayIndex && appHour === hour;
    });
  };

  return (
    <div className={styles.weeklyCalendar}>
      <div className={styles.timeColumn}></div>
      {daysOfWeek.map((day, index) => (
        <div key={index} className={styles.dayHeader}>
          {day}<br/>

          {index === 0 && <span>25 de Outubro</span>}
          {index === 1 && <span>26 de Outubro</span>}
          {index === 2 && <span>27 de Outubro</span>}
          {index === 3 && <span>28 de Outubro</span>}
          {index === 4 && <span>29 de Outubro</span>}
        </div>
      ))}

      {hours.map((hour, hourIndex) => (
        <React.Fragment key={hourIndex}>
          <div className={styles.hourLabel}>{hour}</div>
          {daysOfWeek.map((day, dayIndex) => {
            const appointment = getAppointment(dayIndex, hour);
            return (
              <div key={`${dayIndex}-${hourIndex}`} className={styles.timeSlot}>
                {appointment && (
                  <div className={`${styles.appointment} ${styles.blue}`}>
                    {new Date(appointment.startTime).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})} - {appointment.clientName}
                  </div>
                )}
              </div>
            );
          })}
        </React.Fragment>
      ))}
    </div>
  );
};

export default WeeklyCalendar;
