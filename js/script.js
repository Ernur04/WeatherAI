// ========================================
// ГЛОБАЛЬНЫЕ ПЕРЕМЕННЫЕ
// ========================================
let currentWeatherData = null;
let currentCityCoords = null;
let weatherChart = null;

// ========================================
// ИНИЦИАЛИЗАЦИЯ
// ========================================
document.addEventListener('DOMContentLoaded', async () => {
    lucide.createIcons();
    initTheme();
    await initLanguage();
    initEventListeners();

    // Check for city in URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const cityParam = urlParams.get('city');
    if (cityParam) {
        document.getElementById('city-input').value = cityParam;
        searchWeather(cityParam);
    } else {
        loadFavorites();
    }
});

// ========================================
// ОБРАБОТЧИКИ СОБЫТИЙ
// ========================================
function initEventListeners() {
    const cityInput = document.getElementById('city-input');
    const tipButtons = document.querySelectorAll('.tip-btn');
    const searchForm = document.getElementById('weather-search');

    const refreshBtn = document.getElementById('refresh-weather');
    const locationBtn = document.getElementById('btn-location');
    const shareBtn = document.getElementById('btn-share');
    const compareBtn = document.getElementById('btn-compare');
    const scrollToTopBtn = document.getElementById('scroll-to-top');

    // Кнопки быстрого поиска
    tipButtons.forEach(button => {
        button.addEventListener('click', () => {
            cityInput.value = button.textContent.trim();
            searchForm.dispatchEvent(new Event('submit'));
        });
    });

    // Поиск погоды
    searchForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const city = cityInput.value.trim();
        if (city) {
            await searchWeather(city);
        }
    });



    // Обновить погоду
    if (refreshBtn) {
        refreshBtn.addEventListener('click', async () => {
            if (currentCityCoords) {
                refreshBtn.classList.add('rotating');
                await loadWeatherData(currentCityCoords.lat, currentCityCoords.lon, currentCityCoords.name, currentCityCoords.country);
                refreshBtn.classList.remove('rotating');
            }
        });
    }

    // Моё местоположение
    if (locationBtn) {
        locationBtn.addEventListener('click', getCurrentLocation);
    }

    // Поделиться
    if (shareBtn) {
        shareBtn.addEventListener('click', shareWeather);
    }

    // Сравнить
    if (compareBtn) {
        compareBtn.addEventListener('click', () => {
            if (!currentWeatherData) {
                showNotification('Сначала найдите город', 'warning');
                return;
            }
            openCompareModal();
        });
    }

    // Modal close handlers
    const compareModal = document.getElementById('compare-modal');
    
    // Using event delegation for closes or multiple handlers
    document.querySelectorAll('.close-modal').forEach(btn => {
        btn.onclick = function () {
            if (compareModal) compareModal.style.display = "none";

        }
    });

    window.onclick = function (event) {
        if (event.target == compareModal) {
            compareModal.style.display = "none";
        }

    }

    // Compare submit
    const compareSubmitBtn = document.getElementById('compare-submit-btn');
    if (compareSubmitBtn) {
        compareSubmitBtn.addEventListener('click', handleComparison);
    }

    // Menu Toggle
    const menuToggle = document.getElementById('menu-toggle');
    const menuDropdown = document.getElementById('menu-dropdown');

    if (menuToggle && menuDropdown) {
        menuToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            menuDropdown.classList.toggle('active');
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!menuToggle.contains(e.target) && !menuDropdown.contains(e.target)) {
                menuDropdown.classList.remove('active');
            }
        });
    }
}


// ========================================
// МОДАЛЬНОЕ ОКНО СРАВНЕНИЯ
// ========================================
function openCompareModal() {
    const modal = document.getElementById('compare-modal');
    modal.style.display = "block";

    // Reset view
    document.getElementById('comparison-results').style.display = 'none';
    document.getElementById('compare-city-input').value = '';

    // Set first city name
    document.getElementById('compare-city-1-name').textContent = document.getElementById('city-name').textContent;
}

