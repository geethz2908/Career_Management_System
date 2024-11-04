// components/Skills.jsx
import React, { useState } from 'react';
import './skills.css';

const Skills = () => {
  const [skills, setSkills] = useState([
    { id: '001', name: 'JavaScript', level: 'Advanced', certifications: 'Yes' }
  ]);

  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const updatedSkills = [...skills];
    updatedSkills[index][name] = value;
    setSkills(updatedSkills);
  };

  const addSkill = () => {
    setSkills([
      ...skills,
      { id: `00${skills.length + 1}`, name: '', level: '', certifications: '' }
    ]);
  };

  return (
    <div className="skills-container">
      <h2>Skills</h2>
      {skills.map((skill, index) => (
        <div key={skill.id} className="skill-card">
          <div className="input-group">
            <label>Skill ID:</label>
            <input
              type="text"
              name="id"
              value={skill.id}
              onChange={(e) => handleInputChange(e, index)}
              readOnly
            />
          </div>
          <div className="input-group">
            <label>Skill Name:</label>
            <input
              type="text"
              name="name"
              value={skill.name}
              onChange={(e) => handleInputChange(e, index)}
              placeholder="Enter skill name"
            />
          </div>
          <div className="input-group">
            <label>Proficiency Level:</label>
            <input
              type="text"
              name="level"
              value={skill.level}
              onChange={(e) => handleInputChange(e, index)}
              placeholder="Enter proficiency level"
            />
          </div>
          <div className="input-group">
            <label>Certifications:</label>
            <input
              type="text"
              name="certifications"
              value={skill.certifications}
              onChange={(e) => handleInputChange(e, index)}
              placeholder="Yes or No"
            />
          </div>
        </div>
      ))}
      <button className="add-skill-button" onClick={addSkill}>Add Skill</button>
    </div>
  );
};

export default Skills;
