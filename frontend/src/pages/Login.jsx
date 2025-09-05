import React, { useState, useContext } from 'react';
import InputField from '../components/InputField';
import { loginUser } from '../api/authApi';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const { setUser, setToken } = useContext(AuthContext);
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await loginUser(form);
      setUser(res.data.user);
      setToken(res.data.token);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <InputField label="Email" name="email" type="email" value={form.email} onChange={handleChange} />
      <InputField label="Password" name="password" type="password" value={form.password} onChange={handleChange} />
      <button type="submit">Login</button>
      <p><Link to="/forgot-password">Forgot Password?</Link></p>
      <p><Link to="/register">Create account</Link></p>
    </form>
  );
};

export default Login;
