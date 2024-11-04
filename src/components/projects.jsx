// components/Projects.jsx
import React, { useState } from 'react';
import './projects.css';

const Projects = () => {
  const [projects, setProjects] = useState([
    { id: 'P001', name: 'Portfolio Website', domain: 'Web Development' }
  ]);

  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const updatedProjects = [...projects];
    updatedProjects[index][name] = value;
    setProjects(updatedProjects);
  };

  const addProject = () => {
    setProjects([
      ...projects,
      { id: `P00${projects.length + 1}`, name: '', domain: '' }
    ]);
  };

  return (
    <div className="projects-container">
      <h2>Projects</h2>
      {projects.map((project, index) => (
        <div key={project.id} className="project-card">
          <div className="input-group">
            <label>Project ID:</label>
            <input
              type="text"
              name="id"
              value={project.id}
              onChange={(e) => handleInputChange(e, index)}
              readOnly
            />
          </div>
          <div className="input-group">
            <label>Project Name:</label>
            <input
              type="text"
              name="name"
              value={project.name}
              onChange={(e) => handleInputChange(e, index)}
              placeholder="Enter project name"
            />
          </div>
          <div className="input-group">
            <label>Domain:</label>
            <input
              type="text"
              name="domain"
              value={project.domain}
              onChange={(e) => handleInputChange(e, index)}
              placeholder="Enter project domain"
            />
          </div>
        </div>
      ))}
      <button className="add-project-button" onClick={addProject}>Add Project</button>
    </div>
  );
};

export default Projects;
