import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Dashboard.css';
import Header from './Header';
import { FaUserCircle } from 'react-icons/fa'; // Add this for a better default avatar
import { useUser } from '../context/UserContext';

const defaultStats = {
  totalResumes: 0,
  totalCoverLetters: 0,
  totalDownloads: 0,
  successRate: 0,
};

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useUser();
  const [userStats, setUserStats] = useState(defaultStats);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    // Load stats from localStorage if available
    const savedStats = localStorage.getItem('userStats');
    if (savedStats) {
      setUserStats(JSON.parse(savedStats));
    }
  }, []);

  // Example: Save stats to localStorage after an update
  // useEffect(() => {
  //   localStorage.setItem('userStats', JSON.stringify(userStats));
  // }, [userStats]);

  const userName = user?.name || 'User';
  const userEmail = user?.email || 'user@email.com';

  const handleLogout = () => {
    // Implement logout functionality
    console.log('Logout clicked');
  };

  return (
    <div className="dashboard-bg">
      <Header user={user} />
      <main className="dashboard-main">
        <section className="dashboard-welcome-card" style={{ position: 'relative' }}>
          <div
            className="dashboard-avatar-large"
            onClick={() => setDropdownOpen((v) => !v)}
            style={{ cursor: 'pointer' }}
          >
            {user?.avatarUrl ? (
              <img src={user.avatarUrl} alt="Avatar" />
            ) : (
              <FaUserCircle size={80} color="#2563eb" />
            )}
          </div>
          {dropdownOpen && (
            <div className="dashboard-dropdown">
              <button onClick={() => navigate('/profile')}>Profile</button>
              <button onClick={() => navigate('/settings')}>Settings</button>
              <button className="dashboard-logout-btn" onClick={handleLogout}>
                Logout
              </button>
            </div>
          )}
          <div className="dashboard-user-details">
            <h2>
              Welcome back, <span className="dashboard-user">{userName}</span>
            </h2>
            <p className="dashboard-user-email">{userEmail}</p>
            <p className="dashboard-user-desc">
              Build your professional resume with confidence.
              <br />
              You have <b>{userStats.totalResumes}</b> resume and{' '}
              <b>{userStats.totalCoverLetters}</b> cover letters.
              <br />
              Downloaded <b>{userStats.totalDownloads}</b> times. Success rate:{' '}
              <b>{userStats.successRate}%</b>.
            </p>
          </div>
        </section>
        <section className="dashboard-stats-cards">
          <div className="dashboard-stat-card resumes">
            <div className="stat-value">{userStats.totalResumes}</div>
            <div className="stat-label">Resumes Created</div>
          </div>
          <div className="dashboard-stat-card coverletters">
            <div className="stat-value">{userStats.totalCoverLetters}</div>
            <div className="stat-label">Cover Letters</div>
          </div>
          <div className="dashboard-stat-card downloads">
            <div className="stat-value">{userStats.totalDownloads}</div>
            <div className="stat-label">Total Downloads</div>
          </div>
          <div className="dashboard-stat-card completion">
            <div className="stat-value">{userStats.successRate}%</div>
            <div className="stat-label">Completion Rate</div>
          </div>
        </section>
        <section className="dashboard-quicklinks">
          <h3>Quick Actions</h3>
          <div className="dashboard-quicklinks-btns">
            <button onClick={() => navigate('/create-resume')}>Create New Resume</button>
            <button onClick={() => navigate('/profile')}>Edit Profile</button>
            <button onClick={() => navigate('/support')}>Get Support</button>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;