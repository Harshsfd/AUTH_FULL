import axios from 'axios';

const API = axios.create({ baseURL: import.meta.env.VITE_API_URI });

export const registerUser = (data) => API.post('/auth/register', data);
export const loginUser = (data) => API.post('/auth/login', data);
export const forgotPassword = (data) => API.post('/auth/forgot-password', data);
export const resetPassword = (token, data) => API.post('/auth/reset-password', { token, ...data });
export const getProfile = (token) => API.get('/users/profile', { headers: { Authorization: `Bearer ${token}` } });
