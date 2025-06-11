import React, { useEffect, useState } from 'react';
import {
  getAllOrders,
  updateOrderStatus,
  deleteOrder,
} from '../../../services/api';
import './index.scss';
import { toast, ToastContainer } from 'react-toastify';

function AdminOrders() {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const res = await getAllOrders();
      setOrders(res.data.data);
    } catch (err) {
      toast.error('Failed to load orders');
    }
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await updateOrderStatus(orderId, { status: newStatus });
      toast.success('Order status updated');
      fetchOrders();
    } catch {
      toast.error('Failed to update status');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure?')) return;
    try {
      await deleteOrder(id);
      toast.success('Order deleted');
      fetchOrders();
    } catch {
      toast.error('Delete failed');
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="admin-orders">
      <ToastContainer position="top-right"
        autoClose={3000}
        newestOnTop
        style={{ top: '80px', zIndex: 99999 }} />
      <h2>Admin Orders Panel</h2>
      <table>
        <thead>
          <tr>
            <th>Order ID</th>
            {/* <th>User</th> */}
            <th>Amount</th>
            <th>Payment</th>
            <th>Status</th>
            <th>Placed On</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order._id}>
              {/* <td>{order.user?.name || 'N/A'}</td> */}
              <td title={order._id} style={{ fontSize: '12px', color: '#1f1f1f' }}>{order._id.slice(0, 8)}...</td>
              {/* <td>{order.user?.name ?? order.user?.email ?? 'User Deleted'}</td> */}
              <td>₹{order.totalAmount}</td>
              <td>{order.paymentMethod}</td>
              <td>
                <select
                  value={order.status}
                  onChange={(e) =>
                    handleStatusChange(order._id, e.target.value)
                  }
                >
                  <option>Pending</option>
                  <option>Shipped</option>
                  <option>Delivered</option>
                </select>
              </td>
              <td>{new Date(order.createdAt).toLocaleDateString()}</td>
              <td>
                <button onClick={() => handleDelete(order._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminOrders;
