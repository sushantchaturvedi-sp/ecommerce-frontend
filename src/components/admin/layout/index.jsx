import TopNavbar from '../navbar/index';
import Sidebar from '../sidebar/index';
import { Outlet } from 'react-router-dom';
import './index.scss';

function Layout() {
  return (
    <div className="layout-wrapper">
      <TopNavbar />
      <Sidebar />
      <div className="main-content">
        <Outlet />
      </div>
    </div>
  );
}

export default Layout;