async function handleComparison() {
    const secondCity = document.getElementById('compare-city-input').value.trim();
    if (!secondCity) return;

    const submitBtn = document.getElementById('compare-submit-btn');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = '⏳';
    submitBtn.disabled = true;

    try {
        const coords = await getCoordinates(secondCity);
        if (!coords) {
            showNotification('Город не найден', 'error');
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            return;
        }

        const weather2 = await getWeatherData(coords.lat, coords.lon);
        if (weather2) {
            renderComparison(weather2, coords.name);
            document.getElementById('comparison-results').style.display = 'block';
            lucide.createIcons();
        }
    } catch (e) {
        console.error(e);
        showNotification('Ошибка', 'error');
    }

    submitBtn.textContent = originalText;
    submitBtn.disabled = false;
}

function renderComparison(weather2, city2Name) {
    const weather1 = currentWeatherData;

    // Names
    document.getElementById('compare-city-2-name').textContent = city2Name;

    // Temp
    document.getElementById('c1-temp').textContent = Math.round(weather1.current.temperature_2m) + '°C';
    document.getElementById('c2-temp').textContent = Math.round(weather2.current.temperature_2m) + '°C';

    // Feels Like
    document.getElementById('c1-feels').textContent = Math.round(weather1.current.apparent_temperature) + '°C';
    document.getElementById('c2-feels').textContent = Math.round(weather2.current.apparent_temperature) + '°C';

    // Humidity
    document.getElementById('c1-humidity').textContent = weather1.current.relative_humidity_2m + '%';
    document.getElementById('c2-humidity').textContent = weather2.current.relative_humidity_2m + '%';

    // Wind
    document.getElementById('c1-wind').textContent = Math.round(weather1.current.wind_speed_10m) + ' м/с';
    document.getElementById('c2-wind').textContent = Math.round(weather2.current.wind_speed_10m) + ' м/с';

    // Pressure
    document.getElementById('c1-pressure').textContent = Math.round(weather1.current.pressure_msl * 0.750062) + ' мм';
    document.getElementById('c2-pressure').textContent = Math.round(weather2.current.pressure_msl * 0.750062) + ' мм';
}

// ========================================
// ПОИСК ПОГОДЫ
// ========================================
async function searchWeather(city) {
    const lang = document.getElementById('lang-select').value;

    showLoading(true);

    try {
        // Получаем координаты города
        const coords = await getCoordinates(city);

        if (!coords) {
            const messages = {
                ru: `Город "${city}" не найден`,
                kk: `"${city}" қаласы табылмады`,
                en: `City "${city}" not found`
            };
            showNotification(messages[lang] || messages.ru, 'error');
            showLoading(false);
            return;
        }

        currentCityCoords = coords;

        // Загружаем данные погоды
        await loadWeatherData(coords.lat, coords.lon, coords.name, coords.country);

        // Сохраняем в историю
        saveToHistory(coords.name);

        showLoading(false);

        // Прокручиваем к секции погоды
        setTimeout(() => {
            document.getElementById('weather-section').scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }, 300);

    } catch (error) {
        console.error('Ошибка поиска:', error);
        showNotification('Ошибка при загрузке данных', 'error');
        showLoading(false);
    }
}

// ========================================
// ЗАГРУЗКА ДАННЫХ ПОГОДЫ
// ========================================
async function loadWeatherData(lat, lon, cityName, country) {
    try {
        const weather = await getWeatherData(lat, lon);

        if (!weather) {
            showNotification('Не удалось загрузить данные погоды', 'error');
            return;
        }

        currentWeatherData = weather;

        // Обновляем UI
        updateCurrentWeather(weather, cityName, country);
        updateForecast(weather);
        updateHourlyForecast(weather);
        updateChart(weather);
        if (window.initInteractiveMap) {
            window.initInteractiveMap(lat, lon, cityName);
        }
        updateAIRecommendations(weather);

        // Показываем секции
        document.getElementById('weather-section').style.display = 'block';
        document.getElementById('forecast').style.display = 'block';
        document.getElementById('map-section').style.display = 'block';
        document.getElementById('kz-locations').style.display = 'block';

        updateKZLocations();

        lucide.createIcons();

    } catch (error) {
        console.error('Ошибка загрузки погоды:', error);
        showNotification('Ошибка при обработке данных', 'error');
    }
}

