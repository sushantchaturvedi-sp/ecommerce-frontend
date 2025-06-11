import React, { useEffect, useState } from 'react';
import { getWishlist, removeFromWishlist } from '../../../services/api';
import { useAuth } from '../../../context/AuthContext';
import { Link } from 'react-router-dom';
import emptyWishlistImage from '/src/assets/empty-wishlist.jpg';
import './index.scss';

const WishlistPage = () => {
  const { token } = useAuth();
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);

  const getWishListItem = async () => {
    try {
      const response = await getWishlist();
      const { data } = response;
      setWishlist(data);
    } catch (error) {
      console.error('Error fetching wishlist:', error);
      setWishlist([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getWishListItem();
  }, []);

  const handleRemove = async (id) => {
    try {
      await removeFromWishlist(id);
      setWishlist((prev) => prev.filter((p) => p._id !== id));
    } catch (error) {
      console.error('Error removing item from wishlist:', error);
    }
  };

  if (loading) return <p>Loading wishlist...</p>;

  return (
    <div className="wishlist-container">
      <h2>Your Wishlist</h2>
      <div className="wishlist-grid">
        {wishlist.length === 0 ? (
          <div className="empty-wishlist">
            <img src={emptyWishlistImage} alt="Empty Wishlist" />
            <p>Your wishlist is empty.</p>
            <Link to="/products" className="browse-btn">Start Browsing</Link>
          </div>
        ) : (
          wishlist.map((product) => (
            <div className="wishlist-card" key={product._id}>
              <Link to={`/product/${product._id}`} className="wishlist-link">
                <img src={product.images?.[0]} alt={product.name} />

                <div className="product-info">
                  <div className="product-name">{product.name}</div>
                  <div className="product-price">${product.price}</div>
                </div>

              </Link>
              <button
                className="remove-btn"
                onClick={() => handleRemove(product._id)}
              >
                Remove
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default WishlistPage;
