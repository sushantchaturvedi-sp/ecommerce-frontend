import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { AuthProvider } from './context/AuthContext.jsx';
import { BrowserRouter } from 'react-router-dom';
import { SearchProvider } from './context/SearchContext.jsx';
import { CartProvider } from './context/CartContext.jsx';
import CommonToastContainer from './components/CommonToastContainer/index.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
        <CommonToastContainer />  {/* Place here for global availability */}
    <AuthProvider>
      <SearchProvider>
        <CartProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </CartProvider>
      </SearchProvider>
    </AuthProvider>
  </StrictMode>
);
