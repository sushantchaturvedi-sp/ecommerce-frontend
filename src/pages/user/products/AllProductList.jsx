import React, { useEffect, useState, useContext, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useWishlist } from '../../../context/WishlistContext';
import { FaHeart, FaRegHeart } from 'react-icons/fa';

import { getProducts } from '../../../services/api';
import { SearchContext } from '../../../context/SearchContext';
import { useCart } from '../../../context/CartContext';
import { AuthContext } from '../../../context/AuthContext';

import './AllProductList.scss';

const AllProductList = () => {
  const [products, setProducts] = useState([]);
  const [totalProducts, setTotalProducts] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const productsPerPage = 12;
  const { searchQuery } = useContext(SearchContext);
  const { user } = useContext(AuthContext);
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const sentinelRef = useRef(null);
  const { wishlist, toggleWishlist } = useWishlist();

  const fetchProducts = async (page = 1) => {
    setIsLoading(true);
    try {
      const res = await getProducts(page, productsPerPage);
      let fetched = res?.data?.products || [];

      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        fetched = fetched.filter(
          (p) =>
            p.name.toLowerCase().includes(q) ||
            p.description.toLowerCase().includes(q)
        );
      }

      setProducts((prev) => (page === 1 ? fetched : [...prev, ...fetched]));
      setTotalProducts(res?.data?.total || 0);
    } catch (error) {
      console.error('Failed to load products:', error);
      toast.error('Something went wrong while fetching products.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setCurrentPage(1);
    setProducts([]);
    fetchProducts(1);
  }, [searchQuery]);

  useEffect(() => {
    if (currentPage > 1) {
      fetchProducts(currentPage);
    }
  }, [currentPage]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (
          entries[0].isIntersecting &&
          !isLoading &&
          products.length < totalProducts
        ) {
          setCurrentPage((prev) => prev + 1);
        }
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 1.0,
      }
    );

    if (sentinelRef.current) {
      observer.observe(sentinelRef.current);
    }

    return () => {
      if (sentinelRef.current) {
        observer.unobserve(sentinelRef.current);
      }
    };
  }, [products, totalProducts, isLoading]);

  const handleAddToCart = (e, product) => {
    e.stopPropagation();
    if (!user?._id) {
      toast.warn('Please log in to add items to your cart.');
      return;
    }

    addToCart([{ productId: product._id, quantity: 1 }]);
    toast.success(`${product.name} added to cart!`);
  };

  const handleProductClick = (id) => navigate(`/product/${id}`);

  return (
    <div className="new-product-page">
      <h2 className="section-title">All Products</h2>

      {products.length === 0 && !isLoading ? (
        <p className="no-results">No products match your search.</p>
      ) : (
        <>
          <div className="product-grid">
            {products.map((product) => (
              <div
                key={product._id}
                className="product-item"
                onClick={() => handleProductClick(product._id)}
              >
                <div className="product-image-container">
                  <img
                    src={product.images?.[0] || ''}
                    alt={product.name}
                    className="product-image"
                    onError={(e) => (e.target.src = '')}
                  />

                  <button
                    className="wishlist-icon"
                    onClick={(e) => {
                      e.stopPropagation();
                      if (!user?._id) {
                        toast.warn('Login to use wishlist');
                        return;
                      }
                      toggleWishlist(product._id);
                    }}
                    title="Add to wishlist"
                  >
                    {wishlist.some((p) => p?._id === product._id) ? (
                      <FaHeart />
                    ) : (
                      <FaRegHeart />
                    )}
                  </button>
                </div>

                <div className="product-info">
                  <h3 className="product-title">{product.name}</h3>
                  <p className="product-price">₹ {product.price}</p>
                  <button
                    className="product-cart-button"
                    onClick={(e) => handleAddToCart(e, product)}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div ref={sentinelRef} className="sentinel" />
          {isLoading && <p className="loading">Loading more products...</p>}
        </>
      )}
    </div>
  );
};

export default AllProductList;
