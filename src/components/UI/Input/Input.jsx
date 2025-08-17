import React from 'react';
import styles from './Input.module.css';

const Input = ({ type, placeholder, value, onChange, ...rest }) => {
    return (
        <input 
            type={type} 
            placeholder={placeholder} 
            value={value} 
            onChange={onChange} 
            className={styles.input}
            {...rest} 
        />
    );
};

export default Input;
