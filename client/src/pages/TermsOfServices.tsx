import React from 'react';
import { useNavigate } from 'react-router-dom';

const TermsOfServices: React.FC = () => {
  const navigate = useNavigate();

  return (
    <>
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
          Terms of Service
        </h1>
        <p
          style={{
            fontSize: '1.1rem',
            color: '#334155',
            marginBottom: 28,
          }}
        >
          Please read these terms carefully before using ResumeBuilder Pro.
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
          <h2 style={{ color: '#2563eb', fontSize: '1.15rem', marginBottom: 10 }}>User Responsibilities</h2>
          <ul style={{ color: '#334155', fontSize: '1.05rem', marginBottom: 18 }}>
            <li>Provide accurate information in your resume and account.</li>
            <li>Do not use the service for unlawful purposes.</li>
          </ul>
          <h2 style={{ color: '#2563eb', fontSize: '1.15rem', marginBottom: 10 }}>Service Availability</h2>
          <ul style={{ color: '#334155', fontSize: '1.05rem', marginBottom: 18 }}>
            <li>We strive for 99.9% uptime but do not guarantee uninterrupted service.</li>
            <li>Features may change or be discontinued at any time.</li>
          </ul>
          <h2 style={{ color: '#2563eb', fontSize: '1.15rem', marginBottom: 10 }}>Privacy & Data</h2>
          <ul style={{ color: '#334155', fontSize: '1.05rem', marginBottom: 18 }}>
            <li>Your data is protected as described in our Privacy Policy.</li>
          </ul>
          <div style={{ color: '#64748b', fontSize: '0.98rem' }}>
            For questions, contact <b>mealsbyers750@gmail.com</b>.
          </div>
        </div>
      </div>
      {/* Footer OUTSIDE the container */}
    </>
  );
};

export default TermsOfServices;
// filepath: c:\Users\dell\Desktop\resume-generator\client\src\pages\TermsOfServices.tsx