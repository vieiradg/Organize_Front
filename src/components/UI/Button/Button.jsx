import React from 'react';
import styles from './Button.module.css';

const Button = ({ onClick, children, type = 'primary' }) => {
    const buttonClass = `${styles.button} ${type === 'secondary' ? styles.secondary : ''}`;
    return (
        <button onClick={onClick} className={buttonClass}>
            {children}
        </button>
    );
};

export default Button;
