const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
const port = 5001;

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'roshr1331',
    database: 'career_manage'
});

app.get('/', (req, res) => {
    res.send("Hello from the server!");
});


app.get('/students', (req, res) => {
    db.query('SELECT * FROM STUDENTS', (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).send(err);
        }else{
        return res.send(result);
        }
    }
    );  
});

app.post('/add-student', (req, res) => {
    const { student_id, student_name, email, password, gender } = req.body;
    db.query(
        'INSERT INTO STUDENTS (student_id, student_name, email, password, gender) VALUES (?, ?, ?, ?, ?)',
        [student_id, student_name, email, password, gender],
        (err, result) => {
            if (err) {
                console.log(err);
                res.status(500).send(err);
            } else {
                res.send("Student added successfully!");
            }
        }
    );
});

// Add similar routes for other tables
// Route to add academic performance
app.post('/add-academic-performance', (req, res) => {
    const { student_id, gpa, credits_completed, programming_concepts_percentage, 
            algorithms_concepts_percentage, software_engineering_percentage, 
            computer_network_percentage, electronic_subjects_percentage, 
            computer_architecture_percentage, mathematics_percentage, 
            communication_skills_percentage, operating_systems_percentage } = req.body;

    db.query(
        `INSERT INTO ACADEMIC_PERFORMANCE 
        (student_id, gpa, credits_completed, programming_concepts_percentage, 
         algorithms_concepts_percentage, software_engineering_percentage, 
         computer_network_percentage, electronic_subjects_percentage, 
         computer_architecture_percentage, mathematics_percentage, 
         communication_skills_percentage, operating_systems_percentage)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [student_id, gpa, credits_completed, programming_concepts_percentage, 
         algorithms_concepts_percentage, software_engineering_percentage, 
         computer_network_percentage, electronic_subjects_percentage, 
         computer_architecture_percentage, mathematics_percentage, 
         communication_skills_percentage, operating_systems_percentage],
        (err, result) => {
            if (err) {
                console.error("Error executing query:", err);
                res.status(500).send("Error adding academic performance. Please check server logs.");
            } else {
                res.send("Academic performance added successfully!");
            }
        }
    );
});


app.post('/add-projects', (req, res) => {
    const{project_id, project_name,domain_name} = req.body;
    db.query(
        'INSERT INTO PROJECTS (project_id, project_name, domain_name) VALUES (?, ?, ?)',
        [project_id, project_name, domain_name],
        (err, result) => {
            if (err) {
                console.log(err);
                res.status(500).send(err);
            } else {
                res.send("Project added successfully!");
            }
        }
    );
}
);

app.post('/add-skill', (req, res) => {
    const { skill_id, skill_name, proficiency_level, certifications } = req.body;
    db.query(
        'INSERT INTO SKILLS (skill_id, skill_name, proficiency_level, certifications) VALUES (?, ?, ?, ?)',
        [skill_id, skill_name, proficiency_level, certifications],
        (err, result) => {
            if (err) {
                console.log(err);
                res.status(500).send(err);
            } else {
                res.send("Skill added successfully!");
            }
        }
    );
});

// Get all skills
app.get('/skills', (req, res) => {
    db.query('SELECT * FROM SKILLS', (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).send(err);
        }
        return res.send(result);
    });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
