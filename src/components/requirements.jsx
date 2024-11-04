import React, { useState } from 'react';
import './requirements.css';

const Requirements = () => {
  const [requirements, setRequirements] = useState({
    performanceRating: "",
    projectRole: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRequirements((prevRequirements) => ({ ...prevRequirements, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you can handle the submission logic, e.g., sending the data to a server or logging it.
    console.log('Submitted Requirements:', requirements);
  };

  return (
    <div className="requirements-container">
      <h2>Requirements</h2>
      <form onSubmit={handleSubmit}>
        <div className="requirements-field">
          <label>Performance Rating:</label>
          <input
            type="text"
            name="performanceRating"
            value={requirements.performanceRating}
            onChange={handleChange}
            required
          />
        </div>
        <div className="requirements-field">
          <label>Project Role:</label>
          <input
            type="text"
            name="projectRole"
            value={requirements.projectRole}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Requirements;
