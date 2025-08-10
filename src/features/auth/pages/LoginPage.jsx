import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../Auth.css'; 
import api from '../../../services/api.js'; 

export default function Login() {
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
            
            navigate('/dashboard'); 

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
        <div className="login-background">
            <div className="login-card">
                <div className="login-header">
                    <h1 className="login-logo-text">Organize</h1>
                    <h2 className="login-title">Bem-vindo de volta!</h2>
                    <p className="login-subtitle">Acesse sua conta para gerenciar seu negócio.</p>
                </div>
                
                <form onSubmit={handleSubmit} className="login-form">
                    {errors.api && <p className="error-message api-error">{errors.api}</p>}

                    <div className="form-group">
                        <label htmlFor="username">Usuário (ou Email):</label>
                        <input 
                            type="text"
                            id="username" 
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="seu.usuario" 
                            required 
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Senha</label>
                        <input 
                            type="password" 
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••" 
                            required 
                        />
                    </div>
                    
                    <div className="form-options">
                        <div className="checkbox-group">
                            <input type="checkbox" id="remember-me" />
                            <label htmlFor="remember-me">Lembrar-me</label>
                        </div>
                        <Link to="/forgot-password" className="forgot-password-link">Esqueceu a senha?</Link>
                    </div>
                    
                    <button type="submit" className="login-button">Entrar na Plataforma</button>
                </form>
                
                <div className="login-footer">
                    <p>
                        Não tem uma conta? <Link to="/register">Crie uma agora</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}