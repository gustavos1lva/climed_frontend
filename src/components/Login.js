import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css'; // Arquivo de estilos CSS

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault(); // Evita o comportamento padrão de submit do formulário

        // Aqui você pode fazer a validação do login com o servidor (Postgres, etc.)
        // Exemplo básico de validação no cliente:
        if (email === 'user' && password === '1') {
            localStorage.setItem('isAuthenticated', 'true');
            navigate('/home');
        } else {
            setError('Usuário ou senha inválidos');
        }
    };

    return (
        <div className="login-container">
            <form onSubmit={handleLogin} className="login-form">
                <h2>Login</h2>
                {error && <p className="error">{error}</p>}
                <div className="form-group">
                    <label>Usuário:</label>
                    <input
                        type="username"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="form-input"
                    />
                </div>
                <div className="form-group">
                    <label>Senha:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="form-input"
                    />
                </div>
                <button type="submit" className="login-button">
                    Entrar
                </button>
            </form>
        </div>
    );
};

export default Login;
