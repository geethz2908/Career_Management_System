const mysql = require('mysql2');
const cors = require('cors');
// Database connection
require('dotenv').config();

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD ,
    database: process.env.DB_NAME
});

// Sample company data
// const sampleCompanies = [
//     {
//         company_id: 'TECH001',
//         company_name: 'TechCorp Solutions',
//         industry: 'Technology',
//         company_description: 'Leading provider of innovative software solutions',
//         image_path: null
//     },
//     {
//         company_id: 'FIN002',
//         company_name: 'Financial Dynamics',
//         industry: 'Finance',
//         company_description: 'Expert financial services and consulting',
//         image_path: null
//     },
//     {
//         company_id: 'HEALTH003',
//         company_name: 'HealthCare Plus',
//         industry: 'Healthcare',
//         company_description: 'Advanced healthcare solutions and services',
//         image_path: null
//     }
// ];

// // Insert sample data
// const insertSampleData = () => {
//     sampleCompanies.forEach(company => {
//         db.query(
//             'INSERT INTO COMPANIES (company_id, company_name, industry, company_description, image_path) VALUES (?, ?, ?, ?, ?)',
//             [company.company_id, company.company_name, company.industry, company.company_description, company.image_path],
//             (err, result) => {
//                 if (err) {
//                     console.error(`Error inserting company ${company.company_name}:`, err);
//                 } else {
//                     console.log(`Successfully inserted company ${company.company_name}`);
//                 }
//             }
//         );
//     });
// };





// Connect to database and insert data
db.connect((err) => {
    if (err) {
        console.error('Error connecting to database:', err);
        return;
    }
    console.log('Connected to database');
    insertSampleData();
});

// Close the connection after 5 seconds (giving time for inserts to complete)
setTimeout(() => {
    db.end((err) => {
        if (err) {
            console.error('Error closing connection:', err);
            return;
        }
        console.log('Database connection closed');
    });
}, 5000);