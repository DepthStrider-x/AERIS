(function() {
    // Private variables and functions
    let map;
    let geoJsonLayer;
    let statesData = {};
    let muzaffarnagarMarker;
    
    // AQI color mapping
    const aqiColors = {
        good: '#00e400',
        moderate: '#ffff00',
        unhealthy_s: '#ff7e00',
        unhealthy: '#ff0000',
        very_unhealthy: '#8f3f97',
        hazardous: '#7e0023'
    };
    
    // Get AQI category based on value
    function getAQICategory(aqi) {
        if (aqi <= 50) return { level: 'Good', color: aqiColors.good, key: 'good' };
        if (aqi <= 100) return { level: 'Moderate', color: aqiColors.moderate, key: 'moderate' };
        if (aqi <= 200) return { level: 'Unhealthy for Sensitive Groups', color: aqiColors.unhealthy_s, key: 'unhealthy_s' };
        if (aqi <= 300) return { level: 'Unhealthy', color: aqiColors.unhealthy, key: 'unhealthy' };
        if (aqi <= 400) return { level: 'Very Unhealthy', color: aqiColors.very_unhealthy, key: 'very_unhealthy' };
        return { level: 'Hazardous', color: aqiColors.hazardous, key: 'hazardous' };
    }
    
    // Generate random AQI value
    function generateRandomAQI() {
        return Math.floor(Math.random() * (320 - 40 + 1)) + 40;
    }
    
    // Fetch AQI data from GitHub
    async function fetchAQIData() {
        try {
            const response = await fetch('https://raw.githubusercontent.com/AryanPrajapati9456/AQI_SCRAPER/main/aqi.json');
            if (!response.ok) throw new Error('Failed to fetch AQI data');
            
            const data = await response.json();
            const cities = Object.values(data.cities);
            
            // Process city data into state data
            const stateData = {};
            cities.forEach(city => {
                if (!city.error && city.state) {
                    const stateName = city.state.toLowerCase();
                    if (!stateData[stateName] || city.aqi > stateData[stateName].aqi) {
                        stateData[stateName] = {
                            aqi: city.aqi,
                            temp: city.temp,
                            humidity: city.humidity,
                            source: 'aqi.json'
                        };
                    }
                }
            });
            
            return stateData;
        } catch (error) {
            console.error('Error fetching AQI data:', error);
            return null;
        }
    }
    
    // Generate fallback data for all Indian states
    function generateFallbackData() {
        const indianStates = [
            'andhra pradesh', 'arunachal pradesh', 'assam', 'bihar', 'chhattisgarh',
            'goa', 'gujarat', 'haryana', 'himachal pradesh', 'jharkhand',
            'karnataka', 'kerala', 'madhya pradesh', 'maharashtra', 'manipur',
            'meghalaya', 'mizoram', 'nagaland', 'odisha', 'punjab',
            'rajasthan', 'sikkim', 'tamil nadu', 'telangana', 'tripura',
            'uttar pradesh', 'uttarakhand', 'west bengal',
            'andaman and nicobar islands', 'chandigarh', 'dadra and nagar haveli',
            'daman and diu', 'lakshadweep', 'delhi', 'puducherry'
        ];
        
        const stateData = {};
        indianStates.forEach(state => {
            stateData[state] = {
                aqi: generateRandomAQI(),
                temp: '--',
                humidity: '--',
                source: 'generated'
            };
        });
        
        return stateData;
    }
    
    // Load and process state AQI data
    async function loadStateAQIData() {
        // Try to fetch real data first
        let stateData = await fetchAQIData();
        
        // If fetch failed, use generated data
        if (!stateData) {
            stateData = generateFallbackData();
            showToast();
        }
        
        // Merge with any existing generated data
        const fallbackData = generateFallbackData();
        Object.keys(fallbackData).forEach(state => {
            if (!stateData[state]) {
                stateData[state] = fallbackData[state];
            }
        });
        
        statesData = stateData;
        return stateData;
    }
    
    // Show toast notification
    function showToast() {
        const toast = document.getElementById('mapToast');
        if (toast) {
            toast.classList.add('show');
            setTimeout(() => {
                toast.classList.remove('show');
            }, 5000);
        }
    }
    
    // Style GeoJSON features
    function styleFeature(feature) {
        // All features are points, so style them as circles
        const stateName = feature.properties.ST_NM ? feature.properties.ST_NM.toLowerCase() : '';
        const stateInfo = statesData[stateName] || { aqi: generateRandomAQI(), source: 'generated' };
        const category = getAQICategory(stateInfo.aqi);
        
        return {
            radius: 8,
            fillColor: category.color,
            color: '#ffffff',
            weight: 1,
            opacity: 1,
            fillOpacity: 0.7
        };
    }
    
    // Highlight feature on hover
    function highlightFeature(e) {
        const layer = e.target;
        
        layer.setStyle({
            radius: 10,
            fillOpacity: 0.9
        });
        
        layer.bringToFront();
    }
    
    // Reset highlight on mouseout
    function resetHighlight(e) {
        // Reset to default style
        const feature = e.target.feature;
        const stateName = feature.properties.ST_NM ? feature.properties.ST_NM.toLowerCase() : '';
        const stateInfo = statesData[stateName] || { aqi: generateRandomAQI(), source: 'generated' };
        const category = getAQICategory(stateInfo.aqi);
        
        e.target.setStyle({
            radius: 8,
            fillColor: category.color,
            fillOpacity: 0.7
        });
    }
    
    // Zoom to feature on click
    function zoomToFeature(e) {
        const feature = e.target.feature;
        const coordinates = feature.geometry.coordinates;
        
        map.setView([coordinates[1], coordinates[0]], 8, {
            animate: true,
            duration: 1.0
        });
        
        // Get state info
        const stateName = feature.properties.ST_NM ? feature.properties.ST_NM.toLowerCase() : '';
        const stateInfo = statesData[stateName] || { aqi: generateRandomAQI(), source: 'generated' };
        const category = getAQICategory(stateInfo.aqi);
        
        // Create popup content
        const popupContent = createPopupContent(
            stateName,
            stateInfo.aqi,
            category.level,
            stateInfo.temp || '--',
            stateInfo.humidity || '--',
            stateInfo.source
        );
        
        // Bind and open popup
        e.target.bindPopup(popupContent, {
            className: 'map-section-popup'
        }).openPopup();
    }
    
    // Create popup content
    function createPopupContent(name, aqi, category, temp, humidity, source) {
        const categoryObj = getAQICategory(aqi);
        
        return `
            <div class="map-section-popup-content">
                <button class="map-section-popup-close" onclick="this.closest('.leaflet-popup').remove()">&times;</button>
                <h3 class="map-section-popup-title">${name}</h3>
                <div class="map-section-popup-aqi-stripe" style="background: ${categoryObj.color}"></div>
                <div class="map-section-popup-details">
                    <div class="map-section-popup-detail">
                        <span class="map-section-popup-label">AQI</span>
                        <span class="map-section-popup-value">${aqi}</span>
                    </div>
                    <div class="map-section-popup-detail">
                        <span class="map-section-popup-label">Category</span>
                        <span class="map-section-popup-value">${category}</span>
                    </div>
                    <div class="map-section-popup-detail">
                        <span class="map-section-popup-label">Temperature</span>
                        <span class="map-section-popup-value">${temp}°C</span>
                    </div>
                    <div class="map-section-popup-detail">
                        <span class="map-section-popup-label">Humidity</span>
                        <span class="map-section-popup-value">${humidity}%</span>
                    </div>
                </div>
                <div class="map-section-popup-source">Source: ${source}</div>
                <button class="map-section-popup-button" onclick="map.closePopup()">Back to map</button>
            </div>
        `;
    }
    
    // Load GeoJSON data
    async function loadGeoJSON() {
        try {
            const response = await fetch('assets/india_states.geojson');
            if (!response.ok) throw new Error('GeoJSON file not found');
            const geojsonData = await response.json();
            
            // Filter out Uttar Pradesh since we'll show Muzaffarnagar separately
            const filteredFeatures = geojsonData.features.filter(feature => 
                feature.properties.ST_NM !== 'Uttar Pradesh'
            );
            
            return {
                ...geojsonData,
                features: filteredFeatures
            };
        } catch (error) {
            console.error('Error loading GeoJSON:', error);
            return null;
        }
    }

    // Attach event listeners to features
    function onEachFeature(feature, layer) {
        layer.on({
            mouseover: highlightFeature,
            mouseout: resetHighlight,
            click: zoomToFeature
        });
    }
    
    // Create Muzaffarnagar marker (separate from GeoJSON points)
    function createMuzaffarnagarMarker() {
        // Muzaffarnagar coordinates (correct coordinates within India)
        const muzaffarnagarLatLng = [29.4709, 77.7033]; // Correct coordinates for Muzaffarnagar, India
        
        // Get AQI data for Muzaffarnagar (from Uttar Pradesh)
        const stateData = statesData['uttar pradesh'] || { aqi: generateRandomAQI(), temp: '--', humidity: '--', source: 'generated' };
        const category = getAQICategory(stateData.aqi);
        
        // Create custom icon with pulsing animation and dynamic color based on AQI
        const pulsingIcon = L.divIcon({
            className: 'map-section-pulsing-marker',
            iconSize: [20, 20],
            html: `<div class="map-section-pulsing-marker-inner" style="background-color: ${category.color};"></div>`
        });
        
        // Create marker
        muzaffarnagarMarker = L.marker(muzaffarnagarLatLng, { icon: pulsingIcon })
            .addTo(map)
            .bindPopup(createPopupContent(
                'Muzaffarnagar — Current Location',
                stateData.aqi,
                category.level,
                stateData.temp,
                stateData.humidity,
                stateData.source
            ), {
                className: 'map-section-popup'
            });
        
        // Add click event to fly to location
        muzaffarnagarMarker.on('click', function() {
            map.flyTo(muzaffarnagarLatLng, 11, {
                animate: true,
                duration: 1.5
            });
        });
        
        // Log to console for debugging
        console.log('Muzaffarnagar marker created at:', muzaffarnagarLatLng);
    }
    
    // Initialize the map
    async function initMap() {
        // Create map centered on India
        map = L.map('mapSectionMap').setView([22.5726, 82.9375], 5);
        
        // Add OpenStreetMap tiles
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);
        
        // Load state AQI data
        await loadStateAQIData();
        
        // Try to load GeoJSON
        const geojsonData = await loadGeoJSON();
        
        if (geojsonData) {
            // Add GeoJSON layer
            geoJsonLayer = L.geoJSON(geojsonData, {
                style: styleFeature,
                onEachFeature: onEachFeature
            }).addTo(map);
        }
        
        // Create Muzaffarnagar marker (always create this in addition to GeoJSON points)
        createMuzaffarnagarMarker();
        
        // Add back button functionality
        const backButton = document.getElementById('mapBackButton');
        if (backButton) {
            backButton.addEventListener('click', function() {
                if (window.history.length > 1) {
                    window.history.back();
                } else {
                    window.location.href = '../index.html';
                }
            });
        }
        
        // Add animation to map container
        const mapContainer = document.querySelector('.map-section-map');
        if (mapContainer) {
            mapContainer.style.opacity = '0';
            mapContainer.style.transform = 'scale(0.95)';
            
            setTimeout(() => {
                mapContainer.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
                mapContainer.style.opacity = '1';
                mapContainer.style.transform = 'scale(1)';
            }, 100);
        }
    }
    
    // Public API
    window.mapSectionInit = function() {
        return new Promise((resolve, reject) => {
            try {
                initMap().then(resolve).catch(reject);
            } catch (error) {
                reject(error);
            }
        });
    };
})();