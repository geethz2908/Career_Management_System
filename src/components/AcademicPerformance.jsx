// components/AcademicPerformance.jsx
import React, { useState } from 'react';
import './AcademicPerformance.css';

const AcademicPerformance = () => {
  const [gpa, setGpa] = useState('');
  const [creditsCompleted, setCreditsCompleted] = useState('');
  const [programmingConceptsPercentage, setProgrammingConceptsPercentage] = useState('');
  const [algorithmsConceptsPercentage, setAlgorithmsConceptsPercentage] = useState('');
  const [softwareEngineeringPercentage, setSoftwareEngineeringPercentage] = useState('');
  const [computerNetworksPercentage, setComputerNetworksPercentage] = useState('');
  const [electronicsSubjectsPercentage, setElectronicsSubjectsPercentage] = useState('');
  const [computerArchitecturePercentage, setComputerArchitecturePercentage] = useState('');
  const [mathematicsPercentage, setMathematicsPercentage] = useState('');
  const [communicationSkillsProjects, setCommunicationSkillsProjects] = useState('');
  const [operatingSystemsPercentage, setOperatingSystemsPercentage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({
      gpa,
      creditsCompleted,
      programmingConceptsPercentage,
      algorithmsConceptsPercentage,
      softwareEngineeringPercentage,
      computerNetworksPercentage,
      electronicsSubjectsPercentage,
      computerArchitecturePercentage,
      mathematicsPercentage,
      communicationSkillsProjects,
      operatingSystemsPercentage,
    });
  };

  return (
    <div className="academic-performance">
      <h2 className="title">Academic Performance</h2>
      <form className="form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="label">GPA:</label>
          <input
            className="input"
            type="number"
            value={gpa}
            onChange={(e) => setGpa(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label className="label">Credits Completed:</label>
          <input
            className="input"
            type="number"
            value={creditsCompleted}
            onChange={(e) => setCreditsCompleted(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label className="label">Programming Concepts Percentage:</label>
          <input
            className="input"
            type="number"
            value={programmingConceptsPercentage}
            onChange={(e) => setProgrammingConceptsPercentage(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label className="label">Algorithms Concepts Percentage:</label>
          <input
            className="input"
            type="number"
            value={algorithmsConceptsPercentage}
            onChange={(e) => setAlgorithmsConceptsPercentage(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label className="label">Software Engineering Percentage:</label>
          <input
            className="input"
            type="number"
            value={softwareEngineeringPercentage}
            onChange={(e) => setSoftwareEngineeringPercentage(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label className="label">Computer Networks Percentage:</label>
          <input
            className="input"
            type="number"
            value={computerNetworksPercentage}
            onChange={(e) => setComputerNetworksPercentage(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label className="label">Electronics Subjects Percentage:</label>
          <input
            className="input"
            type="number"
            value={electronicsSubjectsPercentage}
            onChange={(e) => setElectronicsSubjectsPercentage(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label className="label">Computer Architecture Percentage:</label>
          <input
            className="input"
            type="number"
            value={computerArchitecturePercentage}
            onChange={(e) => setComputerArchitecturePercentage(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label className="label">Mathematics Percentage:</label>
          <input
            className="input"
            type="number"
            value={mathematicsPercentage}
            onChange={(e) => setMathematicsPercentage(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label className="label">Communication Skills Projects:</label>
          <input
            className="input"
            type="number"
            value={communicationSkillsProjects}
            onChange={(e) => setCommunicationSkillsProjects(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label className="label">Operating Systems Percentage:</label>
          <input
            className="input"
            type="number"
            value={operatingSystemsPercentage}
            onChange={(e) => setOperatingSystemsPercentage(e.target.value)}
            required
          />
        </div>
        <button className="submit-button" type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AcademicPerformance;
