import React from 'react';
import './index.scss';
import { Bell, ShoppingCart, MessageSquareText, Search } from 'lucide-react';
import { Link } from 'react-router-dom';



function TopNavbar() {
  return (
    <div className="top-navbar">
      <div className="logo">E-Commerce</div>

      <div className="search-bar">
        <input type="text" placeholder="🔍︎ Search..." />
      </div>

      <div className="nav-right">
        <span className="icon">
          <MessageSquareText />
        </span>
        <span className="icon">
          <Bell />
        </span>
        <Link to="/signup" className="user-name">
        <button> Signup / Login </button>
</Link>
        {/* <span className="user-name">Sushant</span> */}
      </div>
    </div>
  );
}

export default TopNavbar;
