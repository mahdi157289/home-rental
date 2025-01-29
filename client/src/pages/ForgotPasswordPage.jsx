import { Email } from "@mui/icons-material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/ForgotPassword.scss"; // Add styling as needed

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  // Submit the email to the backend
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3001/auth/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (data.success) {
        // Optionally redirect after success
        navigate("/login");
      } else {
        // Handle error
        alert(data.message);
      }
    } catch (err) {
      console.log("Error in password reset", err.message);
    }
  };

  return (
    <div className="forgot-password">
      <div className="forgot-password-content">
        <form onSubmit={handleSubmit}>
          <h1>Forgot Password</h1>
          <h4>Enter your email to reset your password</h4>
          <div className="input-container">
            <Email className="icon" />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <button type="submit">Send Reset Link</button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
