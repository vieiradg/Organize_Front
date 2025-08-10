import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import '../Auth.css'; 
import api from '../../../services/api.js';

export default function ResetPassword() {
    const [searchParams] = useSearchParams();
    const token = searchParams.get('token');

    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        setMessage('');
        setError(null);

        if (newPassword !== confirmPassword) {
            setError('As senhas não coincidem.');
            setLoading(false);
            return;
        }

        if (!token) {
            setError('Token de redefinição inválido ou não encontrado na URL.');
            setLoading(false);
            return;
        }

        try {
            await api.post('/auth/reset-password', {
                token,
                newPassword,
            });
            setMessage('Senha redefinida com sucesso! Redirecionando para o login...');
            setTimeout(() => {
                navigate('/login');
            }, 3000);
        } catch (err) {
            console.error('Erro ao redefinir senha:', err);
            setError(err.response?.data?.message || 'Erro ao redefinir senha. O token pode ser inválido ou ter expirado.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-background">
            <div className="login-card">
                <div className="login-header">
                    <h1 className="login-logo-text">Organize</h1>
                    <h2 className="login-title">Crie uma Nova Senha</h2>
                    <p className="login-subtitle">Sua nova senha deve ser diferente da anterior.</p>
                </div>
                
                <form onSubmit={handleSubmit} className="login-form">
                    {error && <p className="error-message">{error}</p>}
                    {message && <p className="success-message">{message}</p>}

                    <div className="form-group">
                        <label htmlFor="new-password">Nova Senha</label>
                        <input 
                            type="password" 
                            id="new-password" 
                            placeholder="••••••••"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="confirm-password">Confirmar Nova Senha</label>
                        <input 
                            type="password" 
                            id="confirm-password" 
                            placeholder="••••••••"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                    </div>
                    
                    <button type="submit" className="login-button" disabled={loading || !!message}>
                        {loading ? 'Redefinindo...' : 'Redefinir Senha'}
                    </button>
                </form>
                
                <div className="login-footer">
                    <p>
                       <Link to="/login">Voltar para o Login</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};
