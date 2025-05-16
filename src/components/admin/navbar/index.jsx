import React, { useContext } from 'react';
import './index.scss';
import { Bell, MessageSquareText } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../context/AuthContext';
import { SearchContext } from '../../../context/SearchContext';

function TopNavbar() {
  const { searchQuery, setSearchQuery } = useContext(SearchContext);
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="top-navbar">
      <div className="logo">E-Commerce</div>

      <div className="search-bar">
        <input
          type="text"
          placeholder="🔍︎ Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="nav-right">
        <span className="icon">
          <MessageSquareText />
        </span>
        <span className="icon">
          <Bell />
        </span>

        {user ? (
          <button onClick={handleLogout} className="auth-button">
            Logout
          </button>
        ) : (
          <Link to="/login" className="auth-button">
            <button>Login</button>
          </Link>
        )}
      </div>
    </div>
  );
}

export default TopNavbar;
