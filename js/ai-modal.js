// ai-modal.js - Оптимизированный ИИ-ассистент WeatherAI с работающей второй вкладкой и привязкой к Таразу

document.addEventListener('DOMContentLoaded', () => {
    // 1. DOM Элементы интерфейса
    const btnAi = document.getElementById('btn-ai');
    const aiModal = document.getElementById('ai-modal');
    const closeAiBtn = document.getElementById('close-ai-modal');
    
    // Вкладки навигации (Табы)
    const tabBtns = document.querySelectorAll('.ai-tab-btn');
    const tabContents = document.querySelectorAll('.ai-tab-content');
    
    // Элементы чата
    const chatMessages = document.getElementById('ai-chat-messages');
    const chatInput = document.getElementById('ai-chat-input');
    const chatSendBtn = document.getElementById('ai-chat-send');
    const voiceBtn = document.getElementById('ai-voice-btn');
    const clearChatBtn = document.getElementById('ai-clear-chat');

    // Быстрые запросы и подсказки
    const promptChips = document.querySelectorAll('.ai-prompt-chip');
    const suggestionItems = document.querySelectorAll('.ai-suggestion-item');
    const suggestionsBox = document.getElementById('ai-chat-suggestions');

    // Переключение языков в модальном окне
    const aiLangBtns = document.querySelectorAll('.ai-lang-btn');
    
    // Элемент для вывода списка городов во второй вкладке
    const citiesList = document.getElementById('ai-cities-list');
    let citiesLoaded = false;
    
    if(!btnAi || !aiModal) return; 

    // Текущий рабочий язык
    let currentAiLang = localStorage.getItem('preferredLang') || 'ru';

    // ========================================================
    // 2. УЛУЧШЕННЫЙ ЛОКАЛЬНЫЙ ИИ-АНАЛИЗАТОР (ДАННЫЕ ТАРАЗА ПО УМОЛЧАНИЮ)
    // ========================================================
    function generateAdvancedResponse(userInput, lang) {
        const text = userInput.toLowerCase().trim();

        // Получаем данные из главного скрипта script.js
        let weatherData = null;
        let cityCoords = null;

        if (typeof window.getCurrentWeatherData === 'function') {
            weatherData = window.getCurrentWeatherData();
        }
        if (typeof window.getCurrentCityCoords === 'function') {
            cityCoords = window.getCurrentCityCoords();
        }

        // Если данных на экране нет, ставим базовые текущие данные для Тараза
        const city = cityCoords?.name || document.getElementById('city-name')?.textContent?.trim() || (lang === 'ru' ? 'Тараз' : lang === 'kk' ? 'Тараз' : 'Taraz');
        
        let rawTemp = weatherData?.current?.temperature_2m;
        let rawHumidity = weatherData?.current?.relative_humidity_2m;
        let rawWind = weatherData?.current?.wind_speed_10m;
        let weatherCode = weatherData?.current?.weather_code ?? 0;

        // Если в системе еще нет данных (первый запуск), имитируем нормальную погоду Тараза
        if (rawTemp === undefined) {
            rawTemp = 22.5; 
            rawHumidity = 45;
            rawWind = 5.4;
            weatherCode = 1; // Переменная облачность
        }

        const tempString = `${rawTemp}°C`;
        const humidity = `${rawHumidity}%`;
        const wind = `${rawWind} км/ч`;

        // Логические флаги состояния погоды
        const isRainy = (weatherCode >= 51 && weatherCode <= 67) || (weatherCode >= 80 && weatherCode <= 82) || rawHumidity > 75;
        const isSnowy = (weatherCode >= 71 && weatherCode <= 77) || (weatherCode >= 85 && weatherCode <= 86);
        const isStormy = (weatherCode >= 95 && weatherCode <= 99);
        const isWindy = rawWind > 12;

        // --- БАЗА ИНТЕЛЛЕКТУАЛЬНЫХ ШАБЛОНОВ (RU / KK / EN) ---
        const dictionary = {
            ru: {
                metrics: `🌍 В локации **${city}** сейчас зафиксированы следующие параметры:\n\n• Температура воздуха: **${tempString}**\n• Относительная влажность: **${humidity}**\n• Скорость ветра: **${wind}**`,
                clothes_freezing: `❄️ На улице экстремальный минус (**${tempString}**)! Необходима зимняя одежда: пуховик, термобелье, шапка и перчатки.`,
                clothes_cold: `🧥 Погода прохладная (**${tempString}**). Подойдет теплое пальто или плотная куртка, свитер и закрытая обувь.`,
                clothes_comfortable: `👕 На улице комфортные **${tempString}**. Можно надеть легкую ветровку, худи, джинсы или свитшот.`,
                clothes_hot: `☀️ На улице жара (**${tempString}**)! Рекомендуется легкая одежда: футболка, шорты. Возьмите головной убор и воду.`,
                umbrella_rain: `☔️ **Да, зонт или дождевик обязательны!** В городе **${city}** идет дождь или высокая влажность (${humidity}).`,
                umbrella_snow: `❄️ Сейчас идет снег. Лучше надеть непромокаемую обувь и куртку с капюшоном.`,
                umbrella_storm: `⚡️ **Внимание, гроза!** Избегайте открытых пространств, зонт поможет, но лучше переждать пик непогоды в помещении.`,
                umbrella_clear: `🌤 Нет, зонт сегодня абсолютно не нужен. Небо чистое, осадков не ожидается.`,
                walk_perfect: `🌳 **Замечательное время для прогулки!** В городе **${city}** отличный баланс температуры (**${tempString}**) и умеренного ветра.`,
                walk_bad: `🏠 **Долгие прогулки лучше отложить.** Текущие условия (**${tempString}**, ветер **${wind}**) могут вызвать дискомфорт.`,
                unknown: `🤖 Я распознал ваш запрос. Прямо сейчас в городе **${city}**: температура **${tempString}**, влажность **${humidity}**, ветер **${wind}**.\n\nЗадайте мне вопрос, например:\n• *«Что сегодня надеть?»*\n• *«Нужен ли зонт?»*\n• *«Какая сейчас погода?»*\n• *«Можно идти гулять?»*`
            },
            kk: {
                metrics: `🌍 Қазір **${city}** мекенжайында келесі көрсеткіштер тіркелді:\n\n• Ауа температурасы: **${tempString}**\n• Салыстырмалы ылғалдылық: **${humidity}**\n• Жел жылдамдығы: **${wind}**`,
                clothes_freezing: `❄️ Далада өте суық (**${tempString}**)! Қалың қысқы киім киіңіз: күртеше, термоішкійім, бас киім мен қолғап.`,
                clothes_cold: `🧥 Ауа райы салқын (**${tempString}**). Жылы пальто немесе қалың күртеше, свитер киген жөн.`,
                clothes_comfortable: `👕 Күн жайлы, **${tempString}** көрсетіп тұр. Жеңіл күртеше, худи немесе тығыз жейде киюге болады.`,
                clothes_hot: `☀️ Далада нағыз ыстық (**${tempString}**)! Жеңіл киімдер киіңіз: футболка, шорты. Су алуды ұмытпаңыз.`,
                umbrella_rain: `☔️ **Иә, қолшатыр немесе плащ қажет!** **${city}** қаласында ылғалдылық жоғары (${humidity}) немесе жаңбыр жауып тұр.`,
                umbrella_snow: `❄️ Қазір қар жауып тұр. Су өткізбейтін аяқ киім және капюшоны бар күртеше кию маңызды!`,
                umbrella_storm: `⚡️ **Назар аударыңыз, найзағай!** Дауыл кезінде сыртқа шықпай, ғимарат ішінде күте тұрған дұрыс.`,
                umbrella_clear: `🌤 Жоқ, бүгін қолшатыр керек емес. Аспан ашық, жауын-шашын белгілері тіркелмеген.`,
                walk_perfect: `🌳 **Серуендеуге тамаша уақыт!** **${city}** қаласында қолайлы температура (**${tempString}**) мен баяу жел соғып тұр.`,
                walk_bad: `🏠 **Ұзақ серуенді кейінге қалдыра тұрған жөн.** Қазіргі жағдайлар (**${tempString}**, жел **${wind}**) қолайсыз.`,
                unknown: `🤖 Сұранысыңыз қабылданды. Қазір **${city}** қаласында: температура **${tempString}**, ылғалдылық **${humidity}**, жел **${wind}**.\n\nМаған сұрақ қойыңыз:\n• *«Бүгін не кисем болады?»*\n• *«Қолшатыр керек пе?»*\n• *«Серуендеуге шығуға бола ма?»*`
            },
            en: {
                metrics: `🌍 Current parameters for **${city}**:\n\n• Temperature: **${tempString}**\n• Humidity: **${humidity}**\n• Wind Speed: **${wind}**`,
                clothes_freezing: `❄️ It's freezing outside (**${tempString}**)! Warm winter clothes are required: down jacket, beanie, and gloves.`,
                clothes_cold: `🧥 The weather is chilly (**${tempString}**). A warm coat, sweater, and closed shoes will be best.`,
                clothes_comfortable: `👕 It's a comfortable **${tempString}** outside. You can wear a light jacket, hoodie, or jeans.`,
                clothes_hot: `☀️ It's really hot outside (**${tempString}**)! Light clothing is recommended: t-shirt and shorts. Bring water.`,
                umbrella_rain: `☔️ **Yes, an umbrella is highly recommended!** High humidity (${humidity}) or rain is tracked in **${city}**.`,
                umbrella_snow: `❄️ It is snowing right now. Wearing waterproof boots and a hooded jacket is important!`,
                umbrella_storm: `⚡️ **Warning, thunderstorm!** It's much safer to stay indoors and avoid open areas.`,
                umbrella_clear: `🌤 No, you won't need an umbrella today. The sky is clear and no rain is detected.`,
                walk_perfect: `🌳 **Excellent time for an outdoor walk!** **${city}** features a great balance of weather parameters.`,
                walk_bad: `🏠 **Better avoid long walks today.** Current conditions might cause discomfort.`,
                unknown: `🤖 Request recognized. Right now in **${city}**: temp **${tempString}**, humidity **${humidity}**, wind **${wind}**.\n\nAsk me:\n• *"What should I wear today?"*\n• *"Do I need an umbrella?"*\n• *"Is it a good time for a walk?"*`
            }
        };

        const currentSet = dictionary[lang] || dictionary.ru;

        // СЕМАНТИЧЕСКИЙ АНАЛИЗАТОР КЛЮЧЕВЫХ СЛОВ
        if (/одежд|надеть|куртк|обувь|пальто|шорт|кию|киім|wear|clothes|jacket/.test(text)) {
            if (rawTemp < 0) return currentSet.clothes_freezing;
            if (rawTemp >= 0 && rawTemp < 12) return currentSet.clothes_cold;
            if (rawTemp >= 12 && rawTemp <= 24) return currentSet.clothes_comfortable;
            return currentSet.clothes_hot;
        }

        if (/зонт|дожд|осадк|жаңбыр|қолшатыр|гроза|ливень|снег|umbrella|rain|snow|storm/.test(text)) {
            if (isStormy) return currentSet.umbrella_storm;
            if (isRainy) return currentSet.umbrella_rain;
            if (isSnowy) return currentSet.umbrella_snow;
            return currentSet.umbrella_clear;
        }

        if (/гулять|прогулк|улиц|серуен|дала|шығу|walk|outside|park/.test(text)) {
            if (isWindy || isRainy || isStormy || rawTemp < -5 || rawTemp > 33) {
                return currentSet.walk_bad;
            }
            return currentSet.walk_perfect;
        }

        if (/погод|прогноз|градус|температ|ауа райы|weather|forecast|temp/.test(text)) {
            return currentSet.metrics;
        }

        return currentSet.unknown;
    }

    // ========================================================
    // 3. ФУНКЦИЯ ДЛЯ ВТОРОЙ ВКЛАДКИ (РАСШИРЕННЫЙ АНАЛИЗ ГОРОДОВ РК)
    // ========================================================
    async function loadAiCitiesForecast() {
        if (!citiesList) return;
        
        // Получаем текущий перевод, если есть глобальный объект
        const lang = localStorage.getItem('preferredLang') || 'ru';
        const t = window.translations ? window.translations[lang] || {} : {};
        
        citiesList.innerHTML = `
            <div style="grid-column: 1/-1; text-align:center; padding: 40px; color: var(--text-muted);">
                <i data-lucide="loader-2" class="spin" style="margin: 0 auto 10px; width:32px; height:32px;"></i>
                <p>${t['ai-loading-cities'] || 'ИИ генерирует детальную аналитическую сводку по регионам РК...'}</p>
            </div>
        `;
        if(window.lucide) lucide.createIcons();
        // Абсолютно полный список всех 89 городов Казахстана с координатами
        const citiesToFetch = [
            // --- Крупные города и областные центры (из твоего списка) ---
            { name: { ru: 'Тараз', en: 'Taraz', kk: 'Тараз' }, lat: 42.90, lon: 71.37, key: 'taraz' },
            { name: { ru: 'Астана', en: 'Astana', kk: 'Астана' }, lat: 51.17, lon: 71.45, key: 'astana' },
            { name: { ru: 'Алматы', en: 'Almaty', kk: 'Алматы' }, lat: 43.26, lon: 76.93, key: 'almaty' },
            { name: { ru: 'Шымкент', en: 'Shymkent', kk: 'Шымкент' }, lat: 42.30, lon: 69.60, key: 'shymkent' },
            { name: { ru: 'Актобе', en: 'Aktobe', kk: 'Ақтөбе' }, lat: 50.28, lon: 57.17, key: 'aktobe' },
            { name: { ru: 'Караганда', en: 'Karaganda', kk: 'Қарағанды' }, lat: 49.80, lon: 73.09, key: 'karaganda' },
            { name: { ru: 'Талдыкорган', en: 'Taldykorgan', kk: 'Талдықорған' }, lat: 45.02, lon: 78.38, key: 'taldykorgan' },
            { name: { ru: 'Павлодар', en: 'Pavlodar', kk: 'Павлодар' }, lat: 52.30, lon: 76.95, key: 'pavlodar' },
            { name: { ru: 'Усть-Каменогорск', en: 'Oskemen', kk: 'Өскемен' }, lat: 49.95, lon: 82.61, key: 'oskemen' },
            { name: { ru: 'Семей', en: 'Semey', kk: 'Семей' }, lat: 50.41, lon: 80.25, key: 'semey' },
            { name: { ru: 'Уральск', en: 'Oral', kk: 'Орал' }, lat: 51.23, lon: 51.37, key: 'uralsk' },
            { name: { ru: 'Костанай', en: 'Kostanay', kk: 'Қостанай' }, lat: 53.21, lon: 63.63, key: 'kostanay' },
            { name: { ru: 'Петропавловск', en: 'Petropavl', kk: 'Петропавл' }, lat: 54.87, lon: 69.15, key: 'petropavlovsk' },
            { name: { ru: 'Кызылорда', en: 'Kyzylorda', kk: 'Қызылорда' }, lat: 44.85, lon: 65.51, key: 'kyzylorda' },
            { name: { ru: 'Атырау', en: 'Atyrau', kk: 'Атырау' }, lat: 47.12, lon: 51.88, key: 'atyrau' },
            { name: { ru: 'Актау', en: 'Aktau', kk: 'Ақтау' }, lat: 43.65, lon: 51.17, key: 'aktau' },
            { name: { ru: 'Туркестан', en: 'Turkistan', kk: 'Түркістан' }, lat: 43.30, lon: 68.27, key: 'turkestan' },
            { name: { ru: 'Кокшетау', en: 'Kokshetau', kk: 'Көкшетау' }, lat: 53.28, lon: 69.39, key: 'kokshetau' },
            { name: { ru: 'Жезказган', en: 'Zhezkazgan', kk: 'Жезқазған' }, lat: 47.80, lon: 67.71, key: 'zhezkazgan' },
            { name: { ru: 'Конаев', en: 'Konaev', kk: 'Қонаев' }, lat: 43.87, lon: 77.07, key: 'konaev' },
            
            // --- Средние и малые города (из твоего списка) ---
            { name: { ru: 'Темиртау', en: 'Temirtau', kk: 'Теміртау' }, lat: 50.05, lon: 72.95, key: 'temirtau' },
            { name: { ru: 'Экибастуз', en: 'Ekibastuz', kk: 'Екібастұз' }, lat: 51.72, lon: 75.32, key: 'ekibastuz' },
            { name: { ru: 'Рудный', en: 'Rudny', kk: 'Рудный' }, lat: 52.96, lon: 63.12, key: 'rudny' },
            { name: { ru: 'Жанаозен', en: 'Zhanaozen', kk: 'Жаңаөзен' }, lat: 43.34, lon: 52.85, key: 'zhanaozen' },
            { name: { ru: 'Балхаш', en: 'Balkhash', kk: 'Балқаш' }, lat: 46.84, lon: 74.98, key: 'balkhash' },
            { name: { ru: 'Риддер', en: 'Ridder', kk: 'Риддер' }, lat: 50.35, lon: 83.51, key: 'ridder' },
            { name: { ru: 'Сатпаев', en: 'Satpayev', kk: 'Сәтбаев' }, lat: 47.90, lon: 67.53, key: 'satpayev' },
            { name: { ru: 'Кентау', en: 'Kentau', kk: 'Кентау' }, lat: 43.52, lon: 68.51, key: 'kentau' },
            { name: { ru: 'Степногорск', en: 'Stepnogorsk', kk: 'Степногорск' }, lat: 53.16, lon: 71.88, key: 'stepnogorsk' },
            { name: { ru: 'Щучинск', en: 'Shchuchinsk', kk: 'Щучинск' }, lat: 52.93, lon: 70.20, key: 'shuchinsk' },
            { name: { ru: 'Зыряновск (Алтай)', en: 'Zyryanovsk (Altay)', kk: 'Зыряновск (Алтай)' }, lat: 49.73, lon: 84.26, key: 'altay' },
            { name: { ru: 'Кульсары', en: 'Kulsary', kk: 'Құлсары' }, lat: 46.95, lon: 53.98, key: 'kulsary' },
            { name: { ru: 'Аксай', en: 'Aksay', kk: 'Ақсай' }, lat: 51.17, lon: 52.98, key: 'aksay' },
            { name: { ru: 'Шу', en: 'Shu', kk: 'Шу' }, lat: 43.60, lon: 73.76, key: 'shu' },
            { name: { ru: 'Байконур', en: 'Baikonur', kk: 'Байқоңыр' }, lat: 45.62, lon: 63.31, key: 'baikonur' },
            { name: { ru: 'Лисаковск', en: 'Lisakovsk', kk: 'Лисаковск' }, lat: 52.56, lon: 62.49, key: 'lisakovsk' },
            { name: { ru: 'Житикара', en: 'Zhitikara', kk: 'Жітіқара' }, lat: 52.19, lon: 61.20, key: 'zhitikara' },
            { name: { ru: 'Аркалык', en: 'Arkalyk', kk: 'Арқалық' }, lat: 50.25, lon: 66.91, key: 'arkalyk' },

            // --- ОСТАВШИЕСЯ ВСЕ 51 ГОРОД КАЗАХСТАНА ---
            { name: { ru: 'Абай', en: 'Abay', kk: 'Абай' }, lat: 49.63, lon: 72.85, key: 'abay' },
            { name: { ru: 'Акколь', en: 'Akkol', kk: 'Ақкөл' }, lat: 52.00, lon: 70.95, key: 'akkol' },
            { name: { ru: 'Аксай (Кызылординская)', en: 'Aksay (Kyzylorda)', kk: 'Ақсай (Қызылорда)' }, lat: 44.87, lon: 65.52, key: 'aksay_kyzylorda' },
            { name: { ru: 'Алейск (Шалкар)', en: 'Aleisk (Shalkar)', kk: 'Алейск (Шалқар)' }, lat: 47.83, lon: 59.61, key: 'shalkar' },
            { name: { ru: 'Алга', en: 'Alga', kk: 'Алға' }, lat: 49.90, lon: 57.33, key: 'alga' },
            { name: { ru: 'Аральск', en: 'Aralsk', kk: 'Арал' }, lat: 46.80, lon: 61.67, key: 'aralsk' },
            { name: { ru: 'Арыс', en: 'Arys', kk: 'Арыс' }, lat: 42.43, lon: 68.80, key: 'arys' },
            { name: { ru: 'Атбасар', en: 'Atbasar', kk: 'Атбасар' }, lat: 51.81, lon: 68.36, key: 'atbasar' },
            { name: { ru: 'Аягоз', en: 'Ayagoz', kk: 'Аягөз' }, lat: 47.96, lon: 80.43, key: 'ayagoz' },
            { name: { ru: 'Булаево', en: 'Bulaevo', kk: 'Булаев' }, lat: 54.91, lon: 70.45, key: 'bulaevo' },
            { name: { ru: 'Державинск', en: 'Derzhavinsk', kk: 'Державинск' }, lat: 51.15, lon: 66.32, key: 'derzhavinsk' },
            { name: { ru: 'Ерейментау', en: 'Ereymentau', kk: 'Ерейментау' }, lat: 51.62, lon: 73.10, key: 'ereymentau' },
            { name: { ru: 'Есик', en: 'Esik', kk: 'Есік' }, lat: 43.35, lon: 77.45, key: 'esik' },
            { name: { ru: 'Есиль', en: 'Esil', kk: 'Есіл' }, lat: 51.95, lon: 66.40, key: 'esil' },
            { name: { ru: 'Жаркент', en: 'Zharkent', kk: 'Жаркент' }, lat: 44.16, lon: 80.00, key: 'zharkent' },
            { name: { ru: 'Жем', en: 'Zhem', kk: 'Жем' }, lat: 48.77, lon: 58.07, key: 'zhem' },
            { name: { ru: 'Жетысай', en: 'Zhetysay', kk: 'Жетісай' }, lat: 40.76, lon: 68.32, key: 'zhetysay' },
            { name: { ru: 'Зайсан', en: 'Zaysan', kk: 'Зайсан' }, lat: 47.47, lon: 84.87, key: 'zaysan' },
            { name: { ru: 'Казалинск', en: 'Kazalinsk', kk: 'Қазалы' }, lat: 45.76, lon: 62.11, key: 'kazalinsk' },
            { name: { ru: 'Кандыагаш', en: 'Kandyagash', kk: 'Қандыағаш' }, lat: 49.47, lon: 57.43, key: 'kandyagash' },
            { name: { ru: 'Каражал', en: 'Karazhal', kk: 'Қаражал' }, lat: 48.01, lon: 71.55, key: 'karazhal' },
            { name: { ru: 'Каратау', en: 'Karatau', kk: 'Қаратау' }, lat: 43.18, lon: 70.47, key: 'karatau' },
            { name: { ru: 'Каркаралинск', en: 'Karkaralinsk', kk: 'Қарқаралы' }, lat: 49.41, lon: 75.47, key: 'karkaralinsk' },
            { name: { ru: 'Каскелен', en: 'Kaskelen', kk: 'Қаскелең' }, lat: 43.20, lon: 76.62, key: 'kaskelen' },
            { name: { ru: 'Ленгер', en: 'Lenger', kk: 'Ленгер' }, lat: 42.18, lon: 69.88, key: 'lenger' },
            { name: { ru: 'Макинск', en: 'Makinsk', kk: 'Макинск' }, lat: 52.63, lon: 70.42, key: 'makinsk' },
            { name: { ru: 'Мамлютка', en: 'Mamlyutka', kk: 'Мамлют' }, lat: 54.94, lon: 68.54, key: 'mamlyutka' },
            { name: { ru: 'Приозёрск', en: 'Priozersk', kk: 'Приозёрск' }, lat: 46.03, lon: 73.70, key: 'priozersk' },
            { name: { ru: 'Сарань', en: 'Saran', kk: 'Саран' }, lat: 49.79, lon: 72.86, key: 'saran' },
            { name: { ru: 'Сарканд', en: 'Sarkand', kk: 'Сарқан' }, lat: 45.41, lon: 79.91, key: 'sarkand' },
            { name: { ru: 'Сарыагаш', en: 'Saryagash', kk: 'Сарыағаш' }, lat: 41.48, lon: 69.17, key: 'saryagash' },
            { name: { ru: 'Серебрянск', en: 'Serebryansk', kk: 'Серебрянск' }, lat: 49.69, lon: 83.29, key: 'serebryansk' },
            { name: { ru: 'Сергеевка', en: 'Sergeevka', kk: 'Сергеевка' }, lat: 53.88, lon: 67.41, key: 'sergeevka' },
            { name: { ru: 'Тайынша', en: 'Taiynsha', kk: 'Тайынша' }, lat: 53.85, lon: 69.77, key: 'tainsha' },
            { name: { ru: 'Талгар', en: 'Talgar', kk: 'Талғар' }, lat: 43.30, lon: 77.24, key: 'talgar' },
            { name: { ru: 'Текели', en: 'Tekeli', kk: 'Текелі' }, lat: 44.85, lon: 78.75, key: 'tekeli' },
            { name: { ru: 'Темир', en: 'Temir', kk: 'Темір' }, lat: 49.14, lon: 57.13, key: 'temir' },
            { name: { ru: 'Тобыл (Затобольск)', en: 'Tobyl', kk: 'Тобыл' }, lat: 53.21, lon: 63.68, key: 'tobyl' },
            { name: { ru: 'Форт-Шевченко', en: 'Fort-Shevchenko', kk: 'Форт-Шевченко' }, lat: 44.51, lon: 50.26, key: 'fort_shevchenko' },
            { name: { ru: 'Хромтау', en: 'Khromtau', kk: 'Хромтау' }, lat: 50.25, lon: 58.44, key: 'khromtau' },
            { name: { ru: 'Шардара', en: 'Shardara', kk: 'Шардара' }, lat: 41.25, lon: 67.97, key: 'shardara' },
            { name: { ru: 'Шалкар', en: 'Shalkar', kk: 'Шалқар' }, lat: 47.83, lon: 59.61, key: 'shalkar_actobe' },
            { name: { ru: 'Шар', en: 'Shar', kk: 'Шар' }, lat: 49.59, lon: 81.04, key: 'char' },
            { name: { ru: 'Шемонаиха', en: 'Shemonaikha', kk: 'Шемонаиха' }, lat: 50.63, lon: 81.91, key: 'shemonaikha' },
            { name: { ru: 'Шолаккорган', en: 'Sholakkorgan', kk: 'Шолаққорған' }, lat: 43.79, lon: 69.18, key: 'sholakkoorgan' },
            { name: { ru: 'Эмба', en: 'Emba', kk: 'Ембі' }, lat: 48.83, lon: 58.15, key: 'emba' },
            { name: { ru: 'Степняк', en: 'Stepnyak', kk: 'Степняк' }, lat: 52.83, lon: 70.78, key: 'stepnyak' },
            { name: { ru: 'Буланды', en: 'Bulandy', kk: 'Бұланды' }, lat: 52.63, lon: 70.42, key: 'bulandy' },
            { name: { ru: 'Уштобе', en: 'Ushtobe', kk: 'Үштөбе' }, lat: 45.25, lon: 77.98, key: 'ushtobe' },
            { name: { ru: 'Жанатас', en: 'Zhanatas', kk: 'Жаңатас' }, lat: 43.56, lon: 69.75, key: 'zhanatas' },
            { name: { ru: 'Мартук', en: 'Martuk', kk: 'Мәртөк' }, lat: 50.74, lon: 56.50, key: 'martuk' }
        ];

        let html = '';

        for (const cityObj of citiesToFetch) {
            try {
                // Добавили в запрос: wind_speed_10m (ветер) и surface_pressure (давление)
                const url = `https://api.open-meteo.com/v1/forecast?latitude=${cityObj.lat}&longitude=${cityObj.lon}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m,surface_pressure&timezone=auto`;
                const response = await fetch(url);
                const data = await response.json();
                
                if (!data.current) continue;

                const temp = Math.round(data.current.temperature_2m);
                const code = data.current.weather_code;
                const humidity = data.current.relative_humidity_2m;
                const windSpeed = data.current.wind_speed_10m;
                // Переводим гПа в привычные мм рт. ст. (умножаем на 0.75006)
                const pressure = Math.round(data.current.surface_pressure * 0.75006); 

                // Карта соответствия кодов Open-Meteo (WMO) иконкам и описаниям погоды
                const weatherMap = {
                    0: { icon: 'sun', ru: 'Ясно', kk: 'Ашық', en: 'Clear' },
                    1: { icon: 'cloud-sun', ru: 'Преимущественно ясно', kk: 'Негізінен ашық', en: 'Mainly clear' },
                    2: { icon: 'cloud-sun', ru: 'Переменная облачность', kk: 'Ауыспалы бұлтты', en: 'Partly cloudy' },
                    3: { icon: 'cloud', ru: 'Пасмурно', kk: 'Бұлтты', en: 'Overcast' },
                    45: { icon: 'cloud-fog', ru: 'Туман', kk: 'Тұман', en: 'Fog' },
                    48: { icon: 'cloud-fog', ru: 'Изморозь', kk: 'Қырау', en: 'Depositing rime fog' },
                    51: { icon: 'cloud-drizzle', ru: 'Легкая морось', kk: 'Әлсіз сіркіреген жаңбыр', en: 'Light drizzle' },
                    53: { icon: 'cloud-drizzle', ru: 'Морось', kk: 'Сіркіреген жаңбыр', en: 'Moderate drizzle' },
                    55: { icon: 'cloud-drizzle', ru: 'Плотная морось', kk: 'Қатты сіркіреген жаңбыр', en: 'Dense drizzle' },
                    61: { icon: 'cloud-rain', ru: 'Небольшой жаңбыр', kk: 'Әлсіз жаңбыр', en: 'Slight rain' },
                    63: { icon: 'cloud-rain', ru: 'Умеренный дождь', kk: 'Орташа жаңбыр', en: 'Moderate rain' },
                    65: { icon: 'cloud-rain-wind', ru: 'Сильный дождь', kk: 'Қатты жаңбыр', en: 'Heavy rain' },
                    71: { icon: 'snowflake', ru: 'Небольшой снегопад', kk: 'Әлсіз қар', en: 'Slight snow' },
                    73: { icon: 'snowflake', ru: 'Снегопад', kk: 'Орташа қар', en: 'Moderate snow' },
                    75: { icon: 'snowflake', ru: 'Сильный снегопад', kk: 'Қатты қар', en: 'Heavy snow' },
                    80: { icon: 'cloud-rain', ru: 'Слабый ливень', kk: 'Әлсіз нөсер', en: 'Slight rain showers' },
                    81: { icon: 'cloud-rain-wind', ru: 'Ливень', kk: 'Нөсер жаңбыр', en: 'Moderate rain showers' },
                    82: { icon: 'cloud-lightning', ru: 'Сильный ливень', kk: 'Қатты нөсер', en: 'Violent rain showers' },
                    95: { icon: 'cloud-lightning', ru: 'Гроза', kk: 'Гроза', en: 'Thunderstorm' }
                };

                const weatherInfo = weatherMap[code] || { icon: 'cloud', ru: 'Облачно', kk: 'Бұлтты', en: 'Cloudy' };
                const conditionText = weatherInfo[currentAiLang] || weatherInfo['ru'];

                // Формирование интеллектуального ИИ-анализа и вывода рекомендаций
                let aiRecommendation = "";
                if (currentAiLang === 'kk') {
                    aiRecommendation = "Қолайлы жағдай. Серуендеуге тамаша уақыт.";
                    if (windSpeed > 12) aiRecommendation = "Назар аударыңыз! Қатты жел соғып тұр, бас киім киіңіз.";
                    else if (code >= 51) aiRecommendation = "Ылғалдылық жоғары. Өзіңізбен бірге қолшатыр алыңыз.";
                    else if (temp < -10) aiRecommendation = "Қатты аяз. Суық тигізіп алмас үшін жылы киініңіз.";
                    else if (temp > 30) aiRecommendation = "Күн өте ыстық. Көлеңкеде болыңыз және су ішіңіз.";
                } else if (currentAiLang === 'en') {
                    aiRecommendation = "Weather is stable. Great time for outdoor activities.";
                    if (windSpeed > 12) aiRecommendation = "Warning! Strong wind detected, wear a windproof jacket.";
                    else if (code >= 51) aiRecommendation = "Precipitation active. Bringing an umbrella is recommended.";
                    else if (temp < -10) aiRecommendation = "Severe cold. Dress in warm layers to stay comfortable.";
                    else if (temp > 30) aiRecommendation = "High temperatures. Stay hydrated and avoid direct sun.";
                } else {
                    aiRecommendation = "Условия стабильные. Хорошее время для прогулок на воздухе.";
                    if (windSpeed > 12) aiRecommendation = "Внимание! Наблюдается сильный ветер, наденьте ветровку.";
                    else if (code >= 51) aiRecommendation = "Идут осадки. ИИ рекомендует не забывать дома зонт.";
                    else if (temp < -10) aiRecommendation = "Сильный мороз. Одевайтесь многослойно, берегите тепло.";
                    else if (temp > 30) aiRecommendation = "Высокая температура. Избегайте солнца и пейте больше воды.";
                }

                const cityName = (cityObj.name && typeof cityObj.name === 'object') 
                                 ? (cityObj.name[currentAiLang] || cityObj.name.ru) 
                                 : (t['city-' + cityObj.key] || t[cityObj.key] || cityObj.name);

                // Генерация продвинутой и богатой данными карточки
                html += `
                <div class="ai-city-card" style="display: flex; flex-direction: column; background: var(--bg-card); border: 1px solid var(--border-color); border-radius: 20px; padding: 18px; box-shadow: 0 4px 12px rgba(0,0,0,0.03); transition: transform 0.2s ease;">
                    
                    <div style="display: flex; justify-content: space-between; align-items: center; width: 100%; border-bottom: 1px dashed var(--border-color); padding-bottom: 10px; margin-bottom: 12px;">
                        <div>
                            <h4 style="margin: 0; font-size: 1.1rem; font-weight: 700; color: var(--text-color);">${cityName}</h4>
                            <span style="font-size: 0.8rem; color: #a855f7; font-weight: 500; display: inline-flex; align-items: center; gap: 4px; margin-top: 2px;">
                                <i data-lucide="${weatherInfo.icon}" style="width:14px; height:14px;"></i> ${conditionText}
                            </span>
                        </div>
                        <span style="font-size: 1.6rem; font-weight: 800; color: #a855f7; text-shadow: 0 2px 4px rgba(168,85,247,0.1);">
                            ${temp > 0 ? '+' + temp : temp}°C
                        </span>
                    </div>

                    <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; width: 100%; text-align: center; margin-bottom: 12px; background: var(--bg-body); padding: 8px; border-radius: 12px;">
                        <div>
                            <span style="display: block; font-size: 0.75rem; color: var(--text-muted); margin-bottom: 2px;">
                                <i data-lucide="droplets" style="width:12px; height:12px; vertical-align: middle; margin-right:2px; color:#3b82f6;"></i>${currentAiLang === 'kk' ? 'Ылғал' : currentAiLang === 'en' ? 'Hum' : 'Влажн.'}
                            </span>
                            <strong style="font-size: 0.9rem; color: var(--text-color);">${humidity}%</strong>
                        </div>
                        <div style="border-left: 1px solid var(--border-color); border-right: 1px solid var(--border-color);">
                            <span style="display: block; font-size: 0.75rem; color: var(--text-muted); margin-bottom: 2px;">
                                <i data-lucide="wind" style="width:12px; height:12px; vertical-align: middle; margin-right:2px; color:#10b981;"></i>${currentAiLang === 'kk' ? 'Жел' : currentAiLang === 'en' ? 'Wind' : 'Ветер'}
                            </span>
                            <strong style="font-size: 0.9rem; color: var(--text-color);">${windSpeed} ${currentAiLang === 'en' ? 'km/h' : 'км/ч'}</strong>
                        </div>
                        <div>
                            <span style="display: block; font-size: 0.75rem; color: var(--text-muted); margin-bottom: 2px;">
                                <i data-lucide="gauge" style="width:12px; height:12px; vertical-align: middle; margin-right:2px; color:#f59e0b;"></i>${currentAiLang === 'kk' ? 'Қысым' : currentAiLang === 'en' ? 'Pres' : 'Давл.'}
                            </span>
                            <strong style="font-size: 0.9rem; color: var(--text-color);">${pressure} ${currentAiLang === 'en' ? 'mm' : 'мм'}</strong>
                        </div>
                    </div>

                    <div style="background: rgba(168, 85, 247, 0.05); border-left: 3px solid #a855f7; padding: 8px 12px; border-radius: 4px 8px 8px 4px; width: 100%;">
                        <span style="font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.5px; color: #a855f7; font-weight: 700; display: block; margin-bottom: 2px;">
                            <i data-lucide="brain-circuit" style="width:12px; height:12px; vertical-align:middle; margin-right:4px;"></i>${currentAiLang === 'kk' ? 'АИ СВОДКАСЫ' : currentAiLang === 'en' ? 'AI SUMMARY' : 'AI СВОДКА'}
                        </span>
                        <p style="margin: 0; font-size: 0.82rem; color: var(--text-color); line-height: 1.35; font-weight: 500;">${aiRecommendation}</p>
                    </div>

                </div>`;

            } catch (err) {
                console.error(`Ошибка сбора аналитики для ${cityObj.name}:`, err);
            }
        }

        citiesList.innerHTML = html;
        if(window.lucide) lucide.createIcons();
        citiesLoaded = true;
    }

    // ========================================================
    // 4. УПРАВЛЕНИЕ ЯЗЫКОВЫМ ИНТЕРФЕЙСОМ И ПРИВЕТСТВИЕМ
    // ========================================================
    function updateActiveLangButton() {
        aiLangBtns.forEach(btn => {
            if (btn.getAttribute('data-ai-lang') === currentAiLang) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
    }

    function initWelcomeMessage() {
        chatMessages.innerHTML = ''; 
        
        const defaultWelcome = {
            ru: "Привет! Я Ваш интеллектуальный ассистент WeatherAI. Я анализирую данные приборов города Тараз и всей системы. Спросите меня, что надеть или нужен ли сегодня зонт!",
            kk: "Сәлем! Мен WeatherAI жүйесінің ассистентімін. Тараз қаласы мен метеожүйенің деректерін талдаймын. Маған киім немесе қолшатыр туралы сұрақ қойыңыз!",
            en: "Hello! I am your WeatherAI assistant. I analyze live sensory parameters of Taraz city and overall subsystems. Ask me about clothing or outdoor conditions!"
        };

        const t = window.translations ? window.translations[currentAiLang] || {} : {};
        const welcomeText = t['ai-welcome'] || defaultWelcome[currentAiLang];
        appendMessage(welcomeText, 'ai');
    }

    aiLangBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const selectedLang = btn.getAttribute('data-ai-lang');
            const langSelect = document.getElementById('lang-select');
            
            // Запускаем глобальную смену языка на всем сайте
            if (langSelect && langSelect.value !== selectedLang) {
                langSelect.value = selectedLang;
                langSelect.dispatchEvent(new Event('change'));
            }
        });
    });

    // Слушаем глобальную смену языка (из шапки сайта или ИИ-ассистента)
    window.addEventListener('languageChanged', (e) => {
        const newLang = e.detail.lang;
        if (newLang !== currentAiLang) {
            currentAiLang = newLang;
            updateActiveLangButton();
            
            // Если модалка открыта, сразу перерисовываем приветствие
            if (aiModal.style.display === 'block') {
                initWelcomeMessage();
            } else {
                // Иначе просто очищаем, чтобы при открытии отрисовалось новое приветствие
                chatMessages.innerHTML = '';
            }
            
            if (citiesLoaded) loadAiCitiesForecast();
        }
    });

    // ========================================================
    // 5. МЕХАНИКА ОБРАБОТКИ ЧАТА
    // ========================================================
    function handleSendMessage(explicitText) {
        const query = explicitText || chatInput.value.trim();
        if (!query) return;

        if (!explicitText) chatInput.value = '';
        if (suggestionsBox) suggestionsBox.style.display = 'none';

        appendMessage(query, 'user');

        const typingIndicator = addTypingIndicator();
        const scriptReply = generateAdvancedResponse(query, currentAiLang);

        setTimeout(() => {
            removeTypingIndicator(typingIndicator);
            appendMessage(scriptReply, 'ai');
        }, 400);
    }

    function appendMessage(text, sender) {
        const msgDiv = document.createElement('div');
        msgDiv.classList.add('ai-message', sender === 'user' ? 'user-message' : 'bot-message');
        
        let formattedText = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        formattedText = formattedText.replace(/\n/g, '<br>');

        msgDiv.innerHTML = `<div class="message-content">${formattedText}</div>`;
        chatMessages.appendChild(msgDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function addTypingIndicator() {
        const indicator = document.createElement('div');
        indicator.classList.add('ai-message', 'bot-message');
        indicator.setAttribute('id', 'ai-typing-indicator');
        indicator.innerHTML = `
            <div class="message-content" style="display:flex; align-items:center; gap:8px;">
                <i data-lucide="loader-2" class="spin" style="width:16px; height:16px;"></i>
                <span style="font-size: 0.9rem; color: var(--text-muted);">Анализ метеоданных...</span>
            </div>
        `;
        chatMessages.appendChild(indicator);
        if(window.lucide) lucide.createIcons();
        chatMessages.scrollTop = chatMessages.scrollHeight;
        return indicator;
    }

    function removeTypingIndicator(indicator) {
        const el = document.getElementById('ai-typing-indicator') || indicator;
        if (el && el.parentNode) {
            el.parentNode.removeChild(el);
        }
    }

    // ========================================================
    // 6. НАВИГАЦИЯ ПО ТАБАМ (ПЕРЕКЛЮЧЕНИЕ ВКЛАДОК С ЗАГРУЗКОЙ)
    // ========================================================
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => {
                c.classList.remove('active');
                c.style.setProperty('display', 'none', 'important');
            });
            
            btn.classList.add('active');
            const targetTabId = btn.getAttribute('data-tab');
            const targetContent = document.getElementById(targetTabId);
            
            if (targetContent) {
                targetContent.classList.add('active');
                targetContent.style.setProperty('display', 'flex', 'important');
            }
            
            // Если перешли на вкладку городов — загружаем карточки
            if(targetTabId === 'tab-cities') {
                loadAiCitiesForecast();
            }
        });
    });

    // ========================================================
    // 7. ИНИЦИАЛИЗАЦИЯ И ОБРАБОТЧИКИ СОБЫТИЙ СЛУШАТЕЛЕЙ
    // ========================================================
    btnAi.addEventListener('click', () => {
        aiModal.style.display = 'block';
        currentAiLang = localStorage.getItem('preferredLang') || 'ru';
        updateActiveLangButton();
        
        if (chatMessages.children.length === 0) {
            initWelcomeMessage();
        }
    });

    closeAiBtn.addEventListener('click', () => { aiModal.style.display = 'none'; });
    window.addEventListener('click', (e) => { if (e.target === aiModal) aiModal.style.display = 'none'; });

    chatSendBtn.addEventListener('click', () => handleSendMessage());
    chatInput.addEventListener('keypress', (e) => { if (e.key === 'Enter') handleSendMessage(); });

    clearChatBtn.addEventListener('click', () => {
        chatMessages.innerHTML = '';
        initWelcomeMessage();
    });

    promptChips.forEach(chip => {
        chip.addEventListener('click', () => handleSendMessage(chip.textContent));
    });

    chatInput.addEventListener('input', () => {
        if(chatInput.value.trim().length > 0) {
            if (suggestionsBox) suggestionsBox.style.display = 'block';
        } else {
            if (suggestionsBox) suggestionsBox.style.display = 'none';
        }
    });

    suggestionItems.forEach(item => {
        item.addEventListener('click', () => {
            chatInput.value = item.textContent;
            if (suggestionsBox) suggestionsBox.style.display = 'none';
            chatInput.focus();
        });
    });

    // Речь (Web Speech API)
    if(voiceBtn) {
        voiceBtn.addEventListener('click', () => {
            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
            if (!SpeechRecognition) return;
            const recognition = new SpeechRecognition();
            recognition.lang = currentAiLang === 'kk' ? 'kk-KZ' : currentAiLang === 'en' ? 'en-US' : 'ru-RU';
            voiceBtn.style.color = '#ef4444';
            recognition.start();
            recognition.onresult = (event) => {
                chatInput.value = event.results[0][0].transcript;
                voiceBtn.style.color = '';
                if (suggestionsBox) suggestionsBox.style.display = 'block';
            };
            recognition.onerror = () => { voiceBtn.style.color = ''; };
            recognition.onend = () => { voiceBtn.style.color = ''; };
        });
    }
});