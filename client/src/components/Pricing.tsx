import React from 'react';
import PricingPlans from './PricingPlans';

const Pricing: React.FC = () => {
  return (
    <div
      style={{
        minHeight: '100vh',
        width: '100vw',
        background: 'linear-gradient(120deg, #e0e7ff 0%, #f0fdfa 100%)',
        padding: '0',
        margin: '0',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '1400px',
          margin: '0 auto',
          padding: '60px 20px 80px 20px',
        }}
      >
        <h1
          style={{
            fontSize: '2.8rem',
            fontWeight: 800,
            color: '#1f2937',
            marginBottom: 12,
            textAlign: 'center',
            letterSpacing: 0.5
          }}
        >
          Pricing Plans
        </h1>
        <p style={{
          textAlign: 'center',
          color: '#64748b',
          fontSize: '1.2rem',
          marginBottom: 40
        }}>
          Affordable for Africa, transparent for the world.
        </p>
        <PricingPlans />
      </div>
    </div>
  );
};

export default Pricing;