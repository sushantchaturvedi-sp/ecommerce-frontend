import React, { useState, useEffect } from 'react';
import './index.scss';
import { useCart } from '../../../context/CartContext';
import { useAuth } from '../../../context/AuthContext';
import { CreditCard } from 'lucide-react';
import { placeOrder } from '../../../services/api';
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
  const [saveInfo, setSaveInfo] = useState(true);
  const [orderSuccess, setOrderSuccess] = useState(false);

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shipping = 0;
  const total = subtotal;

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
    if (!user) {
      toast.error('Please login to place an order.');
      return;
    }

    if (cartItems.length === 0) {
      toast.error('Cart is empty.');
      return;
    }

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

      await placeOrder(formattedItems, payment, shippingAddress);

      setOrderSuccess(true);
      toast.success('🎉 Order placed successfully!');
    } catch (error) {
      console.error('Order placement failed:', error);
      toast.error(
        error.response?.data?.message ||
          'Failed to place order. Please try again.'
      );
    }
  };

  if (orderSuccess) {
    return <h2 className="success">🎉 Order placed successfully!</h2>;
  }

  return (
    <div className="checkout-page">
      {/* Your existing form and order summary code */}
    </div>
  );
}

export default Checkout;
