import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { getProducts } from '../../../services/api';
import { SearchContext } from '../../../context/SearchContext';
import './ProductList.scss';

function UserProductList() {
  const [products, setProducts] = useState([]);
  const [totalProducts, setTotalProducts] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 10;

  const { searchQuery } = useContext(SearchContext);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts(currentPage);
  }, [currentPage]);

  useEffect(() => {
    if (searchQuery) {
      fetchProducts(1);
      setCurrentPage(1);
    }
  }, [searchQuery]);

  const fetchProducts = async (page) => {
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

      setProducts(fetchedProducts);
      setTotalProducts(res.data.total || 0);
    } catch (error) {
      console.error('Failed to load products:', error);
    }
  };

  const handleClick = (id) => {
    navigate(`/product/${id}`);
  };

  const totalPages = Math.ceil(totalProducts / productsPerPage);

  return (
    <div className="product-list-container">
      <h2>Browse Products</h2>

      {products.length === 0 ? (
        <p className="no-results">No products match your search.</p>
      ) : (
        <>
          <div className="product-grid">
            {products.map((product) => (
              <div
                className="product-card"
                key={product._id}
                onClick={() => handleClick(product._id)}
              >
                <div
                  className="product-card"
                  key={product._id}
                  onClick={() => handleClick(product._id)}
                >
                  <img
                    src={`http://localhost:4000/${product?.images[0]}`}
                    alt={product.name}
                  />
                  <div className="product-details">
                    {' '}
                    <h3>{product.name}</h3>
                    <p className="price">₹ {product.price}</p>
                    <p className="description">
                      {product.description.length > 330
                        ? product.description.slice(0, 330) + '...'
                        : product.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="pagination">
              <button
                onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                disabled={currentPage === 1}
              >
                Prev
              </button>

              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  className={currentPage === i + 1 ? 'active' : ''}
                  onClick={() => setCurrentPage(i + 1)}
                >
                  {i + 1}
                </button>
              ))}

              <button
                onClick={() =>
                  setCurrentPage((p) => Math.min(p + 1, totalPages))
                }
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default UserProductList;
