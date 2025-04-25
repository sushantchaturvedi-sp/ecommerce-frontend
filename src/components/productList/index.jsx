import React from "react";
import './index.scss';

const ProductList = ({ products, onEdit, onDelete }) => {
  return (
    <div className="product-list">
      <h2>Product Management</h2>
      {products.map((p) => (
        <div className="product-item" key={p._id}>
          <span>{p.name}</span>
          <span>Rs{p.price}</span>
          <span>Rs{p.image}</span>
          <button onClick={() => onEdit(p)}>Edit</button>
          <button onClick={() => onDelete(p._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
