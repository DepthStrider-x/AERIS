// Settings Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Check if user is logged in
    const token = localStorage.getItem('authToken');
    if (!token) {
        window.location.href = 'auth.html';
        return;
    }
    
    // Load current settings
    loadCurrentSettings();
    
    // Event listeners
    document.getElementById('settingsForm').addEventListener('submit', saveSettings);
    
    // Threshold slider
    const thresholdSlider = document.getElementById('threshold_value');
    const thresholdValueDisplay = document.getElementById('thresholdValueDisplay');
    
    if (thresholdSlider && thresholdValueDisplay) {
        thresholdSlider.addEventListener('input', function() {
            thresholdValueDisplay.textContent = this.value;
        });
    }
    
    // Avatar selection
    const avatarOptions = document.querySelectorAll('.avatar-option');
    avatarOptions.forEach(option => {
        option.addEventListener('click', function() {
            // Remove selected class from all options
            avatarOptions.forEach(opt => opt.classList.remove('selected'));
            
            // Add selected class to clicked option
            this.classList.add('selected');
            
            // Update hidden input
            const avatarPathInput = document.getElementById('avatar_path');
            avatarPathInput.value = this.dataset.avatar;
        });
    });
    
    // Mobile menu toggle
    const mobileMenu = document.getElementById('mobileMenu');
    const navCenter = document.getElementById('navCenter');
    
    if (mobileMenu && navCenter) {
        mobileMenu.addEventListener('click', () => {
            navCenter.classList.toggle('active');
            mobileMenu.innerHTML = navCenter.classList.contains('active') ? 
                '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
        });
    }
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', (event) => {
        if (navCenter && mobileMenu && navCenter.classList.contains('active')) {
            if (!navCenter.contains(event.target) && !mobileMenu.contains(event.target)) {
                navCenter.classList.remove('active');
                mobileMenu.innerHTML = '<i class="fas fa-bars"></i>';
            }
        }
    });
    
    // Search functionality
    const searchTrigger = document.querySelector('.nave-save');
    const searchDropdown = document.getElementById('searchDropdown');
    const searchClose = document.getElementById('searchClose');
    const searchInput = document.getElementById('searchInput');
    
    if (searchTrigger && searchDropdown) {
        searchTrigger.addEventListener('click', function(e) {
            e.preventDefault();
            searchDropdown.style.display = 'block';
            searchInput.focus();
        });
    }
    
    if (searchClose) {
        searchClose.addEventListener('click', function() {
            searchDropdown.style.display = 'none';
        });
    }
    
    // Close search dropdown when clicking outside
    document.addEventListener('click', function(event) {
        if (searchDropdown && searchDropdown.style.display === 'block') {
            if (!searchDropdown.contains(event.target) && !searchTrigger.contains(event.target)) {
                searchDropdown.style.display = 'none';
            }
        }
    });
});

// Load current settings
async function loadCurrentSettings() {
    try {
        const token = localStorage.getItem('authToken');
        const response = await fetch('/api/preferences', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        
        if (!response.ok) {
            throw new Error('Failed to load settings');
        }
        
        const preferences = await response.json();
        
        // Populate form with current settings
        if (preferences) {
            // Theme
            if (preferences.theme) {
                const themeRadio = document.querySelector(`input[name="theme"][value="${preferences.theme}"]`);
                if (themeRadio) themeRadio.checked = true;
            }
            
            // Temperature unit
            if (preferences.temperature_unit) {
                const tempRadio = document.querySelector(`input[name="temperature_unit"][value="${preferences.temperature_unit}"]`);
                if (tempRadio) tempRadio.checked = true;
            }
            
            // AQI scale
            if (preferences.aqi_scale) {
                const aqiRadio = document.querySelector(`input[name="aqi_scale"][value="${preferences.aqi_scale}"]`);
                if (aqiRadio) aqiRadio.checked = true;
            }
            
            // Default city
            if (preferences.default_city) {
                document.getElementById('default_city').value = preferences.default_city;
            }
            
            // Notifications enabled
            if (preferences.notifications_enabled !== undefined) {
                document.getElementById('notifications_enabled').checked = preferences.notifications_enabled == 1;
            }
            
            // Threshold value
            if (preferences.threshold_value !== undefined) {
                const thresholdSlider = document.getElementById('threshold_value');
                const thresholdValueDisplay = document.getElementById('thresholdValueDisplay');
                thresholdSlider.value = preferences.threshold_value;
                thresholdValueDisplay.textContent = preferences.threshold_value;
            }
            
            // Display toggles
            if (preferences.show_24hr_forecast !== undefined) {
                document.getElementById('show_24hr_forecast').checked = preferences.show_24hr_forecast == 1;
            }
            
            if (preferences.show_week_prediction !== undefined) {
                document.getElementById('show_week_prediction').checked = preferences.show_week_prediction == 1;
            }
            
            if (preferences.show_health_advice !== undefined) {
                document.getElementById('show_health_advice').checked = preferences.show_health_advice == 1;
            }
            
            if (preferences.show_global_compare !== undefined) {
                document.getElementById('show_global_compare').checked = preferences.show_global_compare == 1;
            }
            
            // Avatar
            if (preferences.avatar_path) {
                document.getElementById('avatar_path').value = preferences.avatar_path;
                // Select the corresponding avatar option
                const avatarOption = document.querySelector(`.avatar-option[data-avatar="${preferences.avatar_path}"]`);
                if (avatarOption) {
                    document.querySelectorAll('.avatar-option').forEach(opt => opt.classList.remove('selected'));
                    avatarOption.classList.add('selected');
                }
            }
        }
    } catch (error) {
        console.error('Error loading settings:', error);
        showSnackbar('Failed to load settings', true);
    }
}

// Save settings
async function saveSettings(event) {
    event.preventDefault();
    
    try {
        const formData = new FormData(event.target);
        const preferences = {};
        
        // Convert form data to preferences object
        for (let [key, value] of formData.entries()) {
            // Handle checkboxes (convert to 1/0)
            if (key === 'notifications_enabled' || 
                key === 'show_24hr_forecast' || 
                key === 'show_week_prediction' || 
                key === 'show_health_advice' || 
                key === 'show_global_compare') {
                preferences[key] = value ? 1 : 0;
            } else {
                preferences[key] = value;
            }
        }
        
        // Send preferences to server
        const token = localStorage.getItem('authToken');
        const response = await fetch('/api/preferences', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': `Bearer ${token}`
            },
            body: new URLSearchParams(preferences).toString()
        });
        
        if (!response.ok) {
            throw new Error('Failed to save settings');
        }
        
        // Show success message
        showSnackbar('Settings saved successfully!');
        
        // Apply settings immediately
        applySettings(preferences);
    } catch (error) {
        console.error('Error saving settings:', error);
        showSnackbar('Failed to save settings', true);
    }
}

// Apply settings immediately
function applySettings(preferences) {
    // Apply theme
    if (preferences.theme) {
        document.body.className = document.body.className.replace(/theme-\w+/g, '');
        document.body.classList.add(`theme-${preferences.theme}`);
    }
    
    // In a real implementation, you would apply other settings here
    // For example, changing temperature units, AQI scale, etc.
}

// Show snackbar notification
function showSnackbar(message, isError = false) {
    const snackbar = document.getElementById('snackbar');
    snackbar.textContent = message;
    snackbar.className = 'snackbar';
    
    if (isError) {
        snackbar.classList.add('error');
    }
    
    snackbar.classList.add('show');
    
    // Hide after 3 seconds
    setTimeout(function() {
        snackbar.classList.remove('show');
    }, 3000);
}