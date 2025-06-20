import Navbar from '../navbar/index';
import Header from '../header/index';
import { Outlet } from 'react-router-dom';
import './index.scss';
import Footer from '../footer';

function UserLayout() {
  return (
    <div className="layout-wrapper-user">
      <Header />
      <Navbar />
      <main className="outlet-layout-user">
        <Outlet />
      </main>
      <div className="footer-layout-user">
        {' '}
        <Footer />
      </div>
    </div>
  );
}

export default UserLayout;
