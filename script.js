// DOM Elements
const aqiCircle = document.getElementById('aqiCircle');
const aqiNumber = document.getElementById('aqiNumber');
const aqiCategory = document.getElementById('aqiCategory');
const updatedTime = document.getElementById('updatedTime');
const detailedInfo = document.getElementById('detailedInfo');
const advicePlaceholder = document.getElementById('advicePlaceholder');
const adviceContent = document.getElementById('adviceContent');
const characterImage = document.getElementById('characterImage');
const aqiCharacter = document.getElementById('aqiCharacter');

// Mobile menu elements
const mobileMenu = document.getElementById('mobileMenu');
const navCenter = document.getElementById('navCenter');

// Back button element
const backButton = document.getElementById('backButton');

// Account dropdown elements
const accountTrigger = document.getElementById('accountTrigger');
const accountDropdown = document.getElementById('accountDropdown');
const accountText = document.getElementById('accountText');

// Notification dropdown elements
const notificationBell = document.getElementById('notificationBell');
const notificationDropdown = document.getElementById('notificationDropdown');

// Detail elements
const detailHumidity = document.getElementById('detailHumidity');
const detailTemp = document.getElementById('detailTemp');
const detailWind = document.getElementById('detailWind');
const detailPm25 = document.getElementById('detailPm25');
const detailPm10 = document.getElementById('detailPm10');

// Weather elements
const humidity = document.getElementById('humidity');
const windSpeed = document.getElementById('windSpeed');
const uvIndex = document.getElementById('uvIndex');
const pm25 = document.getElementById('pm25');
const pm10 = document.getElementById('pm10');

// Toggle mobile menu
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

// Account dropdown functionality
if (accountTrigger && accountDropdown) {
    accountTrigger.addEventListener('click', function(e) {
        e.preventDefault();
        accountDropdown.classList.toggle('show');
    });
    
    // Close dropdown when clicking outside
    document.addEventListener('click', function(e) {
        if (!accountTrigger.contains(e.target) && !accountDropdown.contains(e.target)) {
            accountDropdown.classList.remove('show');
        }
    });
    
    // Initialize account dropdown
    initializeAccountDropdown();
}

// Notification dropdown functionality
if (notificationBell && notificationDropdown) {
    notificationBell.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        // Toggle the dropdown
        notificationDropdown.classList.toggle('show');
        
        // Add a slight delay before focusing to ensure the dropdown is visible
        if (notificationDropdown.classList.contains('show')) {
            setTimeout(() => {
                notificationDropdown.focus();
            }, 100);
        }
    });
    
    // Close dropdown when clicking outside
    document.addEventListener('click', function(e) {
        if (notificationDropdown.classList.contains('show') && 
            !notificationBell.contains(e.target) && 
            !notificationDropdown.contains(e.target)) {
            notificationDropdown.classList.remove('show');
        }
    });
    
    // Close dropdown when pressing Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && notificationDropdown.classList.contains('show')) {
            notificationDropdown.classList.remove('show');
            notificationBell.focus();
        }
    });
    
    // Prevent dropdown from closing when clicking inside it
    notificationDropdown.addEventListener('click', function(e) {
        e.stopPropagation();
    });
}

// Google Maps functionality
function openGoogleMaps() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            function(position) {
                const lat = position.coords.latitude;
                const lng = position.coords.longitude;
                const googleMapsUrl = `https://www.google.com/maps?q=${lat},${lng}`;
                window.open(googleMapsUrl, '_blank');
            },
            function(error) {
                // If geolocation fails, open Google Maps without location
                console.error('Geolocation error:', error);
                window.open('https://www.google.com/maps', '_blank');
            }
        );
    } else {
        // If geolocation is not supported, open Google Maps without location
        window.open('https://www.google.com/maps', '_blank');
    }
}

// Add event listener for Google Maps link
document.addEventListener('DOMContentLoaded', function() {
    const googleMapsLink = document.getElementById('googleMapsLink');
    if (googleMapsLink) {
        googleMapsLink.addEventListener('click', function(e) {
            e.preventDefault();
            openGoogleMaps();
        });
    }
});

// Initialize account dropdown based on login status
async function initializeAccountDropdown() {
    const token = localStorage.getItem('authToken');
    
    if (token) {
        // User is logged in
        try {
            const response = await fetch('/api/user', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            
            if (response.ok) {
                const userData = await response.json();
                accountText.textContent = userData.name;
                
                // Populate dropdown with logged-in content
                accountDropdown.innerHTML = `
                    <div class="user-info-dropdown">
                        <div class="user-avatar-dropdown">
                            <img src="${userData.avatar_path ? userData.avatar_path : 'https://ui-avatars.com/api/?name=' + encodeURIComponent(userData.name) + '&background=random'}" alt="Avatar">
                        </div>
                        <div class="user-details-dropdown">
                            <div class="user-name-dropdown">${userData.name}</div>
                            <div class="user-email-dropdown">${userData.email}</div>
                        </div>
                    </div>
                    <div class="dropdown-divider"></div>
                    <a href="account.html" class="dropdown-item">
                        <i class="fas fa-user"></i> Account Dashboard
                    </a>
                    <a href="settings.html" class="dropdown-item">
                        <i class="fas fa-cog"></i> Settings
                    </a>
                    <div class="dropdown-divider"></div>
                    <a href="#" id="logoutButton" class="dropdown-item">
                        <i class="fas fa-sign-out-alt"></i> Logout
                    </a>
                `;
                
                // Add logout event listener
                document.getElementById('logoutButton').addEventListener('click', logout);
            } else {
                // Token is invalid, clear it and show logged-out state
                localStorage.removeItem('authToken');
                showLoggedOutDropdown();
            }
        } catch (error) {
            console.error('Error checking login status:', error);
            showLoggedOutDropdown();
        }
    } else {
        // User is not logged in
        showLoggedOutDropdown();
    }
}

// Show logged-out dropdown
function showLoggedOutDropdown() {
    accountText.textContent = 'Account';
    accountDropdown.innerHTML = `
        <a href="auth.html" class="dropdown-item">
            <i class="fas fa-sign-in-alt"></i> Login
        </a>
        <a href="auth.html" class="dropdown-item">
            <i class="fas fa-user-plus"></i> Signup
        </a>
    `;
}

// Logout function - redirect to index.html
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
    // Redirect to index.html instead of just updating the dropdown
    window.location.href = 'index.html';
}

