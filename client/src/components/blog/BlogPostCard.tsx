import React from 'react';
import type { BlogPost } from './types';

interface BlogPostCardProps {
  post: BlogPost;
  onReadMore: () => void;
}

const BlogPostCard: React.FC<BlogPostCardProps> = ({ post, onReadMore }) => (
  <div
    style={{
      background: '#fff',
      borderRadius: 14,
      boxShadow: '0 2px 12px rgba(30,41,59,0.07)',
      padding: 28,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      borderLeft: '5px solid #2563eb',
      transition: 'box-shadow 0.18s, transform 0.18s, filter 0.18s, border-color 0.18s',
      cursor: 'pointer',
      minHeight: 240,
      position: 'relative',
      overflow: 'hidden'
    }}
    onClick={onReadMore}
    onMouseEnter={e => {
      (e.currentTarget as HTMLDivElement).style.boxShadow = '0 8px 32px rgba(37,99,235,0.13)';
      (e.currentTarget as HTMLDivElement).style.filter = 'brightness(1.03)';
      (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-4px) scale(1.025)';
      (e.currentTarget as HTMLDivElement).style.borderLeft = '5px solid #60a5fa';
    }}
    onMouseLeave={e => {
      (e.currentTarget as HTMLDivElement).style.boxShadow = '0 2px 12px rgba(30,41,59,0.07)';
      (e.currentTarget as HTMLDivElement).style.filter = 'none';
      (e.currentTarget as HTMLDivElement).style.transform = 'none';
      (e.currentTarget as HTMLDivElement).style.borderLeft = '5px solid #2563eb';
    }}
  >
    <div>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: 8 }}>
        <span style={{ fontSize: '1.2rem', color: '#2563eb', marginRight: 8 }}>🏷️</span>
        <h3 style={{ fontSize: '1.22rem', fontWeight: 800, margin: 0, flex: 1 }}>{post.title}</h3>
      </div>
      <div style={{ color: '#64748b', fontSize: '0.97rem', marginBottom: 10 }}>
        By <span style={{ fontWeight: 600 }}>{post.author}</span> &middot; {post.date} &middot; {post.readingTime}
      </div>
      <div style={{ display: 'flex', gap: 8, marginBottom: 12, flexWrap: 'wrap' }}>
        {post.tags.map((tag: string) => (
          <span key={tag} style={{
            background: '#e0e7ef',
            color: '#2563eb',
            borderRadius: 12,
            padding: '2px 10px',
            fontSize: '0.85rem',
            fontWeight: 600
          }}>{tag}</span>
        ))}
      </div>
      <div style={{ fontSize: '1.07rem', marginBottom: 18, color: '#334155', fontWeight: 500 }}>
        {post.excerpt}
      </div>
    </div>
    <button
      onClick={e => {
        e.stopPropagation();
        onReadMore();
      }}
      style={{
        background: 'linear-gradient(90deg, #2563eb 60%, #60a5fa 100%)',
        color: '#fff',
        border: 'none',
        borderRadius: 8,
        padding: '9px 0',
        fontSize: '1rem',
        fontWeight: 700,
        cursor: 'pointer',
        marginTop: 'auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        boxShadow: '0 1px 4px rgba(37,99,235,0.08)'
      }}
    >
      Read More <span style={{ fontSize: '1.2rem', marginLeft: 2 }}>→</span>
    </button>
  </div>
);

export default BlogPostCard;