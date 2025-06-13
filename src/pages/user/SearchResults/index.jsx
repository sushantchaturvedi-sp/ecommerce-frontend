import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { searchProducts } from '../../../services/api';
import { useCart } from '../../../context/CartContext';
import { useAuth } from '../../../context/AuthContext';
import { useWishlist } from '../../../context/WishlistContext';
import { toast } from 'react-toastify';
import { Heart } from 'lucide-react';
import SkeletonCard from '../../../components/SkeletonCard/index';

import './index.scss';

const SearchResults = () => {
  const [params] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [sortOption, setSortOption] = useState('default');
  const [priceFilter, setPriceFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const query = params.get('q');
  const { addToCart } = useCart();
  const { user } = useAuth();
  const { wishlist, toggleWishlist } = useWishlist();

  const uniqueCategories = [...new Set(products.map((p) => p.category))];

  useEffect(() => {
    if (query) {
      setLoading(true);
      searchProducts(query)
        .then((res) => {
          const fetched = res.data.products;
          setProducts(fetched);
          setFilteredProducts(fetched);
          setLoading(false);
        })
        .catch((err) => {
          // console.error('Search error:', err);
          setLoading(false);
        });
    }
  }, [query]);


  useEffect(() => {
    let filtered = [...products];

    // Apply price filter
    if (priceFilter === 'below-500') {
      filtered = filtered.filter((p) => p.price < 500);
    } else if (priceFilter === '500-1000') {
      filtered = filtered.filter((p) => p.price >= 500 && p.price <= 1000);
    } else if (priceFilter === 'above-1000') {
      filtered = filtered.filter((p) => p.price > 1000);
    }

    // Apply category filter
    if (categoryFilter !== 'all') {
      filtered = filtered.filter((p) => p.category === categoryFilter);
    }

    // Apply sorting
    if (sortOption === 'price-low') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortOption === 'price-high') {
      filtered.sort((a, b) => b.price - a.price);
    }

    setFilteredProducts(filtered);
  }, [priceFilter, categoryFilter, sortOption, products]);


  const handleAddToCart = (e, product) => {
    e.preventDefault(); // prevent Link click
    e.stopPropagation();
    if (!user?._id) {
      toast.warn('Please log in to add items to your cart.');
      return;
    }
    addToCart([{ productId: product._id, quantity: 1 }]);
    toast.success(`${product.name} added to cart!`);
  };

  const handleToggleWishlist = (e, id) => {
    e.preventDefault();
    e.stopPropagation();
    if (!user?._id) {
      toast.warn('Login to use wishlist');
      return;
    }
    toggleWishlist(id);
  };

  return (
    <div className="search-results-page">
      <h2>Search Results for "{query}"</h2>

      <div className="search-controls">
        <label htmlFor="sort">Sort By:</label>
        <select
          id="sort"
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
        >
          <option value="default">Default</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
        </select>

        <label>Price Range:</label>
        <select value={priceFilter} onChange={(e) => setPriceFilter(e.target.value)}>
          <option value="all">All</option>
          <option value="below-500">Below ₹500</option>
          <option value="500-1000">₹500-₹1000</option>
          <option value="above-1000">Above ₹1000</option>
        </select>

        <label>Category:</label>
        <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
          <option value="all">All</option>
          {uniqueCategories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      {loading ? (
        <div className="skeleton-grid">
          {Array.from({ length: 12 }).map((_, idx) => (
            <SkeletonCard key={idx} />
          ))}
        </div>
      ) : filteredProducts.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <div className="product-list">
          {filteredProducts.map((product) => (
            <Link
              to={`/product/${product._id}`}
              key={product._id}
              className="product-card"
            >
              <div className="product-image-container">
                <img
                  src={product.images?.[0] || 'https://via.placeholder.com/200'}
                  alt={product.name}
                />
                <button
                  className="wishlist-icon"
                  onClick={(e) => handleToggleWishlist(e, product._id)}
                  title="Add to wishlist"
                >
                  {wishlist.includes(product._id)
                    ? (
                      <Heart color="red" fill="red" />
                    ) : (
                      <Heart />
                    )}
                </button>
              </div>
              <h3 className="product-title">{product.name}</h3>
              <p className="product-price">₹{product.price}</p>
              <button
                className="product-cart-button"
                onClick={(e) => handleAddToCart(e, product)}
              >
                Add to Cart
              </button>
            </Link>
          ))}

        </div>
      )}
    </div>
  );
};

export default SearchResults;
