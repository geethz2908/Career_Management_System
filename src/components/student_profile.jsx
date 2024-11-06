import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './student_profile.css';

const StudentProfile = () => {
  const [profile, setProfile] = useState({
    student_name: '',
    email: '',
    student_id: '',
    password: '',
    gender: ''
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
    // Clear previous error/success messages when user starts typing
    setError('');
    setSuccess('');
  };

  const validateForm = () => {
    // Student ID validation (assuming it should be alphanumeric)
    if (!/^[A-Za-z0-9]+$/.test(profile.student_id)) {
      setError('Student ID should only contain letters and numbers');
      return false;
    }

    // Name validation
    if (profile.student_name.length < 2) {
      setError('Name should be at least 2 characters long');
      return false;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(profile.email)) {
      setError('Please enter a valid email address');
      return false;
    }

    // Password validation (at least 6 characters)
    if (profile.password.length < 6) {
      setError('Password should be at least 6 characters long');
      return false;
    }

    // Gender validation
    if (!profile.gender) {
      setError('Please select a gender');
      return false;
    }

    return true;
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setIsLoading(true);

    if (!validateForm()) {
      setIsLoading(false);
      return;
    }

    try {
      const response = await axios.post('http://localhost:5001/add-student', profile);
      
      if (response.data) {
        setSuccess('Profile saved successfully! ✅');
        alert('Profile saved successfully! ✅');
        // Clear form after successful save
        setProfile({
          student_name: '',
          email: '',
          student_id: '',
          password: '',
          gender: ''
        });
        
        // Show success message for 3 seconds
        setTimeout(() => {
          setSuccess('');
        }, 3000);
      }
    } catch (err) {
      let errorMessage = 'An error occurred while saving the profile';
      
      if (err.response?.data) {
        // Handle specific backend errors
        if (err.response.data.includes('Duplicate entry')) {
          errorMessage = 'This Student ID or Email is already registered';
          alert(errorMessage);
        } else {
          errorMessage = err.response.data;
          alert(errorMessage);
        }
      }
      
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="student-profile-container">
      <h2>Student Profile</h2>
      
      {error && (
        <div className="error-message" role="alert">
          ❌ {error}
        </div>
      )}
      {success && (
        <div className="success-message" role="alert">
          {success}
        </div>
      )}

      <form onSubmit={handleSave}>
        <div className="profile-field">
          <label>Name:</label>
          <input
            type="text"
            name="student_name"
            value={profile.student_name}
            onChange={handleChange}
            placeholder="Enter your name"
            required
            minLength="2"
          />
        </div>
        <div className="profile-field">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={profile.email}
            onChange={handleChange}
            placeholder="Enter your email"
            required
          />
        </div>
        <div className="profile-field">
          <label>Student ID:</label>
          <input
            type="text"
            name="student_id"
            value={profile.student_id}
            onChange={handleChange}
            placeholder="Enter your student ID"
            required
            pattern="[A-Za-z0-9]+"
          />
        </div>
        <div className="profile-field">
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={profile.password}
            onChange={handleChange}
            placeholder="Enter your password"
            required
            minLength="6"
          />
        </div>
        <div className="profile-field">
          <label>Gender:</label>
          <select
            name="gender" className='gender-select'
            value={profile.gender}
            onChange={handleChange}
            required
          >
            <option value="">Select Gender</option>
            <option value="M">Male</option>
            <option value="F">Female</option>
            <option value="O">Other</option>
          </select>
        </div>
        <button 
          type="submit" 
          className="save-button" 
          disabled={isLoading}
        >
          {isLoading ? 'Saving...' : 'Save'}
        </button>
      </form>

      <div className="section-title">Quick Links</div>
      <ul className="profile-links">
        <li><Link to="/companies">Companies</Link></li>
        <li><Link to="/skills">Skills</Link></li>
        <li><Link to="/additional_info">Additional Info</Link></li>
        <li><Link to="/projects">Projects</Link></li>
        <li><Link to="/academic_performance">Academic Performance</Link></li>
        <li><Link to="/requirements">Add Requirements</Link></li>
      </ul>
    </div>
  );
};

export default StudentProfile;