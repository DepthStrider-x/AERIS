const db = require('./db');

// Get user by ID
function getUserById(userId) {
    return new Promise((resolve, reject) => {
        db.get(`
            SELECT u.id, u.name, u.email, u.created_at, p.theme, p.temperature_unit, 
                   p.aqi_scale, p.default_city, p.notifications_enabled, p.threshold_value,
                   p.show_24hr_forecast, p.show_week_prediction, p.show_health_advice, 
                   p.show_global_compare, p.avatar_path
            FROM users u
            LEFT JOIN preferences p ON u.id = p.user_id
            WHERE u.id = ?
        `, [userId], (err, user) => {
            if (err) {
                return reject(err);
            }
            resolve(user);
        });
    });
}

// Update user profile
function updateUserProfile(userId, name) {
    return new Promise((resolve, reject) => {
        const stmt = db.prepare('UPDATE users SET name = ? WHERE id = ?');
        stmt.run([name, userId], function(err) {
            if (err) {
                return reject(err);
            }
            resolve({ updated: this.changes > 0 });
        });
    });
}

module.exports = {
    getUserById,
    updateUserProfile
};