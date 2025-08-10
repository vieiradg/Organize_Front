import React, { useState } from 'react';
import "../Auth.css";
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import api from '../../../services/api.js';

const ResetPassword = () => {
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
            setError('Token de redefinição não encontrado.');
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
            setError(err.response?.data?.message || 'Erro ao redefinir senha. Token inválido ou expirado.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-container">
            <div className="login-form">
                <h2>Redefinir Senha</h2>
                <p style={{ marginBottom: '1.5rem', color: '#666' }}>Insira sua nova senha.</p>
                <form onSubmit={handleSubmit}>
                    {error && <p className="error-message">{error}</p>}
                    {message && <p className="success-message">{message}</p>}
                    <div className="form-group">
                        <label>Nova Senha:</label>
                        <input 
                            type="password" 
                            placeholder="Nova senha"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Confirmar Nova Senha:</label>
                        <input 
                            type="password" 
                            placeholder="Confirme a nova senha"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="login-button" disabled={loading}>
                        {loading ? 'Redefinindo...' : 'Redefinir Senha'}
                    </button>
                </form>
                <div className="extra-links">
                    <Link to="/login">Voltar para o Login</Link>
                </div>
            </div>
        </div>
    );
};

export default ResetPassword;
