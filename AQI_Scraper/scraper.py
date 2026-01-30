# scraper.py
import os
import time
import json
import logging
import requests
from datetime import datetime, timezone
from dotenv import load_dotenv


load_dotenv()

TOKEN = os.getenv("WAQI_TOKEN")
if not TOKEN:
    raise RuntimeError("WAQI_TOKEN not found in environment (.env). Create .env with WAQI_TOKEN=your_token")


LOG_FILENAME = "scraper.log"
logger = logging.getLogger("waqi-scraper")
logger.setLevel(logging.DEBUG)

# console handler (INFO+)
ch = logging.StreamHandler()
ch.setLevel(logging.INFO)
ch.setFormatter(logging.Formatter("%(asctime)s - %(levelname)s - %(message)s"))
logger.addHandler(ch)

# file handler (DEBUG+)
fh = logging.FileHandler(LOG_FILENAME)
fh.setLevel(logging.DEBUG)
fh.setFormatter(logging.Formatter("%(asctime)s - %(levelname)s - %(message)s"))
logger.addHandler(fh)


CITIES = [
    "new-delhi",
    "mumbai",
    "dwarka",      
    "agra",
    "jaipur",
    "goa",
    "udaipur",
    "kochi",
    "varanasi",
    "amritsar",
    "manali",
    "noida",
    "lucknow",
    "indore",
    "kanpur",
    "muzaffarnagar",
    "dwarka"
]



WAQI_BASE = "https://api.waqi.info/feed/{city}/"

# -------------------------
# Helper: fetch single city
# -------------------------
def fetch_city(city: str, token: str, timeout=10):
    url = WAQI_BASE.format(city=city)
    params = {"token": token}
    try:
        resp = requests.get(url, params=params, timeout=timeout)
        resp.raise_for_status()
        data = resp.json()
    except Exception as e:
        logger.warning(f"[{city}] HTTP/Network error: {e}")
        return {"error": str(e)}


    if data.get("status") != "ok":
        logger.warning(f"[{city}] API returned non-ok status: {data}")
       
        return {"error": f"api_status_{data.get('status')}", "raw": data}

    d = data.get("data", {})
    iaqi = d.get("iaqi", {})

    
    def val(k):
        return iaqi.get(k, {}).get("v")

    result = {
        "city": city,
        "aqi": d.get("aqi"),
        "pm25": val("pm25"),
        "pm10": val("pm10"),
        "no2": val("no2"),
        "so2": val("so2"),
        "o3": val("o3"),
        "co": val("co"),
        "temp": val("t"),
        "time": d.get("time", {}).get("s")
    }
    logger.debug(f"[{city}] Parsed result: {result}")
    return result

def scrape_all(cities, token, out_file="./aqi.json", delay=1.0):
    logger.info("Starting WAQI scrape for %d cities", len(cities))
    results = {}
    for city in cities:
        logger.info("Fetching: %s", city)
        res = fetch_city(city, token)
        results[city] = res
        time.sleep(delay)

    final = {
        "last_updated": datetime.now(timezone.utc).isoformat().replace("+00:00", "Z"),
        "cities": results
    }

    # Ensure output file is written to the same directory as the script
    script_dir = os.path.dirname(os.path.abspath(__file__))
    output_path = os.path.join(script_dir, out_file)
    
    with open(output_path, "w", encoding="utf-8") as f:
        json.dump(final, f, indent=4, ensure_ascii=False)

    logger.info("Saved %s (cities: %d)", out_file, len(results))
    return final


if __name__ == "__main__":
    # Run scraper continuously every 20 seconds
    while True:
        try:
            scrape_all(CITIES, TOKEN, out_file="aqi.json")  # Save to AQI_Scraper directory
            logger.info("Waiting 20 seconds before next scrape...")
            time.sleep(20)  # Wait 20 seconds before next scrape
        except KeyboardInterrupt:
            logger.info("Scraper stopped by user")
            break
        except Exception as exc:
            logger.exception("Unhandled exception in scraper: %s", exc)
            logger.info("Waiting 20 seconds before retrying...")
            time.sleep(20)  # Wait 20 seconds before retrying