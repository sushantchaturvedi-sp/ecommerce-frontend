import React, { useEffect, useState, useContext, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { getProducts } from '../../../services/api';
import { SearchContext } from '../../../context/SearchContext';
import { useCart } from '../../../context/CartContext';
import { AuthContext } from '../../../context/AuthContext';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import './NewLaunches.scss';

function NewLaunches() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const { searchQuery } = useContext(SearchContext);
  const { user } = useContext(AuthContext);
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const productGridRef = useRef(null);

  useEffect(() => {
    const fetchNewLaunches = async () => {
      setIsLoading(true);
      try {
        const res = await getProducts(1, 1000, { filter: 'new' });
        let fetchedProducts = res.data.products || [];

        if (searchQuery) {
          const lower = searchQuery.toLowerCase();
          fetchedProducts = fetchedProducts.filter(
            (p) =>
              p.name.toLowerCase().includes(lower) ||
              p.description.toLowerCase().includes(lower)
          );
        }

        setProducts(fetchedProducts.slice(0, 7));
      } catch (error) {
        console.error('Failed to load new launches:', error);
      }
      setIsLoading(false);
    };

    fetchNewLaunches();
  }, [searchQuery]);

  const handleScroll = (direction) => {
    if (productGridRef.current) {
      const scrollValue = direction === 'left' ? -300 : 300;
      productGridRef.current.scrollBy({
        left: scrollValue,
        behavior: 'smooth',
      });
    }
  };

  const handleProductClick = (id) => {
    navigate(`/product/${id}`);
  };

  const handleAddToCart = (e, product) => {
    e.stopPropagation(); // Prevent card click navigation

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

  return (
    <div className="new-launches-container">
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
