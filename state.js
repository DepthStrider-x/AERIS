// State-specific JavaScript functionality

// DOM Elements
const searchTrigger = document.querySelector('.nave-save');
const searchDropdown = document.getElementById('searchDropdown');
const searchInput = document.getElementById('searchInput');
const searchResults = document.getElementById('searchResults');
const searchClose = document.getElementById('searchClose');
const stateNameElement = document.getElementById('stateName');
const updatedTimeElement = document.getElementById('updatedTime');
const localTimeElement = document.getElementById('localTime');

// State data
let statesData = [];
let currentState = null;

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    // Check if we're on a state page
    const urlParams = new URLSearchParams(window.location.search);
    const stateName = urlParams.get('name');
    
    if (stateName) {
        loadStateData(stateName);
    }
    
    // Load states data for search
    loadStatesData();
    
    // Set up search functionality
    setupSearch();
    
    // Set up back button
    setupBackButton();
});

// Load states data for search
function loadStatesData() {
    fetch('map-section/assets/data/states_aqi.json')
        .then(response => response.json())
        .then(data => {
            statesData = data;
            console.log('States data loaded:', statesData);
        })
        .catch(error => {
            console.error('Error loading states data:', error);
        });
}

// Load data for a specific state
function loadStateData(stateName) {
    // Convert state name to lowercase for comparison
    const stateNameLower = stateName.toLowerCase();
    
    // Find the state in our data
    const state = statesData.find(s => s.state.toLowerCase() === stateNameLower);
    
    if (state) {
        currentState = state;
        updatePageWithStateData(state);
    } else {
        // If state not found, try to load from the GitHub JSON
        fetch("https://raw.githubusercontent.com/AryanPrajapati9456/AQI_SCRAPER/main/aqi.json")
            .then(res => res.json())
            .then(data => {
                // Map state names to city names in the GitHub data
                const stateToCityMap = {
                    'delhi': 'new-delhi',
                    'uttar pradesh': 'lucknow', // Using lucknow as representative city for UP
                    'maharashtra': 'mumbai',
                    'karnataka': 'bangalore',
                    'west bengal': 'kolkata',
                    'tamil nadu': 'chennai',
                    'rajasthan': 'jaipur',
                    'madhya pradesh': 'bhopal',
                    'gujarat': 'ahmedabad',
                    'andhra pradesh': 'hyderabad',
                    'odisha': 'bhubaneswar',
                    'kerala': 'kochi',
                    'telangana': 'hyderabad',
                    'punjab': 'amritsar',
                    'haryana': 'chandigarh',
                    'bihar': 'patna',
                    'assam': 'guwahati',
                    'chhattisgarh': 'raipur',
                    'jharkhand': 'ranchi',
                    'uttarakhand': 'dehradun',
                    'himachal pradesh': 'shimla',
                    'goa': 'panaji',
                    'sikkim': 'gangtok',
                    'meghalaya': 'shillong',
                    'manipur': 'imphal',
                    'mizoram': 'aizawl',
                    'tripura': 'agartala',
                    'nagaland': 'kohima',
                    'arunachal pradesh': 'itanagar'
                };
                
                // Special handling for specific cities
                if (stateNameLower === 'delhi') {
                    // Check if we have data for new-delhi
                    if (data.cities['new-delhi'] && !data.cities['new-delhi'].error) {
                        const cityData = data.cities['new-delhi'];
                        currentState = {
                            state: 'Delhi',
                            aqi: cityData.aqi,
                            temp: cityData.temp,
                            humidity: generateDummyValue(40, 80), // Not in data, generate dummy
                            wind_speed: generateDummyValue(5, 20), // Not in data, generate dummy
                            pm25: cityData.pm25,
                            pm10: cityData.pm10,
                            uv_index: generateDummyValue(1, 10) // Not in data, generate dummy
                        };
                        updatePageWithStateData(currentState);
                        return;
                    }
                } else if (stateNameLower === 'muzaffarnagar') {
                    // Check if we have data for muzaffarnagar
                    if (data.cities['muzaffarnagar'] && !data.cities['muzaffarnagar'].error) {
                        const cityData = data.cities['muzaffarnagar'];
                        currentState = {
                            state: 'Muzaffarnagar',
                            aqi: cityData.aqi,
                            temp: cityData.temp,
                            humidity: generateDummyValue(40, 80), // Not in data, generate dummy
                            wind_speed: generateDummyValue(5, 20), // Not in data, generate dummy
                            pm25: cityData.pm25,
                            pm10: cityData.pm10,
                            uv_index: generateDummyValue(1, 10) // Not in data, generate dummy
                        };
                        updatePageWithStateData(currentState);
                        return;
                    }
                }
                
                // For other states, try to find a representative city
                const cityName = stateToCityMap[stateNameLower] || stateNameLower;
                
                // Check if we have data for this city
                if (data.cities[cityName] && !data.cities[cityName].error) {
                    const cityData = data.cities[cityName];
                    currentState = {
                        state: stateName,
                        aqi: cityData.aqi,
                        temp: cityData.temp,
                        humidity: generateDummyValue(40, 80), // Not in data, generate dummy
                        wind_speed: generateDummyValue(5, 20), // Not in data, generate dummy
                        pm25: cityData.pm25,
                        pm10: cityData.pm10,
                        uv_index: generateDummyValue(1, 10) // Not in data, generate dummy
                    };
                    updatePageWithStateData(currentState);
                    return;
                }
                
                // If we still don't have data, generate dummy data
                currentState = {
                    state: stateName,
                    aqi: generateDummyValue(40, 320),
                    temp: generateDummyValue(25, 35),
                    humidity: generateDummyValue(40, 80),
                    wind_speed: generateDummyValue(5, 20),
                    pm25: generateDummyValue(30, 100),
                    pm10: generateDummyValue(50, 150),
                    uv_index: generateDummyValue(1, 10)
                };
                updatePageWithStateData(currentState);
            })
            .catch(error => {
                console.error('Error loading state data:', error);
                // Generate dummy data if fetch fails
                currentState = {
                    state: stateName,
                    aqi: generateDummyValue(40, 320),
                    temp: generateDummyValue(25, 35),
                    humidity: generateDummyValue(40, 80),
                    wind_speed: generateDummyValue(5, 20),
                    pm25: generateDummyValue(30, 100),
                    pm10: generateDummyValue(50, 150),
                    uv_index: generateDummyValue(1, 10)
                };
                updatePageWithStateData(currentState);
            });
    }
}

