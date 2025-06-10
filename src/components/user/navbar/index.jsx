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
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { cartItems } = useCart();
  const { user, isAuthenticated, logout } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

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

  const handleSearchKeyPress = (e) => {
    if (e.key === 'Enter' && searchTerm.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

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
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleSearchKeyPress}
          />
        </ul>

        <div className="buttons-nav">
          <Link to="/contact">
            <button className="nav-item">
              <Phone size={18} />
            </button>
          </Link>

          <Link to="/wishlist">
            <button className="wishlist-icon">
              <Heart size={18} />
            </button>
          </Link>

          {isAuthenticated ? (
            <button className="nav-item" onClick={logout} title="Logout">
              <LogOut size={18} />
            </button>
          ) : (
            <Link to="/signup">
              <button className="nav-item">
                <CircleUserRound size={18} />
              </button>
            </Link>
          )}

          <Link to="/cart">
            <button className="cart-count">
              <i className="shoppingcart-icon">
                <ShoppingCart size={18} />
              </i>
              <span className="cart-count-badge">{totalCartCount}</span>
            </button>
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
