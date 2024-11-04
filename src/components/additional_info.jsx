import React, { useState } from 'react';
import { FaClock, FaBrain, FaTrophy, FaMicrophone, FaBook, FaBriefcase, FaChalkboardTeacher } from 'react-icons/fa';
import './additional_info.css';

const AdditionalInfo = () => {
  const [info, setInfo] = useState({
    workingHours: 8,
    logicalQuotient: "High",
    hackathons: "Participated",
    publicSpeaking: "Yes",
    subjects: "AI, Data Science",
    careerArea: "Research and Development",
    workshops: "Yes",
  });

  const [submittedData, setSubmittedData] = useState(null); // State to store submitted data

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInfo((prevInfo) => ({ ...prevInfo, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission
    setSubmittedData(info); // Store the current info in submittedData
  };

  const handleClear = () => {
    setSubmittedData(null); // Clear the stored data
  };

  return (
    <div className="additional-info-container">
      <h2>Additional Information</h2>
      <form onSubmit={handleSubmit}>
        <div className="info-field">
          <label><FaClock /> Hours Working Per Day:</label>
          <input
            type="number"
            name="workingHours"
            value={info.workingHours}
            onChange={handleChange}
          />
        </div>
        <div className="info-field">
          <label><FaBrain /> Logical Quotient Rating:</label>
          <input
            type="text"
            name="logicalQuotient"
            value={info.logicalQuotient}
            onChange={handleChange}
          />
        </div>
        <div className="info-field">
          <label><FaTrophy /> Hackathons:</label>
          <input
            type="text"
            name="hackathons"
            value={info.hackathons}
            onChange={handleChange}
          />
        </div>
        <div className="info-field">
          <label><FaMicrophone /> Public Speaking:</label>
          <input
            type="text"
            name="publicSpeaking"
            value={info.publicSpeaking}
            onChange={handleChange}
          />
        </div>
        <div className="info-field">
          <label><FaBook /> Interested Subjects:</label>
          <input
            type="text"
            name="subjects"
            value={info.subjects}
            onChange={handleChange}
          />
        </div>
        <div className="info-field">
          <label><FaBriefcase /> Interested Career Area:</label>
          <input
            type="text"
            name="careerArea"
            value={info.careerArea}
            onChange={handleChange}
          />
        </div>
        <div className="info-field">
          <label><FaChalkboardTeacher /> Workshops:</label>
          <input
            type="text"
            name="workshops"
            value={info.workshops}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Submit</button>
      </form>

      {/* Display submitted data */}
      {submittedData && (
        <div className="submitted-data-box">
          <h3>Stored Data:</h3>
          <pre>{JSON.stringify(submittedData, null, 2)}</pre>
          <button onClick={handleClear}>Clear Data</button>
        </div>
      )}
    </div>
  );
};

export default AdditionalInfo;