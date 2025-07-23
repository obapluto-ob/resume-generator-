export const pricingPlans = [
  {
    name: 'Basic',
    price: 'Free',
    usd: 'Free',
    period: 'forever',
    features: [
      'Access to 4 free templates',
      'Basic resume editor',
      'PDF export',
      'Mobile responsive design',
      'Basic ATS optimization'
    ],
    buttonText: 'Start Free',
    popular: false,
    color: '#6b7280',
    icon: '🟢'
  },
  {
    name: 'Professional',
    price: 'KES 350',
    usd: '$2.50',
    period: 'month',
    features: [
      'All premium templates',
      'Advanced customization tools',
      'Multiple export formats (PDF, Word, TXT)',
      'Priority support',
      'Cover letter builder',
      'LinkedIn profile optimization',
      'Real-time collaboration',
      'Advanced ATS scoring'
    ],
    buttonText: 'Start 7-Day Free Trial',
    popular: true,
    color: '#2563eb',
    icon: '💎'
  },
  {
    name: 'Teams',
    price: 'KES 2,500',
    usd: '$18',
    period: 'month',
    features: [
      'Everything in Professional',
      'Team workspace (up to 10 users)',
      'Custom company templates',
      'Bulk resume processing',
      'Advanced analytics dashboard',
      'API access',
      'Single sign-on (SSO)',
      'Dedicated account manager'
    ],
    buttonText: 'Contact Sales',
    popular: false,
    color: '#a21caf',
    icon: '🤝'
  }
];