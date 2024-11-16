const express = require('express');
const cors = require('cors');
const path = require('path');
// const auth = require('./auth');
// Import routes
const companiesRouter = require('./routes/companies');
const jobsRouter = require('./routes/jobs');
const studentsRouter = require('./routes/students');
const academicRouter = require('./routes/academic');
const projectsRouter = require('./routes/projects');
const skillsRouter = require('./routes/skills');
const careerMatchRoutes = require('./routes/careerMatch');

const app = express();
const port = 5001;

const mysql = require('mysql2/promise');
// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true })); 
// app.use('/uploads', express.static('uploads'));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/companies', companiesRouter);
app.use('/Jobs', jobsRouter);
app.use('/add-student', studentsRouter);
app.use('/add-academic-performance', academicRouter);
app.use('/add-projects', projectsRouter);
app.use('/add-skills', skillsRouter);
app.use('/career-match', careerMatchRoutes);


// app.get('/api-docs', (req, res) => {
//     res.json({
//       'endpoints': {
//         'GET /api/career/students': 'Get all students with their skills',
//         'GET /api/career/students/:id/academic': 'Get student academic details',
//         'GET /api/career/jobs': 'Get all available jobs',
//         'GET /api/career/jobs/:id': 'Get specific job details',
//         'POST /api/career/calculate-match': 'Calculate career match score',
//         'GET /api/career/match-history/:studentId': 'Get match history for a student',
//         'GET /api/career/match-analysis/:studentId/:jobId': 'Get detailed match analysis'
//       }
//     });
//   });

//   app.use((err, req, res, next) => {
//     console.error(err.stack);
//     res.status(500).json({
//       error: 'Something broke!',
//       message: err.message
//     });
//   });
  
//   // 404 handler
//   app.use((req, res) => {
//     res.status(404).json({
//       error: 'Not Found',
//       message: 'The requested resource was not found'
//     });
//   });

app.get('/', (req, res) => {
    res.send("Hello from the server!");
});

// // server.js






// // Middleware
// app.use(cors());
// app.use(express.json());

// // Initialize database
// auth.initializeDatabase()
//   .then(() => console.log('Database initialized'))
//   .catch(err => console.error('Database initialization failed:', err));

// // Auth routes
// app.post('/api/companies/register', auth.registerCompany);
// app.post('/api/companies/login', auth.loginCompany);
// app.post('/api/companies/forgot-password', auth.requestPasswordReset);
// app.post('/api/companies/reset-password', auth.resetPassword);
// app.post('/api/companies/social-login/:provider', auth.socialLogin);

// // Protected route example
// app.get('/api/companies/profile', auth.authenticateToken, async (req, res) => {
//   res.json(req.company);
// });

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// app.listen(port, () => {
//     console.log(`Server is running on port ${port}`);
//     console.log(`API documentation available at http://localhost:${port}/api-docs`);
// });

// const cors = require('cors');

// const app = express();
const PORT = 5001;

// Middleware
// app.use(cors()); // Enable CORS for all routes
// app.use(express.json()); // Parse JSON bodies
// app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

// Database configuration
const dbConfig = {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'career_manage'
};

// Create connection pool
const pool = mysql.createPool(dbConfig);

// Basic route to test if server is running
app.get('/', (req, res) => {
    res.json({ message: 'Server is running!' });
});

// Student skills routes
app.get('/career-manage/students', async (req, res) => {
    try {
        const connection = await pool.getConnection();
        try {
            const [rows] = await connection.query('SELECT * FROM student_skill_summary');
            const formattedData = rows.map(row => ({
                student_id: row.student_id,
                student_name: row.student_name,
                total_skills: row.total_skills,
                skills: row.skills ? row.skills.split(',') : [],
                proficiency_levels: row.proficiency_levels ? row.proficiency_levels.split(',') : []
            }));
            res.json(formattedData);
        } finally {
            connection.release();
        }
    } catch (error) {
        console.error('Database Error:', error);
        res.status(500).json({ error: 'Database operation failed' });
    }
});

