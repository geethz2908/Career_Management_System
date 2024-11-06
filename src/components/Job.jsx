// components/Job.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Job.css';

const Job = () => {
  // Sample data for jobs
  const [jobs, setJobs] = useState([
    {
      jobid: 'J001',
      jobtitle: 'Software Engineer',
      jobdescription: 'Develop and maintain software applications.',
      salaryrange: '60,000 - 80,000 USD',
      requiredskills: 'JavaScript, React, Node.js, MongoDB'
    },
    {
      jobid: 'J002',
      jobtitle: 'Data Scientist',
      jobdescription: 'Analyze and interpret complex data to help companies make decisions.',
      salaryrange: '70,000 - 100,000 USD',
      requiredskills: 'Python, Machine Learning, SQL, Pandas'
    },
    {
      jobid: 'J003',
      jobtitle: 'Product Manager',
      jobdescription: 'Oversee the development and marketing of products.',
      salaryrange: '80,000 - 110,000 USD',
      requiredskills: 'Leadership, Market Research, Agile, Communication'
    }
  ]);

  useEffect(() => {
    // Simulating a fetch call to get job data
    // Replace this with actual logic to fetch job data if needed
    // Using static data here for now
  }, []);

  return (
    <div className="job-container">
      <h2>Job Listings</h2>
      {jobs && jobs.map((job) => (
        <div key={job.jobid} className="job-card">
          <div className="job-info">
            <label>Job ID:</label>
            <p>{job.jobid}</p>
          </div>
          <div className="job-info">
            <label>Job Title:</label>
            <p>{job.jobtitle}</p>
          </div>
          <div className="job-info">
            <label>Job Description:</label>
            <p>{job.jobdescription}</p>
          </div>
          <div className="job-info">
            <label>Salary Range:</label>
            <p>{job.salaryrange}</p>
          </div>
          <div className="job-info">
            <label>Required Skills:</label>
            <p>{job.requiredskills}</p>
          </div>
        </div>
      ))}
      <div className="companies-link">
        <Link to="/Companies">Companies</Link>
      </div>
    </div>
  );
};

export default Job;
