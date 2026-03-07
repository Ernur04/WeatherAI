// Map Module
let map = null;
let markers = [];
let currentLayerGroup = null;
let currentLayerType = null;

// RainViewer API Configuration
const RAINVIEWER_API = 'https://api.rainviewer.com/public/weather-maps.json';
const TILE_LAYERS = {
    base: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
};

export function initMap(lat, lon, cityName) {
    const mapContainer = document.getElementById('weather-map');
    if (!mapContainer) return;

    if (!map) {
        map = L.map('weather-map').setView([lat, lon], 10);

        L.tileLayer(TILE_LAYERS.base, {
            attribution: '&copy; OpenStreetMap contributors'
        }).addTo(map);

        addMarker(lat, lon, cityName);

        // Update grid on move if a grid layer is active
        map.on('moveend', () => {
            if (['temp', 'wind', 'clouds', 'snow'].includes(currentLayerType)) {
                loadGridLayer(currentLayerType);
            }
        });

    } else {
        map.setView([lat, lon], 10);
        addMarker(lat, lon, cityName);

        setTimeout(() => {
            map.invalidateSize();
        }, 100);
    }
}

function addMarker(lat, lon, cityName) {
    // Clear existing city markers (keep layer markers)
    markers.forEach(marker => map.removeLayer(marker));
    markers = [];

    const marker = L.marker([lat, lon]).addTo(map);
    marker.bindPopup(`<b>${cityName}</b>`).openPopup();
    markers.push(marker);
}

export async function switchMapLayer(layerType) {
    // UI Update is handled in listener
    if (currentLayerGroup) {
        map.removeLayer(currentLayerGroup);
        currentLayerGroup = null;
    }

    currentLayerType = layerType;

    if (layerType === 'precipitation') {
        showLoadingToast('Загрузка осадков...');
        await loadRainViewerLayer();
    } else if (['temp', 'wind', 'clouds', 'snow'].includes(layerType)) {
        showLoadingToast(`Загрузка слоя: ${layerType}...`);
        await loadGridLayer(layerType);
    }
}

// ==========================================
// RAINVIEWER INTEGRATION
// ==========================================
async function loadRainViewerLayer() {
    try {
        const response = await fetch(RAINVIEWER_API);
        const data = await response.json();

        // Get the last available timestamp (past data)
        // radar.past is array of objects { time: 12345678, path: '/...' }
        // We want the most recent 'past' frame or first 'nowcast'
        const timestamps = data.radar.past;
        const latest = timestamps[timestamps.length - 1];

        if (latest) {
            currentLayerGroup = L.tileLayer(`https://tile.rainviewer.com${latest.path}/256/{z}/{x}/{y}/2/1_1.png`, {
                opacity: 0.7,
                attribution: '&copy; <a href="https://www.rainviewer.com">RainViewer</a>'
            });
            currentLayerGroup.addTo(map);
            showNotification('Осадки (RainViewer) загружены', 'success');
        }
    } catch (e) {
        console.error('RainViewer Error:', e);
        showNotification('Ошибка загрузки осадков', 'error');
    }
}

