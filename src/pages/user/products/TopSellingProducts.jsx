import React, { useEffect, useRef, useState, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { getTopSellingProducts } from '../../../services/api';
import { Link } from 'react-router-dom';
import './TopSellingProducts.scss';

const TopSellingProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const scrollRef = useRef(null);

  const fetchTopSelling = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await getTopSellingProducts(10);
      const productList = Array.isArray(data?.products)
        ? data.products
        : Array.isArray(data)
          ? data
          : [];

      setProducts(productList);
    } catch (err) {
      console.error('Error fetching top selling products:', err);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTopSelling();
  }, [fetchTopSelling]);

  const scroll = (direction) => {
    const scrollAmount = 250;
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="top-selling-container">
      <h2>Top Selling Products</h2>

      {loading ? (
        <div className="loading">Loading top selling products...</div>
      ) : products.length === 0 ? (
        <div className="no-results">No products found</div>
      ) : (
        <>
          <button className="scroll-arrow left" onClick={() => scroll('left')}>
            <ChevronLeft />
          </button>

          <div className="product-scroll" ref={scrollRef}>
            {products.map((product) => (
              <div className="product-card-wrapper" key={product._id}>
                <Link to={`/product/${product._id}`} className="product-card">
                  <img
                    src={product.images?.[0] || '/placeholder.jpg'}
                    alt={product.name}
                    className="product-img"
                    onError={(e) => (e.target.src = '/placeholder.jpg')}
                  />
                  <h3>{product.name}</h3>
                  <div className="price">₹{product.price}</div>
                  <div
                    className={`order-count ${
                      product.orderCount > 10
                        ? 'highlight'
                        : !product.orderCount
                          ? 'first-order'
                          : ''
                    }`}
                  >
                    {product.orderCount > 0
                      ? `Ordered ${product.orderCount} ${product.orderCount === 1 ? 'time' : 'times'}`
                      : 'Be the first to order!'}
                  </div>
                </Link>
              </div>
            ))}
          </div>

          <button
            className="scroll-arrow right"
            onClick={() => scroll('right')}
          >
            <ChevronRight />
          </button>
        </>
      )}
    </div>
  );
};

export default TopSellingProducts;
