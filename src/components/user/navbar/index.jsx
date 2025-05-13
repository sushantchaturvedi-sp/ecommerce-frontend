import React from 'react';
import './index.scss';
import { Heart, ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-brand">Exclusive</div>
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link to="/products">Home</Link>
        </li>
        <li className="nav-item">
          <Link to="/contact">Contact</Link>
        </li>
        <li className="nav-item">
          <Link to="/about">About</Link>
        </li>
        <li className="nav-item">
          <Link to="/signup">Sign up</Link>
        </li>
      </ul>
      <div className="navbar-search">
        <input type="text" placeholder="What are you looking for?" />
        <button>
          <i className="">
            <Heart size={18} />
          </i>
        </button>
        <Link to="/cart">
          <button>
            <i className="">
              <ShoppingCart size={18} />
            </i>
          </button>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
