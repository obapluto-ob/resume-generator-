import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ContactSupport: React.FC = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  // Uses your Formspree ID and sends to mealsbyers750@gmail.com automatically
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const res = await fetch('https://formspree.io/f/xzzvzkpz', {
      method: 'POST',
      headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, message }),
    });
    if (res.ok) {
      setSubmitted(true);
    } else {
      setError('There was a problem sending your message. Please try again later.');
    }
  };

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
        Contact Support
      </h1>
      <p
        style={{
          fontSize: '1.1rem',
          color: '#334155',
          marginBottom: 28,
        }}
      >
        Fill out the form below and your message will be sent directly to <b>mealsbyers750@gmail.com</b>.
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
        {submitted ? (
          <div style={{ color: '#22c55e', fontWeight: 600 }}>
            Thank you for contacting support! We will respond to your inquiry soon.
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <label style={{ fontWeight: 700, color: '#2563eb', display: 'block', marginBottom: 6 }}>
              Name
            </label>
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              required
              style={{
                width: '100%',
                borderRadius: 8,
                border: '1.5px solid #e0e7ef',
                padding: 12,
                fontSize: '1rem',
                marginBottom: 18,
              }}
              placeholder="Your name"
            />

            <label style={{ fontWeight: 700, color: '#2563eb', display: 'block', marginBottom: 6 }}>
              Your Email
            </label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              style={{
                width: '100%',
                borderRadius: 8,
                border: '1.5px solid #e0e7ef',
                padding: 12,
                fontSize: '1rem',
                marginBottom: 18,
              }}
              placeholder="Your email"
            />

            <label style={{ fontWeight: 700, color: '#2563eb', display: 'block', marginBottom: 6 }}>
              Message
            </label>
            <textarea
              value={message}
              onChange={e => setMessage(e.target.value)}
              required
              rows={5}
              style={{
                width: '100%',
                borderRadius: 8,
                border: '1.5px solid #e0e7ef',
                padding: 12,
                fontSize: '1rem',
                marginBottom: 18,
                resize: 'vertical',
              }}
              placeholder="How can we help you?"
            />

            <button
              type="submit"
              style={{
                background: 'linear-gradient(90deg, #2563eb 60%, #60a5fa 100%)',
                color: '#fff',
                border: 'none',
                borderRadius: 8,
                padding: '12px 0',
                fontWeight: 700,
                fontSize: '1.08rem',
                cursor: 'pointer',
                width: '100%',
                marginTop: 10,
                transition: 'background 0.18s',
              }}
            >
              Send Message
            </button>
            {error && (
              <div style={{ color: '#ef4444', marginTop: 12 }}>
                {error}
              </div>
            )}
          </form>
        )}
      </div>
    </div>
  );
};

export default ContactSupport;