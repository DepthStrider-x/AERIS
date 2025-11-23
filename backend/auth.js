const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('./db');

const SECRET_KEY = 'aqi_dashboard_secret_key'; // In production, use environment variable

// Register a new user
async function registerUser(name, email, password) {
    return new Promise((resolve, reject) => {
        // Hash the password
        bcrypt.hash(password, 10, (err, hash) => {
            if (err) {
                return reject(err);
            }
            
            // Insert user into database
            const stmt = db.prepare('INSERT INTO users (name, email, password_hash) VALUES (?, ?, ?)');
            stmt.run([name, email, hash], function(err) {
                if (err) {
                    return reject(err);
                }
                
                const userId = this.lastID;
                
                // Create default preferences for the user
                const prefStmt = db.prepare(`INSERT INTO preferences (user_id) VALUES (?)`);
                prefStmt.run([userId], function(prefErr) {
                    if (prefErr) {
                        return reject(prefErr);
                    }
                    
                    resolve({ id: userId, name, email });
                });
            });
        });
    });
}

// Authenticate user login
async function authenticateUser(email, password) {
    return new Promise((resolve, reject) => {
        // Find user by email
        db.get('SELECT id, name, email, password_hash FROM users WHERE email = ?', [email], (err, user) => {
            if (err) {
                return reject(err);
            }
            
            if (!user) {
                return reject(new Error('User not found'));
            }
            
            // Compare passwords
            bcrypt.compare(password, user.password_hash, (err, result) => {
                if (err) {
                    return reject(err);
                }
                
                if (!result) {
                    return reject(new Error('Invalid password'));
                }
                
                // Generate JWT token
                const token = jwt.sign(
                    { userId: user.id, email: user.email },
                    SECRET_KEY,
                    { expiresIn: '24h' }
                );
                
                resolve({
                    token,
                    user: {
                        id: user.id,
                        name: user.name,
                        email: user.email
                    }
                });
            });
        });
    });
}

// Verify JWT token
function verifyToken(token) {
    try {
        return jwt.verify(token, SECRET_KEY);
    } catch (err) {
        throw new Error('Invalid token');
    }
}

// Get user by ID
function getUserById(userId) {
    return new Promise((resolve, reject) => {
        db.get('SELECT id, name, email, created_at FROM users WHERE id = ?', [userId], (err, user) => {
            if (err) {
                return reject(err);
            }
            resolve(user);
        });
    });
}

module.exports = {
    registerUser,
    authenticateUser,
    verifyToken,
    getUserById
};