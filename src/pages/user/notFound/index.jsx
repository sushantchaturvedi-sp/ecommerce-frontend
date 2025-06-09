import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Home } from 'lucide-react';
import './index.scss';

const NotFound = () => {
  const navigate = useNavigate();
  const gifURL = import.meta.env.VITE_404_GIF;

  return (
    <div className="notfound-container">
      <img src={gifURL} alt="404 Background" className="background-gif" />
      <div className="overlay-404">
        <h1>Oops! Page Not Found</h1>
        <p>The page you're looking for doesn’t exist or has been moved.</p>
        <button className="home-btn" onClick={() => navigate('/')}>
          <Home size={18} /> Go to Homepage
        </button>
      </div>
    </div>
  );
};

export default NotFound;
