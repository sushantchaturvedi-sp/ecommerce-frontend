// import React, { useEffect, useState, useContext } from 'react';
// import { useParams } from 'react-router-dom';
// import { getProductById, saveCart } from '../../../services/api';
// import { useCart } from '../../../context/CartContext';
// import { AuthContext } from '../../../context/AuthContext';
// import './ProductView.scss';

// function UserProductView() {
//   const { id } = useParams();
//   const [product, setProduct] = useState(null);
//   const { addToCart } = useCart();
//   const { user } = useContext(AuthContext);

//   useEffect(() => {
//     async function fetchProduct() {
//       try {
//         const res = await getProductById(id);
//         setProduct(res.data);
//       } catch (error) {
//         console.error('Error fetching product:', error);
//       }
//     }
//     fetchProduct();
//   }, [id]);

//   if (!product) return <p className="loading">Loading product...</p>;

//   const imageUrl = product?.images?.[0]
//     ? `http://localhost:4000/${product.images[0]}`
//     : 'https://via.placeholder.com/450x500?text=No+Image';

//   function handleAddToCart() {
//     console.log('User', user);
//     if (!user?._id) {
//       alert('Please log in to add items to your cart.');
//       return;
//     }
//     if (!product?._id) {
//       alert('Product information is incomplete.');
//       return;
//     }

//     const cartItem = {
//       userId: user._id,
//       productId: product._id,
//       name: product.name,
//       price: product.price,
//       quantity: 1,
//       images: product.images,
//     };

//     addToCart(cartItem);
//     alert('Item added to cart!');
//   }

//   return (
//     <div className="product-page">
//       <div className="product-details">
//         <div className="product-images">
//           <img src={imageUrl} alt={product.name} />
//         </div>
//         <div className="product-info">
//           <h1>{product.name}</h1>
//           <div className="price">₹ {product.price}</div>
//           <div className="description">
//             <h3>Description</h3>
//             <p>{product.description || 'No description available.'}</p>
//           </div>
//           <div className="actions">
//             <button className="btn outline" onClick={handleAddToCart}>
//               Add to Cart
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default UserProductView;

import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { getProductById } from '../../../services/api';
import { useCart } from '../../../context/CartContext';
import { AuthContext } from '../../../context/AuthContext';
import './ProductView.scss';

function UserProductView() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { addToCart } = useCart();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    async function fetchProduct() {
      try {
        const res = await getProductById(id);
        setProduct(res.data);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    }
    fetchProduct();
  }, [id]);

  if (!product) return <p className="loading">Loading product...</p>;

  const imageUrl = product?.images?.[0]
    ? `http://localhost:4000/${product.images[0]}`
    : 'https://via.placeholder.com/450x500?text=No+Image';

  function handleAddToCart() {
    if (!user?._id) {
      alert('Please log in to add items to your cart.');
      return;
    }

    const cartItem =[{
      productId: product._id, // 👉 must match what CartContext uses    
      quantity: 1,
    }];

    addToCart(cartItem);
    alert('Item added to cart!');
  }

  return (
    <div className="product-page">
      <div className="product-details">
        <div className="product-images">
          <img src={imageUrl} alt={product.name} />
        </div>
        <div className="product-info">
          <h1>{product.name}</h1>
          <div className="price">₹ {product.price}</div>
          <div className="description">
            <h3>Description</h3>
            <p>{product.description || 'No description available.'}</p>
          </div>
          <div className="actions">
            <button className="btn outline" onClick={handleAddToCart}>
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserProductView;
