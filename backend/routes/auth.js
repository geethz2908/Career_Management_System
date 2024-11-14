// auth.js
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const mysql = require('mysql2/promise');
require('dotenv').config();

// Create MySQL connection pool
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Create necessary tables if they don't exist
async function initializeDatabase() {
  try {
    const connection = await pool.getConnection();
    
    // Changed table name from companies to company_auth
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS company_auth (
        id INT AUTO_INCREMENT PRIMARY KEY,
        company_id VARCHAR(50) UNIQUE NOT NULL,
        company_name VARCHAR(100) NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        google_id VARCHAR(100),
        facebook_id VARCHAR(100),
        apple_id VARCHAR(100),
        reset_token VARCHAR(255),
        reset_token_expires TIMESTAMP
      )
    `);

    connection.release();
    console.log('Database initialized successfully');
  } catch (error) {
    console.error('Database initialization error:', error);
    throw error;
  }
}

// Middleware to verify JWT token
const authenticateToken = async (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Updated table name in query
    const [companies] = await pool.execute(
      'SELECT id, company_id, company_name, email FROM company_auth WHERE company_id = ?',
      [decoded.companyId]
    );

    if (companies.length === 0) {
      return res.status(401).json({ message: 'Invalid token' });
    }

    req.company = companies[0];
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};

// Register new company
const registerCompany = async (req, res) => {
  const connection = await pool.getConnection();
  try {
    const { companyId, companyName, email, password } = req.body;

    // Updated table name in queries
    const [existingCompanies] = await connection.execute(
      'SELECT * FROM company_auth WHERE email = ? OR company_id = ?',
      [email, companyId]
    );

    if (existingCompanies.length > 0) {
      return res.status(400).json({ 
        message: 'Company with this email or ID already exists' 
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const [result] = await connection.execute(
      'INSERT INTO company_auth (company_id, company_name, email, password) VALUES (?, ?, ?, ?)',
      [companyId, companyName, email, hashedPassword]
    );

    const token = jwt.sign(
      { companyId: companyId },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.status(201).json({
      message: 'Company registered successfully',
      token,
      company: {
        companyId,
        companyName,
        email
      }
    });

  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Error registering company' });
  } finally {
    connection.release();
  }
};

// Login company
const loginCompany = async (req, res) => {
  const connection = await pool.getConnection();
  try {
    const { email, password, companyId } = req.body;

    // Updated table name in query
    const [companies] = await connection.execute(
      'SELECT * FROM company_auth WHERE email = ? AND company_id = ?',
      [email, companyId]
    );

    if (companies.length === 0) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const company = companies[0];

    const validPassword = await bcrypt.compare(password, company.password);
    if (!validPassword) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { companyId: company.company_id },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({
      message: 'Logged in successfully',
      token,
      company: {
        companyId: company.company_id,
        companyName: company.company_name,
        email: company.email
      }
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Error during login' });
  } finally {
    connection.release();
  }
};

// Request password reset
const requestPasswordReset = async (req, res) => {
  const connection = await pool.getConnection();
  try {
    const { email } = req.body;

    // Updated table name in query
    const [companies] = await connection.execute(
      'SELECT * FROM company_auth WHERE email = ?',
      [email]
    );

    if (companies.length === 0) {
      return res.status(404).json({ message: 'Company not found' });
    }

    const resetToken = jwt.sign(
      { companyId: companies[0].company_id },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    // Updated table name in query
    await connection.execute(
      'UPDATE company_auth SET reset_token = ?, reset_token_expires = DATE_ADD(NOW(), INTERVAL 1 HOUR) WHERE email = ?',
      [resetToken, email]
    );

    res.json({ 
      message: 'Password reset instructions sent to email',
      resetToken // Remove in production
    });

  } catch (error) {
    console.error('Password reset request error:', error);
    res.status(500).json({ message: 'Error processing password reset' });
  } finally {
    connection.release();
  }
};

// Reset password
const resetPassword = async (req, res) => {
  const connection = await pool.getConnection();
  try {
    const { resetToken, newPassword } = req.body;

    // Updated table name in queries
    const [companies] = await connection.execute(
      'SELECT * FROM company_auth WHERE reset_token = ? AND reset_token_expires > NOW()',
      [resetToken]
    );

    if (companies.length === 0) {
      return res.status(400).json({ message: 'Invalid or expired reset token' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    await connection.execute(
      'UPDATE company_auth SET password = ?, reset_token = NULL, reset_token_expires = NULL WHERE reset_token = ?',
      [hashedPassword, resetToken]
    );

    res.json({ message: 'Password updated successfully' });

  } catch (error) {
    console.error('Password reset error:', error);
    res.status(500).json({ message: 'Error resetting password' });
  } finally {
    connection.release();
  }
};

// Social login
const socialLogin = async (req, res) => {
  const connection = await pool.getConnection();
  try {
    const { provider } = req.params;
    const { token, email, name } = req.body;

    // Updated table name in queries
    let [companies] = await connection.execute(
      'SELECT * FROM company_auth WHERE email = ?',
      [email]
    );

    let company;
    if (companies.length === 0) {
      const companyId = 'CP' + Date.now();
      const defaultPassword = await bcrypt.hash(Date.now().toString(), 10);
      
      const [result] = await connection.execute(
        `INSERT INTO company_auth (company_id, company_name, email, password, ${provider}_id) 
         VALUES (?, ?, ?, ?, ?)`,
        [companyId, name, email, defaultPassword, token]
      );

      [companies] = await connection.execute(
        'SELECT * FROM company_auth WHERE id = ?',
        [result.insertId]
      );
    }
    
    company = companies[0];

    const jwtToken = jwt.sign(
      { companyId: company.company_id },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({
      message: 'Logged in successfully',
      token: jwtToken,
      company: {
        companyId: company.company_id,
        companyName: company.company_name,
        email: company.email
      }
    });

  } catch (error) {
    console.error('Social login error:', error);
    res.status(500).json({ message: 'Error during social login' });
  } finally {
    connection.release();
  }
};

module.exports = {
  initializeDatabase,
  authenticateToken,
  registerCompany,
  loginCompany,
  requestPasswordReset,
  resetPassword,
  socialLogin
};