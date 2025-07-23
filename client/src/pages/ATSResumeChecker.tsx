import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Helper: Extract keywords from resume using word boundaries and ignore case
function extractKeywords(text: string) {
  return text
    .toLowerCase()
    .match(/\b[a-z0-9\-\+\.#]+\b/g)
    ?.filter((w) => w.length > 2)
    ?? [];
}

// Helper: Fuzzy match for plurals and common suffixes
function fuzzyMatch(word: string, set: Set<string>) {
  if (set.has(word)) return true;
  // Try plural
  if (word.endsWith('s') && set.has(word.slice(0, -1))) return true;
  if (!word.endsWith('s') && set.has(word + 's')) return true;
  // Try common verb forms
  if (word.endsWith('ing') && set.has(word.slice(0, -3))) return true;
  if (word.endsWith('ed') && set.has(word.slice(0, -2))) return true;
  return false;
}

const ATSResumeChecker: React.FC = () => {
  const navigate = useNavigate();
  const [resumeText, setResumeText] = useState('');
  const [keywords, setKeywords] = useState('');
  const [result, setResult] = useState<null | {
    score: number;
    missing: string[];
    found: string[];
    keywordCount: number;
    resumeWordCount: number;
    suggestions: string[];
  }>(null);

  const handleCheck = () => {
    if (!resumeText || !keywords) {
      setResult(null);
      return;
    }
    const keywordArr = keywords
      .split(',')
      .map((k) => k.trim().toLowerCase())
      .filter(Boolean);

    const resumeWords = extractKeywords(resumeText);
    const resumeSet = new Set(resumeWords);

    const found: string[] = [];
    const missing: string[] = [];
    const suggestions: string[] = [];

    keywordArr.forEach((kw) => {
      if (fuzzyMatch(kw, resumeSet)) {
        found.push(kw);
      } else {
        missing.push(kw);
        // Suggest similar words from resume
        const similar = resumeWords.find(
          (w) =>
            w.startsWith(kw.slice(0, 4)) ||
            (kw.length > 5 && w.includes(kw.slice(0, 5)))
        );
        if (similar) suggestions.push(`Did you mean "${similar}" for "${kw}"?`);
      }
    });

    const score = Math.round((found.length / keywordArr.length) * 100);

    setResult({
      score,
      missing,
      found,
      keywordCount: keywordArr.length,
      resumeWordCount: resumeWords.length,
      suggestions,
    });
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
        ATS Resume Checker
      </h1>
      <p
        style={{
          fontSize: '1.1rem',
          color: '#334155',
          marginBottom: 28,
        }}
      >
        Paste your resume and job keywords below to see how well your resume matches the job description.
        <br />
        <span style={{ color: '#64748b', fontSize: '0.98rem' }}>
          <b>Tip:</b> Use keywords from the job posting, including skills, tools, and certifications.
        </span>
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
        <label style={{ fontWeight: 700, color: '#2563eb', display: 'block', marginBottom: 6 }}>
          Resume Text
        </label>
        <textarea
          value={resumeText}
          onChange={(e) => setResumeText(e.target.value)}
          rows={7}
          style={{
            width: '100%',
            borderRadius: 8,
            border: '1.5px solid #e0e7ef',
            padding: 12,
            fontSize: '1rem',
            marginBottom: 18,
            resize: 'vertical',
          }}
          placeholder="Paste your resume here..."
        />

        <label style={{ fontWeight: 700, color: '#2563eb', display: 'block', marginBottom: 6 }}>
          Job Keywords (comma separated)
        </label>
        <input
          type="text"
          value={keywords}
          onChange={(e) => setKeywords(e.target.value)}
          style={{
            width: '100%',
            borderRadius: 8,
            border: '1.5px solid #e0e7ef',
            padding: 12,
            fontSize: '1rem',
            marginBottom: 18,
          }}
          placeholder="e.g. project management, JavaScript, leadership"
        />

        <button
          onClick={handleCheck}
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
          Check Resume
        </button>
      </div>

      {result && (
        <div
          style={{
            background: '#f8fafc',
            borderRadius: 12,
            boxShadow: '0 1px 8px rgba(30,41,59,0.07)',
            padding: 18,
            marginBottom: 18,
            borderLeft: '4px solid #2563eb',
          }}
        >
          <div style={{ fontWeight: 700, color: '#2563eb', marginBottom: 8 }}>
            Match Score: {result.score}%
          </div>
          <div style={{ color: '#64748b', fontSize: '0.98rem', marginBottom: 8 }}>
            {result.found.length} of {result.keywordCount} keywords found in your resume.
            <br />
            Resume word count: {result.resumeWordCount}
          </div>
          {result.missing.length === 0 ? (
            <div style={{ color: '#22c55e', fontWeight: 600 }}>
              Excellent! Your resume includes all the keywords.
            </div>
          ) : (
            <>
              <div style={{ color: '#ef4444', fontWeight: 600, marginBottom: 6 }}>
                Missing keywords:
              </div>
              <ul style={{ color: '#ef4444', margin: 0, paddingLeft: 18 }}>
                {result.missing.map((kw) => (
                  <li key={kw}>{kw}</li>
                ))}
              </ul>
            </>
          )}
          {result.found.length > 0 && (
            <>
              <div style={{ color: '#22c55e', fontWeight: 600, marginTop: 10 }}>
                Found keywords:
              </div>
              <ul style={{ color: '#22c55e', margin: 0, paddingLeft: 18 }}>
                {result.found.map((kw) => (
                  <li key={kw}>{kw}</li>
                ))}
              </ul>
            </>
          )}
          {result.suggestions.length > 0 && (
            <div style={{ color: '#f59e42', fontWeight: 600, marginTop: 12 }}>
              Suggestions:
              <ul style={{ color: '#f59e42', margin: 0, paddingLeft: 18 }}>
                {result.suggestions.map((s, i) => (
                  <li key={i}>{s}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ATSResumeChecker;