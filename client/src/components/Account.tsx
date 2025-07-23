import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Account.css';

const Account: React.FC = () => {
  const navigate = useNavigate();
  const userName = localStorage.getItem('userName') || 'User';
  const userEmail = localStorage.getItem('userEmail') || 'user@email.com';

  return (
    <div className="account-page-container" style={{ position: "relative" }}>
      <button
        onClick={() => navigate('/dashboard')}
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
      <h2>Account</h2>
      <p>View and update your account details.</p>
      <div style={{ marginTop: 32 }}>
        <p><strong>Name:</strong> {userName}</p>
        <p><strong>Email:</strong> {userEmail}</p>
      </div>
    </div>
  );
};

export default Account;