// Apply user settings on page load
async function applyUserSettings() {
    const token = localStorage.getItem('authToken');
    if (!token) return;
    
    try {
        const response = await fetch('/api/preferences', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        
        if (response.ok) {
            const preferences = await response.json();
            applySettings(preferences);
        }
    } catch (error) {
        console.error('Error applying user settings:', error);
    }
}

// Apply settings to the page
function applySettings(preferences) {
    if (!preferences) return;
    
    // Apply theme
    if (preferences.theme) {
        document.body.className = document.body.className.replace(/theme-\w+/g, '');
        document.body.classList.add(`theme-${preferences.theme}`);
    }
    
    // Apply temperature unit (this would affect how temperatures are displayed)
    if (preferences.temperature_unit) {
        // In a full implementation, you would update all temperature displays
        // For now, we'll just log it
        console.log('Temperature unit set to:', preferences.temperature_unit);
    }
    
    // Apply AQI scale
    if (preferences.aqi_scale) {
        // In a full implementation, you would update how AQI is calculated/displayed
        console.log('AQI scale set to:', preferences.aqi_scale);
    }
    
    // Load default city if set
    if (preferences.default_city) {
        // In a full implementation, you would load data for this city
        console.log('Default city set to:', preferences.default_city);
    }
    
    // Apply display preferences
    if (preferences.show_24hr_forecast !== undefined) {
        // Toggle 24-hour forecast visibility
        console.log('24-hour forecast visibility:', preferences.show_24hr_forecast);
    }
    
    if (preferences.show_week_prediction !== undefined) {
        // Toggle week prediction visibility
        console.log('Week prediction visibility:', preferences.show_week_prediction);
    }
    
    if (preferences.show_health_advice !== undefined) {
        // Toggle health advice visibility
        console.log('Health advice visibility:', preferences.show_health_advice);
    }
    
    if (preferences.show_global_compare !== undefined) {
        // Toggle global comparison visibility
        console.log('Global comparison visibility:', preferences.show_global_compare);
    }
}

// Call applyUserSettings when the page loads
document.addEventListener('DOMContentLoaded', function() {
    applyUserSettings();
});

// Back button functionality
if (backButton) {
    backButton.addEventListener('click', () => {
        hideDetailedInfo();
        isShowingDetails = false;
    });
}

// AQI data and categories
const aqiCategories = {
    0: { level: 'Good', color: '#00e400', textColor: '#000' },
    51: { level: 'Moderate', color: '#ffff00', textColor: '#000' },
    101: { level: 'Unhealthy for Sensitive Groups', color: '#ff7e00', textColor: '#fff' },
    151: { level: 'Unhealthy', color: '#ff0000', textColor: '#fff' },
    201: { level: 'Very Unhealthy', color: '#8f3f97', textColor: '#fff' },
    301: { level: 'Hazardous', color: '#7e0023', textColor: '#fff' }
};

// Get AQI category based on value
function getAQICategory(aqi) {
    let category = aqiCategories[0];
    for (const level in aqiCategories) {
        if (aqi >= level) {
            category = aqiCategories[level];
        }
    }
    return category;
}

// Update AQI circle styling
function updateAQICircle(aqi) {
    const category = getAQICategory(aqi);
    aqiCircle.style.background = `radial-gradient(circle at center, ${category.color} 0%, ${darkenColor(category.color, 30)} 100%)`;
    aqiCircle.style.boxShadow = `0 0 30px ${category.color}`;
    aqiNumber.textContent = aqi;
    aqiCategory.textContent = category.level;
    aqiCategory.style.color = category.color; // Match category text color to AQI color
    
    // Update character image based on AQI
    updateCharacterImage(aqi);
}

// Darken a hex color
function darkenColor(color, percent) {
    let R = parseInt(color.substring(1, 3), 16);
    let G = parseInt(color.substring(3, 5), 16);
    let B = parseInt(color.substring(5, 7), 16);
    
    R = Math.floor(R * (100 - percent) / 100);
    G = Math.floor(G * (100 - percent) / 100);
    B = Math.floor(B * (100 - percent) / 100);
    
    return `#${R.toString(16).padStart(2, '0')}${G.toString(16).padStart(2, '0')}${B.toString(16).padStart(2, '0')}`;
}

// Update character image based on AQI level
function updateCharacterImage(aqi) {
    let imageSrc = '';
    
    if (aqi <= 50) {
        // Good - gd_char.png
        imageSrc = 'gd_char.png';
    } else if (aqi <= 100) {
        // Moderate - md_char.png
        imageSrc = 'md_char.png';
    } else if (aqi <= 150) {
        // Unhealthy for Sensitive Groups - SV_char.png
        imageSrc = 'SV_char.png';
    } else {
        // Unhealthy, Very Unhealthy, Hazardous - haz_char.png
        imageSrc = 'haz_char.png';
    }
    
    // Set the image source and show the container
    characterImage.src = imageSrc;
    characterImage.style.display = 'block';
    aqiCharacter.style.display = 'block';
    
    // Debug: Log to console to verify the image is being set
    console.log('Setting character image to:', imageSrc);
}

// Show detailed info
function showDetailedInfo(data) {
    // Populate detailed info
    detailHumidity.textContent = `${data.humidity || '--'}%`;
    detailTemp.textContent = `${data.temperature || '--'}°C`;
    detailWind.textContent = `${data.wind_speed || '--'} km/h`;
    detailPm25.textContent = `${data.pm25 || '--'} µg/m³`;
    detailPm10.textContent = `${data.pm10 || '--'} µg/m³`;
    
    // Populate weather info
    humidity.textContent = `${data.humidity || '--'}%`;
    windSpeed.textContent = `${data.wind_speed || '--'} km/h`;
    uvIndex.textContent = data.uv_index || '--';
    pm25.textContent = `${data.pm25 || '--'} µg/m³`;
    pm10.textContent = `${data.pm10 || '--'} µg/m³`;
    
    // Hide main info and show detailed info
    document.querySelector('.main-info').style.display = 'none';
    document.querySelector('.pm-values').style.display = 'none';
    detailedInfo.style.display = 'grid';
}

// Hide detailed info
function hideDetailedInfo() {
    document.querySelector('.main-info').style.display = 'flex';
    document.querySelector('.pm-values').style.display = 'flex';
    detailedInfo.style.display = 'none';
}

// Generate advice based on AQI
function generateAdvice(aqi) {
    let advice = '';
    
    if (aqi <= 50) {
        advice = "Air quality is good. Safe for outdoor activities.";
    } else if (aqi <= 100) {
        advice = "Moderate air quality. Sensitive groups stay cautious.";
    } else if (aqi <= 200) {
        advice = "Unhealthy air. Reduce outdoor time. Wear a mask.";
    } else if (aqi <= 300) {
        advice = "Very unhealthy. Avoid going outside.";
    } else {
        advice = "Hazardous air. Stay indoors and use air purifiers.";
    }
    
    return advice;
}

// Update main page data
function updateMainPageData(data) {
    // Update PM values
    if (pm25 && data.pm25) {
        pm25.textContent = `${data.pm25} µg/m³`;
    }
    if (pm10 && data.pm10) {
        pm10.textContent = `${data.pm10} µg/m³`;
    }
    
    // Update temperature
    const temperatureElement = document.querySelector('.temperature');
    if (temperatureElement && data.temperature) {
        temperatureElement.textContent = `${data.temperature}°C`;
    }
    
    // Update weather icon based on conditions
    const weatherIcon = document.getElementById('weatherIcon');
    if (weatherIcon) {
        // Remove existing animation classes
        weatherIcon.classList.remove('sunny', 'cloudy', 'rainy', 'snowy');
        
        // Determine weather condition based on data
        // For now, we'll use a simple approach based on temperature and precipitation
        // In a real implementation, you would use actual weather condition data
        let condition = 'sunny'; // default
        
        if (data.temperature < 0) {
            condition = 'snowy';
        } else if (data.humidity > 80) {
            condition = 'rainy';
        } else if (data.humidity > 60) {
            condition = 'cloudy';
        }
        
        // Apply appropriate animation class
        weatherIcon.classList.add(condition);
    }
    
    // Update other weather info
    if (humidity && data.humidity) {
        humidity.textContent = `${data.humidity}%`;
    }
    if (windSpeed && data.wind_speed) {
        windSpeed.textContent = `${data.wind_speed} km/h`;
    }
    if (uvIndex && data.uv_index) {
        uvIndex.textContent = data.uv_index;
    }
}

// Show advice after delay
function showAdvice(aqi) {
    // Show placeholder
    advicePlaceholder.style.display = 'flex';
    adviceContent.style.display = 'none';
    
    // After 1 second, show advice
    setTimeout(() => {
        advicePlaceholder.style.display = 'none';
        adviceContent.textContent = generateAdvice(aqi);
        adviceContent.style.display = 'block';
    }, 1000);
}

// Find closest city from coordinates
function findClosestCity(lat, lon, cities) {
    // Coordinates for cities in our dataset
    const cityCoords = {
        'delhi': { lat: 28.7041, lon: 77.1025 },
        'mumbai': { lat: 19.0760, lon: 72.8777 },
        'noida': { lat: 28.5355, lon: 77.3910 },
        'lucknow': { lat: 26.8467, lon: 80.9462 },
        'kolkata': { lat: 22.5726, lon: 88.3639 },
        'bangalore': { lat: 12.9716, lon: 77.5946 },
        'muzaffarnagar': { lat: 29.4709, lon: 77.7036 }
    };
    
    let closestCity = 'delhi';
    let minDistance = Infinity;
    
    for (const city in cityCoords) {
        const cityLat = cityCoords[city].lat;
        const cityLon = cityCoords[city].lon;
        
        // Calculate distance using Haversine formula
        const R = 6371; // Earth radius in km
        const dLat = (cityLat - lat) * Math.PI / 180;
        const dLon = (cityLon - lon) * Math.PI / 180;
        const a = 
            Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(lat * Math.PI / 180) * Math.cos(cityLat * Math.PI / 180) * 
            Math.sin(dLon/2) * Math.sin(dLon/2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        const distance = R * c;
        
        if (distance < minDistance) {
            minDistance = distance;
            closestCity = city;
        }
    }
    
    return closestCity;
}

// Get user location
function getUserLocation() {
    return new Promise((resolve, reject) => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    resolve({
                        lat: position.coords.latitude,
                        lon: position.coords.longitude
                    });
                },
                (error) => {
                    console.log('Location access denied or unavailable, using default location');
                    resolve(null);
                },
                {
                    enableHighAccuracy: true,
                    timeout: 10000,
                    maximumAge: 300000
                }
            );
        } else {
            console.log('Geolocation is not supported by this browser');
            resolve(null);
        }
    });
}

