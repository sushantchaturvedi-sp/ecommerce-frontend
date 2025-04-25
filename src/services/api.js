import axios from 'axios';

const API = axios.create({ baseURL: 'http://192.168.0.167:4000/api/v1' });

API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token');

  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export const signup = (formData) => API.post('/auth/signup', formData);
export const login = (formData) => API.post('/auth/login', formData);


export const resetPassword = (email) =>
  API.post('/auth/forgotPassword', { email });
export const changePassword = (token, newPassword) =>
  API.put(`/auth/resetpassword/${token}`, { password: newPassword });

export const createProduct = (formData)=> API.post('/products', formData);

export const getAllProducts = () => API.get("/products");
export const deleteProduct = (id) => API.delete(`/products/${id}`);

