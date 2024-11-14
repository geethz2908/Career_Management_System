// const express = require('express');
// const router = express.Router();
// const multer = require('multer');
// const path = require('path');
// const fs = require('fs');

// // Database connection
// const db = require('../config/database');

// // Configure multer for file upload
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         const dir = './uploads';
//         if (!fs.existsSync(dir)) {
//             fs.mkdirSync(dir);
//         }
//         cb(null, dir);
//     },
//     filename: (req, file, cb) => {
//         cb(null, Date.now() + '-' + file.originalname);
//     }
// });

// const upload = multer({
//     storage: storage,
//     fileFilter: (req, file, cb) => {
//         const allowedTypes = /jpeg|jpg|png|gif/;
//         const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
//         const mimetype = allowedTypes.test(file.mimetype);
        
//         if (extname && mimetype) {
//             return cb(null, true);
//         } else {
//             cb('Error: Images only!');
//         }
//     }
// });

// // Create companies table if it doesn't exist
// router.once('mount', () => {
//     db.query(`
//         CREATE TABLE IF NOT EXISTS COMPANIES (
//             company_id VARCHAR(50) PRIMARY KEY,
//             company_name VARCHAR(100) NOT NULL,
//             industry VARCHAR(100) NOT NULL,
//             company_description TEXT,
//             image_path VARCHAR(255)
//         )
//     `, (err) => {
//         if (err) {
//             console.error('Error creating companies table:', err);
//         } else {
//             console.log('Companies table checked/created successfully');
//         }
//     });
// });

// // Get all companies
// router.get('/', (req, res) => {
//     console.log('Fetching all companies...'); // Debug log
    
//     // Use a promise to handle the query
//     const query = 'SELECT * FROM COMPANIES';
    
//     db.query(query, [], (err, results) => {
//         if (err) {
//             console.error('Database error:', err);
//             return res.status(500).json({ error: 'Failed to fetch companies' });
//         }
        
//         console.log('Query results:', results); // Debug log
        
//         if (!results) {
//             console.log('No results found');
//             return res.json([]);
//         }
        
//         // Ensure we're sending an empty array if no results
//         const companies = results || [];
//         console.log('Sending response:', companies); // Debug log
        
//         return res.json(companies);
//     });
// });

// // Get a specific company
// router.get('/:id', (req, res) => {
//     const companyId = req.params.id;
//     db.query('SELECT * FROM COMPANIES WHERE company_id = ?', [companyId], (err, result) => {
//         if (err) {
//             console.error('Error fetching company:', err);
//             return res.status(500).json({ error: 'Error fetching company' });
//         }
//         if (result.length === 0) {
//             return res.status(404).json({ error: 'Company not found' });
//         }
//         return res.json(result[0]);
//     });
// });

// // Add a new company
// router.post('/', upload.single('companyImage'), (req, res) => {
//     const { companyId, companyName, industry, companyDescription } = req.body;
//     const imagePath = req.file ? `/uploads/${req.file.filename}` : null;

//     console.log('Received company data:', { companyId, companyName, industry, companyDescription, imagePath }); // Debug log

//     db.query(
//         'INSERT INTO COMPANIES (company_id, company_name, industry, company_description, image_path) VALUES (?, ?, ?, ?, ?)',
//         [companyId, companyName, industry, companyDescription, imagePath],
//         (err, result) => {
//             if (err) {
//                 console.error('Error adding company:', err);
//                 return res.status(500).json({ error: 'Error adding company' });
//             }
//             res.json({ message: 'Company added successfully', imagePath });
//         }
//     );
// });

// // Update a company
// router.put('/:id', upload.single('companyImage'), (req, res) => {
//     const companyId = req.params.id;
//     const { companyName, industry, companyDescription } = req.body;
//     const imagePath = req.file ? `/uploads/${req.file.filename}` : null;

//     db.query('SELECT image_path FROM COMPANIES WHERE company_id = ?', [companyId], (err, result) => {
//         if (err) {
//             console.error('Error fetching company:', err);
//             return res.status(500).json({ error: 'Error fetching company' });
//         }

//         if (imagePath && result[0]?.image_path) {
//             const oldImagePath = path.join(__dirname, '..', result[0].image_path);
//             if (fs.existsSync(oldImagePath)) {
//                 fs.unlinkSync(oldImagePath);
//             }
//         }

//         const updateQuery = imagePath 
//             ? 'UPDATE COMPANIES SET company_name = ?, industry = ?, company_description = ?, image_path = ? WHERE company_id = ?'
//             : 'UPDATE COMPANIES SET company_name = ?, industry = ?, company_description = ? WHERE company_id = ?';
        
//         const updateValues = imagePath 
//             ? [companyName, industry, companyDescription, imagePath, companyId]
//             : [companyName, industry, companyDescription, companyId];

//         db.query(updateQuery, updateValues, (updateErr, updateResult) => {
//             if (updateErr) {
//                 console.error('Error updating company:', updateErr);
//                 return res.status(500).json({ error: 'Error updating company' });
//             }
//             res.json({ message: 'Company updated successfully', imagePath });
//         });
//     });
// });

// // Delete a company
// router.delete('/:id', (req, res) => {
//     const companyId = req.params.id;

//     db.query('SELECT image_path FROM COMPANIES WHERE company_id = ?', [companyId], (err, result) => {
//         if (err) {
//             console.error('Error fetching company:', err);
//             return res.status(500).json({ error: 'Error fetching company' });
//         }

//         if (result[0]?.image_path) {
//             const imagePath = path.join(__dirname, '..', result[0].image_path);
//             if (fs.existsSync(imagePath)) {
//                 fs.unlinkSync(imagePath);
//             }
//         }

//         db.query('DELETE FROM COMPANIES WHERE company_id = ?', [companyId], (deleteErr, deleteResult) => {
//             if (deleteErr) {
//                 console.error('Error deleting company:', deleteErr);
//                 return res.status(500).json({ error: 'Error deleting company' });
//             }
//             res.json({ message: 'Company deleted successfully' });
//         });
//     });
// });

// module.exports = router;