// Fetch AQI data
async function fetchAQIData() {
    try {
        const response = await fetch('/api/aqi');
        const jsonData = await response.json();
        const dataArray = Object.values(jsonData.cities);
        
        // Filter out cities with errors
        const validCities = dataArray.filter(city => !city.error);
        
        console.log('All cities from API:', Object.keys(jsonData.cities));
        console.log('Valid cities:', validCities.map(city => ({city: city.city, aqi: city.aqi})));
        
        // Try to get user location
        const location = await getUserLocation();
        let selectedCityData;
        
        if (location) {
            // Find closest city
            const closestCity = findClosestCity(location.lat, location.lon, validCities);
            selectedCityData = validCities.find(city => city.city === closestCity);
            console.log('Location-based selection:', selectedCityData ? selectedCityData.city : 'None');
        } else {
            // First try to find Muzaffarnagar specifically
            selectedCityData = validCities.find(city => {
                return city.city && city.city.toLowerCase() === 'muzaffarnagar';
            });
            
            // If Muzaffarnagar not found, try variations
            if (!selectedCityData) {
                selectedCityData = validCities.find(city => {
                    return city.city && city.city.toLowerCase().includes('muzaffarnagar');
                });
            }
            
            // If still not found, use first valid city
            if (!selectedCityData) {
                selectedCityData = validCities[0];
                console.log('Muzaffarnagar not found, using first valid city:', selectedCityData ? selectedCityData.city : 'None');
            } else {
                console.log('Successfully found Muzaffarnagar:', selectedCityData.city, 'with AQI:', selectedCityData.aqi);
            }
        }
        
        // If still no city found, use first valid city
        if (!selectedCityData) {
            selectedCityData = validCities[0];
        }
        
        // Make sure we have valid city data before proceeding
        if (!selectedCityData) {
            throw new Error('No valid city data available');
        }
        
        // Map the data to expected structure
        const data = {
            aqi: selectedCityData.aqi,
            pm25: selectedCityData.pm25,
            pm10: selectedCityData.pm10,
            humidity: 85, // Static realistic humidity value
            temperature: selectedCityData.temp,
            wind_speed: '8.5', // Static realistic wind speed
            uv_index: 5, // Static realistic UV index
            time: selectedCityData.time || new Date().toISOString(),
            city: selectedCityData.city
        };
        
        console.log('Final selected city data:', data);
        
        // Update location info
        if (data.city) {
            const cityName = data.city.charAt(0).toUpperCase() + data.city.slice(1).replace(/-/g, ' ');
            document.getElementById('locationName').textContent = `${cityName}, India`;
        } else {
            document.getElementById('locationName').textContent = 'Live Data, India';
        };
        
        // Update UI with fetched data
        const aqi = data.aqi || 0;
        updateAQICircle(aqi);
        updateAirInsightWithAQI(aqi);
        updateCharacterImage(aqi);
        
        // Update main page data
        updateMainPageData(data);
        
        // Update time
        const updateTime = '2'; // Default to 2 minutes
        updatedTime.textContent = `Updated ${updateTime} mins ago`;
        document.getElementById('updateTime').textContent = `${updateTime} mins ago`;
        document.getElementById('localTime').textContent = new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
        
        // Show advice
        showAdvice(aqi);
        
        // Return data for detailed view
        return data;
    } catch (error) {
        console.error('Error fetching AQI data:', error);
        // Use fallback data
        const fallbackData = {
            aqi: 42,
            humidity: 85, // Static realistic humidity value
            temperature: 24,
            wind_speed: '8.5', // Static realistic wind speed
            uv_index: 5, // Static realistic UV index
            pm25: 12,
            pm10: 24,
            time: '2023-06-15T14:25:00Z',
            city: 'Default'
        };
        
        // Update location info
        document.getElementById('locationName').textContent = 'Default Location';
        document.getElementById('updateTime').textContent = '2 mins ago';
        document.getElementById('localTime').textContent = '14:25';
        
        updateAQICircle(fallbackData.aqi);
        updateAirInsightWithAQI(fallbackData.aqi);
        updateMainPageData(fallbackData);
        updatedTime.textContent = 'Updated 2 mins ago';
        showAdvice(fallbackData.aqi);
        updateCharacterImage(fallbackData.aqi);
        return fallbackData;
    }
}

// Handle circle click
let isShowingDetails = false;

aqiCircle.addEventListener('click', () => {
    // Add rotation animation
    aqiCircle.style.animation = 'rotateCircle 0.8s cubic-bezier(0.4, 0.1, 0.2, 1) forwards';
    
    // After rotation, toggle detailed view
    setTimeout(() => {
        if (!isShowingDetails) {
            fetchAQIData().then(data => {
                showDetailedInfo(data);
            });
        } else {
            hideDetailedInfo();
        }
        isShowingDetails = !isShowingDetails;
        
        // Reset animation
        aqiCircle.style.animation = '';
    }, 800);
});

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    // Fade in body
    document.body.style.opacity = '1';
    
    // Fetch initial data
    fetchAQIData();
});

// Handle window resize
window.addEventListener('resize', () => {
    // Close mobile menu on resize if open
    if (navCenter && navCenter.classList.contains('active')) {
        navCenter.classList.remove('active');
        if (mobileMenu) {
            mobileMenu.innerHTML = '<i class="fas fa-bars"></i>';
        }
    }
    // Re-apply animations on resize if needed
});

// Today's Air Insight Card functionality
const airInsightCard = document.getElementById('airInsightCard');
const cardHeader = document.getElementById('cardHeader');
const cardContent = document.getElementById('cardContent');
const shortMessage = document.getElementById('shortMessage');
const fullMessage = document.getElementById('fullMessage');
const professionalAdvice = document.getElementById('professionalAdvice');
const insightTimestamp = document.getElementById('insightTimestamp');

// AQI-based content for the card
const aqiInsightContent = {
    good: {
        short: "Air quality is great today! 😌✨",
        full: "This air feels amazing today 😌✨ Perfect for outdoor activities like jogging, cycling, or having a picnic in the park.",
        advice: "Even though the air quality is excellent, it's always good to stay hydrated and protect your skin from UV exposure during extended outdoor activities.",
        bgColor: "good"
    },
    moderate: {
        short: "Air is okay today — slightly dusty 🤏🌫️",
        full: "Air quality is acceptable but there may be a risk for some people, particularly those who are unusually sensitive.",
        advice: "Unusually sensitive people should consider limiting prolonged outdoor exertion. Otherwise, general population can enjoy outdoor activities.",
        bgColor: "moderate"
    },
    unhealthySensitive: {
        short: "Air's a bit rough today, especially for kids & elderly 😕",
        full: "Members of sensitive groups may experience health effects. The general public is less likely to be affected.",
        advice: "Children, elderly, and people with respiratory disease should limit prolonged outdoor exertion. Everyone else can continue normal activities.",
        bgColor: "unhealthy-sensitive"
    },
    unhealthy: {
        short: "The air isn't friendly today 😷",
        full: "Everyone may begin to experience health effects; members of sensitive groups may experience more serious health effects.",
        advice: "Active children and adults, and people with respiratory disease should avoid prolonged outdoor exertion. General population should limit outdoor activities.",
        bgColor: "unhealthy"
    },
    veryUnhealthy: {
        short: "This is concerning. Please stay indoors ⚠️",
        full: "Health alert: everyone may experience more serious health effects.",
        advice: "Avoid all outdoor exertion. Stay indoors and keep activity levels low. Keep windows closed and use air purifiers if available.",
        bgColor: "very-unhealthy"
    },
    hazardous: {
        short: "Extremely hazardous conditions 🚨",
        full: "Health warnings of emergency conditions. The entire population is more likely to be affected.",
        advice: "Everyone should avoid all physical outdoor activities. Stay indoors and keep windows closed. Use air purifiers and masks if needed.",
        bgColor: "hazardous"
    }
};

// Update the card content based on AQI
function updateAirInsightCard(aqi) {
    let content;
    
    if (aqi <= 50) {
        content = aqiInsightContent.good;
    } else if (aqi <= 100) {
        content = aqiInsightContent.moderate;
    } else if (aqi <= 150) {
        content = aqiInsightContent.unhealthySensitive;
    } else if (aqi <= 200) {
        content = aqiInsightContent.unhealthy;
    } else if (aqi <= 300) {
        content = aqiInsightContent.veryUnhealthy;
    } else {
        content = aqiInsightContent.hazardous;
    }
    
    // Update card content
    shortMessage.textContent = content.short;
    fullMessage.textContent = content.full;
    professionalAdvice.innerHTML = `<strong>Professional Advice:</strong> ${content.advice}`;
    
    // Update card background class
    airInsightCard.className = 'air-insight-card';
    if (content.bgColor) {
        airInsightCard.classList.add(content.bgColor);
    }
}

