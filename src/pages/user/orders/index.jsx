import React, { useEffect, useState } from 'react';
import './index.scss';
import { getMyOrders } from '../../../services/api';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await getMyOrders();
        setOrders(res.data.data || []);
      } catch (err) {
        console.error('Failed to fetch orders:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="orders-page">
      <h2>My Orders</h2>
      {loading ? (
        <p>Loading...</p>
      ) : orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        orders.map((order) => (
          <div className="order-card" key={order._id}>
            <h3>Order ID: {order._id}</h3>
            <p>
              Status: <strong>{order.status}</strong>
            </p>
            <p>Payment Method: {order.paymentMethod}</p>
            <p>Total: ₹{order.totalAmount.toFixed(2)}</p>
            <div className="order-items">
              <h4>Items:</h4>
              <ul>
                {order.items.map((item, index) => (
                  <li key={index} className="order-item">
                    <img
                      src={
                        item.image
                          ? `${item.image}`
                          : 'fallback-image-url.jpg'
                      }
                      alt={item.name}
                      className="order-item-image"
                    />
                    <div className="order-item-info">
                      <strong>{item.name}</strong> × {item.quantity} = ₹
                      {item.quantity * item.price}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="order-address">
              <h4>Shipping Address:</h4>
              <p>
                {order.shippingAddress.street}, {order.shippingAddress.city},{' '}
                {order.shippingAddress.state} - {order.shippingAddress.zipcode},{' '}
                {order.shippingAddress.country}
              </p>
            </div>
            <p className="order-date">
              Placed on: {new Date(order.createdAt).toLocaleString()}
            </p>
          </div>
        ))
      )}
    </div>
  );
};

export default Orders;
