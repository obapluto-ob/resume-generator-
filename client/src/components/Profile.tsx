import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import '../styles/Profile.css';

const Profile: React.FC = () => {
  const navigate = useNavigate();
  const { user, setUser } = useUser();
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState(user || { name: '', email: '', bio: '', avatarUrl: '', joined: '' });

  useEffect(() => {
    setForm(user || { name: '', email: '', bio: '', avatarUrl: '', joined: '' });
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setForm({ ...form, avatarUrl: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    // After saving changes to backend:
    const res = await fetch('http://localhost:5000/api/user/update', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    if (res.ok && data.user) {
      // Update localStorage and context
      localStorage.setItem('userAvatarUrl', data.user.avatarUrl || '');
      localStorage.setItem('userName', data.user.name);
      localStorage.setItem('userEmail', data.user.email);
      localStorage.setItem('userBio', data.user.bio || '');
      localStorage.setItem('userJoined', data.user.joined || '');
      setUser(data.user); // This updates context and all components using useUser()
    }
    setEditMode(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userName');
    localStorage.removeItem('userAvatarUrl');
    localStorage.removeItem('userBio');
    localStorage.removeItem('userJoined');
    setUser(null);
    navigate('/login');
  };

  const handleBack = () => {
    navigate('/dashboard');
  };

  const joinedDate =
    form.joined && form.joined !== 'Unknown'
      ? new Date(form.joined).toLocaleString('default', { month: 'long', year: 'numeric' })
      : 'Set your join date in account settings';

  return (
    <div className="profile-page-container">
      {/* Back button */}
      <button
        onClick={handleBack}
        style={{
          position: "absolute",
          top: 24,
          left: 24,
          minWidth: 100,
          padding: "8px 16px",
          background: "#2563eb",
          color: "#fff",
          border: "none",
          borderRadius: 6,
          cursor: "pointer",
          fontWeight: 600,
          zIndex: 10
        }}
      >
        ← Back
      </button>

      {/* Profile header card */}
      <div className="profile-header">
        <div className="profile-avatar">
          {form.avatarUrl ? (
            <img src={form.avatarUrl} alt="Avatar" />
          ) : (
            <span>{form.name[0]}</span>
          )}
        </div>
        <div className="profile-info">
          <p className="profile-joined">Joined: {joinedDate}</p>
          <h2 style={{ display: "flex", alignItems: "center", gap: 12 }}>
            {form.name}
          </h2>
          <p className="profile-email">{form.email}</p>
          <p className="profile-bio">{form.bio}</p>
          <p style={{ color: "#64748b", fontSize: "0.95rem", marginBottom: 4 }}>
            Last login: July 21, 2025
          </p>
          {/* Profile completion bar */}
          <div style={{ margin: "16px 0" }}>
            <div style={{
              background: "#e5e7eb",
              borderRadius: 8,
              height: 12,
              width: "100%",
              marginBottom: 4
            }}>
              <div style={{
                background: "#2563eb",
                width: "80%",
                height: "100%",
                borderRadius: 8
              }} />
            </div>
            <span style={{ fontSize: "0.9rem", color: "#2563eb" }}>Profile Completion: 80%</span>
          </div>
        </div>
      </div>

      {/* Professional summary card */}
      <div className="profile-summary">
        <h3 style={{ marginBottom: 12, color: "#2563eb" }}>Professional Summary</h3>
        <p style={{ marginBottom: 8 }}>
          Welcome back, <strong>{form.name}</strong> <br />
          {form.bio}
        </p>
        <p style={{ fontStyle: "italic", color: "#64748b", marginTop: 16 }}>
          Keep your profile updated and make your next career move with confidence!
        </p>
        <p style={{ color: "#2563eb", fontWeight: 600, marginBottom: 8, fontSize: "1.1rem" }}>
          "Success is not the key to happiness. Happiness is the key to success."
        </p>
      </div>

      {/* Action buttons */}
      <div className="profile-actions">
        <button className="edit-btn" onClick={() => setEditMode(true)}>Edit Profile</button>
        <button className="logout-btn" onClick={handleLogout}>Logout</button>
      </div>

      {/* Edit profile form */}
      {editMode && (
        <div className="profile-edit-form">
          <h3>Edit Profile</h3>
          <div className="form-group">
            <label>Avatar</label>
            <input type="file" accept="image/*" onChange={handleAvatarChange} />
          </div>
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Bio</label>
            <textarea
              name="bio"
              value={form.bio}
              onChange={handleChange}
            />
          </div>
          <div style={{ display: "flex", gap: 12, marginTop: 8 }}>
            <button className="save-btn" onClick={handleSave}>Save Changes</button>
            <button className="cancel-btn" onClick={() => setEditMode(false)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;