// Update page with state data
function updatePageWithStateData(state) {
    // Update state name
    stateNameElement.textContent = state.state.charAt(0).toUpperCase() + state.state.slice(1);
    
    // Update timestamp
    const now = new Date();
    updatedTimeElement.textContent = now.toLocaleDateString();
    localTimeElement.textContent = now.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
    
    // Update AQI data
    document.querySelector('.aqi-number').textContent = state.aqi;
    updateAQICircle(state.aqi);
    
    // Update weather data
    document.getElementById('temperature').textContent = `${state.temp}°C`;
    document.getElementById('humidity').textContent = `${state.humidity}%`;
    document.getElementById('windSpeed').textContent = `${state.wind_speed} km/h`;
    document.getElementById('uvIndex').textContent = state.uv_index || '--';
    
    // Update PM values
    document.getElementById('pm25').textContent = `${state.pm25} µg/m³`;
    document.getElementById('pm10').textContent = `${state.pm10} µg/m³`;
    
    // Update detailed info
    document.getElementById('detailHumidity').textContent = `${state.humidity}%`;
    document.getElementById('detailTemp').textContent = `${state.temp}°C`;
    document.getElementById('detailWind').textContent = `${state.wind_speed} km/h`;
    document.getElementById('detailPm25').textContent = `${state.pm25} µg/m³`;
    document.getElementById('detailPm10').textContent = `${state.pm10} µg/m³`;
    
    // Update last updated time
    document.getElementById('lastUpdated').textContent = "Updated just now";
    
    // Update advice
    const advice = generateAdvice(state.aqi);
    document.getElementById('adviceContent').textContent = advice;
    document.getElementById('advicePlaceholder').style.display = 'none';
    document.getElementById('adviceContent').style.display = 'block';
    
    // Update air insight card
    updateAirInsightCard(state.aqi);
    
    // Update weather section
    updateWeatherSection(state);
    
    // Update 7-day AQI prediction
    updateAQIWeekSection(state);
}

