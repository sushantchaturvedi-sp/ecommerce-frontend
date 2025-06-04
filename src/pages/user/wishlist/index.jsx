import React, { useEffect, useState } from 'react';
import { getWishlist, removeFromWishlist } from '../../../services/api';
import { useAuth } from '../../../context/AuthContext';
import './index.scss';

const WishlistPage = () => {
  const { token } = useAuth();
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  console.log('Token:', token);

  useEffect(() => {
    const getWishListItem = async () => {
      try {
        const response = await getWishlist();
        const { data } = response;
        console.log('Fetched wishlist:', data);

        setWishlist(data);
      } catch (error) {
        console.error('Error fetching wishlist:', error);
        setWishlist([]);
      } finally {
        setLoading(false);
      }
    };

    getWishListItem();
  }, []);

  const handleRemove = async (id) => {
    try {
      console.log('call');
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
        {wishlist.length > 0 ? (
          wishlist.map((product) => (
            <div className="wishlist-card" key={product._id}>
              <img src={product.images?.[0]} alt={product.name} />

              <div className="product-info">
                <div className="product-name">{product.name}</div>
                <div className="product-price">${product.price}</div>
              </div>
              <button
                className="remove-btn"
                onClick={() => handleRemove(product._id)}
              >
                Remove
              </button>
            </div>
          ))
        ) : (
          <p>Your wishlist is empty.</p>
        )}
      </div>
    </div>
  );
};

export default WishlistPage;