// Toggle card expansion
airInsightCard.addEventListener('click', () => {
    cardContent.classList.toggle('expanded');
    
    // Rotate card slightly for visual effect
    airInsightCard.style.transform = cardContent.classList.contains('expanded') ? 
        'rotate(0.5deg) scale(1.01)' : 'rotate(0deg) scale(1)';
});

// Update the card when AQI data is fetched
function updateAirInsightWithAQI(aqi) {
    updateAirInsightCard(aqi);
    // Update timestamp
    insightTimestamp.textContent = 'Updated 1 min ago';
}

// Expose function to be called when AQI updates
window.updateAirInsightWithAQI = updateAirInsightWithAQI;

// Today's Weather Section Implementation
(function() {
    // Namespaced function to initialize the weather section
    window.weatherSectionInit = function() {
        const weatherSection = document.getElementById('weather-section');
        
        if (!weatherSection) {
            console.warn('Weather section container not found');
            return;
        }
        
        // Create the weather section HTML structure
        weatherSection.innerHTML = `
            <div class="weather-section-header">
                <h2 class="weather-section-title">Today's Weather</h2>
                <div class="weather-section-toggle">
                    <button class="weather-section-toggle-btn active" data-period="today">Today</button>
                    <button class="weather-section-toggle-btn" data-period="tomorrow">Tomorrow</button>
                </div>
            </div>
            <div class="weather-section-content">
                <div class="weather-section-trend">
                    <div class="weather-section-trend-line"></div>
                    <div class="weather-section-trend-points"></div>
                </div>
                <div class="weather-section-scroll-container">
                    <div class="weather-section-scroll-wrapper" id="weatherCardsContainer">
                        <!-- Weather cards will be dynamically inserted here -->
                    </div>
                </div>
            </div>
        `;
        
        // Load weather data and render cards
        loadWeatherData();
        
        // Add event listeners for toggle buttons
        const toggleButtons = weatherSection.querySelectorAll('.weather-section-toggle-btn');
        toggleButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Update active button
                toggleButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
                
                // In a real implementation, you would load different data based on the selected period
                // For now, we'll just reload the same data
                loadWeatherData();
            });
        });
    };
    
    // Function to load weather data (in a real app, this would fetch from an API)
    function loadWeatherData() {
        // For demonstration purposes, we'll use dummy data
        // Fetch real forecast data from our local API
        fetch('/api/aqi')
            .then(response => response.json())
            .then(data => {
                // Process the real data
                const forecastData = [];
                const now = new Date();
                
                // Generate 24 hours of forecast data based on current conditions
                for (let i = 0; i < 24; i++) {
                    const hour = new Date(now);
                    hour.setHours(now.getHours() + i);
                    
                    // Use the current city's data as base and add some variation
                    const currentCity = Object.keys(data.cities).find(key => 
                        data.cities[key] && !data.cities[key].error
                    );
                    
                    if (currentCity && data.cities[currentCity]) {
                        const current = data.cities[currentCity];
                        const aqiVariation = Math.floor(current.aqi + (Math.random() * 40 - 20)); // ±20 variation
                        const tempVariation = current.temp ? Math.floor(current.temp + (Math.random() * 5 - 2.5)) : 25; // ±2.5 variation
                        
                        forecastData.push({
                            time: hour,
                            temperature: tempVariation,
                            precipitation: Math.floor(Math.random() * 30), // Random precipitation
                            humidity: Math.floor(40 + Math.random() * 40), // 40-80%
                            windSpeed: (Math.random() * 15).toFixed(1), // 0-15 km/h
                            aqi: Math.max(0, aqiVariation), // Ensure positive AQI
                            condition: getWeatherCondition(tempVariation, Math.random() * 100)
                        });
                    }
                }
                
                renderWeatherCards(forecastData);
                renderTrendLine(forecastData);
            })
            .catch(error => {
                console.error('Error fetching weather data:', error);
                // Fallback to dummy data if API fetch fails
                const forecastData = generateDummyForecastData();
                renderWeatherCards(forecastData);
                renderTrendLine(forecastData);
            });
        
        // Using dummy data for now
        const forecastData = generateDummyForecastData();
        renderWeatherCards(forecastData);
        renderTrendLine(forecastData);
    }
    
    // Function to convert text condition to our format
    function getWeatherConditionFromText(condition) {
        switch(condition) {
            case 'sunny':
            case 'clear':
                return 'sunny';
            case 'cloudy':
            case 'partly-cloudy':
                return 'cloudy';
            case 'rainy':
            case 'rain':
                return 'rainy';
            default:
                return 'sunny';
        }
    }
    
    // Function to generate dummy forecast data
    function generateDummyForecastData() {
        const hours = [];
        const now = new Date();
        
        for (let i = 0; i < 24; i++) {
            const hour = new Date(now);
            hour.setHours(now.getHours() + i);
            
            // Generate realistic weather data
            const temp = Math.floor(20 + 10 * Math.sin((i - 6) * Math.PI / 12)); // Temperature curve
            const precipitation = Math.floor(Math.random() * 30); // 0-30% chance of precipitation
            const humidity = Math.floor(40 + Math.random() * 40); // 40-80% humidity
            const windSpeed = (Math.random() * 15).toFixed(1); // 0-15 km/h wind
            const aqi = Math.floor(30 + Math.random() * 120); // AQI between 30-150
            
            hours.push({
                time: hour,
                temperature: temp,
                precipitation: precipitation,
                humidity: humidity,
                windSpeed: windSpeed,
                aqi: aqi,
                condition: getWeatherCondition(temp, precipitation)
            });
        }
        
        return hours;
    }
    
    // Function to determine weather condition based on temperature and precipitation
    function getWeatherCondition(temp, precipitation) {
        if (precipitation > 70) return 'rainy';
        if (precipitation > 30) return 'cloudy';
        if (temp > 25) return 'sunny';
        if (temp > 15) return 'cloudy';
        return 'sunny';
    }
    
    // Function to render weather cards
    function renderWeatherCards(forecastData) {
        const container = document.getElementById('weatherCardsContainer');
        
        if (!container) {
            console.error('Weather cards container not found');
            return;
        }
        
        // Clear existing content
        container.innerHTML = '';
        
        // Check if we have data
        if (!forecastData || forecastData.length === 0) {
            container.innerHTML = `
                <div class="weather-section-placeholder">
                    <div class="weather-section-placeholder-icon">☁️</div>
                    <div class="weather-section-placeholder-text">Weather data unavailable</div>
                    <div class="weather-section-placeholder-subtext">Check back later for updated forecast</div>
                </div>
            `;
            return;
        }
        
        // Create and append cards for each hour
        forecastData.forEach(hourData => {
            const card = createWeatherCard(hourData);
            container.appendChild(card);
        });
        
        // Add event listeners for card expansion
        addCardEventListeners();
    }
    
    // Function to create a single weather card
    function createWeatherCard(data) {
        const card = document.createElement('div');
        card.className = `weather-section-card ${data.condition}`;
        
        // Format time (e.g., "9 AM" or "14:00")
        const hours = data.time.getHours();
        const formattedTime = hours === 0 ? '12 AM' : 
                             hours < 12 ? `${hours} AM` : 
                             hours === 12 ? '12 PM' : 
                             `${hours - 12} PM`;
        
        // Get AQI description and color class
        const aqiInfo = getAQIInfo(data.aqi);
        
        card.innerHTML = `
            <div class="weather-section-time">${formattedTime}</div>
            <div class="weather-section-temp">
                ${data.temperature}°C
                <span class="weather-section-aqi-icon ${aqiInfo.colorClass}" title="AQI: ${data.aqi}"></span>
            </div>
            <div class="weather-section-precipitation">${data.precipitation}%</div>
            <div class="weather-section-expanded-details">
                <div class="weather-section-humidity"><strong>Humidity:</strong> ${data.humidity}%</div>
                <div class="weather-section-aqi-description"><strong>AQI:</strong> ${aqiInfo.description}</div>
                <div class="weather-section-wind"><strong>Wind:</strong> ${data.windSpeed} km/h</div>
            </div>
        `;
        
        return card;
    }
    
    // Function to get AQI information (color class and description)
    function getAQIInfo(aqi) {
        if (aqi <= 50) {
            return {
                colorClass: 'good',
                description: 'Good - Safe for everyone'
            };
        } else if (aqi <= 100) {
            return {
                colorClass: 'moderate',
                description: 'Moderate - Generally safe'
            };
        } else if (aqi <= 150) {
            return {
                colorClass: 'unhealthy-sensitive',
                description: 'Unhealthy for sensitive groups'
            };
        } else if (aqi <= 200) {
            return {
                colorClass: 'unhealthy',
                description: 'Unhealthy - Everyone may experience effects'
            };
        } else if (aqi <= 300) {
            return {
                colorClass: 'very-unhealthy',
                description: 'Very Unhealthy - Serious health effects'
            };
        } else {
            return {
                colorClass: 'hazardous',
                description: 'Hazardous - Emergency conditions'
            };
        }
    }
    
    // Function to add event listeners for card expansion
    function addCardEventListeners() {
        const cards = document.querySelectorAll('.weather-section-card');
        
        cards.forEach(card => {
            card.addEventListener('click', function() {
                // Toggle expanded class
                this.classList.toggle('expanded');
                
                // Add animation effect
                if (this.classList.contains('expanded')) {
                    this.style.transform = 'scale(1.05)';
                    this.style.zIndex = '10';
                } else {
                    this.style.transform = '';
                    this.style.zIndex = '';
                }
            });
        });
    }
    
    // Function to render the trend line
    function renderTrendLine(forecastData) {
        const trendPointsContainer = document.querySelector('.weather-section-trend-points');
        
        if (!trendPointsContainer) {
            console.error('Trend points container not found');
            return;
        }
        
        // Clear existing points
        trendPointsContainer.innerHTML = '';
        
        // Check if we have data
        if (!forecastData || forecastData.length === 0) {
            return;
        }
        
        // Get min and max temperatures for scaling
        const temps = forecastData.map(data => data.temperature);
        const minTemp = Math.min(...temps);
        const maxTemp = Math.max(...temps);
        const tempRange = maxTemp - minTemp || 1; // Avoid division by zero
        
        // Create points for each hour
        forecastData.forEach((data, index) => {
            const point = document.createElement('div');
            point.className = 'weather-section-trend-point';
            
            // Calculate position (0-100% for X, based on index)
            const xPercent = (index / (forecastData.length - 1)) * 100;
            
            // Calculate Y position based on temperature (invert Y axis since 0 is top)
            const yPercent = 100 - ((data.temperature - minTemp) / tempRange) * 100;
            
            point.style.left = `${xPercent}%`;
            point.style.top = `${yPercent}%`;
            
            // Add tooltip
            point.title = `${formatTime(data.time)}: ${data.temperature}°C`;
            
            trendPointsContainer.appendChild(point);
        });
    }
    
    // Helper function to format time
    function formatTime(date) {
        const hours = date.getHours();
        const minutes = date.getMinutes().toString().padStart(2, '0');
        return `${hours}:${minutes}`;
    }
    
    // Initialize the weather section when the DOM is loaded
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', window.weatherSectionInit);
    } else {
        window.weatherSectionInit();
    }
})();

