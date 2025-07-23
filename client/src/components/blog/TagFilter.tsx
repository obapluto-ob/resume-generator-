import React from 'react';

interface TagFilterProps {
  tags: string[];
  activeTag: string | null;
  setActiveTag: (tag: string | null) => void;
}

const TagFilter: React.FC<TagFilterProps> = ({ tags, activeTag, setActiveTag }) => (
  <div style={{ marginBottom: 24, display: 'flex', gap: 10, flexWrap: 'wrap' }}>
    <button
      onClick={() => setActiveTag(null)}
      style={{
        background: activeTag === null ? '#2563eb' : '#e0e7ef',
        color: activeTag === null ? '#fff' : '#2563eb',
        border: 'none',
        borderRadius: 20,
        padding: '7px 20px',
        fontWeight: 700,
        cursor: 'pointer',
        fontSize: '1rem',
        boxShadow: activeTag === null ? '0 2px 8px rgba(37,99,235,0.10)' : 'none',
        outline: activeTag === null ? '2px solid #2563eb' : 'none',
        transition: 'all 0.18s'
      }}
      tabIndex={0}
    >
      All
    </button>
    {tags.map(tag => (
      <button
        key={tag}
        onClick={() => setActiveTag(tag)}
        style={{
          background: activeTag === tag ? '#2563eb' : '#e0e7ef',
          color: activeTag === tag ? '#fff' : '#2563eb',
          border: 'none',
          borderRadius: 20,
          padding: '7px 20px',
          fontWeight: 700,
          cursor: 'pointer',
          fontSize: '1rem',
          boxShadow: activeTag === tag ? '0 2px 8px rgba(37,99,235,0.10)' : 'none',
          outline: activeTag === tag ? '2px solid #2563eb' : 'none',
          transition: 'all 0.18s'
        }}
        tabIndex={0}
        onFocus={e => (e.currentTarget.style.outline = '2px solid #2563eb')}
        onBlur={e => (e.currentTarget.style.outline = activeTag === tag ? '2px solid #2563eb' : 'none')}
      >
        {tag}
      </button>
    ))}
  </div>
);

export default TagFilter;