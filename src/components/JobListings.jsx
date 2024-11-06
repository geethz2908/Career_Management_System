// components/JobListings.jsx
import React, { useState } from 'react';
import './JobListings.css'; // Create a CSS file for styling

const JobListings = () => {
  const [jobListings, setJobListings] = useState([
    { id: 'J001', title: 'Software Engineer', description: 'Develop and maintain software applications.', expectedSalary: '', requiredSkills: '' }
  ]);

  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const updatedJobListings = [...jobListings];
    updatedJobListings[index][name] = value;
    setJobListings(updatedJobListings);
  };

  const addJobListing = () => {
    setJobListings([
      ...jobListings,
      { id: `J00${jobListings.length + 1}`, title: '', description: '', expectedSalary: '', requiredSkills: '' }
    ]);
  };

  return (
    <div className="job-listings-container">
      <h2>Job Listings</h2>
      {jobListings.map((job, index) => (
        <div key={job.id} className="job-card">
          <div className="input-group">
            <label>Job ID:</label>
            <input
              type="text"
              name="id"
              value={job.id}
              onChange={(e) => handleInputChange(e, index)}
              readOnly
            />
          </div>
          <div className="input-group">
            <label>Job Title:</label>
            <input
              type="text"
              name="title"
              value={job.title}
              onChange={(e) => handleInputChange(e, index)}
              placeholder="Enter job title"
            />
          </div>
          <div className="input-group">
            <label>Job Description:</label>
            <input
              type="text"
              name="description"
              value={job.description}
              onChange={(e) => handleInputChange(e, index)}
              placeholder="Enter job description"
            />
          </div>
          <div className="input-group">
            <label>Salary Range:</label>
            <input
              type="text"
              name="expectedSalary"
              value={job.expectedSalary}
              onChange={(e) => handleInputChange(e, index)}
              placeholder="Enter salary range"
            />
          </div>
          <div className="input-group">
            <label>Required Skills:</label>
            <input
              type="text"
              name="requiredSkills"
              value={job.requiredSkills}
              onChange={(e) => handleInputChange(e, index)}
              placeholder="Enter required skills"
            />
          </div>
        </div>
      ))}
      <button className="add-job-button" onClick={addJobListing}>Add Job Listing</button>
      
      {/* Display job details below the button */}
      <div className="job-details-display">
        <h3>Job Listings:</h3>
        {jobListings.map((job, index) => (
          <div key={job.id} className="job-details">
            <p><strong>Job ID:</strong> {job.id}</p>
            <p><strong>Title:</strong> {job.title}</p>
            <p><strong>Description:</strong> {job.description}</p>
            <p><strong>Salary Range:</strong> {job.expectedSalary}</p>
            <p><strong>Required Skills:</strong> {job.requiredSkills}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobListings;
