import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import InputField from '../components/InputField';
import { resetPassword } from '../api/authApi';

const ResetPassword = () => {
  const { token } = useParams();
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await resetPassword(token, { password });
      setMessage(res.data.message);
      navigate('/'); // redirect to login after reset
    } catch (err) {
      setMessage(err.response?.data?.message || 'Reset failed');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Reset Password</h2>
      {message && <p>{message}</p>}
      <InputField label="New Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button type="submit">Reset Password</button>
    </form>
  );
};

export default ResetPassword;
