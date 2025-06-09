import { Routes, Route } from 'react-router-dom';

import Layout from './components/admin/layout/index';
import Signup from './pages/admin/signup/index';
import Login from './pages/admin/login/index';
import ResetPassword from './pages/admin/login/ResetPassword';
import ChangePassword from './pages/admin/login/ChangePassword';
import ProductList from './pages/admin/products/admin/ProductList';
import AddProduct from './pages/admin/products/admin/AddProduct';
import EditProduct from './pages/admin/products/admin/EditProduct';

import BannerManager from './components/admin/BannerManager';
import CouponManager from './pages/admin/CouponManager';
import AdminOrders from './pages/admin/AdminOrders';

import UserProductList from './pages/user/products/ProductList';
import UserProductView from './pages/user/products/ProductView';
import AllProductList from './pages/user/products/AllProductList';

import UserLayout from './components/user/layout/index';

import ContactPage from './pages/user/contact/index';
import AboutPage from './pages/user/about/index';
import CartPage from './pages/user/cart/index';
import Checkout from './pages/user/checkout/index';
import MyAccount from './pages/user/myAccount/index';
import Orders from './pages/user/orders/index';
import WishlistPage from './pages/user/wishlist';

import NotFound from './pages/user/notFound';
import AdminRoute from './routes/AdminRoute';

import cartUpdate from './hooks/cartUpdate';

function App() {
  cartUpdate();

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/reset-password/:token" element={<ChangePassword />} />

      {/* Admin Routes */}
      <Route
        path="/admin"
        element={
          <AdminRoute>
            <Layout />
          </AdminRoute>
        }
      >
        <Route index element={<ProductList />} />
        <Route path="products/add" element={<AddProduct />} />
        <Route path="products/edit/:id" element={<EditProduct />} />
        <Route path="products/all" element={<UserProductList />} />
        <Route path="products/:id" element={<UserProductView />} />
        <Route path="banners" element={<BannerManager />} />
        <Route path="coupons" element={<CouponManager />} />
        <Route path="orders" element={<AdminOrders />} />
      </Route>

      {/* User Routes */}
      <Route path="/" element={<UserLayout />}>
        <Route index element={<UserProductList />} />
        <Route path="product/:id" element={<UserProductView />} />
        <Route path="products" element={<AllProductList />} />
        <Route path="contact" element={<ContactPage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="cart" element={<CartPage />} />
        <Route path="checkout" element={<Checkout />} />
        <Route path="account" element={<MyAccount />} />
        <Route path="orders" element={<Orders />} />
        <Route path="wishlist" element={<WishlistPage />} />
      </Route>

      {/* Catch-all Route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
