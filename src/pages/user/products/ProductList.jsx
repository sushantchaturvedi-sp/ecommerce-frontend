import { useEffect, useState, useContext, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { getProducts } from '../../../services/api';
import { SearchContext } from '../../../context/SearchContext';
import { useCart } from '../../../context/CartContext';
import { AuthContext } from '../../../context/AuthContext';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import './ProductList.scss';
import Carousel from '../../../components/carousel';
import NewLaunches from './NewLaunches';
import TopSellingProducts from './TopSellingProducts';

function UserProductList() {
  const [products, setProducts] = useState([]);
  const [totalProducts, setTotalProducts] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const productsPerPage = 10;
  const { searchQuery } = useContext(SearchContext);
  const { user } = useContext(AuthContext);
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const productGridRef = useRef(null);
  const sentinelRef = useRef(null);

  const fetchProducts = async (page) => {
    setIsLoading(true);
    try {
      const res = await getProducts(page, productsPerPage);
      let fetchedProducts = res.data.products || [];

      if (searchQuery) {
        const lower = searchQuery.toLowerCase();
        fetchedProducts = fetchedProducts.filter(
          (p) =>
            p.name.toLowerCase().includes(lower) ||
            p.description.toLowerCase().includes(lower)
        );
      }

      setProducts((prev) =>
        page === 1 ? fetchedProducts : [...prev, ...fetchedProducts]
      );
      setTotalProducts(res.data.total || 0);
    } catch (error) {
      console.error('Failed to load products:', error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    setCurrentPage(1);
    setProducts([]);
    fetchProducts(1);
  }, [searchQuery]);

  useEffect(() => {
    if (currentPage !== 1) {
      fetchProducts(currentPage);
    }
  }, [currentPage]);

  const handleIntersection = useCallback(
    (entries) => {
      const target = entries[0];
      if (
        target.isIntersecting &&
        !isLoading &&
        products.length < totalProducts
      ) {
        setCurrentPage((prev) => prev + 1);
      }
    },
    [isLoading, products, totalProducts]
  );

  useEffect(() => {
    const observer = new IntersectionObserver(handleIntersection, {
      root: productGridRef.current,
      threshold: 1.0,
    });

    if (sentinelRef.current) observer.observe(sentinelRef.current);
    return () => observer.disconnect();
  }, [handleIntersection]);

  const handleClick = (id) => {
    navigate(`/product/${id}`);
  };

  const handleAddToCart = (e, product) => {
    e.stopPropagation(); // Prevent navigation on card click

    if (!user?._id) {
      alert('Please log in to add items to your cart.');
      return;
    }

    const cartItem = [
      {
        productId: product._id,
        quantity: 1,
      },
    ];

    addToCart(cartItem);
    alert(`${product.name} added to cart!`);
  };

  const handleScrollLeft = () => {
    if (productGridRef.current) {
      productGridRef.current.scrollBy({
        left: -300,
        behavior: 'smooth',
      });
    }
  };

  const handleScrollRight = () => {
    if (productGridRef.current) {
      productGridRef.current.scrollBy({
        left: 300,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="">
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
            <button className="scroll-arrow left" onClick={handleScrollLeft}>
              <ChevronLeft />
            </button>

            <div
              className="product-grid horizontal-scroll"
              ref={productGridRef}
            >
              {products.map((product) => (
                <div
                  key={product._id}
                  className="product-card-wrapper"
                  onClick={() => handleClick(product._id)}
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
              <div ref={sentinelRef} className="sentinel" />
            </div>

            <button className="scroll-arrow right" onClick={handleScrollRight}>
              <ChevronRight />
            </button>

            {isLoading && <p className="loading">Loading more products...</p>}
          </>
        )}
      </div>
    </div>
  );
}

export default UserProductList;