// ========================================
// ОБНОВЛЕНИЕ ТЕКУЩЕЙ ПОГОДЫ
// ========================================
function updateCurrentWeather(weather, cityName, country) {
    const current = weather.current;
    const daily = weather.daily;

    // Иконка и описание
    const weatherInfo = getWeatherInfo(current.weather_code);
    const weatherIcon = document.getElementById('weather-icon');
    weatherIcon.setAttribute('data-lucide', weatherInfo.icon);

    // Температура
    document.getElementById('temperature').textContent =
        `${Math.round(current.temperature_2m)}°C`;

    // Название города
    document.getElementById('city-name').textContent = cityName;
    document.getElementById('country-name').textContent = country;

    // Описание погоды
    const lang = document.getElementById('lang-select').value;
    document.getElementById('description').textContent =
        getWeatherDescription(weatherInfo.desc, lang);

    // Время обновления
    const now = new Date();
    document.getElementById('update-time').innerHTML =
        `<i data-lucide="clock"></i> <span data-i18n="weather-updated">Обновлено:</span> ${now.toLocaleTimeString(lang === 'ru' ? 'ru-RU' : lang === 'kk' ? 'kk-KZ' : 'en-US', { hour: '2-digit', minute: '2-digit' })}`;

    // Детали
    document.getElementById('feels-like').textContent =
        `${Math.round(current.apparent_temperature)}°C`;
    document.getElementById('humidity').textContent =
        `${current.relative_humidity_2m}%`;
    document.getElementById('wind').textContent =
        `${Math.round(current.wind_speed_10m)} м/с`;
    document.getElementById('pressure').textContent =
        `${Math.round(current.pressure_msl * 0.750062)} мм`;
    document.getElementById('visibility').textContent =
        `10 км`;
    document.getElementById('uv-index').textContent =
        daily.uv_index_max[0] || '--';

    // Дополнительная информация
    const sunrise = new Date(daily.sunrise[0]);
    const sunset = new Date(daily.sunset[0]);

    document.getElementById('sunrise').textContent =
        sunrise.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    document.getElementById('sunset').textContent =
        sunset.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    document.getElementById('clouds').textContent =
        `${current.cloud_cover}%`;
}

// ========================================
// ОБНОВЛЕНИЕ ПРОГНОЗА НА 7 ДНЕЙ
// ========================================
function updateForecast(weather) {
    const forecastGrid = document.getElementById('forecast-grid');
    forecastGrid.innerHTML = '';

    const lang = document.getElementById('lang-select').value;
    const weekdays = translations[lang].weekdays || ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];
    const todayText = translations[lang]['forecast-today'] || 'Сегодня';

    const daily = weather.daily;

    for (let i = 0; i < 7; i++) {
        const date = new Date(daily.time[i]);
        const dayName = i === 0 ? todayText : weekdays[date.getDay()];
        const tempMax = Math.round(daily.temperature_2m_max[i]);
        const tempMin = Math.round(daily.temperature_2m_min[i]);
        const weatherInfo = getWeatherInfo(daily.weather_code[i]);

        const cardHtml = `
            <div class="forecast-card">
                <div class="forecast-day">${dayName}</div>
                <div class="forecast-icon"><i data-lucide="${weatherInfo.icon}"></i></div>
                <div class="forecast-temp-max">${tempMax}°</div>
                <div class="forecast-temp-min">${tempMin}°</div>
            </div>
        `;
        forecastGrid.insertAdjacentHTML('beforeend', cardHtml);
    }
}

