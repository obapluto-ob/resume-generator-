import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import '../styles/Register.css';

const Register: React.FC = () => {
  const navigate = useNavigate();
  const { setUser } = useUser();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    try {
      if (!username || !password || !email) {
        return setMessage('❌ All fields are required.');
      }
      const res = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password, email }),
      });
      const data = await res.json();
      console.log('Register response:', data); // Add this line for debugging
      if (res.ok && data.user) {
        const newUser = data.user;
        setUser({
          name: newUser.name,
          email: newUser.email,
          avatarUrl: newUser.avatarUrl || '',
          bio: newUser.bio || '',
          joined: new Date().toISOString(),
        });
        localStorage.setItem('userName', newUser.name);
        localStorage.setItem('userEmail', newUser.email);
        localStorage.setItem('userAvatarUrl', newUser.avatarUrl || '');
        localStorage.setItem('userBio', newUser.bio || '');
        localStorage.setItem('userJoined', new Date().toISOString());
        setMessage('✅ Registration/Login successful!');
        setTimeout(() => navigate('/dashboard'), 1000);
      } else {
        setMessage(`❌ ${data.message || 'Registration failed'}`);
      }
    } catch (err) {
      setMessage('❌ Server not reachable. Please try again later.');
    }
    setLoading(false);
  };

  return (
    <div className="login-page-bg">
      <div className="login-container">
        <h2 className="login-title">Register</h2>
        <form onSubmit={handleSubmit} className="login-form">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={e => setUsername(e.target.value)}
            required
            className="login-input"
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
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
            {loading ? 'Registering...' : 'Register'}
          </button>
        </form>
        <button
          type="button"
          className="login-register-btn"
          onClick={() => navigate('/login')}
        >
          Back to Login
        </button>
        {message && <p className="login-message">{message}</p>}
      </div>
    </div>
  );
};

export default Register;