import React from 'react';
import { useNavigate } from 'react-router-dom';

const PrivacyPolicy: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        minHeight: '100vh',
        padding: '40px 20px',
        maxWidth: 700,
        margin: '0 auto',
        fontFamily: 'Segoe UI, Arial, sans-serif',
        color: '#1e293b',
        background: 'linear-gradient(120deg, #f8fafc 60%, #e0e7ff 100%)',
      }}
    >
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        style={{
          marginBottom: 32,
          background: 'none',
          color: '#2563eb',
          border: 'none',
          borderRadius: 8,
          padding: '6px 0 6px 0',
          fontWeight: 700,
          fontSize: '1.08rem',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: 6,
        }}
      >
        <span style={{ fontSize: '1.2rem' }}>←</span> Back
      </button>

      <h1
        style={{
          fontWeight: 900,
          fontSize: '2.1rem',
          marginBottom: 10,
          color: '#1e293b',
          letterSpacing: '-1px',
        }}
      >
        Privacy Policy
      </h1>
      <p
        style={{
          fontSize: '1.1rem',
          color: '#334155',
          marginBottom: 28,
        }}
      >
        Your privacy is important to us. This policy explains how we collect, use, and protect your information.
      </p>

      <div
        style={{
          background: '#fff',
          borderRadius: 16,
          boxShadow: '0 2px 12px rgba(30,41,59,0.07)',
          padding: 22,
          marginBottom: 22,
        }}
      >
        <h2 style={{ color: '#2563eb', fontSize: '1.15rem', marginBottom: 10 }}>Information We Collect</h2>
        <ul style={{ color: '#334155', fontSize: '1.05rem', marginBottom: 18 }}>
          <li>Personal information you provide (name, email, etc.)</li>
          <li>Resume and career data you enter</li>
          <li>Usage data and analytics</li>
        </ul>
        <h2 style={{ color: '#2563eb', fontSize: '1.15rem', marginBottom: 10 }}>How We Use Your Information</h2>
        <ul style={{ color: '#334155', fontSize: '1.05rem', marginBottom: 18 }}>
          <li>To provide and improve our services</li>
          <li>To communicate updates and offers</li>
          <li>To ensure security and compliance</li>
        </ul>
        <h2 style={{ color: '#2563eb', fontSize: '1.15rem', marginBottom: 10 }}>Your Rights</h2>
        <ul style={{ color: '#334155', fontSize: '1.05rem', marginBottom: 18 }}>
          <li>Access, update, or delete your data anytime</li>
          <li>Contact support for privacy requests</li>
        </ul>
        <div style={{ color: '#64748b', fontSize: '0.98rem' }}>
          For more details, contact us at <b>support@resumebuilder.com</b>.
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
// filepath: c:\Users\dell\Desktop\resume-generator\client\src\pages\PrivacyPolicy.tsx