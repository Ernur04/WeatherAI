/* ── 1. БАЗА ПОПУЛЯРНЫХ ГОРОДОВ (с координатами для API) ── */
       const CP_POPULAR = [
        // === КАЗАХСТАН (kz) ===
        { ru:'Алматы',    kk:'Алматы',    en:'Almaty',      countryRu:'Казахстан',     countryKk:'Қазақстан',  countryEn:'Kazakhstan',     region:'kz',            lat:43.25,  lon:76.95,   city:'Almaty',    flag:'🇰🇿' },
        { ru:'Астана',    kk:'Астана',    en:'Astana',      countryRu:'Казахстан',     countryKk:'Қазақстан',  countryEn:'Kazakhstan',     region:'kz',            lat:51.18,  lon:71.45,   city:'Astana',    flag:'🇰🇿' },
        { ru:'Шымкент',   kk:'Шымкент',   en:'Shymkent',    countryRu:'Казахстан',     countryKk:'Қазақстан',  countryEn:'Kazakhstan',     region:'kz',            lat:42.32,  lon:69.59,   city:'Shymkent',  flag:'🇰🇿' },
        { ru:'Караганда', kk:'Қарағанды',  en:'Karaganda',   countryRu:'Казахстан',     countryKk:'Қазақстан',  countryEn:'Kazakhstan',     region:'kz',            lat:49.80,  lon:73.09,   city:'Karaganda', flag:'🇰🇿' },
        { ru:'Актобе',    kk:'Ақтөбе',    en:'Aktobe',      countryRu:'Казахстан',     countryKk:'Қазақстан',  countryEn:'Kazakhstan',     region:'kz',            lat:50.28,  lon:57.17,   city:'Aktobe',    flag:'🇰🇿' },

        // === СНГ (cis) ===
        { ru:'Ташкент',   kk:'Ташкент',   en:'Tashkent',    countryRu:'Узбекистан',    countryKk:'Өзбекстан',  countryEn:'Uzbekistan',     region:'cis',           lat:41.30,  lon:69.27,   city:'Tashkent',  flag:'🇺🇿' },
        { ru:'Москва',    kk:'Мәскеу',    en:'Moscow',      countryRu:'Россия',        countryKk:'Ресей',      countryEn:'Russia',         region:'cis',           lat:55.75,  lon:37.62,   city:'Moscow',    flag:'🇷🇺' },
        { ru:'Бишкек',    kk:'Бішкек',    en:'Bishkek',     countryRu:'Кыргызстан',    countryKk:'Қырғызстан', countryEn:'Kyrgyzstan',     region:'cis',           lat:42.87,  lon:74.59,   city:'Bishkek',   flag:'🇰🇬' },
        { ru:'Санкт-Петербург', kk:'Санкт-Петербург', en:'St. Petersburg', countryRu:'Россия', countryKk:'Ресей', countryEn:'Russia',      region:'cis',           lat:59.94,  lon:30.31,   city:'StPetersburg', flag:'🇷🇺' },
        { ru:'Минск',     kk:'Минск',     en:'Minsk',       countryRu:'Беларусь',      countryKk:'Беларусь',   countryEn:'Belarus',        region:'cis',           lat:53.90,  lon:27.57,   city:'Minsk',     flag:'🇧🇾' },

        // === ЕВРОПА (europe) ===
        { ru:'Лондон',    kk:'Лондон',    en:'London',      countryRu:'Великобритания',countryKk:'Ұлыбритания', countryEn:'United Kingdom', region:'europe',        lat:51.51,  lon:-0.13,   city:'London',    flag:'🇬🇧' },
        { ru:'Париж',     kk:'Париж',     en:'Paris',       countryRu:'Франция',       countryKk:'Франция',    countryEn:'France',         region:'europe',        lat:48.85,  lon:2.35,    city:'Paris',     flag:'🇫🇷' },
        { ru:'Берлин',    kk:'Берлин',    en:'Berlin',      countryRu:'Германия',      countryKk:'Германия',   countryEn:'Germany',        region:'europe',        lat:52.52,  lon:13.41,   city:'Berlin',    flag:'🇩🇪' },
        { ru:'Рим',       kk:'Рим',       en:'Rome',        countryRu:'Италия',        countryKk:'Италия',     countryEn:'Italy',          region:'europe',        lat:41.90,  lon:12.50,   city:'Rome',      flag:'🇮🇹' },
        { ru:'Мадрид',    kk:'Мадрид',    en:'Madrid',      countryRu:'Испания',       countryKk:'Испания',    countryEn:'Spain',          region:'europe',        lat:40.42,  lon:-3.70,   city:'Madrid',    flag:'🇪🇸' },

        // === АЗИЯ (asia) ===
        { ru:'Токио',     kk:'Токио',     en:'Tokyo',       countryRu:'Япония',        countryKk:'Жапония',    countryEn:'Japan',          region:'asia',          lat:35.68,  lon:139.69,  city:'Tokyo',     flag:'🇯🇵' },
        { ru:'Пекин',     kk:'Пекин',     en:'Beijing',     countryRu:'Китай',         countryKk:'Қытай',      countryEn:'China',          region:'asia',          lat:39.91,  lon:116.39,  city:'Beijing',   flag:'🇨🇳' },
        { ru:'Сеул',      kk:'Сеул',      en:'Seoul',       countryRu:'Южная Корея',   countryKk:'Оңтүстік Корея', countryEn:'South Korea', region:'asia',          lat:37.57,  lon:126.98,  city:'Seoul',     flag:'🇰🇷' },
        { ru:'Бангкок',   kk:'Бангкок',   en:'Bangkok',     countryRu:'Таиланд',       countryKk:'Таиланд',    countryEn:'Thailand',       region:'asia',          lat:13.75,  lon:100.50,  city:'Bangkok',   flag:'🇹🇭' },
        { ru:'Сингапур',  kk:'Сингапур',  en:'Singapore',   countryRu:'Сингапур',      countryKk:'Сингапур',   countryEn:'Singapore',      region:'asia',          lat:1.35,   lon:103.82,  city:'Singapore', flag:'🇸🇬' },

        // === БЛИЖНИЙ ВОСТОК (middle-east) ===
        { ru:'Дубай',     kk:'Дубай',     en:'Dubai',       countryRu:'ОАЭ',           countryKk:'БАӘ',        countryEn:'UAE',            region:'middle-east',   lat:25.20,  lon:55.27,   city:'Dubai',     flag:'🇦🇪' },
        { ru:'Стамбул',   kk:'Ыстамбұл',  en:'Istanbul',    countryRu:'Турция',        countryKk:'Түркия',     countryEn:'Turkey',         region:'middle-east',   lat:41.01,  lon:28.98,   city:'Istanbul',  flag:'🇹🇷' },
        { ru:'Эр-Рияд',   kk:'Эр-Рияд',   en:'Riyadh',      countryRu:'Саудовская Аравия', countryKk:'Сауд Арабиясы', countryEn:'Saudi Arabia', region:'middle-east', lat:24.71,  lon:46.68,   city:'Riyadh',    flag:'🇸🇦' },
        { ru:'Доха',      kk:'Доха',      en:'Doha',        countryRu:'Катар',         countryKk:'Катар',      countryEn:'Qatar',          region:'middle-east',   lat:25.29,  lon:51.53,   city:'Doha',      flag:'🇶🇦' },
        { ru:'Тель-Авив', kk:'Тель-Авив',  en:'Tel Aviv',    countryRu:'Израиль',       countryKk:'Израиль',    countryEn:'Israel',         region:'middle-east',   lat:32.08,  lon:34.78,   city:'TelAviv',   flag:'🇮🇱' },

        // === СЕВЕРНАЯ АМЕРИКА (north-america) ===
        { ru:'Нью-Йорк',  kk:'Нью-Йорк',  en:'New York',    countryRu:'США',           countryKk:'АҚШ',        countryEn:'USA',            region:'north-america', lat:40.71,  lon:-74.01,  city:'NewYork',   flag:'🇺🇸' },
        { ru:'Лос-Анджелес', kk:'Лос-Анджелес', en:'Los Angeles', countryRu:'США',        countryKk:'АҚШ',        countryEn:'USA',            region:'north-america', lat:34.05,  lon:-118.24, city:'LosAngeles', flag:'🇺🇸' },
        { ru:'Торонто',   kk:'Торонто',   en:'Toronto',     countryRu:'Канада',        countryKk:'Канада',     countryEn:'Canada',         region:'north-america', lat:43.65,  lon:-79.38,  city:'Toronto',   flag:'🇨🇦' },
        { ru:'Мехико',    kk:'Мехико',    en:'Mexico City', countryRu:'Мексика',       countryKk:'Мексика',    countryEn:'Mexico',         region:'north-america', lat:19.43,  lon:-99.13,  city:'MexicoCity', flag:'🇲🇽' },
        { ru:'Чикаго',    kk:'Чикаго',    en:'Chicago',     countryRu:'США',           countryKk:'АҚШ',        countryEn:'USA',            region:'north-america', lat:41.88,  lon:-87.63,  city:'Chicago',   flag:'🇺🇸' },

        // === ЮЖНАЯ АМЕРИКА (south-america) ===
        { ru:'Сан-Паулу', kk:'Сан-Паулу',  en:'Sao Paulo',   countryRu:'Бразилия',      countryKk:'Бразилия',   countryEn:'Brazil',         region:'south-america', lat:-23.55, lon:-46.63,  city:'SaoPaulo',  flag:'🇧🇷' },
        { ru:'Рио-де-Жанейро', kk:'Рио-де-Жанейро', en:'Rio de Janeiro', countryRu:'Бразилия', countryKk:'Бразилия', countryEn:'Brazil',   region:'south-america', lat:-22.91, lon:-43.17,  city:'Rio',       flag:'🇧🇷' },
        { ru:'Буэнос-Айрес', kk:'Буэнос-Айрес', en:'Buenos Aires', countryRu:'Аргентина', countryKk:'Аргентина', countryEn:'Argentina',   region:'south-america', lat:-34.60, lon:-58.38,  city:'BuenosAires', flag:'🇦🇷' },
        { ru:'Богота',    kk:'Богота',    en:'Bogota',      countryRu:'Колумбия',      countryKk:'Колумбия',   countryEn:'Colombia',       region:'south-america', lat:4.71,   lon:-74.07,  city:'Bogota',    flag:'🇨🇴' },
        { ru:'Лима',      kk:'Лима',      en:'Lima',        countryRu:'Перу',          countryKk:'Перу',       countryEn:'Peru',           region:'south-america', lat:-12.04, lon:-77.03,  city:'Lima',      flag:'🇵🇪' },

        // === АФРИКА (africa) ===
        { ru:'Найроби',   kk:'Найроби',   en:'Nairobi',     countryRu:'Кения',         countryKk:'Кения',      countryEn:'Kenya',          region:'africa',        lat:-1.29,  lon:36.82,   city:'Nairobi',   flag:'🇰🇪' },
        { ru:'Каир',      kk:'Каир',      en:'Cairo',       countryRu:'Египет',        countryKk:'Мысыр',      countryEn:'Egypt',          region:'africa',        lat:30.04,  lon:31.24,   city:'Cairo',     flag:'🇪🇬' },
        { ru:'Кейптаун',  kk:'Кейптаун',  en:'Cape Town',   countryRu:'ЮАР',           countryKk:'ОАР',        countryEn:'South Africa',   region:'africa',        lat:-33.93, lon:18.42,   city:'CapeTown',  flag:'🇿🇦' },
        { ru:'Йоханнесбург', kk:'Йоханнесбург', en:'Johannesburg', countryRu:'ЮАР',      countryKk:'ОАР',        countryEn:'South Africa',   region:'africa',        lat:-26.20, lon:28.05,   city:'Johannesburg', flag:'🇿🇦' },
        { ru:'Касабланка', kk:'Касабланка', en:'Casablanca', countryRu:'Марокко',       countryKk:'Марокко',    countryEn:'Morocco',        region:'africa',        lat:33.57,  lon:-7.58,   city:'Casablanca', flag:'🇲🇦' },

        // === АВСТРАЛИЯ И ОКЕАНИЯ (oceania) ===
        { ru:'Сидней',    kk:'Сидней',    en:'Sydney',      countryRu:'Австралия',     countryKk:'Австралия',  countryEn:'Australia',      region:'oceania',       lat:-33.87, lon:151.21,  city:'Sydney',    flag:'🇦🇺' },
        { ru:'Мельбурн',  kk:'Мельбурн',  en:'Melbourne',   countryRu:'Австралия',     countryKk:'Австралия',  countryEn:'Australia',      region:'oceania',       lat:-37.81, lon:144.96,  city:'Melbourne', flag:'🇦🇺' },
        { ru:'Окленд',    kk:'Окленд',    en:'Auckland',    countryRu:'Новая Зеландия', countryKk:'Жаңа Зеландия', countryEn:'New Zealand', region:'oceania',       lat:-36.85, lon:174.76,  city:'Auckland',  flag:'🇳🇿' },
        { ru:'Брисбен',   kk:'Брисбен',   en:'Brisbane',    countryRu:'Австралия',     countryKk:'Австралия',  countryEn:'Australia',      region:'oceania',       lat:-27.47, lon:153.03,  city:'Brisbane',  flag:'🇦🇺' },
        { ru:'Перт',      kk:'Перт',      en:'Perth',       countryRu:'Австралия',     countryKk:'Австралия',  countryEn:'Australia',      region:'oceania',       lat:-31.95, lon:115.86,  city:'Perth',     flag:'🇦🇺' }
    ];
    // Helper: get localized name for popular city
    function cpPopularName(p) {
        const lang = (typeof getCurrentLang === 'function' ? getCurrentLang() : null)
                  || document.documentElement.lang
                  || localStorage.getItem('lang')
                  || 'ru';
        if (lang === 'kk') return { name: p.kk, country: p.countryKk };
        if (lang === 'en') return { name: p.en, country: p.countryEn };
        return { name: p.ru, country: p.countryRu };
    }

    /* ── 2. ПОЛНАЯ БАЗА ГОРОДОВ МИРА ── */
  /* ── БАЗА ГОРОДОВ ОТ А ДО Я (ДЛЯ КОМПОНЕНТА CP_ALL) ── */
const CP_ALL = [
    { ru: 'Абердин', kk: 'Абердин', en: 'Aberdeen', countryRu: 'Великобритания', countryKk: 'Ұлыбритания', countryEn: 'United Kingdom', region: 'gb', lat: 57.14, lon: -2.09, city: 'Aberdeen', flag: '🇬🇧' },
    { ru: 'Абиджан', kk: 'Абиджан', en: 'Abidjan', countryRu: 'Кот-д\'Ивуар', countryKk: 'Кот-д’Ивуар', countryEn: 'Ivory Coast', region: 'ci', lat: 5.35, lon: -4.00, city: 'Abidjan', flag: '🇨🇮' },
    { ru: 'Абу-Даби', kk: 'Абу-Даби', en: 'Abu Dhabi', countryRu: 'ОАЭ', countryKk: 'БАӘ', countryEn: 'UAE', region: 'ae', lat: 24.45, lon: 54.37, city: 'Abu Dhabi', flag: '🇦🇪' },
    { ru: 'Абуджа', kk: 'Абуджа', en: 'Abuja', countryRu: 'Нигерия', countryKk: 'Нигерия', countryEn: 'Nigeria', region: 'ng', lat: 9.07, lon: 7.39, city: 'Abuja', flag: '🇳🇬' },
    { ru: 'Авиньон', kk: 'Авиньон', en: 'Avignon', countryRu: 'Франция', countryKk: 'Франция', countryEn: 'France', region: 'fr', lat: 43.94, lon: 4.80, city: 'Avignon', flag: '🇫🇷' },
    { ru: 'Адана', kk: 'Адана', en: 'Adana', countryRu: 'Турция', countryKk: 'Түркия', countryEn: 'Turkey', region: 'tr', lat: 37.00, lon: 35.32, city: 'Adana', flag: '🇹🇷' },
    { ru: 'Аддис-Абеба', kk: 'Аддис-Абеба', en: 'Addis Ababa', countryRu: 'Эфиопия', countryKk: 'Эфиопия', countryEn: 'Ethiopia', region: 'et', lat: 9.03, lon: 38.74, city: 'Addis Ababa', flag: '🇪🇹' },
    { ru: 'Аделаида', kk: 'Аделаида', en: 'Adelaide', countryRu: 'Австралия', countryKk: 'Австралия', countryEn: 'Australia', region: 'au', lat: -34.92, lon: 138.60, city: 'Adelaide', flag: '🇦🇺' },
    { ru: 'Аден', kk: 'Аден', en: 'Aden', countryRu: 'Йемен', countryKk: 'Йемен', countryEn: 'Yemen', region: 'ye', lat: 12.77, lon: 45.03, city: 'Aden', flag: '🇾🇪' },
    { ru: 'Акапулько', kk: 'Акапулько', en: 'Acapulco', countryRu: 'Мексика', countryKk: 'Мексика', countryEn: 'Mexico', region: 'mx', lat: 16.85, lon: -99.87, city: 'Acapulco', flag: '🇲🇽' },
    { ru: 'Актау', kk: 'Ақтау', en: 'Aktau', countryRu: 'Казахстан', countryKk: 'Қазақстан', countryEn: 'Kazakhstan', region: 'kz', lat: 43.65, lon: 51.16, city: 'Aktau', flag: '🇰🇿' },
    { ru: 'Актобе', kk: 'Ақтөбе', en: 'Aktobe', countryRu: 'Казахстан', countryKk: 'Қазақстан', countryEn: 'Kazakhstan', region: 'kz', lat: 50.28, lon: 57.16, city: 'Aktobe', flag: '🇰🇿' },
    { ru: 'Алжир', kk: 'Алжир', en: 'Algiers', countryRu: 'Алжир', countryKk: 'Алжир', countryEn: 'Algeria', region: 'dz', lat: 36.75, lon: 3.05, city: 'Algiers', flag: '🇩🇿' },
    { ru: 'Аликанте', kk: 'Аликанте', en: 'Alicante', countryRu: 'Испания', countryKk: 'Испания', countryEn: 'Spain', region: 'es', lat: 38.34, lon: -0.48, city: 'Alicante', flag: '🇪🇸' },
    { ru: 'Алматы', kk: 'Алматы', en: 'Almaty', countryRu: 'Казахстан', countryKk: 'Қазақстан', countryEn: 'Kazakhstan', region: 'kz', lat: 43.25, lon: 76.95, city: 'Almaty', flag: '🇰🇿' },
    { ru: 'Амстердам', kk: 'Амстердам', en: 'Amsterdam', countryRu: 'Нидерланды', countryKk: 'Нидерланд', countryEn: 'Netherlands', region: 'nl', lat: 52.37, lon: 4.89, city: 'Amsterdam', flag: '🇳🇱' },
    { ru: 'Анже', kk: 'Анже', en: 'Angers', countryRu: 'Франция', countryKk: 'Франция', countryEn: 'France', region: 'fr', lat: 47.47, lon: -0.55, city: 'Angers', flag: '🇫🇷' },
    { ru: 'Анкара', kk: 'Анкара', en: 'Ankara', countryRu: 'Турция', countryKk: 'Түркия', countryEn: 'Turkey', region: 'tr', lat: 39.93, lon: 32.85, city: 'Ankara', flag: '🇹🇷' },
    { ru: 'Антверпен', kk: 'Антверпен', en: 'Antwerp', countryRu: 'Бельгия', countryKk: 'Бельгия', countryEn: 'Belgium', region: 'be', lat: 51.21, lon: 4.40, city: 'Antwerp', flag: '🇧🇪' },
    { ru: 'Анталья', kk: 'Анталья', en: 'Antalya', countryRu: 'Турция', countryKk: 'Түркия', countryEn: 'Turkey', region: 'tr', lat: 36.88, lon: 30.70, city: 'Antalya', flag: '🇹🇷' },
    { ru: 'Арль', kk: 'Арль', en: 'Arles', countryRu: 'Франция', countryKk: 'Франция', countryEn: 'France', region: 'fr', lat: 43.67, lon: 4.62, city: 'Arles', flag: '🇫🇷' },
    { ru: 'Архангельск', kk: 'Архангельск', en: 'Arkhangelsk', countryRu: 'Россия', countryKk: 'Ресей', countryEn: 'Russia', region: 'ru', lat: 64.54, lon: 40.53, city: 'Arkhangelsk', flag: '🇷🇺' },
    { ru: 'Арыс', kk: 'Арыс', en: 'Arys', countryRu: 'Казахстан', countryKk: 'Қазақстан', countryEn: 'Kazakhstan', region: 'kz', lat: 42.43, lon: 68.80, city: 'Arys', flag: '🇰🇿' },
    { ru: 'Асайния', kk: 'Асайния', en: 'Asilah', countryRu: 'Марокко', countryKk: 'Марокко', countryEn: 'Morocco', region: 'ma', lat: 35.46, lon: -6.03, city: 'Asilah', flag: '🇲🇦' },
    { ru: 'Астана', kk: 'Астана', en: 'Astana', countryRu: 'Казахстан', countryKk: 'Қазақстан', countryEn: 'Kazakhstan', region: 'kz', lat: 51.18, lon: 71.45, city: 'Astana', flag: '🇰🇿' },
    { ru: 'Астрахань', kk: 'Астрахань', en: 'Astrakhan', countryRu: 'Россия', countryKk: 'Ресей', countryEn: 'Russia', region: 'ru', lat: 46.34, lon: 48.04, city: 'Astrakhan', flag: '🇷🇺' },
    { ru: 'Асуан', kk: 'Асуан', en: 'Aswan', countryRu: 'Египет', countryKk: 'Мысыр', countryEn: 'Egypt', region: 'eg', lat: 24.08, lon: 32.89, city: 'Aswan', flag: '🇪🇬' },
    { ru: 'Асыкаты', kk: 'Асықаты', en: 'Asykata', countryRu: 'Казахстан', countryKk: 'Қазақстан', countryEn: 'Kazakhstan', region: 'kz', lat: 40.89, lon: 68.36, city: 'Asykata', flag: '🇰🇿' },
    { ru: 'Атланта', kk: 'Атланта', en: 'Atlanta', countryRu: 'США', countryKk: 'АҚШ', countryEn: 'USA', region: 'us', lat: 33.74, lon: -84.38, city: 'Atlanta', flag: '🇺🇸' },
    { ru: 'Атырау', kk: 'Атырау', en: 'Atyrau', countryRu: 'Казахстан', countryKk: 'Қазақстан', countryEn: 'Kazakhstan', region: 'kz', lat: 47.11, lon: 51.88, city: 'Atyrau', flag: '🇰🇿' },
    { ru: 'Афины', kk: 'Афина', en: 'Athens', countryRu: 'Греция', countryKk: 'Грекия', countryEn: 'Greece', region: 'gr', lat: 37.98, lon: 23.72, city: 'Athens', flag: '🇬🇷' },
    { ru: 'Аягоз', kk: 'Аягөз', en: 'Ayagoz', countryRu: 'Казахстан', countryKk: 'Қазақстан', countryEn: 'Kazakhstan', region: 'kz', lat: 47.96, lon: 80.43, city: 'Ayagoz', flag: '🇰🇿' },
    
    { ru: 'Багдад', kk: 'Бағдат', en: 'Baghdad', countryRu: 'Ирак', countryKk: 'Ирак', countryEn: 'Iraq', region: 'iq', lat: 33.31, lon: 44.36, city: 'Baghdad', flag: '🇮🇶' },
    { ru: 'Базель', kk: 'Базель', en: 'Basel', countryRu: 'Швейцария', countryKk: 'Швейцария', countryEn: 'Switzerland', region: 'ch', lat: 47.55, lon: 7.58, city: 'Basel', flag: '🇨🇭' },
    { ru: 'Баку', kk: 'Баку', en: 'Baku', countryRu: 'Азербайджан', countryKk: 'Әзірбайжан', countryEn: 'Azerbaijan', region: 'az', lat: 40.40, lon: 49.86, city: 'Baku', flag: '🇦🇿' },
    { ru: 'Балхаш', kk: 'Балқаш', en: 'Balkhash', countryRu: 'Казахстан', countryKk: 'Қазақстан', countryEn: 'Kazakhstan', region: 'kz', lat: 46.84, lon: 74.99, city: 'Balkhash', flag: '🇰🇿' },
    { ru: 'Бангкок', kk: 'Бангкок', en: 'Bangkok', countryRu: 'Таиланд', countryKk: 'Таиланд', countryEn: 'Thailand', region: 'th', lat: 13.75, lon: 100.50, city: 'Bangkok', flag: '🇹🇭' },
    { ru: 'Бангалор', kk: 'Бангалор', en: 'Bangalore', countryRu: 'Индия', countryKk: 'Үндістан', countryEn: 'India', region: 'in', lat: 12.97, lon: 77.59, city: 'Bangalore', flag: '🇮🇳' },
    { ru: 'Барнаул', kk: 'Барнаул', en: 'Barnaul', countryRu: 'Россия', countryKk: 'Ресей', countryEn: 'Russia', region: 'ru', lat: 53.35, lon: 83.76, city: 'Barnaul', flag: '🇷🇺' },
    { ru: 'Барселона', kk: 'Барселона', en: 'Barcelona', countryRu: 'Испания', countryKk: 'Испания', countryEn: 'Spain', region: 'es', lat: 41.38, lon: 2.17, city: 'Barcelona', flag: '🇪🇸' },
    { ru: 'Батуми', kk: 'Батуми', en: 'Batumi', countryRu: 'Грузия', countryKk: 'Грузия', countryEn: 'Georgia', region: 'ge', lat: 41.63, lon: 41.61, city: 'Batumi', flag: '🇬🇪' },
    { ru: 'Бейрут', kk: 'Бейрут', en: 'Beirut', countryRu: 'Ливан', countryKk: 'Ливан', countryEn: 'Lebanon', region: 'lb', lat: 33.89, lon: 35.50, city: 'Beirut', flag: '🇱🇧' },
    { ru: 'Бейжинг (Пекин)', kk: 'Бейжің', en: 'Beijing', countryRu: 'Китай', countryKk: 'Қытай', countryEn: 'China', region: 'cn', lat: 39.90, lon: 116.40, city: 'Beijing', flag: '🇨🇳' },
    { ru: 'Белград', kk: 'Белград', en: 'Belgrade', countryRu: 'Сербия', countryKk: 'Сербия', countryEn: 'Serbia', region: 'rs', lat: 44.78, lon: 20.44, city: 'Belgrade', flag: '🇷🇸' },
    { ru: 'Белфаст', kk: 'Белфаст', en: 'Belfast', countryRu: 'Великобритания', countryKk: 'Ұлыбритания', countryEn: 'United Kingdom', region: 'gb', lat: 54.59, lon: -5.93, city: 'Belfast', flag: '🇬🇧' },
    { ru: 'Берген', kk: 'Берген', en: 'Bergen', countryRu: 'Норвегия', countryKk: 'Норвегия', countryEn: 'Norway', region: 'no', lat: 60.39, lon: 5.32, city: 'Bergen', flag: '🇳🇴' },
    { ru: 'Берлин', kk: 'Берлин', en: 'Berlin', countryRu: 'Германия', countryKk: 'Германия', countryEn: 'Germany', region: 'de', lat: 52.52, lon: 13.40, city: 'Berlin', flag: '🇩🇪' },
    { ru: 'Берн', kk: 'Берн', en: 'Bern', countryRu: 'Швейцария', countryKk: 'Швейцария', countryEn: 'Switzerland', region: 'ch', lat: 46.94, lon: 7.44, city: 'Bern', flag: '🇨🇭' },
    { ru: 'Бирмингем', kk: 'Бирмингем', en: 'Birmingham', countryRu: 'Великобритания', countryKk: 'Ұлыбритания', countryEn: 'United Kingdom', region: 'gb', lat: 52.48, lon: -1.89, city: 'Birmingham', flag: '🇬🇧' },
    { ru: 'Бишкек', kk: 'Бішкек', en: 'Bishkek', countryRu: 'Кыргызстан', countryKk: 'Қырғызстан', countryEn: 'Kyrgyzstan', region: 'kg', lat: 42.87, lon: 74.59, city: 'Bishkek', flag: '🇰🇬' },
    { ru: 'Болонья', kk: 'Болонья', en: 'Bologna', countryRu: 'Италия', countryKk: 'Италия', countryEn: 'Italy', region: 'it', lat: 44.49, lon: 11.34, city: 'Bologna', flag: '🇮🇹' },
    { ru: 'Бордо', kk: 'Бордо', en: 'Bordeaux', countryRu: 'Франция', countryKk: 'Франция', countryEn: 'France', region: 'fr', lat: 44.83, lon: -0.57, city: 'Bordeaux', flag: '🇫🇷' },
    { ru: 'Бостон', kk: 'Бостон', en: 'Boston', countryRu: 'США', countryKk: 'АҚШ', countryEn: 'USA', region: 'us', lat: 42.36, lon: -71.05, city: 'Boston', flag: '🇺🇸' },
    { ru: 'Братислава', kk: 'Братислава', en: 'Bratislava', countryRu: 'Словакия', countryKk: 'Словакия', countryEn: 'Slovakia', region: 'sk', lat: 48.14, lon: 17.10, city: 'Bratislava', flag: '🇸🇰' },
    { ru: 'Бремен', kk: 'Бремен', en: 'Bremen', countryRu: 'Германия', countryKk: 'Германия', countryEn: 'Germany', region: 'de', lat: 53.07, lon: 8.80, city: 'Bremen', flag: '🇩🇪' },
    { ru: 'Брест', kk: 'Брест', en: 'Brest', countryRu: 'Беларусь', countryKk: 'Беларусь', countryEn: 'Belarus', region: 'by', lat: 52.09, lon: 23.73, city: 'Brest', flag: '🇧🇾' },
    { ru: 'Бристоль', kk: 'Бристоль', en: 'Bristol', countryRu: 'Великобритания', countryKk: 'Ұлыбритания', countryEn: 'United Kingdom', region: 'gb', lat: 51.45, lon: -2.58, city: 'Bristol', flag: '🇬🇧' },
    { ru: 'Брюссель', kk: 'Брюссель', en: 'Brussels', countryRu: 'Бельгия', countryKk: 'Бельгия', countryEn: 'Belgium', region: 'be', lat: 50.85, lon: 4.35, city: 'Brussels', flag: '🇧🇪' },
    { ru: 'Брянск', kk: 'Брянск', en: 'Bryansk', countryRu: 'Россия', countryKk: 'Ресей', countryEn: 'Russia', region: 'ru', lat: 53.24, lon: 34.36, city: 'Bryansk', flag: '🇷🇺' },
    { ru: 'Будапешт', kk: 'Будапешт', en: 'Budapest', countryRu: 'Венгрия', countryKk: 'Венгрия', countryEn: 'Hungary', region: 'hu', lat: 47.49, lon: 19.04, city: 'Budapest', flag: '🇭🇺' },
    { ru: 'Бухарест', kk: 'Бухарест', en: 'Bucharest', countryRu: 'Румыния', countryKk: 'Румыния', countryEn: 'Romania', region: 'ro', lat: 44.42, lon: 26.10, city: 'Bucharest', flag: '🇷🇴' },
    { ru: 'Буэнос-Айрес', kk: 'Буэнос-Айрес', en: 'Buenos Aires', countryRu: 'Аргентина', countryKk: 'Аргентина', countryEn: 'Argentina', region: 'ar', lat: -34.60, lon: -58.38, city: 'Buenos Aires', flag: '🇦🇷' },
    
    { ru: 'Валенсия', kk: 'Валенсия', en: 'Valencia', countryRu: 'Испания', countryKk: 'Испания', countryEn: 'Spain', region: 'es', lat: 39.46, lon: -0.37, city: 'Valencia', flag: '🇪🇸' },
    { ru: 'Ванкувер', kk: 'Ванкувер', en: 'Vancouver', countryRu: 'Канада', countryKk: 'Канада', countryEn: 'Canada', region: 'ca', lat: 49.28, lon: -123.12, city: 'Vancouver', flag: '🇨🇦' },
    { ru: 'Варшава', kk: 'Варшава', en: 'Warsaw', countryRu: 'Польша', countryKk: 'Польша', countryEn: 'Poland', region: 'pl', lat: 52.22, lon: 21.01, city: 'Warsaw', flag: '🇵🇱' },
    { ru: 'Вашингтон', kk: 'Вашингтон', en: 'Washington', countryRu: 'США', countryKk: 'АҚШ', countryEn: 'USA', region: 'us', lat: 38.90, lon: -77.03, city: 'Washington', flag: '🇺🇸' },
    { ru: 'Веллингтон', kk: 'Веллингтон', en: 'Wellington', countryRu: 'Новая Зеландия', countryKk: 'Жаңа Зеландия', countryEn: 'New Zealand', region: 'nz', lat: -41.28, lon: 174.77, city: 'Wellington', flag: '🇳🇿' },
    { ru: 'Венеция', kk: 'Венеция', en: 'Venice', countryRu: 'Италия', countryKk: 'Италия', countryEn: 'Italy', region: 'it', lat: 45.44, lon: 12.31, city: 'Venice', flag: '🇮🇹' },
    { ru: 'Верона', kk: 'Верона', en: 'Verona', countryRu: 'Италия', countryKk: 'Италия', countryEn: 'Italy', region: 'it', lat: 45.43, lon: 10.99, city: 'Verona', flag: '🇮🇹' },
    { ru: 'Вена', kk: 'Вена', en: 'Vienna', countryRu: 'Австрия', countryKk: 'Австрия', countryEn: 'Austria', region: 'at', lat: 48.20, lon: 16.37, city: 'Vienna', flag: '🇦🇹' },
    { ru: 'Вильнюс', kk: 'Вильнюс', en: 'Vilnius', countryRu: 'Литва', countryKk: 'Литва', countryEn: 'Lithuania', region: 'lt', lat: 54.68, lon: 25.27, city: 'Vilnius', flag: '🇱🇹' },
    { ru: 'Владивосток', kk: 'Владивосток', en: 'Vladivostok', countryRu: 'Россия', countryKk: 'Ресей', countryEn: 'Russia', region: 'ru', lat: 43.11, lon: 131.87, city: 'Vladivostok', flag: '🇷🇺' },
    { ru: 'Владимир', kk: 'Владимир', en: 'Vladimir', countryRu: 'Россия', countryKk: 'Ресей', countryEn: 'Russia', region: 'ru', lat: 56.12, lon: 40.40, city: 'Vladimir', flag: '🇷🇺' },
    { ru: 'Волгоград', kk: 'Волгоград', en: 'Volgograd', countryRu: 'Россия', countryKk: 'Ресей', countryEn: 'Russia', region: 'ru', lat: 48.70, lon: 44.51, city: 'Volgograd', flag: '🇷🇺' },
    { ru: 'Воронеж', kk: 'Воронеж', en: 'Voronezh', countryRu: 'Россия', countryKk: 'Ресей', countryEn: 'Russia', region: 'ru', lat: 51.66, lon: 39.17, city: 'Voronezh', flag: '🇷🇺' },
    { ru: 'Вроцлав', kk: 'Вроцлав', en: 'Wroclaw', countryRu: 'Польша', countryKk: 'Польша', countryEn: 'Poland', region: 'pl', lat: 51.10, lon: 17.03, city: 'Wroclaw', flag: '🇵🇱' },
    
    { ru: 'Гавана', kk: 'Гавана', en: 'Havana', countryRu: 'Куба', countryKk: 'Куба', countryEn: 'Cuba', region: 'cu', lat: 23.11, lon: -82.36, city: 'Havana', flag: '🇨🇺' },
    { ru: 'Гаага', kk: 'Гаага', en: 'The Hague', countryRu: 'Нидерланды', countryKk: 'Нидерланд', countryEn: 'Netherlands', region: 'nl', lat: 52.07, lon: 4.30, city: 'The Hague', flag: '🇳🇱' },
    { ru: 'Гамбург', kk: 'Гамбург', en: 'Hamburg', countryRu: 'Германия', countryKk: 'Германия', countryEn: 'Germany', region: 'de', lat: 53.55, lon: 9.99, city: 'Hamburg', flag: '🇩🇪' },
    { ru: 'Ганновер', kk: 'Ганновер', en: 'Hannover', countryRu: 'Германия', countryKk: 'Германия', countryEn: 'Germany', region: 'de', lat: 52.37, lon: 9.73, city: 'Hannover', flag: '🇩🇪' },
    { ru: 'Гданьск', kk: 'Гданьск', en: 'Gdansk', countryRu: 'Польша', countryKk: 'Польша', countryEn: 'Poland', region: 'pl', lat: 54.35, lon: 18.64, city: 'Gdansk', flag: '🇵🇱' },
    { ru: 'Генуя', kk: 'Генуя', en: 'Genoa', countryRu: 'Италия', countryKk: 'Италия', countryEn: 'Italy', region: 'it', lat: 44.40, lon: 8.94, city: 'Genoa', flag: '🇮🇹' },
    { ru: 'Глазго', kk: 'Глазго', en: 'Glasgow', countryRu: 'Великобритания', countryKk: 'Ұлыбритания', countryEn: 'United Kingdom', region: 'gb', lat: 55.86, lon: -4.25, city: 'Glasgow', flag: '🇬🇧' },
    { ru: 'Гонконг', kk: 'Гонконг', en: 'Hong Kong', countryRu: 'Гонконг', countryKk: 'Гонконг', countryEn: 'Hong Kong', region: 'hk', lat: 22.31, lon: 114.16, city: 'Hong Kong', flag: '🇭🇰' },
    { ru: 'Гетеборг', kk: 'Гетеборг', en: 'Gothenburg', countryRu: 'Швеция', countryKk: 'Швеция', countryEn: 'Sweden', region: 'se', lat: 57.70, lon: 11.97, city: 'Gothenburg', flag: '🇸🇪' },
    { ru: 'Грац', kk: 'Грац', en: 'Graz', countryRu: 'Австрия', countryKk: 'Австрия', countryEn: 'Austria', region: 'at', lat: 47.07, lon: 15.43, city: 'Graz', flag: '🇦🇹' },
    { ru: 'Грозный', kk: 'Грозный', en: 'Grozny', countryRu: 'Россия', countryKk: 'Ресей', countryEn: 'Russia', region: 'ru', lat: 43.31, lon: 45.69, city: 'Grozny', flag: '🇷🇺' },
    { ru: 'Гуанчжоу', kk: 'Гуанчжоу', en: 'Guangzhou', countryRu: 'Китай', countryKk: 'Қытай', countryEn: 'China', region: 'cn', lat: 23.12, lon: 113.26, city: 'Guangzhou', flag: '🇨🇳' },
    
    { ru: 'Дакка', kk: 'Дакка', en: 'Dhaka', countryRu: 'Бангладеш', countryKk: 'Бангладеш', countryEn: 'Bangladesh', region: 'bd', lat: 23.81, lon: 90.41, city: 'Dhaka', flag: '🇧🇩' },
    { ru: 'Даллас', kk: 'Даллас', en: 'Dallas', countryRu: 'США', countryKk: 'АҚШ', countryEn: 'USA', region: 'us', lat: 32.77, lon: -96.79, city: 'Dallas', flag: '🇺🇸' },
    { ru: 'Дамаск', kk: 'Дамаск', en: 'Damascus', countryRu: 'Сирия', countryKk: 'Сирия', countryEn: 'Syria', region: 'sy', lat: 33.51, lon: 36.27, city: 'Damascus', flag: '🇸🇾' },
    { ru: 'Дар-эс-Салам', kk: 'Дар-эс-Салам', en: 'Dar es Salaam', countryRu: 'Танзания', countryKk: 'Танзания', countryEn: 'Tanzania', region: 'tz', lat: -6.79, lon: 39.20, city: 'Dar es Salaam', flag: '🇹🇿' },
    { ru: 'Дели', kk: 'Дели', en: 'Delhi', countryRu: 'Индия', countryKk: 'Үндістан', countryEn: 'India', region: 'in', lat: 28.61, lon: 77.20, city: 'Delhi', flag: '🇮🇳' },
    { ru: 'Денвер', kk: 'Денвер', en: 'Denver', countryRu: 'США', countryKk: 'АҚШ', countryEn: 'USA', region: 'us', lat: 39.73, lon: -104.99, city: 'Denver', flag: '🇺🇸' },
    { ru: 'Джакарта', kk: 'Джакарта', en: 'Jakarta', countryRu: 'Индонезия', countryKk: 'Индонезия', countryEn: 'Indonesia', region: 'id', lat: -6.20, lon: 106.84, city: 'Jakarta', flag: '🇮🇩' },
    { ru: 'Джидда', kk: 'Джидда', en: 'Jeddah', countryRu: 'Саудовская Аравия', countryKk: 'Сауд Арабиясы', countryEn: 'Saudi Arabia', region: 'sa', lat: 21.54, lon: 39.17, city: 'Jeddah', flag: '🇸🇦' },
    { ru: 'Джибути', kk: 'Джибути', en: 'Djibouti', countryRu: 'Джибути', countryKk: 'Джибути', countryEn: 'Djibouti', region: 'dj', lat: 11.58, lon: 43.14, city: 'Djibouti', flag: '🇩🇯' },
    { ru: 'Дортмунд', kk: 'Дортмунд', en: 'Dortmund', countryRu: 'Германия', countryKk: 'Германия', countryEn: 'Germany', region: 'de', lat: 51.51, lon: 7.46, city: 'Dortmund', flag: '🇩🇪' },
    { ru: 'Дрезден', kk: 'Дрезден', en: 'Dresden', countryRu: 'Германия', countryKk: 'Германия', countryEn: 'Germany', region: 'de', lat: 51.05, lon: 13.73, city: 'Dresden', flag: '🇩🇪' },
    { ru: 'Дубай', kk: 'Дубай', en: 'Dubai', countryRu: 'ОАЭ', countryKk: 'БАӘ', countryEn: 'UAE', region: 'ae', lat: 25.20, lon: 55.27, city: 'Dubai', flag: '🇦🇪' },
    { ru: 'Дублин', kk: 'Дублин', en: 'Dublin', countryRu: 'Ирландия', countryKk: 'Ирландия', countryEn: 'Ireland', region: 'ie', lat: 53.34, lon: -6.26, city: 'Dublin', flag: '🇮🇪' },
    { ru: 'Душанбе', kk: 'Душанбе', en: 'Dushanbe', countryRu: 'Таджикистан', countryKk: 'Тәжікстан', countryEn: 'Tajikistan', region: 'tj', lat: 38.55, lon: 68.78, city: 'Dushanbe', flag: '🇹🇯' },
    
    { ru: 'Евпатория', kk: 'Евпатория', en: 'Yevpatoriya', countryRu: 'Украина', countryKk: 'Украина', countryEn: 'Ukraine', region: 'ua', lat: 45.19, lon: 33.36, city: 'Yevpatoriya', flag: '🇺🇦' },
    { ru: 'Екатеринбург', kk: 'Екатеринбург', en: 'Yekaterinburg', countryRu: 'Россия', countryKk: 'Ресей', countryEn: 'Russia', region: 'ru', lat: 56.83, lon: 60.60, city: 'Yekaterinburg', flag: '🇷🇺' },
    { ru: 'Ереван', kk: 'Ереван', en: 'Yerevan', countryRu: 'Армения', countryKk: 'Армения', countryEn: 'Armenia', region: 'am', lat: 40.17, lon: 44.51, city: 'Yerevan', flag: '🇦🇲' },
    { ru: 'Есик', kk: 'Есік', en: 'Esik', countryRu: 'Казахстан', countryKk: 'Қазақстан', countryEn: 'Kazakhstan', region: 'kz', lat: 43.45, lon: 77.46, city: 'Esik', flag: '🇰🇿' },
    
    { ru: 'Жанаозен', kk: 'Жаңаөзен', en: 'Zhanaozen', countryRu: 'Казахстан', countryKk: 'Қазақстан', countryEn: 'Kazakhstan', region: 'kz', lat: 43.34, lon: 52.85, city: 'Zhanaozen', flag: '🇰🇿' },
    { ru: 'Жансугуров', kk: 'Жансүгіров', en: 'Zhansugirov', countryRu: 'Казахстан', countryKk: 'Қазақстан', countryEn: 'Kazakhstan', region: 'kz', lat: 45.32, lon: 79.39, city: 'Zhansugirov', flag: '🇰🇿' },
    { ru: 'Жаркент', kk: 'Жаркент', en: 'Zharkent', countryRu: 'Казахстан', countryKk: 'Қазақстан', countryEn: 'Kazakhstan', region: 'kz', lat: 44.16, lon: 80.00, city: 'Zharkent', flag: '🇰🇿' },
    { ru: 'Жезказган', kk: 'Жезқазған', en: 'Zhezkazgan', countryRu: 'Казахстан', countryKk: 'Қазақстан', countryEn: 'Kazakhstan', region: 'kz', lat: 47.79, lon: 67.70, city: 'Zhezkazgan', flag: '🇰🇿' },
    { ru: 'Женева', kk: 'Женева', en: 'Geneva', countryRu: 'Швейцария', countryKk: 'Швейцария', countryEn: 'Switzerland', region: 'ch', lat: 46.20, lon: 6.14, city: 'Geneva', flag: '🇨🇭' },
    { ru: 'Житикара', kk: 'Жітіқара', en: 'Zhitikara', countryRu: 'Казахстан', countryKk: 'Қазақстан', countryEn: 'Kazakhstan', region: 'kz', lat: 52.19, lon: 61.19, city: 'Zhitikara', flag: '🇰🇿' },
    { ru: 'Жетысай', kk: 'Жетісай', en: 'Zhetisay', countryRu: 'Казахстан', countryKk: 'Қазақстан', countryEn: 'Kazakhstan', region: 'kz', lat: 40.76, lon: 68.32, city: 'Zhetisay', flag: '🇰🇿' },
    
    { ru: 'Загреб', kk: 'Загреб', en: 'Zagreb', countryRu: 'Хорватия', countryKk: 'Хорватия', countryEn: 'Croatia', region: 'hr', lat: 45.81, lon: 15.97, city: 'Zagreb', flag: '🇭🇷' },
    { ru: 'Зайсан', kk: 'Зайсан', en: 'Zaysan', countryRu: 'Казахстан', countryKk: 'Қазақстан', countryEn: 'Kazakhstan', region: 'kz', lat: 47.46, lon: 84.87, city: 'Zaysan', flag: '🇰🇿' },
    { ru: 'Зальцбург', kk: 'Зальцбург', en: 'Salzburg', countryRu: 'Австрия', countryKk: 'Австрия', countryEn: 'Austria', region: 'at', lat: 47.80, lon: 13.04, city: 'Salzburg', flag: '🇦🇹' },
    { ru: 'Запорожье', kk: 'Запорожье', en: 'Zaporizhzhia', countryRu: 'Украина', countryKk: 'Украина', countryEn: 'Ukraine', region: 'ua', lat: 47.83, lon: 35.13, city: 'Zaporizhzhia', flag: '🇺🇦' },
    { ru: 'Зыряновск (Алтай)', kk: 'Алтай', en: 'Altay', countryRu: 'Казахстан', countryKk: 'Қазақстан', countryEn: 'Kazakhstan', region: 'kz', lat: 49.73, lon: 84.27, city: 'Altay', flag: '🇰🇿' },
    { ru: 'Цюрих', kk: 'Цюрих', en: 'Zurich', countryRu: 'Швейцария', countryKk: 'Швейцария', countryEn: 'Switzerland', region: 'ch', lat: 47.37, lon: 8.54, city: 'Zurich', flag: '🇨🇭' },
    
    { ru: 'Иерусалим', kk: 'Иерусалим', en: 'Jerusalem', countryRu: 'Израиль', countryKk: 'Израиль', countryEn: 'Israel', region: 'il', lat: 31.76, lon: 35.21, city: 'Jerusalem', flag: '🇮🇱' },
    { ru: 'Ижевск', kk: 'Ижевск', en: 'Izhevsk', countryRu: 'Россия', countryKk: 'Ресей', countryEn: 'Russia', region: 'ru', lat: 56.85, lon: 53.20, city: 'Izhevsk', flag: '🇷🇺' },
    { ru: 'Индианаполис', kk: 'Индианаполис', en: 'Indianapolis', countryRu: 'США', countryKk: 'АҚШ', countryEn: 'USA', region: 'us', lat: 39.76, lon: -86.15, city: 'Indianapolis', flag: '🇺🇸' },
    { ru: 'Инсбрук', kk: 'Инсбрук', en: 'Innsbruck', countryRu: 'Австрия', countryKk: 'Австрия', countryEn: 'Austria', region: 'at', lat: 47.26, lon: 11.40, city: 'Innsbruck', flag: '🇦🇹' },
    { ru: 'Иркутск', kk: 'Иркутск', en: 'Irkutsk', countryRu: 'Россия', countryKk: 'Ресей', countryEn: 'Russia', region: 'ru', lat: 52.28, lon: 104.30, city: 'Irkutsk', flag: '🇷🇺' },
    { ru: 'Исламабад', kk: 'Исламабад', en: 'Islamabad', countryRu: 'Пакистан', countryKk: 'Пәкістан', countryEn: 'Pakistan', region: 'pk', lat: 33.68, lon: 73.04, city: 'Islamabad', flag: '🇵🇰' },
    { ru: 'Стамбул', kk: 'Ыстамбұл', en: 'Istanbul', countryRu: 'Турция', countryKk: 'Түркия', countryEn: 'Turkey', region: 'tr', lat: 41.00, lon: 28.97, city: 'Istanbul', flag: '🇹🇷' },
    
    { ru: 'Кабул', kk: 'Кабул', en: 'Kabul', countryRu: 'Афганистан', countryKk: 'Ауғанстан', countryEn: 'Afghanistan', region: 'af', lat: 34.55, lon: 69.17, city: 'Kabul', flag: '🇦🇫' },
    { ru: 'Каир', kk: 'Каир', en: 'Cairo', countryRu: 'Египет', countryKk: 'Мысыр', countryEn: 'Egypt', region: 'eg', lat: 30.04, lon: 31.23, city: 'Cairo', flag: '🇪🇬' },
    { ru: 'Калининград', kk: 'Калининград', en: 'Kaliningrad', countryRu: 'Россия', countryKk: 'Ресей', countryEn: 'Russia', region: 'ru', lat: 54.71, lon: 20.45, city: 'Kaliningrad', flag: '🇷🇺' },
    { ru: 'Калуга', kk: 'Калуга', en: 'Kaluga', countryRu: 'Россия', countryKk: 'Ресей', countryEn: 'Russia', region: 'ru', lat: 54.52, lon: 36.27, city: 'Kaluga', flag: '🇷🇺' },
    { ru: 'Караганда', kk: 'Қарағанды', en: 'Karaganda', countryRu: 'Казахстан', countryKk: 'Қазақстан', countryEn: 'Kazakhstan', region: 'kz', lat: 49.80, lon: 73.08, city: 'Karaganda', flag: '🇰🇿' },
    { ru: 'Каракул', kk: 'Қаракөл', en: 'Karakol', countryRu: 'Кыргызстан', countryKk: 'Қырғызстан', countryEn: 'Kyrgyzstan', region: 'kg', lat: 42.49, lon: 78.39, city: 'Karakol', flag: '🇰🇬' },
    { ru: 'Каратау', kk: 'Қаратау', en: 'Karatau', countryRu: 'Казахстан', countryKk: 'Қазақстан', countryEn: 'Kazakhstan', region: 'kz', lat: 43.16, lon: 70.46, city: 'Karatau', flag: '🇰🇿' },
    { ru: 'Кардифф', kk: 'Кардифф', en: 'Cardiff', countryRu: 'Великобритания', countryKk: 'Ұлыбритания', countryEn: 'United Kingdom', region: 'gb', lat: 51.48, lon: -3.17, city: 'Cardiff', flag: '🇬🇧' },
    { ru: 'Касабланка', kk: 'Касабланка', en: 'Casablanca', countryRu: 'Марокко', countryKk: 'Марокко', countryEn: 'Morocco', region: 'ma', lat: 33.57, lon: -7.58, city: 'Casablanca', flag: '🇲🇦' },
    { ru: 'Каскелен', kk: 'Қаскелең', en: 'Kaskelen', countryRu: 'Казахстан', countryKk: 'Қазақстан', countryEn: 'Kazakhstan', region: 'kz', lat: 43.19, lon: 76.62, city: 'Kaskelen', flag: '🇰🇿' },
    { ru: 'Кассель', kk: 'Кассель', en: 'Kassel', countryRu: 'Германия', countryKk: 'Германия', countryEn: 'Germany', region: 'de', lat: 51.31, lon: 9.47, city: 'Kassel', flag: '🇩🇪' },
    { ru: 'Каунас', kk: 'Каунас', en: 'Kaunas', countryRu: 'Литва', countryKk: 'Литва', countryEn: 'Lithuania', region: 'lt', lat: 54.89, lon: 23.90, city: 'Kaunas', flag: '🇱🇹' },
    { ru: 'Кейптаун', kk: 'Кейптаун', en: 'Cape Town', countryRu: 'ЮАР', countryKk: 'ОАР', countryEn: 'South Africa', region: 'za', lat: -33.92, lon: 18.42, city: 'Cape Town', flag: '🇿🇦' },
    { ru: 'Кембридж', kk: 'Кембридж', en: 'Cambridge', countryRu: 'Великобритания', countryKk: 'Ұлыбритания', countryEn: 'United Kingdom', region: 'gb', lat: 52.20, lon: 0.12, city: 'Cambridge', flag: '🇬🇧' },
    { ru: 'Кентау', kk: 'Кентау', en: 'Kentau', countryRu: 'Казахстан', countryKk: 'Қазақстан', countryEn: 'Kazakhstan', region: 'kz', lat: 43.51, lon: 68.51, city: 'Kentau', flag: '🇰🇿' },
    { ru: 'Киев', kk: 'Киев', en: 'Kyiv', countryRu: 'Украина', countryKk: 'Украина', countryEn: 'Ukraine', region: 'ua', lat: 50.45, lon: 30.52, city: 'Kyiv', flag: '🇺🇦' },
    { ru: 'Киль', kk: 'Киль', en: 'Kiel', countryRu: 'Германия', countryKk: 'Германия', countryEn: 'Germany', region: 'de', lat: 54.32, lon: 10.13, city: 'Kiel', flag: '🇩🇪' },
    { ru: 'Кишинев', kk: 'Кишинев', en: 'Chisinau', countryRu: 'Молдова', countryKk: 'Молдова', countryEn: 'Moldova', region: 'md', lat: 47.00, lon: 28.85, city: 'Chisinau', flag: '🇲🇩' },
    { ru: 'Клуж-Напока', kk: 'Клуж-Напока', en: 'Cluj-Napoca', countryRu: 'Румыния', countryKk: 'Румыния', countryEn: 'Romania', region: 'ro', lat: 46.77, lon: 23.62, city: 'Cluj-Napoca', flag: '🇷🇴' },
    { ru: 'Кокшетау', kk: 'Көкшетау', en: 'Kokshetau', countryRu: 'Казахстан', countryKk: 'Қазақстан', countryEn: 'Kazakhstan', region: 'kz', lat: 53.28, lon: 69.38, city: 'Kokshetau', flag: '🇰🇿' },
    { ru: 'Кёльн', kk: 'Кёльн', en: 'Cologne', countryRu: 'Германия', countryKk: 'Германия', countryEn: 'Germany', region: 'de', lat: 50.93, lon: 6.95, city: 'Cologne', flag: '🇩🇪' },
    { ru: 'Коломбо', kk: 'Коломбо', en: 'Colombo', countryRu: 'Шри-Ланка', countryKk: 'Шри-Ланка', countryEn: 'Sri Lanka', region: 'lk', lat: 6.92, lon: 79.86, city: 'Colombo', flag: '🇱🇰' },
    { ru: 'Копенгаген', kk: 'Копенгаген', en: 'Copenhagen', countryRu: 'Дания', countryKk: 'Дания', countryEn: 'Denmark', region: 'dk', lat: 55.67, lon: 12.56, city: 'Copenhagen', flag: '🇩🇰' },
    { ru: 'Кордова', kk: 'Кордова', en: 'Cordoba', countryRu: 'Испания', countryKk: 'Испания', countryEn: 'Spain', region: 'es', lat: 37.88, lon: -4.77, city: 'Cordoba', flag: '🇪🇸' },
    { ru: 'Костанай', kk: 'Қостанай', en: 'Kostanay', countryRu: 'Казахстан', countryKk: 'Қазақстан', countryEn: 'Kazakhstan', region: 'kz', lat: 53.21, lon: 63.63, city: 'Kostanay', flag: '🇰🇿' },
    { ru: 'Краков', kk: 'Краков', en: 'Krakow', countryRu: 'Польша', countryKk: 'Польша', countryEn: 'Poland', region: 'pl', lat: 50.06, lon: 19.94, city: 'Krakow', flag: '🇵🇱' },
    { ru: 'Краснодар', kk: 'Краснодар', en: 'Krasnodar', countryRu: 'Россия', countryKk: 'Ресей', countryEn: 'Russia', region: 'ru', lat: 45.03, lon: 38.97, city: 'Krasnodar', flag: '🇷🇺' },
    { ru: 'Красноярск', kk: 'Красноярск', en: 'Krasnoyarsk', countryRu: 'Россия', countryKk: 'Ресей', countryEn: 'Russia', region: 'ru', lat: 56.01, lon: 92.86, city: 'Krasnoyarsk', flag: '🇷🇺' },
    { ru: 'Куала-Лумпур', kk: 'Куала-Лумпур', en: 'Kuala Lumpur', countryRu: 'Малайзия', countryKk: 'Малайзия', countryEn: 'Malaysia', region: 'my', lat: 3.13, lon: 101.68, city: 'Kuala Lumpur', flag: '🇲🇾' },
    { ru: 'Кульсары', kk: 'Құльсары', en: 'Kulsary', countryRu: 'Казахстан', countryKk: 'Қазақстан', countryEn: 'Kazakhstan', region: 'kz', lat: 46.95, lon: 53.99, city: 'Kulsary', flag: '🇰🇿' },
    { ru: 'Курчатов', kk: 'Курчатов', en: 'Kurchatov', countryRu: 'Казахстан', countryKk: 'Қазақстан', countryEn: 'Kazakhstan', region: 'kz', lat: 50.75, lon: 78.53, city: 'Kurchatov', flag: '🇰🇿' },
    { ru: 'Кызылорда', kk: 'Қызылорда', en: 'Kyzylorda', countryRu: 'Казахстан', countryKk: 'Қазақстан', countryEn: 'Kazakhstan', region: 'kz', lat: 44.83, lon: 65.51, city: 'Kyzylorda', flag: '🇰🇿' },
    
    { ru: 'Лас-Вегас', kk: 'Лас-Вегас', en: 'Las Vegas', countryRu: 'США', countryKk: 'АҚШ', countryEn: 'USA', region: 'us', lat: 36.17, lon: -115.13, city: 'Las Vegas', flag: '🇺🇸' },
    { ru: 'Лейпциг', kk: 'Лейпциг', en: 'Leipzig', countryRu: 'Германия', countryKk: 'Германия', countryEn: 'Germany', region: 'de', lat: 51.33, lon: 12.37, city: 'Leipzig', flag: '🇩🇪' },
    { ru: 'Ливерпуль', kk: 'Ливерпуль', en: 'Liverpool', countryRu: 'Великобритания', countryKk: 'Ұлыбритания', countryEn: 'United Kingdom', region: 'gb', lat: 53.40, lon: -2.99, city: 'Liverpool', flag: '🇬🇧' },
    { ru: 'Лима', kk: 'Лима', en: 'Lima', countryRu: 'Перу', countryKk: 'Перу', countryEn: 'Peru', region: 'pe', lat: -12.04, lon: -77.03, city: 'Lima', flag: '🇵🇪' },
    { ru: 'Лион', kk: 'Лион', en: 'Lyon', countryRu: 'Франция', countryKk: 'Франция', countryEn: 'France', region: 'fr', lat: 45.76, lon: 4.83, city: 'Lyon', flag: '🇫🇷' },
    { ru: 'Лиссабон', kk: 'Лиссабон', en: 'Lisbon', countryRu: 'Португалия', countryKk: 'Португалия', countryEn: 'Portugal', region: 'pt', lat: 38.72, lon: -9.13, city: 'Lisbon', flag: '🇵🇹' },
    { ru: 'Лондон', kk: 'Лондон', en: 'London', countryRu: 'Великобритания', countryKk: 'Ұлыбритания', countryEn: 'United Kingdom', region: 'gb', lat: 51.50, lon: -0.12, city: 'London', flag: '🇬🇧' },
    { ru: 'Лос-Анджелес', kk: 'Лос-Анджелес', en: 'Los Angeles', countryRu: 'США', countryKk: 'АҚШ', countryEn: 'USA', region: 'us', lat: 34.05, lon: -118.24, city: 'Los Angeles', flag: '🇺🇸' },
    { ru: 'Люксембург', kk: 'Люксембург', en: 'Luxembourg', countryRu: 'Люксембург', countryKk: 'Люксембург', countryEn: 'Luxembourg', region: 'lu', lat: 49.61, lon: 6.13, city: 'Luxembourg', flag: '🇱🇺' },
    
    { ru: 'Мадрид', kk: 'Мадрид', en: 'Madrid', countryRu: 'Испания', countryKk: 'Испания', countryEn: 'Spain', region: 'es', lat: 40.41, lon: -3.70, city: 'Madrid', flag: '🇪🇸' },
    { ru: 'Майами', kk: 'Майами', en: 'Miami', countryRu: 'США', countryKk: 'АҚШ', countryEn: 'USA', region: 'us', lat: 25.76, lon: -80.19, city: 'Miami', flag: '🇺🇸' },
    { ru: 'Манила', kk: 'Манила', en: 'Manila', countryRu: 'Филиппины', countryKk: 'Филиппин', countryEn: 'Philippines', region: 'ph', lat: 14.59, lon: 120.98, city: 'Manila', flag: '🇵🇭' },
    { ru: 'Манчестер', kk: 'Манчестер', en: 'Manchester', countryRu: 'Великобритания', countryKk: 'Ұлыбритания', countryEn: 'United Kingdom', region: 'gb', lat: 53.48, lon: -2.24, city: 'Manchester', flag: '🇬🇧' },
    { ru: 'Марсель', kk: 'Марсель', en: 'Marseille', countryRu: 'Франция', countryKk: 'Франция', countryEn: 'France', region: 'fr', lat: 43.29, lon: 5.36, city: 'Marseille', flag: '🇫🇷' },
    { ru: 'Махачкала', kk: 'Махачкала', en: 'Makhachkala', countryRu: 'Россия', countryKk: 'Ресей', countryEn: 'Russia', region: 'ru', lat: 42.98, lon: 47.50, city: 'Makhachkala', flag: '🇷🇺' },
    { ru: 'Мельбурн', kk: 'Мельбурн', en: 'Melbourne', countryRu: 'Австралия', countryKk: 'Австралия', countryEn: 'Australia', region: 'au', lat: -37.81, lon: 144.96, city: 'Melbourne', flag: '🇦🇺' },
    { ru: 'Мехико', kk: 'Мехико', en: 'Mexico City', countryRu: 'Мексика', countryKk: 'Мексика', countryEn: 'Mexico', region: 'mx', lat: 19.43, lon: -99.13, city: 'Mexico City', flag: '🇲🇽' },
    { ru: 'Милан', kk: 'Милан', en: 'Milan', countryRu: 'Италия', countryKk: 'Италия', countryEn: 'Italy', region: 'it', lat: 45.46, lon: 9.18, city: 'Milan', flag: '🇮🇹' },
    { ru: 'Минск', kk: 'Минск', en: 'Minsk', countryRu: 'Беларусь', countryKk: 'Беларусь', countryEn: 'Belarus', region: 'by', lat: 53.90, lon: 27.56, city: 'Minsk', flag: '🇧🇾' },
    { ru: 'Могилев', kk: 'Могилев', en: 'Mogilev', countryRu: 'Беларусь', countryKk: 'Беларусь', countryEn: 'Belarus', region: 'by', lat: 53.89, lon: 30.33, city: 'Mogilev', flag: '🇧🇾' },
    { ru: 'Монреаль', kk: 'Монреаль', en: 'Montreal', countryRu: 'Канада', countryKk: 'Канада', countryEn: 'Canada', region: 'ca', lat: 45.50, lon: -73.56, city: 'Montreal', flag: '🇨🇦' },
    { ru: 'Москва', kk: 'Мәскеу', en: 'Moscow', countryRu: 'Россия', countryKk: 'Ресей', countryEn: 'Russia', region: 'ru', lat: 55.75, lon: 37.61, city: 'Moscow', flag: '🇷🇺' },
    { ru: 'Мумбаи', kk: 'Мумбаи', en: 'Mumbai', countryRu: 'Индия', countryKk: 'Үндістан', countryEn: 'India', region: 'in', lat: 19.07, lon: 72.87, city: 'Mumbai', flag: '🇮🇳' },
    { ru: 'Мюнхен', kk: 'Мюнхен', en: 'Munich', countryRu: 'Германия', countryKk: 'Германия', countryEn: 'Germany', region: 'de', lat: 48.13, lon: 11.58, city: 'Munich', flag: '🇩🇪' },
    
    { ru: 'Нагоя', kk: 'Нагоя', en: 'Nagoya', countryRu: 'Япония', countryKk: 'Жапония', countryEn: 'Japan', region: 'jp', lat: 35.18, lon: 136.90, city: 'Nagoya', flag: '🇯🇵' },
    { ru: 'Найроби', kk: 'Найроби', en: 'Nairobi', countryRu: 'Кения', countryKk: 'Кения', countryEn: 'Kenya', region: 'ke', lat: -1.29, lon: 36.82, city: 'Nairobi', flag: '🇰🇪' },
    { ru: 'Нант', kk: 'Нант', en: 'Nantes', countryRu: 'Франция', countryKk: 'Франция', countryEn: 'France', region: 'fr', lat: 47.21, lon: -1.55, city: 'Nantes', flag: '🇫🇷' },
    { ru: 'Неаполь', kk: 'Неаполь', en: 'Naples', countryRu: 'Италия', countryKk: 'Италия', countryEn: 'Italy', region: 'it', lat: 40.85, lon: 14.26, city: 'Naples', flag: '🇮🇹' },
    { ru: 'Нижний Новгород', kk: 'Нижний Новгород', en: 'Nizhny Novgorod', countryRu: 'Россия', countryKk: 'Ресей', countryEn: 'Russia', region: 'ru', lat: 56.32, lon: 44.00, city: 'Nizhny Novgorod', flag: '🇷🇺' },
    { ru: 'Ницца', kk: 'Ницца', en: 'Nice', countryRu: 'Франция', countryKk: 'Франция', countryEn: 'France', region: 'fr', lat: 43.70, lon: 7.26, city: 'Nice', flag: '🇫🇷' },
    { ru: 'Новосибирск', kk: 'Новосибирск', en: 'Novosibirsk', countryRu: 'Россия', countryKk: 'Ресей', countryEn: 'Russia', region: 'ru', lat: 55.00, lon: 82.93, city: 'Novosibirsk', flag: '🇷🇺' },
    { ru: 'Нью-Дели', kk: 'Нью-Дели', en: 'New Delhi', countryRu: 'Индия', countryKk: 'Үндістан', countryEn: 'India', region: 'in', lat: 28.61, lon: 77.23, city: 'New Delhi', flag: '🇮🇳' },
    { ru: 'Нью-Йорк', kk: 'Нью-Йорк', en: 'New York', countryRu: 'США', countryKk: 'АҚШ', countryEn: 'USA', region: 'us', lat: 40.71, lon: -74.00, city: 'New York', flag: '🇺🇸' },
    
    { ru: 'Одесса', kk: 'Одесса', en: 'Odesa', countryRu: 'Украина', countryKk: 'Украина', countryEn: 'Ukraine', region: 'ua', lat: 46.48, lon: 30.72, city: 'Odesa', flag: '🇺🇦' },
    { ru: 'Оксфорд', kk: 'Оксфорд', en: 'Oxford', countryRu: 'Великобритания', countryKk: 'Ұлыбритания', countryEn: 'United Kingdom', region: 'gb', lat: 51.75, lon: -1.25, city: 'Oxford', flag: '🇬🇧' },
    { ru: 'Омск', kk: 'Омск', en: 'Omsk', countryRu: 'Россия', countryKk: 'Ресей', countryEn: 'Russia', region: 'ru', lat: 54.98, lon: 73.36, city: 'Omsk', flag: '🇷🇺' },
    { ru: 'Оран', kk: 'Оран', en: 'Oran', countryRu: 'Алжир', countryKk: 'Алжир', countryEn: 'Algeria', region: 'dz', lat: 35.69, lon: -0.63, city: 'Oran', flag: '🇩🇿' },
    { ru: 'Осака', kk: 'Осака', en: 'Osaka', countryRu: 'Япония', countryKk: 'Жапония', countryEn: 'Japan', region: 'jp', lat: 34.69, lon: 135.50, city: 'Osaka', flag: '🇯🇵' },
    { ru: 'Осло', kk: 'Осло', en: 'Oslo', countryRu: 'Норвегия', countryKk: 'Норвегия', countryEn: 'Norway', region: 'no', lat: 59.91, lon: 10.75, city: 'Oslo', flag: '🇳🇴' },
    { ru: 'Отава', kk: 'Отава', en: 'Ottawa', countryRu: 'Канада', countryKk: 'Канада', countryEn: 'Canada', region: 'ca', lat: 45.42, lon: -75.69, city: 'Ottawa', flag: '🇨🇦' },
    { ru: 'Ош', kk: 'Ош', en: 'Osh', countryRu: 'Кыргызстан', countryKk: 'Қырғызстан', countryEn: 'Kyrgyzstan', region: 'kg', lat: 40.51, lon: 72.80, city: 'Osh', flag: '🇰🇬' },
    
    { ru: 'Павлодар', kk: 'Павлодар', en: 'Pavlodar', countryRu: 'Казахстан', countryKk: 'Қазақстан', countryEn: 'Kazakhstan', region: 'kz', lat: 52.30, lon: 76.95, city: 'Pavlodar', flag: '🇰🇿' },
    { ru: 'Палермо', kk: 'Палермо', en: 'Palermo', countryRu: 'Италия', countryKk: 'Италия', countryEn: 'Italy', region: 'it', lat: 38.11, lon: 13.36, city: 'Palermo', flag: '🇮🇹' },
    { ru: 'Париж', kk: 'Париж', en: 'Paris', countryRu: 'Франция', countryKk: 'Франция', countryEn: 'France', region: 'fr', lat: 48.85, lon: 2.35, city: 'Paris', flag: '🇫🇷' },
    { ru: 'Паттайя', kk: 'Паттайя', en: 'Pattaya', countryRu: 'Таиланд', countryKk: 'Таиланд', countryEn: 'Thailand', region: 'th', lat: 12.92, lon: 100.88, city: 'Pattaya', flag: '🇹🇭' },
    { ru: 'Пермь', kk: 'Пермь', en: 'Perm', countryRu: 'Россия', countryKk: 'Ресей', countryEn: 'Russia', region: 'ru', lat: 58.00, lon: 56.25, city: 'Perm', flag: '🇷🇺' },
    { ru: 'Петропавловск', kk: 'Петропавл', en: 'Petropavl', countryRu: 'Казахстан', countryKk: 'Қазақстан', countryEn: 'Kazakhstan', region: 'kz', lat: 54.87, lon: 69.15, city: 'Petropavl', flag: '🇰🇿' },
    { ru: 'Пиза', kk: 'Пиза', en: 'Pisa', countryRu: 'Италия', countryKk: 'Италия', countryEn: 'Italy', region: 'it', lat: 43.71, lon: 10.40, city: 'Pisa', flag: '🇮🇹' },
    { ru: 'Пловдив', kk: 'Пловдив', en: 'Plovdiv', countryRu: 'Болгария', countryKk: 'Болгария', countryEn: 'Bulgaria', region: 'bg', lat: 42.13, lon: 24.74, city: 'Plovdiv', flag: '🇧🇬' },
    { ru: 'Пномпень', kk: 'Пномпень', en: 'Phnom Penh', countryRu: 'Камбоджа', countryKk: 'Камбоджа', countryEn: 'Cambodia', region: 'kh', lat: 11.55, lon: 104.91, city: 'Phnom Penh', flag: '🇰🇭' },
    { ru: 'Познань', kk: 'Познань', en: 'Poznan', countryRu: 'Польша', countryKk: 'Польша', countryEn: 'Poland', region: 'pl', lat: 52.40, lon: 16.92, city: 'Poznan', flag: '🇵🇱' },
    { ru: 'Прага', kk: 'Прага', en: 'Prague', countryRu: 'Чехия', countryKk: 'Чехия', countryEn: 'Czechia', region: 'cz', lat: 50.07, lon: 14.43, city: 'Prague', flag: '🇨🇿' },
    { ru: 'Приозерск', kk: 'Приозерск', en: 'Priozersk', countryRu: 'Казахстан', countryKk: 'Қазақстан', countryEn: 'Kazakhstan', region: 'kz', lat: 46.02, lon: 73.70, city: 'Priozersk', flag: '🇰🇿' },
    { ru: 'Пхукет', kk: 'Пхукет', en: 'Phuket', countryRu: 'Таиланд', countryKk: 'Таиланд', countryEn: 'Thailand', region: 'th', lat: 7.88, lon: 98.39, city: 'Phuket', flag: '🇹🇭' },
    
    { ru: 'Рабат', kk: 'Рабат', en: 'Rabat', countryRu: 'Марокко', countryKk: 'Марокко', countryEn: 'Morocco', region: 'ma', lat: 34.02, lon: -6.83, city: 'Rabat', flag: '🇲🇦' },
    { ru: 'Рейкьявик', kk: 'Рейкьявик', en: 'Reykjavik', countryRu: 'Исландия', countryKk: 'Исландия', countryEn: 'Iceland', region: 'is', lat: 64.14, lon: -21.94, city: 'Reykjavik', flag: '🇮🇸' },
    { ru: 'Рига', kk: 'Рига', en: 'Riga', countryRu: 'Латвия', countryKk: 'Латвия', countryEn: 'Latvia', region: 'lv', lat: 56.94, lon: 24.10, city: 'Riga', flag: '🇱🇻' },
    { ru: 'Риддер', kk: 'Риддер', en: 'Ridder', countryRu: 'Казахстан', countryKk: 'Қазақстан', countryEn: 'Kazakhstan', region: 'kz', lat: 50.34, lon: 83.51, city: 'Ridder', flag: '🇰🇿' },
    { ru: 'Рим', kk: 'Рим', en: 'Rome', countryRu: 'Италия', countryKk: 'Италия', countryEn: 'Italy', region: 'it', lat: 41.90, lon: 12.49, city: 'Rome', flag: '🇮🇹' },
    { ru: 'Рио-де-Жанейро', kk: 'Рио-де-Жанейро', en: 'Rio de Janeiro', countryRu: 'Бразилия', countryKk: 'Бразилия', countryEn: 'Brazil', region: 'br', lat: -22.90, lon: -43.17, city: 'Rio de Janeiro', flag: '🇧🇷' },
    { ru: 'Ростов-на-Дону', kk: 'Ростов-на-Дону', en: 'Rostov-on-Don', countryRu: 'Россия', countryKk: 'Ресей', countryEn: 'Russia', region: 'ru', lat: 47.23, lon: 39.70, city: 'Rostov-on-Don', flag: '🇷🇺' },
    { ru: 'Роттердам', kk: 'Роттердам', en: 'Rotterdam', countryRu: 'Нидерланды', countryKk: 'Нидерланд', countryEn: 'Netherlands', region: 'nl', lat: 51.92, lon: 4.47, city: 'Rotterdam', flag: '🇳🇱' },
    
    { ru: 'Самара', kk: 'Самара', en: 'Samara', countryRu: 'Россия', countryKk: 'Ресей', countryEn: 'Russia', region: 'ru', lat: 53.20, lon: 50.15, city: 'Samara', flag: '🇷🇺' },
    { ru: 'Самарканд', kk: 'Самарқан', en: 'Samarkand', countryRu: 'Узбекистан', countryKk: 'Өзбекстан', countryEn: 'Uzbekistan', region: 'uz', lat: 39.65, lon: 66.95, city: 'Samarkand', flag: '🇺🇿' },
    { ru: 'Сан-Франциско', kk: 'Сан-Франциско', en: 'San Francisco', countryRu: 'США', countryKk: 'АҚШ', countryEn: 'USA', region: 'us', lat: 37.77, lon: -122.41, city: 'San Francisco', flag: '🇺🇸' },
    { ru: 'Санкт-Петербург', kk: 'Санкт-Петербург', en: 'Saint Petersburg', countryRu: 'Россия', countryKk: 'Ресей', countryEn: 'Russia', region: 'ru', lat: 59.93, lon: 30.33, city: 'Saint Petersburg', flag: '🇷🇺' },
    { ru: 'Сантьяго', kk: 'Сантьяго', en: 'Santiago', countryRu: 'Чили', countryKk: 'Чили', countryEn: 'Chile', region: 'cl', lat: -33.44, lon: -70.66, city: 'Santiago', flag: '🇨🇱' },
    { ru: 'Сарань', kk: 'Саран', en: 'Saran', countryRu: 'Казахстан', countryKk: 'Қазақстан', countryEn: 'Kazakhstan', region: 'kz', lat: 49.79, lon: 72.85, city: 'Saran', flag: '🇰🇿' },
    { ru: 'Сарканд', kk: 'Сарқан', en: 'Sarkand', countryRu: 'Казахстан', countryKk: 'Қазақстан', countryEn: 'Kazakhstan', region: 'kz', lat: 45.40, lon: 79.91, city: 'Sarkand', flag: '🇰🇿' },
    { ru: 'Сарыагаш', kk: 'Сарыағаш', en: 'Saryagash', countryRu: 'Казахстан', countryKk: 'Қазақстан', countryEn: 'Kazakhstan', region: 'kz', lat: 41.45, lon: 69.17, city: 'Saryagash', flag: '🇰🇿' },
    { ru: 'Сатпаев', kk: 'Сәтбаев', en: 'Satpayev', countryRu: 'Казахстан', countryKk: 'Қазақстан', countryEn: 'Kazakhstan', region: 'kz', lat: 47.90, lon: 67.54, city: 'Satpayev', flag: '🇰🇿' },
    { ru: 'Севилья', kk: 'Севилья', en: 'Seville', countryRu: 'Испания', countryKk: 'Испания', countryEn: 'Spain', region: 'es', lat: 37.38, lon: -5.98, city: 'Seville', flag: '🇪🇸' },
    { ru: 'Семей', kk: 'Семей', en: 'Semey', countryRu: 'Казахстан', countryKk: 'Қазақстан', countryEn: 'Kazakhstan', region: 'kz', lat: 50.41, lon: 80.22, city: 'Semey', flag: '🇰🇿' },
    { ru: 'Сеул', kk: 'Сеул', en: 'Seoul', countryRu: 'Южная Корея', countryKk: 'Оңтүстік Корея', countryEn: 'South Korea', region: 'kr', lat: 37.56, lon: 126.97, city: 'Seoul', flag: '🇰🇷' },
    { ru: 'Сидней', kk: 'Сидней', en: 'Sydney', countryRu: 'Австралия', countryKk: 'Австралия', countryEn: 'Australia', region: 'au', lat: -33.86, lon: 151.20, city: 'Sydney', flag: '🇦🇺' },
    { ru: 'Сингапур', kk: 'Сингапур', en: 'Singapore', countryRu: 'Сингапур', countryKk: 'Сингапур', countryEn: 'Singapore', region: 'sg', lat: 1.35, lon: 103.81, city: 'Singapore', flag: '🇸🇬' },
    { ru: 'София', kk: 'София', en: 'Sofia', countryRu: 'Болгария', countryKk: 'Болгария', countryEn: 'Bulgaria', region: 'bg', lat: 42.69, lon: 23.32, city: 'Sofia', flag: '🇧🇬' },
    { ru: 'Сочи', kk: 'Сочи', en: 'Sochi', countryRu: 'Россия', countryKk: 'Ресей', countryEn: 'Russia', region: 'ru', lat: 43.60, lon: 39.73, city: 'Sochi', flag: '🇷🇺' },
    { ru: 'Стокгольм', kk: 'Стокгольм', en: 'Stockholm', countryRu: 'Швеция', countryKk: 'Швеция', countryEn: 'Sweden', region: 'se', lat: 59.32, lon: 18.06, city: 'Stockholm', flag: '🇸🇪' },
    { ru: 'Страсбург', kk: 'Страсбург', en: 'Strasbourg', countryRu: 'Франция', countryKk: 'Франция', countryEn: 'France', region: 'fr', lat: 48.57, lon: 7.75, city: 'Strasbourg', flag: '🇫🇷' },
    
    { ru: 'Таврийск', kk: 'Таврийск', en: 'Tavriisk', countryRu: 'Украина', countryKk: 'Украина', countryEn: 'Ukraine', region: 'ua', lat: 46.75, lon: 33.42, city: 'Tavriisk', flag: '🇺🇦' },
    { ru: 'Тайбэй', kk: 'Тайбэй', en: 'Taipei', countryRu: 'Тайвань', countryKk: 'Тайвань', countryEn: 'Taiwan', region: 'tw', lat: 25.03, lon: 121.56, city: 'Taipei', flag: '🇹🇼' },
    { ru: 'Талдыкорган', kk: 'Талдықорған', en: 'Taldykorgan', countryRu: 'Казахстан', countryKk: 'Қазақстан', countryEn: 'Kazakhstan', region: 'kz', lat: 45.01, lon: 78.37, city: 'Taldykorgan', flag: '🇰🇿' },
    { ru: 'Талгар', kk: 'Талғар', en: 'Talgar', countryRu: 'Казахстан', countryKk: 'Қазақстан', countryEn: 'Kazakhstan', region: 'kz', lat: 43.30, lon: 77.24, city: 'Talgar', flag: '🇰🇿' },
    { ru: 'Таллин', kk: 'Таллин', en: 'Tallinn', countryRu: 'Эстония', countryKk: 'Эстония', countryEn: 'Estonia', region: 'ee', lat: 59.43, lon: 24.75, city: 'Tallinn', flag: '🇪🇪' },
    { ru: 'Тараз', kk: 'Тараз', en: 'Taraz', countryRu: 'Казахстан', countryKk: 'Қазақстан', countryEn: 'Kazakhstan', region: 'kz', lat: 42.90, lon: 71.36, city: 'Taraz', flag: '🇰🇿' },
    { ru: 'Ташкент', kk: 'Ташкент', en: 'Tashkent', countryRu: 'Узбекистан', countryKk: 'Өзбекстан', countryEn: 'Uzbekistan', region: 'uz', lat: 41.29, lon: 69.24, city: 'Tashkent', flag: '🇺🇿' },
    { ru: 'Тбилиси', kk: 'Тбилиси', en: 'Tbilisi', countryRu: 'Грузия', countryKk: 'Грузия', countryEn: 'Georgia', region: 'ge', lat: 41.71, lon: 44.78, city: 'Tbilisi', flag: '🇬🇪' },
    { ru: 'Тегеран', kk: 'Тегеран', en: 'Tehran', countryRu: 'Иран', countryKk: 'Иран', countryEn: 'Iran', region: 'ir', lat: 35.68, lon: 51.38, city: 'Tehran', flag: '🇮🇷' },
    { ru: 'Тель-Авив', kk: 'Тель-Авив', en: 'Tel Aviv', countryRu: 'Израиль', countryKk: 'Израиль', countryEn: 'Israel', region: 'il', lat: 32.08, lon: 34.78, city: 'Tel Aviv', flag: '🇮🇱' },
    { ru: 'Текели', kk: 'Текелі', en: 'Tekeli', countryRu: 'Казахстан', countryKk: 'Қазақстан', countryEn: 'Kazakhstan', region: 'kz', lat: 44.86, lon: 78.82, city: 'Tekeli', flag: '🇰🇿' },
    { ru: 'Тирасполь', kk: 'Тирасполь', en: 'Tiraspol', countryRu: 'Молдова', countryKk: 'Молдова', countryEn: 'Moldova', region: 'md', lat: 46.84, lon: 29.64, city: 'Tiraspol', flag: '🇲🇩' },
    { ru: 'Токио', kk: 'Токио', en: 'Tokyo', countryRu: 'Япония', countryKk: 'Жапония', countryEn: 'Japan', region: 'jp', lat: 35.67, lon: 139.65, city: 'Tokyo', flag: '🇯🇵' },
    { ru: 'Торонто', kk: 'Торонто', en: 'Toronto', countryRu: 'Канада', countryKk: 'Канада', countryEn: 'Canada', region: 'ca', lat: 43.65, lon: -79.38, city: 'Toronto', flag: '🇨🇦' },
    { ru: 'Тулча', kk: 'Тулча', en: 'Tulcea', countryRu: 'Румыния', countryKk: 'Румыния', countryEn: 'Romania', region: 'ro', lat: 45.17, lon: 28.80, city: 'Tulcea', flag: '🇷🇴' },
    { ru: 'Турин', kk: 'Турин', en: 'Turin', countryRu: 'Италия', countryKk: 'Италия', countryEn: 'Italy', region: 'it', lat: 45.07, lon: 7.68, city: 'Turin', flag: '🇮🇹' },
    { ru: 'Туркестан', kk: 'Түркістан', en: 'Turkistan', countryRu: 'Казахстан', countryKk: 'Қазақстан', countryEn: 'Kazakhstan', region: 'kz', lat: 43.30, lon: 68.27, city: 'Turkistan', flag: '🇰🇿' },
    
    { ru: 'Уилмингтон', kk: 'Уилмингтон', en: 'Wilmington', countryRu: 'США', countryKk: 'АҚШ', countryEn: 'USA', region: 'us', lat: 34.22, lon: -77.94, city: 'Wilmington', flag: '🇺🇸' },
    { ru: 'Улан-Батор', kk: 'Ұланбатыр', en: 'Ulaanbaatar', countryRu: 'Монголия', countryKk: 'Моңғолия', countryEn: 'Mongolia', region: 'mn', lat: 47.88, lon: 106.89, city: 'Ulaanbaatar', flag: '🇲🇳' },
    { ru: 'Ульсан', kk: 'Ульсан', en: 'Ulsan', countryRu: 'Южная Корея', countryKk: 'Оңтүстік Корея', countryEn: 'South Korea', region: 'kr', lat: 35.53, lon: 129.31, city: 'Ulsan', flag: '🇰🇷' },
    { ru: 'Уральск', kk: 'Орал', en: 'Uralsk', countryRu: 'Казахстан', countryKk: 'Қазақстан', countryEn: 'Kazakhstan', region: 'kz', lat: 51.23, lon: 51.37, city: 'Uralsk', flag: '🇰🇿' },
    { ru: 'Урджар', kk: 'Үржар', en: 'Urdzhar', countryRu: 'Казахстан', countryKk: 'Қазақстан', countryEn: 'Kazakhstan', region: 'kz', lat: 47.09, lon: 81.62, city: 'Urdzhar', flag: '🇰🇿' },
    { ru: 'Урумчи', kk: 'Үрімші', en: 'Urumqi', countryRu: 'Китай', countryKk: 'Қытай', countryEn: 'China', region: 'cn', lat: 43.82, lon: 87.61, city: 'Urumqi', flag: '🇨🇳' },
    { ru: 'Усть-Каменогорск', kk: 'Өскемен', en: 'Oskemen', countryRu: 'Казахстан', countryKk: 'Қазақстан', countryEn: 'Kazakhstan', region: 'kz', lat: 49.95, lon: 82.60, city: 'Oskemen', flag: '🇰🇿' },
    { ru: 'Ушарал', kk: 'Үшарал', en: 'Usharal', countryRu: 'Казахстан', countryKk: 'Қазақстан', countryEn: 'Kazakhstan', region: 'kz', lat: 46.16, lon: 80.93, city: 'Usharal', flag: '🇰🇿' },
    { ru: 'Уштобе', kk: 'Үштөбе', en: 'Ushtobe', countryRu: 'Казахстан', countryKk: 'Қазақстан', countryEn: 'Kazakhstan', region: 'kz', lat: 45.25, lon: 77.98, city: 'Ushtobe', flag: '🇰🇿' },
    
    { ru: 'Франкфурт', kk: 'Франкфурт', en: 'Frankfurt', countryRu: 'Германия', countryKk: 'Германия', countryEn: 'Germany', region: 'de', lat: 50.11, lon: 8.68, city: 'Frankfurt', flag: '🇩🇪' },
    { ru: 'Флоренция', kk: 'Флоренция', en: 'Florence', countryRu: 'Италия', countryKk: 'Италия', countryEn: 'Italy', region: 'it', lat: 43.76, lon: 11.25, city: 'Florence', flag: '🇮🇹' },
    { ru: 'Филадельфия', kk: 'Филадельфия', en: 'Philadelphia', countryRu: 'США', countryKk: 'АҚШ', countryEn: 'USA', region: 'us', lat: 39.95, lon: -75.16, city: 'Philadelphia', flag: '🇺🇸' },
    { ru: 'Феодосия', kk: 'Феодосия', en: 'Feodosiya', countryRu: 'Украина', countryKk: 'Украина', countryEn: 'Ukraine', region: 'ua', lat: 45.03, lon: 35.38, city: 'Feodosiya', flag: '🇺🇦' },
    { ru: 'Форт-Уэрт', kk: 'Форт-Уэрт', en: 'Fort Worth', countryRu: 'США', countryKk: 'АҚШ', countryEn: 'USA', region: 'us', lat: 32.75, lon: -97.33, city: 'Fort Worth', flag: '🇺🇸' },
    { ru: 'Фукуока', kk: 'Фукуока', en: 'Fukuoka', countryRu: 'Япония', countryKk: 'Жапония', countryEn: 'Japan', region: 'jp', lat: 33.59, lon: 130.40, city: 'Fukuoka', flag: '🇯🇵' },
    
    { ru: 'Хайфа', kk: 'Хайфа', en: 'Haifa', countryRu: 'Израиль', countryKk: 'Израиль', countryEn: 'Israel', region: 'il', lat: 32.81, lon: 34.98, city: 'Haifa', flag: '🇮🇱' },
    { ru: 'Ханчжоу', kk: 'Ханчжоу', en: 'Hangzhou', countryRu: 'Китай', countryKk: 'Қытай', countryEn: 'China', region: 'cn', lat: 30.27, lon: 120.15, city: 'Hangzhou', flag: '🇨🇳' },
    { ru: 'Ханой', kk: 'Ханой', en: 'Hanoi', countryRu: 'Вьетнам', countryKk: 'Вьетнам', countryEn: 'Vietnam', region: 'vn', lat: 21.02, lon: 105.83, city: 'Hanoi', flag: '🇻🇳' },
    { ru: 'Харьков', kk: 'Харьков', en: 'Kharkiv', countryRu: 'Украина', countryKk: 'Украина', countryEn: 'Ukraine', region: 'ua', lat: 49.99, lon: 36.23, city: 'Kharkiv', flag: '🇺🇦' },
    { ru: 'Хельсинки', kk: 'Хельсинки', en: 'Helsinki', countryRu: 'Финляндия', countryKk: 'Финляндия', countryEn: 'Finland', region: 'fi', lat: 60.16, lon: 24.93, city: 'Helsinki', flag: '🇫🇮' },
    { ru: 'Хиросима', kk: 'Хиросима', en: 'Hiroshima', countryRu: 'Япония', countryKk: 'Жапония', countryEn: 'Japan', region: 'jp', lat: 34.38, lon: 132.45, city: 'Hiroshima', flag: '🇯🇵' },
    { ru: 'Хьюстон', kk: 'Хьюстон', en: 'Houston', countryRu: 'США', countryKk: 'АҚШ', countryEn: 'USA', region: 'us', lat: 29.76, lon: -95.36, city: 'Houston', flag: '🇺🇸' },
    { ru: 'Хромтау', kk: 'Хромтау', en: 'Khromtau', countryRu: 'Казахстан', countryKk: 'Қазақстан', countryEn: 'Kazakhstan', region: 'kz', lat: 50.25, lon: 58.43, city: 'Khromtau', flag: '🇰🇿' },
    
    { ru: 'Цюрих', kk: 'Цюрих', en: 'Zurich', countryRu: 'Швейцария', countryKk: 'Швейцария', countryEn: 'Switzerland', region: 'ch', lat: 47.37, lon: 8.54, city: 'Zurich', flag: '🇨🇭' },
    { ru: 'Цинциннати', kk: 'Цинциннати', en: 'Cincinnati', countryRu: 'США', countryKk: 'АҚШ', countryEn: 'USA', region: 'us', lat: 39.10, lon: -84.51, city: 'Cincinnati', flag: '🇺🇸' },
    { ru: 'Цзинань', kk: 'Цзинань', en: 'Jinan', countryRu: 'Китай', countryKk: 'Қытай', countryEn: 'China', region: 'cn', lat: 36.65, lon: 117.00, city: 'Jinan', flag: '🇨🇳' },
    
    { ru: 'Чарльзтаун', kk: 'Чарльзтаун', en: 'Charlestown', countryRu: 'Сент-Китс и Невис', countryKk: 'Сент-Китс және Невис', countryEn: 'Saint Kitts and Nevis', region: 'kn', lat: 17.14, lon: -62.62, city: 'Charlestown', flag: '🇰🇳' },
    { ru: 'Челябинск', kk: 'Челябинск', en: 'Chelyabinsk', countryRu: 'Россия', countryKk: 'Ресей', countryEn: 'Russia', region: 'ru', lat: 55.15, lon: 61.42, city: 'Chelyabinsk', flag: '🇷🇺' },
    { ru: 'Ченнаи', kk: 'Ченнаи', en: 'Chennai', countryRu: 'Индия', countryKk: 'Үндістан', countryEn: 'India', region: 'in', lat: 13.08, lon: 80.27, city: 'Chennai', flag: '🇮🇳' },
    { ru: 'Чикаго', kk: 'Чикаго', en: 'Chicago', countryRu: 'США', countryKk: 'АҚШ', countryEn: 'USA', region: 'us', lat: 41.87, lon: -87.62, city: 'Chicago', flag: '🇺🇸' },
    { ru: 'Чимкент (Шымкент)', kk: 'Шымкент', en: 'Shymkent', countryRu: 'Казахстан', countryKk: 'Қазақстан', countryEn: 'Kazakhstan', region: 'kz', lat: 42.32, lon: 69.59, city: 'Shymkent', flag: '🇰🇿' },
    { ru: 'Чонджу', kk: 'Чонджу', en: 'Jeonju', countryRu: 'Южная Корея', countryKk: 'Оңтүстік Корея', countryEn: 'South Korea', region: 'kr', lat: 35.82, lon: 127.14, city: 'Jeonju', flag: '🇰🇷' },
    { ru: 'Чу (Шу)', kk: 'Шу', en: 'Shu', countryRu: 'Казахстан', countryKk: 'Қазақстан', countryEn: 'Kazakhstan', region: 'kz', lat: 43.59, lon: 73.59, city: 'Shu', flag: '🇰🇿' },
    { ru: 'Чунцин', kk: 'Чунцин', en: 'Chongqing', countryRu: 'Китай', countryKk: 'Қытай', countryEn: 'China', region: 'cn', lat: 29.56, lon: 106.55, city: 'Chongqing', flag: '🇨🇳' },
    
    { ru: 'Шанхай', kk: 'Шанхай', en: 'Shanghai', countryRu: 'Китай', countryKk: 'Қытай', countryEn: 'China', region: 'cn', lat: 31.23, lon: 121.47, city: 'Shanghai', flag: '🇨🇳' },
    { ru: 'Шарджа', kk: 'Шарджа', en: 'Sharjah', countryRu: 'ОАЭ', countryKk: 'БАӘ', countryEn: 'UAE', region: 'ae', lat: 25.35, lon: 55.40, city: 'Sharjah', flag: '🇦🇪' },
    { ru: 'Шарлотт', kk: 'Шарлотт', en: 'Charlotte', countryRu: 'США', countryKk: 'АҚШ', countryEn: 'USA', region: 'us', lat: 35.22, lon: -80.84, city: 'Charlotte', flag: '🇺🇸' },
    { ru: 'Шарм-эль-Шейх', kk: 'Шарм-эль-Шейх', en: 'Sharm el-Sheikh', countryRu: 'Египет', countryKk: 'Мысыр', countryEn: 'Egypt', region: 'eg', lat: 27.91, lon: 34.32, city: 'Sharm el-Sheikh', flag: '🇪🇬' },
    { ru: 'Шеффилд', kk: 'Шеффилд', en: 'Sheffield', countryRu: 'Великобритания', countryKk: 'Ұлыбритания', countryEn: 'United Kingdom', region: 'gb', lat: 53.38, lon: -1.47, city: 'Sheffield', flag: '🇬🇧' },
    { ru: 'Шиели', kk: 'Шиелі', en: 'Shieli', countryRu: 'Казахстан', countryKk: 'Қазақстан', countryEn: 'Kazakhstan', region: 'kz', lat: 44.17, lon: 66.74, city: 'Shieli', flag: '🇰🇿' },
    { ru: 'Шлкар', kk: 'Шалқар', en: 'Shalkar', countryRu: 'Казахстан', countryKk: 'Қазақстан', countryEn: 'Kazakhstan', region: 'kz', lat: 47.83, lon: 59.61, city: 'Shalkar', flag: '🇰🇿' },
    { ru: 'Шортанды', kk: 'Шортанды', en: 'Shortandy', countryRu: 'Казахстан', countryKk: 'Қазақстан', countryEn: 'Kazakhstan', region: 'kz', lat: 51.70, lon: 70.99, city: 'Shortandy', flag: '🇰🇿' },
    { ru: 'Штутгарт', kk: 'Штутгарт', en: 'Stuttgart', countryRu: 'Германия', countryKk: 'Германия', countryEn: 'Germany', region: 'de', lat: 48.77, lon: 9.18, city: 'Stuttgart', flag: '🇩🇪' },
    { ru: 'Шымкент', kk: 'Шымкент', en: 'Shymkent', countryRu: 'Казахстан', countryKk: 'Қазақстан', countryEn: 'Kazakhstan', region: 'kz', lat: 42.32, lon: 69.59, city: 'Shymkent', flag: '🇰🇿' },
    
    { ru: 'Щучинск', kk: 'Щучинск', en: 'Shchuchinsk', countryRu: 'Казахстан', countryKk: 'Қазақстан', countryEn: 'Kazakhstan', region: 'kz', lat: 52.93, lon: 70.20, city: 'Shchuchinsk', flag: '🇰🇿' },
    
    { ru: 'Эдинбург', kk: 'Эдинбург', en: 'Edinburgh', countryRu: 'Великобритания', countryKk: 'Ұлыбритания', countryEn: 'United Kingdom', region: 'gb', lat: 55.95, lon: -3.18, city: 'Edinburgh', flag: '🇬🇧' },
    { ru: 'Эйндховен', kk: 'Эйндховен', en: 'Eindhoven', countryRu: 'Нидерланды', countryKk: 'Нидерланд', countryEn: 'Netherlands', region: 'nl', lat: 51.44, lon: 5.46, city: 'Eindhoven', flag: '🇳🇱' },
    { ru: 'Эль-Кувейт', kk: 'Әл-Кувейт', en: 'Kuwait City', countryRu: 'Кувейт', countryKk: 'Кувейт', countryEn: 'Kuwait', region: 'kw', lat: 29.37, lon: 47.97, city: 'Kuwait City', flag: '🇰🇼' },
    { ru: 'Эмба', kk: 'Ембі', en: 'Emba', countryRu: 'Казахстан', countryKk: 'Қазақстан', countryEn: 'Kazakhstan', region: 'kz', lat: 48.82, lon: 57.38, city: 'Emba', flag: '🇰🇿' },
    { ru: 'Эр-Рияд', kk: 'Эр-Рияд', en: 'Riyadh', countryRu: 'Саудовская Аравия', countryKk: 'Сауд Арабиясы', countryEn: 'Saudi Arabia', region: 'sa', lat: 24.71, lon: 46.67, city: 'Riyadh', flag: '🇸🇦' },
    { ru: 'Эссен', kk: 'Эссен', en: 'Essen', countryRu: 'Германия', countryKk: 'Германия', countryEn: 'Germany', region: 'de', lat: 51.45, lon: 7.01, city: 'Essen', flag: '🇩🇪' },
    
    { ru: 'Южно-Сахалинск', kk: 'Южно-Сахалинск', en: 'Yuzhno-Sakhalinsk', countryRu: 'Россия', countryKk: 'Ресей', countryEn: 'Russia', region: 'ru', lat: 46.95, lon: 142.73, city: 'Yuzhno-Sakhalinsk', flag: '🇷🇺' },
    
    { ru: 'Якутск', kk: 'Якутск', en: 'Yakutsk', countryRu: 'Россия', countryKk: 'Ресей', countryEn: 'Russia', region: 'ru', lat: 62.03, lon: 129.73, city: 'Yakutsk', flag: '🇷🇺' },
    { ru: 'Ялта', kk: 'Ялта', en: 'Yalta', countryRu: 'Украина', countryKk: 'Украина', countryEn: 'Ukraine', region: 'ua', lat: 44.49, lon: 34.16, city: 'Yalta', flag: '🇺🇦' },
    { ru: 'Яньчэн', kk: 'Яньчэн', en: 'Yancheng', countryRu: 'Китай', countryKk: 'Қытай', countryEn: 'China', region: 'cn', lat: 33.34, lon: 120.15, city: 'Yancheng', flag: '🇨🇳' },
    { ru: 'Ярославль', kk: 'Ярославль', en: 'Yaroslavl', countryRu: 'Россия', countryKk: 'Ресей', countryEn: 'Russia', region: 'ru', lat: 57.62, lon: 39.87, city: 'Yaroslavl', flag: '🇷🇺' }
];

    /* ── 3. ПОГОДА: WMO коды ── */
    const WMO_ICON = {0:'☀️',1:'🌤️',2:'⛅',3:'☁️',45:'🌫️',48:'🌫️',51:'🌦️',53:'🌦️',55:'🌧️',61:'🌧️',63:'🌧️',65:'🌧️',71:'❄️',73:'❄️',75:'❄️',77:'🌨️',80:'🌦️',81:'🌧️',82:'⛈️',85:'🌨️',86:'🌨️',95:'⛈️',96:'⛈️',99:'⛈️'};
    const WMO_DESC = {0:'Ясно',1:'Преим. ясно',2:'Переменная облачность',3:'Облачно',45:'Туман',48:'Туман с инеем',51:'Морось',53:'Морось',55:'Сильная морось',61:'Небольшой дождь',63:'Умеренный дождь',65:'Ливень',71:'Лёгкий снег',73:'Снег',75:'Сильный снег',77:'Снежная крупа',80:'Ливень',81:'Ливень',82:'Сильный ливень',85:'Снегопад',86:'Сильный снегопад',95:'Гроза',96:'Гроза с градом',99:'Гроза с крупным градом'};

    function cpTempColor(t) {
        if (t <= 0)  return '#7ee8fa';
        if (t <= 10) return '#6ab8e8';
        if (t <= 20) return '#56c96e';
        if (t <= 30) return '#f5c842';
        return '#ff6b6b';
    }

    async function cpFetchWeather(lat, lon) {
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weathercode,windspeed_10m,relativehumidity_2m&wind_speed_unit=kmh&timezone=auto`;
        const r = await fetch(url);
        if (!r.ok) throw new Error('err');
        return r.json();
    }

    /* ── 4. РЕНДЕР ПОПУЛЯРНЫХ ── */
    async function cpLoadPopular() {
        const grid = document.getElementById('cp-popular-grid');
        const results = await Promise.allSettled(
            CP_POPULAR.map(p => cpFetchWeather(p.lat, p.lon))
        );
        grid.innerHTML = '';
        results.forEach((res, i) => {
            const p = CP_POPULAR[i];
            const card = document.createElement('div');
            card.className = 'cp-city-card';
            card.dataset.region = p.region;
            card.style.animationDelay = (i * 0.05) + 's';

            const loc = cpPopularName(p);
            const t18n = (typeof getTranslation === 'function') ? getTranslation : (k => k);
            if (res.status === 'fulfilled') {
                const c   = res.value.current;
                const t   = Math.round(c.temperature_2m);
                const wc  = c.weathercode;
                const ico = WMO_ICON[wc] || '🌡️';
                const dsc = WMO_DESC[wc] || '—';
                const wnd = Math.round(c.windspeed_10m);
                const hum = c.relativehumidity_2m;
                card.innerHTML = `
                    <div class="cp-card-top">
                        <div>
                            <div class="cp-card-name">${p.flag} ${loc.name}</div>
                            <div class="cp-card-country">${loc.country}</div>
                        </div>
                        <span class="cp-card-icon">${ico}</span>
                    </div>
                    <div class="cp-card-mid">
                        <span class="cp-card-temp" style="color:${cpTempColor(t)}">${t>0?'+':''}${t}°</span>
                        <span class="cp-card-desc">${dsc}</span>
                    </div>
                    <div class="cp-card-meta">
                        <span>💨 ${wnd} км/ч</span>
                        <span>💧 ${hum}%</span>
                    </div>
                    <a href="../index.html?city=${p.city}" class="cp-card-link">
                        ${t18n('view-forecast')}
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                    </a>`;
            } else {
                card.innerHTML = `
                    <div class="cp-card-top">
                        <div>
                            <div class="cp-card-name">${p.flag} ${loc.name}</div>
                            <div class="cp-card-country">${loc.country}</div>
                        </div>
                        <span class="cp-card-icon">🌡️</span>
                    </div>
                    <p class="cp-card-error" style="margin:8px 0">${t18n('no-weather-data') || '—'}</p>
                    <a href="../index.html?city=${p.city}" class="cp-card-link">
                        ${t18n('view-forecast')}
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                    </a>`;
            }
            grid.appendChild(card);
        });
    }

    /* ── 5. АЛФАВИТНЫЙ СПИСОК ── */
    function cpBuildAlpha() {
        const lang = (typeof getCurrentLang === 'function' ? getCurrentLang() : null)
                   || document.documentElement.lang
                   || localStorage.getItem('lang')
                   || 'ru';
        const t18n = (typeof getTranslation === 'function') ? getTranslation : (k => k);
        // Choose display field: all cities have ru and en; use ru for kk/ru, en for en
        const nameField = (lang === 'en') ? 'en' : 'ru';
        const sorted = [...CP_ALL].sort((a, b) => a[nameField].localeCompare(b[nameField], lang));
        const groups = {};
        sorted.forEach(c => {
            const letter = c[nameField][0].toUpperCase();
            if (!groups[letter]) groups[letter] = [];
            groups[letter].push(c);
        });
        const letters = Object.keys(groups).sort((a, b) => a.localeCompare(b, lang));

        const totalCount = sorted.length;
        const countKey = 'cities-count-text';
        const countText = t18n(countKey) || '{count} городов';
        document.getElementById('cp-total-badge').textContent = countText.replace('{count}', totalCount);

        const nav = document.getElementById('cp-alpha-nav');
        const container = document.getElementById('cp-alpha-container');

        letters.forEach((l, idx) => {
            // Кнопка
            const btn = document.createElement('button');
            btn.className = 'cp-letter-btn' + (idx === 0 ? ' active' : '');
            btn.dataset.letter = l;
            btn.textContent = l;
            btn.addEventListener('click', () => cpShowLetter(l));
            nav.appendChild(btn);

            // Группа
            const group = document.createElement('div');
            group.className = 'cp-alpha-group' + (idx === 0 ? ' visible' : '');
            group.dataset.letter = l;

            const badge = document.createElement('div');
            badge.className = 'cp-letter-badge';
            badge.textContent = l;
            group.appendChild(badge);

            const ul = document.createElement('ul');
            ul.className = 'cp-cities-list';
            groups[l].forEach(c => {
                ul.innerHTML += `<li><a href="../index.html?city=${c.en}">${c[nameField]}<span class="cp-list-country">${c.flag || '🌍'}</span></a></li>`;
            });
            group.appendChild(ul);
            container.appendChild(group);
        });
    }

    function cpShowLetter(letter) {
        document.querySelectorAll('.cp-letter-btn').forEach(b =>
            b.classList.toggle('active', b.dataset.letter === letter));
        document.querySelectorAll('.cp-alpha-group').forEach(g =>
            g.classList.toggle('visible', g.dataset.letter === letter));
        // плавный скролл к алфавитной секции
        document.getElementById('cp-alpha-nav').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    /* ── 6. ПОИСК ── */
    function cpInitSearch() {
        const input = document.getElementById('cp-search');
        const dd    = document.getElementById('cp-dropdown');
        const btn   = document.getElementById('cp-search-btn');

        input.addEventListener('input', () => {
            const q = input.value.trim().toLowerCase();
            dd.innerHTML = '';
            if (q.length < 2) { dd.classList.add('hidden'); return; }

            const searchLang = (typeof getCurrentLang === 'function' ? getCurrentLang() : null)
                || document.documentElement.lang
                || localStorage.getItem('lang')
                || 'ru';
            const searchField = (searchLang === 'en') ? 'en' : 'ru';
            const hits = CP_ALL.filter(c =>
                c.ru.toLowerCase().includes(q) ||
                c.en.toLowerCase().includes(q) ||
                c.country.toLowerCase().includes(q)
            ).slice(0, 12);

            if (!hits.length) { dd.classList.add('hidden'); return; }

            hits.forEach(c => {
                const div = document.createElement('div');
                div.className = 'cp-dropdown-item';
                div.innerHTML = `<span class="cp-item-flag">${c.flag || '📍'}</span><span class="cp-dd-city" style="flex:1">${c[searchField]}</span>`;
                div.addEventListener('click', () => { window.location.href = `../index.html?city=${c.en}`; });
                dd.appendChild(div);
            });
            dd.classList.remove('hidden');
        });

        if (btn) {
            btn.addEventListener('click', () => {
                const q = input.value.trim().toLowerCase();
                if (q.length < 2) {
                    input.focus();
                    return;
                }
                const hits = CP_ALL.filter(c =>
                    c.ru.toLowerCase().includes(q) ||
                    c.en.toLowerCase().includes(q) ||
                    c.country.toLowerCase().includes(q)
                );
                if (hits.length > 0) {
                    window.location.href = `../index.html?city=${hits[0].en}`;
                } else {
                    input.focus();
                }
            });

            input.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    btn.click();
                }
            });
        }

        document.addEventListener('click', e => {
            if (!e.target.closest('.cp-search-box-container')) dd.classList.add('hidden');
        });
    }

    /* ── 7. ФИЛЬТР ── */
    function cpInitFilter() {
        const sel = document.getElementById('cp-region');
        const cnt = document.getElementById('cp-count');
        sel.addEventListener('change', () => {
            const v = sel.value;
            const cards = document.querySelectorAll('#cp-popular-grid .cp-city-card');
            let n = 0;
            cards.forEach(c => {
                const show = v === 'all' || c.dataset.region === v;
                c.style.display = show ? '' : 'none';
                if (show) n++;
            });
            const filterLang = (typeof getCurrentLang === 'function' ? getCurrentLang() : null)
                || document.documentElement.lang
                || localStorage.getItem('lang')
                || 'ru';
            const filterT18n = (typeof getTranslation === 'function') ? getTranslation : (k => k);
            const shownText = filterT18n('found-count-text') || 'Показано: {count}';
            cnt.textContent = v === 'all' ? '' : shownText.replace('{count}', n);
        });
    }

    /* ── 8. ИНИЦИАЛИЗАЦИЯ ── */
    document.addEventListener('DOMContentLoaded', () => {
        // Ваши существующие инициализации
        if (typeof initLanguage === 'function') initLanguage();
        if (typeof initTheme    === 'function') initTheme();

        // Меню
        const menuBtn = document.getElementById('menu-toggle');
        const menuDd  = document.getElementById('menu-dropdown');
        if (menuBtn && menuDd) {
            menuBtn.addEventListener('click', e => { e.stopPropagation(); menuDd.classList.toggle('active'); });
            document.addEventListener('click', e => {
                if (!menuBtn.contains(e.target) && !menuDd.contains(e.target)) menuDd.classList.remove('active');
            });
        }

        // Страница городов
        cpBuildAlpha();
        cpInitSearch();
        cpInitFilter();
        cpLoadPopular();

        // Перестраиваем список при смене языка
        document.addEventListener('languageChanged', () => {
            document.getElementById('cp-alpha-nav').innerHTML = '';
            document.getElementById('cp-alpha-container').innerHTML = '';
            cpBuildAlpha();
            cpLoadPopular();
        });

        // Кнопки обновления
        document.querySelectorAll('.refresh-weather-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const icon = btn.querySelector('i');
                if (icon) {
                    icon.classList.add('rotating');
                    setTimeout(() => icon.classList.remove('rotating'), 1000);
                }
                cpLoadPopular();
                document.getElementById('cp-alpha-nav').innerHTML = '';
                document.getElementById('cp-alpha-container').innerHTML = '';
                cpBuildAlpha();
            });
        });

        // Lucide
        lucide.createIcons();
    });