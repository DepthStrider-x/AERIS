# 🌫️ AERIS – Real-Time Air Quality Monitoring Web Application

AERIS is a full-stack web application that displays **real-time Air Quality Index (AQI)** data across cities in India.  
Users can create accounts, save preferred cities, customize their dashboard, and track pollution with interactive charts and a dynamic map in real time.


## 🚀 Why AERIS?

With pollution increasing every year, people often don’t know:

- How bad the air is **right now**
- Whether they should go outside
- How today's conditions compare to previous days
- How AQI changes across their city or country

AERIS solves this by providing:

✔ Real-time AQI data  
✔ Health recommendations  
✔ Map-based visualization  
✔ Predictions and trends  
✔ Personalized dashboards and settings  



## 🧠 Where Does the Data Come From?

AERIS **uses real scraped AQI data from the WAQI (World Air Quality Index) website**.

Data Flow:

WAQI Website → AQI_Scraper → aqi.json → GitHub Repo → AERIS Website → User Dashboard


### 🔗 Scraper Repository  
The scraper project is also public:

https://github.com/AryanPrajapati9456/AQI_Scraper


The scraper:

- Uses API-scraping techniques
- Randomized delays to avoid blocking
- Fetches AQI and pollution levels for many Indian cities
- Saves output into `aqi.json` in GitHub
- AERIS fetches that live JSON at runtime

This ensures that AERIS always displays **live and continuously updated AQI data**, even without running the scraper manually.currently its default location is Muzaffarnager, India. but you can change it to other location.



## ✨ Features

### 🌍 Core Functionality
- Real-time AQI display
- Live data pulled directly from GitHub JSON
- State/city search
- Data fallback if API temporarily fails

### 👤 Authentication
- User registration, login, logout  
- JWT-based secure authentication  
- Password hashing via bcrypt

### 🎨 Dashboard & Visualization
- AQI levels with color-coded indicators  
- 24-hour forecast  
- 7-day prediction  
- Health caution messages  
- Interactive graphs (Chart.js)

### 🗺 Map Visualization
- Map built with **Leaflet.js**
- Click markers to see AQI details
- Shows regional variations in pollution

### ⚙ User Preferences
Users can customize:

- Theme (dark/light/system)
- Temperature display unit
- Default city
- AQI scale
- Notifications settings
- Visibility of forecast & comparisons

### 📍 Saved Locations
- Add/remove favorite cities
- View saved locations in dashboard

### 📱 Responsive UI
- Works on mobile, tablet, and desktop
- Smooth UI and layout

---

## 🛠 Tech Stack

### Frontend
- **HTML5**
- **CSS3**
- **JavaScript**
- Leaflet.js (maps)
- Chart.js (graphs)
- Font Awesome (icons)

### Backend
- **Node.js**
- Built-in HTTP module (no Express)
- Custom routing
- JWT authentication

### Database
- **SQLite**

---

## 🗄 Database Structure

### `users`
| Field | Type | Description |
|---|---|---|
| id | INTEGER | Primary key |
| name | TEXT | Full name |
| email | TEXT | Unique login ID |
| password_hash | TEXT | Secure hashed password |
| created_at | DATETIME | Creation time |

### `preferences`
| Field | Type | Description |
|---|---|---|
| user_id | INTEGER | Linked to users.id |
| theme | TEXT | light / dark / system |
| temperature_unit | TEXT | C/F |
| aqi_scale | TEXT | AQI scale used |
| default_city | TEXT | Preferred location |
| notifications_enabled | INTEGER | 0/1 |
| threshold_value | INTEGER | Notification limit |
| show_24hr_forecast | INTEGER | 0/1 |
| show_week_prediction | INTEGER | 0/1 |
| show_health_advice | INTEGER | 0/1 |
| show_global_compare | INTEGER | 0/1 |
| avatar_path | TEXT | Profile image |
| updated_at | DATETIME | Last update |

### `saved_locations`
| Field | Type | Description |
|---|---|---|
| user_id | INTEGER | Linked to users.id |
| location_name | TEXT | Saved city |
| created_at | DATETIME | Timestamp |



## 🔌 API Endpoints

### Auth
POST /api/auth/login
POST /api/auth/register
POST /api/auth/logout


### User
GET /api/user

### Preferences
GET /api/preferences
PUT /api/preferences

### Saved Locations
GET /api/locations
POST /api/locations
DELETE /api/locations/:id



### Location Checker
GET /api/location-check/:name



## 📂 Project Structure

AERIS/
│
├── index.html
├── auth.html
├── account.html
├── settings.html
├── /map-section
│ └── map.html
│
├── /backend
│ ├── server.js
│ ├── auth.js
│ ├── preferences.js
│ ├── users.js
│ └── db.js
│
└── /assets
├── css
└── js



## ⚙️ How to Run

### 1️⃣ Install Node
https://nodejs.org/

perl
Copy code

### 2️⃣ Install dependencies
Inside project folder:

```bash
npm install
3️⃣ Start the server
node server.js
bash

4️⃣ Visit in browser

http://localhost:3000


📛 Created By
Aryan Prajapati
GitHub: @AryanPrajapati9456

