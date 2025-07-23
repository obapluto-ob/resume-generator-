import React from 'react';
import { useNavigate } from 'react-router-dom';

const AboutUs: React.FC = () => {
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
        About Us
      </h1>
      <p
        style={{
          fontSize: '1.1rem',
          color: '#334155',
          marginBottom: 28,
        }}
      >
        ResumeBuilder Pro is dedicated to helping job seekers create professional, ATS-optimized resumes with ease. 
        Our platform combines industry-leading templates, AI-powered suggestions, and expert resources to empower your career journey.
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
        <h2 style={{ color: '#2563eb', fontSize: '1.15rem', marginBottom: 10 }}>Our Mission</h2>
        <p style={{ color: '#334155', fontSize: '1.05rem', marginBottom: 18 }}>
          To make career advancement accessible to everyone by providing powerful, easy-to-use resume tools and resources.
        </p>
        <h2 style={{ color: '#2563eb', fontSize: '1.15rem', marginBottom: 10 }}>Why Choose Us?</h2>
        <ul style={{ color: '#334155', fontSize: '1.05rem', marginBottom: 18 }}>
          <li>Trusted by over 2 million job seekers worldwide</li>
          <li>ATS-optimized templates and expert tips</li>
          <li>Secure and private platform</li>
          <li>Responsive support team</li>
        </ul>
        <div style={{ color: '#64748b', fontSize: '0.98rem' }}>
          Questions? Contact us at <b>support@resumebuilder.com</b>.
        </div>
      </div>
    </div>
  );
};

export default AboutUs;