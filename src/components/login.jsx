// components/Login.jsx
import React, { useState } from 'react';
import './login.css';
import { Link, Navigate, useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (email && password) {
      setIsLoggedIn(true);
    } else {
      alert("Please enter valid credentials.");
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  if (isLoggedIn) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="login-container">
      <h2>Welcome back</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <div className="password-field">
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <span className="eye-icon" onClick={togglePasswordVisibility}>
            {showPassword ? (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20px" height="20px">
                <path fill="currentColor" d="M12 4.5C6.5 4.5 2.1 8.6 1 12c1.1 3.4 5.5 7.5 11 7.5 5.5 0 10-4.1 11-7.5-1.1-3.4-5.5-7.5-11-7.5zM12 15.6c-1.9 0-3.6-1.5-3.6-3.6s1.5-3.6 3.6-3.6 3.6 1.5 3.6 3.6-1.6 3.6-3.6 3.6zM12 7.5c-2.5 0-4.5 2-4.5 4.5S9.5 16.5 12 16.5s4.5-2 4.5-4.5S14.5 7.5 12 7.5z"/>
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20px" height="20px">
                <path fill="currentColor" d="M12 4.5C6.5 4.5 2.1 8.6 1 12c1.1 3.4 5.5 7.5 11 7.5 5.5 0 10-4.1 11-7.5-1.1-3.4-5.5-7.5-11-7.5zM12 15.6c-1.9 0-3.6-1.5-3.6-3.6s1.5-3.6 3.6-3.6 3.6 1.5 3.6 3.6-1.6 3.6-3.6 3.6zM12 7.5c-2.5 0-4.5 2-4.5 4.5S9.5 16.5 12 16.5s4.5-2 4.5-4.5S14.5 7.5 12 7.5z"/>
              </svg>
            )}
          </span>
        </div>
        <button type="submit">Login</button>
        <div className="forgot-password">
          <span onClick={() => navigate('/forgot-password')} className="link">
            Forgot Password?
          </span>
        </div>
      </form>

      <div className="separator">
        <hr />
        <span>or</span>
        <hr />
      </div>

      <div className="social-login-buttons">
        <button className="social-button google">
          <span className="icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="20px" height="20px">
              <path fill="#4285F4" d="M23.5 9.5c2.4 0 4.5 0.8 6.1 2.2l4.5-4.5c-3-2.7-6.9-4.2-10.6-4.2-9.1 0-16.5 7.4-16.5 16.5s7.4 16.5 16.5 16.5c9 0 15.7-6.2 15.7-15.5 0-1-0.1-2-0.2-2.9H23.5v5.5h9.3c-0.4 2.2-1.6 4-3.5 5.2v4.3h5.6c3.1-2.9 5-7.1 5-11.5C41 16.4 33.7 9.5 23.5 9.5z"/>
              <path fill="#34A853" d="M13.3 25.3l-3.2-2.5C7.7 25.1 6.5 27.2 6.5 29.5c0 2.3 1.2 4.3 3 5.4l4.1-4.1C12.4 29.6 12 27.6 13.3 25.3z"/>
              <path fill="#FBBC05" d="M23.5 7.5c2.2 0 4.3 0.7 6 2.1l4.6-4.6c-3.1-2.6-7-4.1-10.6-4.1C13.3 1 6.5 7.8 6.5 16.5c0 2.6 0.6 5.1 1.7 7.3l4.1-4.1c-0.4-1.1-0.7-2.4-0.7-3.7 0-4.6 3.8-8.3 8.4-8.3z"/>
              <path fill="#EA4335" d="M42.7 22.9H23.5v5.5h10.7c-0.5 2.2-1.7 4.1-3.4 5.3l4.1 4.1c2.5-2.3 4-5.6 4-9.3C42.8 25.6 42.8 24.2 42.7 22.9z"/>
            </svg>
          </span>
          Continue with Google
        </button>
        <button className="social-button facebook">
          <img src="https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg" alt="Facebook" className="icon" />
          Continue with Facebook
        </button>
        <button className="social-button apple">
          <img src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg" alt="Apple" className="icon" />
          Continue with Apple
        </button>
      </div>

      <p className="not-a-user">
        New to PathForge? <Link to="/signup">Sign up</Link>
      </p>
    </div>
  );
};

export default Login;
