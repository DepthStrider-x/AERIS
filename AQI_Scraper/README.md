## 🌍 City AQI & Weather Monitor

A fully automated web-scraping system that collects live AQI (Air Quality Index), temperature, and other environmental data for any number of cities, processes it, and generates clean structured output for dashboards, reports, and analysis.

# 🚀 Features

Live Web Scraping – Fetches real-time AQI and temperature data for all configured cities.

Modular & Scalable – Easily add, remove, or modify cities without changing core logic.

Human-like Request Behaviour – Built-in random delays and request timing help avoid detection and blocking.

Clean, Structured Output – Data exported to CSV/JSON, enabling use in BI dashboards, ML models, or automation pipelines.

Error-Resilient Workflow – Retry logic, fallback handling, and request headers ensure high success rates.

# 🧠 Tech Stack

Language: Python

Libraries:

requests – HTTP requests

BeautifulSoup4 – Static scraping

time, random – Anti-bot request variance

csv/json – Data export

# 📂 Project Structure
📁 aqi-scraper
 ├── scraper.py
 ├── cities.json
 ├── output.csv
 ├── README.md

# ⚙️ How It Works

Loads city names/slugs from a config file (e.g., cities.json).

For each city:

Sends a human-style spaced request

Parses AQI, temperature, and other metrics

Logs results to console and CSV

Outputs final dataset for analytics or dashboard use.

# 📝 Configuration

To add new cities, simply update:

[
  "delhi",
  "mumbai",
  "lucknow",
  "pune"
]


No code modification needed.

# 📊 Sample Output
City	AQI	Temperature	Last Updated
Delhi	323	18°C	2025-11-19 17:30 IST
Mumbai	122	27°C	2025-11-19 17:30 IST

# 🧪 Future Enhancements

Automated database storage (SQLite/MySQL).

Browser automation mode (Selenium) for dynamic sites.

Auto-email reporting.

Cloud scheduling with Cron/Render/EC2.

Integration into a public live dashboard.

# ⚠️ Legal & Ethical Use

This project is for research, analytics, and educational purposes only.
Respect website robots.txt, rate limits, and terms of service.

# 📄 License

MIT License – Free for personal and commercial use.

# ❓ Can You Use Ads With This Project?

Yes—but only if:

✔ You are using publicly available data

If the website allows scraping

Or provides an open API

Or data is public domain
→ Then you can use the scraped data in a project that shows ads (e.g., a dashboard website).

# ❌ You must NOT:

Sell or commercially resell copyrighted data from a website that forbids scraping.

Claim ownership of the scraped source dataset.

Violate the site’s terms of service.

# 🔥 Realistic Safe Path

If you want to monetize:

Best approach

Use scraped public data → store it → transform it → build your own dashboard → place ads on your interface (not on the website you scraped).

That is safe and legal in most cases.

# ✨ Author

Developed by Aryan Prajapati
Goal: Reliable AQI data pipeline powering mobile or web apps.
USERNAME - AryanPrajapati9456