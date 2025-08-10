import React from 'react';
import styles from './WeeklyCalendar.module.css';

const WeeklyCalendar = ({ appointments }) => {
  const daysOfWeek = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta'];
  const hours = Array.from({ length: 10 }, (_, i) => `${i + 8}:00h`);


  const getAppointment = (dayIndex, hour) => {
    const dummyAppointments = [
      { day: 0, hour: '10:00h', title: 'João S.', type: 'blue' },
      { day: 0, hour: '14:00h', title: 'Ana M.C...', type: 'orange' },
      { day: 1, hour: '09:00h', title: 'Cliente P.', type: 'blue' },
      { day: 1, hour: '11:00h', title: 'Cliente B.', type: 'orange' },
      { day: 3, hour: '10:00h', title: 'Cliente C.', type: 'blue' },
      { day: 3, hour: '14:00h', title: 'Cliente G.', type: 'orange' },
      { day: 4, hour: '09:00h', title: 'Cliente A.', type: 'blue' },
      { day: 4, hour: '13:00h', title: 'Cliente B.', type: 'orange' },
    ];
    return dummyAppointments.find(app => app.day === dayIndex && app.hour === hour);
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
                  <div className={`${styles.appointment} ${styles[appointment.type]}`}>
                    {appointment.hour} - {appointment.title}
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
