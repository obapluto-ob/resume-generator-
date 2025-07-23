import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import emailjs from 'emailjs-com';
import '../styles/Footer.css';

const Footer: React.FC<{ className?: string }> = ({ className }) => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterStatus, setNewsletterStatus] = useState('');

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setNewsletterStatus('');
    if (newsletterEmail && newsletterEmail.includes('@')) {
      try {
        await emailjs.send(
          'service_ue3kycf',
          'template_3vf5ri7',
          { user_email: newsletterEmail },
          'YFWeWCiJ_pSTH4xUE'
        );
        setNewsletterStatus('Thank you for subscribing! You will receive career tips and updates.');
        setNewsletterEmail('');
      } catch (error) {
        setNewsletterStatus('Subscription failed. Please try again later.');
      }
    }
  };

  return (
    <footer className={`footer ${className || ''}`}>
      <div className="footer-container">
        <div className="footer-grid">
          {/* Brand & Newsletter */}
          <div className="footer-col">
            <div className="footer-brand">
              <div className="footer-logo">R</div>
              <h3>EMONI RESUME BUILDER PRO</h3>
            </div>
            <p>
              Build your professional resume with confidence.<br />
              Secure, modern, and trusted by real job seekers.
            </p>
            <div className="footer-contact">
              <a href="mailto:michealbyers750@gmail.com" className="footer-link">
                michealbyers750@gmail.com
              </a>
              <a href="tel:+12406700241" className="footer-link">
                +1 240-670-0241
              </a>
              <span className="footer-hours">Mon-Fri: 9AM-6PM EST</span>
            </div>
            <form onSubmit={handleNewsletterSubmit} className="footer-newsletter">
              <input
                type="email"
                value={newsletterEmail}
                onChange={e => setNewsletterEmail(e.target.value)}
                placeholder="Your email"
                required
                className="footer-input"
                aria-label="Newsletter email"
              />
              <button type="submit" className="footer-btn">
                Subscribe
              </button>
            </form>
            {newsletterStatus && (
              <div
                className="footer-newsletter-status"
                style={{ color: newsletterStatus.startsWith('Thank') ? '#22c55e' : '#ef4444', marginTop: 8 }}
              >
                {newsletterStatus}
              </div>
            )}
          </div>

          {/* Quick Links */}
          <div className="footer-col">
            <h4>Quick Links</h4>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/builder">Resume Builder</Link></li>
              <li><Link to="/dashboard">My Dashboard</Link></li>
              <li><Link to="/pricing">Pricing & Plans</Link></li>
              <li><Link to="/contact-support">Contact Support</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div className="footer-col">
            <h4>Resources</h4>
            <ul>
              <li><Link to="/resume-tips">Resume Tips</Link></li>
              <li><Link to="/interview-tips">Interview Prep</Link></li>
              <li><Link to="/privacy">Privacy Policy</Link></li>
              <li><Link to="/terms">Terms of Service</Link></li>
            </ul>
          </div>

          {/* Legal & Support */}
          <div className="footer-col">
            <h4>Legal & Support</h4>
            <ul>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/faq">FAQ</Link></li>
              <li><Link to="/help">Help Center</Link></li>
              <li><Link to="/refund">Refund Policy</Link></li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <div className="footer-bottom-left">
            <p>&copy; {new Date().getFullYear()} EMONI RESUME BUILDER PRO. All rights reserved.</p>
            <p className="tagline">Empowering careers with secure, modern resume solutions.</p>
            <p className="privacy-link">
              <Link to="/privacy">Privacy Policy</Link>
            </p>
          </div>
          <div className="footer-badges">
            <div className="footer-badge">
              <span className="footer-badge-dot ssl"></span>
              <span>SSL Encrypted</span>
            </div>
            <div className="footer-badge">
              <span className="footer-badge-dot gdpr"></span>
              <span>GDPR Compliant</span>
            </div>
            <div className="footer-badge">
              <span className="footer-badge-dot uptime"></span>
              <span>99.9% Uptime</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;