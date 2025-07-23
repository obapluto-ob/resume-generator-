import React from 'react';
import type { BlogPost } from './types';
import BlogPostCard from './BlogPostCard';

interface BlogGridProps {
  posts: BlogPost[];
  onReadMore: (post: BlogPost) => void;
}

const BlogGrid: React.FC<BlogGridProps> = ({ posts, onReadMore }) => (
  <div
    style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
      gap: 28,
      marginTop: 10,
      animation: 'fadeIn 0.7s',
    }}
  >
    {posts.length === 0 && (
      <div
        style={{
          gridColumn: '1/-1',
          textAlign: 'center',
          color: '#64748b',
          padding: '60px 0',
          fontSize: '1.2rem',
          background: 'linear-gradient(90deg, #f1f5f9 60%, #e0e7ff 100%)',
          borderRadius: 16,
          boxShadow: '0 2px 12px rgba(30,41,59,0.07)',
        }}
      >
        <div style={{ fontSize: '3rem', marginBottom: 12 }}>🗒️</div>
        <div>No posts found. Try another tag or search!</div>
      </div>
    )}
    {posts.map(post => (
      <div
        key={post.id}
        style={{
          transition: 'box-shadow 0.18s, transform 0.18s, filter 0.18s',
        }}
      >
        <BlogPostCard post={post} onReadMore={() => onReadMore(post)} />
      </div>
    ))}
    {/* Fade-in animation keyframes */}
    <style>
      {`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px);}
          to { opacity: 1; transform: none;}
        }
      `}
    </style>
  </div>
);

export default BlogGrid;