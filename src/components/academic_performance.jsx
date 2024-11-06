import React, { useState } from 'react';

const AcademicPerformance = ({ studentId }) => {
  const [formData, setFormData] = useState({
    gpa: '',
    credits_completed: '',
    programming_concepts_percentage: '',
    algorithms_concepts_percentage: '',
    software_engineering_percentage: '',
    computer_network_percentage: '',
    electronic_subjects_percentage: '',
    computer_architecture_percentage: '',
    mathematics_percentage: '',
    communication_skills_percentage: '',
    operating_systems_percentage: ''
  });

  const [status, setStatus] = useState({
    loading: false,
    error: null,
    success: false
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, error: null, success: false });

    try {
      const response = await fetch('/add-academic-performance', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          student_id: studentId,
          ...formData
        })
      });

      if (!response.ok) {
        throw new Error('Failed to submit academic performance');
      }

      setStatus({ loading: false, error: null, success: true });
      setFormData({
        gpa: '',
        credits_completed: '',
        programming_concepts_percentage: '',
        algorithms_concepts_percentage: '',
        software_engineering_percentage: '',
        computer_network_percentage: '',
        electronic_subjects_percentage: '',
        computer_architecture_percentage: '',
        mathematics_percentage: '',
        communication_skills_percentage: '',
        operating_systems_percentage: ''
      });
    } catch (error) {
      setStatus({ loading: false, error: error.message, success: false });
    }
  };

  return (
    <div className="additional-info-container">
      <h2>Academic Performance</h2>
      <form onSubmit={handleSubmit}>
        {Object.keys(formData).map((field) => (
          <div key={field} className="info-field">
            <label htmlFor={field}>
              {field.split('_').map(word => 
                word.charAt(0).toUpperCase() + word.slice(1)
              ).join(' ')}:
            </label>
            <input
              type="number"
              step="0.01"
              id={field}
              name={field}
              value={formData[field]}
              onChange={handleChange}
              required
            />
          </div>
        ))}

        {status.error && (
          <div className="submitted-data-box">
            <h3>Error</h3>
            <p>{status.error}</p>
          </div>
        )}

        {status.success && (
          <div className="submitted-data-box">
            <h3>Success</h3>
            <p>Academic performance submitted successfully!</p>
          </div>
        )}

        <div className="info-field">
          <button 
            type="submit" 
            disabled={status.loading}
            className="submitted-data-box button"
          >
            {status.loading ? 'Submitting...' : 'Submit'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AcademicPerformance;