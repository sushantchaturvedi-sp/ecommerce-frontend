import React from 'react';
import './index.scss';
import {
  Home,
  Tag,
  ChartColumnIncreasing,
  List,
  Folder,
  UsersRound,
  Fullscreen,
  Star,
  MessageSquareText,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';

function AdminSidebar() {
  const { user } = useAuth();
  console.log('User from context:', user);
  if (!user || user.role !== 'admin') return null;

  return (
    <div className="admin-sidebar">
      <div className="admin-nav-section">
        <ul className="admin-nav-list">
          <li>
            <Link to="/" className='active'>
              <Home size={18} /> Dashboard
            </Link>
          </li>
          <li>
            <Link to="/admin/orders" className='active'>
              <List size={18} /> Orders
            </Link>
          </li>
          <li>
            <Link to="/admin" className='active'>
              <Tag size={18} /> Products
            </Link>
          </li>
          <li>
            <Link to="/admin/banners" className='active'>
              <Fullscreen size={18} /> Banner
            </Link>
          </li>
          {/* <li>
            <Folder size={18} /> Categories
          </li>
          <li>
            <UsersRound size={18} /> Customers
          </li> */}
        </ul>
      </div>
    </div>
  );
}

export default AdminSidebar;
