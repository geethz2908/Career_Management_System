import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import './CompanyManagement.css';

// Company Update Component
export const UpdateCompany = () => {
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
        const response = await fetch(`/api/companies/${id}`);
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
      const response = await fetch(`/api/companies/${id}`, {
        method: 'PUT',
        body: formData,
      });
      if (!response.ok) throw new Error('Failed to update company');
      navigate('/dashboard-company');
    } catch (err) {
      setError('Failed to update company');
    }
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="update-company-container">
      <h2>Update Company</h2>
      <form onSubmit={handleSubmit} className="update-form">
        <div className="form-group">
          <label>Company Name</label>
          <input
            type="text"
            value={company.companyName}
            onChange={(e) => setCompany({ ...company, companyName: e.target.value })}
            required
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label>Industry</label>
          <input
            type="text"
            value={company.industry}
            onChange={(e) => setCompany({ ...company, industry: e.target.value })}
            required
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label>Description</label>
          <textarea
            value={company.companyDescription}
            onChange={(e) => setCompany({ ...company, companyDescription: e.target.value })}
            required
            className="form-textarea"
          />
        </div>
        <div className="form-group">
          <label>Company Image</label>
          <input
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
            accept="image/*"
            className="form-input"
          />
        </div>
        <button type="submit" className="submit-button">Update Company</button>
      </form>
    </div>
  );
};

// Delete Confirmation Modal Component
const DeleteModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>Confirm Deletion</h3>
        <p>Are you sure you want to delete this company? This action cannot be undone.</p>
        <div className="modal-buttons">
          <button onClick={onClose} className="cancel-button">Cancel</button>
          <button onClick={onConfirm} className="delete-button">Delete</button>
        </div>
      </div>
    </div>
  );
};

// Company Delete Component
export const DeleteCompany = ({ companyId, onDelete }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDelete = async () => {
    try {
      const response = await fetch(`/api/companies/${companyId}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to delete company');
      onDelete();
      setIsModalOpen(false);
    } catch (err) {
      console.error('Error deleting company:', err);
    }
  };

  return (
    <>
      <button 
        onClick={() => setIsModalOpen(true)} 
        className="delete-button"
      >
        Delete Company
      </button>
      <DeleteModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleDelete}
      />
    </>
  );
};

// Enhanced Company Dashboard
export const DashboardCompany = () => {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchCompanies();
  }, []);

  const fetchCompanies = async () => {
    try {
      const response = await fetch('/api/companies');
      if (!response.ok) throw new Error('Failed to fetch companies');
      const data = await response.json();
      setCompanies(data);
      setLoading(false);
    } catch (err) {
      setError('Failed to load companies');
      setLoading(false);
    }
  };

  const handleDelete = () => {
    fetchCompanies();
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h2>Company Dashboard</h2>
      </div>
      
      <div className="dashboard-content">
        <div className="quick-links">
          <h3>Quick Links</h3>
          <div className="links-container">
            <Link to="/CompanyInfo" className="dashboard-link">Company Info</Link>
            <Link to="/JobListings" className="dashboard-link">Job Listings</Link>
          </div>
        </div>
        
        <div className="companies-list">
          <h3>Companies</h3>
          {companies.map((company) => (
            <div key={company.company_id} className="company-card">
              <div className="company-info">
                <h4>{company.company_name}</h4>
                <p>{company.industry}</p>
              </div>
              <div className="company-actions">
                <Link 
                  to={`/update-company/${company.company_id}`} 
                  className="edit-button"
                >
                  Edit
                </Link>
                <DeleteCompany 
                  companyId={company.company_id} 
                  onDelete={handleDelete}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardCompany;