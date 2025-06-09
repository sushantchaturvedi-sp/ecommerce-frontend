import React, { useEffect, useState, useContext, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Slider from 'react-slick';
import {
  getProducts,
  getWishlist,
  addToWishlist,
  removeFromWishlist,
} from '../../../services/api';
import { SearchContext } from '../../../context/SearchContext';
import { useCart } from '../../../context/CartContext';
import { AuthContext } from '../../../context/AuthContext';
import { toast } from 'react-toastify';
import { Heart } from 'lucide-react';
import { useWishlist } from '../../../context/WishlistContext';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './NewLaunches.scss';

function NewLaunches() {
  const [products, setProducts] = useState([]);
  const [wishlistIds, setWishlistIds] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const { searchQuery } = useContext(SearchContext);
  const { user } = useContext(AuthContext);
  const { addToCart } = useCart();

  const { wishlist, toggleWishlist } = useWishlist();

  const navigate = useNavigate();

  const fetchNewLaunches = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await getProducts(1, 1000, { filter: 'new' });
      const fetched = response?.data?.products || [];
      const filtered = searchQuery
        ? fetched.filter(
            (p) =>
              p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
              p.description.toLowerCase().includes(searchQuery.toLowerCase())
          )
        : fetched;
      setProducts(filtered.slice(0, 10));
    } catch (error) {
      console.error('Failed to load new launches:', error);
      toast.error('Failed to load new products');
    } finally {
      setIsLoading(false);
    }
  }, [searchQuery]);

  // Fetch wishlist
  const fetchWishlist = useCallback(async () => {
    try {
      const response = await getWishlist();
      const ids = response.data.map((p) => p._id);
      setWishlistIds(ids);
    } catch (err) {
      console.error('Failed to load wishlist', err);
    }
  }, []);

  useEffect(() => {
    fetchNewLaunches();
    if (user?._id) fetchWishlist();
  }, [fetchNewLaunches, user, fetchWishlist]);

  const handleProductClick = (id) => navigate(`/product/${id}`);

  const handleAddToCart = (e, product) => {
    e.stopPropagation();
    if (!user?._id) {
      toast.warn('Please log in to add items to your cart.');
      return;
    }
    addToCart([{ productId: product._id, quantity: 1 }]);
    toast.success(`${product.name} added to cart!`);
  };

  const handleWishlistToggle = async (e, productId) => {
    e.stopPropagation();
    if (!user?._id) {
      toast.warn('Please log in to manage your wishlist.');
      return;
    }

    try {
      if (wishlistIds.includes(productId)) {
        await removeFromWishlist(productId);
        setWishlistIds((prev) => prev.filter((id) => id !== productId));
        toast.success('Removed from wishlist');
      } else {
        await addToWishlist(productId);
        setWishlistIds((prev) => [...prev, productId]);
        toast.success('Added to wishlist');
      }
    } catch (err) {
      console.error('Wishlist error:', err);
      toast.error('Failed to update wishlist');
    }
  };

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1200,
        settings: { slidesToShow: 3 },
      },
      {
        breakpoint: 768,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 480,
        settings: { slidesToShow: 1 },
      },
    ],
  };

  return (
    <div className="new-launches-container">
      <h2>New Launches</h2>

      {isLoading ? (
        <p className="loading">Loading...</p>
      ) : products.length === 0 ? (
        <p className="no-results">No new products found.</p>
      ) : (
        <Slider {...settings}>
          {products.map((product) => (
            <div
              key={product._id}
              className="product-card-wrapper"
              onClick={() => handleProductClick(product._id)}
            >
              <div className="product-card">
                <div className="image-wrapper">
                  <img
                    src={product.images?.[0]}
                    alt={product.name}
                    className="product-img"
                  />
                  <div
                    className="wishlist-icon"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleWishlist(product._id);
                    }}
                  >
                    {wishlist.includes(product._id) ? (
                      <Heart color="red" fill="red" />
                    ) : (
                      <Heart />
                    )}
                  </div>
                </div>
                <h3>{product.name}</h3>
                <p className="price">₹ {product.price}</p>
                <button
                  className="add-to-cart"
                  onClick={(e) => handleAddToCart(e, product)}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </Slider>
      )}
    </div>
  );
}

export default NewLaunches;
