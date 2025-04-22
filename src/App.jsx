import React from 'react';
import Sidebar from './components/sidebar/index';
import TopNavbar from './components/navbar/index';
import Signup from './pages/signup/index';
import Login from './pages/login/index';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ResetPassword from './pages/login/ResetPassword';
import ChangePassword from './pages/login/ChangePassword';

function App() {
  return (
    <div>
      <TopNavbar />
      <Sidebar />
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/reset-password/:token" element={<ChangePassword />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;

// function Layout() {
//   const location = useLocation();
//   const hideLayout = ['/login', '/signup', '/reset-password'].some(path =>
//     location.pathname.startsWith(path)
//   );

//   return (
//     <>
//       {!hideLayout && <TopNavbar />}
//       {!hideLayout && <Sidebar />}

//       <Routes>
//         <Route path="/signup" element={<Signup />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/reset-password" element={<ResetPassword />} />
//         <Route path="/reset-password/:token" element={<ChangePassword />} />
//       </Routes>
//     </>
//   );
// }

// function App() {
//   return (
//     <BrowserRouter>
//       <AuthProvider>
//         <Layout />
//       </AuthProvider>
//     </BrowserRouter>
//   );
// }

// export default App;
