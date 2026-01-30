// What is AQI Section Implementation with Interactive Animations
function initWhatIsAQISection() {
    // Check if the element exists
    const sectionContainer = document.getElementById('what-is-aqi-section');
    if (!sectionContainer) {
        console.warn('What is AQI section container not found');
        return;
    }
    
    // Create the HTML structure with interactive elements and animations
    sectionContainer.innerHTML = '<div class="what-is-aqi-container">' +
        '<div class="what-is-aqi-header">' +
            '<h2 class="what-is-aqi-title">What is AQI? Understanding Air Quality and Why It Matters 🌬️🌿</h2>' +
        '</div>' +
        
        '<div class="what-is-aqi-content">' +
            '<div class="what-is-aqi-intro">' +
                '<p class="intro-text">' +
                    'Air Quality Index, commonly known as AQI, is a number that tells us how clean or polluted the air is in a specific location. ' +
                    'It\'s like a thermometer for the air — except instead of measuring temperature, it measures pollution levels. ' +
                    'Imagine stepping outside and being able to instantly know whether the air is safe to breathe or if you should stay indoors. ' +
                    'That\'s what AQI does! 🌤️' +
                '</p>' +
            '</div>' +
            
            '<div class="pollutants-section">' +
                '<h3 class="section-title">AQI is calculated using data from multiple pollutants in the air:</h3>' +
                '<div class="pollutants-grid">' +
                    '<div class="pollutant-card" data-pollutant="pm25">' +
                        '<div class="pollutant-icon">🌫️</div>' +
                        '<div class="pollutant-name">PM2.5</div>' +
                        '<div class="pollutant-desc">(Particulate Matter smaller than 2.5 micrometers)</div>' +
                    '</div>' +
                    '<div class="pollutant-card" data-pollutant="pm10">' +
                        '<div class="pollutant-icon">🌫️</div>' +
                        '<div class="pollutant-name">PM10</div>' +
                        '<div class="pollutant-desc">(Particulate Matter smaller than 10 micrometers)</div>' +
                    '</div>' +
                    '<div class="pollutant-card" data-pollutant="o3">' +
                        '<div class="pollutant-icon">🧪</div>' +
                        '<div class="pollutant-name">Ozone</div>' +
                        '<div class="pollutant-desc">(O₃)</div>' +
                    '</div>' +
                    '<div class="pollutant-card" data-pollutant="no2">' +
                        '<div class="pollutant-icon">🏭</div>' +
                        '<div class="pollutant-name">Nitrogen Dioxide</div>' +
                        '<div class="pollutant-desc">(NO₂)</div>' +
                    '</div>' +
                    '<div class="pollutant-card" data-pollutant="so2">' +
                        '<div class="pollutant-icon">🔥</div>' +
                        '<div class="pollutant-name">Sulfur Dioxide</div>' +
                        '<div class="pollutant-desc">(SO₂)</div>' +
                    '</div>' +
                    '<div class="pollutant-card" data-pollutant="co">' +
                        '<div class="pollutant-icon">🚗</div>' +
                        '<div class="pollutant-name">Carbon Monoxide</div>' +
                        '<div class="pollutant-desc">(CO)</div>' +
                    '</div>' +
                '</div>' +
            '</div>' +
            
            '<div class="aqi-categories-section">' +
                '<h3 class="section-title">AQI Categories and What They Mean 🌈</h3>' +
                '<div class="aqi-categories-container">' +
                    '<div class="aqi-category-card good" data-category="good">' +
                        '<div class="category-range">0–50</div>' +
                        '<div class="category-name">Good 🟢</div>' +
                        '<div class="category-desc">The air is clean, safe and healthy. You can go for a walk, jog or cycle without worry. Your lungs are happy! 😄</div>' +
                    '</div>' +
                    '<div class="aqi-category-card moderate" data-category="moderate">' +
                        '<div class="category-range">51–100</div>' +
                        '<div class="category-name">Moderate 🟡</div>' +
                        '<div class="category-desc">The air quality is acceptable, but some sensitive people, like children, elderly or those with respiratory conditions, might notice mild irritation.</div>' +
                    '</div>' +
                    '<div class="aqi-category-card unhealthy-sensitive" data-category="unhealthy-sensitive">' +
                        '<div class="category-range">101–150</div>' +
                        '<div class="category-name">Unhealthy for Sensitive Groups 🟠</div>' +
                        '<div class="category-desc">People with asthma, heart conditions or lung problems should take care. Outdoor activities might be slightly risky.</div>' +
                    '</div>' +
                    '<div class="aqi-category-card unhealthy" data-category="unhealthy">' +
                        '<div class="category-range">151–200</div>' +
                        '<div class="category-name">Unhealthy 🔴</div>' +
                        '<div class="category-desc">Everyone may start experiencing some health effects. Long outdoor exposure is not recommended. Masks can help reduce inhalation of pollutants.</div>' +
                    '</div>' +
                    '<div class="aqi-category-card very-unhealthy" data-category="very-unhealthy">' +
                        '<div class="category-range">201–300</div>' +
                        '<div class="category-name">Very Unhealthy 🟣</div>' +
                        '<div class="category-desc">Serious health effects for everyone. Outdoor activities should be minimized. Sensitive groups must take extra precautions.</div>' +
                    '</div>' +
                    '<div class="aqi-category-card hazardous" data-category="hazardous">' +
                        '<div class="category-range">301–500</div>' +
                        '<div class="category-name">Hazardous ⚫</div>' +
                        '<div class="category-desc">This is the worst-case scenario. The air is extremely polluted, and everyone should stay indoors. Using air purifiers or N95 masks is highly recommended.</div>' +
                    '</div>' +
                '</div>' +
            '</div>' +
            
            '<div class="why-aqi-matters-section">' +
                '<h3 class="section-title">Why AQI is Important 💡</h3>' +
                '<p class="section-text">' +
                    'Air pollution is one of the leading causes of respiratory diseases, heart conditions, and even premature deaths worldwide. 🌍 ' +
                    'According to research, millions of people die each year due to air pollution. Imagine tiny invisible particles floating in the air — ' +
                    'that\'s PM2.5 — sneaking into your lungs, affecting your heart, and silently causing harm. 😷' +
                '</p>' +
                '<div class="aqi-example">' +
                    '<div class="example-item">' +
                        '<div class="example-icon">🚴‍♂️</div>' +
                        '<div class="example-text">On a Good (0–50) day, you can enjoy outdoor sports, walking, or cycling without worry.</div>' +
                    '</div>' +
                    '<div class="example-item">' +
                        '<div class="example-icon">😷</div>' +
                        '<div class="example-text">On an Unhealthy day (151–200), even a short walk can irritate your throat, lungs, or eyes. Wearing a mask or staying indoors is wise.</div>' +
                    '</div>' +
                '</div>' +
            '</div>' +
            
            '<div class="how-aqi-measured-section">' +
                '<h3 class="section-title">How AQI is Measured 🧪</h3>' +
                '<p class="section-text">' +
                    'Air quality monitoring stations are placed in cities and regions to measure pollutants in real-time. ' +
                    'These stations collect data and feed it into algorithms that calculate the AQI.' +
                '</p>' +
                '<div class="measurement-example">' +
                    '<div class="example-icon">📈</div>' +
                    '<div class="example-text">' +
                        'For instance, if Delhi\'s PM2.5 levels are high due to smog, vehicle emissions, and industrial activity, ' +
                        'the AQI will reflect this with a higher number, signaling risk for residents.' +
                    '</div>' +
                '</div>' +
            '</div>' +
            
            '<div class="causes-section">' +
                '<h3 class="section-title">Common Causes of Air Pollution 🚗🏭🔥</h3>' +
                '<div class="causes-grid">' +
                    '<div class="cause-item">' +
                        '<div class="cause-icon">🚙💨</div>' +
                        '<div class="cause-text">Vehicle emissions: Cars, buses, and trucks release Nitrogen Dioxide and Carbon Monoxide.</div>' +
                    '</div>' +
                    '<div class="cause-item">' +
                        '<div class="cause-icon">🏭</div>' +
                        '<div class="cause-text">Industrial activity: Factories produce smoke and chemicals that mix into the air.</div>' +
                    '</div>' +
                    '<div class="cause-item">' +
                        '<div class="cause-icon">🔥</div>' +
                        '<div class="cause-text">Burning waste: Open burning of garbage, leaves, or crop residue releases harmful particles.</div>' +
                    '</div>' +
                    '<div class="cause-item">' +
                        '<div class="cause-icon">🏗️</div>' +
                        '<div class="cause-text">Construction dust: Buildings in progress release PM10 and PM2.5.</div>' +
                    '</div>' +
                    '<div class="cause-item">' +
                        '<div class="cause-icon">🌾</div>' +
                        '<div class="cause-text">Natural sources: Dust storms, wildfires, and pollen also contribute, though less controllable.</div>' +
                    '</div>' +
                '</div>' +
            '</div>' +
            
            '<div class="health-effects-section">' +
                '<h3 class="section-title">Health Effects of Poor AQI 🫁❤️</h3>' +
                '<div class="health-effects-container">' +
                    '<div class="health-effect-item">' +
                        '<div class="effect-icon">⚠️</div>' +
                        '<div class="effect-text">Short-term effects: coughing, eye irritation, throat irritation, shortness of breath.</div>' +
                    '</div>' +
                    '<div class="health-effect-item">' +
                        '<div class="effect-icon">⚠️</div>' +
                        '<div class="effect-text">Medium-term effects: aggravation of asthma, bronchitis, or cardiovascular stress.</div>' +
                    '</div>' +
                    '<div class="health-effect-item">' +
                        '<div class="effect-icon">⚠️</div>' +
                        '<div class="effect-text">Long-term effects: chronic lung disease, heart disease, reduced life expectancy.</div>' +
                    '</div>' +
                '</div>' +
                '<p class="sensitive-groups">' +
                    'Sensitive groups like children, the elderly, and people with pre-existing conditions are at higher risk.' +
                '</p>' +
            '</div>' +
            
            '<div class="fun-facts-section">' +
                '<h3 class="section-title">Fun Facts & Awareness Nuggets 🧠</h3>' +
                '<div class="facts-container">' +
                    '<div class="fact-item">' +
                        '<div class="fact-icon">🌫️</div>' +
                        '<div class="fact-text">AQI not only affects health but also visibility — ever seen a hazy skyline in winter? That\'s pollution at work.</div>' +
                    '</div>' +
                    '<div class="fact-item">' +
                        '<div class="fact-icon">🏠</div>' +
                        '<div class="fact-text">Indoor air can also be polluted — cooking, incense, and poor ventilation add PM2.5 particles inside your home.</div>' +
                    '</div>' +
                    '<div class="fact-item">' +
                        '<div class="fact-icon">🌱😷</div>' +
                        '<div class="fact-text">Using air purifiers, masks, and plants indoors can help reduce exposure.</div>' +
                    '</div>' +
                    '<div class="fact-item">' +
                        '<div class="fact-icon">⏰</div>' +
                        '<div class="fact-text">Some days, AQI can change hour by hour depending on traffic, weather, and industrial activity. This is why monitoring it dynamically is crucial.</div>' +
                    '</div>' +
                '</div>' +
            '</div>' +
            
            '<div class="stay-safe-section">' +
                '<h3 class="section-title">How You Can Stay Safe 🛡️</h3>' +
                '<div class="safety-tips-container">' +
                    '<div class="tip-item">' +
                        '<div class="tip-icon">📱</div>' +
                        '<div class="tip-text">Check AQI before stepping out: Use apps or websites (like ours 😉) to know the real-time air quality.</div>' +
                    '</div>' +
                    '<div class="tip-item">' +
                        '<div class="tip-icon">🚫</div>' +
                        '<div class="tip-text">Limit outdoor activity on high AQI days: Especially for sensitive groups.</div>' +
                    '</div>' +
                    '<div class="tip-item">' +
                        '<div class="tip-icon">😷</div>' +
                        '<div class="tip-text">Use protective gear: N95 or similar masks reduce inhalation of PM2.5.</div>' +
                    '</div>' +
                    '<div class="tip-item">' +
                        '<div class="tip-icon">🌿</div>' +
                        '<div class="tip-text">Keep indoor air clean: Use purifiers, ventilate strategically, and avoid burning waste inside.</div>' +
                    '</div>' +
                    '<div class="tip-item">' +
                        '<div class="tip-icon">🌳</div>' +
                        '<div class="tip-text">Plant trees & greenery: Helps absorb pollutants and improves air quality long-term.</div>' +
                    '</div>' +
                '</div>' +
            '</div>' +
            
            '<div class="awareness-matters-section">' +
                '<h3 class="section-title">Why Awareness Matters 📢</h3>' +
                '<p class="section-text">' +
                    'Many people underestimate air pollution because it\'s invisible. Unlike rain or sun, you can\'t see particles in the air. ' +
                    'But AQI acts as a warning signal, a silent guardian that protects your health. By understanding AQI, ' +
                    'you\'re not only saving your lungs but also spreading awareness to others. 🌎💚' +
                '</p>' +
            '</div>' +
            
            '<div class="conclusion-section">' +
                '<h3 class="section-title">Conclusion — Breathe Smart, Live Smart 🌬️✨</h3>' +
                '<p class="section-text">' +
                    'AQI is more than just a number — it\'s a measure of your environment\'s safety. ' +
                    'By monitoring, understanding, and reacting to AQI levels, you can protect yourself and your loved ones.' +
                '</p>' +
                '<div class="conclusion-tips">' +
                    '<p>Remember: even small actions like wearing a mask, reducing outdoor exposure on polluted days, ' +
                    'and keeping indoor air clean can make a huge difference.</p>' +
                    '<p>Let\'s all take a step toward better air, healthier lungs, and a safer planet. 🌿💨</p>' +
                '</div>' +
            '</div>' +
        '</div>' +
    '</div>';
    
    // Add CSS styles for the section
    const style = document.createElement('style');
    style.textContent = '' +
        '.what-is-aqi-container {' +
            'background: linear-gradient(135deg, #1a1a2e, #16213e, #0f3460);' +
            'border-radius: 20px;' +
            'padding: 30px;' +
            'margin: 30px 0;' +
            'color: white;' +
            'box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);' +
            'overflow: hidden;' +
            'position: relative;' +
        '}' +
        
        '.what-is-aqi-container::before {' +
            'content: \'\';' +
            'position: absolute;' +
            'top: 0;' +
            'left: 0;' +
            'right: 0;' +
            'height: 5px;' +
            'background: linear-gradient(90deg, #00e400, #ffff00, #ff7e00, #ff0000, #8f3f97, #7e0023);' +
            'animation: gradientShift 3s linear infinite;' +
            'background-size: 200% 200%;' +
        '}' +
        
        '@keyframes gradientShift {' +
            '0% { background-position: 0% 50%; }' +
            '50% { background-position: 100% 50%; }' +
            '100% { background-position: 0% 50%; }' +
        '}' +
        
        '.what-is-aqi-header {' +
            'text-align: center;' +
            'margin-bottom: 30px;' +
            'animation: fadeInDown 0.8s ease-out;' +
        '}' +
        
        '.what-is-aqi-title {' +
            'font-size: 28px;' +
            'font-weight: 700;' +
            'color: #35c5cf;' +
            'margin-bottom: 15px;' +
            'text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);' +
        '}' +
        
        '.what-is-aqi-content {' +
            'display: flex;' +
            'flex-direction: column;' +
            'gap: 30px;' +
        '}' +
        
        '.section-title {' +
            'font-size: 24px;' +
            'color: #35c5cf;' +
            'margin-bottom: 20px;' +
            'position: relative;' +
            'padding-bottom: 10px;' +
            'animation: slideInLeft 0.6s ease-out;' +
        '}' +
        
        '.section-title::after {' +
            'content: \'\';' +
            'position: absolute;' +
            'bottom: 0;' +
            'left: 0;' +
            'width: 60px;' +
            'height: 3px;' +
            'background: #35c5cf;' +
            'border-radius: 3px;' +
        '}' +
        
        '.section-text {' +
            'color: #d0d0e0;' +
            'line-height: 1.7;' +
            'margin-bottom: 20px;' +
            'animation: fadeIn 0.8s ease-out;' +
        '}' +
        
        '/* Intro section */' +
        '.what-is-aqi-intro {' +
            'background: rgba(255, 255, 255, 0.05);' +
            'border-radius: 15px;' +
            'padding: 25px;' +
            'box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);' +
            'animation: slideInUp 0.7s ease-out;' +
        '}' +
        
        '.intro-text {' +
            'font-size: 18px;' +
            'color: #e0e0f0;' +
            'line-height: 1.8;' +
        '}' +
        
        '/* Pollutants section */' +
        '.pollutants-section {' +
            'animation: fadeIn 0.8s ease-out;' +
        '}' +
        
        '.pollutants-grid {' +
            'display: grid;' +
            'grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));' +
            'gap: 20px;' +
            'margin-top: 20px;' +
        '}' +
        
        '.pollutant-card {' +
            'background: rgba(255, 255, 255, 0.08);' +
            'border-radius: 15px;' +
            'padding: 20px;' +
            'text-align: center;' +
            'transition: all 0.3s ease;' +
            'cursor: pointer;' +
            'position: relative;' +
            'overflow: hidden;' +
            'animation: floatIn 0.5s ease-out;' +
            'animation-fill-mode: both;' +
        '}' +
        
        '.pollutant-card:hover {' +
            'transform: translateY(-10px) scale(1.03);' +
            'background: rgba(53, 197, 207, 0.2);' +
            'box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);' +
        '}' +
        
        '.pollutant-card::before {' +
            'content: \'\';' +
            'position: absolute;' +
            'top: 0;' +
            'left: 0;' +
            'width: 100%;' +
            'height: 4px;' +
            'background: #35c5cf;' +
            'transform: scaleX(0);' +
            'transform-origin: left;' +
            'transition: transform 0.3s ease;' +
        '}' +
        
        '.pollutant-card:hover::before {' +
            'transform: scaleX(1);' +
        '}' +
        
        '.pollutant-icon {' +
            'font-size: 40px;' +
            'margin-bottom: 15px;' +
            'animation: bounce 2s infinite;' +
        '}' +
        
        '.pollutant-name {' +
            'font-size: 20px;' +
            'font-weight: 600;' +
            'color: #35c5cf;' +
            'margin-bottom: 10px;' +
        '}' +
        
        '.pollutant-desc {' +
            'font-size: 14px;' +
            'color: #a0a0d0;' +
        '}' +
        
        '/* AQI Categories section */' +
        '.aqi-categories-section {' +
            'animation: fadeIn 0.8s ease-out;' +
        '}' +
        
        '.aqi-categories-container {' +
            'display: grid;' +
            'grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));' +
            'gap: 20px;' +
            'margin-top: 20px;' +
        '}' +
        
        '.aqi-category-card {' +
            'border-radius: 15px;' +
            'padding: 25px;' +
            'transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);' +
            'cursor: pointer;' +
            'position: relative;' +
            'overflow: hidden;' +
            'box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);' +
            'animation: slideInUp 0.5s ease-out;' +
            'animation-fill-mode: both;' +
        '}' +
        
        '.aqi-category-card:hover {' +
            'transform: translateY(-10px);' +
            'box-shadow: 0 15px 30px rgba(0, 0, 0, 0.3);' +
        '}' +
        
        '.aqi-category-card::before {' +
            'content: \'\';' +
            'position: absolute;' +
            'top: 0;' +
            'left: 0;' +
            'width: 100%;' +
            'height: 100%;' +
            'background: linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0));' +
            'z-index: 0;' +
        '}' +
        
        '.category-range {' +
            'font-size: 18px;' +
            'font-weight: 600;' +
            'margin-bottom: 10px;' +
            'position: relative;' +
            'z-index: 1;' +
        '}' +
        
        '.category-name {' +
            'font-size: 22px;' +
            'font-weight: 700;' +
            'margin-bottom: 15px;' +
            'position: relative;' +
            'z-index: 1;' +
        '}' +
        
        '.category-desc {' +
            'font-size: 16px;' +
            'line-height: 1.6;' +
            'position: relative;' +
            'z-index: 1;' +
        '}' +
        
        '/* Different colors for each category */' +
        '.aqi-category-card.good {' +
            'background: linear-gradient(135deg, #009900, #00e400);' +
            'color: #000000;' +
        '}' +
        
        '.aqi-category-card.moderate {' +
            'background: linear-gradient(135deg, #cccc00, #ffff00);' +
            'color: #000000;' +
        '}' +
        
        '.aqi-category-card.unhealthy-sensitive {' +
            'background: linear-gradient(135deg, #cc6600, #ff7e00);' +
            'color: #ffffff;' +
        '}' +
        
        '.aqi-category-card.unhealthy {' +
            'background: linear-gradient(135deg, #cc0000, #ff0000);' +
            'color: #ffffff;' +
        '}' +
        
        '.aqi-category-card.very-unhealthy {' +
            'background: linear-gradient(135deg, #663377, #8f3f97);' +
            'color: #ffffff;' +
        '}' +
        
        '.aqi-category-card.hazardous {' +
            'background: linear-gradient(135deg, #550011, #7e0023);' +
            'color: #ffffff;' +
        '}' +
        
        '/* Examples section */' +
        '.aqi-example {' +
            'display: flex;' +
            'flex-wrap: wrap;' +
            'gap: 30px;' +
            'margin-top: 20px;' +
        '}' +
        
        '.example-item {' +
            'flex: 1;' +
            'min-width: 300px;' +
            'background: rgba(255, 255, 255, 0.05);' +
            'border-radius: 15px;' +
            'padding: 20px;' +
            'display: flex;' +
            'align-items: center;' +
            'gap: 20px;' +
            'animation: slideInRight 0.7s ease-out;' +
        '}' +
        
        '.example-icon {' +
            'font-size: 40px;' +
            'flex-shrink: 0;' +
            'animation: pulse 2s infinite;' +
        '}' +
        
        '.example-text {' +
            'font-size: 16px;' +
            'color: #d0d0e0;' +
            'line-height: 1.6;' +
        '}' +
        
        '/* Measurement example */' +
        '.measurement-example {' +
            'display: flex;' +
            'align-items: center;' +
            'gap: 20px;' +
            'background: rgba(255, 255, 255, 0.05);' +
            'border-radius: 15px;' +
            'padding: 20px;' +
            'margin-top: 20px;' +
            'animation: slideInUp 0.7s ease-out;' +
        '}' +
        
        '/* Causes section */' +
        '.causes-section {' +
            'animation: fadeIn 0.8s ease-out;' +
        '}' +
        
        '.causes-grid {' +
            'display: grid;' +
            'grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));' +
            'gap: 20px;' +
            'margin-top: 20px;' +
        '}' +
        
        '.cause-item {' +
            'display: flex;' +
            'align-items: flex-start;' +
            'gap: 15px;' +
            'background: rgba(255, 255, 255, 0.05);' +
            'border-radius: 15px;' +
            'padding: 20px;' +
            'animation: floatIn 0.5s ease-out;' +
        '}' +
        
        '.cause-icon {' +
            'font-size: 30px;' +
            'flex-shrink: 0;' +
            'animation: bounce 3s infinite;' +
        '}' +
        
        '.cause-text {' +
            'font-size: 16px;' +
            'color: #d0d0e0;' +
            'line-height: 1.6;' +
        '}' +
        
        '/* Health effects section */' +
        '.health-effects-section {' +
            'animation: fadeIn 0.8s ease-out;' +
        '}' +
        
        '.health-effects-container {' +
            'display: flex;' +
            'flex-direction: column;' +
            'gap: 15px;' +
            'margin-top: 20px;' +
        '}' +
        
        '.health-effect-item {' +
            'display: flex;' +
            'align-items: center;' +
            'gap: 15px;' +
            'background: rgba(255, 255, 255, 0.05);' +
            'border-radius: 15px;' +
            'padding: 15px 20px;' +
            'animation: slideInLeft 0.5s ease-out;' +
        '}' +
        
        '.effect-icon {' +
            'font-size: 24px;' +
            'flex-shrink: 0;' +
            'color: #ff6b6b;' +
            'animation: pulse 2s infinite;' +
        '}' +
        
        '.effect-text {' +
            'font-size: 16px;' +
            'color: #d0d0e0;' +
            'line-height: 1.6;' +
        '}' +
        
        '.sensitive-groups {' +
            'margin-top: 20px;' +
            'font-size: 18px;' +
            'font-weight: 500;' +
            'color: #ff6b6b;' +
            'text-align: center;' +
            'padding: 15px;' +
            'background: rgba(255, 107, 107, 0.1);' +
            'border-radius: 10px;' +
            'animation: fadeIn 1s ease-out;' +
        '}' +
        
        '/* Fun facts section */' +
        '.fun-facts-section {' +
            'animation: fadeIn 0.8s ease-out;' +
        '}' +
        
        '.facts-container {' +
            'display: grid;' +
            'grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));' +
            'gap: 20px;' +
            'margin-top: 20px;' +
        '}' +
        
        '.fact-item {' +
            'display: flex;' +
            'align-items: flex-start;' +
            'gap: 15px;' +
            'background: rgba(255, 255, 255, 0.05);' +
            'border-radius: 15px;' +
            'padding: 20px;' +
            'animation: floatIn 0.5s ease-out;' +
        '}' +
        
        '.fact-icon {' +
            'font-size: 28px;' +
            'flex-shrink: 0;' +
            'animation: bounce 3s infinite;' +
        '}' +
        
        '.fact-text {' +
            'font-size: 16px;' +
            'color: #d0d0e0;' +
            'line-height: 1.6;' +
        '}' +
        
        '/* Stay safe section */' +
        '.stay-safe-section {' +
            'animation: fadeIn 0.8s ease-out;' +
        '}' +
        
        '.safety-tips-container {' +
            'display: grid;' +
            'grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));' +
            'gap: 20px;' +
            'margin-top: 20px;' +
        '}' +
        
        '.tip-item {' +
            'display: flex;' +
            'align-items: flex-start;' +
            'gap: 15px;' +
            'background: rgba(255, 255, 255, 0.05);' +
            'border-radius: 15px;' +
            'padding: 20px;' +
            'animation: slideInUp 0.5s ease-out;' +
        '}' +
        
        '.tip-icon {' +
            'font-size: 28px;' +
            'flex-shrink: 0;' +
            'animation: pulse 2s infinite;' +
        '}' +
        
        '.tip-text {' +
            'font-size: 16px;' +
            'color: #d0d0e0;' +
            'line-height: 1.6;' +
        '}' +
        
        '/* Awareness matters section */' +
        '.awareness-matters-section {' +
            'animation: fadeIn 0.8s ease-out;' +
        '}' +
        
        '/* Conclusion section */' +
        '.conclusion-section {' +
            'animation: fadeIn 0.8s ease-out;' +
        '}' +
        
        '.conclusion-tips {' +
            'background: rgba(53, 197, 207, 0.15);' +
            'border-radius: 15px;' +
            'padding: 25px;' +
            'margin-top: 20px;' +
        '}' +
        
        '.conclusion-tips p {' +
            'font-size: 18px;' +
            'color: #e0e0f0;' +
            'line-height: 1.8;' +
            'margin-bottom: 15px;' +
            'text-align: center;' +
        '}' +
        
        '/* Animations */' +
        '@keyframes fadeIn {' +
            'from { opacity: 0; }' +
            'to { opacity: 1; }' +
        '}' +
        
        '@keyframes fadeInDown {' +
            'from {' +
                'opacity: 0;' +
                'transform: translateY(-20px);' +
            '}' +
            'to {' +
                'opacity: 1;' +
                'transform: translateY(0);' +
            '}' +
        '}' +
        
        '@keyframes slideInLeft {' +
            'from {' +
                'opacity: 0;' +
                'transform: translateX(-30px);' +
            '}' +
            'to {' +
                'opacity: 1;' +
                'transform: translateX(0);' +
            '}' +
        '}' +
        
        '@keyframes slideInRight {' +
            'from {' +
                'opacity: 0;' +
                'transform: translateX(30px);' +
            '}' +
            'to {' +
                'opacity: 1;' +
                'transform: translateX(0);' +
            '}' +
        '}' +
        
        '@keyframes slideInUp {' +
            'from {' +
                'opacity: 0;' +
                'transform: translateY(30px);' +
            '}' +
            'to {' +
                'opacity: 1;' +
                'transform: translateY(0);' +
            '}' +
        '}' +
        
        '@keyframes floatIn {' +
            '0% {' +
                'opacity: 0;' +
                'transform: translateY(20px) scale(0.95);' +
            '}' +
            '100% {' +
                'opacity: 1;' +
                'transform: translateY(0) scale(1);' +
            '}' +
        '}' +
        
        '@keyframes bounce {' +
            '0%, 100% { transform: translateY(0); }' +
            '50% { transform: translateY(-10px); }' +
        '}' +
        
        '@keyframes pulse {' +
            '0% { transform: scale(1); }' +
            '50% { transform: scale(1.1); }' +
            '100% { transform: scale(1); }' +
        '}' +
        
        '/* Responsive styles */' +
        '@media (max-width: 768px) {' +
            '.what-is-aqi-container {' +
                'padding: 20px;' +
            '}' +
            
            '.what-is-aqi-title {' +
                'font-size: 24px;' +
            '}' +
            
            '.section-title {' +
                'font-size: 20px;' +
            '}' +
            
            '.pollutants-grid,' +
            '.aqi-categories-container,' +
            '.causes-grid,' +
            '.facts-container,' +
            '.safety-tips-container {' +
                'grid-template-columns: 1fr;' +
            '}' +
            
            '.aqi-example,' +
            '.example-item {' +
                'flex-direction: column;' +
                'text-align: center;' +
            '}' +
            
            '.intro-text,' +
            '.section-text,' +
            '.example-text,' +
            '.cause-text,' +
            '.effect-text,' +
            '.fact-text,' +
            '.tip-text {' +
                'font-size: 16px;' +
            '}' +
        '}' +
        
        '@media (max-width: 480px) {' +
            '.what-is-aqi-container {' +
                'padding: 15px;' +
            '}' +
            
            '.what-is-aqi-title {' +
                'font-size: 20px;' +
            '}' +
            
            '.section-title {' +
                'font-size: 18px;' +
            '}' +
            
            '.aqi-category-card {' +
                'padding: 20px;' +
            '}' +
            
            '.category-name {' +
                'font-size: 18px;' +
            '}' +
            
            '.category-desc {' +
                'font-size: 14px;' +
            '}' +
        '}';
    document.head.appendChild(style);
    
    // Add interactivity to pollutant cards
    setTimeout(function() {
        const pollutantCards = document.querySelectorAll('.pollutant-card');
        pollutantCards.forEach((card, index) => {
            // Add delay to each card's animation
            card.style.animationDelay = (index * 0.1) + 's';
            
            // Add hover effect
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-10px) scale(1.03)';
                this.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.3)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = '';
                this.style.boxShadow = '';
            });
        });
        
        // Add interactivity to category cards
        const categoryCards = document.querySelectorAll('.aqi-category-card');
        categoryCards.forEach((card, index) => {
            // Add delay to each card's animation
            card.style.animationDelay = (index * 0.1) + 's';
            
            // Add hover effect
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-10px)';
                this.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.3)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = '';
                this.style.boxShadow = '';
            });
        });
        
        // Add ripple effect to all interactive elements
        const interactiveElements = document.querySelectorAll('.pollutant-card, .aqi-category-card, .example-item, .cause-item, .health-effect-item, .fact-item, .tip-item');
        interactiveElements.forEach(element => {
            element.addEventListener('click', function(e) {
                // Create ripple effect
                const ripple = document.createElement('span');
                ripple.classList.add('ripple');
                this.appendChild(ripple);
                
                // Position ripple
                const rect = this.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                const x = e.clientX - rect.left - size/2;
                const y = e.clientY - rect.top - size/2;
                
                ripple.style.width = ripple.style.height = size + 'px';
                ripple.style.left = x + 'px';
                ripple.style.top = y + 'px';
                
                // Remove ripple after animation
                setTimeout(() => {
                    ripple.remove();
                }, 600);
            });
        });
    }, 100);
}

// Initialize the section when the page loads
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initWhatIsAQISection);
} else {
    initWhatIsAQISection();
}