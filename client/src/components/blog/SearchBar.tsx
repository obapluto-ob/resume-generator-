import React from 'react';

interface SearchBarProps {
  search: string;
  setSearch: (s: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ search, setSearch }) => (
  <div style={{
    position: 'relative',
    width: '100%',
    maxWidth: 400,
    marginBottom: 28,
  }}>
    <span
      style={{
        position: 'absolute',
        left: 14,
        top: '50%',
        transform: 'translateY(-50%)',
        color: '#94a3b8',
        fontSize: '1.2rem',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      {/* Outlined search icon SVG */}
      <svg width="20" height="20" fill="none" stroke="#94a3b8" strokeWidth="2" viewBox="0 0 24 24">
        <circle cx="11" cy="11" r="7" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>
    </span>
    <input
      type="text"
      placeholder="Search blog posts..."
      value={search}
      onChange={e => setSearch(e.target.value)}
      style={{
        padding: '10px 14px 10px 38px',
        borderRadius: 8,
        border: '1.5px solid #cbd5e1',
        fontSize: '1rem',
        width: '100%',
        boxShadow: '0 1px 6px rgba(30,41,59,0.06)',
        outline: 'none',
        transition: 'border 0.18s, box-shadow 0.18s',
      }}
      onFocus={e => {
        e.currentTarget.style.border = '1.5px solid #2563eb';
        e.currentTarget.style.boxShadow = '0 2px 12px rgba(37,99,235,0.10)';
      }}
      onBlur={e => {
        e.currentTarget.style.border = '1.5px solid #cbd5e1';
        e.currentTarget.style.boxShadow = '0 1px 6px rgba(30,41,59,0.06)';
      }}
    />
  </div>
);

export default SearchBar;