import React, {
  useEffect,
  useState,
  useContext,
  useRef,
  useCallback,
} from 'react';
import { useNavigate } from 'react-router-dom';
import { getProducts } from '../../../services/api';
import { SearchContext } from '../../../context/SearchContext';
import { useCart } from '../../../context/CartContext';
import { AuthContext } from '../../../context/AuthContext';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './NewLaunches.scss';

const fetchProducts = async () => {
  const response = await getProducts(1, 1000, { filter: 'new' });
  return response?.data?.products || [];
};

const filterProductsBySearchQuery = (products, query) => {
  if (!query) return products;

  const lower = query.toLowerCase();
  return products.filter(
    (p) =>
      p.name.toLowerCase().includes(lower) ||
      p.description.toLowerCase().includes(lower)
  );
};

function NewLaunches() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const { searchQuery } = useContext(SearchContext);
  const { user } = useContext(AuthContext);
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const productGridRef = useRef(null);

  const fetchNewLaunches = useCallback(async () => {
    setIsLoading(true);
    try {
      const fetchedProducts = await fetchProducts();
      const filteredProducts = filterProductsBySearchQuery(
        fetchedProducts,
        searchQuery
      );
      setProducts(filteredProducts.slice(0, 7));
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

  const handleScroll = (direction) => {
    if (productGridRef.current) {
      const scrollValue = direction === 'left' ? -300 : 300;
      productGridRef.current.scrollBy({
        left: scrollValue,
        behavior: 'smooth',
      });
    }
  };

  const handleProductClick = (id) => navigate(`/product/${id}`);

  const handleAddToCart = (e, product) => {
    e.stopPropagation();
    if (!user?._id) {
      toast.warn('Please log in to add items to your cart.');
      return;
    }

    const cartItem = [{ productId: product._id, quantity: 1 }];
    addToCart(cartItem);
    toast.success(`${product.name} added to cart!`);
  };

  return (
    <div className="new-launches-container">
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
      <h2>New Launches</h2>

      {products.length === 0 && !isLoading ? (
        <p className="no-results">No new products found.</p>
      ) : (
        <>
          <button
            className="scroll-arrow left"
            onClick={() => handleScroll('left')}
          >
            <ChevronLeft />
          </button>

          <div className="product-grid horizontal-scroll" ref={productGridRef}>
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
          </div>

          <button
            className="scroll-arrow right"
            onClick={() => handleScroll('right')}
          >
            <ChevronRight />
          </button>

          {isLoading && <p className="loading">Loading...</p>}
        </>
      )}
    </div>
  );
}

export default NewLaunches;
