import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CompanyInfo.css'

const CompanyInfo = () => {
  const navigate = useNavigate();
  const [companyDetails, setCompanyDetails] = useState({
    companyId: '',
    companyName: '',
    industry: '',
    companyDescription: '',
    companyImage: null
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCompanyDetails(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCompanyDetails(prev => ({
        ...prev,
        companyImage: file
      }));
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const formData = new FormData();
      formData.append('companyId', companyDetails.companyId);
      formData.append('companyName', companyDetails.companyName);
      formData.append('industry', companyDetails.industry);
      formData.append('companyDescription', companyDetails.companyDescription);
      if (companyDetails.companyImage) {
        formData.append('companyImage', companyDetails.companyImage);
      }

      const response = await fetch('http://localhost:5001/companies', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Error submitting company information');
      }

      const data = await response.json();
      setSubmitSuccess(true);
      
      // Clear form after successful submission
      setTimeout(() => {
        setCompanyDetails({
          companyId: '',
          companyName: '',
          industry: '',
          companyDescription: '',
          companyImage: null
        });
        setImagePreview(null);
        setSubmitSuccess(false);
        navigate('/JobListings'); // Redirect to companies list
      }, 2000);

    } catch (err) {
      setError(err.message || 'Error submitting form');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="company-info-container">
      <h1>Company Information</h1>
      
      {error && (
        <div className="error-message" style={{ color: 'red', marginBottom: '1rem' }}>
          {error}
        </div>
      )}
      
      {submitSuccess && (
        <div className="success-message" style={{ color: 'green', marginBottom: '1rem' }}>
          Company information submitted successfully!
        </div>
      )}

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
            disabled={isSubmitting}
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
            disabled={isSubmitting}
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
            disabled={isSubmitting}
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
            disabled={isSubmitting}
          ></textarea>
        </div>

        <div className="form-group">
          <label htmlFor="companyImage">Company Image:</label>
          <input
            type="file"
            id="companyImage"
            name="companyImage"
            onChange={handleImageChange}
            accept="image/*"
            disabled={isSubmitting}
          />
        </div>

        <button 
          type="submit" 
          className="submit-btn" 
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Submitting...' : 'Submit'}
        </button>
      </form>

      {(imagePreview || companyDetails.companyName) && (
        <div className="company-details-display">
          <h2>Company Details Preview</h2>
          <div className="company-info-box">
            {imagePreview && (
              <img
                src={imagePreview}
                alt={companyDetails.companyName || 'Company preview'}
                className="company-image"
              />
            )}
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