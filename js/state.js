// State Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Check if user is logged in
    const token = localStorage.getItem('authToken');
    
    // Add star button for saving locations if user is logged in
    if (token) {
        addStarButton();
        checkIfLocationSaved();
    }
    
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

// Add star button for saving locations
function addStarButton() {
    const locationInfo = document.querySelector('.location-info');
    if (locationInfo) {
        const starButton = document.createElement('button');
        starButton.id = 'saveLocationButton';
        starButton.className = 'star-button';
        starButton.innerHTML = '<i class="far fa-star"></i>';
        starButton.title = 'Save this location';
        
        // Insert star button after the location name
        locationInfo.insertBefore(starButton, locationInfo.firstChild.nextSibling);
        
        // Add click event listener
        starButton.addEventListener('click', toggleLocationSave);
    }
}

// Check if current location is saved
async function checkIfLocationSaved() {
    const token = localStorage.getItem('authToken');
    if (!token) return;
    
    // Get the current state name from the page
    const stateNameElement = document.getElementById('stateName');
    if (!stateNameElement) return;
    
    const locationName = stateNameElement.textContent.trim();
    if (!locationName) return;
    
    try {
        const response = await fetch(`/api/location-check/${encodeURIComponent(locationName)}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        
        if (response.ok) {
            const result = await response.json();
            const starButton = document.getElementById('saveLocationButton');
            
            if (starButton) {
                if (result.saved) {
                    starButton.innerHTML = '<i class="fas fa-star"></i>';
                    starButton.classList.add('saved');
                } else {
                    starButton.innerHTML = '<i class="far fa-star"></i>';
                    starButton.classList.remove('saved');
                }
            }
        }
    } catch (error) {
        console.error('Error checking if location is saved:', error);
    }
}

// Toggle location save status
async function toggleLocationSave() {
    const token = localStorage.getItem('authToken');
    if (!token) {
        // Redirect to login page if not logged in
        window.location.href = 'auth.html';
        return;
    }
    
    const starButton = document.getElementById('saveLocationButton');
    if (!starButton) return;
    
    // Get the current state name from the page
    const stateNameElement = document.getElementById('stateName');
    if (!stateNameElement) return;
    
    const locationName = stateNameElement.textContent.trim();
    if (!locationName) return;
    
    try {
        // Check current status
        const isSaved = starButton.classList.contains('saved');
        
        if (isSaved) {
            // Remove location (we would need the location ID for this)
            // For now, we'll just change the UI
            starButton.innerHTML = '<i class="far fa-star"></i>';
            starButton.classList.remove('saved');
            
            // In a full implementation, you would send a request to remove the location
            console.log('Removing location:', locationName);
        } else {
            // Save location
            const response = await fetch('/api/locations', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': `Bearer ${token}`
                },
                body: new URLSearchParams({
                    location_name: locationName
                })
            });
            
            if (response.ok) {
                starButton.innerHTML = '<i class="fas fa-star"></i>';
                starButton.classList.add('saved');
            } else {
                console.error('Failed to save location');
            }
        }
    } catch (error) {
        console.error('Error toggling location save status:', error);
    }
}