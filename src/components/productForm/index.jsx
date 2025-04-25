import React, {useState, useEffect} from "react";
import './index.scss';

const ProductForm = ({ product, onSubmit }) => {
    const [formData, setFormData] = useState({
      name: "",
      price: "",
      description: "",
      category: "",
    });
  
    useEffect(() => {
      if (product) {
        setFormData(product);
      }
    }, [product]);
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      onSubmit(formData);
    };
  
    return (
      <form className="product-form" onSubmit={handleSubmit}>

        <div className="inputForm">
          <label htmlFor="name">Name:</label>
          <input name="name" value={formData.name} onChange={handleChange} placeholder="Product Name" required />
        </div>

        <div className="inputForm">
          <label htmlFor="price">Price:</label>
          <input name="price" value={formData.price} onChange={handleChange} placeholder="Price" required />
        </div>
        
        <div className="inputForm">
          <label htmlFor="description">Description:</label>
          <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Description" />
        </div>
        
        <div className="inputForm">
          <label htmlFor="category">Category:</label>
          <input name="category" value={formData.category} onChange={handleChange} placeholder="Category" />
        </div>

        <div className="inputForm">
          <label htmlFor="image">Image:</label>
          <input
            type="file"
            name="image"
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, imageFile: e.target.files[0] }))
            }
          />
        </div>

        <button type="submit">{product ? "Update" : "Add"} Product</button>
      </form>
    );
  };
  
export default ProductForm;