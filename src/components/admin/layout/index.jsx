import TopNavbar from '../navbar/index';
import AdminSidebar from '../AdminSidebar/index';
import { Outlet } from 'react-router-dom';
import './index.scss';

function Layout() {
  return (
    <div className="layout-wrapper-admin">
      <TopNavbar />
      <AdminSidebar />
      <div className="main-content">
        <Outlet />
      </div>
    </div>
  );
}

export default Layout;
