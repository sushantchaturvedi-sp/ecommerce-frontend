import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// Automatically attach token
API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token');

  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export const signup = (formData) => API.post('/auth/register', formData);
export const login = (formData) => API.post('/auth/login', formData);
export const resetPassword = (email) =>
  API.post('/auth/forgotPassword', { email });
export const changePassword = (token, newPassword) =>
  API.put(`/auth/resetpassword/${token}`, { password: newPassword });

// Product APIs
export const getProducts = (page = 1, limit = 10) => {
  return API.get(`/products?page=${page}&limit=${limit}`);
};

export const getProductById = (id) => API.get(`/products/${id}`);
export const createProduct = (formData) =>
  API.post('/products', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
export const updateProduct = (id, formData) =>
  API.put(`/products/${id}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
export const deleteProduct = (id) => API.delete(`/products/${id}`);

// User APIs
export const getUserProducts = (userId) => API.get(`/products/user/${userId}`);
export const getUserProductById = (userId, productId) =>
  API.get(`/products/user/${userId}/${productId}`);
export const createUserProduct = (userId, formData) =>
  API.post(`/products/user/${userId}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
export const updateUserProduct = (userId, productId, formData) =>
  API.put(`/products/user/${userId}/${productId}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
export const deleteUserProduct = (userId, productId) =>
  API.delete(`/products/user/${userId}/${productId}`);

// Cart APIs
// Save or update user's cart
export const saveCart = (userId, items) =>
  API.post(`/cart/${userId}/items`, { userId, items });

// Get user's cart
export const getCart = (userId) => API.get(`/cart/${userId}/items`);

export const getUser = (userId) => API.post(`/user/toggle/:id`, { userId });

// Order API

export const placeOrder = (items, paymentMethod, shippingAddress) =>
  API.post('/orders/checkout', { items, paymentMethod, shippingAddress });

// Authenticated User Profile
// export const getProfile = () => API.get('/user/profile');
export const getProfile = () => API.get('/users/profile');
export const updateProfile = (formData) => API.put('/users/profile', formData);

export const getMyOrders = () => API.get('/orders/my');

export const getTopSellingProducts = (limit = 7) =>
  API.get(`/products?sort=orders_desc&limit=${limit}`);

// Banner APIs
export const getBanners = () => API.get('/banners');
export const createBanner = (formData) =>
  API.post('/banners', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
export const deleteBanner = (id) => API.delete(`/banners/${id}`);
