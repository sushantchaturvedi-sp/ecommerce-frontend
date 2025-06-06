import { useState } from 'react';
import './index.scss';
import {
  Heart,
  ShoppingCart,
  CircleUserRound,
  Phone,
  LogOut,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../../../context/CartContext';
import { useAuth } from '../../../context/AuthContext';

const Navbar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { cartItems } = useCart();
  const { user, isAuthenticated, logout } = useAuth();

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
    const contentWrapper = document.getElementById('content-wrapper');
    if (contentWrapper) {
      contentWrapper.classList.toggle('blurred', !sidebarOpen);
    }
  };

  const totalCartCount = cartItems.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  return (
    <>
      <nav className="navbar">
        <span className="menu-icon" onClick={toggleSidebar}>
          &#9776;
        </span>
        <div className="navbar-brand">
          <Link to="/">Exclusive</Link>
        </div>
        <ul className="navbar-nav">
          <input
            className="search-ph"
            type="text"
            placeholder=" 🔍︎   What are you looking for?"
          />
        </ul>

        <div className="buttons-nav">
          <Link to="/contact" className="nav-item" title="Contact">
            <Phone size={18} />
          </Link>

          <Link to="/wishlist" className="wishlist-icon" title="Wishlist">
            <Heart size={18} />
          </Link>

          {isAuthenticated ? (
            <button className="nav-item" onClick={logout} title="Logout">
              <LogOut size={18} />
            </button>
          ) : (
            <Link to="/signup" className="nav-item" title="Signup">
              <CircleUserRound size={18} />
            </Link>
          )}


          <Link to="/cart" className="cart-count">
            <i className="shoppingcart-icon">
              <ShoppingCart size={18} />
            </i>
            <span className="cart-count-badge">{totalCartCount}</span>
          </Link>

        </div>
      </nav>

      {/* Sidebar */}
      <div className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        {isAuthenticated ? (
          <div className="sidebar-user">
            <p>
              Hello, <strong>{user?.username}</strong>
            </p>
          </div>
        ) : (
          <p className="sidebar-user">Welcome, Guest</p>
        )}

        <Link to="/account">My Account</Link>
        <Link to="/orders">My Orders</Link>
      </div>

      {sidebarOpen && <div className="overlay" onClick={toggleSidebar}></div>}
    </>
  );
};

export default Navbar;
