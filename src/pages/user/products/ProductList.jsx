import React, { useEffect, useState, useContext, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Slider from 'react-slick';
import { useWishlist } from '../../../context/WishlistContext';
import { getProducts } from '../../../services/api';
import { SearchContext } from '../../../context/SearchContext';
import { useCart } from '../../../context/CartContext';
import { AuthContext } from '../../../context/AuthContext';
import Carousel from '../../../components/carousel';
import NewLaunches from './NewLaunches';
import TopSellingProducts from './TopSellingProducts';
import SkeletonCard from '../../../components/SkeletonCard/index';
import './ProductList.scss';
import { Heart } from 'lucide-react';

const UserProductList = () => {
  const [products, setProducts] = useState([]);
  const [totalProducts, setTotalProducts] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const productsPerPage = 10;
  const { searchQuery } = useContext(SearchContext);
  const { user } = useContext(AuthContext);
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const { wishlist, toggleWishlist, fetchWishlist } = useWishlist();
  const sliderRef = useRef(null);
  const sentinelRef = useRef(null);
  // const { wishlist, toggleWishlist } = useWishlist();
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
    fetchWishlist();
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
  const handleWishlistClick = (e, productId) => {
    e.stopPropagation();
    toggleWishlist(productId);
  };
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    arrows: true,
    responsive: [
      { breakpoint: 1200, settings: { slidesToShow: 3 } },
      { breakpoint: 768, settings: { slidesToShow: 2 } },
      { breakpoint: 480, settings: { slidesToShow: 1 } },
    ],
  };
  return (
    <div className="user-product-list">
      <div className="carousel-container">
        <Carousel />
      </div>
      <NewLaunches />
      <TopSellingProducts />
      <div className="product-list-container">
        <h2>Browse Products</h2>
        {products.length === 0 && !isLoading ? (
          <p className="no-results">No products match your search.</p>
        ) : (
          <>
            <Slider ref={sliderRef} {...settings} className="product-grid">
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
                        onError={(e) => (e.target.src = 'LINK1_URL')}
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
            <div ref={sentinelRef} className="sentinel" />
            {/* {isLoading && <p className="loading">Loading more products...</p>} */}
            {isLoading && (
              <div className="skeleton-grid">
                {Array.from({ length: 5 }).map((_, idx) => (
                  <SkeletonCard key={idx} />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};
export default UserProductList;
