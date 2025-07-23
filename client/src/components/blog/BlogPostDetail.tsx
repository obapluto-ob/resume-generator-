import React from 'react';
import type { BlogPost } from './types';

interface BlogPostDetailProps {
  post: BlogPost;
  onBack: () => void;
}

const BlogPostDetail: React.FC<BlogPostDetailProps> = ({ post, onBack }) => (
  <div
    style={{
      background: '#f8fafc',
      borderRadius: 22,
      boxShadow: '0 8px 32px rgba(37,99,235,0.13)',
      padding: 44,
      marginTop: 36,
      maxWidth: 820,
      marginLeft: 'auto',
      marginRight: 'auto',
      animation: 'fadeInDetail 0.6s',
      position: 'relative',
      minHeight: 400,
    }}
  >
    <style>
      {`
        @keyframes fadeInDetail {
          from { opacity: 0; transform: translateY(32px);}
          to { opacity: 1; transform: none;}
        }
        .back-btn:hover {
          background: #e0e7ff;
          color: #1e40af;
        }
      `}
    </style>
    <button
      onClick={onBack}
      className="back-btn"
      style={{
        background: 'none',
        border: 'none',
        color: '#2563eb',
        fontWeight: 700,
        marginBottom: 18,
        cursor: 'pointer',
        fontSize: '1.08rem',
        display: 'flex',
        alignItems: 'center',
        borderRadius: 8,
        padding: '6px 12px',
        transition: 'background 0.18s, color 0.18s',
      }}
    >
      <span style={{ fontSize: '1.3rem', marginRight: 6 }}>←</span>
      Back to all posts
    </button>
    <h2 style={{ fontSize: '2.4rem', fontWeight: 900, marginBottom: 6, color: '#1e293b', letterSpacing: '-1px' }}>
      {post.title}
    </h2>
    <div style={{
      color: '#64748b',
      fontSize: '1.05rem',
      marginBottom: 10,
      fontWeight: 500,
      letterSpacing: '0.01em'
    }}>
      By <span style={{ fontWeight: 700 }}>{post.author}</span> &middot; {post.date} &middot; {post.readingTime}
    </div>
    <div style={{
      height: 2,
      background: 'linear-gradient(90deg, #2563eb 40%, #e0e7ff 100%)',
      borderRadius: 2,
      margin: '18px 0 18px 0',
      width: 80,
    }} />
    <div style={{ display: 'flex', gap: 10, marginBottom: 22, flexWrap: 'wrap' }}>
      {post.tags.map((tag: string) => (
        <span
          key={tag}
          style={{
            background: '#e0e7ef',
            color: '#2563eb',
            borderRadius: 14,
            padding: '4px 14px',
            fontSize: '0.97rem',
            fontWeight: 700,
            boxShadow: '0 1px 4px rgba(37,99,235,0.07)',
            letterSpacing: '0.01em'
          }}
        >
          #{tag}
        </span>
      ))}
    </div>
    <div
      style={{
        fontSize: '1.16rem',
        lineHeight: 1.85,
        whiteSpace: 'pre-line',
        marginTop: 18,
        color: '#334155',
        maxWidth: 700,
      }}
      dangerouslySetInnerHTML={{
        __html: post.content
          .replace(/\*\*(.*?)\*\*/g, '<span style="color:#2563eb;font-weight:700">$1</span>')
          .replace(/- (.*?)(\n|$)/g, '<li style="margin-bottom:8px;list-style:none">✅ $1</li>')
          .replace(/`(.*?)`/g, '<code style="background:#f1f5f9;padding:2px 6px;border-radius:4px">$1</code>')
          .replace(/> (.*?)(\n|$)/g, '<blockquote style="background:#fef9c3;padding:10px 18px;border-left:4px solid #fbbf24;border-radius:8px;margin:18px 0">$1</blockquote>')
          .replace(/\n{2,}/g, '<br/><br/>'),
      }}
    />
  </div>
);

export default BlogPostDetail;