import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { AuthProvider } from './context/AuthContext.jsx';
import { BrowserRouter } from 'react-router-dom';
import { SearchProvider } from './context/SearchContext.jsx';
import { CartProvider } from './context/CartContext.jsx';
import CommonToastContainer from './components/CommonToastContainer/index.jsx';
import { WishlistProvider } from './context/WishlistContext';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CommonToastContainer />
    <AuthProvider>
      <SearchProvider>
        <CartProvider>
          <BrowserRouter>
            <WishlistProvider>
              <App />
            </WishlistProvider>
          </BrowserRouter>
        </CartProvider>
      </SearchProvider>
    </AuthProvider>
  </StrictMode>
);
