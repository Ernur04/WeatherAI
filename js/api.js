const API_BASE_URL = 'https://api.open-meteo.com/v1/forecast';

// OpenWeatherMap Geocoding API
const OW_GEOCODING_URL = 'https://api.openweathermap.org/geo/1.0/direct';
const OW_REVERSE_GEOCODING_URL = 'https://api.openweathermap.org/geo/1.0/reverse';

// ⚠️ Замените на ваш API-ключ OpenWeatherMap
const OW_API_KEY = 'd46762a188a1302d09e6e50bfa7d7dcb';

/**
 * Fetches coordinates for a given city name using OpenWeatherMap Geocoding API.
 * @param {string} city - The name of the city.
 * @returns {Promise<Object|null>} - Returns an object with name, lat, lon, country, or null if not found.
 */
async function getCoordinates(city) {
    try {
        const response = await fetch(
            `${OW_GEOCODING_URL}?q=${encodeURIComponent(city)}&limit=1&appid=${OW_API_KEY}`
        );
        const data = await response.json();

        if (data && data.length > 0) {
            const result = data[0];
            return {
                name: result.local_names?.ru || result.local_names?.en || result.name,
                lat: result.lat,
                lon: result.lon,
                country: result.country
            };
        }
        return null;
    } catch (error) {
        console.error('Error fetching coordinates:', error);
        return null;
    }
}

/**
 * Reverse geocoding: gets city name from coordinates using OpenWeatherMap.
 * @param {number} lat - Latitude.
 * @param {number} lon - Longitude.
 * @param {string} lang - Language code ('ru', 'en', 'kk').
 * @returns {Promise<Object|null>} - Returns { name, country } or null.
 */
async function reverseGeocode(lat, lon, lang = 'ru') {
    try {
        const response = await fetch(
            `${OW_REVERSE_GEOCODING_URL}?lat=${lat}&lon=${lon}&limit=1&appid=${OW_API_KEY}`
        );
        const data = await response.json();

        if (data && data.length > 0) {
            const result = data[0];
            // OpenWeather provides local_names for various languages
            const name =
                result.local_names?.[lang] ||
                result.local_names?.ru ||
                result.local_names?.en ||
                result.name;
            return {
                name,
                country: result.country
            };
        }
        return null;
    } catch (error) {
        console.error('Error reverse geocoding:', error);
        return null;
    }
}

/**
 * Fetches weather data (current + 7-day forecast) for given coordinates.
 * @param {number} lat - Latitude.
 * @param {number} lon - Longitude.
 * @returns {Promise<Object|null>} - Returns weather data object or null.
 */
async function getWeatherData(lat, lon) {
    try {
        const response = await fetch(`${API_BASE_URL}?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,rain,showers,snowfall,weather_code,cloud_cover,pressure_msl,surface_pressure,wind_speed_10m,wind_direction_10m,wind_gusts_10m&hourly=temperature_2m,weather_code,precipitation_probability&daily=weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset,uv_index_max,precipitation_sum,rain_sum,showers_sum,snowfall_sum,precipitation_hours,precipitation_probability_max,wind_speed_10m_max,wind_gusts_10m_max,wind_direction_10m_dominant&timezone=auto`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching weather data:', error);
        return null;
    }
}

/**
 * Helper to map WMO weather codes to Lucide icon names and descriptions
 */
function getWeatherInfo(code) {
    const map = {
        0: { icon: 'sun', desc: 'clear' },
        1: { icon: 'sun-dim', desc: 'mostly-clear' },
        2: { icon: 'cloud-sun', desc: 'partly-cloudy' },
        3: { icon: 'cloud', desc: 'overcast' },
        45: { icon: 'cloud-fog', desc: 'fog' },
        48: { icon: 'cloud-fog', desc: 'fog' },
        51: { icon: 'cloud-drizzle', desc: 'drizzle' },
        53: { icon: 'cloud-drizzle', desc: 'drizzle' },
        55: { icon: 'cloud-drizzle', desc: 'drizzle' },
        56: { icon: 'cloud-hail', desc: 'freezing-drizzle' },
        57: { icon: 'cloud-hail', desc: 'freezing-drizzle' },
        61: { icon: 'cloud-rain', desc: 'rain' },
        63: { icon: 'cloud-rain', desc: 'rain' },
        65: { icon: 'cloud-rain-wind', desc: 'heavy-rain' },
        66: { icon: 'cloud-hail', desc: 'freezing-rain' },
        67: { icon: 'cloud-hail', desc: 'freezing-rain' },
        71: { icon: 'snowflake', desc: 'snow' },
        73: { icon: 'snowflake', desc: 'snow' },
        75: { icon: 'snowflake', desc: 'heavy-snow' },
        77: { icon: 'snowflake', desc: 'snow' },
        80: { icon: 'cloud-rain', desc: 'showers' },
        81: { icon: 'cloud-rain', desc: 'showers' },
        82: { icon: 'cloud-rain-wind', desc: 'violent-showers' },
        85: { icon: 'snowflake', desc: 'snow-showers' },
        86: { icon: 'snowflake', desc: 'snow-showers' },
        95: { icon: 'cloud-lightning', desc: 'thunderstorm' },
        96: { icon: 'cloud-lightning', desc: 'thunderstorm-hail' },
        99: { icon: 'cloud-lightning', desc: 'thunderstorm-hail' }
    };

    return map[code] || { icon: 'help-circle', desc: 'unknown' };
}

