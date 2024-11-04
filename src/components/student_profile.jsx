// components/StudentProfile.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './student_profile.css';

const StudentProfile = () => {
  const [profile, setProfile] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    studentID: 'S123456',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  const handleSave = () => {
    // This function could be extended to save data, for example, to a database
    alert("Profile information saved!");
  };

  return (
    <div className="student-profile-container">
      <h2>Student Profile</h2>
      <div className="profile-field">
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={profile.name}
          onChange={handleChange}
          placeholder="Enter your name"
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
        />
      </div>
      <div className="profile-field">
        <label>Student ID:</label>
        <input
          type="text"
          name="studentID"
          value={profile.studentID}
          onChange={handleChange}
          placeholder="Enter your student ID"
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
        />
      </div>
      <button onClick={handleSave} className="save-button">Save</button>

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
