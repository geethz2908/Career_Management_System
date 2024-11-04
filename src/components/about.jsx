// components/About.jsx
import React from 'react';
import './about.css';
import aboutImg from './about_img.png';

const About = () => {
  return (
    <div className="about-container">
      <h1>PathForge: Your Career Companion for Success</h1>
      <img src={aboutImg} alt="Career Management System" className="about-image" />
      
      <p className="about-text">
        PathForge is a career management system designed to guide students on their journey from education to employment. 
        It offers a structured approach to career planning, helping students set career goals, track progress, and build a 
        strong foundation for future success.
      </p>
      
      <div className="features-section">
        <h2>Key Features for Students</h2>
        <ul className="feature-list">
          <li><strong>Career Path Discovery:</strong> PathForge provides a glimpse into various career paths based on student's 
              academic interests and skills, helping them explore roles and industries they may not have considered before.</li>
          <li><strong>Goal Setting and Academic Alignment:</strong> Students can set both short-term and long-term career goals, 
              with step-by-step milestones that align with their academic progress, internships, and extracurricular activities.</li>
          <li><strong>Progress Tracking and Analytics:</strong> PathForge enables students to track their progress over time, 
              visualizing growth in skills and achievements that can be highlighted in their résumés and applications.</li>
        </ul>
      </div>
      
      <div className="contact-details">
        <h2>Contact Us</h2>
        <p>If you have any questions or need further information, feel free to reach out to us:</p>
        <p>Email: <a href="mailto:support@pathforge.com">support@pathforge.com</a></p>
        <p>Phone: +91 9876543210</p>
        
        <div className="social-icons">
          <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
            <i className="fab fa-instagram"></i>
          </a>
          <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
            <i className="fab fa-twitter"></i>
          </a>
          <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <i className="fab fa-linkedin"></i>
          </a>
          <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
            <i className="fab fa-facebook"></i>
          </a>
        </div>
      </div>
    </div>
  );
};

export default About;
