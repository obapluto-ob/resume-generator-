import React from 'react';
import type { BlogPost } from './types';

interface FeaturedPostProps {
  post: BlogPost;
  onReadMore: () => void;
}

const FeaturedPost: React.FC<FeaturedPostProps> = ({ post, onReadMore }) => (
  <div
    style={{
      background: 'linear-gradient(90deg, #e0e7ff 60%, #f8fafc 100%)',
      borderRadius: 22,
      boxShadow: '0 8px 32px rgba(37,99,235,0.13)',
      padding: 44,
      marginBottom: 48,
      display: 'flex',
      flexDirection: 'column',
      maxWidth: 760,
      border: '2.5px solid #2563eb',
      position: 'relative',
      animation: 'fadeInFeatured 0.7s',
    }}
  >
    <style>
      {`
        @keyframes fadeInFeatured {
          from { opacity: 0; transform: translateY(32px);}
          to { opacity: 1; transform: none;}
        }
        .star-animate {
          animation: starPop 1.2s infinite alternate;
        }
        @keyframes starPop {
          from { transform: scale(1) rotate(-10deg);}
          to { transform: scale(1.18) rotate(10deg);}
        }
        .featured-pill {
          background: #2563eb;
          color: #fff;
          border-radius: 16px;
          padding: 4px 18px;
          font-weight: 700;
          font-size: 1rem;
          display: inline-block;
          margin-bottom: 12px;
          letter-spacing: 0.04em;
          box-shadow: 0 1px 6px rgba(37,99,235,0.10);
        }
        .readmore-btn:hover {
          background: linear-gradient(90deg, #1e40af 60%, #60a5fa 100%);
          box-shadow: 0 2px 12px rgba(37,99,235,0.13);
        }
      `}
    </style>
    <span
      className="star-animate"
      style={{
        position: 'absolute',
        top: 22,
        right: 32,
        fontSize: '2.1rem',
        color: '#fbbf24',
        filter: 'drop-shadow(0 2px 6px #fbbf24aa)'
      }}
      aria-label="Featured"
    >★</span>
    <span className="featured-pill">Featured</span>
    <h2 style={{ fontSize: '2.2rem', fontWeight: 900, margin: '0 0 10px 0', color: '#1e293b', letterSpacing: '-1px' }}>
      {post.title}
    </h2>
    <div style={{
      height: 2,
      background: 'linear-gradient(90deg, #2563eb 40%, #e0e7ff 100%)',
      borderRadius: 2,
      margin: '12px 0 18px 0',
      width: 80,
    }} />
    <div style={{ color: '#64748b', fontSize: '1.05rem', marginBottom: 14 }}>
      By <span style={{ fontWeight: 700 }}>{post.author}</span> &middot; {post.date} &middot; {post.readingTime}
    </div>
    <div style={{ fontSize: '1.13rem', marginBottom: 22, color: '#334155', fontWeight: 500 }}>
      {post.excerpt}
    </div>
    <div style={{ display: 'flex', gap: 10, marginBottom: 22, flexWrap: 'wrap' }}>
      {post.tags.map((tag: string) => (
        <span key={tag} style={{
          background: '#e0e7ef',
          color: '#2563eb',
          borderRadius: 14,
          padding: '4px 14px',
          fontSize: '0.97rem',
          fontWeight: 700,
          boxShadow: '0 1px 4px rgba(37,99,235,0.07)',
          letterSpacing: '0.01em'
        }}>
          #{tag}
        </span>
      ))}
    </div>
    <button
      className="readmore-btn"
      onClick={onReadMore}
      style={{
        background: 'linear-gradient(90deg, #2563eb 60%, #60a5fa 100%)',
        color: '#fff',
        border: 'none',
        borderRadius: 10,
        padding: '12px 0',
        fontSize: '1.08rem',
        fontWeight: 700,
        cursor: 'pointer',
        width: 180,
        marginTop: 8,
        alignSelf: 'flex-start',
        transition: 'background 0.18s, box-shadow 0.18s'
      }}
    >
      Read More &nbsp; <span style={{ fontSize: '1.2rem', verticalAlign: 'middle' }}>→</span>
    </button>
  </div>
);

export default FeaturedPost;