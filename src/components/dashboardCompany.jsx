// components/DashboardCompany.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './dashboardCompany.css';

const DashboardCompany = () => {
  return (
    <div className="dashboard-company-container">
      <h1>Company Dashboard</h1>
      <div className="dashboard-company-links">
        <div className="dashboard-company-box">
          <Link to="/CompanyInfo">Company Info</Link>
        </div>
        <div className="dashboard-company-box">
          <Link to="/JobListings">Job Listings</Link>
        </div>
      </div>
    </div>
  );
};

export default DashboardCompany;
