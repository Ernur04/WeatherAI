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
    const CP_ALL = [
        // ══ А ══
        {ru:'Абакан',           en:'Abakan',           country:'Россия',              region:'cis',           lat:53.72, lon:91.43},
        {ru:'Абиджан',          en:'Abidjan',          country:'Кот-д\'Ивуар',       region:'africa',        lat:5.36,  lon:-4.00},
        {ru:'Абу-Даби',         en:'AbuDhabi',         country:'ОАЭ',                 region:'middle-east',   lat:24.47, lon:54.37},
        {ru:'Аддис-Абеба',      en:'AddisAbaba',       country:'Эфиопия',             region:'africa',        lat:9.03,  lon:38.74},
        {ru:'Аделаида',         en:'Adelaide',         country:'Австралия',           region:'oceania',       lat:-34.93,lon:138.60},
        {ru:'Адана',            en:'Adana',            country:'Турция',              region:'europe',        lat:37.00, lon:35.32},
        {ru:'Актау',            en:'Aktau',            country:'Казахстан',           region:'kz',            lat:43.65, lon:51.17},
        {ru:'Актобе',           en:'Aktobe',           country:'Казахстан',           region:'kz',            lat:50.30, lon:57.15},
        {ru:'Аликанте',         en:'Alicante',         country:'Испания',             region:'europe',        lat:38.35, lon:-0.49},
        {ru:'Алеппо',           en:'Aleppo',           country:'Сирия',               region:'middle-east',   lat:36.20, lon:37.16},
        {ru:'Алматы',           en:'Almaty',           country:'Казахстан',           region:'kz',            lat:43.25, lon:76.95},
        {ru:'Амман',            en:'Amman',            country:'Иордания',            region:'middle-east',   lat:31.96, lon:35.95},
        {ru:'Амстердам',        en:'Amsterdam',        country:'Нидерланды',          region:'europe',        lat:52.37, lon:4.90},
        {ru:'Анапа',            en:'Anapa',            country:'Россия',              region:'cis',           lat:44.89, lon:37.32},
        {ru:'Анкара',           en:'Ankara',           country:'Турция',              region:'europe',        lat:39.93, lon:32.86},
        {ru:'Анталья',          en:'Antalya',          country:'Турция',              region:'europe',        lat:36.90, lon:30.69},
        {ru:'Антверпен',        en:'Antwerp',          country:'Бельгия',             region:'europe',        lat:51.22, lon:4.40},
        {ru:'Аркалык',          en:'Arkalyk',          country:'Казахстан',           region:'kz',            lat:50.25, lon:66.92},
        {ru:'Архангельск',      en:'Arkhangelsk',      country:'Россия',              region:'cis',           lat:64.54, lon:40.54},
        {ru:'Арыс',             en:'Arys',             country:'Казахстан',           region:'kz',            lat:42.43, lon:68.80},
        {ru:'Астана',           en:'Astana',           country:'Казахстан',           region:'kz',            lat:51.18, lon:71.45},
        {ru:'Астрахань',        en:'Astrakhan',        country:'Россия',              region:'cis',           lat:46.35, lon:48.04},
        {ru:'Ашхабад',          en:'Ashgabat',         country:'Туркменистан',        region:'cis',           lat:37.95, lon:58.38},
        {ru:'Афины',            en:'Athens',           country:'Греция',              region:'europe',        lat:37.98, lon:23.73},
        {ru:'Атланта',          en:'Atlanta',          country:'США',                 region:'north-america', lat:33.75, lon:-84.39},
        {ru:'Атырау',           en:'Atyrau',           country:'Казахстан',           region:'kz',            lat:47.12, lon:51.88},
        {ru:'Атбасар',          en:'Atbasar',          country:'Казахстан',           region:'kz',            lat:51.82, lon:68.35},
        {ru:'Аягоз',            en:'Ayagoz',           country:'Казахстан',           region:'kz',            lat:47.97, lon:80.43},
        {ru:'Окленд',           en:'Auckland',         country:'Новая Зеландия',      region:'oceania',       lat:-36.86,lon:174.76},
        // ══ Б ══
        {ru:'Баден-Баден',      en:'BadenBaden',       country:'Германия',            region:'europe',        lat:48.76, lon:8.24},
        {ru:'Байконур',         en:'Baikonur',         country:'Казахстан',           region:'kz',            lat:45.62, lon:63.31},
        {ru:'Баку',             en:'Baku',             country:'Азербайджан',         region:'cis',           lat:40.41, lon:49.87},
        {ru:'Балхаш',           en:'Balqash',          country:'Казахстан',           region:'kz',            lat:46.84, lon:74.98},
        {ru:'Бангкок',          en:'Bangkok',          country:'Таиланд',             region:'asia',          lat:13.75, lon:100.52},
        {ru:'Барнаул',          en:'Barnaul',          country:'Россия',              region:'cis',           lat:53.35, lon:83.77},
        {ru:'Барселона',        en:'Barcelona',        country:'Испания',             region:'europe',        lat:41.39, lon:2.17},
        {ru:'Батуми',           en:'Batumi',           country:'Грузия',              region:'cis',           lat:41.64, lon:41.64},
        {ru:'Багдад',           en:'Baghdad',          country:'Ирак',                region:'middle-east',   lat:33.34, lon:44.40},
        {ru:'Белгород',         en:'Belgorod',         country:'Россия',              region:'cis',           lat:50.60, lon:36.59},
        {ru:'Белград',          en:'Belgrade',         country:'Сербия',              region:'europe',        lat:44.80, lon:20.47},
        {ru:'Берлин',           en:'Berlin',           country:'Германия',            region:'europe',        lat:52.52, lon:13.41},
        {ru:'Берн',             en:'Bern',             country:'Швейцария',           region:'europe',        lat:46.95, lon:7.45},
        {ru:'Бирмингем',        en:'Birmingham',       country:'Великобритания',      region:'europe',        lat:52.48, lon:-1.90},
        {ru:'Бишкек',           en:'Bishkek',          country:'Кыргызстан',          region:'cis',           lat:42.87, lon:74.59},
        {ru:'Благовещенск',     en:'Blagoveshchensk',  country:'Россия',              region:'cis',           lat:50.27, lon:127.54},
        {ru:'Богота',           en:'Bogota',           country:'Колумбия',            region:'south-america', lat:4.71,  lon:-74.07},
        {ru:'Болонья',          en:'Bologna',          country:'Италия',              region:'europe',        lat:44.49, lon:11.34},
        {ru:'Бордо',            en:'Bordeaux',         country:'Франция',             region:'europe',        lat:44.84, lon:-0.58},
        {ru:'Бостон',           en:'Boston',           country:'США',                 region:'north-america', lat:42.36, lon:-71.06},
        {ru:'Бразилиа',         en:'Brasilia',         country:'Бразилия',            region:'south-america', lat:-15.78,lon:-47.93},
        {ru:'Братислава',       en:'Bratislava',       country:'Словакия',            region:'europe',        lat:48.15, lon:17.11},
        {ru:'Брест',            en:'Brest',            country:'Беларусь',            region:'cis',           lat:52.10, lon:23.73},
        {ru:'Брюссель',         en:'Brussels',         country:'Бельгия',             region:'europe',        lat:50.85, lon:4.35},
        {ru:'Брянск',           en:'Bryansk',          country:'Россия',              region:'cis',           lat:53.24, lon:34.36},
        {ru:'Будапешт',         en:'Budapest',         country:'Венгрия',             region:'europe',        lat:47.50, lon:19.04},
        {ru:'Буэнос-Айрес',     en:'BuenosAires',      country:'Аргентина',           region:'south-america', lat:-34.60,lon:-58.38},
        {ru:'Бухара',           en:'Bukhara',          country:'Узбекистан',          region:'cis',           lat:39.77, lon:64.43},
        {ru:'Пусан',            en:'Busan',            country:'Южная Корея',         region:'asia',          lat:35.10, lon:129.04},
        // ══ В ══
        {ru:'Ванкувер',         en:'Vancouver',        country:'Канада',              region:'north-america', lat:49.25, lon:-123.12},
        {ru:'Варшава',          en:'Warsaw',           country:'Польша',              region:'europe',        lat:52.23, lon:21.01},
        {ru:'Вашингтон',        en:'Washington',       country:'США',                 region:'north-america', lat:38.91, lon:-77.04},
        {ru:'Вена',             en:'Vienna',           country:'Австрия',             region:'europe',        lat:48.21, lon:16.37},
        {ru:'Венеция',          en:'Venice',           country:'Италия',              region:'europe',        lat:45.44, lon:12.32},
        {ru:'Верона',           en:'Verona',           country:'Италия',              region:'europe',        lat:45.44, lon:10.99},
        {ru:'Веллингтон',       en:'Wellington',       country:'Новая Зеландия',      region:'oceania',       lat:-41.29,lon:174.78},
        {ru:'Великий Новгород', en:'VelikiyNovgorod',  country:'Россия',              region:'cis',           lat:58.52, lon:31.28},
        {ru:'Вильнюс',          en:'Vilnius',          country:'Литва',               region:'europe',        lat:54.69, lon:25.28},
        {ru:'Витебск',          en:'Vitebsk',          country:'Беларусь',            region:'cis',           lat:55.19, lon:30.20},
        {ru:'Владивосток',      en:'Vladivostok',      country:'Россия',              region:'cis',           lat:43.12, lon:131.90},
        {ru:'Владикавказ',      en:'Vladikavkaz',      country:'Россия',              region:'cis',           lat:43.02, lon:44.68},
        {ru:'Владимир',         en:'Vladimir',         country:'Россия',              region:'cis',           lat:56.13, lon:40.41},
        {ru:'Волгоград',        en:'Volgograd',        country:'Россия',              region:'cis',           lat:48.71, lon:44.51},
        {ru:'Вологда',          en:'Vologda',          country:'Россия',              region:'cis',           lat:59.22, lon:39.88},
        {ru:'Воркута',          en:'Vorkuta',          country:'Россия',              region:'cis',           lat:67.50, lon:63.99},
        {ru:'Воронеж',          en:'Voronezh',         country:'Россия',              region:'cis',           lat:51.67, lon:39.18},
        {ru:'Валенсия',         en:'Valencia',         country:'Испания',             region:'europe',        lat:39.47, lon:-0.38},
        {ru:'Вьентьян',         en:'Vientiane',        country:'Лаос',                region:'asia',          lat:17.97, lon:102.60},
        // ══ Г ══
        {ru:'Гаага',            en:'TheHague',         country:'Нидерланды',          region:'europe',        lat:52.08, lon:4.31},
        {ru:'Гавана',           en:'Havana',           country:'Куба',                region:'north-america', lat:23.13, lon:-82.38},
        {ru:'Газа',             en:'Gaza',             country:'Палестина',           region:'middle-east',   lat:31.52, lon:34.46},
        {ru:'Гамбург',          en:'Hamburg',          country:'Германия',            region:'europe',        lat:53.55, lon:9.99},
        {ru:'Ганновер',         en:'Hanover',          country:'Германия',            region:'europe',        lat:52.37, lon:9.74},
        {ru:'Гатчина',          en:'Gatchina',         country:'Россия',              region:'cis',           lat:59.57, lon:30.13},
        {ru:'Геленджик',        en:'Gelendzhik',       country:'Россия',              region:'cis',           lat:44.56, lon:38.08},
        {ru:'Гиза',             en:'Giza',             country:'Египет',              region:'africa',        lat:30.01, lon:31.21},
        {ru:'Глазго',           en:'Glasgow',          country:'Великобритания',      region:'europe',        lat:55.86, lon:-4.25},
        {ru:'Гомель',           en:'Gomel',            country:'Беларусь',            region:'cis',           lat:52.43, lon:31.01},
        {ru:'Гонконг',          en:'HongKong',         country:'Китай',               region:'asia',          lat:22.32, lon:114.17},
        {ru:'Гори',             en:'Gori',             country:'Грузия',              region:'cis',           lat:41.99, lon:44.11},
        {ru:'Гродно',           en:'Grodno',           country:'Беларусь',            region:'cis',           lat:53.68, lon:23.83},
        {ru:'Грозный',          en:'Grozny',           country:'Россия',              region:'cis',           lat:43.32, lon:45.70},
        {ru:'Гватемала',        en:'Guatemala',        country:'Гватемала',           region:'north-america', lat:14.64, lon:-90.51},
        {ru:'Гвадалахара',      en:'Guadalajara',      country:'Мексика',             region:'north-america', lat:20.66, lon:-103.35},
        {ru:'Гуанчжоу',         en:'Guangzhou',        country:'Китай',               region:'asia',          lat:23.13, lon:113.26},
        {ru:'Гётеборг',         en:'Gothenburg',       country:'Швеция',              region:'europe',        lat:57.71, lon:11.97},
        {ru:'Гюмри',            en:'Gyumri',           country:'Армения',             region:'cis',           lat:40.79, lon:43.85},
        // ══ Д ══
        {ru:'Дакар',            en:'Dakar',            country:'Сенегал',             region:'africa',        lat:14.69, lon:-17.44},
        {ru:'Дакка',            en:'Dhaka',            country:'Бангладеш',           region:'asia',          lat:23.81, lon:90.41},
        {ru:'Даллас',           en:'Dallas',           country:'США',                 region:'north-america', lat:32.78, lon:-96.81},
        {ru:'Дамаск',           en:'Damascus',         country:'Сирия',               region:'middle-east',   lat:33.51, lon:36.29},
        {ru:'Дар-эс-Салам',     en:'DarEsSalaam',      country:'Танзания',            region:'africa',        lat:-6.79, lon:39.21},
        {ru:'Дарвин',           en:'Darwin',           country:'Австралия',           region:'oceania',       lat:-12.46,lon:130.84},
        {ru:'Дели',             en:'Delhi',            country:'Индия',               region:'asia',          lat:28.66, lon:77.23},
        {ru:'Денвер',           en:'Denver',           country:'США',                 region:'north-america', lat:39.74, lon:-104.98},
        {ru:'Дербент',          en:'Derbent',          country:'Россия',              region:'cis',           lat:42.06, lon:48.29},
        {ru:'Державинск',       en:'Derzhavinsk',      country:'Казахстан',           region:'kz',            lat:51.10, lon:66.31},
        {ru:'Дзержинск',        en:'Dzerzhinsk',       country:'Россия',              region:'cis',           lat:56.24, lon:43.46},
        {ru:'Днепр',            en:'Dnepro',           country:'Украина',             region:'cis',           lat:48.46, lon:35.04},
        {ru:'Доха',             en:'Doha',             country:'Катар',               region:'middle-east',   lat:25.29, lon:51.53},
        {ru:'Донецк',           en:'Donetsk',          country:'Украина',             region:'cis',           lat:48.02, lon:37.80},
        {ru:'Дортмунд',         en:'Dortmund',         country:'Германия',            region:'europe',        lat:51.51, lon:7.47},
        {ru:'Дрезден',          en:'Dresden',          country:'Германия',            region:'europe',        lat:51.05, lon:13.74},
        {ru:'Дубай',            en:'Dubai',            country:'ОАЭ',                 region:'middle-east',   lat:25.20, lon:55.27},
        {ru:'Дублин',           en:'Dublin',           country:'Ирландия',            region:'europe',        lat:53.33, lon:-6.25},
        {ru:'Дубровник',        en:'Dubrovnik',        country:'Хорватия',            region:'europe',        lat:42.65, lon:18.09},
        {ru:'Душанбе',          en:'Dushanbe',         country:'Таджикистан',         region:'cis',           lat:38.56, lon:68.77},
        {ru:'Дюссельдорф',      en:'Dusseldorf',       country:'Германия',            region:'europe',        lat:51.23, lon:6.79},
        // ══ Е ══
        {ru:'Екатеринбург',     en:'Ekaterinburg',     country:'Россия',              region:'cis',           lat:56.84, lon:60.60},
        {ru:'Ереван',           en:'Yerevan',          country:'Армения',             region:'cis',           lat:40.18, lon:44.51},
        // ══ З ══
        {ru:'Загреб',           en:'Zagreb',           country:'Хорватия',            region:'europe',        lat:45.81, lon:15.98},
        // ══ И ══
        {ru:'Иркутск',          en:'Irkutsk',          country:'Россия',              region:'cis',           lat:52.30, lon:104.30},
        {ru:'Исламабад',        en:'Islamabad',        country:'Пакистан',            region:'asia',          lat:33.72, lon:73.04},
        {ru:'Стамбул',          en:'Istanbul',         country:'Турция',              region:'europe',        lat:41.01, lon:28.96},
        // ══ К ══
        {ru:'Кабул',            en:'Kabul',            country:'Афганистан',          region:'asia',          lat:34.53, lon:69.17},
        {ru:'Каир',             en:'Cairo',            country:'Египет',              region:'africa',        lat:30.06, lon:31.25},
        {ru:'Калининград',      en:'Kaliningrad',      country:'Россия',              region:'cis',           lat:54.71, lon:20.51},
        {ru:'Каракас',          en:'Caracas',          country:'Венесуэла',           region:'south-america', lat:10.49, lon:-66.88},
        {ru:'Карагандa',        en:'Karaganda',        country:'Казахстан',           region:'kz',            lat:49.81, lon:73.10},
        {ru:'Катманду',         en:'Kathmandu',        country:'Непал',               region:'asia',          lat:27.71, lon:85.32},
        {ru:'Казань',           en:'Kazan',            country:'Россия',              region:'cis',           lat:55.79, lon:49.12},
        {ru:'Киев',             en:'Kyiv',             country:'Украина',             region:'cis',           lat:50.45, lon:30.52},
        {ru:'Кишинёв',          en:'Chisinau',         country:'Молдова',             region:'cis',           lat:47.01, lon:28.86},
        {ru:'Кокшетау',         en:'Kokshetau',        country:'Казахстан',           region:'kz',            lat:53.28, lon:69.39},
        {ru:'Копенгаген',       en:'Copenhagen',       country:'Дания',               region:'europe',        lat:55.68, lon:12.57},
        {ru:'Красноярск',       en:'Krasnoyarsk',      country:'Россия',              region:'cis',           lat:56.02, lon:92.87},
        {ru:'Куала-Лумпур',     en:'KualaLumpur',      country:'Малайзия',            region:'asia',          lat:3.14,  lon:101.69},
        {ru:'Костанай',         en:'Kostanay',         country:'Казахстан',           region:'kz',            lat:53.21, lon:63.63},
        // ══ Л ══
        {ru:'Лагос',            en:'Lagos',            country:'Нигерия',             region:'africa',        lat:6.46,  lon:3.38},
        {ru:'Лима',             en:'Lima',             country:'Перу',                region:'south-america', lat:-12.05,lon:-77.05},
        {ru:'Лиссабон',         en:'Lisbon',           country:'Португалия',          region:'europe',        lat:38.72, lon:-9.14},
        {ru:'Лондон',           en:'London',           country:'Великобритания',      region:'europe',        lat:51.51, lon:-0.13},
        {ru:'Лос-Анджелес',     en:'LosAngeles',       country:'США',                 region:'north-america', lat:34.05, lon:-118.24},
        {ru:'Люксембург',       en:'Luxembourg',       country:'Люксембург',          region:'europe',        lat:49.61, lon:6.13},
        {ru:'Лион',             en:'Lyon',             country:'Франция',             region:'europe',        lat:45.75, lon:4.85},
        {ru:'Любляна',          en:'Ljubljana',        country:'Словения',            region:'europe',        lat:46.05, lon:14.51},
        // ══ М ══
        {ru:'Мадрид',           en:'Madrid',           country:'Испания',             region:'europe',        lat:40.42, lon:-3.70},
        {ru:'Манила',           en:'Manila',           country:'Филиппины',           region:'asia',          lat:14.60, lon:120.98},
        {ru:'Касабланка',       en:'Casablanca',       country:'Марокко',             region:'africa',        lat:33.59, lon:-7.62},
        {ru:'Мехико',           en:'MexicoCity',       country:'Мексика',             region:'north-america', lat:19.43, lon:-99.13},
        {ru:'Милан',            en:'Milan',            country:'Италия',              region:'europe',        lat:45.46, lon:9.19},
        {ru:'Минск',            en:'Minsk',            country:'Беларусь',            region:'cis',           lat:53.90, lon:27.57},
        {ru:'Монреаль',         en:'Montreal',         country:'Канада',              region:'north-america', lat:45.51, lon:-73.56},
        {ru:'Москва',           en:'Moscow',           country:'Россия',              region:'cis',           lat:55.75, lon:37.62},
        {ru:'Мумбаи',           en:'Mumbai',           country:'Индия',               region:'asia',          lat:19.08, lon:72.88},
        {ru:'Мюнхен',           en:'Munich',           country:'Германия',            region:'europe',        lat:48.14, lon:11.58},
        // ══ Н ══
        {ru:'Найроби',          en:'Nairobi',          country:'Кения',               region:'africa',        lat:-1.29, lon:36.82},
        {ru:'Неаполь',          en:'Naples',           country:'Италия',              region:'europe',        lat:40.85, lon:14.27},
        {ru:'Нью-Йорк',         en:'NewYork',          country:'США',                 region:'north-america', lat:40.71, lon:-74.01},
        {ru:'Нижний Новгород',  en:'NizhnyNovgorod',   country:'Россия',              region:'cis',           lat:56.33, lon:44.00},
        {ru:'Новосибирск',      en:'Novosibirsk',      country:'Россия',              region:'cis',           lat:54.99, lon:82.90},
        // ══ О ══
        {ru:'Одесса',           en:'Odessa',           country:'Украина',             region:'cis',           lat:46.48, lon:30.72},
        {ru:'Омск',             en:'Omsk',             country:'Россия',              region:'cis',           lat:54.99, lon:73.37},
        {ru:'Осло',             en:'Oslo',             country:'Норвегия',            region:'europe',        lat:59.91, lon:10.75},
        {ru:'Оттава',           en:'Ottawa',           country:'Канада',              region:'north-america', lat:45.42, lon:-75.70},
        // ══ П ══
        {ru:'Павлодар',         en:'Pavlodar',         country:'Казахстан',           region:'kz',            lat:52.29, lon:76.95},
        {ru:'Пекин',            en:'Beijing',          country:'Китай',               region:'asia',          lat:39.91, lon:116.39},
        {ru:'Перт',             en:'Perth',            country:'Австралия',           region:'oceania',       lat:-31.95,lon:115.86},
        {ru:'Прага',            en:'Prague',           country:'Чехия',               region:'europe',        lat:50.09, lon:14.42},
        {ru:'Париж',            en:'Paris',            country:'Франция',             region:'europe',        lat:48.85, lon:2.35},
        {ru:'Петропавловск',    en:'Petropavlovsk',    country:'Казахстан',           region:'kz',            lat:54.86, lon:69.14},
        // ══ Р ══
        {ru:'Рабат',            en:'Rabat',            country:'Марокко',             region:'africa',        lat:34.02, lon:-6.84},
        {ru:'Рейкьявик',        en:'Reykjavik',        country:'Исландия',            region:'europe',        lat:64.13, lon:-21.93},
        {ru:'Рига',             en:'Riga',             country:'Латвия',              region:'europe',        lat:56.95, lon:24.11},
        {ru:'Рим',              en:'Rome',             country:'Италия',              region:'europe',        lat:41.90, lon:12.50},
        {ru:'Ростов-на-Дону',   en:'RostovOnDon',      country:'Россия',              region:'cis',           lat:47.24, lon:39.71},
        {ru:'Роттердам',        en:'Rotterdam',        country:'Нидерланды',          region:'europe',        lat:51.92, lon:4.48},
        {ru:'Эр-Рияд',          en:'Riyadh',           country:'Саудовская Аравия',   region:'middle-east',   lat:24.69, lon:46.72},
        // ══ С ══
        {ru:'Самара',           en:'Samara',           country:'Россия',              region:'cis',           lat:53.20, lon:50.15},
        {ru:'Санкт-Петербург',  en:'SaintPetersburg',  country:'Россия',              region:'cis',           lat:59.94, lon:30.32},
        {ru:'Сантьяго',         en:'Santiago',         country:'Чили',                region:'south-america', lat:-33.46,lon:-70.65},
        {ru:'Сан-Паулу',        en:'SaoPaulo',         country:'Бразилия',            region:'south-america', lat:-23.55,lon:-46.63},
        {ru:'Сан-Франциско',    en:'SanFrancisco',     country:'США',                 region:'north-america', lat:37.77, lon:-122.42},
        {ru:'Саппоро',          en:'Sapporo',          country:'Япония',              region:'asia',          lat:43.06, lon:141.35},
        {ru:'Сеул',             en:'Seoul',            country:'Южная Корея',         region:'asia',          lat:37.57, lon:126.98},
        {ru:'Сидней',           en:'Sydney',           country:'Австралия',           region:'oceania',       lat:-33.87,lon:151.21},
        {ru:'Симферополь',      en:'Simferopol',       country:'Россия',              region:'cis',           lat:44.95, lon:34.10},
        {ru:'Сингапур',         en:'Singapore',        country:'Сингапур',            region:'asia',          lat:1.35,  lon:103.82},
        {ru:'Скопье',           en:'Skopje',           country:'Северная Македония',  region:'europe',        lat:42.00, lon:21.43},
        {ru:'София',            en:'Sofia',            country:'Болгария',            region:'europe',        lat:42.70, lon:23.32},
        {ru:'Стокгольм',        en:'Stockholm',        country:'Швеция',              region:'europe',        lat:59.33, lon:18.07},
        {ru:'Шымкент',          en:'Shymkent',         country:'Казахстан',           region:'kz',            lat:42.32, lon:69.59},
        // ══ Т ══
        {ru:'Тайбэй',           en:'Taipei',           country:'Тайвань',             region:'asia',          lat:25.04, lon:121.56},
        {ru:'Таллин',           en:'Tallinn',          country:'Эстония',             region:'europe',        lat:59.44, lon:24.75},
        {ru:'Тараз',            en:'Taraz',            country:'Казахстан',           region:'kz',            lat:42.90, lon:71.36},
        {ru:'Ташкент',          en:'Tashkent',         country:'Узбекистан',          region:'cis',           lat:41.30, lon:69.27},
        {ru:'Тбилиси',          en:'Tbilisi',          country:'Грузия',              region:'cis',           lat:41.69, lon:44.83},
        {ru:'Тегеран',          en:'Tehran',           country:'Иран',                region:'middle-east',   lat:35.69, lon:51.42},
        {ru:'Тель-Авив',        en:'TelAviv',          country:'Израиль',             region:'middle-east',   lat:32.08, lon:34.78},
        {ru:'Токио',            en:'Tokyo',            country:'Япония',              region:'asia',          lat:35.68, lon:139.69},
        {ru:'Торонто',          en:'Toronto',          country:'Канада',              region:'north-america', lat:43.70, lon:-79.42},
        // ══ У ══
        {ru:'Улан-Батор',       en:'UlanBator',        country:'Монголия',            region:'asia',          lat:47.91, lon:106.92},
        {ru:'Уральск',          en:'Uralsk',           country:'Казахстан',           region:'kz',            lat:51.23, lon:51.37},
        {ru:'Усть-Каменогорск', en:'UstKamenogorsk',   country:'Казахстан',           region:'kz',            lat:49.97, lon:82.61},
        {ru:'Уфа',              en:'Ufa',              country:'Россия',              region:'cis',           lat:54.74, lon:55.97},
        // ══ Х ══
        {ru:'Хабаровск',        en:'Khabarovsk',       country:'Россия',              region:'cis',           lat:48.48, lon:135.07},
        {ru:'Хельсинки',        en:'Helsinki',         country:'Финляндия',           region:'europe',        lat:60.17, lon:24.94},
        {ru:'Ханой',            en:'Hanoi',            country:'Вьетнам',             region:'asia',          lat:21.03, lon:105.85},
        {ru:'Хошимин',          en:'HoChiMinh',        country:'Вьетнам',             region:'asia',          lat:10.82, lon:106.63},
        // ══ Ц ══
        {ru:'Цюрих',            en:'Zurich',           country:'Швейцария',           region:'europe',        lat:47.38, lon:8.54},
        // ══ Ч ══
        {ru:'Чикаго',           en:'Chicago',          country:'США',                 region:'north-america', lat:41.85, lon:-87.65},
        {ru:'Челябинск',        en:'Chelyabinsk',      country:'Россия',              region:'cis',           lat:55.15, lon:61.43},
        // ══ Ш ══
        {ru:'Шанхай',           en:'Shanghai',         country:'Китай',               region:'asia',          lat:31.23, lon:121.47},
        // ══ Э ══
        {ru:'Эдинбург',         en:'Edinburgh',        country:'Великобритания',      region:'europe',        lat:55.95, lon:-3.19},
        // ══ Я ══
        {ru:'Якутск',           en:'Yakutsk',          country:'Россия',              region:'cis',           lat:62.03, lon:129.73},
        {ru:'Ярославль',        en:'Yaroslavl',        country:'Россия',              region:'cis',           lat:57.63, lon:39.87},
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
                ul.innerHTML += `<li><a href="../index.html?city=${c.en}">${c[nameField]}<span class="cp-list-country">(${c.country})</span></a></li>`;
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
                div.innerHTML = `<span class="cp-item-flag">📍</span><span class="cp-dd-city" style="flex:1">${c[searchField]}</span><span class="cp-item-country">${c.country}</span>`;
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
        });

        // Lucide
        lucide.createIcons();
    });