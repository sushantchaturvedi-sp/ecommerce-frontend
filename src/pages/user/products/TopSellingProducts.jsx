import React, { useEffect, useState, useCallback } from 'react';
import Slider from 'react-slick';
import { getTopSellingProducts } from '../../../services/api';
import { Link } from 'react-router-dom';
import './TopSellingProducts.scss';

const TopSellingProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

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

  const settings = {
    dots: false,
    infinite: products.length > 5,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    arrows: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        }
      }
    ]
  };

  return (
    <div className="top-selling-container">
      <h2>Top Selling Products</h2>

      {loading ? (
        <div className="loading">Loading top selling products...</div>
      ) : products.length === 0 ? (
        <div className="no-results">No products found</div>
      ) : (
        <Slider {...settings}>
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
        </Slider>
      )}
    </div>
  );
};

export default TopSellingProducts;
