// ai-modal.js - Logic for the AI Analysis Modal

document.addEventListener('DOMContentLoaded', () => {
    // 1. DOM Elements
    const btnAi = document.getElementById('btn-ai');
    const aiModal = document.getElementById('ai-modal');
    const closeAiBtn = document.getElementById('close-ai-modal');
    
    // Tabs
    const tabBtns = document.querySelectorAll('.ai-tab-btn');
    const tabContents = document.querySelectorAll('.ai-tab-content');
    
    // Chat Elements
    const chatMessages = document.getElementById('ai-chat-messages');
    const chatInput = document.getElementById('ai-chat-input');
    const chatSendBtn = document.getElementById('ai-chat-send');
    const voiceBtn = document.getElementById('ai-voice-btn');
    const clearChatBtn = document.getElementById('ai-clear-chat');
    
    // Loading State for cities
    let citiesLoaded = false;
    
    if(!btnAi || !aiModal) return; // Guard clause

    // 2. Event Listeners for Modal
    btnAi.addEventListener('click', () => {
        aiModal.style.display = 'block';
        // Add a small initial welcome message if empty
        if(chatMessages.children.length === 0) {
            simulateAiTyping("Привет! Я ИИ-ассистент WeatherAI. Я могу проанализировать погоду, дать советы, что надеть, или подсказать, стоит ли брать зонт. Что вас интересует?");
        }
    });

    closeAiBtn.addEventListener('click', () => {
        aiModal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target === aiModal) {
            aiModal.style.display = 'none';
        }
    });

    // 3. Event Listeners for Tabs
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));
            
            // Add active to clicked
            btn.classList.add('active');
            const targetId = btn.getAttribute('data-tab');
            document.getElementById(targetId).classList.add('active');
        });
    });

    // 4. Chat Logic
    function addMessage(text, sender) {
        const msgDiv = document.createElement('div');
        msgDiv.className = `chat-msg ${sender}`;
        
        const bubbleDiv = document.createElement('div');
        bubbleDiv.className = 'msg-bubble';
        
        // Simple Markdown-like replacement for bold & breaks
        let formattedText = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        formattedText = formattedText.replace(/\n/g, '<br>');
        
        bubbleDiv.innerHTML = formattedText;
        
        // Add Copy button to AI messages
        if (sender === 'ai') {
            const copyBtn = document.createElement('button');
            copyBtn.className = 'ai-msg-copy-btn';
            copyBtn.innerHTML = '<i data-lucide="copy"></i>';
            copyBtn.title = "Копировать текст";
            copyBtn.onclick = () => {
                navigator.clipboard.writeText(text.replace(/\*\*/g, ''));
                copyBtn.innerHTML = '<i data-lucide="check"></i>';
                setTimeout(() => { copyBtn.innerHTML = '<i data-lucide="copy"></i>'; if(window.lucide) lucide.createIcons(); }, 2000);
            };
            msgDiv.appendChild(copyBtn);
        }
        
        msgDiv.appendChild(bubbleDiv);
        
        chatMessages.appendChild(msgDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight; // Auto scroll
        if(window.lucide) lucide.createIcons();
    }

    function addTypingIndicator() {
        const msgDiv = document.createElement('div');
        msgDiv.className = `chat-msg ai typing-temp`;
        
        const bubbleDiv = document.createElement('div');
        bubbleDiv.className = 'msg-bubble typing-indicator';
        bubbleDiv.innerHTML = '<div class="typing-dot"></div><div class="typing-dot"></div><div class="typing-dot"></div>';
        
        msgDiv.appendChild(bubbleDiv);
        chatMessages.appendChild(msgDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
        
        return msgDiv;
    }

    function removeTypingIndicator(indicator) {
        if(indicator && indicator.parentNode) {
            indicator.parentNode.removeChild(indicator);
        }
    }

    // Simulated AI Processing using local keywords and random logic
    async function generateAiResponse(query) {
        const q = query.toLowerCase();

        // Specific city forecast check
        let match = q.match(/погод[ауеыя]*\s+(?:в\s+|во\s+)?([а-яa-z\-]+)/i);
        if (match) {
            // Some stopwords to ignore
            const stopWords = ['городе', 'стране', 'мире', 'сейчас', 'завтра', 'сегодня'];
            const cityQuery = match[1].replace(/[^а-яa-z\-]/g, ''); // clean punctuation
            if (cityQuery.length > 2 && !stopWords.includes(cityQuery)) {
                try {
                    const coords = await window.getCoordinates(cityQuery);
                    if (coords) {
                        const data = await window.getWeatherData(coords.lat, coords.lon);
                        if (data && data.current) {
                            const temp = Math.round(data.current.temperature_2m);
                            const feels = Math.round(data.current.apparent_temperature);
                            const humidity = data.current.relative_humidity_2m;
                            const wind = data.current.wind_speed_10m;
                            const pressure = Math.round(data.current.surface_pressure * 0.750062); // hPa to mmHg
                            const clouds = data.current.cloud_cover;
                            
                            const uv = data.daily?.uv_index_max?.[0] || '—';
                            let sunrise = data.daily?.sunrise?.[0] || '';
                            if (sunrise) sunrise = new Date(sunrise).toLocaleTimeString('ru-RU', {hour:'2-digit', minute:'2-digit'});
                            let sunset = data.daily?.sunset?.[0] || '';
                            if (sunset) sunset = new Date(sunset).toLocaleTimeString('ru-RU', {hour:'2-digit', minute:'2-digit'});

                            let clothes = "Одевайтесь по погоде.";
                            if (temp < 0) clothes = "Наденьте зимнюю куртку, шапку и перчатки 🧥❄️";
                            else if (temp < 10) clothes = "Понадобится осенняя куртка или теплое пальто 🧣";
                            else if (temp < 20) clothes = "Легкая ветровка или худи будет в самый раз 🌤️";
                            else clothes = "Отличная погода для футболки и коротких рукавов! 👕☀️";

                            if (data.current.weather_code >= 50 && data.current.weather_code <= 67) {
                                clothes += " И не забудьте зонт — ожидаются осадки ☔!";
                            }

                            return `Вот подробный прогноз для города **${coords.name}**:<br><br>
                            🌡️ **Температура**: ${temp > 0 ? '+'+temp : temp}°C<br>
                            🤔 **Ощущается как**: ${feels > 0 ? '+'+feels : feels}°C<br>
                            💧 **Влажность**: ${humidity}%<br>
                            💨 **Ветер**: ${wind} км/ч<br>
                            🧭 **Давление**: ${pressure} мм рт. ст.<br>
                            ☁️ **Облачность**: ${clouds}%<br>
                            ☀️ **UV индекс**: ${uv}<br>
                            🌅 **Восход**: ${sunrise} | 🌇 **Закат**: ${sunset}<br><br>
                            👕 **Рекомендация по одежде**: ${clothes}`;
                        }
                    } else {
                        return `К сожалению, я не смог найти город с названием "${match[1]}". Попробуйте уточнить название.`;
                    }
                } catch(e) {
                    console.error(e);
                    return `Произошла ошибка при получении данных о погоде для ${match[1]}.`;
                }
            }
        }
        
        // Simple Keyword matching
        if (q.includes('зонт') || q.includes('дождь') || q.includes('осадк')) {
            const currentDesc = document.getElementById('description')?.textContent.toLowerCase() || "";
            if(currentDesc.includes('дождь') || currentDesc.includes('гроза')) {
                return "Сейчас ожидаются осадки. **Обязательно возьмите зонт!** ☔";
            } else {
                return "Судя по моим данным, дождя пока не предвидится. Зонт можно не брать! 🌤️";
            }
        }
        
        if (q.includes('одеться') || q.includes('зимняя') || q.includes('куртка') || q.includes('холодно')) {
            const tempStr = document.getElementById('temperature')?.textContent || "0";
            const currentTemp = parseFloat(tempStr);
            if(isNaN(currentTemp)) return "Я пока не могу точно сказать, обновите прогноз.";
            
            if (currentTemp < 0) return `На улице **${currentTemp}°C**, довольно холодно! Надевайте зимнюю куртку, шапку и перчатки. 🧣❄️`;
            if (currentTemp < 10) return `Сейчас **${currentTemp}°C**. Потребуется осенняя куртка или теплое пальто. 🧥`;
            if (currentTemp < 20) return `Температура **${currentTemp}°C**. Подойдет легкая ветровка, свитер или худи. 🧥🌤️`;
            return `На улице **${currentTemp}°C** — тепло! Можно идти в футболке шортах или легком платье. 👕☀️`;
        }

        if (q.includes('привет') || q.includes('здравствуй')) {
            return "Здравствуйте! Как я могу помочь вам с прогнозом погоды сегодня? ✨";
        }
        
        if (q.includes('сравн') || q.includes('разниц')) {
            return "Для детального сравнения погоды вы можете использовать вкладку **«Сравнение»** в этом модальном окне или кнопку **«Сравнить»** на главной странице. Хотите, чтобы я посоветовал, куда лучше поехать?";
        }

        // Generic fallback with context
        const temp = document.getElementById('temperature')?.textContent || "--";
        const city = document.getElementById('city-name')?.textContent || "выбранном городе";
        
        const fallbacks = [
            `Анализирую... По моим данным в ${city} сейчас температура ${temp}. Это вся информация по вашему запросу.`,
            `Интересный вопрос! С точки зрения метеорологических моделей, сегодня день обещает быть спокойным. Рекомендую следить за обновлениями.`,
            `Я могу анализировать только базовую метеоданные прямо сейчас. 🌡️ Попробуйте спросить меня про температуру или посоветовать одежду!`,
            `Мой сложный ИИ алгоритм предсказывает, что это отличный день для того, чтобы выйти на улицу (если не идет дождь!).`
        ];
        
        return fallbacks[Math.floor(Math.random() * fallbacks.length)];
    }

    async function simulateAiTyping(textOverride = null, query = null) {
        const indicator = addTypingIndicator();
        chatSendBtn.disabled = true;
        chatSendBtn.style.opacity = '0.7';

        // Fake think time between 800ms and 2000ms
        const thinkTimePromise = new Promise(resolve => setTimeout(resolve, Math.random() * 1200 + 800));
        
        let responseText = textOverride;
        if (!textOverride && query) {
            // Start fetch and thinking animation concurrently
            const [aiResp] = await Promise.all([generateAiResponse(query), thinkTimePromise]);
            responseText = aiResp;
        } else {
            await thinkTimePromise;
        }

        removeTypingIndicator(indicator);
        chatSendBtn.disabled = false;
        chatSendBtn.style.opacity = '1';
        
        addMessage(responseText, 'ai');
    }

    function handleSend(overrideText = null) {
        const text = overrideText !== null ? overrideText : chatInput.value.trim();
        if (!text) return;

        // User message
        addMessage(text, 'user');
        chatInput.value = '';

        // Trigger AI thinking then reply
        simulateAiTyping(null, text);
    }

    chatSendBtn.addEventListener('click', () => handleSend());

    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleSend();
        }
    });

    // Quick Prompts Logic
    const quickPrompts = document.querySelectorAll('.ai-prompt-chip');
    quickPrompts.forEach(chip => {
        chip.addEventListener('click', () => {
            handleSend(chip.textContent);
        });
    });

    // Suggestion Dropdown Logic (Text Assistant)
    const suggestionsBox = document.getElementById('ai-chat-suggestions');
    const suggestionItems = document.querySelectorAll('.ai-suggestion-item');

    if (chatInput && suggestionsBox) {
        // Show suggestions on focus if empty
        chatInput.addEventListener('focus', () => {
            if (chatInput.value.trim() === '') {
                suggestionsBox.classList.add('show');
            }
        });

        // Hide when typing something (so it doesn't obstruct the user)
        chatInput.addEventListener('input', () => {
            if (chatInput.value.trim() !== '') {
                suggestionsBox.classList.remove('show');
            } else {
                suggestionsBox.classList.add('show');
            }
        });

        // Hide when clicking outside
        document.addEventListener('click', (e) => {
            if (!chatInput.contains(e.target) && !suggestionsBox.contains(e.target)) {
                suggestionsBox.classList.remove('show');
            }
        });

        // Handle text helper item click
        suggestionItems.forEach(item => {
            item.addEventListener('click', () => {
                chatInput.value = item.textContent; // Set value
                suggestionsBox.classList.remove('show'); // Hide dropdown
                chatInput.focus(); // Re-focus to keep typing
            });
        });
    }

    if (clearChatBtn) {
        clearChatBtn.addEventListener('click', () => {
            chatMessages.innerHTML = '';
            simulateAiTyping("Привет! Я ИИ-ассистент WeatherAI. Я могу проанализировать погоду, дать советы, что надеть, или подсказать, стоит ли брать зонт. Что вас интересует?");
        });
    }

    // 5. Voice Input Logic
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    let recognition = null;
    
    if (SpeechRecognition) {
        recognition = new SpeechRecognition();
        recognition.lang = 'ru-RU';
        recognition.interimResults = false;
        recognition.maxAlternatives = 1;

        recognition.onstart = function() {
            voiceBtn.classList.add('recording');
        };

        recognition.onresult = function(event) {
            const speechResult = event.results[0][0].transcript;
            chatInput.value = speechResult;
            handleSend();
        };

        recognition.onspeechend = function() {
            recognition.stop();
            voiceBtn.classList.remove('recording');
        };

        recognition.onerror = function(event) {
            console.error("Speech recognition error:", event.error);
            voiceBtn.classList.remove('recording');
        };

        voiceBtn.addEventListener('click', () => {
            if(voiceBtn.classList.contains('recording')) {
                recognition.stop();
            } else {
                recognition.start();
            }
        });
    } else {
        // Fallback if not supported
        voiceBtn.style.display = 'none';
    }

    // 6. Populate Advice on open
    btnAi.addEventListener('click', () => {
        // Refresh dynamic values inside advice tab
        const adviceContainer = document.getElementById('ai-advice-list');
        if(!adviceContainer) return;
        
        const temp = parseFloat(document.getElementById('temperature')?.textContent) || 0;
        const wind = parseFloat(document.getElementById('wind')?.textContent) || 0;
        const isRaining = (document.getElementById('description')?.textContent || "").toLowerCase().includes("дождь");

        let adviceHtml = '';

        // Clothing Wizard
        if(temp < 5) {
            adviceHtml += `
            <div class="ai-advice-card">
                <div class="advice-icon-wrapper"><i data-lucide="snowflake"></i></div>
                <h4>Гардероб: Зима</h4>
                <p>Холодно! Надевайте пуховик, теплую шапку, шарф и перчатки.</p>
            </div>`;
        } else if (temp >= 5 && temp < 15) {
            adviceHtml += `
            <div class="ai-advice-card">
                <div class="advice-icon-wrapper"><i data-lucide="cloud"></i></div>
                <h4>Гардероб: Демисезон</h4>
                <p>Прохладно. Рекомендуем осеннюю куртку, легкую шапку и закрытую обувь.</p>
            </div>`;
        } else if (temp >= 15 && temp < 25) {
            adviceHtml += `
            <div class="ai-advice-card">
                <div class="advice-icon-wrapper"><i data-lucide="shirt"></i></div>
                <h4>Гардероб: Комфорт</h4>
                <p>Тепло. Подойдет футболка с легкой ветровкой или худи.</p>
            </div>`;
        } else {
            adviceHtml += `
            <div class="ai-advice-card">
                <div class="advice-icon-wrapper"><i data-lucide="sun"></i></div>
                <h4>Гардероб: Лето</h4>
                <p>Жарко! Шорты, футболка, солнцезащитные очки и кепка — лучший выбор.</p>
            </div>`;
        }

        // Rain/Umbrella
        if (isRaining) {
            adviceHtml += `
            <div class="ai-advice-card">
                <div class="advice-icon-wrapper"><i data-lucide="umbrella"></i></div>
                <h4>Защита от дождя</h4>
                <p>На улице осадки. Обязательно возьмите зонт или наденьте дождевик!</p>
            </div>`;
        }

        // Activity Planner
        if(wind > 10 || isRaining || temp < -15) {
            adviceHtml += `
            <div class="ai-advice-card">
                <div class="advice-icon-wrapper"><i data-lucide="home"></i></div>
                <h4>План активности</h4>
                <p>Погода не благоприятна для долгих прогулок. Лучше провести время в помещении.</p>
            </div>`;
        } else {
             adviceHtml += `
            <div class="ai-advice-card">
                <div class="advice-icon-wrapper"><i data-lucide="footprints"></i></div>
                <h4>План активности</h4>
                <p>Отличная погода для спорта на улице, прогулок с питомцами или пикника.</p>
            </div>`;
        }

        adviceContainer.innerHTML = adviceHtml;
        if(window.lucide) lucide.createIcons();
    });

    // 7. Populate City Forecasts
    const tabCitiesBtn = document.querySelector('.ai-tab-btn[data-tab="tab-cities"]');
    if (tabCitiesBtn) {
        tabCitiesBtn.addEventListener('click', async () => {
            if (citiesLoaded) return; // Fetch only once
            
            const citiesList = document.getElementById('ai-cities-list');
            if (!citiesList) return;

            // Pre-defined coordinates for major cities of Kazakhstan
            const targetCities = [
                { name: 'Астана', lat: 51.1694, lon: 71.4491 },
                { name: 'Алматы', lat: 43.2389, lon: 76.8897 },
                { name: 'Шымкент', lat: 42.3155, lon: 69.5869 },
                { name: 'Караганда', lat: 49.8018, lon: 73.1021 },
                { name: 'Актобе', lat: 50.2839, lon: 57.1670 },
                { name: 'Тараз', lat: 42.9000, lon: 71.3667 },
                { name: 'Павлодар', lat: 52.3000, lon: 76.9500 },
                { name: 'Усть-Каменогорск', lat: 49.9500, lon: 82.6167 },
                { name: 'Семей', lat: 50.4111, lon: 80.2275 },
                { name: 'Атырау', lat: 47.1167, lon: 51.8833 },
                { name: 'Кызылорда', lat: 44.8528, lon: 65.5097 },
                { name: 'Уральск', lat: 51.2333, lon: 51.3667 },
                { name: 'Костанай', lat: 53.2000, lon: 63.6333 },
                { name: 'Петропавловск', lat: 54.8833, lon: 69.1500 },
                { name: 'Актау', lat: 43.6500, lon: 51.1500 },
                { name: 'Туркестан', lat: 43.3000, lon: 68.2403 },
                { name: 'Кокшетау', lat: 53.2833, lon: 69.3833 },
                { name: 'Талдыкорган', lat: 45.0167, lon: 78.3667 },
                { name: 'Жезказган', lat: 47.7778, lon: 67.7111 },
                { name: 'Конаев', lat: 43.8761, lon: 77.0683 }
            ];

            let html = '';

            // Fetch concurrently for speed
            const fetchPromises = targetCities.map(async (c) => {
                try {
                    const data = await window.getWeatherData(c.lat, c.lon);
                    if (data && data.current) {
                        return { city: c, data: data.current };
                    }
                } catch(e) {
                    console.error("Failed to load city", c.name, e);
                }
                return null;
            });

            const results = await Promise.all(fetchPromises);

            for (const res of results) {
                if (!res) continue;
                
                const temp = Math.round(res.data.temperature_2m);
                const code = res.data.weather_code;
                const info = window.getWeatherInfo ? window.getWeatherInfo(code) : { icon: 'cloud', desc: 'unknown' };
                
                let comment = "Погода стабильная.";
                if (temp < 0) comment = "Достаточно холодно, одевайтесь теплее.";
                if (temp > 25) comment = "В городе жарко, пейте больше воды.";
                if (info.desc.includes('rain')) comment = "Ожидаются осадки, возьмите зонт.";
                if (info.desc.includes('snow')) comment = "Идет снег, возможна гололедица.";

                html += `
                <div class="ai-city-card">
                    <div class="ai-city-icon">
                        <i data-lucide="${info.icon}"></i>
                    </div>
                    <div class="ai-city-info">
                        <div class="ai-city-header">
                            <h4>${res.city.name}</h4>
                            <span class="ai-city-temp">${temp > 0 ? '+'+temp : temp}°C</span>
                        </div>
                        <p>${comment}</p>
                    </div>
                </div>`;
            }

            if (html === '') {
                html = '<p>Не удалось загрузить данные городов. Проверьте интернет.</p>';
            }

            citiesList.innerHTML = html;
            if(window.lucide) lucide.createIcons();
            citiesLoaded = true;
        });
    }
});