// ========================================
// ОБНОВЛЕНИЕ ПОЧАСОВОГО ПРОГНОЗА
// ========================================
function updateHourlyForecast(weather) {
    const hourlyGrid = document.getElementById('hourly-grid');
    hourlyGrid.innerHTML = '';

    const hourly = weather.hourly;
    const currentHourIndex = new Date().getHours();

    // Display next 24 hours
    for (let i = currentHourIndex; i < currentHourIndex + 24; i++) {
        // Handle array bounds if necessary, though API usually returns enough data
        if (!hourly.time[i]) break;

        const date = new Date(hourly.time[i]);
        const timeString = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        const temp = Math.round(hourly.temperature_2m[i]);
        const weatherInfo = getWeatherInfo(hourly.weather_code[i]);
        const precipProb = hourly.precipitation_probability[i];

        const cardHtml = `
            <div class="hourly-card">
                <div class="hourly-time">${timeString}</div>
                <div class="hourly-icon"><i data-lucide="${weatherInfo.icon}"></i></div>
                <div class="hourly-temp">${temp}°</div>
                ${precipProb > 0 ? `<div class="hourly-precip"><i data-lucide="droplets" style="width:12px; height:12px;"></i> ${precipProb}%</div>` : ''}
            </div>
        `;
        hourlyGrid.insertAdjacentHTML('beforeend', cardHtml);
    }

    lucide.createIcons();
}

// ========================================
// ОБНОВЛЕНИЕ ГРАФИКА
// ========================================
function updateChart(weather) {
    const canvas = document.getElementById('temperature-chart');
    const ctx = canvas.getContext('2d');

    const daily = weather.daily;
    const lang = document.getElementById('lang-select').value;
    const weekdays = translations[lang].weekdays || ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];

    const labels = daily.time.slice(0, 7).map((time, i) => {
        const date = new Date(time);
        return i === 0 ? (translations[lang]['forecast-today'] || 'Сегодня') : weekdays[date.getDay()];
    });

    const maxTemps = daily.temperature_2m_max.slice(0, 7).map(t => Math.round(t));
    const minTemps = daily.temperature_2m_min.slice(0, 7).map(t => Math.round(t));

    // Удаляем старый график
    if (weatherChart) {
        weatherChart.destroy();
    }

    // Определяем цвета в зависимости от темы
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    const gridColor = isDark ? '#333' : '#e0e0e0';
    const textColor = isDark ? '#e0e0e0' : '#1a1a1a';

    weatherChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [
                {
                    label: 'Макс',
                    data: maxTemps,
                    borderColor: '#ff6b6b',
                    backgroundColor: 'rgba(255, 107, 107, 0.1)',
                    tension: 0.4,
                    fill: true,
                    pointRadius: 4,
                    pointHoverRadius: 6
                },
                {
                    label: 'Мин',
                    data: minTemps,
                    borderColor: '#4dabf7',
                    backgroundColor: 'rgba(77, 171, 247, 0.1)',
                    tension: 0.4,
                    fill: true,
                    pointRadius: 4,
                    pointHoverRadius: 6
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    display: true,
                    labels: {
                        color: textColor,
                        font: {
                            family: 'Manrope',
                            size: 12,
                            weight: '600'
                        }
                    }
                },
                tooltip: {
                    backgroundColor: isDark ? '#2d2d2d' : '#ffffff',
                    titleColor: textColor,
                    bodyColor: textColor,
                    borderColor: gridColor,
                    borderWidth: 1,
                    padding: 12,
                    displayColors: true,
                    callbacks: {
                        label: function (context) {
                            return context.dataset.label + ': ' + context.parsed.y + '°C';
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: false,
                    grid: {
                        color: gridColor
                    },
                    ticks: {
                        color: textColor,
                        font: {
                            family: 'Manrope'
                        },
                        callback: function (value) {
                            return value + '°C';
                        }
                    }
                },
                x: {
                    grid: {
                        display: false
                    },
                    ticks: {
                        color: textColor,
                        font: {
                            family: 'Manrope',
                            weight: '600'
                        }
                    }
                }
            }
        }
    });
}

