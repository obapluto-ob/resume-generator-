import React from 'react';
import { useNavigate } from 'react-router-dom';
import { pricingPlans } from '../data/pricingData';

const PricingPlans: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '16px',
        alignItems: 'stretch'
      }}
    >
      {pricingPlans.map(plan => (
        <div
          key={plan.name}
          style={{
            background: 'white',
            borderRadius: '18px',
            boxShadow: plan.popular
              ? '0 6px 20px 0 #2563eb33, 0 0 0 2px #2563eb22'
              : '0 2px 12px 0 #a1a1aa22',
            border: plan.popular
              ? '2px solid #2563eb'
              : '1px solid #e5e7eb',
            padding: '20px 12px 18px 12px',
            position: 'relative',
            textAlign: 'center',
            transition: 'all 0.25s cubic-bezier(.4,2,.6,1)',
            minHeight: 210,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            overflow: 'hidden'
          }}
          onMouseEnter={e => {
            e.currentTarget.style.transform = 'scale(1.04)';
            e.currentTarget.style.boxShadow = plan.popular
              ? '0 12px 32px #2563eb44, 0 0 0 4px #2563eb33'
              : '0 4px 16px #a1a1aa33';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.transform = 'none';
            e.currentTarget.style.boxShadow = plan.popular
              ? '0 6px 20px 0 #2563eb33, 0 0 0 2px #2563eb22'
              : '0 2px 12px 0 #a1a1aa22';
          }}
        >
          {/* Accent Gradient Bar */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: 5,
              background: `linear-gradient(90deg, ${plan.color} 60%, #f0fdfa 100%)`,
              borderTopLeftRadius: 18,
              borderTopRightRadius: 18
            }}
          />
          {/* Most Popular Badge */}
          {plan.popular && (
            <div
              style={{
                position: 'absolute',
                top: 10,
                right: 10,
                background: 'linear-gradient(90deg, #2563eb 60%, #60a5fa 100%)',
                color: 'white',
                padding: '4px 14px',
                borderRadius: '12px',
                fontSize: '0.85rem',
                fontWeight: 700,
                boxShadow: '0 2px 8px #2563eb44',
                letterSpacing: 1,
                zIndex: 2
              }}
            >
              Most Popular
            </div>
          )}

          {/* Plan Name */}
          <h3
            style={{
              fontSize: '1.1rem',
              fontWeight: 800,
              margin: '0 0 7px 0',
              color: plan.popular ? '#2563eb' : '#1f2937',
              letterSpacing: 0.5
            }}
          >
            {plan.name}
          </h3>

          {/* Price */}
          <div
            style={{
              fontSize: '1.25rem',
              fontWeight: 900,
              color: '#1f2937',
              margin: '0 0 2px 0'
            }}
          >
            {plan.price}
            <span
              style={{
                fontSize: '0.85rem',
                color: '#6b7280',
                fontWeight: 500,
                marginLeft: 2
              }}
            >
              /{plan.period}
            </span>
          </div>
          {/* USD Price */}
          {plan.usd && plan.usd !== 'Free' && (
            <div style={{
              fontSize: '0.85rem',
              color: '#2563eb',
              fontWeight: 600,
              marginBottom: 4
            }}>
              {plan.usd} <span style={{ color: '#6b7280', fontWeight: 400 }}>/month</span>
            </div>
          )}

          {/* Features */}
          <ul
            style={{
              listStyle: 'none',
              padding: 0,
              margin: '10px 0 10px 0',
              textAlign: 'left'
            }}
          >
            {plan.features.slice(0, 2).map(feature => (
              <li
                key={feature}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                  fontSize: '0.85rem',
                  color: '#374151',
                  marginBottom: 5,
                  fontWeight: 500
                }}
              >
                <span
                  style={{
                    color: plan.popular ? '#2563eb' : '#10b981',
                    fontWeight: 700,
                    fontSize: '1rem'
                  }}
                >
                  ✓
                </span>
                {feature}
              </li>
            ))}
            {/* Show one more feature as "New" with animation */}
            {plan.features[2] && (
              <li
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                  fontSize: '0.85rem',
                  color: '#374151',
                  marginBottom: 5,
                  fontWeight: 500
                }}
              >
                <span
                  style={{
                    color: '#f59e0b',
                    fontWeight: 700,
                    fontSize: '1rem'
                  }}
                >
                  ★
                </span>
                {plan.features[2]}
                <span
                  style={{
                    background: 'linear-gradient(90deg,#f59e0b,#fbbf24)',
                    color: 'white',
                    fontSize: '0.7rem',
                    fontWeight: 700,
                    borderRadius: '8px',
                    padding: '1px 7px',
                    marginLeft: 6,
                    animation: 'pulse 1.2s infinite alternate'
                  }}
                >
                  New
                </span>
              </li>
            )}
          </ul>

          {/* Button */}
          <button
            onClick={() => {
              if (plan.name === 'Teams') navigate('/contact');
              else navigate('/builder');
            }}
            style={{
              background: plan.popular
                ? 'linear-gradient(135deg, #2563eb 0%, #60a5fa 100%)'
                : plan.name === 'Teams'
                ? 'linear-gradient(135deg, #a21caf 0%, #f472b6 100%)'
                : 'linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%)',
              color: plan.popular || plan.name === 'Teams' ? 'white' : '#374151',
              padding: '8px 0',
              border: 'none',
              borderRadius: '8px',
              fontSize: '0.95rem',
              fontWeight: 700,
              cursor: 'pointer',
              width: '100%',
              boxShadow: plan.popular
                ? '0 2px 8px #2563eb33'
                : '0 1px 4px #64748b11',
              marginTop: 'auto',
              transition: 'all 0.2s',
              outline: 'none'
            }}
            onMouseEnter={e => {
              e.currentTarget.style.filter = 'brightness(1.08)';
              e.currentTarget.style.boxShadow = '0 4px 16px #2563eb33';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.filter = 'none';
              e.currentTarget.style.boxShadow = plan.popular
                ? '0 2px 8px #2563eb33'
                : '0 1px 4px #64748b11';
            }}
          >
            {plan.buttonText}
          </button>
        </div>
      ))}
    </div>
  );
};

export default PricingPlans;