// 7-Day AQI Prediction Section Implementation
(function() {
    // Namespaced function to initialize the AQI week section
    window.aqiWeekSectionInit = function() {
        const aqiWeekSection = document.getElementById('aqi-week-section');
        
        if (!aqiWeekSection) {
            console.warn('AQI week section container not found');
            return;
        }
        
        // Create the AQI week section HTML structure
        aqiWeekSection.innerHTML = `
            <div class="aqi-week-header">
                <h2 class="aqi-week-title">7-Day AQI Prediction</h2>
                <div class="aqi-week-toggle">
                    <button class="aqi-week-toggle-btn active" data-period="week">This Week</button>
                    <button class="aqi-week-toggle-btn" data-period="today">Today</button>
                </div>
            </div>
            <div class="aqi-week-content">
                <div class="aqi-week-trend">
                    <div class="aqi-week-trend-line"></div>
                    <div class="aqi-week-trend-points"></div>
                </div>
                <div class="aqi-week-scroll-container">
                    <div class="aqi-week-scroll-wrapper" id="aqiWeekCardsContainer">
                        <!-- AQI week cards will be dynamically inserted here -->
                    </div>
                </div>
            </div>
        `;
        
        // Load AQI week data and render cards
        loadAQIWeekData();
        
        // Add event listeners for toggle buttons
        const toggleButtons = aqiWeekSection.querySelectorAll('.aqi-week-toggle-btn');
        toggleButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Update active button
                toggleButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
                
                // In a real implementation, you would load different data based on the selected period
                // For now, we'll just reload the same data
                loadAQIWeekData();
            });
        });
    };
    
    // Function to load AQI week data (in a real app, this would fetch from an API)
    function loadAQIWeekData() {
        // For demonstration purposes, we'll use dummy data
        // In a real implementation, you would fetch this from your GitHub JSON
        // Example of how to fetch from a real JSON file:
        /*
        fetch('aqi-week-forecast.json')
            .then(response => response.json())
            .then(data => {
                // Process the real data
                const forecastData = data.forecast.map(dayData => {
                    return {
                        day: dayData.day,
                        aqi: dayData.aqi,
                        pm25: dayData.pm25,
                        pm10: dayData.pm10,
                        temperature: dayData.temp,
                        condition: dayData.condition
                    };
                });
                
                renderAQIWeekCards(forecastData);
                renderAQIWeekTrendLine(forecastData);
            })
            .catch(error => {
                console.error('Error fetching AQI week data:', error);
                // Fallback to dummy data if JSON fetch fails
                const forecastData = generateDummyAQIWeekData();
                renderAQIWeekCards(forecastData);
                renderAQIWeekTrendLine(forecastData);
            });
        */
        
        // Using dummy data for now
        const forecastData = generateDummyAQIWeekData();
        renderAQIWeekCards(forecastData);
        renderAQIWeekTrendLine(forecastData);
    }
    
    // Function to generate dummy AQI week data
    function generateDummyAQIWeekData() {
        const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
        const forecast = [];
        
        for (let i = 0; i < 7; i++) {
            // Generate realistic AQI data with some variation
            const baseAQI = 100 + i * 20;
            const variation = Math.floor(Math.random() * 40) - 20; // -20 to +20
            const aqi = Math.max(30, baseAQI + variation); // Minimum 30
            
            // Generate PM2.5 and PM10 based on AQI
            const pm25 = Math.floor(aqi * 0.6 + Math.random() * 20);
            const pm10 = Math.floor(aqi * 0.8 + Math.random() * 30);
            
            // Generate temperature
            const temp = Math.floor(25 + Math.sin(i) * 5 + Math.random() * 5);
            
            // Determine condition based on AQI
            let condition = 'Good';
            if (aqi > 300) condition = 'Hazardous';
            else if (aqi > 200) condition = 'Very Unhealthy';
            else if (aqi > 150) condition = 'Unhealthy';
            else if (aqi > 100) condition = 'Unhealthy for Sensitive';
            else if (aqi > 50) condition = 'Moderate';
            
            forecast.push({
                day: days[i],
                aqi: aqi,
                pm25: pm25,
                pm10: pm10,
                temperature: temp,
                condition: condition
            });
        }
        
        return forecast;
    }
    
    // Function to render AQI week cards
    function renderAQIWeekCards(forecastData) {
        const container = document.getElementById('aqiWeekCardsContainer');
        
        if (!container) {
            console.error('AQI week cards container not found');
            return;
        }
        
        // Clear existing content
        container.innerHTML = '';
        
        // Check if we have data
        if (!forecastData || forecastData.length === 0) {
            container.innerHTML = `
                <div class="aqi-week-placeholder">
                    <div class="aqi-week-placeholder-icon">📊</div>
                    <div class="aqi-week-placeholder-text">AQI data unavailable</div>
                    <div class="aqi-week-placeholder-subtext">Check back later for updated forecast</div>
                </div>
            `;
            return;
        }
        
        // Create and append cards for each day
        forecastData.forEach(dayData => {
            const card = createAQIWeekCard(dayData);
            container.appendChild(card);
        });
        
        // Add event listeners for card expansion
        addAQIWeekCardEventListeners();
    }
    
    // Function to create a single AQI week card
    function createAQIWeekCard(data) {
        const card = document.createElement('div');
        card.className = 'aqi-week-card';
        
        // Get AQI color class
        const aqiColorClass = getAQIColorClass(data.aqi);
        const aqiDescription = getAQIDescription(data.aqi);
        
        card.innerHTML = `
            <div class="aqi-week-day">${data.day}</div>
            <div class="aqi-week-aqi">
                ${data.aqi}
                <span class="aqi-week-aqi-circle ${aqiColorClass}" title="AQI: ${data.aqi}"></span>
            </div>
            <div class="aqi-week-details">
                <span>PM2.5: ${data.pm25}</span>
                <span>PM10: ${data.pm10}</span>
                <span>${data.temperature}°C</span>
            </div>
            <div class="aqi-week-expanded-details">
                <div class="aqi-week-description"><strong>Condition:</strong> ${data.condition}</div>
                <div class="aqi-week-pm"><strong>PM Levels:</strong> PM2.5 ${data.pm25} μg/m³, PM10 ${data.pm10} μg/m³</div>
                <div class="aqi-week-temp"><strong>Temperature:</strong> ${data.temperature}°C</div>
                <div class="aqi-week-recommendation"><strong>Recommendation:</strong> ${getRecommendation(data.aqi)}</div>
            </div>
        `;
        
        return card;
    }
    
    // Function to get AQI color class
    function getAQIColorClass(aqi) {
        if (aqi <= 50) return 'good';
        if (aqi <= 100) return 'moderate';
        if (aqi <= 150) return 'unhealthy-sensitive';
        if (aqi <= 200) return 'unhealthy';
        if (aqi <= 300) return 'very-unhealthy';
        return 'hazardous';
    }
    
    // Function to get AQI description
    function getAQIDescription(aqi) {
        if (aqi <= 50) return 'Good';
        if (aqi <= 100) return 'Moderate';
        if (aqi <= 150) return 'Unhealthy for Sensitive Groups';
        if (aqi <= 200) return 'Unhealthy';
        if (aqi <= 300) return 'Very Unhealthy';
        return 'Hazardous';
    }
    
    // Function to get recommendation based on AQI
    function getRecommendation(aqi) {
        if (aqi <= 50) return 'Air quality is satisfactory. Enjoy outdoor activities.';
        if (aqi <= 100) return 'Air quality is acceptable. Unusually sensitive people should consider limiting prolonged outdoor exertion.';
        if (aqi <= 150) return 'Members of sensitive groups may experience health effects. Children and elderly should limit outdoor exertion.';
        if (aqi <= 200) return 'Everyone may begin to experience health effects. Active children and adults should avoid prolonged outdoor exertion.';
        if (aqi <= 300) return 'Health alert! Everyone should avoid all outdoor exertion. Stay indoors and keep windows closed.';
        return 'Health warning of emergency conditions. The entire population is more likely to be affected. Avoid all physical outdoor activities.';
    }
    
    // Function to add event listeners for card expansion
    function addAQIWeekCardEventListeners() {
        const cards = document.querySelectorAll('.aqi-week-card');
        
        cards.forEach(card => {
            card.addEventListener('click', function() {
                // Toggle expanded class
                this.classList.toggle('expanded');
                
                // Add animation effect
                if (this.classList.contains('expanded')) {
                    this.style.transform = 'scale(1.05)';
                    this.style.zIndex = '10';
                } else {
                    this.style.transform = '';
                    this.style.zIndex = '';
                }
            });
        });
    }
    
    // Function to render the AQI week trend line
    function renderAQIWeekTrendLine(forecastData) {
        const trendPointsContainer = document.querySelector('.aqi-week-trend-points');
        
        if (!trendPointsContainer) {
            console.error('AQI week trend points container not found');
            return;
        }
        
        // Clear existing points
        trendPointsContainer.innerHTML = '';
        
        // Check if we have data
        if (!forecastData || forecastData.length === 0) {
            return;
        }
        
        // Get min and max AQI values for scaling
        const aqiValues = forecastData.map(data => data.aqi);
        const minAQI = Math.min(...aqiValues);
        const maxAQI = Math.max(...aqiValues);
        const aqiRange = maxAQI - minAQI || 1; // Avoid division by zero
        
        // Create points for each day
        forecastData.forEach((data, index) => {
            const point = document.createElement('div');
            point.className = `aqi-week-trend-point ${getAQIColorClass(data.aqi)}`;
            
            // Calculate position (0-100% for X, based on index)
            const xPercent = (index / (forecastData.length - 1)) * 100;
            
            // Calculate Y position based on AQI (invert Y axis since 0 is top)
            const yPercent = 100 - ((data.aqi - minAQI) / aqiRange) * 100;
            
            point.style.left = `${xPercent}%`;
            point.style.top = `${yPercent}%`;
            
            // Add tooltip
            point.title = `${data.day}: AQI ${data.aqi}`;
            
            trendPointsContainer.appendChild(point);
        });
    }
    
    // Initialize the AQI week section when the DOM is loaded
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', window.aqiWeekSectionInit);
    } else {
        window.aqiWeekSectionInit();
    }
})();

