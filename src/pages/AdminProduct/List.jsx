
import React, { useEffect, useState } from 'react';
import { fetchProducts } from '../services/api';  // Importing the API function
import './AdminProductList.scss';

const AdminProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const data = await fetchProducts();  // Call the API function
        setProducts(data);
      } catch (error) {
        console.error("Error loading products:", error);
      } finally {
        setLoading(false);
      }
    };

    getProducts();
  }, []);

  if (loading) return <div className="admin-product-list">Loading products...</div>;

  return (
    <div className="admin-product-list">
      <h1>Admin - Product List</h1>
      <div className="product-grid">
        {products.map(product => (
          <div key={product._id} className="product-card">
            <img src={product.image} alt={product.name} />
            <h2>{product.name}</h2>
            <p className="description">{product.description}</p>
            <p className="rating">⭐ {product.rating}</p>
            <p className="sku">SKU: {product.sku}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminProductList;
