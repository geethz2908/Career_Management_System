// Signup.jsx
import React from 'react';
import './signup.css';

const Signup = () => {
  return (
    <div className="signup-modal">
      <h2>Sign up</h2>
      <form className="signup-form">
        <label>
          Full Name
          <input type="text" placeholder="Enter your full name" required />
        </label>
        <label>
          Email
          <input type="email" placeholder="name@email.com" required />
        </label>
        <label>
          Password
          <input type="password" placeholder="Create password" required />
          <small>Between 8 and 72 characters</small>
        </label>
        <button type="submit" className="signup-button">Join for Free</button>
      </form>

      <div className="separator">
        <hr />
        <span>or</span>
        <hr />
      </div>

      <div className="social-login-buttons">
        <button className="social-button google">
          <span className="icon">
            {/* Google SVG icon */}
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


      <p className="already-user">
        Already a user? <a href="/login">Log in</a>
      </p>
    </div>
  );
};

export default Signup;
