import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from './Footer';

interface CoverLetterData {
  recipientName: string;
  recipientTitle: string;
  companyName: string;
  jobTitle: string;
  yourName: string;
  yourEmail: string;
  yourPhone: string;
  yourAddress: string;
  introduction: string;
  body: string;
  conclusion: string;
  date: string;
}

const CoverLetterBuilder: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'content' | 'preview'>('content');
  const [coverLetterData, setCoverLetterData] = useState<CoverLetterData>({
    recipientName: '',
    recipientTitle: '',
    companyName: '',
    jobTitle: '',
    yourName: '',
    yourEmail: '',
    yourPhone: '',
    yourAddress: '',
    introduction: '',
    body: '',
    conclusion: '',
    date: new Date().toLocaleDateString()
  });

  const handleInputChange = (field: keyof CoverLetterData, value: string) => {
    setCoverLetterData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const generateSampleContent = () => {
    setCoverLetterData(prev => ({
      ...prev,
      introduction: `I am writing to express my strong interest in the ${prev.jobTitle || '[Job Title]'} position at ${prev.companyName || '[Company Name]'}. With my relevant experience and passion for this field, I am confident that I would be a valuable addition to your team.`,
      body: `In my previous roles, I have developed strong skills in problem-solving, communication, and teamwork. I am particularly drawn to ${prev.companyName || '[Company Name]'} because of your reputation for innovation and excellence in the industry. I believe my background and enthusiasm make me an ideal candidate for this position.

My key qualifications include:
• Strong analytical and problem-solving abilities
• Excellent communication and interpersonal skills
• Proven track record of working effectively in team environments
• Adaptability and eagerness to learn new technologies and processes`,
      conclusion: `I am excited about the opportunity to contribute to ${prev.companyName || '[Company Name]'} and would welcome the chance to discuss how my skills and experience align with your needs. Thank you for considering my application. I look forward to hearing from you soon.`
    }));
  };

  const downloadCoverLetter = () => {
    const content = `
${coverLetterData.date}

${coverLetterData.recipientName}
${coverLetterData.recipientTitle}
${coverLetterData.companyName}

Dear ${coverLetterData.recipientName || 'Hiring Manager'},

${coverLetterData.introduction}

${coverLetterData.body}

${coverLetterData.conclusion}

Sincerely,
${coverLetterData.yourName}
${coverLetterData.yourEmail}
${coverLetterData.yourPhone}
${coverLetterData.yourAddress}
    `;

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `cover-letter-${coverLetterData.companyName || 'generic'}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#f8fafc',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      {/* Header */}
      <header style={{
        backgroundColor: 'white',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
        position: 'sticky',
        top: 0,
        zIndex: 1000
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 20px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          height: '80px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button
              onClick={() => navigate('/')}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '12px'
              }}
            >
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '8px',
                background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '20px',
                fontWeight: 'bold',
                color: 'white'
              }}>
                R
              </div>
              <h1 style={{
                fontSize: '1.5rem',
                fontWeight: '700',
                color: '#1f2937',
                margin: '0'
              }}>
                Cover Letter Builder
              </h1>
            </button>
          </div>
          
          <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
            <button
              onClick={() => setActiveTab('content')}
              style={{
                padding: '8px 16px',
                backgroundColor: activeTab === 'content' ? '#3b82f6' : '#e5e7eb',
                color: activeTab === 'content' ? 'white' : '#6b7280',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '0.9rem',
                fontWeight: '600'
              }}
            >
              Edit Content
            </button>
            <button
              onClick={() => setActiveTab('preview')}
              style={{
                padding: '8px 16px',
                backgroundColor: activeTab === 'preview' ? '#3b82f6' : '#e5e7eb',
                color: activeTab === 'preview' ? 'white' : '#6b7280',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '0.9rem',
                fontWeight: '600'
              }}
            >
              Preview
            </button>
            <button
              onClick={downloadCoverLetter}
              style={{
                padding: '10px 20px',
                background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '0.9rem',
                fontWeight: '600',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 4px 15px rgba(16, 185, 129, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              Download
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '40px 20px',
        display: 'grid',
        gridTemplateColumns: activeTab === 'content' ? '1fr 1fr' : '1fr',
        gap: '40px'
      }}>
        {/* Content Editor */}
        {activeTab === 'content' && (
          <div style={{
            backgroundColor: 'white',
            padding: '30px',
            borderRadius: '12px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
          }}>
            <h2 style={{
              fontSize: '1.5rem',
              fontWeight: '700',
              color: '#1f2937',
              margin: '0 0 20px 0'
            }}>
              Cover Letter Details
            </h2>

            <div style={{
              display: 'flex',
              gap: '12px',
              marginBottom: '20px'
            }}>
              <button
                onClick={generateSampleContent}
                style={{
                  padding: '8px 16px',
                  backgroundColor: '#f59e0b',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '0.8rem',
                  fontWeight: '600'
                }}
              >
                Generate Sample Content
              </button>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '20px',
              marginBottom: '30px'
            }}>
              <div>
                <label style={{
                  display: 'block',
                  fontSize: '0.9rem',
                  fontWeight: '600',
                  color: '#374151',
                  marginBottom: '8px'
                }}>
                  Your Name
                </label>
                <input
                  type="text"
                  value={coverLetterData.yourName}
                  onChange={(e) => handleInputChange('yourName', e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '2px solid #e5e7eb',
                    borderRadius: '8px',
                    fontSize: '0.9rem',
                    transition: 'border-color 0.3s ease'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
                  onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
                />
              </div>

              <div>
                <label style={{
                  display: 'block',
                  fontSize: '0.9rem',
                  fontWeight: '600',
                  color: '#374151',
                  marginBottom: '8px'
                }}>
                  Company Name
                </label>
                <input
                  type="text"
                  value={coverLetterData.companyName}
                  onChange={(e) => handleInputChange('companyName', e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '2px solid #e5e7eb',
                    borderRadius: '8px',
                    fontSize: '0.9rem',
                    transition: 'border-color 0.3s ease'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
                  onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
                />
              </div>

              <div>
                <label style={{
                  display: 'block',
                  fontSize: '0.9rem',
                  fontWeight: '600',
                  color: '#374151',
                  marginBottom: '8px'
                }}>
                  Job Title
                </label>
                <input
                  type="text"
                  value={coverLetterData.jobTitle}
                  onChange={(e) => handleInputChange('jobTitle', e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '2px solid #e5e7eb',
                    borderRadius: '8px',
                    fontSize: '0.9rem',
                    transition: 'border-color 0.3s ease'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
                  onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
                />
              </div>

              <div>
                <label style={{
                  display: 'block',
                  fontSize: '0.9rem',
                  fontWeight: '600',
                  color: '#374151',
                  marginBottom: '8px'
                }}>
                  Recipient Name
                </label>
                <input
                  type="text"
                  value={coverLetterData.recipientName}
                  onChange={(e) => handleInputChange('recipientName', e.target.value)}
                  placeholder="Hiring Manager"
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '2px solid #e5e7eb',
                    borderRadius: '8px',
                    fontSize: '0.9rem',
                    transition: 'border-color 0.3s ease'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
                  onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
                />
              </div>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{
                display: 'block',
                fontSize: '0.9rem',
                fontWeight: '600',
                color: '#374151',
                marginBottom: '8px'
              }}>
                Introduction Paragraph
              </label>
              <textarea
                value={coverLetterData.introduction}
                onChange={(e) => handleInputChange('introduction', e.target.value)}
                rows={3}
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '2px solid #e5e7eb',
                  borderRadius: '8px',
                  fontSize: '0.9rem',
                  resize: 'vertical',
                  transition: 'border-color 0.3s ease'
                }}
                onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
                onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
              />
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{
                display: 'block',
                fontSize: '0.9rem',
                fontWeight: '600',
                color: '#374151',
                marginBottom: '8px'
              }}>
                Body Paragraph
              </label>
              <textarea
                value={coverLetterData.body}
                onChange={(e) => handleInputChange('body', e.target.value)}
                rows={6}
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '2px solid #e5e7eb',
                  borderRadius: '8px',
                  fontSize: '0.9rem',
                  resize: 'vertical',
                  transition: 'border-color 0.3s ease'
                }}
                onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
                onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
              />
            </div>

            <div>
              <label style={{
                display: 'block',
                fontSize: '0.9rem',
                fontWeight: '600',
                color: '#374151',
                marginBottom: '8px'
              }}>
                Conclusion Paragraph
              </label>
              <textarea
                value={coverLetterData.conclusion}
                onChange={(e) => handleInputChange('conclusion', e.target.value)}
                rows={3}
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '2px solid #e5e7eb',
                  borderRadius: '8px',
                  fontSize: '0.9rem',
                  resize: 'vertical',
                  transition: 'border-color 0.3s ease'
                }}
                onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
                onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
              />
            </div>
          </div>
        )}

        {/* Preview */}
        <div style={{
          backgroundColor: 'white',
          padding: '40px',
          borderRadius: '12px',
          boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
          minHeight: '600px'
        }}>
          <h2 style={{
            fontSize: '1.5rem',
            fontWeight: '700',
            color: '#1f2937',
            margin: '0 0 20px 0'
          }}>
            Preview
          </h2>

          <div style={{
            fontFamily: 'serif',
            lineHeight: '1.6',
            fontSize: '0.95rem',
            color: '#1f2937'
          }}>
            <div style={{ marginBottom: '20px' }}>
              <strong>{coverLetterData.yourName || '[Your Name]'}</strong><br />
              {coverLetterData.yourEmail && <>{coverLetterData.yourEmail}<br /></>}
              {coverLetterData.yourPhone && <>{coverLetterData.yourPhone}<br /></>}
              {coverLetterData.yourAddress && <>{coverLetterData.yourAddress}<br /></>}
            </div>

            <div style={{ marginBottom: '20px' }}>
              {coverLetterData.date}
            </div>

            <div style={{ marginBottom: '20px' }}>
              {coverLetterData.recipientName || '[Recipient Name]'}<br />
              {coverLetterData.recipientTitle && <>{coverLetterData.recipientTitle}<br /></>}
              {coverLetterData.companyName || '[Company Name]'}
            </div>

            <div style={{ marginBottom: '20px' }}>
              <strong>Dear {coverLetterData.recipientName || 'Hiring Manager'},</strong>
            </div>

            <div style={{ marginBottom: '20px' }}>
              {coverLetterData.introduction || '[Introduction paragraph will appear here]'}
            </div>

            <div style={{ marginBottom: '20px' }}>
              {coverLetterData.body || '[Body paragraph will appear here]'}
            </div>

            <div style={{ marginBottom: '20px' }}>
              {coverLetterData.conclusion || '[Conclusion paragraph will appear here]'}
            </div>

            <div>
              <strong>Sincerely,</strong><br />
              {coverLetterData.yourName || '[Your Name]'}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CoverLetterBuilder;