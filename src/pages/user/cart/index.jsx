import React, { useEffect } from 'react';
import { useCart } from '../../../context/CartContext';
import './index.scss';
import { Link } from 'react-router-dom';

function CartPage() {
  const { cartItems, getCart, updateQuantity, updateCart } = useCart();

  useEffect(() => {
    getCart();
  }, []);

  const total = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div className="cart-page">
      <h1>Your Cart</h1>

      {cartItems.length === 0 ? (
        <p>Cart is empty</p>
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
                              ? `${import.meta.env.VITE_IMAGE_URL}${item.images[0]}`
                              : '/fallback-image.jpg' // Optional fallback
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
              <input type="text" placeholder="Coupon Code" />
              <button>Apply Coupon</button>
            </div>

            <div className="cart-summary">
              <h3>Cart Total</h3>
              <div className="summary-row">
                <span>Subtotal:</span>
                <span>₹ {total}</span>
              </div>
              <div className="summary-row">
                <span>Shipping:</span>
                <span>Free</span>
              </div>
              <div className="summary-row total">
                <span>Total:</span>
                <span>₹ {total}</span>
              </div>
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
