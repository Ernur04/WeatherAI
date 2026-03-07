async function initLanguage() {
    const langSelect = document.getElementById('lang-select');
    if (!langSelect) return;

    if (!window.translations) window.translations = {};

    async function setLanguage(lang) {
        localStorage.setItem('preferredLang', lang);

        // Update html lang attribute
        document.documentElement.lang = lang;

        // Load translation if not already loaded
        if (!window.translations[lang]) {
            try {
                // Determine path prefix based on location
                const pathPrefix = window.location.pathname.includes('/pages/') ? '../' : './';
                const response = await fetch(`${pathPrefix}locales/${lang}.json`);
                if (!response.ok) throw new Error(`Could not load ${lang} translation`);
                window.translations[lang] = await response.json();
            } catch (error) {
                console.error('Error loading language:', error);
                return;
            }
        }

        // Translate text elements
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (window.translations[lang] && window.translations[lang][key]) {
                el.textContent = window.translations[lang][key];
            }
        });

        // Translate placeholders
        document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
            const key = el.getAttribute('data-i18n-placeholder');
            if (window.translations[lang] && window.translations[lang][key]) {
                el.placeholder = window.translations[lang][key];
            }
        });
    }

    const savedLang = localStorage.getItem('preferredLang') || 'ru';
    langSelect.value = savedLang;
    await setLanguage(savedLang);

    langSelect.addEventListener('change', async (e) => {
        await setLanguage(e.target.value);
    });

    // Return setLanguage so other modules can use it if needed
    return setLanguage;
}
