// Account Dashboard JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Check if user is logged in
    const token = localStorage.getItem('authToken');
    if (!token) {
        window.location.href = 'auth.html';
        return;
    }
    
    // Load user data
    loadUserData();
    
    // Load saved locations
    loadSavedLocations();
    
    // Event listeners
    document.getElementById('openSettings').addEventListener('click', function() {
        window.location.href = 'settings.html';
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

// Load user data
async function loadUserData() {
    try {
        const token = localStorage.getItem('authToken');
        const response = await fetch('/api/user', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        
        if (!response.ok) {
            throw new Error('Failed to load user data');
        }
        
        const userData = await response.json();
        
        // Update UI with user data
        document.getElementById('userName').textContent = userData.name;
        document.getElementById('userEmail').textContent = userData.email;
        
        // Format and display member since date
        const createdAt = new Date(userData.created_at);
        document.getElementById('memberSince').textContent = createdAt.toLocaleDateString();
        
        // Update avatar
        const avatarImg = document.getElementById('userAvatar');
        if (userData.avatar_path) {
            avatarImg.src = userData.avatar_path;
        } else {
            avatarImg.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(userData.name)}&background=random`;
        }
        
        // Update notifications status
        const notificationsStatus = document.getElementById('notificationsStatus');
        notificationsStatus.textContent = userData.notifications_enabled ? 'Enabled' : 'Disabled';
        
        // Update default city
        if (userData.default_city) {
            document.getElementById('defaultCity').textContent = userData.default_city;
        }
    } catch (error) {
        console.error('Error loading user data:', error);
        // Redirect to login if unauthorized
        if (error.message.includes('Failed to load user data')) {
            localStorage.removeItem('authToken');
            window.location.href = 'auth.html';
        }
    }
}

// Load saved locations
async function loadSavedLocations() {
    try {
        const token = localStorage.getItem('authToken');
        const response = await fetch('/api/locations', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        
        if (!response.ok) {
            throw new Error('Failed to load saved locations');
        }
        
        const locations = await response.json();
        
        // Update saved locations count
        document.getElementById('savedCitiesCount').textContent = locations.length;
        
        // Display locations
        const container = document.getElementById('savedLocationsContainer');
        const emptyState = document.getElementById('emptyLocations');
        
        if (locations.length === 0) {
            emptyState.style.display = 'block';
            return;
        }
        
        emptyState.style.display = 'none';
        
        // Clear existing locations
        container.innerHTML = '';
        
        // Add locations to container
        locations.forEach(location => {
            const locationCard = document.createElement('div');
            locationCard.className = 'location-card';
            locationCard.innerHTML = `
                <div class="location-icon">
                    <i class="fas fa-map-marker-alt"></i>
                </div>
                <div class="location-name">${location.location_name}</div>
            `;
            
            // Add click event to open state page
            locationCard.addEventListener('click', function() {
                // For now, we'll just log the location name
                console.log('Opening location:', location.location_name);
                // In a real implementation, you would redirect to the state page
                // window.location.href = `state.html?name=${encodeURIComponent(location.location_name)}`;
            });
            
            container.appendChild(locationCard);
        });
    } catch (error) {
        console.error('Error loading saved locations:', error);
    }
}

// Update the logout function to redirect to index.html
async function logout() {
    const token = localStorage.getItem('authToken');
    
    if (token) {
        try {
            await fetch('/api/auth/logout', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
        } catch (error) {
            console.error('Error during logout:', error);
        }
    }
    
    localStorage.removeItem('authToken');
    // Redirect to index.html instead of showing logged-out dropdown
    window.location.href = 'index.html';
}