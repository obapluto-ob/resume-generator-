import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import '../styles/Home.css';
import { useUser } from '../context/UserContext';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useUser();
  const [currentFeature, setCurrentFeature] = useState(0);
  const [stats, setStats] = useState({
    resumesCreated: 0,
    activeUsers: 0,
    successRate: 0,
    companiesHiring: 0
  });

  useEffect(() => {
    fetch('http://localhost:5000/api/stats')
      .then(res => res.ok ? res.json() : Promise.reject())
      .then(data => setStats(data))
      .catch(() => setStats({
        resumesCreated: 0,
        activeUsers: 0,
        successRate: 0,
        companiesHiring: 0
      }));
  }, []);

  const resumesCreated = stats?.resumesCreated ?? 0;
  const activeUsers = stats?.activeUsers ?? 0;
  const successRate = stats?.successRate ?? 0;
  const companiesHiring = stats?.companiesHiring ?? 0;

  const features = [
    {
      title: 'Job-Specific Tailoring',
      description: 'Automatically customize your resume for specific job postings with AI-driven content adaptation',
      color: '#f59e0b',
      capabilities: ['Job description matching', 'Skills highlighting', 'Experience prioritization'],
      icon: (
        <svg width="40" height="40" viewBox="0 0 40 40">
          <rect x="8" y="12" width="24" height="16" rx="8" fill="#f59e0b" />
          <text x="20" y="26" textAnchor="middle" fontSize="16" fill="white" fontWeight="bold">JOB</text>
        </svg>
      )
    },
    {
      title: 'Real-Time Collaboration',
      description: 'Work with career advisors, mentors, or team members in real-time with live editing and commenting',
      color: '#8b5cf6',
      capabilities: ['Live editing', 'Comment system', 'Version control'],
      icon: (
        <svg width="40" height="40" viewBox="0 0 40 40">
          <circle cx="20" cy="20" r="18" fill="#8b5cf6" />
          <text x="20" y="26" textAnchor="middle" fontSize="16" fill="white" fontWeight="bold">RT</text>
        </svg>
      )
    },
    {
      title: 'Analytics & Insights',
      description: 'Track your resume performance with detailed analytics on views, downloads, and employer engagement',
      color: '#ef4444',
      capabilities: ['Performance tracking', 'Engagement metrics', 'Success analytics'],
      icon: (
        <svg width="40" height="40" viewBox="0 0 40 40">
          <rect x="10" y="14" width="20" height="12" rx="6" fill="#ef4444" />
          <text x="20" y="26" textAnchor="middle" fontSize="16" fill="white" fontWeight="bold">AN</text>
        </svg>
      )
    },
    {
      title: 'Enterprise Security',
      description: 'Bank-level security with encryption, compliance certifications, and secure data handling',
      color: '#06b6d4',
      capabilities: ['256-bit encryption', 'GDPR compliance', 'SOC 2 certified'],
      icon: (
        <svg width="40" height="40" viewBox="0 0 40 40">
          <rect x="12" y="16" width="16" height="8" rx="4" fill="#06b6d4" />
          <text x="20" y="24" textAnchor="middle" fontSize="14" fill="white" fontWeight="bold">SEC</text>
        </svg>
      )
    }
  ];

  return (
    <div className="homeRoot">
      <Header user={user} />

      {/* HERO SECTION */}
      <section className="heroSection">
        <div className="heroContent">
          <h1 className="heroTitle">
            Welcome, <span className="gradientText">{user?.name || "Guest"}</span>
          </h1>
          <div className="heroTagline">
            {user?.email ? user.email : "Sign up to create your professional resume!"}
          </div>
          <div className="heroDescription">
            {user
              ? "Build, manage, and share your resume with confidence. All your data is secure and private."
              : "Fast, secure, and tailored for your career goals. No design skills needed."}
          </div>
          <div className="heroButtonRow">
            {user ? (
              <button className="heroButton" onClick={() => navigate('/dashboard')}>
                Go to Dashboard
              </button>
            ) : (
              <button className="heroButton" onClick={() => navigate('/register')}>
                Get Started
              </button>
            )}
          </div>
        </div>
      </section>

      {/* USER PROFILE SECTION */}
      {user && (
        <section className="sectionContainer" style={{ textAlign: 'center' }}>
          <div style={{ marginBottom: 24 }}>
            <h2 className="heroTitle" style={{ margin: 0 }}>
              Your Profile
            </h2>
            <div className="heroDescription" style={{ marginTop: 8, marginBottom: 16 }}>
              Manage your personal information and resume settings.
            </div>
            <button className="heroButton" onClick={() => navigate('/profile')}>
              Edit Profile
            </button>
          </div>
        </section>
      )}

      {/* STATISTICS SECTION */}
      <section className="sectionContainer">
        <div className="statsGrid">
          <div className="statsCard">
            <div className="statsNumber">{resumesCreated.toLocaleString()}</div>
            <div className="statsLabel">Resumes Created</div>
          </div>
          <div className="statsCard">
            <div className="statsNumber">{activeUsers.toLocaleString()}</div>
            <div className="statsLabel">Active Users</div>
          </div>
          <div className="statsCard">
            <div className="statsNumber">{successRate}%</div>
            <div className="statsLabel">Success Rate</div>
          </div>
          <div className="statsCard">
            <div className="statsNumber">{companiesHiring.toLocaleString()}</div>
            <div className="statsLabel">Companies Hiring</div>
          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className="sectionContainer">
        <h2 className="featuresTitle">Powerful Features</h2>
        <div className="featuresGrid">
          {features.map((feature, index) => (
            <div 
              key={feature.title} 
              className={`featureCard${index === currentFeature ? " featureCardActive" : ""}`}
              onClick={() => setCurrentFeature(index)}
            >
              <div className="featureIcon">{feature.icon}</div>
              <h3 className="featureCardTitle">{feature.title}</h3>
              <p className="featureCardDesc">{feature.description}</p>
              <div className="featureCapabilities">
                {feature.capabilities.map(capability => (
                  <span key={capability} className="featureCapability">
                    ✓ {capability}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PRICING SECTION */}
      <section className="pricingSection">
        <h2 className="pricingTitle">Flexible pricing designed to grow with your career needs</h2>
        <div className="pricingCards">
          <div className="pricingCard">
            <div className="pricingHeader">
              <span className="pricingPlan">Basic</span>
              <span className="pricingFree">Free <span className="pricingForever">/forever</span></span>
            </div>
            <ul className="pricingFeatures">
              <li><span className="check">✓</span> Access to 4 free templates</li>
              <li><span className="check">✓</span> Basic resume editor</li>
              <li><span className="star">★</span> PDF export <span className="newBadge">New</span></li>
              <li><span className="check">✓</span> Mobile responsive design</li>
              <li><span className="check">✓</span> Basic ATS optimization</li>
            </ul>
            <button className="pricingAction">Start Free</button>
          </div>
          <div className="pricingCard pricingCardPro">
            <div className="pricingHeader">
              <span className="pricingPlan">Professional</span>
              <span className="popularBadge">Most Popular</span>
              <span className="pricingAmount">KES 350 <span className="pricingMonth">/month</span></span>
              <span className="pricingAmountSmall">$2.50 /month</span>
            </div>
            <ul className="pricingFeatures">
              <li><span className="check">✓</span> All premium templates</li>
              <li><span className="check">✓</span> Advanced customization tools</li>
              <li><span className="star">★</span> Multiple export formats (PDF, Word, TXT) <span className="newBadge">New</span></li>
              <li><span className="check">✓</span> Priority support</li>
              <li><span className="check">✓</span> Cover letter builder</li>
              <li><span className="check">✓</span> LinkedIn profile optimization</li>
              <li><span className="check">✓</span> Real-time collaboration</li>
              <li><span className="check">✓</span> Advanced ATS scoring</li>
            </ul>
            <button className="pricingActionPro">Upgrade Now</button>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="sectionContainer" style={{ textAlign: 'center' }}>
        <h2 className="heroTitle">Ready to Advance Your Career?</h2>
        <p className="heroDescription">
          Join over 34,000 professionals who've successfully landed their dream jobs using our AI-powered resume builder and professional templates.
        </p>
        <div className="heroButtonRow">
          <button className="heroButton" onClick={() => navigate('/builder')}>Start Free Trial</button>
        </div>
      </section>

    </div>
  );
};

export default Home;