import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TagFilter from '../components/blog/TagFilter';
import SearchBar from '../components/blog/SearchBar';
import FeaturedPost from '../components/blog/FeaturedPost';
import BlogGrid from '../components/blog/BlogGrid';
import BlogPostDetail from '../components/blog/BlogPostDetail';
import type { BlogPost } from '../components/blog/types';

const posts: BlogPost[] = [
  {
    id: 1,
    title: 'How to Write a Standout Resume in 2025',
    date: 'July 10, 2025',
    excerpt: 'Discover the latest resume trends and tips for making your application stand out in a competitive job market.',
    content: `
A standout resume in 2025 is concise, visually clean, and tailored for both ATS and human readers. Here are some tips:

- **Use a modern, professional template** that is easy to scan.
- **Highlight measurable achievements** instead of just listing duties.
- **Incorporate relevant keywords** from the job description.
- **Keep formatting simple**: avoid images, charts, or fancy fonts.
- **Include a summary section** that quickly tells your story.
- **Showcase remote work skills** and digital literacy, which are increasingly valued.

> Remember to proof read and update your resume for each application!
    `,
    tags: ['Resume', 'Tips', '2025'],
    author: 'Jane Smith',
    readingTime: '4 min read',
    featured: true
  },
  {
    id: 2,
    title: 'Top 10 Interview Questions and How to Answer Them',
    date: 'June 28, 2025',
    excerpt: 'Prepare for your next interview with these common questions and expert-approved answers.',
    content: `
Here are the top 10 interview questions and how to approach them:

1. **Tell me about yourself.**
   - Focus on your professional journey and key achievements.
2. **Why do you want this job?**
   - Show your enthusiasm and how your skills fit the role.
3. **What are your strengths?**
   - Pick strengths relevant to the job and back them with examples.
4. **What is your biggest weakness?**
   - Choose a real weakness and explain how you’re improving it.
5. **Describe a challenge you’ve overcome.**
   - Use the STAR method (Situation, Task, Action, Result).
6. **Where do you see yourself in 5 years?**
   - Align your goals with the company’s direction.
7. **Why are you leaving your current job?**
   - Stay positive and focus on growth.
8. **How do you handle stress?**
   - Give examples of healthy coping strategies.
9. **Describe a time you worked in a team.**
   - Highlight collaboration and communication.
10. **Do you have any questions for us?**
    - Always prepare thoughtful questions about the company or role.

Practice your answers and be authentic!
    `,
    tags: ['Interview', 'Questions'],
    author: 'Alex Lee',
    readingTime: '5 min read'
  },
  {
    id: 3,
    title: 'Remote Work: Building Your Career from Anywhere',
    date: 'June 15, 2025',
    excerpt: 'Learn how to thrive in a remote work environment and advance your career from home.',
    content: `
Remote work is here to stay. To build your career remotely:

- **Set up a dedicated workspace** to stay focused.
- **Master digital communication tools** (Slack, Zoom, Teams).
- **Be proactive in communication**—check in regularly with your team.
- **Showcase your results**: track and share your achievements.
- **Keep learning**: take online courses and attend virtual events.
- **Network online**: join professional groups and communities.

Remote work offers flexibility and global opportunities—embrace it!
    `,
    tags: ['Remote', 'Career'],
    author: 'Morgan Kim',
    readingTime: '3 min read'
  }
];

const allTags = Array.from(new Set(posts.flatMap(post => post.tags)));

const CareerBlog: React.FC = () => {
  const [search, setSearch] = useState('');
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const navigate = useNavigate();

  const filteredPosts = posts.filter(post =>
    (activeTag ? post.tags.includes(activeTag) : true) &&
    (post.title.toLowerCase().includes(search.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(search.toLowerCase()))
  );

  const featured = posts.find(post => post.featured);

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(120deg, #f8fafc 60%, #e0e7ff 100%)',
        padding: '0',
        color: '#1e293b',
      }}
    >
      <div
        style={{
          maxWidth: 900,
          margin: '0 auto',
          padding: '48px 16px 48px 16px',
        }}
      >
        <div
          style={{
            background: '#fff',
            borderRadius: 22,
            boxShadow: '0 4px 32px rgba(30,41,59,0.10)',
            padding: '40px 32px',
            minHeight: 600,
          }}
        >
          {/* Back Button */}
          <button
            onClick={() => navigate(-1)}
            style={{
              marginBottom: 24,
              background: '#e0e7ef',
              color: '#2563eb',
              border: 'none',
              borderRadius: 8,
              padding: '8px 20px',
              fontWeight: 700,
              fontSize: '1rem',
              cursor: 'pointer',
              transition: 'background 0.18s',
            }}
          >
            ← Back
          </button>

          <h1 style={{ fontSize: '2.8rem', fontWeight: 900, marginBottom: 10, letterSpacing: '-1px' }}>
            Career Blog
          </h1>
          <p style={{ fontSize: '1.2rem', color: '#334155', marginBottom: 32 }}>
            Welcome to our <span style={{ color: '#2563eb', fontWeight: 700 }}>Career Blog</span>! Here you'll find <span style={{ background: '#e0e7ff', borderRadius: 6, padding: '2px 8px' }}>expert tips</span>, <span style={{ background: '#fef9c3', borderRadius: 6, padding: '2px 8px' }}>career news</span>, and <span style={{ background: '#bbf7d0', borderRadius: 6, padding: '2px 8px' }}>inspiration</span> for your job search and professional growth.
          </p>

          <TagFilter tags={allTags} activeTag={activeTag} setActiveTag={setActiveTag} />
          <SearchBar search={search} setSearch={setSearch} />

          {!selectedPost && featured && !search && !activeTag && (
            <FeaturedPost post={featured} onReadMore={() => setSelectedPost(featured)} />
          )}

          {selectedPost ? (
            <BlogPostDetail post={selectedPost} onBack={() => setSelectedPost(null)} />
          ) : (
            <BlogGrid posts={filteredPosts} onReadMore={setSelectedPost} />
          )}
        </div>
      </div>
    </div>
  );
};

export default CareerBlog;