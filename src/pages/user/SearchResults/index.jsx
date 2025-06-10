import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom'; 
import { searchProducts } from '../../../services/api';
import './index.scss';

const SearchResults = () => {
  const [params] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const query = params.get('q');

  useEffect(() => {
    if (query) {
      searchProducts(query)
        .then((res) => {
          setProducts(res.data.products);
          setLoading(false);
        })
        .catch((err) => {
          console.error('Search error:', err);
          setLoading(false);
        });
    }
  }, [query]);

  return (
    <div className="search-results-page">
      <h2>Search Results for "{query}"</h2>
      {loading ? (
        <p>Loading...</p>
      ) : products.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <div className="product-list">
          {products.map((product) => (
            <Link
              to={`/product/${product._id}`}
              key={product._id}
              className="product-card"
            >
              <img
                src={product.images?.[0] || 'https://via.placeholder.com/200'}
                alt={product.name}
              />
              <h3>{product.name}</h3>
              <p>₹{product.price}</p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchResults;
