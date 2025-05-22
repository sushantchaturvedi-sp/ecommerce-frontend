import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getBanners, createBanner, deleteBanner } from '../../../services/api';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './index.scss';

const BannerManager = () => {
  const [banners, setBanners] = useState([]);
  const [productId, setProductId] = useState('');
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [bannerToDelete, setBannerToDelete] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchBanners();
  }, []);

  const fetchBanners = async () => {
    try {
      const res = await getBanners();
      setBanners(res.data || []);
    } catch (error) {
      toast.error('Failed to load banners');
      console.error(error);
    }
  };

  const validateForm = () => {
    if (!productId.trim()) {
      toast.error('Product ID is required.');
      return false;
    }

    if (productId.trim().length < 6) {
      toast.warn('Product ID must be at least 6 characters.');
      return false;
    }

    if (!image) {
      toast.error('Please select a banner image.');
      return false;
    }

    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (!allowedTypes.includes(image.type)) {
      toast.error('Only JPG, PNG, and WEBP formats are allowed.');
      return false;
    }

    const maxSizeMB = 2;
    if (image.size > maxSizeMB * 1024 * 1024) {
      toast.error(`Image must be under ${maxSizeMB}MB.`);
      return false;
    }

    return true;
  };

  const handleCreateBanner = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const formData = new FormData();
    formData.append('image', image);
    formData.append('productId', productId.trim());

    try {
      setLoading(true);
      await createBanner(formData);
      toast.success('Banner created successfully!');
      setProductId('');
      setImage(null);
      fetchBanners();
    } catch (error) {
      toast.error('Failed to create banner.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClick = (id) => {
    setBannerToDelete(id);
    setModalOpen(true);
  };

  const confirmDelete = async () => {
    try {
      await deleteBanner(bannerToDelete);
      toast.success('Banner deleted successfully.');
      fetchBanners();
    } catch (error) {
      toast.error('Failed to delete banner.');
      console.error(error);
    } finally {
      setModalOpen(false);
      setBannerToDelete(null);
    }
  };

  return (
    <div className="banner-manager">
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
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
                onClick={() => handleDeleteClick(banner._id)}
              >
                Delete
              </button>
            </div>
          ))
        )}
      </div>

      {modalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Confirm Deletion</h3>
            <p>Are you sure you want to delete this banner?</p>
            <div className="modal-actions">
              <button onClick={() => setModalOpen(false)}>Cancel</button>
              <button className="delete-btn" onClick={confirmDelete}>
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BannerManager;
