# 🌫️ AERIS – Real-Time Air Quality Monitoring Platform

![Node.js](https://img.shields.io/badge/Node.js-8000-green?style=for-the-badge&logo=node.js)
![Python](https://img.shields.io/badge/Python-3.x-blue?style=for-the-badge&logo=python)
![SQLite](https://img.shields.io/badge/SQLite-3-003B57?style=for-the-badge&logo=sqlite)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=for-the-badge&logo=javascript)
![Status](https://img.shields.io/badge/Status-Active-success?style=for-the-badge)

A full-stack, real-time air quality monitoring web application that provides **live AQI (Air Quality Index)** data across major cities in India. AERIS combines automated data scraping, secure user authentication, personalized dashboards, and interactive visualizations to help users make informed decisions about outdoor activities and health precautions.

---

## 📹 Project Demo



https://github.com/user-attachments/assets/6d1dbc84-4003-4389-9311-c2ec0121ce02



---

## 🌟 Why AERIS?

Air pollution is a growing concern in urban India, yet most people lack access to:
- **Real-time pollution data** for their location
- **Health recommendations** based on current air quality
- **Historical trends** and predictions
- **Interactive visualizations** to understand regional variations

**AERIS solves this** by providing:

✅ **Live AQI Data** – Updated every 20 seconds from WAQI API  
✅ **Automated Scraping** – Python-based scraper runs continuously  
✅ **User Authentication** – Secure JWT-based login system  
✅ **Personalized Dashboards** – Save locations, customize themes, set preferences  
✅ **Interactive Maps** – Leaflet.js-powered regional AQI visualization  
✅ **Health Insights** – Dynamic advice based on current pollution levels  
✅ **7-Day Predictions** – Forecast trends with Chart.js visualizations  

---

## 🏗️ System Architecture

### Data Flow Pipeline

```
WAQI API → Python Scraper → aqi.json → Node.js Server → Frontend → User Dashboard
    ↓            ↓              ↓            ↓              ↓
  Live Data   Continuous    Local File   REST API    Interactive UI
              (20s cycle)    Storage      Endpoints    + Charts
```

### Component Breakdown

#### 🐍 **AQI Scraper** (Python)
- **Location**: `AQI_Scraper/scraper.py`
- **Technology**: Python 3.x, `requests`, `python-dotenv`
- **Function**: 
  - Fetches AQI data from WAQI (World Air Quality Index) API
  - Scrapes **17 major Indian cities** every 20 seconds
  - Extracts: AQI, PM2.5, PM10, NO₂, SO₂, O₃, CO, Temperature
  - Saves to `aqi.json` with ISO timestamps
  - Runs as a child process spawned by Node.js server
- **Key Features**:
  - Automatic retry on failure
  - Detailed logging to `scraper.log`
  - Rate limiting to respect API quotas

#### 🖥️ **Backend Server** (Node.js)
- **Location**: `server.js` + `backend/` modules
- **Technology**: Node.js (vanilla HTTP, no Express)
- **Port**: 8000
- **Responsibilities**:
  1. **Static File Serving** – HTML, CSS, JS, images
  2. **REST API** – Authentication, user data, preferences, locations
  3. **AQI Data Endpoint** – Serves `aqi.json` to frontend
  4. **Scraper Management** – Spawns and monitors Python scraper process
  5. **Database Operations** – SQLite CRUD via custom modules

#### 🗄️ **Database** (SQLite)
- **File**: `aqi_users.db`
- **Tables**:
  - `users` – User accounts (id, name, email, password_hash, created_at)
  - `preferences` – User settings (theme, units, default city, notifications, etc.)
  - `saved_locations` – Favorite cities per user
- **Security**: bcrypt password hashing, JWT token authentication

#### 🎨 **Frontend** (Vanilla JavaScript)
- **Main Pages**:
  - `index.html` – Dashboard with live AQI, weather, insights
  - `auth.html` – Login/Registration
  - `account.html` – User profile and saved locations
  - `settings.html` – Preferences configuration
  - `map-section/map.html` – Interactive Leaflet.js map
- **Key Scripts**:
  - `script.js` – Core AQI display, user authentication, settings
  - `simple-aqi-chart.js` – Chart.js integration for trends
  - `what-is-aqi.js` – Educational content rendering
  - `state.js` – State-level AQI search and filtering

---

## ✨ Features

### 🌍 **Core Functionality**
- **Real-Time AQI Display** – Live data from 17+ Indian cities
- **Automatic Location Detection** – Geolocation API finds nearest city
- **Fallback Mechanism** – Defaults to Muzaffarnagar if geolocation fails
- **Dynamic Character Animations** – Visual indicators change with AQI levels
- **Color-Coded Categories** – Good, Moderate, Unhealthy, Hazardous, etc.

### 👤 **User Authentication & Accounts**
- **Secure Registration** – Email validation, bcrypt password hashing
- **JWT-Based Login** – 24-hour token expiration
- **Session Management** – Persistent login across page refreshes
- **Profile Management** – View account details, creation date
- **Logout Functionality** – Secure token invalidation

### 🎨 **Personalization**
Users can customize:
- **Theme** – Light, Dark, or System-based
- **Temperature Units** – Celsius or Fahrenheit
- **Default City** – Auto-load preferred location
- **AQI Scale** – US or India standard
- **Notifications** – Enable/disable alerts with custom thresholds
- **Dashboard Widgets** – Toggle 24hr forecast, 7-day predictions, health advice

### 📍 **Saved Locations**
- Add/remove favorite cities
- Quick-switch between saved locations
- Check if location is already saved (prevents duplicates)

### 🗺️ **Interactive Map Visualization**
- **Technology**: Leaflet.js
- **Features**:
  - Color-coded markers for AQI levels
  - Click markers to view detailed city data
  - Zoom/pan controls
  - Responsive design for mobile/desktop

### 📊 **Data Visualization**
- **24-Hour Forecast** – Hourly AQI predictions
- **7-Day Trend Graph** – Chart.js line charts
- **Stacked Bar Charts** – Pollutant breakdown (PM2.5, PM10, NO₂, etc.)
- **Health Impact Indicators** – Visual warnings for sensitive groups

### 💡 **Health Insights**
- **Dynamic Advice** – Changes based on current AQI
- **Today's Air Insight Card** – Expandable card with:
  - Short message (e.g., "Air quality is great today! 😌✨")
  - Full explanation
  - Professional health recommendations
- **Character-Based Feedback** – Different images for AQI ranges:
  - `gd_char.png` – Good (0-50)
  - `md_char.png` – Moderate (51-100)
  - `SV_char.png` – Unhealthy for Sensitive (101-150)
  - `haz_char.png` – Hazardous (151+)

### 📱 **Responsive Design**
- Mobile-first CSS
- Hamburger menu for small screens
- Touch-friendly UI elements
- Optimized for tablets and desktops

---

## 🔌 API Endpoints

### Authentication
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/auth/register` | Create new user account | ❌ |
| POST | `/api/auth/login` | Authenticate user, get JWT token | ❌ |
| POST | `/api/auth/logout` | Invalidate session | ✅ |

### User Data
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/user` | Get current user profile | ✅ |

### Preferences
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/preferences` | Get user preferences | ✅ |
| PUT | `/api/preferences` | Update preferences | ✅ |

### Saved Locations
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/locations` | Get all saved locations | ✅ |
| POST | `/api/locations` | Add new location | ✅ |
| DELETE | `/api/locations/:id` | Remove location | ✅ |
| GET | `/api/location-check/:name` | Check if location is saved | ✅ |

### AQI Data
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/aqi` | Get latest AQI data for all cities | ❌ |

---

## 🛠️ Tech Stack

### Frontend
- **HTML5** – Semantic markup
- **CSS3** – Custom styling, animations, glassmorphism effects
- **JavaScript (ES6+)** – Vanilla JS, no frameworks
- **Chart.js** – Data visualization
- **Leaflet.js** – Interactive maps
- **Font Awesome 6.5** – Icons

### Backend
- **Node.js** – Server runtime
- **HTTP Module** – Custom routing (no Express)
- **bcrypt** – Password hashing
- **jsonwebtoken** – JWT authentication
- **SQLite3** – Database driver

### Scraper
- **Python 3.x** – Scraping logic
- **requests** – HTTP client
- **python-dotenv** – Environment variable management

### Database
- **SQLite** – Lightweight, file-based database

---

## 📂 Project Structure

```
AERIS/
│
├── AQI_Scraper/                # Python scraper module
│   ├── scraper.py              # Main scraper script
│   ├── aqi.json                # Live AQI data (auto-generated)
│   ├── scraper.log             # Scraper logs
│   ├── .env                    # WAQI API token (not in repo)
│   └── README.md               # Scraper documentation
│
├── backend/                    # Node.js backend modules
│   ├── auth.js                 # Authentication logic
│   ├── db.js                   # Database initialization
│   ├── users.js                # User CRUD operations
│   ├── preferences.js          # Preferences management
│   └── locations.js            # Saved locations logic
│
├── map-section/                # Map visualization
│   ├── map.html                # Full-screen map page
│   ├── map.js                  # Leaflet.js logic
│   ├── map.css                 # Map styling
│   ├── preview-card.css        # Map preview card
│   └── assets/                 # Map icons/images
│
├── css/                        # Stylesheets
│   └── (various CSS files)
│
├── js/                         # JavaScript modules
│   └── (various JS files)
│
├── index.html                  # Main dashboard
├── auth.html                   # Login/Registration page
├── account.html                # User account page
├── settings.html               # Preferences page
├── state.html                  # State-level AQI view
├── server.js                   # Node.js server entry point
├── script.js                   # Main frontend logic
├── style.css                   # Main stylesheet
├── aqi_users.db                # SQLite database
├── package.json                # Node.js dependencies
├── package-lock.json           # Dependency lock file
└── README.md                   # This file
```

---

## 🚀 Quick Start

### Prerequisites
- **Node.js** 14.x or higher ([Download](https://nodejs.org/))
- **Python** 3.8 or higher ([Download](https://www.python.org/))
- **WAQI API Token** ([Get Free Token](https://aqicn.org/data-platform/token/))

### Installation

#### 1️⃣ Clone the Repository
```bash
git clone https://github.com/DepthStrider-x/AERIS
cd AERIS
```

#### 2️⃣ Install Node.js Dependencies
```bash
npm install
```

#### 3️⃣ Install Python Dependencies
```bash
cd AQI_Scraper
pip install requests python-dotenv
```

#### 4️⃣ Configure Environment Variables
Create `AQI_Scraper/.env`:
```env
WAQI_TOKEN=your_waqi_api_token_here
```

#### 5️⃣ Start the Server
```bash
# From project root
node server.js
```

The server will:
- Start on `http://localhost:8000`
- Automatically spawn the Python scraper
- Begin collecting AQI data every 20 seconds

#### 6️⃣ Access the Application
Open your browser and navigate to:
```
http://localhost:8000
```

---

## 📖 Usage Guide

### First-Time Setup
1. **Register an Account** – Click "Account" → "Signup"
2. **Login** – Use your credentials to access personalized features
3. **Set Preferences** – Go to Settings to customize theme, units, default city
4. **Save Locations** – Add your favorite cities for quick access

### Viewing AQI Data
- **Main Dashboard** – Shows AQI for your location (auto-detected or default)
- **Click AQI Circle** – View detailed pollutant breakdown
- **Map View** – Click "Map Overview" to see regional data
- **Search** – Use the search bar to find specific cities/states

### Understanding AQI Levels
| AQI Range | Category | Color | Health Advice |
|-----------|----------|-------|---------------|
| 0-50 | Good | 🟢 Green | Safe for outdoor activities |
| 51-100 | Moderate | 🟡 Yellow | Sensitive groups be cautious |
| 101-150 | Unhealthy (Sensitive) | 🟠 Orange | Limit outdoor time |
| 151-200 | Unhealthy | 🔴 Red | Avoid outdoor activities |
| 201-300 | Very Unhealthy | 🟣 Purple | Stay indoors |
| 301+ | Hazardous | 🟤 Maroon | Emergency conditions |

---

## 🔒 Security Features

- **Password Hashing** – bcrypt with salt rounds (10)
- **JWT Tokens** – 24-hour expiration, signed with secret key
- **SQL Injection Protection** – Prepared statements for all queries
- **Session Management** – Server-side token validation
- **CORS Headers** – Configured for API security

> ⚠️ **Production Note**: Replace `SECRET_KEY` in `backend/auth.js` with an environment variable before deploying.

---

## 🌐 Data Sources

### WAQI (World Air Quality Index)
- **API**: `https://api.waqi.info/`
- **Coverage**: 17 Indian cities (Delhi, Mumbai, Noida, Lucknow, Muzaffarnagar, etc.)
- **Update Frequency**: Every 20 seconds
- **Data Points**: AQI, PM2.5, PM10, NO₂, SO₂, O₃, CO, Temperature

### Cities Monitored
```
New Delhi, Mumbai, Dwarka, Agra, Jaipur, Goa, Udaipur, Kochi, 
Varanasi, Amritsar, Manali, Noida, Lucknow, Indore, Kanpur, Muzaffarnagar
```

---

## ⚠️ Ethical Considerations

This project is designed for **educational purposes** and **public awareness**.

- ✅ Respects WAQI API rate limits (1-second delay between requests)
- ✅ Uses official API with authentication token
- ✅ Provides proper attribution to data sources
- ✅ Does not redistribute raw API data commercially

**Users are responsible for**:
- Obtaining their own WAQI API token
- Complying with WAQI's Terms of Service
- Not using scraped data for commercial purposes without permission

---

## 🐛 Troubleshooting

### Scraper Not Running
- **Check**: `scraper.log` for error messages
- **Verify**: `.env` file exists with valid `WAQI_TOKEN`
- **Test**: Run `python AQI_Scraper/scraper.py` manually

### Database Errors
- **Delete**: `aqi_users.db` to reset (⚠️ loses all user data)
- **Check**: File permissions on database file

### Port Already in Use
- **Change**: Port in `server.js` (line 14: `const PORT = 8000;`)
- **Kill Process**: `netstat -ano | findstr :8000` (Windows) or `lsof -i :8000` (Mac/Linux)

### No AQI Data Showing
- **Verify**: `AQI_Scraper/aqi.json` exists and has recent timestamp
- **Check**: Browser console for API errors
- **Test**: `http://localhost:8000/api/aqi` directly

---

## 🚧 Future Enhancements

- [ ] **Push Notifications** – Browser alerts when AQI exceeds threshold
- [ ] **Historical Data** – Store and visualize past AQI trends
- [ ] **More Cities** – Expand to 100+ Indian cities
- [ ] **Weather Integration** – Combine AQI with weather forecasts
- [ ] **Mobile App** – React Native version
- [ ] **Social Sharing** – Share AQI reports on social media
- [ ] **Air Purifier Recommendations** – Based on current AQI
- [ ] **Multi-Language Support** – Hindi, Tamil, Bengali, etc.

---

## 👤 Author

**Your Name**  
*Full-Stack Developer • Environmental Tech Enthusiast*

[![GitHub](https://img.shields.io/badge/GitHub-YourUsername-181717?style=flat&logo=github)](https://github.com/YourUsername)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-YourProfile-0A66C2?style=flat&logo=linkedin)](https://linkedin.com/in/yourprofile)

---

## 📝 License

This project is open-source and available under the **MIT License**.

```
MIT License

Copyright (c) 2026 Your Name

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

## 🙏 Acknowledgments

- **WAQI** – For providing free air quality data API
- **Leaflet.js** – Open-source mapping library
- **Chart.js** – Beautiful data visualization
- **Font Awesome** – Comprehensive icon library

---

## 📧 Contact & Support

Found a bug? Have a feature request? Want to contribute?

- **Issues**: [GitHub Issues](https://github.com/YourUsername/AERIS/issues)
- **Email**: your.email@example.com
- **Discussions**: [GitHub Discussions](https://github.com/YourUsername/AERIS/discussions)

---

<div align="center">

**Made with ❤️ for cleaner air and healthier communities**

⭐ **Star this repo** if you find it useful!

</div>
