import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const styles = {
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '20px',
  },
  card: {
    background: 'white',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    padding: '20px',
  },
  header: {
    borderBottom: '1px solid #eee',
    marginBottom: '20px',
    paddingBottom: '20px',
  },
  title: {
    fontSize: '24px',
    fontWeight: 'bold',
    margin: 0,
  },
  gridContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '24px',
    marginBottom: '24px',
  },
  section: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  sectionTitle: {
    fontSize: '18px',
    fontWeight: 'bold',
    margin: '0',
  },
  list: {
    height: '400px',
    overflowY: 'auto',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  listItem: {
    padding: '16px',
    borderRadius: '8px',
    border: '1px solid #e5e7eb',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
  },
  selectedItem: {
    backgroundColor: '#f3f4f6',
    borderColor: '#60a5fa',
  },
  itemTitle: {
    fontWeight: '600',
    marginBottom: '4px',
  },
  itemSubtitle: {
    fontSize: '14px',
    color: '#666',
  },
  button: {
    backgroundColor: '#3b82f6',
    color: 'white',
    padding: '12px 24px',
    borderRadius: '6px',
    border: 'none',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
  },
  buttonDisabled: {
    backgroundColor: '#e5e7eb',
    color: '#9ca3af',
    cursor: 'not-allowed',
  },
  alert: {
    padding: '16px',
    borderRadius: '6px',
    marginTop: '16px',
    backgroundColor: '#fee2e2',
    color: '#991b1b',
    border: '1px solid #fca5a5',
  },
  recommendation: {
    padding: '16px',
    borderRadius: '6px',
    marginTop: '24px',
  },
  scoreGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '16px',
    marginTop: '24px',
  },
  scoreCard: {
    padding: '16px',
    borderRadius: '6px',
    border: '1px solid #e5e7eb',
  },
  scoreTitle: {
    fontSize: '14px',
    color: '#666',
    marginBottom: '4px',
  },
  scoreValue: {
    fontSize: '24px',
    fontWeight: 'bold',
  },
  scoreWeight: {
    fontSize: '12px',
    color: '#666',
  },
};

// const CareerMatchDashboard = () => {
//   const [students, setStudents] = useState([]);
//   const [jobs, setJobs] = useState([]);
//   const [selectedStudent, setSelectedStudent] = useState(null);
//   const [selectedJob, setSelectedJob] = useState(null);
//   const [matchResult, setMatchResult] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const API_BASE_URL = 'http://localhost:5001';

//   useEffect(() => {
//     fetchInitialData();
//   }, []);

//   const fetchInitialData = async () => {
//     try {
//       const [studentsRes, jobsRes] = await Promise.all([
//         fetch(`${API_BASE_URL}/career-manage/students`),
//         fetch(`${API_BASE_URL}/career-manage/jobs`)
//       ]);
      
//       const studentsData = await studentsRes.json();
//       const jobsData = await jobsRes.json();
      
//       setStudents(studentsData);
//       setJobs(jobsData.data.jobs);
//     } catch (err) {
//       setError('Failed to fetch initial data');
//     }
//   };

//   const calculateMatch = async () => {
//     if (!selectedStudent || !selectedJob) {
//       setError('Please select both a student and a job');
//       return;
//     }

//     setLoading(true);
//     try {
//       const response = await fetch(
//         `${API_BASE_URL}/career-match/calculate-match?studentId=${selectedStudent.student_id}&jobId=${selectedJob.id}`
//       );
//       const data = await response.json();
      
//       if (data.status === 'success') {
//         setMatchResult(data.data);
//         setError(null);
//       } else {
//         setError(data.message || 'Failed to calculate match score');
//       }
//     } catch (err) {
//       setError('Failed to calculate match score');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const getScoreColor = (score) => {
//     if (score >= 50) return '#16a34a';
//     if (score >= 40) return '#2563eb';
//     if (score >= 30) return '#ca8a04';
//     return '#dc2626';
//   };

