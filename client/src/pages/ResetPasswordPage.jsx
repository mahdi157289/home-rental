import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../styles/ResetPassword.scss";

const ResetPasswordPage = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [tokenValid, setTokenValid] = useState(true);
  const { token } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const checkTokenValidity = async () => {
      const response = await fetch(`http://localhost:3001/auth/reset-password/${token}`);
      const data = await response.json();
      if (!data.success) {
        setTokenValid(false);
      }
    };

    checkTokenValidity();
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const response = await fetch(`http://localhost:3001/auth/reset-password/${token}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password }),
      });

      const data = await response.json();
      if (data.success) {
        navigate("/login");
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.log("Error resetting password", err.message);
    }
  };

  if (!tokenValid) {
    return <p>Token expired or invalid.</p>;
  }

  return (
    <div className="reset-password">
      <div className="reset-password-content">
        <form onSubmit={handleSubmit}>
          <h1>Reset Password</h1>
          <div className="input-container">
            <input
              type="password"
              placeholder="New Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="input-container">
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">Reset Password</button>
        </form>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
