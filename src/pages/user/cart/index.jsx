import React, { useEffect, useState } from 'react';
import { useCart } from '../../../context/CartContext';
import { validateCoupon } from '../../../services/api';
import { Link } from 'react-router-dom';
import './index.scss';
import { toast } from 'react-toastify';

function CartPage() {
  const { cartItems, getCart, updateQuantity, updateCart } = useCart();

  const [coupon, setCoupon] = useState('');
  const [discount, setDiscount] = useState(0);
  const [couponError, setCouponError] = useState('');

  useEffect(() => {
    getCart();
  }, []);

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const finalTotal = subtotal - discount;

  const handleApplyCoupon = async () => {
    try {
      const { data } = await validateCoupon({
        code: coupon,
        cartTotal: subtotal,
      });
      setDiscount(data.discount);
      setCouponError('');
    } catch (error) {
      setDiscount(0);
      toast.error(error.response?.data?.message || 'Invalid or expired coupon');
    }
  };

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
              <input
                type="text"
                placeholder="Coupon Code"
                value={coupon}
                onChange={(e) => setCoupon(e.target.value)}
              />
              <button onClick={handleApplyCoupon}>Apply Coupon</button>
              {couponError && <p className="error-msg">{couponError}</p>}
            </div>

            <div className="cart-summary">
              <h3>Cart Total</h3>
              <div className="summary-row">
                <span>Subtotal:</span>
                <span>₹ {subtotal}</span>
              </div>
              <div className="summary-row">
                <span>Shipping:</span>
                <span>Free</span>
              </div>
              {discount > 0 && (
                <div className="summary-row">
                  <span>Discount:</span>
                  <span className="discount">− ₹ {discount}</span>
                </div>
              )}
              <div className="summary-row total">
                <span>Total:</span>
                <span>₹ {finalTotal}</span>
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
