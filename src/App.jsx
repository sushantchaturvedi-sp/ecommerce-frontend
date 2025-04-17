import React from 'react';
import Sidebar from './components/sidebar/index';
import TopNavbar from './components/navbar/index';
import Signup from './pages/signup/index';
import Login from './pages/login/index';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ResetPassword from './pages/login/ResetPassword';

function App() {
  return (
    <div>
      {/* <TopNavbar />
      <Sidebar /> */}
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/reset-password" element={<ResetPassword />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
