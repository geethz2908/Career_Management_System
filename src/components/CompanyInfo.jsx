// components/CompanyInfo.jsx
import React, { useState } from 'react';
import './companyInfo.css';

const CompanyInfo = () => {
  const [companyDetails, setCompanyDetails] = useState({
    companyId: '',
    companyName: '',
    industry: '',
    companyDescription: '',
    companyImage: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCompanyDetails({
      ...companyDetails,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    setCompanyDetails({
      ...companyDetails,
      companyImage: e.target.files[0],
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logic to save the company details (e.g., sending data to a server)
    console.log(companyDetails);
  };

  return (
    <div className="company-info-container">
      <h1>Company Information</h1>
      <form onSubmit={handleSubmit} className="company-info-form">
        <div className="form-group">
          <label htmlFor="companyId">Company ID:</label>
          <input
            type="text"
            id="companyId"
            name="companyId"
            value={companyDetails.companyId}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="companyName">Company Name:</label>
          <input
            type="text"
            id="companyName"
            name="companyName"
            value={companyDetails.companyName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="industry">Industry:</label>
          <input
            type="text"
            id="industry"
            name="industry"
            value={companyDetails.industry}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="companyDescription">Company Description:</label>
          <textarea
            id="companyDescription"
            name="companyDescription"
            value={companyDetails.companyDescription}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="companyImage">Company Image:</label>
          <input
            type="file"
            id="companyImage"
            name="companyImage"
            onChange={handleImageChange}
            required
          />
        </div>
        <button type="submit" className="submit-btn">Submit</button>
      </form>

      {companyDetails.companyName && (
        <div className="company-details-display">
          <h2>Company Details</h2>
          <div className="company-info-box">
            <img
              src={companyDetails.companyImage ? URL.createObjectURL(companyDetails.companyImage) : ''}
              alt={companyDetails.companyName}
              className="company-image"
            />
            <div className="company-info-text">
              <p><strong>Company ID:</strong> {companyDetails.companyId}</p>
              <p><strong>Company Name:</strong> {companyDetails.companyName}</p>
              <p><strong>Industry:</strong> {companyDetails.industry}</p>
              <p><strong>Description:</strong> {companyDetails.companyDescription}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CompanyInfo;
