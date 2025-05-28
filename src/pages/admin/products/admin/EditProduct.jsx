import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getProductById, updateProduct } from '../../../../services/api';
import './index.scss';

function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    category: '',
    images: [],
  });

  const [existingImages, setExistingImages] = useState([]);

  const fetchProduct = async () => {
    try {
      const res = await getProductById(id);
      const product = res.data;
      setFormData({
        name: product.name,
        price: product.price,
        description: product.description,
        category: product.category,
        images: [],
      });
      setExistingImages(product.images || []);
    } catch (error) {
      console.error('Error fetching product:', error);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = new FormData();
    data.append('name', formData.name);
    data.append('price', formData.price);
    data.append('description', formData.description);
    data.append('category', formData.category);

    formData.images.forEach((img) => {
      data.append('image', img);
    });

    try {
      await updateProduct(id, data);
      navigate('/admin');
    } catch (error) {
      console.error('Error updating product:', error);
    }
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
    <div className="formContainer">
      <h2>Edit Product</h2>

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
          <label>Upload New Images</label>
          <input
            type="file"
            name="image"
            accept="image/*"
            multiple
            onChange={handleChange}
          />
        </div>

        {existingImages.length > 0 && (
          <div className="inputGroup">
            <label>Existing Images</label>
            <div className="imagePreviewWrapper">
              {existingImages.map((url, index) => (
                <img
                  key={index}
                  src={url}
                  alt={`Product ${index}`}
                  className="imagePreview"
                />
              ))}
            </div>
          </div>
        )}

        <button type="submit" className="submitButton">
          Update Product
        </button>
      </form>
    </div>
  );
}

export default EditProduct;
