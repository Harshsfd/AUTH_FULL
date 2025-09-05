import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { getProfile } from '../api/authApi';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const { token } = useContext(AuthContext);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await getProfile(token);
        setProfile(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchProfile();
  }, [token]);

  if (!profile) return <p>Loading...</p>;

  return (
    <div>
      <h2>Dashboard</h2>
      <p>Name: {profile.name}</p>
      <p>Email: {profile.email}</p>
      <p>Mobile: {profile.mobile}</p>
      <Link to="/logout">Logout</Link>
    </div>
  );
};

export default Dashboard;
