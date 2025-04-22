import axios from 'axios';

const API = axios.create({ baseURL: 'http://192.168.0.184:4000/api/v1' });

export const signup = (formData) => API.post('/auth/signup', formData);
export const login = (formData) => API.post('/auth/login', formData);
export const resetPassword = (email) =>
  API.post('/auth/forgotPassword', { email });
export const changePassword = (token, newPassword) =>
  API.put(`/auth/resetpassword/${token}`, { password: newPassword });
