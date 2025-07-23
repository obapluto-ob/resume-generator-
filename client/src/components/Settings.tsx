import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import '../styles/Settings.css';

const Settings: React.FC = () => {
  const { user, setUser } = useUser();
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
  const [isPrivate, setIsPrivate] = useState(false);
  const [language, setLanguage] = useState(localStorage.getItem('language') || 'English');
  const [resumeTemplate, setResumeTemplate] = useState(localStorage.getItem('resumeTemplate') || 'Academic&ResearchTemplate');

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    document.body.className = theme === 'dark' ? 'dark-theme' : '';
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    if (user?.email) {
      fetch(`/api/user/settings?email=${encodeURIComponent(user.email)}`)
        .then(res => res.ok ? res.json() : null)
        .then(data => {
          if (data) {
            setEmailNotifications(data.emailNotifications ?? true);
            setSmsNotifications(data.smsNotifications ?? false);
            setTheme(data.theme ?? 'light');
            setIsPrivate(data.isPrivate ?? false);
            setLanguage(data.language ?? 'English');
            setResumeTemplate(data.resumeTemplate ?? 'Academic&ResearchTemplate');
          }
        });
    }
  }, [user]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');
    setSuccess('');
    try {
      const response = await fetch('http://localhost:5000/api/user/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: user?.email,
          emailNotifications,
          smsNotifications,
          theme,
          isPrivate,
          language,
          resumeTemplate,
        }),
      });
      const result = await response.json();
      if (response.ok) {
        setSuccess(result.message || 'Settings updated!');
        localStorage.setItem('theme', theme);
        localStorage.setItem('language', language);
        localStorage.setItem('resumeTemplate', resumeTemplate);
      } else {
        setError(result.error || 'Failed to save settings.');
      }
    } catch {
      setError('Network error. Please try again.');
    }
    setLoading(false);
  };

  const handlePasswordChange = async () => {
    setLoading(true);
    setError('');
    setSuccess('');
    if (!oldPassword || !newPassword) {
      setError('Please enter both old and new password.');
      setLoading(false);
      return;
    }
    try {
      const response = await fetch('http://localhost:5000/api/user/change-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: user?.email, oldPassword, newPassword }),
      });
      const result = await response.json();
      if (response.ok) {
        setSuccess('Password changed!');
        setOldPassword('');
        setNewPassword('');
      } else {
        setError(result.error || 'Failed to change password.');
      }
    } catch {
      setError('Network error. Please try again.');
    }
    setLoading(false);
  };

  const handleDeleteAccount = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch('http://localhost:5000/api/user/delete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: user?.email }),
      });
      if (response.ok) {
        localStorage.clear();
        setUser(null);
        navigate('/register');
      } else {
        const result = await response.json();
        setError(result.error || 'Failed to delete account.');
      }
    } catch {
      setError('Network error. Please try again.');
    }
    setLoading(false);
  };

  const handleBack = () => {
    if (location.state && location.state.fromProfile) {
      navigate('/profile');
    } else {
      navigate('/dashboard');
    }
  };

  return (
    <div className="settings-page-container" style={{ position: "relative", maxWidth: 480, margin: "0 auto", padding: "24px 12px" }}>
      <button
        type="button"
        onClick={handleBack}
        style={{
          position: "absolute",
          top: 24,
          left: 24,
          minWidth: 80,
          padding: "6px 12px",
          background: "#2563eb",
          color: "#fff",
          border: "none",
          borderRadius: 6,
          cursor: "pointer",
          fontWeight: 600,
        }}
      >
        Back
      </button>
      <h2 style={{ marginBottom: 16 }}>Settings</h2>
      <form className="settings-form" onSubmit={handleSave}>
        <div className="form-group">
          <label>
            <input type="checkbox" checked={emailNotifications} onChange={e => setEmailNotifications(e.target.checked)} />
            Email Notifications
          </label>
          <label>
            <input type="checkbox" checked={smsNotifications} onChange={e => setSmsNotifications(e.target.checked)} />
            SMS Notifications
          </label>
        </div>
        <div className="form-group">
          <label>
            <input type="radio" name="theme" value="light" checked={theme === 'light'} onChange={() => setTheme('light')} />
            Light Mode
          </label>
          <label>
            <input type="radio" name="theme" value="dark" checked={theme === 'dark'} onChange={() => setTheme('dark')} />
            Dark Mode
          </label>
        </div>
        <div className="form-group">
          <label>
            <input type="checkbox" checked={isPrivate} onChange={e => setIsPrivate(e.target.checked)} />
            Make my profile private
          </label>
        </div>
        <div className="form-group">
          <label>
            Language
            <select value={language} onChange={e => setLanguage(e.target.value)} style={{ padding: "6px", borderRadius: 6, border: "1px solid #e5e7eb", width: "100%" }}>
              <option value="English">English</option>
              <option value="French">French</option>
              <option value="Spanish">Spanish</option>
              <option value="German">German</option>
            </select>
          </label>
        </div>
        <div className="form-group">
          <label>
            Resume Template
            <select value={resumeTemplate} onChange={e => setResumeTemplate(e.target.value)} style={{ padding: "6px", borderRadius: 6, border: "1px solid #e5e7eb", width: "100%" }}>
              <option value="Academic&ResearchTemplate">Academic & Research</option>
              <option value="CreativeDesignerTemplate">Creative Designer</option>
              <option value="ExecutiveLeadershipTemplate">Executive Leadership</option>
              <option value="HealthCareProfessionalTemplate">Health Care Professional</option>
              <option value="MinimalistCleanTemplate">Minimalist Clean</option>
              <option value="ModernProTemplate">Modern Pro</option>
              <option value="ProfessionalTemplate">Professional</option>
              <option value="SalesExecutiveTemplate">Sales Executive</option>
              <option value="TechSpecialistTemplate">Tech Specialist</option>
            </select>
          </label>
        </div>
        <button type="submit" disabled={loading} style={{ marginTop: 16, width: "100%" }}>
          {loading ? 'Saving...' : 'Save Changes'}
        </button>
        {message && <div className="settings-message">{message}</div>}
        {success && <p className="settings-success">{success}</p>}
        {error && <div style={{ color: '#ef4444', fontWeight: 600 }}>{error}</div>}
      </form>
      <div className="settings-password" style={{ marginTop: 24 }}>
        <h3>Change Password</h3>
        <input type="password" placeholder="Current password" value={oldPassword} onChange={e => setOldPassword(e.target.value)} />
        <input type="password" placeholder="New password" value={newPassword} onChange={e => setNewPassword(e.target.value)} />
        <button type="button" onClick={handlePasswordChange} disabled={loading} style={{ width: "100%", marginTop: 8 }}>
          {loading ? 'Updating...' : 'Update Password'}
        </button>
      </div>
      <button
        type="button"
        className="delete-account-btn"
        onClick={handleDeleteAccount}
        disabled={loading}
        style={{ marginTop: 24, background: "#ef4444", color: "#fff", borderRadius: 8, padding: "12px 0", fontWeight: 600, border: "none", width: "100%" }}
      >
        Delete Account
      </button>
    </div>
  );
};

export default Settings;