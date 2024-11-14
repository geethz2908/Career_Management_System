// server.js or index.js
const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

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
app.get('/api/student-skills', async (req, res) => {
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

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something broke!' });
});

// Start the server
const server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
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