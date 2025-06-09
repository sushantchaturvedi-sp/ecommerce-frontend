import React from 'react';
import './index.scss';
import {
  Home,
  Tag,
  ChartColumnIncreasing,
  List,
  Folder,
  UsersRound,
  Star,
  MessageSquareText,
  CircleHelp,
  Award,
  ShieldUser,
  Settings,
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
            <Link to="/">
              <Home size={18} /> Dashboard
            </Link>
          </li>
          <li>
            <Link to="/admin/orders">
              <List size={18} /> Orders
            </Link>
          </li>
          <li>
            <Link to="/admin">
              <Tag size={18} /> Products
            </Link>
          </li>
          <li>
            <ChartColumnIncreasing size={18} /> Banners
          </li>
          <li>
            <Folder size={18} /> Categories
          </li>
          <li>
            <UsersRound size={18} /> Customers
          </li>
          <li>
            <Link to="/admin/coupons">
              <Star size={18} /> Coupons
            </Link>
          </li>
          <li>
            <MessageSquareText size={18} /> Inbox
          </li>
        </ul>
      </div>

      {/* <div className="admin-nav-section">
        <h4 className="admin-section-title">Other Information</h4>
        <ul className="admin-nav-list">
          <li>
            <CircleHelp size={18} /> Knowledge Base
          </li>
          <li>
            <Award size={18} /> Product Updates
          </li>
        </ul>
      </div> */}

      {/* <div className="admin-nav-section">
        <h4 className="admin-section-title">Settings</h4>
        <ul className="admin-nav-list">
          <li>
            <ShieldUser size={18} /> Personal Settings
          </li>
          <li>
            <Settings size={18} /> Global Settings
          </li>
        </ul>
      </div> */}
    </div>
  );
}

export default AdminSidebar;
