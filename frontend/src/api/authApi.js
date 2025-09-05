import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URI,
});

// Register
export const registerUser = (data) => API.post("/auth/register", data);

// Login
export const loginUser = (data) => API.post("/auth/login", data);

// Forgot password
export const forgotPassword = (data) => API.post("/auth/forgot-password", data);

// Reset password
export const resetPassword = (token, data) =>
  API.post(`/auth/reset-password/${token}`, data);

// Get profile
export const getProfile = (token) =>
  API.get("/user/profile", {
    headers: { Authorization: `Bearer ${token}` },
  });
