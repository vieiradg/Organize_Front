import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../Auth.css';

export default function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        setError(''); 

        //LOGIN DE DEMONSTRAÇÃO 
 
        const demoUser = 'admin';
        const demoPass = '12345';

        if (username === demoUser && password === demoPass) {
            console.log('Login de demonstração bem-sucedido!');
            localStorage.setItem('demo_token', 'true'); 
            navigate('/dashboard');
        } else {
            setError('Utilizador ou senha inválidos.');
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
                    {error && <p className="error-message">{error}</p>}

                    <div className="form-group">
                        <label htmlFor="username">Utilizador:</label>
                        <input 
                            type="text"
                            id="username" 
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Use 'admin'" 
                            required 
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Senha:</label>
                        <input 
                            type="password" 
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Use '12345'" 
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