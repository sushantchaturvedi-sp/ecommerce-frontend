import React, { useState, useEffect } from 'react';
import './index.scss';
import { useCart } from '../../../context/CartContext';
import { useAuth } from '../../../context/AuthContext';
import { CreditCard } from 'lucide-react';

function Checkout() {
  const { cartItems, clearCart } = useCart();
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
  const [saveInfo, setSaveInfo] = useState(true);
  const [orderSuccess, setOrderSuccess] = useState(false);

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shipping = 0; // Free shipping
  const total = subtotal;

  useEffect(() => {
    if (user?.shippingAddress) {
      setBillingDetails({
        ...billingDetails,
        street: user.shippingAddress.street || '',
        city: user.shippingAddress.city || '',
        email: user.email || '',
      });
    }
  }, [user]);

  const handleInputChange = (e) => {
    setBillingDetails({ ...billingDetails, [e.target.name]: e.target.value });
  };

  const placeOrder = async () => {
    const orderData = {
      userId: user?._id,
      items: cartItems,
      shippingInfo: {
        street: billingDetails.street,
        city: billingDetails.city,
        state: '',
        zipcode: '',
        country: '',
      },
      contactInfo: {
        name: billingDetails.firstName,
        phone: billingDetails.phone,
        email: billingDetails.email,
      },
      paymentMethod,
      coupon,
      totalAmount: total,
    };

    try {
      const res = await fetch('http://localhost:4000/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData),
      });

      if (res.ok) {
        setOrderSuccess(true);
        clearCart();
      } else {
        alert('Failed to place order');
      }
    } catch (err) {
      console.error(err);
      alert('Order error');
    }
  };

  if (orderSuccess) {
    return <h2 className="success">🎉 Order placed successfully!</h2>;
  }

  return (
    <div className="checkout-page">
      <div className="billing-section">
        <h2>Billing Details</h2>
        <form>
          <input
            type="text"
            name="firstName"
            placeholder="First Name*"
            value={billingDetails.firstName}
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            name="companyName"
            placeholder="Company Name"
            value={billingDetails.companyName}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="street"
            placeholder="Street Address*"
            value={billingDetails.street}
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            name="apartment"
            placeholder="Apartment, floor, etc. (optional)"
            value={billingDetails.apartment}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="city"
            placeholder="Town/City*"
            value={billingDetails.city}
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            name="phone"
            placeholder="Phone Number*"
            value={billingDetails.phone}
            onChange={handleInputChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email Address*"
            value={billingDetails.email}
            onChange={handleInputChange}
            required
          />
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

      <div className="order-summary">
        <h3>Order Summary</h3>
        <ul className="item-list">
          {cartItems.map((item) => (
            <li key={item.productId || item.id} className="checkout-item">
              <img
                src={`http://localhost:4000/${item.images?.[0]}`}
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
        <div className="summary-total">
          <strong>Total:</strong>
          <strong>₹{total}</strong>
        </div>

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

        <div className="coupon">
          <input
            type="text"
            placeholder="Coupon Code"
            value={coupon}
            onChange={(e) => setCoupon(e.target.value)}
          />
          <button type="button" className="apply-btn">
            Apply Coupon
          </button>
        </div>

        <button className="place-order-btn" onClick={placeOrder}>
          Place Order
        </button>
      </div>
    </div>
  );
}

export default Checkout;
