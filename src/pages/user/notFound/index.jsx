import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Home } from 'lucide-react';
import './index.scss';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="notfound-container">
      <img
        src="https://media1.tenor.com/m/nEn_wAIEISEAAAAC/error-404.gif"
        alt="404 Background"
        className="background-gif"
      />
      <div className="overlay">
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