app.get('/career-manage/students/:id', async (req, res) => {
    try {
        const connection = await pool.getConnection();
        try {
            const [rows] = await connection.query(
                'SELECT * FROM student_skill_summary WHERE student_id = ?',
                [req.params.id]
            );
            
            if (rows.length === 0) {
                return res.status(404).json({ error: 'Student not found' });
            }

            const formattedData = {
                student_id: rows[0].student_id,
                student_name: rows[0].student_name,
                total_skills: rows[0].total_skills,
                skills: rows[0].skills ? rows[0].skills.split(',') : [],
                proficiency_levels: rows[0].proficiency_levels ? rows[0].proficiency_levels.split(',') : []
            };
            
            res.json(formattedData);
        } finally {
            connection.release();
        }
    } catch (error) {
        console.error('Database Error:', error);
        res.status(500).json({ error: 'Database operation failed' });
    }
});



// Input validation middleware
const validateStudentId = (req, res, next) => {
  const studentId = parseInt(req.params.id);
  if (isNaN(studentId) || studentId <= 0) {
    return res.status(400).json({
      status: 'error',
      message: 'Invalid student ID. Must be a positive number.'
    });
  }
  next();
};

app.get('/career-manage/students/:id/academic', validateStudentId, async (req, res) => {
  try {
    const studentId = req.params.id;
    console.log(`Fetching academic details for student ID: ${studentId}`);

    // Query the view with proper field selection
    const [rows] = await pool.query(
      `SELECT 
        student_id,
        student_name,
        ROUND(gpa, 2) as gpa,
        ROUND(programming_concepts_percentage, 1) as programming_concepts_percentage,
        ROUND(algorithms_concepts_percentage, 1) as algorithms_concepts_percentage,
        ROUND(software_engineering_percentage, 1) as software_engineering_percentage,
        ROUND(computer_network_percentage, 1) as computer_network_percentage,
        ROUND(electronic_subjects_percentage, 1) as electronic_subjects_percentage,
        ROUND(computer_architecture_percentage, 1) as computer_architecture_percentage,
        ROUND(mathematics_percentage, 1) as mathematics_percentage,
        ROUND(communication_skills_percentage, 1) as communication_skills_percentage,
        ROUND(operating_systems_percentage, 1) as operating_systems_percentage
      FROM student_academic_summary 
      WHERE student_id = ?`,
      [studentId]
    );

    if (rows.length === 0) {
      console.log(`No student found with ID: ${studentId}`);
      return res.status(404).json({
        status: 'error',
        message: 'Student not found'
      });
    }

    // Transform the data for better organization
    const academicData = rows[0];
    const response = {
      status: 'success',
      data: {
        studentInfo: {
          id: academicData.student_id,
          name: academicData.student_name,
          gpa: academicData.gpa
        },
        subjectPerformance: {
          programmingConcepts: academicData.programming_concepts_percentage,
          algorithms: academicData.algorithms_concepts_percentage,
          softwareEngineering: academicData.software_engineering_percentage,
          computerNetworks: academicData.computer_network_percentage,
          electronics: academicData.electronic_subjects_percentage,
          computerArchitecture: academicData.computer_architecture_percentage,
          mathematics: academicData.mathematics_percentage,
          communicationSkills: academicData.communication_skills_percentage,
          operatingSystems: academicData.operating_systems_percentage
        }
      }
    };

    // Calculate overall technical and non-technical percentages
    const technicalSubjects = [
      response.data.subjectPerformance.programmingConcepts,
      response.data.subjectPerformance.algorithms,
      response.data.subjectPerformance.softwareEngineering,
      response.data.subjectPerformance.computerNetworks,
      response.data.subjectPerformance.computerArchitecture,
      response.data.subjectPerformance.operatingSystems
    ];

    const nonTechnicalSubjects = [
      response.data.subjectPerformance.mathematics,
      response.data.subjectPerformance.communicationSkills
    ];

    response.data.overallPerformance = {
      technicalAverage: Number((technicalSubjects.reduce((a, b) => a + b, 0) / technicalSubjects.length).toFixed(1)),
      nonTechnicalAverage: Number((nonTechnicalSubjects.reduce((a, b) => a + b, 0) / nonTechnicalSubjects.length).toFixed(1))
    };

    console.log('Successfully fetched and processed student academic details');
    res.json(response);

  } catch (error) {
    console.error('Error fetching student academic details:', error);
    res.status(500).json({
      status: 'error',
      message: 'Internal server error while fetching academic details',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

const validateJobId = (req, res, next) => {
    const jobId = parseInt(req.params.id);
    if (isNaN(jobId) || jobId <= 0) {
      return res.status(400).json({
        status: 'error',
        message: 'Invalid job ID. Must be a positive number.'
      });
    }
    next();
  };
  
  // Utility function to parse query parameters
  const parseQueryParams = (query) => {
    return {
      page: parseInt(query.page) || 1,
      limit: parseInt(query.limit) || 10,
      industry: query.industry,
      minSalary: query.minSalary ? parseFloat(query.minSalary) : null,
      maxSalary: query.maxSalary ? parseFloat(query.maxSalary) : null,
      search: query.search?.trim(),
      sortBy: ['job_title', 'expected_salary', 'company_name'].includes(query.sortBy) 
        ? query.sortBy 
        : 'job_id',
      sortOrder: query.sortOrder?.toUpperCase() === 'DESC' ? 'DESC' : 'ASC'
    };
  };
  
  // Get all jobs with filtering and pagination
  app.get('/career-manage/jobs', async (req, res) => {
    try {
      const {
        page,
        limit,
        industry,
        minSalary,
        maxSalary,
        search,
        sortBy,
        sortOrder
      } = parseQueryParams(req.query);
  
      // Build the WHERE clause dynamically
      const conditions = [];
      const params = [];
  
      if (industry) {
        conditions.push('industry = ?');
        params.push(industry);
      }
  
      if (minSalary) {
        conditions.push('expected_salary >= ?');
        params.push(minSalary);
      }
  
      if (maxSalary) {
        conditions.push('expected_salary <= ?');
        params.push(maxSalary);
      }
  
      if (search) {
        conditions.push('(job_title LIKE ? OR job_description LIKE ? OR company_name LIKE ?)');
        const searchTerm = `%${search}%`;
        params.push(searchTerm, searchTerm, searchTerm);
      }
  
      const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : '';
  
      // Get total count for pagination
      const [countResult] = await pool.query(
        `SELECT COUNT(*) as total FROM job_summary ${whereClause}`,
        params
      );
      const totalJobs = countResult[0].total;
      const totalPages = Math.ceil(totalJobs / limit);
      const offset = (page - 1) * limit;
  
      // Get paginated and filtered results
      const query = `
        SELECT 
          job_id,
          job_title,
          job_description,
          ROUND(expected_salary, 2) as expected_salary,
          company_name,
          industry
        FROM job_summary
        ${whereClause}
        ORDER BY ${sortBy} ${sortOrder}
        LIMIT ? OFFSET ?
      `;
  
      const [jobs] = await pool.query(query, [...params, limit, offset]);
  
      // Transform the response
      const response = {
        status: 'success',
        data: {
          jobs: jobs.map(job => ({
            id: job.job_id,
            title: job.job_title,
            description: job.job_description,
            salary: {
              amount: job.expected_salary,
              currency: 'USD' // Add currency configuration as needed
            },
            company: {
              name: job.company_name,
              industry: job.industry
            }
          })),
          pagination: {
            currentPage: page,
            totalPages,
            totalItems: totalJobs,
            itemsPerPage: limit
          }
        }
      };
  
      res.json(response);
    } catch (error) {
      console.error('Error fetching jobs:', error);
      res.status(500).json({
        status: 'error',
        message: 'Internal server error while fetching jobs',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    }
  });
  
  // Get specific job details
  app.get('/career-manage/jobs/:id', validateJobId, async (req, res) => {
    try {
      const jobId = req.params.id;
  
      const [rows] = await pool.query(
        `SELECT 
          job_id,
          job_title,
          job_description,
          ROUND(expected_salary, 2) as expected_salary,
          company_name,
          industry
        FROM job_summary 
        WHERE job_id = ?`,
        [jobId]
      );
  
      if (rows.length === 0) {
        return res.status(404).json({
          status: 'error',
          message: 'Job not found'
        });
      }
  
      const job = rows[0];
      const response = {
        status: 'success',
        data: {
          id: job.job_id,
          title: job.job_title,
          description: job.job_description,
          salary: {
            amount: job.expected_salary,
            currency: 'USD' // Add currency configuration as needed
          },
          company: {
            name: job.company_name,
            industry: job.industry
          },
          metadata: {
            createdAt: job.created_at,
            updatedAt: job.updated_at
          }
        }
      };
  
      res.json(response);
    } catch (error) {
      console.error('Error fetching job details:', error);
      res.status(500).json({
        status: 'error',
        message: 'Internal server error while fetching job details',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    }
  });



// // Validation middleware
// const validateMatchRequest = (req, res, next) => {
//   const { studentId, jobId } = req.body;
  
//   const errors = [];
  
//   if (!studentId) {
//     errors.push('Student ID is required');
//   } else if (!Number.isInteger(parseInt(studentId)) || parseInt(studentId) <= 0) {
//     errors.push('Student ID must be a positive integer');
//   }
  
//   if (!jobId) {
//     errors.push('Job ID is required');
//   } else if (!Number.isInteger(parseInt(jobId)) || parseInt(jobId) <= 0) {
//     errors.push('Job ID must be a positive integer');
//   }
  
//   if (errors.length > 0) {
//     return res.status(400).json({
//       status: 'error',
//       message: 'Validation failed',
//       errors
//     });
//   }
  
//   next();
// };

// app.post('/career-match/calculate-match', validateMatchRequest, async (req, res) => {
//   const { studentId, jobId } = req.body;

//   try {
//     // Get student and job details in parallel
//     const [[studentResult], [jobResult]] = await Promise.all([
//       pool.query(`
//         SELECT s.student_id, s.student_name, ap.gpa 
//         FROM students s 
//         LEFT JOIN academic_performance ap ON s.student_id = ap.student_id 
//         WHERE s.student_id = ?
//       `, [studentId]),
//       pool.query(`
//         SELECT j.job_id, j.job_title, c.company_name 
//         FROM job_listings j 
//         JOIN companies c ON j.company_id = c.company_id 
//         WHERE j.job_id = ?
//       `, [jobId])
//     ]);

//     if (!studentResult) {
//       return res.status(404).json({
//         status: 'error',
//         message: 'Student not found'
//       });
//     }
//     if (!jobResult) {
//       return res.status(404).json({
//         status: 'error',
//         message: 'Job not found'
//       });
//     }

//     // Calculate match score using stored procedure
//     const [matchResults] = await pool.query(
//       'CALL CalculateCareerMatchScore(?, ?, @match_score); SELECT @match_score as match_score;',
//       [studentId, jobId]
//     );

//     // Get the latest match history entry for detailed breakdown
//     const [matchHistoryResult] = await pool.query(
//       `SELECT 
//         match_score,
//         skill_score,
//         project_score,
//         academic_score,
//         additional_score,
//         calculated_at
//       FROM match_history 
//       WHERE student_id = ? AND job_id = ? 
//       ORDER BY calculated_at DESC 
//       LIMIT 1`,
//       [studentId, jobId]
//     );

//     const matchDetails = matchHistoryResult[0];

//     // Get skill match details
//     const [skillMatchDetails] = await pool.query(
//       `SELECT 
//         skills.skill_name,
//         skills.proficiency_level as student_proficiency,
//         job_requirements.required_level as required_proficiency,
//         (skills.proficiency_level / job_requirements.required_level * 100) as match_percentage
//       FROM skills 
//       JOIN job_requirements ON skills.skill_name = job_requirements.skill_name
//       WHERE skills.student_id = ? AND job_requirements.job_id = ?`,
//       [studentId, jobId]
//     );

//     // Prepare the response
//     const response = {
//       status: 'success',
//       data: {
//         overview: {
//           student: {
//             id: studentResult.student_id,
//             name: studentResult.student_name,
//             gpa: studentResult.gpa
//           },
//           job: {
//             id: jobResult.job_id,
//             title: jobResult.job_title,
//             company: jobResult.company_name
//           },
//           finalScore: parseFloat(matchDetails.match_score).toFixed(2)
//         },
//         scoreBreakdown: {
//           skillScore: {
//             score: parseFloat(matchDetails.skill_score).toFixed(2),
//             weight: '40%',
//             details: skillMatchDetails.map(skill => ({
//               skillName: skill.skill_name,
//               studentLevel: skill.student_proficiency,
//               requiredLevel: skill.required_proficiency,
//               matchPercentage: parseFloat(skill.match_percentage).toFixed(1)
//             }))
//           },
//           projectScore: {
//             score: parseFloat(matchDetails.project_score).toFixed(2),
//             weight: '25%'
//           },
//           academicScore: {
//             score: parseFloat(matchDetails.academic_score).toFixed(2),
//             weight: '25%'
//           },
//           additionalScore: {
//             score: parseFloat(matchDetails.additional_score).toFixed(2),
//             weight: '10%'
//           }
//         },
//         metadata: {
//           calculatedAt: matchDetails.calculated_at,
//           matchId: matchHistoryResult[0].match_id
//         }
//       }
//     };

//     // Add recommendation based on match score
//     response.data.recommendation = {
//       level: getRecommendationLevel(matchDetails.match_score),
//       message: getRecommendationMessage(matchDetails.match_score)
//     };

//     res.json(response);

//   } catch (error) {
//     console.error('Error calculating career match:', error);
//     res.status(500).json({
//       status: 'error',
//       message: 'Internal server error while calculating career match',
//       error: process.env.NODE_ENV === 'development' ? error.message : undefined
//     });
//   }
// });

// // Utility function to get recommendation level
// function getRecommendationLevel(score) {
//   if (score >= 85) return 'Highly Recommended';
//   if (score >= 70) return 'Recommended';
//   if (score >= 50) return 'Potential Match';
//   return 'Not Recommended';
// }

// // Utility function to get recommendation message
// function getRecommendationMessage(score) {
//   if (score >= 85) {
//     return 'Excellent match! Your skills and experience align very well with this position.';
//   }
//   if (score >= 70) {
//     return 'Good match! You meet most of the key requirements for this position.';
//   }
//   if (score >= 50) {
//     return 'Fair match. Consider improving some skills to increase your compatibility.';
//   }
//   return 'This position might not be the best fit for your current profile.';
// }

const validateMatchRequest = (req, res, next) => {
    // Get parameters from either query params or request body
    const studentId = req.body.studentId || req.query.studentId;
    const jobId = req.body.jobId || req.query.jobId;
    
    const errors = [];
    
    if (!studentId) {
      errors.push('Student ID is required');
    } else if (!Number.isInteger(parseInt(studentId)) || parseInt(studentId) <= 0) {
      errors.push('Student ID must be a positive integer');
    }
    
    if (!jobId) {
      errors.push('Job ID is required');
    } else if (!Number.isInteger(parseInt(jobId)) || parseInt(jobId) <= 0) {
      errors.push('Job ID must be a positive integer');
    }
    
    if (errors.length > 0) {
      return res.status(400).json({
        status: 'error',
        message: 'Validation failed',
        errors
      });
    }
    
    // Store validated and parsed values
    req.validatedData = {
      studentId: parseInt(studentId),
      jobId: parseInt(jobId)
    };
    
    next();
  };
  
  // Utility functions
  function getRecommendationLevel(score) {
    if (score >= 50) return 'Highly Recommended';
    if (score >= 40) return 'Recommended';
    if (score >= 30) return 'Potential Match';
    return 'Not Recommended';
  }
  
  function getRecommendationMessage(score) {
    if (score >= 50) {
      return 'Excellent match! Your skills and experience align very well with this position.';
    }
    if (score >= 40) {
      return 'Good match! You meet most of the key requirements for this position.';
    }
    if (score >= 30) {
      return 'Fair match. Consider improving some skills to increase your compatibility.';
    }
    return 'This position might not be the best fit for your current profile.';
  }
  
  // Career match calculation endpoint - supports both GET and POST
  app.route('/career-match/calculate-match')
    .get(validateMatchRequest, calculateMatch)
    .post(validateMatchRequest, calculateMatch);
  
    async function calculateMatch(req, res) {
        const { studentId, jobId } = req.validatedData;
      
        try {
          // Get student and job details in parallel
          const [[studentResult], [jobResult]] = await Promise.all([
            pool.query(`
              SELECT s.student_id, s.student_name, ap.gpa 
              FROM students s 
              LEFT JOIN academic_performance ap ON s.student_id = ap.student_id 
              WHERE s.student_id = ?
            `, [studentId]),
            pool.query(`
              SELECT j.job_id, j.job_title, c.company_name 
              FROM job_listings j 
              JOIN companies c ON j.company_id = c.company_id 
              WHERE j.job_id = ?
            `, [jobId])
          ]);
      
          if (!studentResult) {
            return res.status(404).json({
              status: 'error',
              message: `Student not found with ID: ${studentId}`
            });
          }
          if (!jobResult) {
            return res.status(404).json({
              status: 'error',
              message: `Job not found with ID: ${jobId}`
            });
          }
      
          // Execute stored procedure and get result in two separate queries
          await pool.query('CALL CalculateCareerMatchScore(?, ?, @match_score)', [studentId, jobId]);
          const [[scoreResult]] = await pool.query('SELECT @match_score as match_score');
      
          if (!scoreResult || scoreResult.match_score === null) {
            return res.status(500).json({
              status: 'error',
              message: 'Failed to retrieve match score from stored procedure'
            });
          }
      
          // Get the latest match history entry for detailed breakdown
          const [matchHistoryResult] = await pool.query(
            `SELECT 
              match_score,
              skill_score,
              project_score,
              academic_score,
              additional_score,
              calculated_at
            FROM match_history 
            WHERE student_id = ? AND job_id = ? 
            ORDER BY calculated_at DESC 
            LIMIT 1`,
            [studentId, jobId]
          );
      
          if (!matchHistoryResult.length) {
            return res.status(500).json({
              status: 'error',
              message: 'Failed to retrieve match history'
            });
          }
      
          const matchDetails = matchHistoryResult[0];
      
          // Get skill match details using the correct view name
          const [skillMatchDetails] = await pool.query(
            `SELECT 
              sss.skills as skill_name,
              sss.proficiency_levels as student_proficiency
              
            FROM student_skill_summary sss  -- Using the correct view name
            JOIN job_summary jr ON sss.skills = jr.job_description
            WHERE sss.student_id = ? AND jr.job_id = ?`,
            [studentId, jobId]
          );
      
          const response = {
            status: 'success',
            data: {
              overview: {
                student: {
                  id: studentResult.student_id,
                  name: studentResult.student_name,
                  gpa: studentResult.gpa
                },
                job: {
                  id: jobResult.job_id,
                  title: jobResult.job_title,
                  company: jobResult.company_name
                },
                finalScore: parseFloat(matchDetails.match_score).toFixed(2)
              },
              scoreBreakdown: {
                skillScore: {
                  score: parseFloat(matchDetails.skill_score).toFixed(2),
                  weight: '40%',
                  details: skillMatchDetails.map(skill => ({
                    skillName: skill.skill_name,
                    studentLevel: skill.student_proficiency,
                    requiredLevel: skill.required_proficiency,
                    matchPercentage: parseFloat(skill.match_percentage).toFixed(1)
                  }))
                },
                projectScore: {
                  score: parseFloat(matchDetails.project_score).toFixed(2),
                  weight: '25%'
                },
                academicScore: {
                  score: parseFloat(matchDetails.academic_score).toFixed(2),
                  weight: '25%'
                },
                additionalScore: {
                  score: parseFloat(matchDetails.additional_score).toFixed(2),
                  weight: '10%'
                }
              },
              recommendation: {
                level: getRecommendationLevel(matchDetails.match_score),
                message: getRecommendationMessage(matchDetails.match_score)
              },
              metadata: {
                calculatedAt: matchDetails.calculated_at,
                requestMethod: req.method
              }
            }
          };
      
          res.json(response);
      
        } catch (error) {
          console.error('Error calculating career match:', error);
          res.status(500).json({
            status: 'error',
            message: 'Internal server error while calculating career match',
            details: process.env.NODE_ENV === 'development' ? error.message : undefined
          });
        }
      }



// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something broke!' });
});

// Start the server
const server = app.listen(PORT, () => {
    console.log(`Server is in running on port ${PORT}`);
}).on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
        console.error(`Port ${PORT} is already in use. Please try a different port.`);
    } else {
        console.error('Error starting server:', err);
    }
});

// Handle graceful shutdown
process.on('SIGTERM', () => {
    console.info('SIGTERM signal received.');
    server.close(() => {
        console.log('Server closed.');
        pool.end();
        process.exit(0);
    });
});

module.exports = app;