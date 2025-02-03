import { Email,  Lock } from "@mui/icons-material";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setLogin } from "../redux/state";
import "../styles/Login.scss";
import { colors } from "@mui/material";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch()

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const response = await fetch("http://localhost:3001/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      })

      /* Get data after fetching */
      const loggedIn = await response.json()

      if (loggedIn) {
        dispatch(
          setLogin({
            user: loggedIn.user,
            token: loggedIn.token
          })
        )
        navigate("/")
      }

    } catch (err) {
      console.log("Login failed", err.message)
    }
  }

  return (

    <div className="login1">
      <div className='login'>
        <div className="login_image">

        </div>
        <div className="login_content">


          <form className="login_content_form" onSubmit={handleSubmit}>
            <h1>Welcome</h1>
            <h4>Login your email</h4>
            <div className="input-container">
              < Email className="icon" />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div >

            <div className="input-container">
            < Lock className="icon" />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                class="border-text"
              />
            </div>
            <h4><a href="/forgot-password">Forgot password?</a></h4>
            <button type="submit">
              LOGIN
            </button>

          </form>
          <a href="/register" className="register-link" >Don't have an account? Sign In Here</a>
        </div>
      </div>
    </div>

  );
};

export default LoginPage;