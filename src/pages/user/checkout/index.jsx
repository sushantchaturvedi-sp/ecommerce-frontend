import React, { useState, useEffect } from 'react';

import './index.scss';

import { useCart } from '../../../context/CartContext';

import { useAuth } from '../../../context/AuthContext';

import { CreditCard } from 'lucide-react';

import { placeOrder, validateCoupon } from '../../../services/api';

import { toast } from 'react-toastify';

function Checkout() {
  const { cartItems } = useCart();

  const { user } = useAuth();

  const [billingDetails, setBillingDetails] = useState({
    firstName: '',

    companyName: '',

    street: '',

    apartment: '',

    city: '',

    phone: '',

    email: user?.email || '',
  });

  const [paymentMethod, setPaymentMethod] = useState('cod');

  const [coupon, setCoupon] = useState('');

  const [couponError, setCouponError] = useState('');

  const [discount, setDiscount] = useState(0);

  const [finalTotal, setFinalTotal] = useState(0);

  const [saveInfo, setSaveInfo] = useState(true);

  const [orderSuccess, setOrderSuccess] = useState(false);

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,

    0
  );

  useEffect(() => {
    setFinalTotal(subtotal);
  }, [subtotal]);

  useEffect(() => {
    if (user?.shippingAddress) {
      setBillingDetails((prev) => ({
        ...prev,

        street: user.shippingAddress.street || '',

        city: user.shippingAddress.city || '',

        email: user.email || '',
      }));
    }
  }, [user]);

  const handleInputChange = (e) => {
    setBillingDetails({ ...billingDetails, [e.target.name]: e.target.value });
  };

  const handleApplyCoupon = async () => {
    try {
      const { data } = await validateCoupon({
        code: coupon,
        cartTotal: subtotal,
      });

      setDiscount(data.discount);

      setFinalTotal(data.newTotal);

      setCouponError('');
    } catch (error) {
      setDiscount(0);

      setFinalTotal(subtotal);

      setCouponError(
        toast.error(
          error.response?.data?.message || 'Invalid or expired coupon'
        )
      );
    }
  };

  const handlePlaceOrder = async () => {
    if (!user) return alert('Please login to place an order.');

    if (cartItems.length === 0) return alert('Cart is empty.');

    try {
      const formattedItems = cartItems.map((item) => ({
        productId: item.productId || item.id,

        name: item.name,

        quantity: item.quantity,

        price: item.price,
      }));

      const payment = paymentMethod === 'cod' ? 'Cash on delivery' : 'Bank';

      const shippingAddress = {
        street: billingDetails.street,

        city: billingDetails.city,

        state: '',

        zipcode: '',

        country: '',
      };

      await placeOrder(
        formattedItems,

        payment,

        shippingAddress,

        finalTotal
      );

      setOrderSuccess(true);
    } catch (error) {
      console.error('Order failed:', error);

      toast.error(error.response?.data?.message || 'Failed to place order.');
    }
  };

  if (orderSuccess) {
    return <h2 className="success">🎉 Order placed successfully!</h2>;
  }

  return (
    <div className="checkout-page">
      {/* Billing Section */}
      <div className="billing-section">
        <h2>Billing Details</h2>
        <form>
          {[
            ['firstName', 'First Name*'],

            ['companyName', 'Company Name'],

            ['street', 'Street Address*'],

            ['apartment', 'Apartment, floor, etc. (optional)'],

            ['city', 'Town/City*'],

            ['phone', 'Phone Number*'],

            ['email', 'Email Address*'],
          ].map(([name, placeholder]) => (
            <input
              key={name}
              type={name === 'email' ? 'email' : 'text'}
              name={name}
              placeholder={placeholder}
              value={billingDetails[name]}
              onChange={handleInputChange}
              required={placeholder.includes('*')}
            />
          ))}

          <label className="save-info">
            <input
              type="checkbox"
              checked={saveInfo}
              onChange={() => setSaveInfo(!saveInfo)}
            />
            Save this information for faster check-out next time
          </label>
        </form>
      </div>

      {/* Order Summary */}
      <div className="order-summary">
        <h3>Order Summary</h3>
        <ul className="item-list">
          {cartItems.map((item) => (
            <li key={item.productId || item.id} className="checkout-item">
              <img
                src={item.images?.[0]}
                alt={item.name}
                className="checkout-item-img"
              />
              <div className="checkout-item-details">
                <span>{item.name}</span>
                <span>₹{item.price}</span>
              </div>
            </li>
          ))}
        </ul>

        <div className="summary-line">
          <span>Subtotal:</span>
          <span>₹{subtotal}</span>
        </div>
        <div className="summary-line">
          <span>Shipping:</span>
          <span>Free</span>
        </div>

        {discount > 0 && (
          <div className="summary-line">
            <span>Discount:</span>
            <span className="discount">− ₹{discount}</span>
          </div>
        )}
        <div className="summary-total">
          <strong>Total:</strong>
          <strong>₹{finalTotal}</strong>
        </div>

        {/* Payment */}
        <div className="payment-method">
          <label className="payment-option">
            <input
              type="radio"
              name="payment"
              value="bank"
              checked={paymentMethod === 'bank'}
              onChange={() => setPaymentMethod('bank')}
            />
            <span className="payment-label">
              <CreditCard size={18} className="bank-icon" />
              Bank
            </span>
          </label>
          <label className="payment-option">
            <input
              type="radio"
              name="payment"
              value="cod"
              checked={paymentMethod === 'cod'}
              onChange={() => setPaymentMethod('cod')}
            />
            <span className="payment-label">Cash on delivery</span>
          </label>
        </div>

        {/* Coupon */}
        <div className="coupon">
          <input
            type="text"
            placeholder="Coupon Code"
            value={coupon}
            onChange={(e) => setCoupon(e.target.value)}
          />
          <button
            type="button"
            className="apply-btn"
            onClick={handleApplyCoupon}
          >
            Apply Coupon
          </button>

          {/* {couponError && <p className="error-msg">{couponError}</p>} */}
        </div>

        <button className="place-order-btn" onClick={handlePlaceOrder}>
          Place Order
        </button>
      </div>
    </div>
  );
}

export default Checkout;
