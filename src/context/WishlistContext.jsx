import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  getWishlist,
  addToWishlist,
  removeFromWishlist,
} from '../services/api';
import { toast } from 'react-toastify';
import { useAuth } from './AuthContext';

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);
  const { user } = useAuth();

  const fetchWishlist = async () => {
    if (!user?._id) return;
    try {
      const res = await getWishlist();
      setWishlist(res.data.map((p) => p._id));
    } catch (err) {
      console.error('Error loading wishlist:', err);
    }
  };

  const toggleWishlist = async (productId) => {
    if (!user?._id) {
      toast.warn('Please log in to use wishlist.');
      return;
    }

    try {
      if (wishlist.includes(productId)) {
        await removeFromWishlist(productId);
        setWishlist((prev) => prev.filter((id) => id !== productId));
        toast.info('Removed from wishlist.');
      } else {
        await addToWishlist(productId);
        await fetchWishlist();
        setWishlist((prev) => [...prev, productId]);
        toast.success('Added to wishlist!');
      }
    } catch (err) {
      console.error('Toggle wishlist error:', err);
      toast.error('Something went wrong.');
    }
  };

  useEffect(() => {
    if (user?._id) {
      fetchWishlist();
    } else {
      setWishlist([]);
    }
  }, [user]);

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        toggleWishlist,
        fetchWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);
