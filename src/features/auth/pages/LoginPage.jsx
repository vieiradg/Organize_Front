import React, { useState } from 'react';
import "../Auth.css";
import { Link, useNavigate } from 'react-router-dom';
import api from '../../../services/api.js';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});

        try {
            const response = await api.post('/auth/login', {
                username,
                password,
            });
            
            const { token } = response.data;
            localStorage.setItem('token', token);
            api.defaults.headers.Authorization = `Bearer ${token}`;
            
            navigate('/agenda');

        } catch (error) {
            const newErrors = {};
            if (error.response && error.response.status === 403) {
                newErrors.api = 'Usuário ou senha inválidos.';
            } else {
                newErrors.api = 'Ocorreu um erro. Tente novamente mais tarde.';
            }
            setErrors(newErrors);
        }
    };

    return (
        <div className="login-container">
            <div className="login-form">
                <h2>Organize</h2>
                <form onSubmit={handleSubmit}>
                    {errors.api && <p className="error-message api-error">{errors.api}</p>}
                    <div className="form-group">
                        <label>Usuário:</label>
                        <input 
                            type="text" 
                            placeholder="Digite seu usuário"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label>Senha:</label>
                        <input 
                            type="password" 
                            placeholder="Sua senha" 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button type="submit" className="login-button">Login</button>
                </form>
                <div className="extra-links">
                    <Link to="/forgot-password">Esqueci minha senha</Link> | <Link to="/register">Criar uma conta</Link>
                </div>
            </div>
        </div>
    );
};

export default Login;
