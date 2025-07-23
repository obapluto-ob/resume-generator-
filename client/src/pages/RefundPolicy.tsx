import React from 'react';
import { useNavigate } from 'react-router-dom';

const RefundPolicy: React.FC = () => {
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
        Refund Policy
      </h1>
      <p
        style={{
          fontSize: '1.1rem',
          color: '#334155',
          marginBottom: 28,
        }}
      >
        We strive for your satisfaction. Please read our refund policy below.
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
        <h2 style={{ color: '#2563eb', fontSize: '1.15rem', marginBottom: 10 }}>Eligibility</h2>
        <ul style={{ color: '#334155', fontSize: '1.05rem', marginBottom: 18 }}>
          <li>Refunds are available within 7 days of purchase for premium plans.</li>
          <li>To qualify, you must not have downloaded or exported any resumes or cover letters.</li>
        </ul>
        <h2 style={{ color: '#2563eb', fontSize: '1.15rem', marginBottom: 10 }}>How to Request</h2>
        <ul style={{ color: '#334155', fontSize: '1.05rem', marginBottom: 18 }}>
          <li>Contact support at <b>support@resumebuilder.com</b> with your order details.</li>
          <li>Refunds are processed within 5-7 business days.</li>
        </ul>
        <div style={{ color: '#64748b', fontSize: '0.98rem' }}>
          For questions, please contact our support team.
        </div>
      </div>
    </div>
  );
};

export default RefundPolicy;