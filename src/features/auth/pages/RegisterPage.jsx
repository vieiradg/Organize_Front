import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../Auth.css';
import api from '../../../services/api.js';

export default function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});
        setSuccessMessage('');

        try {
            await api.post('/auth/register', {
                name,
                email,
                phone,
                password
            });

            setSuccessMessage('Registro bem-sucedido! Você será redirecionado para o login em 3 segundos.');

            setTimeout(() => {
                navigate('/login');
            }, 3000);

        } catch (error) {
            const newErrors = {};
            if (error.response && error.response.status === 400) {
                newErrors.api = 'Email já existe ou dados inválidos.';
            } else {
                newErrors.api = 'Ocorreu um erro no registro. Tente novamente.';
            }
            setErrors(newErrors);
        }
    };

    return (
        <div className="login-background">
            <div className="login-card">
                <div className="login-header">
                    <h1 className="login-logo-text">Organize</h1>
                    <h2 className="login-title">Crie sua conta</h2>
                    <p className="login-subtitle">Comece a transformar seu negócio hoje mesmo.</p>
                </div>
                
                <form onSubmit={handleSubmit} className="login-form">
                    {errors.api && <p className="error-message">{errors.api}</p>}
                    {successMessage && <p className="success-message">{successMessage}</p>}

                    <div className="form-group">
                        <label htmlFor="name">Nome:</label>
                        <input 
                            type="text"
                            id="name"
                            placeholder="Seu nome completo"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                    
                    <div className="form-group">
                        <label htmlFor="email">Email:</label>
                        <input 
                            type="email"
                            id="email"
                            placeholder="Seu melhor email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    
                    <div className="form-group">
                        <label htmlFor="phone">Telefone (opcional):</label>
                        <input 
                            type="tel"
                            id="phone"
                            placeholder="Seu telefone (opcional)"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                        />
                    </div>
                    
                    <div className="form-group">
                        <label htmlFor="email">Email:</label>
                        <input 
                            type="email" 
                            id="email"
                            placeholder="Seu melhor email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="phone">Telefone (opcional):</label>
                        <input 
                            type="tel" 
                            id="phone"
                            placeholder="Seu telefone (opcional)"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Senha:</label>
                        <input 
                            type="password"
                            id="password"
                            placeholder="Crie uma senha segura"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    
                    <button type="submit" className="login-button" disabled={!!successMessage}>
                        {successMessage ? 'Redirecionando...' : 'Criar Conta'}
                    </button>
                </form>
                
                <div className="login-footer">
                    <p>
                        Já tem uma conta? <Link to="/login">Faça login</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
