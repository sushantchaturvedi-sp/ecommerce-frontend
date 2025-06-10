import React, { useState, useEffect, useMemo } from 'react';
import './index.scss';
import { useCart } from '../../../context/CartContext';
import { useAuth } from '../../../context/AuthContext';
import { placeOrder, validateCoupon } from '../../../services/api';
import { toast } from 'react-toastify';

function Checkout() {
  const {
    cartItems,
  } = useCart();


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
  const [saveInfo, setSaveInfo] = useState(true);
  const [orderSuccess, setOrderSuccess] = useState(false);

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

      await placeOrder(formattedItems, payment, shippingAddress, finalTotal);
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
          
        </form>
      </div>

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
        
          
        
        <div className="summary-total">
          <strong>Total:</strong>
          <strong>₹{finalTotal}</strong>
        </div>

        {/* Payment Method */}
        <div className="payment-method">
          
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

        

        <button className="place-order-btn" onClick={handlePlaceOrder}>
          Place Order
        </button>
      </div>
    </div>
  );
}

export default Checkout;
