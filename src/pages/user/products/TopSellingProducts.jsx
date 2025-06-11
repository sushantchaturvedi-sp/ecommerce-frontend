import React, { useEffect, useState, useCallback, useContext } from 'react';
import Slider from 'react-slick';
import { Link, useNavigate } from 'react-router-dom';
import {
  getTopSellingProducts,
  getWishlist,
  addToWishlist,
  removeFromWishlist,
} from '../../../services/api';
import { AuthContext } from '../../../context/AuthContext';
import { toast } from 'react-toastify';
import { Heart } from 'lucide-react';
import './TopSellingProducts.scss';
import { useWishlist } from '../../../context/WishlistContext';
import SkeletonCard from '../../../components/SkeletonCard/index';

const TopSellingProducts = () => {
  const [products, setProducts] = useState([]);
  const [wishlistIds, setWishlistIds] = useState([]);
  const [loading, setLoading] = useState(true);

  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const { wishlist, toggleWishlist } = useWishlist();

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
    fetchTopSelling();
    if (user?._id) fetchWishlist();
  }, [fetchTopSelling, user, fetchWishlist]);

  const handleWishlistToggle = async (e, productId) => {
    e.preventDefault();
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
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className="top-selling-container">
      <h2>Top Selling Products</h2>

      {loading ? (
        <div className="skeleton-grid">
          {Array.from({ length: 5 }).map((_, idx) => (
            <SkeletonCard key={idx} />
          ))}
        </div>
      ) : products.length === 0 ? (
        <div className="no-results">No products found</div>
      ) : (
        <Slider {...settings}>
          {products.map((product) => (
            <div className="product-card-wrapper" key={product._id}>
              <Link to={`/product/${product._id}`} className="product-card">
                <div className="image-wrapper">
                  <img
                    src={product.images?.[0] || ''}
                    alt={product.name}
                    className="product-img"
                    onError={(e) => (e.target.src = '')}
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
                <div className="price">₹{product.price}</div>
                <div
                  className={`order-count ${product.orderCount > 10
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
