import React, { useState } from 'react';
import "../Auth.css";
import { Link } from 'react-router-dom';
import api from '../../../services/api.js';

const ForgotPassword = () => {
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
            setMessage('Se o email estiver correto, você receberá um link para redefinir sua senha.');
        } catch (err) {
            console.error('Erro ao solicitar redefinição de senha:', err);
            setError('Erro ao solicitar redefinição de senha. Verifique o email e tente novamente.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-container">
            <div className="login-form">
                <h2>Recuperar Senha</h2>
                <p style={{ marginBottom: '1.5rem', color: '#666' }}>Insira seu email para receber um link de recuperação.</p>
                <form onSubmit={handleSubmit}>
                    {error && <p className="error-message">{error}</p>}
                    {message && <p className="success-message">{message}</p>}
                    <div className="form-group">
                        <label>Email:</label>
                        <input 
                            type="email" 
                            placeholder="seuemail@exemplo.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="login-button" disabled={loading}>
                        {loading ? 'Enviando...' : 'Enviar'}
                    </button>
                </form>
                <div className="extra-links">
                    <Link to="/login">Voltar para o Login</Link>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;