// 7-Day AQI Prediction Section Implementation - Stacked Graph Format
(function() {
    // Namespaced function to initialize the AQI week section
    window.aqiWeekSectionInit = function() {
        const aqiWeekSection = document.getElementById('aqi-week-section');
        
        if (!aqiWeekSection) {
            console.warn('AQI week section container not found');
            return;
        }
        
        // Create the AQI week section HTML structure
        aqiWeekSection.innerHTML = `
            <div class="aqi-week-header">
                <h2 class="aqi-week-title">7-Day AQI Prediction</h2>
                <div class="aqi-week-toggle">
                    <button class="aqi-week-toggle-btn active" data-period="week">This Week</button>
                    <button class="aqi-week-toggle-btn" data-period="today">Today</button>
                </div>
            </div>
            <div class="aqi-week-content">
                <div class="aqi-week-graph-container">
                    <div class="aqi-week-y-axis">
                        <span>400</span>
                        <span>300</span>
                        <span>200</span>
                        <span>100</span>
                        <span>0</span>
                    </div>
                    <div class="aqi-week-grid-lines">
                        <div class="aqi-week-grid-line" style="top: 0%;"></div>
                        <div class="aqi-week-grid-line" style="top: 25%;"></div>
                        <div class="aqi-week-grid-line" style="top: 50%;"></div>
                        <div class="aqi-week-grid-line" style="top: 75%;"></div>
                        <div class="aqi-week-grid-line" style="top: 100%;"></div>
                    </div>
                    <div class="aqi-week-bars-container" id="aqiWeekBarsContainer">
                        <!-- AQI week bars will be dynamically inserted here -->
                    </div>
                </div>
                <div class="aqi-week-legend">
                    <div class="aqi-week-legend-item">
                        <div class="aqi-week-legend-color aqi-week-legend-aqi"></div>
                        <span>AQI</span>
                    </div>
                    <div class="aqi-week-legend-item">
                        <div class="aqi-week-legend-color aqi-week-legend-pm25"></div>
                        <span>PM2.5</span>
                    </div>
                    <div class="aqi-week-legend-item">
                        <div class="aqi-week-legend-color aqi-week-legend-pm10"></div>
                        <span>PM10</span>
                    </div>
                </div>
                <div class="aqi-week-details-container" id="aqiWeekDetailsContainer">
                    <!-- Details will be dynamically inserted here -->
                </div>
            </div>
        `;
        
        // Load AQI week data and render bars
        loadAQIWeekData();
        
        // Add event listeners for toggle buttons
        const toggleButtons = aqiWeekSection.querySelectorAll('.aqi-week-toggle-btn');
        toggleButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Update active button
                toggleButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
                
                // In a real implementation, you would load different data based on the selected period
                // For now, we'll just reload the same data
                loadAQIWeekData();
            });
        });
    };
    
    // Function to load AQI week data (in a real app, this would fetch from an API)
    function loadAQIWeekData() {
        // Fetch real AQI week data from our local API
        fetch('/api/aqi')
            .then(response => response.json())
            .then(data => {
                // Process the real data to generate weekly forecast
                const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
                const today = new Date();
                const forecastData = [];
                
                for (let i = 0; i < 7; i++) {
                    const date = new Date(today);
                    date.setDate(today.getDate() + i);
                    const dayName = days[date.getDay()];
                    
                    // Use the current city's data as base and add some variation
                    const currentCity = Object.keys(data.cities).find(key => 
                        data.cities[key] && !data.cities[key].error
                    );
                    
                    if (currentCity && data.cities[currentCity]) {
                        const current = data.cities[currentCity];
                        const aqiVariation = Math.floor(current.aqi + (Math.random() * 60 - 30)); // ±30 variation
                        const pm25Variation = current.pm25 ? Math.floor(current.pm25 + (Math.random() * 30 - 15)) : Math.floor(aqiVariation * 0.6);
                        const pm10Variation = current.pm10 ? Math.floor(current.pm10 + (Math.random() * 40 - 20)) : Math.floor(aqiVariation * 0.8);
                        const tempVariation = current.temp ? Math.floor(current.temp + (Math.random() * 5 - 2.5)) : 25; // ±2.5 variation
                        
                        // Determine condition based on AQI
                        let condition = 'Good';
                        if (aqiVariation > 300) condition = 'Hazardous';
                        else if (aqiVariation > 200) condition = 'Very Unhealthy';
                        else if (aqiVariation > 150) condition = 'Unhealthy';
                        else if (aqiVariation > 100) condition = 'Unhealthy for Sensitive';
                        else if (aqiVariation > 50) condition = 'Moderate';
                        
                        forecastData.push({
                            day: dayName,
                            aqi: Math.max(0, aqiVariation), // Ensure positive AQI
                            pm25: Math.max(0, pm25Variation), // Ensure positive PM2.5
                            pm10: Math.max(0, pm10Variation), // Ensure positive PM10
                            temperature: tempVariation,
                            condition: condition
                        });
                    }
                }
                
                renderAQIWeekBars(forecastData);
            })
            .catch(error => {
                console.error('Error fetching AQI week data:', error);
                // Fallback to dummy data if API fetch fails
                const forecastData = generateDummyAQIWeekData();
                renderAQIWeekBars(forecastData);
            });
        
        // Using dummy data for now
        const forecastData = generateDummyAQIWeekData();
        renderAQIWeekBars(forecastData);
    }
    
    // Function to generate dummy AQI week data
    function generateDummyAQIWeekData() {
        const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
        const forecast = [];
        
        for (let i = 0; i < 7; i++) {
            // Generate realistic AQI data with some variation
            const baseAQI = 100 + i * 20;
            const variation = Math.floor(Math.random() * 40) - 20; // -20 to +20
            const aqi = Math.max(30, baseAQI + variation); // Minimum 30
            
            // Generate PM2.5 and PM10 based on AQI
            const pm25 = Math.floor(aqi * 0.6 + Math.random() * 20);
            const pm10 = Math.floor(aqi * 0.8 + Math.random() * 30);
            
            // Generate temperature
            const temp = Math.floor(25 + Math.sin(i) * 5 + Math.random() * 5);
            
            // Determine condition based on AQI
            let condition = 'Good';
            if (aqi > 300) condition = 'Hazardous';
            else if (aqi > 200) condition = 'Very Unhealthy';
            else if (aqi > 150) condition = 'Unhealthy';
            else if (aqi > 100) condition = 'Unhealthy for Sensitive';
            else if (aqi > 50) condition = 'Moderate';
            
            forecast.push({
                day: days[i],
                aqi: aqi,
                pm25: pm25,
                pm10: pm10,
                temperature: temp,
                condition: condition
            });
        }
        
        return forecast;
    }
    
    // Function to render AQI week bars
    function renderAQIWeekBars(forecastData) {
        const container = document.getElementById('aqiWeekBarsContainer');
        const detailsContainer = document.getElementById('aqiWeekDetailsContainer');
        
        if (!container) {
            console.error('AQI week bars container not found');
            return;
        }
        
        // Clear existing content
        container.innerHTML = '';
        detailsContainer.innerHTML = '';
        detailsContainer.classList.remove('active');
        
        // Check if we have data
        if (!forecastData || forecastData.length === 0) {
            container.innerHTML = `
                <div class="aqi-week-placeholder">
                    <div class="aqi-week-placeholder-icon">📊</div>
                    <div class="aqi-week-placeholder-text">AQI data unavailable</div>
                    <div class="aqi-week-placeholder-subtext">Check back later for updated forecast</div>
                </div>
            `;
            return;
        }
        
        // Find max value for scaling
        const allValues = [];
        forecastData.forEach(day => {
            allValues.push(day.aqi, day.pm25, day.pm10);
        });
        const maxValue = Math.max(...allValues, 400); // Ensure minimum scale of 400
        
        // Create and append bars for each day
        forecastData.forEach((dayData, index) => {
            const barGroup = createAQIWeekBarGroup(dayData, maxValue, index);
            container.appendChild(barGroup);
        });
    }
    
    // Function to create a single AQI week bar group
    function createAQIWeekBarGroup(data, maxValue, index) {
        const barGroup = document.createElement('div');
        barGroup.className = 'aqi-week-bar-group';
        barGroup.dataset.index = index;
        
        // Calculate heights as percentages
        const aqiHeight = (data.aqi / maxValue) * 100;
        const pm25Height = (data.pm25 / maxValue) * 100;
        const pm10Height = (data.pm10 / maxValue) * 100;
        
        // Get AQI color class
        const aqiColorClass = getAQIColorClass(data.aqi);
        
        barGroup.innerHTML = `
            <div class="aqi-week-bar-tooltip">
                <div><strong>${data.day}</strong></div>
                <div>AQI: ${data.aqi}</div>
                <div>PM2.5: ${data.pm25} μg/m³</div>
                <div>PM10: ${data.pm10} μg/m³</div>
                <div>Temp: ${data.temperature}°C</div>
                <div>Condition: ${data.condition}</div>
            </div>
            <div class="aqi-week-bar" style="height: ${aqiHeight}%;"></div>
            <div class="aqi-week-bar-pm25" style="height: ${pm25Height}%;"></div>
            <div class="aqi-week-bar-pm10" style="height: ${pm10Height}%;"></div>
            <div class="aqi-week-bar-aqi-value">${data.aqi}</div>
            <div class="aqi-week-bar-day">${data.day}</div>
        `;
        
        // Add color class to the main AQI bar
        const aqiBar = barGroup.querySelector('.aqi-week-bar');
        aqiBar.classList.add(aqiColorClass);
        
        // Add click event to show details
        barGroup.addEventListener('click', function() {
            showAQIWeekDetails(data);
        });
        
        return barGroup;
    }
    
    // Function to get AQI color class
    function getAQIColorClass(aqi) {
        if (aqi <= 50) return 'good';
        if (aqi <= 100) return 'moderate';
        if (aqi <= 150) return 'unhealthy-sensitive';
        if (aqi <= 200) return 'unhealthy';
        if (aqi <= 300) return 'very-unhealthy';
        return 'hazardous';
    }
    
    // Function to show AQI week details
    function showAQIWeekDetails(data) {
        const detailsContainer = document.getElementById('aqiWeekDetailsContainer');
        
        if (!detailsContainer) {
            console.error('AQI week details container not found');
            return;
        }
        
        // Get AQI color class and description
        const aqiColorClass = getAQIColorClass(data.aqi);
        const aqiDescription = getAQIDescription(data.aqi);
        const recommendation = getRecommendation(data.aqi);
        
        detailsContainer.innerHTML = `
            <div class="aqi-week-details-header">
                <div class="aqi-week-details-day">${data.day} - Detailed Air Quality</div>
                <button class="aqi-week-details-close" id="aqiWeekDetailsClose">&times;</button>
            </div>
            <div class="aqi-week-details-grid">
                <div class="aqi-week-details-item">
                    <div class="aqi-week-details-label">AQI</div>
                    <div class="aqi-week-details-value">
                        <span class="aqi-week-details-aqi-value ${aqiColorClass}">${data.aqi}</span>
                    </div>
                    <div class="aqi-week-details-label">${aqiDescription}</div>
                </div>
                <div class="aqi-week-details-item">
                    <div class="aqi-week-details-label">PM2.5</div>
                    <div class="aqi-week-details-value">${data.pm25} μg/m³</div>
                </div>
                <div class="aqi-week-details-item">
                    <div class="aqi-week-details-label">PM10</div>
                    <div class="aqi-week-details-value">${data.pm10} μg/m³</div>
                </div>
                <div class="aqi-week-details-item">
                    <div class="aqi-week-details-label">Temperature</div>
                    <div class="aqi-week-details-value">${data.temperature}°C</div>
                </div>
                <div class="aqi-week-details-item">
                    <div class="aqi-week-details-label">Condition</div>
                    <div class="aqi-week-details-value">${data.condition}</div>
                </div>
                <div class="aqi-week-details-item">
                    <div class="aqi-week-details-label">Recommendation</div>
                    <div class="aqi-week-details-value" style="font-size: 14px; line-height: 1.3;">${recommendation}</div>
                </div>
            </div>
        `;
        
        detailsContainer.classList.add('active');
        
        // Add close button event
        const closeButton = document.getElementById('aqiWeekDetailsClose');
        if (closeButton) {
            closeButton.addEventListener('click', function() {
                detailsContainer.classList.remove('active');
            });
        }
    }
    
    // Function to get AQI description
    function getAQIDescription(aqi) {
        if (aqi <= 50) return 'Good';
        if (aqi <= 100) return 'Moderate';
        if (aqi <= 150) return 'Unhealthy for Sensitive Groups';
        if (aqi <= 200) return 'Unhealthy';
        if (aqi <= 300) return 'Very Unhealthy';
        return 'Hazardous';
    }
    
    // Function to get recommendation based on AQI
    function getRecommendation(aqi) {
        if (aqi <= 50) return 'Air quality is satisfactory. Enjoy outdoor activities.';
        if (aqi <= 100) return 'Air quality is acceptable. Unusually sensitive people should consider limiting prolonged outdoor exertion.';
        if (aqi <= 150) return 'Members of sensitive groups may experience health effects. Children and elderly should limit outdoor exertion.';
        if (aqi <= 200) return 'Everyone may begin to experience health effects. Active children and adults should avoid prolonged outdoor exertion.';
        if (aqi <= 300) return 'Health alert! Everyone should avoid all outdoor exertion. Stay indoors and keep windows closed.';
        return 'Health warning of emergency conditions. The entire population is more likely to be affected. Avoid all physical outdoor activities.';
    }
    
    // Initialize the AQI week section when the DOM is loaded
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', window.aqiWeekSectionInit);
    } else {
        window.aqiWeekSectionInit();
    }
})();

