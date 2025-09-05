import React, { useState, useContext } from 'react';
import InputField from '../components/InputField';
import { registerUser } from '../api/authApi';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const { setUser, setToken } = useContext(AuthContext);
  const [form, setForm] = useState({ name: '', email: '', password: '', mobile: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await registerUser(form);
      setUser(res.data.user);
      setToken(res.data.token);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Register</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <InputField label="Full Name" name="name" type="text" value={form.name} onChange={handleChange} />
      <InputField label="Email" name="email" type="email" value={form.email} onChange={handleChange} />
      <InputField label="Mobile" name="mobile" type="text" value={form.mobile} onChange={handleChange} />
      <InputField label="Password" name="password" type="password" value={form.password} onChange={handleChange} />
      <button type="submit">Register</button>
    </form>
  );
};

export default Register;
