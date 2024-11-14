// routes/careerMatch.js
const express = require('express');
const router = express.Router();
const mysql = require('mysql2/promise');
const dotenv = require('dotenv').config();


// Database configuration
const dbConfig = {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'career_manage'
};
const pool = mysql.createPool(dbConfig);

// Get all students with their skills
router.get('/students', async (req, res) => {
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

// Get student skills by ID
router.get('/students/:id', async (req, res) => {
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
// router.get('/students', async (req, res) => {
//     try {
//       console.log('Fetching students from database...');
//       const [rows] = await connection.query('SELECT * FROM student_skill_summary');
//             const formattedData = rows.map(row => ({
//                 student_id: row.student_id,
//                 student_name: row.student_name,
//                 total_skills: row.total_skills,
//                 skills: row.skills ? row.skills.split(',') : [],
//                 proficiency_levels: row.proficiency_levels ? row.proficiency_levels.split(',') : []
//             }));
//             res.json(formattedData)
//     } catch (error) {
//       console.error('Error fetching students:', error);
//       res.status(500).json({ error: error.message });
//     }
//   });
  
  // Get student academic details
  router.get('/students/:id/academic', async (req, res) => {
    try {
      console.log(`Fetching academic details for student ID: ${req.params.id}`);
      const [rows] = await pool.query(
        'SELECT * FROM student_academic_summary WHERE student_id = ?',
        [req.params.id]
      );
      if (rows.length === 0) {
        console.log(`No student found with ID: ${req.params.id}`);
        return res.status(404).json({ message: 'Student not found' });
      }
      console.log('Fetched student academic details.');
      res.json(rows[0]);
    } catch (error) {
      console.error('Error fetching student academic details:', error);
      res.status(500).json({ error: error.message });
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
router.get('/jobs', async (req, res) => {
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
router.get('/jobs/:id', validateJobId, async (req, res) => {
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

// Get all available jobs
router.get('/jobs', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM job_summary');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get specific job details
router.get('/jobs/:id', async (req, res) => {
  try {
    const [rows] = await pool.query(
      'SELECT * FROM job_summary WHERE job_id = ?',
      [req.params.id]
    );
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Job not found' });
    }
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Calculate career match score
router.post('/calculate-match', async (req, res) => {
  const { studentId, jobId } = req.body;
  
  if (!studentId || !jobId) {
    return res.status(400).json({ error: 'Student ID and Job ID are required' });
  }

  try {
    // First verify if student and job exist
    const [[student], [job]] = await Promise.all([
      pool.query('SELECT student_id FROM students WHERE student_id = ?', [studentId]),
      pool.query('SELECT job_id FROM job_listings WHERE job_id = ?', [jobId])
    ]);

    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }
    if (!job) {
      return res.status(404).json({ error: 'Job not found' });
    }

    // Calculate match score
    const [result] = await pool.query(
      'CALL CalculateCareerMatchScore(?, ?, @match_score); SELECT @match_score as match_score;',
      [studentId, jobId]
    );
    
    res.json({ matchScore: result[1][0].match_score });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get match history for a student
router.get('/match-history/:studentId', async (req, res) => {
  try {
    const [rows] = await pool.query(
      `SELECT 
        mh.*,
        j.job_title,
        j.company_name
       FROM match_history mh
       JOIN job_listings j ON mh.job_id = j.job_id
       WHERE mh.student_id = ?
       ORDER BY mh.calculated_at DESC`,
      [req.params.studentId]
    );
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get detailed match analysis
router.get('/match-analysis/:studentId/:jobId', async (req, res) => {
  try {
    const [rows] = await pool.query(
      `SELECT 
        skill_score,
        project_score,
        academic_score,
        additional_score,
        match_score,
        calculated_at
       FROM match_history
       WHERE student_id = ? AND job_id = ?
       ORDER BY calculated_at DESC
       LIMIT 1`,
      [req.params.studentId, req.params.jobId]
    );
    
    if (rows.length === 0) {
      return res.status(404).json({ message: 'No match analysis found' });
    }
    
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;