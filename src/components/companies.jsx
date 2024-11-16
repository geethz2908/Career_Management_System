import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './companies.css';

const Companies = () => {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCompanies();
  }, []);

  const fetchCompanies = async () => {
    setLoading(true);
    try {
      console.log('Fetching companies...');
      const response = await fetch('http://localhost:5001/companies', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          // Add any required headers here
        },
      });

      console.log('Response status:', response.status);
      
      if (!response.ok) {
        const errorData = await response.text();
        console.error('Error response:', errorData);
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Received data:', data);

      if (!Array.isArray(data)) {
        console.error('Received non-array data:', data);
        throw new Error('Invalid data format received');
      }

      setCompanies(data);
      setError(null);
    } catch (err) {
      console.error('Fetch error:', err);
      setError(`Failed to fetch companies: ${err.message}`);
      setCompanies([]);
    } finally {
      setLoading(false);
    }
  };

  // Function to retry fetching
  const retryFetch = () => {
    setError(null);
    fetchCompanies();
  };

  if (loading) {
    return (
      <div className="companies-container">
        <div className="loading">
          <h2>Loading companies...</h2>
          <p>Connecting to server at http://localhost:5001</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="companies-container">
        <div className="error">
          <h2>Error Loading Companies</h2>
          <p>{error}</p>
          <button onClick={retryFetch} className="retry-btn">
            Retry Loading
          </button>
          <div className="debug-info">
            <p>Debug Information:</p>
            <ul>
              <li>Server URL: http://localhost:5001/companies</li>
              <li>Request Type: GET</li>
              <li>Current Time: {new Date().toLocaleString()}</li>
            </ul>
          </div>
        </div>
        <div className="job-listings-link">
          <Link to="/company-info">Add New Company</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="companies-container">
      <h2>Companies ({companies.length})</h2>
      
      {companies.length === 0 ? (
        <div className="company-card">
          <p>No companies found. Add your first company!</p>
        </div>
      ) : (
        companies.map((company) => (
          <div key={company.company_id} className="company-card">
            <div className="company-info">
              <label>Company ID:</label>
              <p>{company.company_id}</p>
            </div>
            
            <div className="company-info">
              <label>Company Name:</label>
              <p>{company.company_name}</p>
            </div>
            
            <div className="company-info">
              <label>Industry:</label>
              <p>{company.industry}</p>
            </div>
            
            {company.company_description && (
              <div className="company-info">
                <label>Description:</label>
                <p>{company.company_description}</p>
              </div>
            )}
            
            {company.image_path && (
              <div className="company-info">
                <label>Company Image:</label>
                <img
                  src={`http://localhost:5001${company.image_path}`}
                  alt={company.company_name}
                  onError={(e) => {
                    console.log('Image load error:', e);
                    e.target.onerror = null;
                    e.target.src = '/placeholder-image.png';
                  }}
                />
              </div>
            )}
          </div>
        ))
      )}

      <div className="action-links">
        <Link to="/company-info" className="add-company-btn">
          Add New Company
        </Link>
      </div>
    </div>
  );
};

export default Companies;