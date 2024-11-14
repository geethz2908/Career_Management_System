import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Job.css';

const Job = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch('http://localhost:5001/jobs');
        if (!response.ok) {
          throw new Error('Failed to fetch jobs');
        }
        const data = await response.json();
        setJobs(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load job listings. Please try again later.');
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  if (loading) {
    return (
      <div className="job-container">
        <h2>Job Listings</h2>
        <div className="job-card">Loading job listings...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="job-container">
        <h2>Job Listings</h2>
        <div className="job-card">{error}</div>
      </div>
    );
  }

  return (
    <div className="job-container">
      <h2>Job Listings</h2>
      {jobs.length === 0 ? (
        <div className="job-card">No job listings available.</div>
      ) : (
        jobs.map((job) => (
          <div key={job.job_id} className="job-card">
            <div className="job-info">
              <label>Job ID:</label>
              <p>{job.job_id}</p>
            </div>
            <div className="job-info">
              <label>Job Title:</label>
              <p>{job.job_title}</p>
            </div>
            <div className="job-info">
              <label>Company:</label>
              <p>{job.company_name}</p>
            </div>
            <div className="job-info">
              <label>Description:</label>
              <p>{job.job_description}</p>
            </div>
            <div className="job-info">
              <label>Expected Salary:</label>
              <p>${job.expected_salary?.toLocaleString() || 'Not specified'}</p>
            </div>
          </div>
        ))
      )}
      <div className="companies-link">
        <Link to="/Companies">Companies</Link>
      </div>
    </div>
  );
};

export default Job;