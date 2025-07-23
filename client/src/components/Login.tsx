import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Login.css';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    try {
      const res = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password }),
      });
      const data = await res.json();
      if (res.ok && data.user) {
        // Save user info to localStorage for persistence
        localStorage.setItem('userName', data.user.name);
        localStorage.setItem('userEmail', data.user.email);
        localStorage.setItem('userAvatarUrl', data.user.avatarUrl || '');
        localStorage.setItem('userBio', data.user.bio || 'Resume builder enthusiast.');
        localStorage.setItem('userJoined', data.user.joined || new Date().toISOString());
        setMessage('✅ Login successful!');
        setTimeout(() => navigate('/dashboard'), 1000);
      } else {
        setMessage(`❌ ${data.message || 'Login failed'}`);
      }
    } catch (err) {
      setMessage('❌ Server not reachable. Please try again later.');
    }
    setLoading(false);
  };

  return (
    <div className="login-page-bg">
      <div className="login-container">
        <h2 className="login-title">Login</h2>
        <form onSubmit={handleSubmit} className="login-form">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={e => setUsername(e.target.value)}
            className="login-input"
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="login-input"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            className="login-input"
          />
          <button type="submit" disabled={loading} className="login-button">
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        <button
          type="button"
          className="login-register-btn"
          onClick={() => navigate('/register')}
        >
          Register
        </button>
        {message && <p className="login-message">{message}</p>}
      </div>
    </div>
  );
};

export default Login;