// ==========================================
// OPEN-METEO GRID SYSTEM
// ==========================================
async function loadGridLayer(type) {
    const bounds = map.getBounds();
    const north = bounds.getNorth();
    const south = bounds.getSouth();
    const east = bounds.getEast();
    const west = bounds.getWest();

    // Create a 5x5 grid
    const latStep = (north - south) / 5;
    const lonStep = (east - west) / 5;

    const lats = [];
    const lons = [];

    for (let i = 0; i < 5; i++) {
        for (let j = 0; j < 5; j++) {
            lats.push(south + i * latStep + latStep / 2);
            lons.push(west + j * lonStep + lonStep / 2);
        }
    }

    // Prepare API URL
    const params = new URLSearchParams({
        latitude: lats.join(','),
        longitude: lons.join(','),
        current: 'temperature_2m,wind_speed_10m,wind_direction_10m,cloud_cover,snowfall',
        wind_speed_unit: 'ms'
    });

    try {
        const res = await fetch(`https://api.open-meteo.com/v1/forecast?${params.toString()}`);
        const data = await res.json();

        // data can be array (if multiple points) or single object
        const results = Array.isArray(data) ? data : [data];

        const markersGroup = L.layerGroup();

        results.forEach((point, index) => {
            const lat = lats[index];
            const lon = lons[index];
            const current = point.current;

            let iconHtml = '';

            if (type === 'temp') {
                const temp = Math.round(current.temperature_2m);
                const color = getTempColor(temp);
                iconHtml = `<div class="weather-marker-icon" style="background-color: ${color}; width: 30px; height: 30px;">${temp}°</div>`;
            } else if (type === 'wind') {
                const speed = Math.round(current.wind_speed_10m);
                const deg = current.wind_direction_10m;
                // Color scale for wind: Green -> Yellow -> Red
                const color = getWindColor(speed);
                iconHtml = `
                    <div style="transform: rotate(${deg}deg); width: 30px; height: 30px; display: flex; align-items: center; justify-content: center;">
                        <div class="wind-arrow" style="border-bottom-color: ${color};"></div>
                    </div>
                    <div class="marker-label" style="text-shadow: 1px 1px 2px black; color: white; font-weight: bold;">${speed}</div>
                `;
            } else if (type === 'clouds') {
                const cover = current.cloud_cover;
                const alpha = Math.max(0.2, cover / 100);
                iconHtml = `<div class="weather-marker-icon" style="background-color: rgba(100, 100, 100, ${alpha}); width: 30px; height: 30px;">
                    <i data-lucide="cloud" style="width: 16px; height: 16px;"></i>
                </div>`;
            } else if (type === 'snow') {
                const snow = current.snowfall;
                if (snow > 0) {
                    iconHtml = `<div class="weather-marker-icon" style="background-color: #a0d8ef; width: 30px; height: 30px;">
                        <i data-lucide="snowflake" style="width: 16px; height: 16px;"></i>
                    </div>`;
                }
            }

            if (iconHtml) {
                const icon = L.divIcon({
                    html: iconHtml,
                    className: 'custom-weather-marker',
                    iconSize: [30, 30],
                    iconAnchor: [15, 15]
                });
                markersGroup.addLayer(L.marker([lat, lon], { icon: icon }));
            }
        });

        currentLayerGroup = markersGroup;
        currentLayerGroup.addTo(map);
        lucide.createIcons();

    } catch (e) {
        console.error('Grid Load Error:', e);
        showNotification('Ошибка загрузки слоя', 'error');
    }
}

// Helpers
function getTempColor(t) {
    // Simple gradient: Blue (-30) -> Green (10) -> Red (40)
    // HSL: Blue=240, Green=120, Red=0
    // Map -30..40 to 240..0
    const minT = -30;
    const maxT = 40;
    const clamped = Math.max(minT, Math.min(maxT, t));
    const ratio = (clamped - minT) / (maxT - minT); // 0..1
    const hue = 240 - (ratio * 240);
    return `hsl(${hue}, 70%, 50%)`;
}

function getWindColor(s) {
    // 0..30 m/s -> Green..Red
    const maxS = 30;
    const clamped = Math.min(maxS, s);
    const ratio = clamped / maxS;
    const hue = 120 - (ratio * 120); // 120 -> 0
    return `hsl(${hue}, 100%, 40%)`;
}

function showLoadingToast(msg) {
    // If you have a toast system, use it. Otherwise console or lightweight notification
    // We assume showNotification is available globally as user uses it in script.js
    if (window.showNotification) {
        // window.showNotification(msg, 'info'); 
        // Commented out to avoid spamming user if they move map a lot
    }
}

// Initialization and Listeners
window.initInteractiveMap = initMap;
export function setupMapListeners() {
    const mapControls = document.querySelector('.map-controls');
    if (mapControls) {
        mapControls.addEventListener('click', (e) => {
            const btn = e.target.closest('.map-btn');
            if (btn) {
                const layer = btn.getAttribute('data-layer');
                switchMapLayer(layer);

                // Update UI
                document.querySelectorAll('.map-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
            }
        });
    }
}
setupMapListeners();