//   const getRecommendationStyle = (level) => {
//     switch (level) {
//       case 'Highly Recommended':
//         return { backgroundColor: '#dcfce7', color: '#166534' };
//       case 'Recommended':
//         return { backgroundColor: '#dbeafe', color: '#1e40af' };
//       case 'Potential Match':
//         return { backgroundColor: '#fef3c7', color: '#92400e' };
//       default:
//         return { backgroundColor: '#fee2e2', color: '#991b1b' };
//     }
//   };

//   const scoreChartData = matchResult ? [
//     { name: 'Skills', score: parseFloat(matchResult.scoreBreakdown.skillScore.score) },
//     { name: 'Projects', score: parseFloat(matchResult.scoreBreakdown.projectScore.score) },
//     { name: 'Academic', score: parseFloat(matchResult.scoreBreakdown.academicScore.score) },
//     { name: 'Additional', score: parseFloat(matchResult.scoreBreakdown.additionalScore.score) || 0 }
//   ] : [];

//   return (
//     <div style={styles.container}>
//       <div style={styles.card}>
//         <div style={styles.header}>
//           <h1 style={styles.title}>Career Matching Dashboard</h1>
//         </div>

//         <div style={styles.gridContainer}>
//           <div style={styles.section}>
//             <h3 style={styles.sectionTitle}>Select Student</h3>
//             <div style={styles.list}>
//               {students.map(student => (
//                 <div
//                   key={student.student_id}
//                   style={{
//                     ...styles.listItem,
//                     ...(selectedStudent?.student_id === student.student_id ? styles.selectedItem : {})
//                   }}
//                   onClick={() => setSelectedStudent(student)}
//                 >
//                   <p style={styles.itemTitle}>{student.student_name}</p>
//                   <p style={styles.itemSubtitle}>
//                     Skills: {Array.isArray(student.skills) ? student.skills.join(', ') : student.skills}
//                   </p>
//                 </div>
//               ))}
//             </div>
//           </div>

//           <div style={styles.section}>
//             <h3 style={styles.sectionTitle}>Select Job</h3>
//             <div style={styles.list}>
//               {jobs.map(job => (
//                 <div
//                   key={job.id}
//                   style={{
//                     ...styles.listItem,
//                     ...(selectedJob?.id === job.id ? styles.selectedItem : {})
//                   }}
//                   onClick={() => setSelectedJob(job)}
//                 >
//                   <p style={styles.itemTitle}>{job.title}</p>
//                   <p style={styles.itemSubtitle}>{job.company.name} - {job.company.industry}</p>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>

//         <div style={{ textAlign: 'center', marginTop: '24px' }}>
//           <button
//             style={{
//               ...styles.button,
//               ...(loading || !selectedStudent || !selectedJob ? styles.buttonDisabled : {})
//             }}
//             onClick={calculateMatch}
//             disabled={loading || !selectedStudent || !selectedJob}
//           >
//             {loading ? 'Calculating...' : 'Calculate Match Score'}
//           </button>
//         </div>

//         {error && (
//           <div style={styles.alert}>
//             {error}
//           </div>
//         )}

//         {matchResult && (
//           <div style={{ marginTop: '24px' }}>
//             <div style={{
//               ...styles.recommendation,
//               ...getRecommendationStyle(matchResult.recommendation.level)
//             }}>
//               <h4 style={{ margin: '0 0 8px 0', fontSize: '18px', fontWeight: 'bold' }}>
//                 {matchResult.recommendation.level}
//               </h4>
//               <p style={{ margin: 0 }}>{matchResult.recommendation.message}</p>
//             </div>

//             <div style={{ marginTop: '24px' }}>
//               <h4 style={styles.sectionTitle}>Score Breakdown</h4>
//               <div style={{ height: '300px', marginTop: '16px' }}>
//                 <ResponsiveContainer width="100%" height="100%">
//                   <BarChart data={scoreChartData}>
//                     <CartesianGrid strokeDasharray="3 3" />
//                     <XAxis dataKey="name" />
//                     <YAxis domain={[0, 100]} />
//                     <Tooltip />
//                     <Bar dataKey="score" fill="#3b82f6" />
//                   </BarChart>
//                 </ResponsiveContainer>
//               </div>
//             </div>

