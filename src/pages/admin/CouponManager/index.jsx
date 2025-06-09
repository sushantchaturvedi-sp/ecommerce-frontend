import React, { useEffect, useState } from 'react';
import './index.scss';
import {
  createCoupon,
  getAllCoupons,
  deleteCoupon,
  updateCoupon,
} from '../../../services/api';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const initialFormState = {
  code: '',
  discountType: 'percentage',
  discountValue: '',
  minOrderAmount: '',
  expiresAt: '',
  usageLimit: '',
};

function CouponManager() {
  const [coupons, setCoupons] = useState([]);
  const [form, setForm] = useState(initialFormState);
  const [editId, setEditId] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchCoupons();
  }, []);

  const fetchCoupons = async () => {
    try {
      const res = await getAllCoupons();
      setCoupons(res.data.data);
    } catch (error) {
      toast.error('Failed to load coupons');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...form,
      discountValue: Number(form.discountValue),
      minOrderAmount: form.minOrderAmount ? Number(form.minOrderAmount) : 0,
      usageLimit: form.usageLimit ? Number(form.usageLimit) : 1,
    };

    try {
      if (editId) {
        await updateCoupon(editId, payload);
        toast.success('Coupon updated');
      } else {
        await createCoupon(payload);
        toast.success('Coupon created');
      }
      setForm(initialFormState);
      setEditId(null);
      setShowForm(false);
      fetchCoupons();
    } catch (error) {
      toast.error(error.response?.data?.error || 'Operation failed');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this coupon?')) {
      try {
        await deleteCoupon(id);
        toast.success('Coupon deleted');
        fetchCoupons();
      } catch (error) {
        toast.error('Failed to delete');
      }
    }
  };

  const handleEdit = (coupon) => {
    setEditId(coupon._id);
    setForm({
      code: coupon.code,
      discountType: coupon.discountType,
      discountValue: coupon.discountValue,
      minOrderAmount: coupon.minOrderAmount,
      expiresAt: coupon.expiresAt.split('T')[0],
      usageLimit: coupon.usageLimit,
    });
    setShowForm(true);
  };

  return (
    <div className="coupon-manager">
      <ToastContainer />
      <div className="header">
        <h2>Coupon Manager</h2>
        <button onClick={() => setShowForm((prev) => !prev)}>
          {showForm ? 'Close Form' : 'Add Coupon'}
        </button>
      </div>

      {showForm && (
        <form className="coupon-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="code"
            placeholder="Code"
            value={form.code}
            onChange={handleChange}
            required
          />
          <select
            name="discountType"
            value={form.discountType}
            onChange={handleChange}
          >
            <option value="percentage">Percentage</option>
            <option value="flat">Flat</option>
          </select>
          <input
            type="number"
            name="discountValue"
            placeholder="Discount Value"
            value={form.discountValue}
            onChange={handleChange}
            required
          />
          <input
            type="number"
            name="minOrderAmount"
            placeholder="Min Order Amount"
            value={form.minOrderAmount}
            onChange={handleChange}
          />
          <input
            type="date"
            name="expiresAt"
            value={form.expiresAt}
            onChange={handleChange}
            required
          />
          <input
            type="number"
            name="usageLimit"
            placeholder="Usage Limit"
            value={form.usageLimit}
            onChange={handleChange}
          />
          <button type="submit">{editId ? 'Update' : 'Create'}</button>
        </form>
      )}

      <div className="coupon-list">
        {coupons.length === 0 ? (
          <p>No coupons available</p>
        ) : (
          coupons.map((c) => (
            <div className="coupon-card" key={c._id}>
              <h3>{c.code}</h3>
              <p>
                {c.discountType === 'percentage'
                  ? `${c.discountValue}%`
                  : `₹${c.discountValue}`}{' '}
                discount
              </p>
              <p>Min Order: ₹{c.minOrderAmount}</p>
              <p>Expires: {new Date(c.expiresAt).toLocaleDateString()}</p>
              <p>
                Used: {c.usedCount}/{c.usageLimit}
              </p>
              <div className="actions">
                <button onClick={() => handleEdit(c)}>Edit</button>
                <button onClick={() => handleDelete(c._id)}>Delete</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default CouponManager;
