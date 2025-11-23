const db = require('./db');

// Get saved locations for a user
function getSavedLocations(userId) {
    return new Promise((resolve, reject) => {
        db.all('SELECT id, location_name, created_at FROM saved_locations WHERE user_id = ? ORDER BY created_at DESC', [userId], (err, locations) => {
            if (err) {
                return reject(err);
            }
            resolve(locations);
        });
    });
}

// Save a location for a user
function saveLocation(userId, locationName) {
    return new Promise((resolve, reject) => {
        const stmt = db.prepare('INSERT INTO saved_locations (user_id, location_name) VALUES (?, ?)');
        stmt.run([userId, locationName], function(err) {
            if (err) {
                return reject(err);
            }
            resolve({ id: this.lastID, location_name: locationName });
        });
    });
}

// Remove a saved location
function removeLocation(userId, locationId) {
    return new Promise((resolve, reject) => {
        const stmt = db.prepare('DELETE FROM saved_locations WHERE user_id = ? AND id = ?');
        stmt.run([userId, locationId], function(err) {
            if (err) {
                return reject(err);
            }
            resolve({ removed: this.changes > 0 });
        });
    });
}

// Check if a location is saved
function isLocationSaved(userId, locationName) {
    return new Promise((resolve, reject) => {
        db.get('SELECT id FROM saved_locations WHERE user_id = ? AND location_name = ?', [userId, locationName], (err, location) => {
            if (err) {
                return reject(err);
            }
            resolve(!!location);
        });
    });
}

module.exports = {
    getSavedLocations,
    saveLocation,
    removeLocation,
    isLocationSaved
};