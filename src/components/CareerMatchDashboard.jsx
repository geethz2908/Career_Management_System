// CareerMatchDashboard.js
import React, { useState, useEffect } from 'react';
import './CareerMatchDashboard.css';

const CareerMatchDashboard = () => {
  const [students, setStudents] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [selectedJob, setSelectedJob] = useState(null);
  const [matchScore, setMatchScore] = useState(null);
  const [matchHistory, setMatchHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const API_BASE_URL = 'http://localhost:5001/career-match';

  useEffect(() => {
    fetchInitialData();
  }, []);

  const fetchInitialData = async () => {
    try {
      const [studentsRes, jobsRes] = await Promise.all([
        fetch(`${API_BASE_URL}/students`),
        fetch(`${API_BASE_URL}/jobs`)
      ]);
      
      const studentsData = await studentsRes.json();
      const jobsData = await jobsRes.json();
      
      setStudents(studentsData);
      setJobs(jobsData);
    } catch (err) {
      setError('Failed to fetch initial data');
    }
  };

  const calculateMatch = async () => {
    if (!selectedStudent || !selectedJob) {
      setError('Please select both a student and a job');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/calculate-match`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          studentId: selectedStudent.student_id,
          jobId: selectedJob.job_id
        })
      });
      
      const data = await response.json();
      setMatchScore(data.matchScore);
      
      // Fetch updated match history
      const historyRes = await fetch(`${API_BASE_URL}/match-history/${selectedStudent.student_id}`);
      const historyData = await historyRes.json();
      setMatchHistory(historyData);
    } catch (err) {
      setError('Failed to calculate match score');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dashboard-container">
      <div className="card">
        <div className="card-header">
          <h2>Career Matching Dashboard</h2>
        </div>
        <div className="card-content">
          <div className="selection-grid">
            <div className="selection-column">
              <h3>Select Student</h3>
              <div className="selection-list">
              {Object.values(students).map(student => (
  <div
    key={student.student_id} // Use student.student_id as the key
    className={`selection-item ${
      selectedStudent?.student_id === student.student_id
        ? 'selected'
        : ''
    }`}
    onClick={() => setSelectedStudent(student)}
  >
    <p className="item-title">{student.student_name}</p>
    <p className="item-subtitle">Skills: {student.skills}</p>
  </div>
))}
              </div>
            </div>
            
            <div className="selection-column">
              <h3>Select Job</h3>
              <div className="selection-list">
              {Object.values(jobs).map(job => (
  <div
    key={job.job_id}
    className={`selection-item ${
      selectedJob?.job_id === job.job_id ? 'selected' : ''
    }`}
    onClick={() => setSelectedJob(job)}
  >
    <p className="item-title">{job.job_title}</p>
    <p className="item-subtitle">{job.company_name} - {job.industry}</p>
  </div>
))}
              </div>
            </div>
          </div>

          <button 
            className="calculate-button"
            onClick={calculateMatch}
            disabled={loading || !selectedStudent || !selectedJob}
          >
            {loading ? 'Calculating...' : 'Calculate Match Score'}
          </button>

          {error && (
            <div className="error-alert">
              {error}
            </div>
          )}

          {matchScore !== null && (
            <div className="match-score-card">
              <h3>Match Score: {matchScore.toFixed(2)}%</h3>
            </div>
          )}
        </div>
      </div>

      {matchHistory.length > 0 && (
        <div className="card">
          <div className="card-header">
            <h2>Match History</h2>
          </div>
          <div className="card-content">
            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Job Title</th>
                    <th>Match Score</th>
                    <th>Skills Score</th>
                    <th>Project Score</th>
                    <th>Academic Score</th>
                  </tr>
                </thead>
                <tbody>
                  {matchHistory.map(history => (
                    <tr key={history.match_id}>
                      <td>{new Date(history.calculated_at).toLocaleDateString()}</td>
                      <td>{jobs.find(j => j.job_id === history.job_id)?.job_title}</td>
                      <td>{history.match_score}%</td>
                      <td>{history.skill_score}%</td>
                      <td>{history.project_score}%</td>
                      <td>{history.academic_score}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CareerMatchDashboard;