// components/AcademicPerformance.jsx
import React, { useState } from 'react';
import './academic_performance.css';

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
    // You can handle the submission here (e.g., save data or display it)
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
    <div className="academic-performance-container">
      <h2>Academic Performance</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>GPA:</label>
          <input
            type="number"
            value={gpa}
            onChange={(e) => setGpa(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Credits Completed:</label>
          <input
            type="number"
            value={creditsCompleted}
            onChange={(e) => setCreditsCompleted(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Programming Concepts Percentage:</label>
          <input
            type="number"
            value={programmingConceptsPercentage}
            onChange={(e) => setProgrammingConceptsPercentage(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Algorithms Concepts Percentage:</label>
          <input
            type="number"
            value={algorithmsConceptsPercentage}
            onChange={(e) => setAlgorithmsConceptsPercentage(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Software Engineering Percentage:</label>
          <input
            type="number"
            value={softwareEngineeringPercentage}
            onChange={(e) => setSoftwareEngineeringPercentage(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Computer Networks Percentage:</label>
          <input
            type="number"
            value={computerNetworksPercentage}
            onChange={(e) => setComputerNetworksPercentage(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Electronics Subjects Percentage:</label>
          <input
            type="number"
            value={electronicsSubjectsPercentage}
            onChange={(e) => setElectronicsSubjectsPercentage(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Computer Architecture Percentage:</label>
          <input
            type="number"
            value={computerArchitecturePercentage}
            onChange={(e) => setComputerArchitecturePercentage(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Mathematics Percentage:</label>
          <input
            type="number"
            value={mathematicsPercentage}
            onChange={(e) => setMathematicsPercentage(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Communication Skills Projects:</label>
          <input
            type="number"
            value={communicationSkillsProjects}
            onChange={(e) => setCommunicationSkillsProjects(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Operating Systems Percentage:</label>
          <input
            type="number"
            value={operatingSystemsPercentage}
            onChange={(e) => setOperatingSystemsPercentage(e.target.value)}
            required
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AcademicPerformance;
