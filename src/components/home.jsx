// components/Home.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom'; // To enable navigation
import './home.css';

// Import images
import feature1Image from './feature1.jpeg'; // Adjust the path as necessary
import feature2Image from './feature2.jpeg'; // Adjust the path as necessary
import feature3Image from './feature3.jpeg'; // Adjust the path as necessary

const Home = () => {
  const navigate = useNavigate(); // Initialize navigate function

  // Feature list with images
  const features = [
    { 
      title: "Goal Tracking and Skill Development Hub", 
      description: "Allows users to set and track career goals and provides curated resources for skill-building.", 
      image: feature1Image // Use imported image
    },
    { 
      title: "Job Search and Application Tools", 
      description: "Notifications for relevant job openings based on the user’s interests and location.", 
      image: feature2Image // Use imported image
    },
    { 
      title: "Career Path Visualization", 
      description: "Allow users to create and visualize their career path with milestones, skills, and goals.", 
      image: feature3Image // Use imported image
    }
  ];

  const handleGetStarted = () => {
    navigate('/login'); // Redirect to login page
  };

  return (
    <div className="home-container">
      <div className="hero">
        <div className="caption">Welcome to PathForge</div>
        <button className="cta-button" onClick={handleGetStarted}>Get Started</button>
      </div>
      <main>
        <div className="features">
          {features.map((feature, index) => (
            <div className="feature" key={index}>
              <img src={feature.image} alt={feature.title} className="feature-image" />
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </main>
      <footer>
        <p>&copy; 2024 PathForge. All rights reserved.</p>
        <a href="#privacy">Privacy Policy</a>
        <a href="#terms">Terms of Service</a>
      </footer>
    </div>
  );
};

export default Home;