// ========================================
// ПОПУЛЯРНОЕ В КАЗАХСТАНЕ
// ========================================
const kzCities = [
    { name: { ru: 'Алматы', kk: 'Алматы', en: 'Almaty' }, lat: 43.2567, lon: 76.9286 },
    { name: { ru: 'Астана', kk: 'Астана', en: 'Astana' }, lat: 51.1801, lon: 71.446 },
    { name: { ru: 'Шымкент', kk: 'Шымкент', en: 'Shymkent' }, lat: 42.3417, lon: 69.5901 },
    { name: { ru: 'Актау', kk: 'Ақтау', en: 'Aktau' }, lat: 43.6481, lon: 51.1722 },
    { name: { ru: 'Тараз', kk: 'Тараз', en: 'Taraz' }, lat: 42.9, lon: 71.3667 },
    { name: { ru: 'Атырау', kk: 'Атырау', en: 'Atyrau' }, lat: 47.1167, lon: 51.8833 },
    { name: { ru: 'Караганда', kk: 'Қарағанды', en: 'Karaganda' }, lat: 49.8019, lon: 73.1021 },
    { name: { ru: 'Актобе', kk: 'Ақтөбе', en: 'Aktobe' }, lat: 50.2839, lon: 57.1670 },
    { name: { ru: 'Павлодар', kk: 'Павлодар', en: 'Pavlodar' }, lat: 52.2873, lon: 76.9674 },
    { name: { ru: 'Семей', kk: 'Семей', en: 'Semey' }, lat: 50.4111, lon: 80.2275 },
    { name: { ru: 'Усть-Каменогорск', kk: 'Өскемен', en: 'Oskemen' }, lat: 49.9714, lon: 82.6059 },
    { name: { ru: 'Туркестан', kk: 'Түркістан', en: 'Turkistan' }, lat: 43.3004, lon: 68.2434 },
    { name: { ru: 'Кызылорда', kk: 'Қызылорда', en: 'Kyzylorda' }, lat: 44.8488, lon: 65.4823 },
    { name: { ru: 'Костанай', kk: 'Қостанай', en: 'Kostanay' }, lat: 53.2144, lon: 63.6321 },
    { name: { ru: 'Уральск', kk: 'Орал', en: 'Oral' }, lat: 51.2333, lon: 51.3667 },
    { name: { ru: 'Петропавловск', kk: 'Петропавл', en: 'Petropavl' }, lat: 54.8914, lon: 69.1403 },
    { name: { ru: 'Кокшетау', kk: 'Көкшетау', en: 'Kokshetau' }, lat: 53.2833, lon: 69.4 },
    { name: { ru: 'Талдыкорган', kk: 'Талдықорған', en: 'Taldykorgan' }, lat: 45.0156, lon: 78.3739 },
    { name: { ru: 'Жезказган', kk: 'Жезқазған', en: 'Zhezkazgan' }, lat: 47.7833, lon: 67.7667 },
    { name: { ru: 'Балхаш', kk: 'Балқаш', en: 'Balkhash' }, lat: 46.8481, lon: 74.9950 }
];

