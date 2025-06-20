import React, { useEffect } from 'react';
import { useCart } from '../../../context/CartContext';
import { Link } from 'react-router-dom';
import emptyCartImage from '/src/assets/empty-cart.jpg';
import './index.scss';

function CartPage() {
  const { cartItems, getCart, updateQuantity, updateCart, applyCoupon } = useCart();

  useEffect(() => {
    getCart();
  }, []);

  return (
    <div className="cart-page">
      <h1>Your Cart</h1>

      {cartItems.length === 0 ? (
        <div className="empty-cart">
          <img
            src={emptyCartImage}
            alt="Empty Cart"
            className="empty-cart-img"
          />
          <h2>Your cart is empty</h2>
          <p>Looks like you haven’t added anything to your cart yet.</p>
          <Link to="/products">
            <button className="shop-now-btn">Shop Now</button>
          </Link>
        </div>
      ) : (
        <>
          <div className="cart-table-wrapper">
            <table className="cart-table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Subtotal</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => (
                  <tr key={item.id}>
                    <td>
                      <div className="product-info">
                        <img
                          src={
                            item.images?.[0]
                              ? item.images[0]
                              : '/fallback-image.jpg'
                          }
                          alt={item.name}
                        />
                        <span>{item.name}</span>
                      </div>
                    </td>
                    <td>₹ {item.price}</td>
                    <td>
                      <input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) =>
                          updateQuantity(item.id, Number(e.target.value))
                        }
                      />
                    </td>
                    <td>₹ {item.price * item.quantity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="cart-actions">
            <Link to="/products">
              <button>Return To Shop</button>
            </Link>
            <button onClick={updateCart}>Update Cart</button>
          </div>

          <div className="cart-bottom">
            <div className="coupon-box">
              <Link to="/checkout">
                <button className="checkout-btn">Proceed to Checkout</button>
              </Link>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default CartPage;
