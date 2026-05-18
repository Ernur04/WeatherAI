document.addEventListener('DOMContentLoaded', function () {
            // Инициализация Lucide иконок
            if (typeof lucide !== 'undefined') {
                lucide.createIcons();
            }

            // Инициализация карты Leaflet
            const map = L.map('weather-map').setView([55.7558, 37.6173], 4);

            // Базовый слой карты (OpenStreetMap)
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; OpenStreetMap contributors'
            }).addTo(map);

            // ====================================================================
            // ВАЖНО: Вставьте ваш рабочий API-ключ OpenWeatherMap между кавычками,
            // чтобы погодные слои начали отображаться!
            // ====================================================================
            const OWM_KEY = 'ВАШ_API_КЛЮЧ'; 

            // Конфигурация погодных слоев
            const layers = {
                'precipitation': L.tileLayer('https://tile.openweathermap.org/map/precipitation_new/{z}/{x}/{y}.png?appid=' + OWM_KEY, {opacity: 0.7}),
                'wind': L.tileLayer('https://tile.openweathermap.org/map/wind_new/{z}/{x}/{y}.png?appid=' + OWM_KEY, {opacity: 0.7}),
                'temp': L.tileLayer('https://tile.openweathermap.org/map/temp_new/{z}/{x}/{y}.png?appid=' + OWM_KEY, {opacity: 0.7}),
                'clouds': L.tileLayer('https://tile.openweathermap.org/map/clouds_new/{z}/{x}/{y}.png?appid=' + OWM_KEY, {opacity: 0.7}),
                'snow': L.tileLayer('https://tile.openweathermap.org/map/snow_new/{z}/{x}/{y}.png?appid=' + OWM_KEY, {opacity: 0.7})
            };
            let currentLayer = null;
            let currentMarker = null; // Для хранения одного активного маркера на карте

            // Исправление размеров карты при рендере в Flexbox
            setTimeout(() => {
                map.invalidateSize();
            }, 300);

            // Вспомогательная функция для установки маркера и перемещения карты
            function moveAndMark(lat, lon, popupText) {
                map.setView([lat, lon], 10);
                if (currentMarker) {
                    map.removeLayer(currentMarker);
                }
                currentMarker = L.marker([lat, lon])
                    .addTo(map)
                    .bindPopup(`<b>${popupText}</b>`)
                    .openPopup();
            }

            // Элементы живого поиска
            const searchInput = document.getElementById('map-search-input');
            const searchBtn = document.getElementById('map-search-btn');
            const suggestionsContainer = document.getElementById('map-search-suggestions');
            let debounceTimer;

            // Логика живых подсказок автодополнения (Nominatim API)
            searchInput.addEventListener('input', function() {
                clearTimeout(debounceTimer);
                const query = searchInput.value.trim();

                if (query.length < 3) {
                    suggestionsContainer.classList.add('hidden');
                    return;
                }

                // Дебаунс 400мс, чтобы не перегружать API частыми запросами
                debounceTimer = setTimeout(() => {
                    fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=5`)
                        .then(response => response.json())
                        .then(data => {
                            suggestionsContainer.innerHTML = '';
                            if (data && data.length > 0) {
                                data.forEach(item => {
                                    const div = document.createElement('div');
                                    div.className = 'suggestion-item';
                                    
                                    // Форматируем красивую строку
                                    const shortName = item.display_name.split(',')[0];
                                    div.innerHTML = `<i class="lucide-map-pin"></i> <span>${item.display_name}</span>`;
                                    
                                    // Клик по выбранному городу из списка
                                    div.addEventListener('click', function() {
                                        searchInput.value = shortName;
                                        suggestionsContainer.classList.add('hidden');
                                        moveAndMark(parseFloat(item.lat), parseFloat(item.lon), shortName);
                                    });
                                    suggestionsContainer.appendChild(div);
                                });
                                suggestionsContainer.classList.remove('hidden');
                            } else {
                                suggestionsContainer.classList.add('hidden');
                            }
                        })
                        .catch(err => console.error('Ошибка получения подсказок:', err));
                }, 400);
            });

            // Скрывать подсказки, если кликнули в любое другое место экрана
            document.addEventListener('click', function(e) {
                if (!searchInput.contains(e.target) && !suggestionsContainer.contains(e.target)) {
                    suggestionsContainer.classList.add('hidden');
                }
            });

            // Обычный ручной поиск (по нажатию на иконку лупы или Enter)
            function performSearch() {
                const query = searchInput.value.trim();
                if (!query) return;

                suggestionsContainer.classList.add('hidden');

                fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}`)
                    .then(response => response.json())
                    .then(data => {
                        if (data && data.length > 0) {
                            const result = data[0];
                            const shortName = result.display_name.split(',')[0];
                            moveAndMark(parseFloat(result.lat), parseFloat(result.lon), shortName);
                        } else {
                            alert('Город не найден, попробуйте еще раз.');
                        }
                    })
                    .catch(err => {
                        console.error('Ошибка поиска:', err);
                        alert('Произошла ошибка при выполнении поиска.');
                    });
            }

            if (searchBtn) searchBtn.addEventListener('click', performSearch);
            if (searchInput) {
                searchInput.addEventListener('keypress', function (e) {
                    if (e.key === 'Enter') performSearch();
                });
            }

            // Логика кнопки Геолокации
            const geoBtn = document.getElementById('map-geolocation-btn');
            if (geoBtn) {
                geoBtn.addEventListener('click', function () {
                    if (!navigator.geolocation) {
                        alert('Геолокация не поддерживается вашим браузером');
                        return;
                    }

                    geoBtn.style.opacity = '0.4';

                    navigator.geolocation.getCurrentPosition(
                        (position) => {
                            geoBtn.style.opacity = '1';
                            const lat = position.coords.latitude;
                            const lon = position.coords.longitude;
                            moveAndMark(lat, lon, 'Вы находитесь здесь');
                        },
                        (error) => {
                            geoBtn.style.opacity = '1';
                            console.error('Ошибка геолокации:', error);
                            alert('Не удалось определить положение. Проверьте разрешения на доступ к геопозиции.');
                        },
                        { enableHighAccuracy: true, timeout: 8000 }
                    );
                });
            }

            // Логика переключения погодных слоев и обновления интерактивной Легенды
            const layerButtons = document.querySelectorAll('.map-buttons-row .map-btn');
            const overlayPanel = document.getElementById('map-overlay-panel');
            const legendTitle = document.getElementById('legend-title');
            const legendGradient = document.getElementById('legend-gradient');
            const opacityInput = document.getElementById('opacity-range');

            // Данные для кастомизации шкал под каждый тип слоя погоды
            const legendData = {
                'temp': { title: 'Температура', class: 'gradient-temp', min: '-40°C', mid: '0°C', max: '+40°C' },
                'precipitation': { title: 'Осадки (мм/ч)', class: 'gradient-precipitation', min: '0', mid: '5', max: '30+' },
                'wind': { title: 'Скорость ветра', class: 'gradient-wind', min: '0 м/с', mid: '12 м/с', max: '35+ м/с' },
                'clouds': { title: 'Облачность', class: 'gradient-clouds', min: '0%', mid: '50%', max: '100%' },
                'snow': { title: 'Снег (мм/ч)', class: 'gradient-snow', min: '0', mid: '2', max: '10+' }
            };

            layerButtons.forEach(btn => {
                btn.addEventListener('click', function () {
                    layerButtons.forEach(b => b.classList.remove('active'));
                    btn.classList.add('active');
                    const layer = btn.getAttribute('data-layer');

                    // Удаляем текущий слой, если он есть
                    if (currentLayer) {
                        map.removeLayer(currentLayer);
                        currentLayer = null;
                    }

                    if (layer === 'none') {
                        // Прячем оверлей-легенду на чистой карте
                        overlayPanel.classList.add('hidden');
                    } else if (layers[layer]) {
                        // Добавляем погодный слой
                        currentLayer = layers[layer];
                        currentLayer.setOpacity(opacityInput.value); // Задаем текущий уровень прозрачности
                        map.addLayer(currentLayer);

                        // Динамически перестраиваем Легенду
                        const data = legendData[layer];
                        legendTitle.textContent = data.title;
                        legendGradient.className = 'scale-gradient ' + data.class;
                        
                        document.getElementById('label-min').textContent = data.min;
                        document.getElementById('label-mid').textContent = data.mid;
                        document.getElementById('label-max').textContent = data.max;

                        overlayPanel.classList.remove('hidden'); // Показываем панель
                    }
                });
            });

            // Слушатель изменения ползунка прозрачности
            if (opacityInput) {
                opacityInput.addEventListener('input', function () {
                    if (currentLayer) {
                        currentLayer.setOpacity(this.value);
                    }
                });
            }

            // Выпадающее меню бургер
            const menuToggle = document.getElementById('menu-toggle');
            const menuDropdown = document.getElementById('menu-dropdown');
            if (menuToggle && menuDropdown) {
                menuToggle.addEventListener('click', function (e) {
                    e.stopPropagation();
                    menuDropdown.classList.toggle('active');
                });
                document.addEventListener('click', function (e) {
                    if (!menuToggle.contains(e.target) && !menuDropdown.contains(e.target)) {
                        menuDropdown.classList.remove('active');
                    }
                });
            }
        });