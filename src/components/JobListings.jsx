import React, { useState, useEffect } from 'react';
import './JobListings.css';

const JobListings = () => {
  const [jobListings, setJobListings] = useState([]);
  const [newJob, setNewJob] = useState({
    title: '',
    description: '',
    expectedSalary: '',
    requiredSkills: '',
    company_id: '1'
  });
  const [editingJob, setEditingJob] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Fetch all job listings
  const fetchJobListings = async () => {
    try {
      const response = await fetch('http://localhost:5001/jobs');
      if (!response.ok) {
        throw new Error('Failed to fetch job listings');
      }
      const data = await response.json();
      setJobListings(data);
    } catch (err) {
      setError('Failed to load job listings');
      console.error('Error:', err);
    }
  };
  
  useEffect(() => {
    fetchJobListings();
  }, []);

  // Handle input change for new job form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // Convert salary to float if it's a valid number
    if (name === 'expectedSalary') {
      const floatValue = parseFloat(value) || '';
      setNewJob(prev => ({
        ...prev,
        [name]: floatValue
      }));
    } else {
      setNewJob(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  // Handle input change for edit form
  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    // Convert salary to float if it's a valid number
    if (name === 'expectedSalary') {
      const floatValue = parseFloat(value) || '';
      setEditingJob(prev => ({
        ...prev,
        [name]: floatValue
      }));
    } else {
      setEditingJob(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  // Add new job listing
  const addJobListing = async () => {
    try {
      const response = await fetch('http://localhost:5001/jobs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          job_title: newJob.title,
          job_description: newJob.description,
          expected_salary: parseFloat(newJob.expectedSalary),
          company_id: newJob.company_id
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create job listing');
      }

      const result = await response.json();
      setSuccessMessage('Job listing created successfully!');
      fetchJobListings();
      
      setNewJob({
        title: '',
        description: '',
        expectedSalary: '',
        requiredSkills: '',
        company_id: '1'
      });
    } catch (err) {
      setError('Failed to create job listing');
      console.error('Error:', err);
    }
  };

  // Delete job listing
  const deleteJobListing = async (jobId) => {
    try {
      const response = await fetch(`http://localhost:5001/jobs/${jobId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete job listing');
      }

      setSuccessMessage('Job listing deleted successfully!');
      fetchJobListings();
    } catch (err) {
      setError('Failed to delete job listing');
      console.error('Error:', err);
    }
  };

  // Open edit modal
  const openEditModal = (job) => {
    setEditingJob({
      id: job.job_id,
      title: job.job_title,
      description: job.job_description,
      expectedSalary: parseFloat(job.expected_salary),
      company_id: job.company_id
    });
    setShowEditModal(true);
  };

  // Update job listing
  const updateJobListing = async () => {
    try {
      const response = await fetch(`http://localhost:5001/jobs/${editingJob.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          job_title: editingJob.title,
          job_description: editingJob.description,
          expected_salary: parseFloat(editingJob.expectedSalary),
          company_id: editingJob.company_id
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update job listing');
      }

      setSuccessMessage('Job listing updated successfully!');
      setShowEditModal(false);
      setEditingJob(null);
      fetchJobListings();
    } catch (err) {
      setError('Failed to update job listing');
      console.error('Error:', err);
    }
  };

  // Format salary as currency
  const formatSalary = (salary) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(salary);
  };

  return (
    <div className="job-listings-container">
      <h2>Job Listings</h2>
      
      {error && <div className="error-message">{error}</div>}
      {successMessage && <div className="success-message">{successMessage}</div>}

      {/* New Job Form */}
      <div className="job-card">
        <div className="input-group">
          <label>Job Title:</label>
          <input
            type="text"
            name="title"
            value={newJob.title}
            onChange={handleInputChange}
            placeholder="Enter job title"
          />
        </div>
        <div className="input-group">
          <label>Job Description:</label>
          <input
            type="text"
            name="description"
            value={newJob.description}
            onChange={handleInputChange}
            placeholder="Enter job description"
          />
        </div>
        <div className="input-group">
          <label>Expected Salary:</label>
          <input
            type="number"
            step="0.01"
            name="expectedSalary"
            value={newJob.expectedSalary}
            onChange={handleInputChange}
            placeholder="Enter expected salary"
          />
        </div>
        <div className="input-group">
          <label>Required Skills:</label>
          <input
            type="text"
            name="requiredSkills"
            value={newJob.requiredSkills}
            onChange={handleInputChange}
            placeholder="Enter required skills"
          />
        </div>
        <button className="add-job-button" onClick={addJobListing}>
          Add Job Listing
        </button>
      </div>

      {/* Display job listings */}
      <div className="job-details-display">
        <h3>Current Job Listings:</h3>
        {jobListings.map((job) => (
          <div key={job.job_id} className="job-details">
            <p><strong>Job ID:</strong> {job.job_id}</p>
            <p><strong>Title:</strong> {job.job_title}</p>
            <p><strong>Description:</strong> {job.job_description}</p>
            <p><strong>Expected Salary:</strong> {formatSalary(job.expected_salary)}</p>
            <p><strong>Company:</strong> {job.company_name}</p>
            <div className="job-actions">
              <button 
                className="delete-button"
                onClick={() => deleteJobListing(job.job_id)}
              >
                Delete
              </button>
              <button 
                className="update-button"
                onClick={() => openEditModal(job)}
              >
                Update
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Modal */}
      {showEditModal && editingJob && (
        <div className="modal">
          <div className="modal-content">
            <h3>Edit Job Listing</h3>
            <div className="input-group">
              <label>Job Title:</label>
              <input
                type="text"
                name="title"
                value={editingJob.title}
                onChange={handleEditInputChange}
              />
            </div>
            <div className="input-group">
              <label>Job Description:</label>
              <input
                type="text"
                name="description"
                value={editingJob.description}
                onChange={handleEditInputChange}
              />
            </div>
            <div className="input-group">
              <label>Expected Salary:</label>
              <input
                type="number"
                step="0.01"
                name="expectedSalary"
                value={editingJob.expectedSalary}
                onChange={handleEditInputChange}
              />
            </div>
            <div className="modal-actions">
              <button onClick={updateJobListing} className="update-button">
                Save Changes
              </button>
              <button 
                onClick={() => {
                  setShowEditModal(false);
                  setEditingJob(null);
                }} 
                className="cancel-button"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobListings;