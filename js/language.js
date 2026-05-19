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

        function getTranslationVal(lang, key) {
            if (!window.translations[lang]) return undefined;
            return key.split('.').reduce((o, i) => (o ? o[i] : undefined), window.translations[lang]);
        }

        // Translate text elements
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            const val = getTranslationVal(lang, key);
            if (val) {
                if (el.tagName.toLowerCase() === 'optgroup') {
                    el.label = val;
                } else {
                    el.textContent = val;
                }
            }
        });

        // Translate labels for optgroups directly via data-i18n-label
        document.querySelectorAll('[data-i18n-label]').forEach(el => {
            const key = el.getAttribute('data-i18n-label');
            const val = getTranslationVal(lang, key);
            if (val) {
                el.label = val;
            }
        });

        // Translate placeholders
        document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
            const key = el.getAttribute('data-i18n-placeholder');
            const val = getTranslationVal(lang, key);
            if (val) {
                el.placeholder = val;
            }
        });

        // Translate tooltips
        document.querySelectorAll('[data-i18n-tooltip]').forEach(el => {
            const key = el.getAttribute('data-i18n-tooltip');
            const val = getTranslationVal(lang, key);
            if (val) {
                el.setAttribute('data-tooltip', val);
            }
        });

        // Translate document title
        const titleEl = document.querySelector('[data-i18n-page-title]');
        if (titleEl) {
            const key = titleEl.getAttribute('data-i18n-page-title');
            const val = getTranslationVal(lang, key);
            if (val) {
                document.title = val;
            }
        }

        // Translate titles
        document.querySelectorAll('[data-i18n-title]').forEach(el => {
            const key = el.getAttribute('data-i18n-title');
            const val = getTranslationVal(lang, key);
            if (val) {
                el.title = val;
            }
        });

        // Dispatch global event for other modules
        window.dispatchEvent(new CustomEvent('languageChanged', { detail: { lang: lang } }));
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
