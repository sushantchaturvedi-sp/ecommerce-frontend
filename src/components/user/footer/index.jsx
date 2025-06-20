import React from 'react';
import './index.scss';
import { Link } from 'react-router-dom';
import QR from '../../../assets/QR.png';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__section">
        <h2>Exclusive</h2>
        <h3>Subscribe</h3>
        <p>Get FREE delivery on your first order</p>
        {/* <input type="email" placeholder="Enter your email" /> */}
      </div>
      <div className="footer__section">
        <h3>Support</h3>
        <p>SoftProdigy, Sec-67, Mohali, Punjab, India</p>
        <p>exclusive@exclusive.com</p>
        <p>+91-888888-9999</p>
      </div>
      <div className="footer__section">
        <h3>Account</h3>
        <ul>
          <li>
            <Link to="/account">My Account</Link>
          </li>
          <li>
            <Link to="/login">Login / Register</Link>
          </li>
          <li>
            <Link to="/cart">Cart</Link>
          </li>
          <li>
            <Link to="/wishlist">Wishlist</Link>
          </li>
          <li>
            <Link to="/products">Shop</Link>
          </li>
        </ul>
      </div>
      <div className="footer__section">
        <h3>Quick Link</h3>
        <ul>
          {/* <li>
            <Link to="/PrivacyPolicy">Privacy Policy</Link>
          </li>
          <li>
            <Link to="/Terms-of-Use">Terms of Use</Link>
          </li>
          <li>
            <Link to="/FAQ">FAQ</Link>
          </li> */}
          <li>
            <Link to="/contact">Contact</Link>
          </li>
        </ul>
      </div>
      <div className="footer__section">
        <h3>Download App</h3>
        <p>Save ₹200 with the app for new users only</p>
        <div className="app-links">
          <img src={QR} alt="QR Code" />
          {/* <div className="app-buttons">
            <button>Google Play</button>
            <button>App Store</button>
          </div> */}
        </div>
      </div>
      <div className="footer__bottom">
        <p>© Copyright EXCLUSIVE 2025. All right reserved</p>
      </div>
    </footer>
  );
};

export default Footer;