// Add search functionality to main page
document.addEventListener('DOMContentLoaded', function() {
    // Set up search functionality
    setupMainPageSearch();
});

// Setup search functionality for main page
function setupMainPageSearch() {
    const searchTrigger = document.querySelector('.nave-save'); // Using the save icon for search in main page
    const searchDropdown = document.getElementById('searchDropdown');
    const searchInput = document.getElementById('searchInput');
    const searchResults = document.getElementById('searchResults');
    const searchClose = document.getElementById('searchClose');
    
    if (!searchTrigger || !searchDropdown) return;
    
    // Show search dropdown when search icon is clicked
    searchTrigger.addEventListener('click', function(e) {
        e.preventDefault();
        showSearchDropdown();
    });
    
    // Close search dropdown when close button is clicked
    searchClose.addEventListener('click', function() {
        hideSearchDropdown();
    });
    
    // Close search dropdown when clicking outside
    document.addEventListener('click', function(e) {
        if (searchDropdown && searchDropdown.style.display === 'block' && 
            !searchDropdown.contains(e.target) && 
            !searchTrigger.contains(e.target)) {
            hideSearchDropdown();
        }
    });
    
    // Handle input in search field
    searchInput.addEventListener('input', function() {
        filterStates(this.value);
    });
    
    // Handle keyboard navigation
    searchInput.addEventListener('keydown', function(e) {
        const items = searchResults.querySelectorAll('li');
        const activeItem = searchResults.querySelector('.active');
        let currentIndex = Array.prototype.indexOf.call(items, activeItem);
        
        switch(e.key) {
            case 'ArrowDown':
                e.preventDefault();
                if (currentIndex < items.length - 1) {
                    if (activeItem) activeItem.classList.remove('active');
                    items[currentIndex + 1].classList.add('active');
                } else if (items.length > 0) {
                    if (activeItem) activeItem.classList.remove('active');
                    items[0].classList.add('active');
                }
                break;
            case 'ArrowUp':
                e.preventDefault();
                if (currentIndex > 0) {
                    if (activeItem) activeItem.classList.remove('active');
                    items[currentIndex - 1].classList.add('active');
                } else if (items.length > 0) {
                    if (activeItem) activeItem.classList.remove('active');
                    items[items.length - 1].classList.add('active');
                }
                break;
            case 'Enter':
                e.preventDefault();
                if (activeItem) {
                    activeItem.click();
                }
                break;
            case 'Escape':
                hideSearchDropdown();
                break;
        }
    });
    
    // Load states data for search
    loadStatesDataForSearch();
}