//             <div style={styles.scoreGrid}>
//               {Object.entries(matchResult.scoreBreakdown).map(([key, value]) => (
//                 <div key={key} style={styles.scoreCard}>
//                   <p style={styles.scoreTitle}>{key.replace(/Score$/, '')}</p>
//                   <p style={{
//                     ...styles.scoreValue,
//                     color: getScoreColor(parseFloat(value.score))
//                   }}>
//                     {parseFloat(value.score).toFixed(1)}%
//                   </p>
//                   <p style={styles.scoreWeight}>Weight: {value.weight}</p>
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default CareerMatchDashboard;

const CareerMatchDashboard = () => {
  const [students, setStudents] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [selectedJob, setSelectedJob] = useState(null);
  const [matchResult, setMatchResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const API_BASE_URL = 'http://localhost:5001';

  useEffect(() => {
    fetchInitialData();
  }, []);

  const fetchInitialData = async () => {
    try {
      const [studentsRes, jobsRes] = await Promise.all([
        fetch(`${API_BASE_URL}/career-manage/students`),
        fetch(`${API_BASE_URL}/career-manage/jobs`)
      ]);
      
      if (!studentsRes.ok || !jobsRes.ok) {
        throw new Error('Failed to fetch data');
      }

      const studentsData = await studentsRes.json();
      const jobsData = await jobsRes.json();
      
      setStudents(Array.isArray(studentsData) ? studentsData : 
                 studentsData.data?.students || 
                 studentsData.students || 
                 []);
                 
      setJobs(jobsData.data?.jobs || []);
    } catch (err) {
      setError('Failed to fetch initial data: ' + (err.message || 'Unknown error'));
      console.error('Fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  const calculateMatch = async () => {
    if (!selectedStudent || !selectedJob) {
      setError('Please select both a student and a job');
      return;
    }

    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(
        `${API_BASE_URL}/career-match/calculate-match?studentId=${selectedStudent.student_id}&jobId=${selectedJob.id}`
      );

      if (!response.ok) {
        throw new Error('Failed to calculate match');
      }

      const data = await response.json();
      
      if (data.status === 'success' && data.data) {
        setMatchResult({
          ...data.data,
          scoreBreakdown: {
            ...data.data.scoreBreakdown,
            // Ensure all scores have proper numerical values
            skillScore: {
              ...data.data.scoreBreakdown.skillScore,
              score: parseFloat(data.data.scoreBreakdown.skillScore.score) || 0
            },
            projectScore: {
              ...data.data.scoreBreakdown.projectScore,
              score: parseFloat(data.data.scoreBreakdown.projectScore.score) || 0
            },
            academicScore: {
              ...data.data.scoreBreakdown.academicScore,
              score: parseFloat(data.data.scoreBreakdown.academicScore.score) || 0
            },
            additionalScore: {
              ...data.data.scoreBreakdown.additionalScore,
              score: parseFloat(data.data.scoreBreakdown.additionalScore.score) || 0
            }
          }
        });
        setError(null);
      } else {
        throw new Error(data.message || 'Failed to calculate match score');
      }
    } catch (err) {
      setError(err.message || 'Failed to calculate match score');
      setMatchResult(null);
    } finally {
      setLoading(false);
    }
  };

  const getScoreColor = (score) => {
    if (score >= 50) return '#16a34a';
    if (score >= 40) return '#2563eb';
    if (score >= 30) return '#ca8a04';
    return '#dc2626';
  };

  const getRecommendationStyle = (level) => {
    switch (level) {
      case 'Highly Recommended':
        return { backgroundColor: '#dcfce7', color: '#166534' };
      case 'Recommended':
        return { backgroundColor: '#dbeafe', color: '#1e40af' };
      case 'Potential Match':
        return { backgroundColor: '#fef3c7', color: '#92400e' };
      default:
        return { backgroundColor: '#fee2e2', color: '#991b1b' };
    }
  };

  const scoreChartData = matchResult ? [
    { 
      name: 'Skills', 
      score: parseFloat(matchResult.scoreBreakdown.skillScore.score) || 0
    },
    { 
      name: 'Projects', 
      score: parseFloat(matchResult.scoreBreakdown.projectScore.score) || 0
    },
    { 
      name: 'Academic', 
      score: parseFloat(matchResult.scoreBreakdown.academicScore.score) || 0
    },
    { 
      name: 'Additional', 
      score: isNaN(parseFloat(matchResult.scoreBreakdown.additionalScore.score)) ? 
        0 : 
        parseFloat(matchResult.scoreBreakdown.additionalScore.score)
    }
  ] : [];

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.header}>
          <h1 style={styles.title}>Career Matching Dashboard</h1>
        </div>

        <div style={styles.gridContainer}>
          <div style={styles.section}>
            <h3 style={styles.sectionTitle}>Select Student</h3>
            <div style={styles.list}>
              {students.map(student => (
                <div
                  key={student.student_id}
                  style={{
                    ...styles.listItem,
                    ...(selectedStudent?.student_id === student.student_id ? styles.selectedItem : {})
                  }}
                  onClick={() => setSelectedStudent(student)}
                >
                  <p style={styles.itemTitle}>{student.student_name}</p>
                  <p style={styles.itemSubtitle}>
                    Skills: {Array.isArray(student.skills) ? student.skills.join(', ') : student.skills}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div style={styles.section}>
            <h3 style={styles.sectionTitle}>Select Job</h3>
            <div style={styles.list}>
              {jobs.map(job => (
                <div
                  key={job.id}
                  style={{
                    ...styles.listItem,
                    ...(selectedJob?.id === job.id ? styles.selectedItem : {})
                  }}
                  onClick={() => setSelectedJob(job)}
                >
                  <p style={styles.itemTitle}>{job.title}</p>
                  <p style={styles.itemSubtitle}>{job.company?.name} - {job.company?.industry}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div style={{ textAlign: 'center', marginTop: '24px' }}>
          <button
            style={{
              ...styles.button,
              ...(loading || !selectedStudent || !selectedJob ? styles.buttonDisabled : {})
            }}
            onClick={calculateMatch}
            disabled={loading || !selectedStudent || !selectedJob}
          >
            {loading ? 'Calculating...' : 'Calculate Match Score'}
          </button>
        </div>

        {error && (
          <div style={styles.alert}>
            {error}
          </div>
        )}

        {matchResult && (
          <div style={{ marginTop: '24px' }}>
            <div style={{
              ...styles.recommendation,
              ...getRecommendationStyle(matchResult.recommendation.level)
            }}>
              <h4 style={{ margin: '0 0 8px 0', fontSize: '18px', fontWeight: 'bold' }}>
                {matchResult.recommendation.level}
              </h4>
              <p style={{ margin: 0 }}>{matchResult.recommendation.message}</p>
            </div>

            <div style={{ marginTop: '24px' }}>
              <h4 style={styles.sectionTitle}>Score Breakdown</h4>
              <div style={{ height: '300px', marginTop: '16px' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={scoreChartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis domain={[0, 100]} />
                    <Tooltip />
                    <Bar dataKey="score" fill="#3b82f6" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div style={styles.scoreGrid}>
              {Object.entries(matchResult.scoreBreakdown).map(([key, value]) => (
                <div key={key} style={styles.scoreCard}>
                  <p style={styles.scoreTitle}>{key.replace(/Score$/, '')}</p>
                  <p style={{
                    ...styles.scoreValue,
                    color: getScoreColor(parseFloat(value.score))
                  }}>
                    {parseFloat(value.score).toFixed(1)}%
                  </p>
                  <p style={styles.scoreWeight}>Weight: {value.weight}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CareerMatchDashboard;