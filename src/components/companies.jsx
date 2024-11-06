// components/Companies.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './companies.css';

const Companies = () => {
  // Sample data for companies
  const [companies, setCompanies] = useState([
    { id: 'C001', name: 'TechCorp', industry: 'Technology' },
  ]);

  useEffect(() => {
    // Simulating a fetch call to get company data
    // Here you can replace this with actual logic to fetch company data if needed
    // For now, using static data in the state
  }, []);

  return (
    <div className="companies-container">
      <h2>Companies</h2>
      {companies.map((company) => (
        <div key={company.id} className="company-card">
          <div className="company-info">
            <label>Company ID:</label>
            <p>{company.id}</p>
          </div>
          <div className="company-info">
            <label>Company Name:</label>
            <p>{company.name}</p>
          </div>
          <div className="company-info">
            <label>Industry:</label>
            <p>{company.industry}</p>
          </div>
        </div>
      ))}
      <div className="job-listings-link">
        <Link to="/job">Job Listings</Link>
      </div>
    </div>
  );
};

export default Companies;
