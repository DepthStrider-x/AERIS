const db = require('./db');

// Get user preferences
function getUserPreferences(userId) {
    return new Promise((resolve, reject) => {
        db.get(`
            SELECT theme, temperature_unit, aqi_scale, default_city, notifications_enabled, 
                   threshold_value, show_24hr_forecast, show_week_prediction, show_health_advice, 
                   show_global_compare, avatar_path
            FROM preferences WHERE user_id = ?
        `, [userId], (err, prefs) => {
            if (err) {
                return reject(err);
            }
            resolve(prefs);
        });
    });
}

// Update user preferences
function updateUserPreferences(userId, preferences) {
    return new Promise((resolve, reject) => {
        const fields = [];
        const values = [];
        
        // Build dynamic query based on provided preferences
        for (const [key, value] of Object.entries(preferences)) {
            fields.push(`${key} = ?`);
            values.push(value);
        }
        
        // Add user_id and updated_at
        values.push(userId);
        
        const query = `
            UPDATE preferences 
            SET ${fields.join(', ')}, updated_at = CURRENT_TIMESTAMP 
            WHERE user_id = ?
        `;
        
        const stmt = db.prepare(query);
        stmt.run(values, function(err) {
            if (err) {
                return reject(err);
            }
            resolve({ updated: this.changes > 0 });
        });
    });
}

module.exports = {
    getUserPreferences,
    updateUserPreferences
};