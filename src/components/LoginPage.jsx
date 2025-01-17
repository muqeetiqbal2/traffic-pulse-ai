import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./css/LoginPage.css";

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simple validation (replace with actual authentication logic)
    if (username === "admin" && password === "password") {
      localStorage.setItem("isLoggedIn", "true"); // Save login state
      navigate("/dashboard"); // Redirect to dashboard
    } else {
      alert("Invalid credentials!");
    }
  };

  return (
    <section className="login-main">
      <div className="login-container">
        <div className="logo-section">
          <img
            src="../assets/TrafficPulse-AI-Logo.png"
            alt="TrafficPulse AI Logo"
            className="logo"
          />
        </div>
        <div className="login-section">
          <h2>User Login</h2>
          <form className="login-form" onSubmit={handleSubmit}>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="username"
            />
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="password"
            />
            <button type="submit">Login</button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default LoginPage;
