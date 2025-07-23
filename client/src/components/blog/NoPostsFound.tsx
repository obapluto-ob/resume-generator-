import React from 'react';

const NoPostsFound: React.FC = () => (
  <div
    style={{
      color: '#64748b',
      fontSize: '1.18rem',
      gridColumn: '1/-1',
      textAlign: 'center',
      padding: '60px 0 40px 0',
      background: 'linear-gradient(90deg, #f1f5f9 60%, #e0e7ff 100%)',
      borderRadius: 18,
      boxShadow: '0 2px 12px rgba(30,41,59,0.07)',
      margin: '24px 0',
      animation: 'fadeInNoPosts 0.7s',
      position: 'relative',
    }}
  >
    <style>
      {`
        @keyframes fadeInNoPosts {
          from { opacity: 0; transform: translateY(20px);}
          to { opacity: 1; transform: none;}
        }
        .no-posts-emoji {
          font-size: 3.5rem;
          margin-bottom: 10px;
          display: inline-block;
          animation: bounce 1.2s infinite alternate;
        }
        @keyframes bounce {
          from { transform: translateY(0);}
          to { transform: translateY(-10px);}
        }
      `}
    </style>
    <div className="no-posts-emoji">🗒️</div>
    <div style={{ marginTop: 12 }}>
      No posts found.
    </div>
  </div>
);

export default NoPostsFound;