async function updateKZLocations() {
    const grid = document.getElementById('kz-grid');
    if (!grid) return;

    grid.innerHTML = '<div class="kz-loading"><div class="kz-loading-spinner"></div></div>';

    try {
        const promises = kzCities.map(city => getWeatherData(city.lat, city.lon));
        const results = await Promise.all(promises);

        grid.innerHTML = '';
        const lang = document.getElementById('lang-select').value;

        results.forEach((weather, index) => {
            if (!weather) return;

            const city = kzCities[index];
            const temp = Math.round(weather.current.temperature_2m);
            const weatherInfo = getWeatherInfo(weather.current.weather_code);
            const desc = getWeatherDescription(weatherInfo.desc, lang);

            // Select city name based on language, fallback to Russian if missing
            const cityName = city.name[lang] || city.name.ru;

            const cardHtml = `
                <div class="kz-card" onclick="document.getElementById('city-input').value='${cityName}'; document.getElementById('weather-search').dispatchEvent(new Event('submit'));">
                    <div class="kz-city-name">${cityName}</div>
                    <div class="kz-icon"><i data-lucide="${weatherInfo.icon}" style="width: 48px; height: 48px;"></i></div>
                    <div class="kz-temp">${temp}°C</div>
                    <div class="kz-desc">${desc}</div>
                </div>
            `;
            grid.insertAdjacentHTML('beforeend', cardHtml);
        });

        lucide.createIcons();
    } catch (error) {
        console.error('Error updating KZ locations:', error);
        grid.innerHTML = '<p>Не удалось загрузить данные</p>';
    }
}


// ========================================
// AI РЕКОМЕНДАЦИИ
// ========================================
function updateAIRecommendations(weather) {
    const current = weather.current;
    const daily = weather.daily;
    const lang = document.getElementById('lang-select').value;

    const temp = current.temperature_2m;
    const precipitation = daily.precipitation_sum[0] || 0;

    // Рекомендация по одежде
    let clothingAdvice = '';
    if (temp < -10) {
        clothingAdvice = {
            ru: '❄️ Очень холодно! Тёплая зимняя одежда, шапка и перчатки обязательны',
            kk: '❄️ Өте суық! Жылы қысқы киім, бас киім және қолғап міндетті',
            en: '❄️ Very cold! Warm winter clothes, hat and gloves are a must'
        };
    } else if (temp < 0) {
        clothingAdvice = {
            ru: '🧥 Холодно. Зимняя куртка и тёплые вещи',
            kk: '🧥 Суық. Қысқы күртеше және жылы киім',
            en: '🧥 Cold. Winter jacket and warm clothes'
        };
    } else if (temp < 10) {
        clothingAdvice = {
            ru: '🧥 Прохладно. Куртка или пальто рекомендуется',
            kk: '🧥 Салқын. Күртеше немесе пальто ұсынылады',
            en: '🧥 Cool. Jacket or coat recommended'
        };
    } else if (temp < 20) {
        clothingAdvice = {
            ru: '👕 Умеренно. Лёгкая куртка или кофта',
            kk: '👕 Қалыпты. Жеңіл күртеше немесе жемпір',
            en: '👕 Moderate. Light jacket or sweater'
        };
    } else if (temp < 25) {
        clothingAdvice = {
            ru: '👔 Комфортно. Лёгкая одежда',
            kk: '👔 Жайлы. Жеңіл киім',
            en: '👔 Comfortable. Light clothing'
        };
    } else {
        clothingAdvice = {
            ru: '🌞 Жарко! Лёгкая летняя одежда, головной убор',
            kk: '🌞 Ыстық! Жеңіл жазғы киім, бас киім',
            en: '🌞 Hot! Light summer clothes, hat'
        };
    }

    // Рекомендация по зонту
    let umbrellaAdvice = '';
    if (precipitation > 5) {
        umbrellaAdvice = {
            ru: '☔ Возьмите зонт! Ожидаются осадки',
            kk: '☔ Қолшатырды алыңыз! Жауын-шашын болады',
            en: '☔ Take an umbrella! Precipitation expected'
        };
    } else if (precipitation > 0) {
        umbrellaAdvice = {
            ru: '🌂 Зонт может пригодиться',
            kk: '🌂 Қолшатыр пайдалы болуы мүмкін',
            en: '🌂 Umbrella might be useful'
        };
    } else {
        umbrellaAdvice = {
            ru: '✅ Зонт не понадобится',
            kk: '✅ Қолшатыр қажет емес',
            en: '✅ No umbrella needed'
        };
    }

    document.getElementById('clothing-advice').textContent = clothingAdvice[lang] || clothingAdvice.ru;
    document.getElementById('umbrella-advice').textContent = umbrellaAdvice[lang] || umbrellaAdvice.ru;
}

