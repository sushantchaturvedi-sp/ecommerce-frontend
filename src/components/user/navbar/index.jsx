import React from 'react';
import './index.scss';
import { Heart, ShoppingCart, CircleUserRound, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-brand">Exclusive</div>
      <ul className="navbar-nav">
        <input
          className="search-ph"
          type="text"
          placeholder="🔍︎ What are you looking for?"
        />

        {/* <li className="nav-item">
          <Link to="/">Home</Link>
        </li>
        <li className="nav-item">
          <Link to="/contact">Contact</Link>
        </li>
        <li className="nav-item">
          <Link to="/about">About</Link>
        </li> */}
      </ul>
      <div className="buttons-nav">
        <Link to="/contact">
          <button className="nav-item">
            <Phone size={18} />
          </button>
        </Link>
        <button>
          <i className="wishlist-icon">
            <Heart size={18} />
          </i>
        </button>

        <Link to="/signup">
          <button className="nav-item">
            <CircleUserRound size={18} />
          </button>
        </Link>
        <Link to="/cart">
          <button>
            <i className="shoppingcart-icon">
              <ShoppingCart size={18} />
            </i>
          </button>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
