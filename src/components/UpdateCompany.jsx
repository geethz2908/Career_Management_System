import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './updateCompany.css';  // Ensure the correct import

const UpdateCompany = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [company, setCompany] = useState({
    companyName: '',
    industry: '',
    companyDescription: '',
  });
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCompany = async () => {
      try {
        const response = await fetch(`http://localhost:5001/companies/${id}`);
        if (!response.ok) throw new Error('Company not found');
        const data = await response.json();
        setCompany({
          companyName: data.company_name,
          industry: data.industry,
          companyDescription: data.company_description,
        });
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch company details');
        setLoading(false);
      }
    };
    fetchCompany();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('companyName', company.companyName);
    formData.append('industry', company.industry);
    formData.append('companyDescription', company.companyDescription);
    if (image) formData.append('companyImage', image);

    try {
      const response = await fetch(`http://localhost:5001/companies/${id}`, {
        method: 'PUT',
        body: formData,
      });
      if (!response.ok) throw new Error('Failed to update company');
      navigate('/dashboardCompany');
    } catch (err) {
      setError('Failed to update company');
    }
  };

  if (loading) return (
    <div className="loading-container">
      <span>Loading...</span>
    </div>
  );

  if (error) return (
    <div className="error-container">
      <span>{error}</span>
    </div>
  );

  return (
    <div className="company-info-container">
      <h1>Update Company Information</h1>
      <form onSubmit={handleSubmit} className="company-info-form">
        <div className="form-group">
          <label>Company Name</label>
          <input
            type="text"
            value={company.companyName}
            onChange={(e) => setCompany({ ...company, companyName: e.target.value })}
            required
          />
        </div>

        <div className="form-group">
          <label>Industry</label>
          <input
            type="text"
            value={company.industry}
            onChange={(e) => setCompany({ ...company, industry: e.target.value })}
            required
          />
        </div>

        <div className="form-group">
          <label>Description</label>
          <textarea
            value={company.companyDescription}
            onChange={(e) => setCompany({ ...company, companyDescription: e.target.value })}
            required
          />
        </div>

        <div className="form-group">
          <label>Company Image</label>
          <input
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
            accept="image/*"
          />
        </div>

        <button type="submit" className="submit-btn">
          Update Company
        </button>
      </form>

      {/* Table to display company information */}
      <div className="company-details-display">
        <table className="company-info-table">
          <thead>
            <tr>
              <th>Attribute</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Company Name</td>
              <td>{company.companyName}</td>
            </tr>
            <tr>
              <td>Industry</td>
              <td>{company.industry}</td>
            </tr>
            <tr>
              <td>Description</td>
              <td>{company.companyDescription}</td>
            </tr>
            {image && (
              <tr>
                <td>Company Image</td>
                <td>
                  <img
                    src={URL.createObjectURL(image)}
                    alt="Company"
                    className="company-image"
                  />
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UpdateCompany;