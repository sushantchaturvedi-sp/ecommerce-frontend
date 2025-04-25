import React from 'react';
import Sidebar from './components/sidebar/index';
import TopNavbar from './components/navbar/index';
import Signup from './pages/signup/index';
import Login from './pages/login/index';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ResetPassword from './pages/login/ResetPassword';
import ChangePassword from './pages/login/ChangePassword';
import AdminProduct from './pages/AdminProduct/index';
import { ToastProvider } from './context/ToastContext';
import { Navigate } from 'react-router-dom';


function Layout() {
  const location = useLocation();
  const hideLayout = ['/login', '/signup', '/reset-password', '/admin/products'].some(path =>
    location.pathname.startsWith(path)
  );

  return (
    <>
      {!hideLayout && <TopNavbar />}
      {!hideLayout && <Sidebar />}

      <Routes>
      
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/reset-password/:token" element={<ChangePassword />} />
        <Route path="/admin/products" element={<AdminProduct />} />
      </Routes>
    </>
  );
}

function App() {
  // const[img, setImg] = useState("");

  // const formData = new FormData();
  // formData.append("image");
  // const handleClick=()=>{
  //   fetch("http://localhost:")
  // }
  return (
    <BrowserRouter>
      <AuthProvider>
      <ToastProvider>
        <Layout />
      </ToastProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
