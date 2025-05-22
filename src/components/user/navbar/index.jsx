import { useState, useEffect } from 'react';
import './index.scss';
import { Heart, ShoppingCart, CircleUserRound, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getProfile } from '../../../services/api';

const Navbar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [user, setUser] = useState(null);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
    if (!sidebarOpen) {
      // Add the 'blurred' class to the content behind the sidebar when it's opened
      document.getElementById('content-wrapper').classList.add('blurred');
    } else {
      // Remove the 'blurred' class when the sidebar is closed
      document.getElementById('content-wrapper').classList.remove('blurred');
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await getProfile();
        setUser(data.data);
      } catch (err) {
        console.error('Error fetching user profile:', err);
      }
    };

    fetchUser();
  }, []);

  return (
    <>
      <nav className="navbar">
        <span className="menu-icon" onClick={toggleSidebar}>
          &#9776;
        </span>
        <div className="navbar-brand">Exclusive</div>

        <ul className="navbar-nav">
          <input
            className="search-ph"
            type="text"
            placeholder="🔍︎ What are you looking for?"
          />
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

      {/* Sidebar */}
      <div className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        {user ? (
          <div className="sidebar-user">
            <p>
              Hello, <strong>{user.username}</strong>
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
