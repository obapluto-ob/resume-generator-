import React from 'react';
import { useNavigate } from 'react-router-dom';

const industryGuides = [
  {
    title: 'Technology',
    content: 'Highlight technical skills, certifications, and project experience. Include links to GitHub or portfolios. Stay updated with the latest tools and languages.'
  },
  {
    title: 'Healthcare',
    content: 'Emphasize certifications, licenses, and patient care experience. Detail your specialties and any continuing education.'
  },
  {
    title: 'Finance',
    content: 'Showcase analytical skills, certifications (like CPA, CFA), and experience with financial software. Quantify your impact with metrics.'
  },
  {
    title: 'Education',
    content: 'List teaching credentials, classroom experience, and curriculum development. Highlight adaptability and communication skills.'
  },
  {
    title: 'Marketing',
    content: 'Demonstrate campaign results, digital marketing skills, and creativity. Include metrics (ROI, engagement rates) and portfolio links.'
  },
  {
    title: 'Engineering',
    content: 'Detail technical proficiencies, certifications, and project outcomes. Use metrics to show efficiency, safety, or cost improvements.'
  },
  {
    title: 'Sales',
    content: 'Highlight sales achievements, quotas met/exceeded, and relationship-building skills. Use numbers to show your results.'
  }
];

const IndustryGuides: React.FC = () => {
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
        Industry Resume Guides
      </h1>
      <p
        style={{
          fontSize: '1.1rem',
          color: '#334155',
          marginBottom: 28,
        }}
      >
        Explore resume tips tailored for top industries.
      </p>

      <div>
        {industryGuides.map((guide, idx) => (
          <div
            key={guide.title}
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
                {guide.title}
              </div>
              <div
                style={{
                  fontSize: '1.05rem',
                  color: '#334155',
                }}
              >
                {guide.content}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default IndustryGuides;