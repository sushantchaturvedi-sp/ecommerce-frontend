import React, { useEffect, useState, useContext, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Slider from 'react-slick';
import { getProducts } from '../../../services/api';
import { SearchContext } from '../../../context/SearchContext';
import { useCart } from '../../../context/CartContext';
import { AuthContext } from '../../../context/AuthContext';
import { toast } from 'react-toastify';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './NewLaunches.scss';

function NewLaunches() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const { searchQuery } = useContext(SearchContext);
  const { user } = useContext(AuthContext);
  const { addToCart } = useCart();
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
      setProducts(filtered.slice(0, 10)); // Limit to 10 products
    } catch (error) {
      console.error('Failed to load new launches:', error);
      toast.error('Failed to load new products');
    } finally {
      setIsLoading(false);
    }
  }, [searchQuery]);

  useEffect(() => {
    fetchNewLaunches();
  }, [fetchNewLaunches]);

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
                <img
                  src={
                    product.images?.[0] ||
                    'https://via.placeholder.com/300x400?text=No+Image'
                  }
                  alt={product.name}
                  className="product-img"
                />
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
