import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../Auth.css'; 
import api from '../../../services/api.js';

export default function ForgotPassword() {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');
        setError(null);

        try {
            await api.post('/auth/forgot-password', { email });
            setMessage('Se o seu email estiver cadastrado, você receberá um link para redefinir sua senha.');
            setError(null); 
        } catch (err) {
            console.error('Erro ao solicitar redefinição de senha:', err);
            setError('Não foi possível processar a solicitação. Verifique o email e tente novamente.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-background">
            <div className="login-card">
                <div className="login-header">
                    <h1 className="login-logo-text">Organize</h1>
                    <h2 className="login-title">Recuperar Senha</h2>
                    <p className="login-subtitle">Sem problemas! Insira seu email abaixo para receber um link de redefinição.</p>
                </div>
                
                <form onSubmit={handleSubmit} className="login-form">
                    {error && <p className="error-message">{error}</p>}
                    {message && <p className="success-message">{message}</p>}

                    <div className="form-group">
                        <label htmlFor="email">Email de Cadastro</label>
                        <input 
                            type="email" 
                            id="email" 
                            placeholder="seuemail@exemplo.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    
                    <button type="submit" className="login-button" disabled={loading}>
                        {loading ? 'Enviando...' : 'Enviar Link de Recuperação'}
                    </button>
                </form>
                
                <div className="login-footer">
                    <p>
                        Lembrou a senha? <Link to="/login">Voltar para o Login</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};