// Update AQI circle styling
function updateAQICircle(aqi) {
    const aqiCircle = document.getElementById('aqiCircle');
    const aqiCategory = document.getElementById('aqiCategory');
    const category = getAQICategory(aqi);
    
    aqiCircle.style.background = `radial-gradient(circle at center, ${category.color} 0%, ${darkenColor(category.color, 30)} 100%)`;
    aqiCircle.style.boxShadow = `0 0 30px ${category.color}`;
    aqiCategory.textContent = category.level;
    aqiCategory.style.color = category.color;
    
    // Update character image based on AQI
    updateCharacterImage(aqi);
}

// Get AQI category based on value
function getAQICategory(aqi) {
    const aqiCategories = {
        0: { level: 'Good', color: '#00e400', textColor: '#000' },
        51: { level: 'Moderate', color: '#ffff00', textColor: '#000' },
        101: { level: 'Unhealthy for Sensitive Groups', color: '#ff7e00', textColor: '#fff' },
        151: { level: 'Unhealthy', color: '#ff0000', textColor: '#fff' },
        201: { level: 'Very Unhealthy', color: '#8f3f97', textColor: '#fff' },
        301: { level: 'Hazardous', color: '#7e0023', textColor: '#fff' }
    };
    
    let category = aqiCategories[0];
    for (const level in aqiCategories) {
        if (aqi >= level) {
            category = aqiCategories[level];
        }
    }
    return category;
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
    const characterImage = document.getElementById('characterImage');
    const aqiCharacter = document.getElementById('aqiCharacter');
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
}

// Generate advice based on AQI
function generateAdvice(aqi) {
    if (aqi <= 50) {
        return "Air quality is satisfactory, and air pollution poses little or no risk to health.";
    } else if (aqi <= 100) {
        return "Air quality is acceptable. However, there may be a risk for some people, particularly those who are unusually sensitive.";
    } else if (aqi <= 150) {
        return "Members of sensitive groups may experience health effects. The general public is less likely to be affected.";
    } else if (aqi <= 200) {
        return "Everyone may begin to experience health effects; members of sensitive groups may experience more serious health effects.";
    } else if (aqi <= 300) {
        return "Health alert: The risk of health effects is increased for everyone.";
    } else {
        return "Health warning of emergency conditions: everyone is more likely to be affected.";
    }
}

