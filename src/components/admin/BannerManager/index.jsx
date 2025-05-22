import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getBanners, createBanner, deleteBanner } from '../../../services/api';
import './index.scss';

const BannerManager = () => {
  const [banners, setBanners] = useState([]);
  const [productId, setProductId] = useState('');
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchBanners();
  }, []);

  const fetchBanners = async () => {
    try {
      const res = await getBanners();
      setBanners(res.data);
    } catch (error) {
      console.error('Failed to fetch banners:', error);
    }
  };

  const handleCreateBanner = async (e) => {
    e.preventDefault();
    if (!image || !productId.trim()) {
      alert('Please enter a product ID and select an image.');
      return;
    }

    const formData = new FormData();
    formData.append('image', image);
    formData.append('productId', productId.trim());

    try {
      setLoading(true);
      await createBanner(formData);
      setProductId('');
      setImage(null);
      fetchBanners();
    } catch (error) {
      console.error('Banner creation failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteBanner = async (id) => {
    if (!window.confirm('Are you sure you want to delete this banner?')) return;

    try {
      await deleteBanner(id);
      fetchBanners();
    } catch (error) {
      console.error('Failed to delete banner:', error);
    }
  };

  return (
    <div className="banner-manager">
      <h1 className="banner-manager__title">Banner Manager</h1>

      <form className="banner-manager__form" onSubmit={handleCreateBanner}>
        <div className="form-group">
          <label>Product ID</label>
          <input
            type="text"
            value={productId}
            onChange={(e) => setProductId(e.target.value)}
            placeholder="Enter Product ID"
          />
          <button
            type="button"
            className="link-button"
            onClick={() => productId && navigate(`/product/${productId}`)}
          >
            View Product
          </button>
        </div>

        <div className="form-group">
          <label>Banner Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
          />
        </div>

        <button type="submit" className="submit-button" disabled={loading}>
          {loading ? 'Uploading...' : 'Create Banner'}
        </button>
      </form>

      <div className="banner-manager__list">
        {banners.length === 0 ? (
          <p>No banners found.</p>
        ) : (
          banners.map((banner) => (
            <div className="banner-card" key={banner._id}>
              <img
                src={banner.image}
                alt="Banner"
                className="banner-card__image clickable"
                onClick={() => navigate(`/product/${banner.productId}`)}
              />
              <p className="banner-card__product">
                Linked to Product ID: {banner.productId}
              </p>
              <button
                className="banner-card__delete"
                onClick={() => handleDeleteBanner(banner._id)}
              >
                Delete
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default BannerManager;
