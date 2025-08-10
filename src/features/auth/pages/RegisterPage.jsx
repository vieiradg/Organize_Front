import React, { useState } from 'react';
import "../Auth.css";
import { Link, useNavigate } from 'react-router-dom';
import api from '../../../services/api.js';

const Register = () => {
    const [username, setUsername] = useState('');
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
                username,
                password,
                roles: ['ROLE_PROFESSIONAL']
            });
            
            setSuccessMessage('Registro bem-sucedido! Você será redirecionado para o login.');

            setTimeout(() => {
                navigate('/login');
            }, 3000);

        } catch (error) {
            const newErrors = {};
            if (error.response && error.response.status === 400) {
                newErrors.api = 'Nome de usuário já existe.';
            } else {
                newErrors.api = 'Ocorreu um erro no registro. Tente novamente.';
            }
            setErrors(newErrors);
        }
    };

    return (
        <div className="login-container">
            <div className="login-form">
                <h2>Criar Conta</h2>
                <form onSubmit={handleSubmit}>
                    {errors.api && <p className="error-message api-error">{errors.api}</p>}
                    {successMessage && <p className="success-message api-error">{successMessage}</p>}
                    <div className="form-group">
                        <label>Usuário:</label>
                        <input 
                            type="text" 
                            placeholder="Escolha um nome de usuário"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label>Senha:</label>
                        <input 
                            type="password" 
                            placeholder="Crie uma senha"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button type="submit" className="login-button">Registrar</button>
                </form>
                <div className="extra-links">
                    <span>Já tem uma conta? </span>
                    <Link to="/login">Faça login</Link>
                </div>
            </div>
        </div>
    );
};

export default Register;