import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { getProfile } from "../api/authApi";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const { user } = useContext(AuthContext);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await getProfile(user.token);
        setProfile(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    if (user?.token) fetchProfile();
  }, [user]);

  return (
    <div>
      <h2>Dashboard</h2>
      {profile ? (
        <div>
          <p>Name: {profile.name}</p>
          <p>Email: {profile.email}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
      <Link to="/logout">Logout</Link>
    </div>
  );
}
