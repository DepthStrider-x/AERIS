const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const dbPath = path.join(__dirname, '..', 'aqi_users.db');
const db = new sqlite3.Database(dbPath);

// Initialize database tables
db.serialize(() => {
    // Create users table
    db.run(`CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password_hash TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);
    
    // Create preferences table
    db.run(`CREATE TABLE IF NOT EXISTS preferences (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER,
        theme TEXT DEFAULT 'system',
        temperature_unit TEXT DEFAULT 'C',
        aqi_scale TEXT DEFAULT 'US',
        default_city TEXT,
        notifications_enabled INTEGER DEFAULT 1,
        threshold_value INTEGER DEFAULT 100,
        show_24hr_forecast INTEGER DEFAULT 1,
        show_week_prediction INTEGER DEFAULT 1,
        show_health_advice INTEGER DEFAULT 1,
        show_global_compare INTEGER DEFAULT 1,
        avatar_path TEXT,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users (id)
    )`);
    
    // Create saved_locations table
    db.run(`CREATE TABLE IF NOT EXISTS saved_locations (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER,
        location_name TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users (id)
    )`);
});

module.exports = db;