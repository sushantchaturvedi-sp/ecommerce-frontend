import React, { useEffect, useState, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  getProductById,
  addToWishlist,
  removeFromWishlist,
  getWishlist,
} from '../../../services/api';
import { useCart } from '../../../context/CartContext';
import { AuthContext } from '../../../context/AuthContext';
import { toast } from 'react-toastify';
import { Heart } from 'lucide-react';
import SkeletonCard from '../../../components/SkeletonCard/index';
import './ProductView.scss';

function UserProductView() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [mainImage, setMainImage] = useState('');
  const [showFullDesc, setShowFullDesc] = useState(false);
  const [isInWishlist, setIsInWishlist] = useState(false);
  const { addToCart } = useCart();
  const { user } = useContext(AuthContext);
  useEffect(() => {
    async function fetchProduct() {
      try {
        const res = await getProductById(id);
        setProduct(res.data);
        setMainImage(res.data.images?.[0] || '');
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    }
    fetchProduct();
  }, [id]);

  const checkWishlist = async (user, id, setIsInWishlist) => {
    try {
      const res = await getWishlist();
      const wishlistProducts = res.data || [];
      const found = wishlistProducts.some((p) => p._id === id);
      setIsInWishlist(found);
    } catch (err) {
      console.error('Failed to fetch wishlist', err);
    }
  };

  useEffect(() => {
    if (!user?._id) {
      setIsInWishlist(false);
      return;
    }
    checkWishlist();
    checkWishlist(user, id, setIsInWishlist);
  }, [id, user]);

  if (!product) {
    return <div className="skeleton-grid">
      {Array.from({ length: 1 }).map((_, idx) => (
        <SkeletonCard key={idx} />
      ))}
    </div>;
  }
  function handleAddToCart() {
    if (!user?._id) {
      toast.error('Please log in to add items to your cart.');
      return;
    }
    const cartItem = [{ productId: product._id, quantity: 1 }];
    addToCart(cartItem);
    toast.success('Item added to cart!');
  }
  async function toggleWishlist() {
    if (!user?._id) {
      toast.error('Please log in to modify wishlist.');
      return;
    }
    try {
      if (isInWishlist) {
        await removeFromWishlist(product._id);
        setIsInWishlist(false);
        toast.info('Removed from wishlist.');
      } else {
        await addToWishlist(product._id);
        setIsInWishlist(true);
        toast.success('Added to wishlist!');
      }
    } catch (err) {
      console.error(err);
      toast.error('Failed to update wishlist.');
    }
  }
  const truncatedDescription = product.description?.slice(0, 150);
  const isTruncated = product.description?.length > 150;
  return (
    <div className="product-page">
      <div className="breadcrumbs">
        <Link to="/">Home</Link> / <Link to="/products">Products</Link> /{' '}
        <span>{product.name}</span>
      </div>

      <div className="product-details">
        <div className="product-images">
          <img className="main-image" src={mainImage} alt={product.name} />
          <button
            className="wishlist-overlay-btn"
            onClick={toggleWishlist}
            title={isInWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
          >
            {isInWishlist ? <Heart color="red" fill="red" /> : <Heart />}
          </button>

          <div className="thumbnails">
            {product.images?.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`thumb-${index}`}
                className={img === mainImage ? 'selected' : ''}
                onClick={() => setMainImage(img)}
              />
            ))}
          </div>
        </div>
        <div className="product-info">
          <h1>{product.name}</h1>
          <div className="price">₹ {product.price}</div>
          <div className="description">
            <h3>Description</h3>
            <p>
              {showFullDesc
                ? product.description
                : truncatedDescription || 'No description available.'}
              {isTruncated && (
                <span
                  className="toggle"
                  onClick={() => setShowFullDesc((prev) => !prev)}
                >
                  {showFullDesc ? ' See less' : '... See more'}
                </span>
              )}
            </p>
          </div>
          <div className="actions">
            <button className="btn outline" onClick={handleAddToCart}>
              Add to Cart
            </button>
            {/* <button
              className="btn outline wishlist-btn"
              onClick={toggleWishlist}
              title={isInWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
            >
              {isInWishlist ? <Heart color="red" fill="red" /> : <Heart />}
            </button> */}
          </div>
        </div>
      </div>
    </div>
  );
}
export default UserProductView;
