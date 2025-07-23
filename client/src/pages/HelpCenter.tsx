import React from 'react';
import { useNavigate } from 'react-router-dom';

const faqs = [
  {
    question: 'How do I create a resume?',
    answer: 'Go to the Resume Builder page, choose a template, and fill in your details. You can preview and download your resume anytime.'
  },
  {
    question: 'Can I edit my resume after saving?',
    answer: 'Yes! You can return to your dashboard and edit any saved resume at any time.'
  },
  {
    question: 'Is my data secure?',
    answer: 'Absolutely. We use industry-standard encryption and never share your data with third parties.'
  },
  {
    question: 'How do I contact support?',
    answer: 'Use the Contact Support link in the footer or email us at support@resumebuilder.com.'
  },
  {
    question: 'How do I subscribe to the newsletter?',
    answer: 'Enter your email in the newsletter box in the footer and click Subscribe. You’ll receive updates and tips in your inbox.'
  }
];

const HelpCenter: React.FC = () => {
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
        Help Center
      </h1>
      <p
        style={{
          fontSize: '1.1rem',
          color: '#334155',
          marginBottom: 28,
        }}
      >
        Find answers to common questions or get in touch with our support team.
      </p>

      <div>
        {faqs.map((faq, idx) => (
          <div
            key={faq.question}
            style={{
              background: '#fff',
              borderRadius: 16,
              boxShadow: '0 2px 12px rgba(30,41,59,0.07)',
              padding: 22,
              marginBottom: 22,
              borderLeft: '5px solid #2563eb',
              transition: 'box-shadow 0.18s, transform 0.18s',
            }}
          >
            <div
              style={{
                fontWeight: 700,
                color: '#2563eb',
                marginBottom: 6,
                fontSize: '1.08rem',
              }}
            >
                  {idx + 1}. {faq.question}
                </div>
                <div
                  style={{
                    fontSize: '1.05rem',
                    color: '#334155',
                  }}
                >
                  {faq.answer}
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    };
    
    export default HelpCenter; 