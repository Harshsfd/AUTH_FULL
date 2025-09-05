import React, { useState } from "react";
import { forgotPassword } from "../api/authApi";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await forgotPassword({ email });
      setMsg(res.data.message);
    } catch (err) {
      setMsg(err.response?.data?.message || "Error sending reset link.");
    }
  };

  return (
    <div>
      <h2>Forgot Password</h2>
      <form onSubmit={onSubmit}>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" required />
        <button type="submit">Send Reset Link</button>
      </form>
      <p>{msg}</p>
    </div>
  );
}
