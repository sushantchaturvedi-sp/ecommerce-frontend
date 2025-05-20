import { useEffect, useState, useContext, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { getProducts } from '../../../services/api';
import { SearchContext } from '../../../context/SearchContext';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import './ProductList.scss';

function UserProductList() {
  const [products, setProducts] = useState([]);
  const [totalProducts, setTotalProducts] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const productsPerPage = 10;
  const { searchQuery } = useContext(SearchContext);
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

  // Observe sentinel at the end of scroll
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
    <div className="product-list-container">
      <h2>Browse Products</h2>

      {products.length === 0 && !isLoading ? (
        <p className="no-results">No products match your search.</p>
      ) : (
        <>
          {/* Scroll Buttons */}
          <button className="scroll-arrow left" onClick={handleScrollLeft}>
            <ArrowLeft />
          </button>

          <div className="product-grid horizontal-scroll" ref={productGridRef}>
            {products.map((product) => (
              <div
                key={product._id}
                className="product-card-wrapper"
                onClick={() => handleClick(product._id)}
              >
                <div className="product-card">
                  <img
                    src={
                      product?.images?.[0]
                        ? `http://localhost:4000/${product.images[0]}`
                        : 'fallback-image-url.jpg'
                    }
                    alt={product.name}
                    className="product-img"
                  />
                  <h3>{product.name}</h3>
                  <p className="price">₹ {product.price}</p>
                  <button className="add-to-cart">Add to Cart</button>
                </div>
              </div>
            ))}

            {/* Sentinel div to detect end of scroll */}
            <div ref={sentinelRef} className="sentinel" />
          </div>

          <button className="scroll-arrow right" onClick={handleScrollRight}>
            <ArrowRight />
          </button>

          {isLoading && <p className="loading">Loading more products...</p>}
        </>
      )}
    </div>
  );
}

export default UserProductList;
