import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createProduct } from '../../../../services/api';
import './index.scss';

function AddProduct() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    category: '',
    images: [],
  });

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = new FormData();
    data.append('name', formData.name);
    data.append('price', formData.price);
    data.append('description', formData.description);
    data.append('category', formData.category);

    // Append multiple images using field name 'image'
    formData.images.forEach((img) => {
      data.append('image', img);
    });

    await createProduct(data); // assumes token is included by default (e.g., axios withCredentials or headers set)
    navigate('/admin');
  };

  const handleChange = (event) => {
    const { name, value, files } = event.target;

    if (name === 'image') {
      setFormData({ ...formData, images: Array.from(files) });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  return (
    <div
      style={{
        width: '95%',
        border: '1px solid #ccc',
        padding: '20px',
        borderRadius: '10px',
      }}
    >
      <h2>Add New Product</h2>

      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="inputGroup">
          <label>Product Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="inputGroup">
          <label>Price</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </div>

        <div className="inputGroup">
          <label>Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="4"
            required
          />
        </div>

        <div className="inputGroup">
          <label>Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          >
            <option value="">Select Category</option>
            <option value="electronics">Electronics</option>
            <option value="fashion">Fashion</option>
            <option value="grocery">Grocery</option>
            <option value="sports">Sports</option>
          </select>
        </div>

        <div className="inputGroup">
          <label>Product Images</label>
          <input
            type="file"
            name="image"
            accept="image/*"
            multiple
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="submitButton">
          Add Product
        </button>
      </form>
    </div>
  );
}

export default AddProduct;
