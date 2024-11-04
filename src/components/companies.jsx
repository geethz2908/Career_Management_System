// components/Companies.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './companies.css';

const Companies = () => {
  const [companies, setCompanies] = useState([
    { id: 'C001', name: 'TechCorp', industry: 'Technology' }
  ]);

  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const updatedCompanies = [...companies];
    updatedCompanies[index][name] = value;
    setCompanies(updatedCompanies);
  };

  const addCompany = () => {
    setCompanies([
      ...companies,
      { id: `C00${companies.length + 1}`, name: '', industry: '' }
    ]);
  };

  return (
    <div className="companies-container">
      <h2>Companies</h2>
      {companies.map((company, index) => (
        <div key={company.id} className="company-card">
          <div className="input-group">
            <label>Company ID:</label>
            <input
              type="text"
              name="id"
              value={company.id}
              onChange={(e) => handleInputChange(e, index)}
              readOnly
            />
          </div>
          <div className="input-group">
            <label>Company Name:</label>
            <input
              type="text"
              name="name"
              value={company.name}
              onChange={(e) => handleInputChange(e, index)}
              placeholder="Enter company name"
            />
          </div>
          <div className="input-group">
            <label>Industry:</label>
            <input
              type="text"
              name="industry"
              value={company.industry}
              onChange={(e) => handleInputChange(e, index)}
              placeholder="Enter industry"
            />
          </div>
        </div>
      ))}
      <button className="add-company-button" onClick={addCompany}>Add Company</button>
      <div className="job-listings-link">
        <Link to="/JobListings">Job Listings</Link>
      </div>
    </div>
  );
};

export default Companies;
