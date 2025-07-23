import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';
import '../styles/Header.css';

interface HeaderProps {
  user?: {
    name?: string;
    email?: string;
    avatarUrl?: string;
  } | null;
}

const resumeName = "EMONIPRORESUMEBULER";

const Header: React.FC<HeaderProps> = ({ user }) => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <header className="headerRoot">
      <div className="headerLogo" onClick={() => navigate("/")}>
        <span className="headerBrand">ResumeGen</span>
        <span className="headerResumeName">{resumeName}</span>
      </div>
      <nav className="headerNav">
        <button className="headerNavBtn" onClick={() => navigate("/builder")}>Create Resume</button>
        {location.pathname === "/dashboard" ? (
          <button className="headerNavBtn" onClick={() => navigate("/")}>Home</button>
        ) : (
          <button className="headerNavBtn" onClick={() => navigate("/dashboard")}>Dashboard</button>
        )}
        <button className="headerNavBtn" onClick={() => navigate("/pricing")}>Pricing</button>
        <button className="headerNavBtn" onClick={() => navigate("/support")}>Support</button>
      </nav>
      <div className="headerUser">
        {user && user.name ? (
          <div className="headerProfile" onClick={() => navigate("/profile")}>
            {user.avatarUrl ? (
              <img src={user.avatarUrl} alt="avatar" className="headerAvatar" />
            ) : (
              <FaUserCircle size={32} style={{ marginRight: 8, color: "#2563eb" }} />
            )}
            <span className="headerUserName">{user.name}</span>
          </div>
        ) : (
          <button className="headerLoginBtn" onClick={() => navigate("/login")}>
            Login
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;