// ========================================
// МОЁ МЕСТОПОЛОЖЕНИЕ
// ========================================
function getCurrentLocation() {
    const lang = document.getElementById('lang-select').value;

    if (!navigator.geolocation) {
        const messages = {
            ru: 'Геолокация не поддерживается вашим браузером',
            kk: 'Геолокация браузеріңізде қолдау көрсетілмейді',
            en: 'Geolocation is not supported by your browser'
        };
        showNotification(messages[lang] || messages.ru, 'error');
        return;
    }

    showLoading(true);

    navigator.geolocation.getCurrentPosition(
        async (position) => {
            const { latitude, longitude } = position.coords;

            try {
                const response = await fetch(
                    `https://geocoding-api.open-meteo.com/v1/search?latitude=${latitude}&longitude=${longitude}&count=1&language=${lang}&format=json`
                );
                const data = await response.json();

                let cityName = 'Ваше местоположение';
                let country = '';

                if (data.results && data.results.length > 0) {
                    cityName = data.results[0].name;
                    country = data.results[0].country;
                }

                currentCityCoords = {
                    name: cityName,
                    lat: latitude,
                    lon: longitude,
                    country: country
                };

                await loadWeatherData(latitude, longitude, cityName, country);
                document.getElementById('city-input').value = cityName;

            } catch (error) {
                console.error('Ошибка геокодирования:', error);
                await loadWeatherData(latitude, longitude, 'Ваше местоположение', '');
            }

            showLoading(false);
        },
        (error) => {
            console.error('Ошибка геолокации:', error);
            const messages = {
                ru: 'Не удалось определить местоположение',
                kk: 'Орынды анықтау мүмкін болмады',
                en: 'Unable to determine location'
            };
            showNotification(messages[lang] || messages.ru, 'error');
            showLoading(false);
        }
    );
}

// ========================================
// ПОДЕЛИТЬСЯ
// ========================================
function shareWeather() {
    if (!currentCityCoords || !currentWeatherData) {
        showNotification('Сначала найдите город', 'warning');
        return;
    }

    const temp = Math.round(currentWeatherData.current.temperature_2m);
    const weatherInfo = getWeatherInfo(currentWeatherData.current.weather_code);
    const lang = document.getElementById('lang-select').value;
    const desc = getWeatherDescription(weatherInfo.desc, lang);

    const shareText = `${currentCityCoords.name}: ${temp}°C, ${desc}`;
    const shareUrl = window.location.href;

    if (navigator.share) {
        navigator.share({
            title: 'WeatherAI',
            text: shareText,
            url: shareUrl
        }).catch(err => console.log('Ошибка при попытке поделиться:', err));
    } else {
        const textToCopy = `${shareText}\n${shareUrl}`;

        navigator.clipboard.writeText(textToCopy).then(() => {
            showNotification('Скопировано в буфер обмена!', 'success');
        }).catch(err => {
            console.error('Ошибка копирования:', err);
            showNotification('Не удалось скопировать', 'error');
        });
    }
}

// ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ
// ========================================
function getWeatherDescription(descKey, lang) {
    const descriptions = {
        'clear': { ru: 'Ясно', kk: 'Ашық', en: 'Clear' },
        'mostly-clear': { ru: 'В основном ясно', kk: 'Негізінен ашық', en: 'Mostly Clear' },
        'partly-cloudy': { ru: 'Переменная облачность', kk: 'Бұлтты', en: 'Partly Cloudy' },
        'overcast': { ru: 'Облачно', kk: 'Бұлтты', en: 'Overcast' },
        'fog': { ru: 'Туман', kk: 'Тұман', en: 'Fog' },
        'drizzle': { ru: 'Морось', kk: 'Шұбар жаңбыр', en: 'Drizzle' },
        'freezing-drizzle': { ru: 'Ледяная морось', kk: 'Мұзды шұбар', en: 'Freezing Drizzle' },
        'rain': { ru: 'Дождь', kk: 'Жаңбыр', en: 'Rain' },
        'heavy-rain': { ru: 'Сильный дождь', kk: 'Күшті жаңбыр', en: 'Heavy Rain' },
        'freezing-rain': { ru: 'Ледяной дождь', kk: 'Мұзды жаңбыр', en: 'Freezing Rain' },
        'snow': { ru: 'Снег', kk: 'Қар', en: 'Snow' },
        'heavy-snow': { ru: 'Сильный снег', kk: 'Күшті қар', en: 'Heavy Snow' },
        'showers': { ru: 'Ливень', kk: 'Нөсер', en: 'Showers' },
        'violent-showers': { ru: 'Сильный ливень', kk: 'Күшті нөсер', en: 'Violent Showers' },
        'snow-showers': { ru: 'Снегопад', kk: 'Қар жауады', en: 'Snow Showers' },
        'thunderstorm': { ru: 'Гроза', kk: 'Найзағай', en: 'Thunderstorm' },
        'thunderstorm-hail': { ru: 'Гроза с градом', kk: 'Бұршақты найзағай', en: 'Thunderstorm with Hail' },
        'unknown': { ru: 'Неизвестно', kk: 'Белгісіз', en: 'Unknown' }
    };

    return descriptions[descKey] ? descriptions[descKey][lang] : descKey;
}

function showLoading(show) {
    const searchBtn = document.querySelector('.search-btn');
    if (show) {
        searchBtn.textContent = '⏳';
        searchBtn.disabled = true;
    } else {
        const lang = document.getElementById('lang-select').value;
        searchBtn.textContent = translations[lang]['btn-find'] || 'Найти';
        searchBtn.disabled = false;
    }
}

// ========================================
// УВЕДОМЛЕНИЯ
// ========================================
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i data-lucide="${type === 'error' ? 'alert-circle' : type === 'warning' ? 'alert-triangle' : 'info'}"></i>
            <span>${message}</span>
        </div>
    `;

    // Style it (inline for simplicity or add to css)
    Object.assign(notification.style, {
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        backgroundColor: type === 'error' ? '#ef4444' : type === 'warning' ? '#f59e0b' : '#3b82f6',
        color: 'white',
        padding: '12px 20px',
        borderRadius: '8px',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
        zIndex: '10000',
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        transition: 'all 0.3s ease',
        transform: 'translateY(100px)',
        opacity: '0'
    });

    document.body.appendChild(notification);

    // Animate in
    requestAnimationFrame(() => {
        notification.style.transform = 'translateY(0)';
        notification.style.opacity = '1';
    });

    // Icons
    if (window.lucide) lucide.createIcons({ root: notification });

    // Remove after 3s
    setTimeout(() => {
        notification.style.transform = 'translateY(100px)';
        notification.style.opacity = '0';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Expose to window for modules
window.showNotification = showNotification;

function saveToHistory(cityName) {
    let history = JSON.parse(localStorage.getItem('searchHistory') || '[]');
    history = history.filter(city => city !== cityName);
    history.unshift(cityName);
    history = history.slice(0, 10);
    localStorage.setItem('searchHistory', JSON.stringify(history));
}

function loadFavorites() {
    // Заглушка для будущей функции избранного
}

// Добавляем CSS для анимации обновления
const style = document.createElement('style');
style.textContent = `
    .rotating {
        animation: rotate 1s linear infinite;
    }
    
    @keyframes rotate {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
    }
`;
document.head.appendChild(style)