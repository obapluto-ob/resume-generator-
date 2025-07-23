import React from 'react';
import { useNavigate } from 'react-router-dom';

const negotiationTips = [
  {
    title: 'Research Market Rates',
    content: 'Know the average salary for your role and experience in your location. Use sites like Glassdoor, Payscale, or LinkedIn Salary.'
  },
  {
    title: 'Know Your Value',
    content: 'List your skills, achievements, and unique strengths. Be ready to explain how you add value to the company.'
  },
  {
    title: 'Practice Your Pitch',
    content: 'Rehearse how you’ll present your case for a higher salary. Stay confident and professional.'
  },
  {
    title: 'Let the Employer Make the First Offer',
    content: 'If possible, avoid naming a number first. This can give you more leverage in negotiations.'
  },
  {
    title: 'Consider the Whole Package',
    content: 'Evaluate benefits, bonuses, remote work, and growth opportunities—not just base salary.'
  },
  {
    title: 'Be Ready to Negotiate',
    content: 'Prepare for counteroffers and be willing to negotiate respectfully. Know your minimum acceptable offer.'
  },
  {
    title: 'Get It in Writing',
    content: 'Once you reach an agreement, ask for a written offer letter that includes all negotiated terms.'
  }
];

const SalaryNegotiation: React.FC = () => {
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
        Salary Negotiation Guide
      </h1>
      <p
        style={{
          fontSize: '1.1rem',
          color: '#334155',
          marginBottom: 28,
        }}
      >
        Use these tips to confidently negotiate your next salary offer.
      </p>

      <div>
        {negotiationTips.map((tip, idx) => (
          <div
            key={tip.title}
            style={{
              background: '#fff',
              borderRadius: 16,
              boxShadow: '0 2px 12px rgba(30,41,59,0.07)',
              padding: 22,
              marginBottom: 22,
              borderLeft: '5px solid #2563eb',
              display: 'flex',
              alignItems: 'flex-start',
              gap: 16,
              transition: 'box-shadow 0.18s, transform 0.18s',
              cursor: 'pointer',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.boxShadow = '0 6px 24px rgba(37,99,235,0.13)';
              e.currentTarget.style.transform = 'translateY(-2px) scale(1.01)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.boxShadow = '0 2px 12px rgba(30,41,59,0.07)';
              e.currentTarget.style.transform = 'none';
            }}
          >
            <span
              style={{
                minWidth: 36,
                height: 36,
                background: '#2563eb',
                color: '#fff',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 800,
                fontSize: '1.1rem',
                marginTop: 2,
              }}
            >
              {idx + 1}
            </span>
            <div>
              <div
                style={{
                  fontWeight: 700,
                  color: '#2563eb',
                  marginBottom: 6,
                  fontSize: '1.08rem',
                }}
              >
                {tip.title}
              </div>
              <div
                style={{
                  fontSize: '1.05rem',
                  color: '#334155',
                }}
              >
                {tip.content}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SalaryNegotiation;