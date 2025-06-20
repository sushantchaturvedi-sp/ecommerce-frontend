import {
  saveCart as saveCartAPI,
  getCart as getCartApi,
} from '../services/api';
import { useAuth } from './AuthContext';

import React, { createContext, useContext, useState } from 'react';
import { toast } from 'react-toastify';
const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const addToCart = async (items) => {
    setLoading(true);
    try {
      await saveCartAPI(user?._id, items);
      await getCart();
    } catch (error) {
      toast.error('Failed to add items to cart.');
    } finally {
      setLoading(false);
    }
  };

  const getCart = async () => {
    console.log('Fetching cart items...');

    if (!user?._id) {
      toast.error('You must be logged in to view the cart.');
      return;
    }

    try {
      const response = await getCartApi(user?._id);

      const cartData = response.data.cart || [];

      // Map API data to frontend-friendly cart item format
      const formattedCart = cartData.map((item) => ({
        id: item.product._id,
        name: item.product.name,
        price: item.product.price,
        images: item.product.images,
        quantity: item.quantity,
      }));

      setCartItems(formattedCart);
    } catch (error) {
      toast.error('Failed to fetch cart.');
    }
  };

  // Update quantity
  const updateQuantity = (id, quantity) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: Number(quantity) } : item
      )
    );
  };

  // Update cart
  const updateCart = async () => {
    if (!user?._id) {
      toast.error('You must be logged in to update the cart.');
      return;
    }

    try {
      const formattedItems = cartItems.map((item) => ({
        productId: item.id,
        quantity: item.quantity,
      }));

      await saveCartAPI(user._id, formattedItems);
      toast.success('Cart updated successfully!');
    } catch (error) {
      toast.error('Failed to update cart');
    }
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        getCart,
        loading,
        updateQuantity,
        updateCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};