// Show search dropdown
function showSearchDropdown() {
    const searchDropdown = document.getElementById('searchDropdown');
    const searchInput = document.getElementById('searchInput');
    
    if (searchDropdown) {
        // Position the dropdown relative to the search trigger
        const searchTrigger = document.querySelector('.nave-save');
        if (searchTrigger) {
            const rect = searchTrigger.getBoundingClientRect();
            searchDropdown.style.top = rect.bottom + 10 + 'px';
            searchDropdown.style.right = (window.innerWidth - rect.right) + 'px';
        }
        
        searchDropdown.style.display = 'block';
        searchInput.focus();
        filterStates(''); // Show all states initially
    }
}

// Hide search dropdown
function hideSearchDropdown() {
    const searchDropdown = document.getElementById('searchDropdown');
    const searchInput = document.getElementById('searchInput');
    const searchResults = document.getElementById('searchResults');
    
    if (searchDropdown) {
        searchDropdown.style.display = 'none';
        if (searchInput) searchInput.value = '';
        if (searchResults) searchResults.innerHTML = '';
    }
}

// Load states data for search
function loadStatesDataForSearch() {
    fetch('/api/aqi')
        .then(response => response.json())
        .then(data => {
            // Convert cities data to states format for search
            const statesData = Object.keys(data.cities)
                .filter(cityName => data.cities[cityName] && !data.cities[cityName].error)
                .map(cityName => {
                    const cityData = data.cities[cityName];
                    return {
                        state: cityName,
                        aqi: cityData.aqi,
                        temp: cityData.temp,
                        pm25: cityData.pm25,
                        pm10: cityData.pm10,
                        source: 'live'
                    };
                });
            window.statesData = statesData; // Store globally for filtering
            console.log('Live states data loaded for search:', statesData);
        })
        .catch(error => {
            console.error('Error loading live states data for search:', error);
            // Fallback to static data if live data fails
            fetch('map-section/assets/data/states_aqi.json')
                .then(response => response.json())
                .then(data => {
                    window.statesData = data; // Store globally for filtering
                    console.log('Static states data loaded for search:', data);
                })
                .catch(staticError => {
                    console.error('Error loading static states data for search:', staticError);
                });
        });
}

// Filter states based on search input
function filterStates(query) {
    const searchResults = document.getElementById('searchResults');
    if (!searchResults || !window.statesData) return;
    
    const filteredStates = window.statesData.filter(state => 
        state.state.toLowerCase().includes(query.toLowerCase())
    );
    
    displaySearchResults(filteredStates);
}

// Display search results
function displaySearchResults(states) {
    const searchResults = document.getElementById('searchResults');
    if (!searchResults) return;
    
    searchResults.innerHTML = '';
    
    if (states.length === 0) {
        const li = document.createElement('li');
        li.textContent = 'No states found';
        li.classList.add('no-results');
        searchResults.appendChild(li);
        return;
    }
    
    states.forEach((state, index) => {
        const li = document.createElement('li');
        li.textContent = state.state.charAt(0).toUpperCase() + state.state.slice(1);
        li.addEventListener('click', function() {
            // Navigate to state page
            window.location.href = `state.html?name=${encodeURIComponent(state.state)}`;
        });
        
        // Add active class to first item
        if (index === 0) {
            li.classList.add('active');
        }
        
        searchResults.appendChild(li);
    });
}

// Apply user settings on page load
async function applyUserSettings() {
    const token = localStorage.getItem('authToken');
    if (!token) return;
    
    try {
        const response = await fetch('/api/preferences', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        
        if (response.ok) {
            const preferences = await response.json();
            applySettings(preferences);
        }
    } catch (error) {
        console.error('Error applying user settings:', error);
    }
}

// Apply settings to the page
function applySettings(preferences) {
    if (!preferences) return;
    
    // Apply theme
    if (preferences.theme) {
        document.body.className = document.body.className.replace(/theme-\w+/g, '');
        document.body.classList.add(`theme-${preferences.theme}`);
    }
    
    // Apply temperature unit (this would affect how temperatures are displayed)
    if (preferences.temperature_unit) {
        // In a full implementation, you would update all temperature displays
        // For now, we'll just log it
        console.log('Temperature unit set to:', preferences.temperature_unit);
    }
    
    // Apply AQI scale
    if (preferences.aqi_scale) {
        // In a full implementation, you would update how AQI is calculated/displayed
        console.log('AQI scale set to:', preferences.aqi_scale);
    }
    
    // Load default city if set
    if (preferences.default_city) {
        // In a full implementation, you would load data for this city
        console.log('Default city set to:', preferences.default_city);
    }
    
    // Apply display preferences
    if (preferences.show_24hr_forecast !== undefined) {
        // Toggle 24-hour forecast visibility
        console.log('24-hour forecast visibility:', preferences.show_24hr_forecast);
    }
    
    if (preferences.show_week_prediction !== undefined) {
        // Toggle week prediction visibility
        console.log('Week prediction visibility:', preferences.show_week_prediction);
    }
    
    if (preferences.show_health_advice !== undefined) {
        // Toggle health advice visibility
        console.log('Health advice visibility:', preferences.show_health_advice);
    }
    
    if (preferences.show_global_compare !== undefined) {
        // Toggle global comparison visibility
        console.log('Global comparison visibility:', preferences.show_global_compare);
    }
}

// Call applyUserSettings when the page loads
document.addEventListener('DOMContentLoaded', function() {
    applyUserSettings();
    // Set up search functionality
    setupMainPageSearch();
});
