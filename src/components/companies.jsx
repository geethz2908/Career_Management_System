import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Companies = () => {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await fetch('http://localhost:5001/companies');
        if (!response.ok) {
          throw new Error('Failed to fetch companies');
        }
        const data = await response.json();
        setCompanies(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCompanies();
  }, []);

  if (loading) {
    return (
      <div className="company-info-container">
        <h1>Loading companies...</h1>
      </div>
    );
  }

  if (error) {
    return (
      <div className="company-info-container">
        <h1>Error: {error}</h1>
      </div>
    );
  }

  return (
    <div className="company-info-container">
      <h1>Companies</h1>
      {companies.map((company) => (
        <div key={company.company_id} className="company-info-box">
          {company.image_path && (
            <img
              className="company-image"
              src={`http://localhost:5001${company.image_path}`}
              alt={company.company_name}
            />
          )}
          <div className="company-info-text">
            <div className="form-group">
              <label>Company ID:</label>
              <p>{company.company_id}</p>
            </div>
            <div className="form-group">
              <label>Company Name:</label>
              <p>{company.company_name}</p>
            </div>
            <div className="form-group">
              <label>Industry:</label>
              <p>{company.industry}</p>
            </div>
            {company.company_description && (
              <div className="form-group">
                <label>Description:</label>
                <p>{company.company_description}</p>
              </div>
            )}
          </div>
        </div>
      ))}
      <div className="job-listings-link">
        <Link to="/job">View Job Listings</Link>
      </div>
    </div>
  );
};

export default Companies;