// Generate dummy value within a range
function generateDummyValue(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Update air insight card based on AQI
function updateAirInsightCard(aqi) {
    const card = document.getElementById('airInsightCard');
    const shortMessage = document.getElementById('shortMessage');
    const fullMessage = document.getElementById('fullMessage');
    const professionalAdvice = document.getElementById('professionalAdvice');
    const category = getAQICategory(aqi);
    
    // Update card class based on AQI level
    card.className = 'air-insight-card';
    if (aqi > 50) card.classList.add(category.level.toLowerCase().replace(/\s+/g, '-'));
    
    // Update messages based on AQI
    if (aqi <= 50) {
        shortMessage.textContent = "Air quality is great today! 😌✨";
        fullMessage.textContent = "This air feels amazing today 😌✨ Perfect for outdoor activities like jogging, cycling, or having a picnic in the park.";
        professionalAdvice.innerHTML = "<strong>Professional Advice:</strong> Even though the air quality is excellent, it's always good to stay hydrated and protect your skin from UV exposure during extended outdoor activities.";
    } else if (aqi <= 100) {
        shortMessage.textContent = "Air quality is moderate today. 😊";
        fullMessage.textContent = "Air quality is generally acceptable, but there may be a risk for some sensitive individuals.";
        professionalAdvice.innerHTML = "<strong>Professional Advice:</strong> Unusually sensitive people should consider limiting prolonged outdoor exertion.";
    } else if (aqi <= 150) {
        shortMessage.textContent = "Sensitive groups should be cautious. 😷";
        fullMessage.textContent = "Members of sensitive groups may experience health effects. The general public is less likely to be affected.";
        professionalAdvice.innerHTML = "<strong>Professional Advice:</strong> People with heart or lung disease, older adults, and children should reduce prolonged or heavy exertion.";
    } else if (aqi <= 200) {
        shortMessage.textContent = "Air quality is unhealthy. 😷";
        fullMessage.textContent = "Everyone may begin to experience health effects; members of sensitive groups may experience more serious health effects.";
        professionalAdvice.innerHTML = "<strong>Professional Advice:</strong> People with heart or lung disease, older adults, and children should avoid prolonged or heavy exertion. Everyone else should reduce prolonged or heavy exertion.";
    } else if (aqi <= 300) {
        shortMessage.textContent = "Air quality is very unhealthy. 😷";
        fullMessage.textContent = "Health alert: The risk of health effects is increased for everyone.";
        professionalAdvice.innerHTML = "<strong>Professional Advice:</strong> People with heart or lung disease, older adults, and children should avoid all outdoor exertion. Everyone else should avoid prolonged outdoor exertion.";
    } else {
        shortMessage.textContent = "Air quality is hazardous! 😷";
        fullMessage.textContent = "Health warning of emergency conditions: everyone is more likely to be affected.";
        professionalAdvice.innerHTML = "<strong>Professional Advice:</strong> Everyone should avoid all outdoor exertion.";
    }
}

// Update weather section
function updateWeatherSection(state) {
    // This would typically load a weather forecast, but for now we'll use dummy data
    const weatherSection = document.getElementById('weather-section');
    weatherSection.innerHTML = `
        <div class="weather-section-header">
            <h2 class="weather-section-title">Today's Weather in ${state.state}</h2>
            <div class="weather-section-toggle">
                <button class="weather-section-toggle-btn active">Hourly</button>
                <button class="weather-section-toggle-btn">Weekly</button>
            </div>
        </div>
        <div class="weather-section-content">
            <div class="weather-section-scroll-container">
                <div class="weather-section-scroll-wrapper">
                    ${generateWeatherCards(state)}
                </div>
            </div>
        </div>
    `;
}

// Generate weather cards
function generateWeatherCards(state) {
    let cards = '';
    const hours = ['12 AM', '3 AM', '6 AM', '9 AM', '12 PM', '3 PM', '6 PM', '9 PM'];
    
    for (let i = 0; i < hours.length; i++) {
        const temp = state.temp + Math.floor(Math.random() * 5) - 2;
        const aqi = state.aqi + Math.floor(Math.random() * 20) - 10;
        const category = getAQICategory(Math.max(0, aqi));
        
        cards += `
            <div class="weather-section-card">
                <div class="weather-section-time">${hours[i]}</div>
                <div class="weather-section-temp">${temp}°C</div>
                <div class="weather-section-aqi">
                    AQI: 
                    <span class="weather-section-aqi-icon ${category.level.toLowerCase().replace(/\s+/g, '-')}" 
                          style="background-color: ${category.color};"></span>
                </div>
                <div class="weather-section-precipitation">${Math.floor(Math.random() * 30)}%</div>
                <div class="weather-section-expanded-details">
                    <div class="weather-section-humidity"><strong>Humidity:</strong> ${state.humidity + Math.floor(Math.random() * 10) - 5}%</div>
                    <div class="weather-section-wind"><strong>Wind:</strong> ${state.wind_speed + Math.floor(Math.random() * 5) - 2} km/h</div>
                </div>
            </div>
        `;
    }
    
    return cards;
}

// Update 7-day AQI prediction section
function updateAQIWeekSection(state) {
    const aqiWeekSection = document.getElementById('aqi-week-section');
    aqiWeekSection.innerHTML = `
        <div class="aqi-week-header">
            <h2 class="aqi-week-title">7-Day AQI Prediction for ${state.state}</h2>
            <div class="aqi-week-toggle">
                <button class="aqi-week-toggle-btn active">Graph</button>
                <button class="aqi-week-toggle-btn">List</button>
            </div>
        </div>
        <div class="aqi-week-content">
            <div class="aqi-week-graph-container">
                ${generateAQIGraph(state)}
            </div>
        </div>
    `;
}

// Generate AQI graph
function generateAQIGraph(state) {
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    let bars = '';
    
    for (let i = 0; i < days.length; i++) {
        // Generate AQI values that trend around the current state's AQI
        const aqi = state.aqi + Math.floor(Math.random() * 40) - 20;
        const height = Math.min(100, Math.max(10, (aqi / 500) * 100)); // Scale to 0-100%
        const category = getAQICategory(Math.max(0, aqi));
        
        bars += `
            <div class="aqi-week-bar-group">
                <div class="aqi-week-bar ${category.level.toLowerCase().replace(/\s+/g, '-')}" 
                     style="height: ${height}%; background: linear-gradient(to top, ${category.color}, ${lightenColor(category.color, 30)});">
                    <div class="aqi-week-bar-aqi-value">${Math.max(0, aqi)}</div>
                </div>
                <div class="aqi-week-bar-day">${days[i]}</div>
                <div class="aqi-week-bar-tooltip">
                    AQI: ${Math.max(0, aqi)}<br>
                    ${category.level}
                </div>
            </div>
        `;
    }
    
    return `
        <div class="aqi-week-y-axis">
            <span>500</span>
            <span>400</span>
            <span>300</span>
            <span>200</span>
            <span>100</span>
            <span>0</span>
        </div>
        <div class="aqi-week-grid-lines">
            <div class="aqi-week-grid-line" style="top: 0%;"></div>
            <div class="aqi-week-grid-line" style="top: 20%;"></div>
            <div class="aqi-week-grid-line" style="top: 40%;"></div>
            <div class="aqi-week-grid-line" style="top: 60%;"></div>
            <div class="aqi-week-grid-line" style="top: 80%;"></div>
            <div class="aqi-week-grid-line" style="top: 100%;"></div>
        </div>
        <div class="aqi-week-bars-container">
            ${bars}
        </div>
        <div class="aqi-week-legend">
            <div class="aqi-week-legend-item">
                <div class="aqi-week-legend-color aqi-week-legend-aqi"></div>
                <span>AQI Levels</span>
            </div>
        </div>
    `;
}

// Lighten a hex color
function lightenColor(color, percent) {
    let R = parseInt(color.substring(1, 3), 16);
    let G = parseInt(color.substring(3, 5), 16);
    let B = parseInt(color.substring(5, 7), 16);
    
    R = Math.min(255, Math.floor(R + (255 - R) * percent / 100));
    G = Math.min(255, Math.floor(G + (255 - G) * percent / 100));
    B = Math.min(255, Math.floor(B + (255 - B) * percent / 100));
    
    return `#${R.toString(16).padStart(2, '0')}${G.toString(16).padStart(2, '0')}${B.toString(16).padStart(2, '0')}`;
}

// Setup search functionality
function setupSearch() {
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
        if (searchDropdown.style.display === 'block' && 
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
}

// Show search dropdown
function showSearchDropdown() {
    searchDropdown.style.display = 'block';
    searchInput.focus();
    filterStates(''); // Show all states initially
}

// Hide search dropdown
function hideSearchDropdown() {
    searchDropdown.style.display = 'none';
    searchInput.value = '';
    searchResults.innerHTML = '';
}

// Filter states based on search input
function filterStates(query) {
    const filteredStates = statesData.filter(state => 
        state.state.toLowerCase().includes(query.toLowerCase())
    );
    
    displaySearchResults(filteredStates);
}

// Display search results
function displaySearchResults(states) {
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

// Setup back button
function setupBackButton() {
    const backButton = document.getElementById('backButton');
    if (backButton) {
        backButton.addEventListener('click', function() {
            document.querySelector('.main-info').style.display = 'flex';
            document.querySelector('.pm-values').style.display = 'flex';
            document.querySelector('.detailed-info').style.display = 'none';
        });
    }
    
    // Also set up the AQI circle to show detailed info
    const aqiCircle = document.getElementById('aqiCircle');
    if (aqiCircle) {
        aqiCircle.addEventListener('click', function() {
            document.querySelector('.main-info').style.display = 'none';
            document.querySelector('.pm-values').style.display = 'none';
            document.querySelector('.detailed-info').style.display = 'grid';
        });
    }
}