import { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const cartUpdate = () => {
  const { isAuthenticated } = useAuth();
  const { getCart } = useCart();

  useEffect(() => {
    if (isAuthenticated) {
      getCart();
    }
  }, [isAuthenticated]);
};

export default cartUpdate;
