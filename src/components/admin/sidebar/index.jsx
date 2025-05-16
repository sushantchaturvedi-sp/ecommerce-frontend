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

function Sidebar() {
  return (
    <div className="sidebar">
      <div className="nav-section">
        <ul className="nav-list">
          <li>
            <Link to="/">
              <Home size={18} /> Dashboard
            </Link>
          </li>
          <li>
            <List size={18} /> Orders
          </li>
          <li>
            <Link to="/admin/products">
              <Tag size={18} /> Products
            </Link>
          </li>
          <li>
            <Folder size={18} /> Categories
          </li>
          <li>
            <UsersRound size={18} /> Customers
          </li>
          <li>
            <ChartColumnIncreasing size={18} /> Reports
          </li>
          <li>
            <Star size={18} /> Coupons
          </li>
          <li>
            <MessageSquareText size={18} /> Inbox
          </li>
        </ul>
      </div>

      {/* <div className="nav-section">
        <h4 className="section-title">Other Information</h4>
        <ul className="nav-list">
          <li>
            <CircleHelp size={18} /> Knowledge Base
          </li>
          <li>
            <Award size={18} /> Product Updates
          </li>
        </ul>
      </div> */}

      {/* <div className="nav-section">
        <h4 className="section-title">Settings</h4>
        <ul className="nav-list">
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

export default Sidebar;
