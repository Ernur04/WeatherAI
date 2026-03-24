// lunar.js - Script to calculate and display the current moon phase dynamically

document.addEventListener('DOMContentLoaded', () => {
    updateLunarCalendar();
    
    // Listen to lang changes to re-run the layout and patch the strings
    const langBtns = document.querySelectorAll('.lang-btn');
    langBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            setTimeout(updateLunarCalendar, 50);
        });
    });
});

// Calculate moon phase based on a known New Moon date
function getMoonPhase(date = new Date()) {
    // Known new moon date: Feb 9, 2024 at 22:59 UTC
    const knownNewMoon = new Date('2024-02-09T22:59:00Z').getTime();
    const synodicMonth = 29.53058867 * 24 * 60 * 60 * 1000; // milliseconds
    
    // Difference in milliseconds
    const timeDiff = date.getTime() - knownNewMoon;
    
    // Total lunar cycles since known new moon
    const totalCycles = timeDiff / synodicMonth;
    
    // Current fraction of cycle (0 to 1)
    let cycleFraction = totalCycles % 1;
    if (cycleFraction < 0) {
        cycleFraction += 1;
    }
    
    // Lunar age in days
    const lunarAgeDays = cycleFraction * 29.53058867;
    
    // 8 phases of the moon
    // 0: New Moon, 1: Waxing Crescent, 2: First Quarter, 3: Waxing Gibbous
    // 4: Full Moon, 5: Waning Gibbous, 6: Last Quarter, 7: Waning Crescent
    
    let phaseIndex = 0;
    if (cycleFraction < 0.03 || cycleFraction > 0.97) phaseIndex = 0;
    else if (cycleFraction < 0.22) phaseIndex = 1;
    else if (cycleFraction < 0.28) phaseIndex = 2;
    else if (cycleFraction < 0.47) phaseIndex = 3;
    else if (cycleFraction < 0.53) phaseIndex = 4;
    else if (cycleFraction < 0.72) phaseIndex = 5;
    else if (cycleFraction < 0.78) phaseIndex = 6;
    else phaseIndex = 7;
    
    // Illumination percentage
    // Based on the cosine of the angle from the sun
    const illumination = Math.round((0.5 * (1 - Math.cos(cycleFraction * 2 * Math.PI))) * 100);

    return {
        lunarDay: Math.floor(lunarAgeDays) + 1,
        phaseIndex: phaseIndex,
        illumination: illumination,
        cycleFraction: cycleFraction
    };
}

function updateLunarCalendar() {
    const today = new Date();
    const data = getMoonPhase(today);
    
    // Elements to update
    const titleEl = document.querySelector('.lunar-title');
    const subtitleEl = document.querySelector('.lunar-subtitle');
    const phaseValueSpan = document.querySelector('[data-i18n="lc-hero-phase"]');
    
    // Array of translation keys for phase names (Title)
    const phaseTitleKeys = [
        "phase-title-0", "phase-title-1", "phase-title-2", "phase-title-3",
        "phase-title-4", "phase-title-5", "phase-title-6", "phase-title-7"
    ];
    
    // Array of translation prefixes for the detailed phase string
    const phaseDescKeys = [
        "phase-desc-0", "phase-desc-1", "phase-desc-2", "phase-desc-3",
        "phase-desc-4", "phase-desc-5", "phase-desc-6", "phase-desc-7"
    ];

    if (titleEl) {
        titleEl.setAttribute('data-i18n', phaseTitleKeys[data.phaseIndex]);
    }

    if (phaseValueSpan) {
        // We set a special attribute so language.js (or here) can append the percentage
        phaseValueSpan.setAttribute('data-i18n', phaseDescKeys[data.phaseIndex]);
        phaseValueSpan.setAttribute('data-phase-percent', data.illumination);
    }
    
    if (subtitleEl) {
        // Format: N-й лунный день • DD Month YYYY
        // Setting a special pattern so we can inject dynamically in language files or format it
        // We will construct the date string
        const options = { day: 'numeric', month: 'long', year: 'numeric' };
        // Determine lang from current storage or fallback to ru
        const savedLang = localStorage.getItem('language') || 'ru';
        const dateStr = today.toLocaleDateString(savedLang, options);
        
        let prefix = `${data.lunarDay}-й лунный день`;
        if (savedLang === 'en') prefix = `${data.lunarDay}th Lunar Day`;
        else if (savedLang === 'kk') prefix = `${data.lunarDay}-ші ай күні`;
        
        subtitleEl.textContent = `${prefix} • ${dateStr}`;
        subtitleEl.removeAttribute('data-i18n'); // Because we handle it dynamically
    }
    
    // Optional: Zodiac approximation based on regular sun sign + offset
    // This is purely a visual mock for the UI to change, real ephemeris is hard.
    const signs = ['Овен ♈', 'Телец ♉', 'Близнецы ♊', 'Рак ♋', 'Лев ♌', 'Дева ♍', 'Весы ♎', 'Скорпион ♏', 'Стрелец ♐', 'Козерог ♑', 'Водолей ♒', 'Рыбы ♓'];
    const signIndex = (today.getMonth() + Math.floor(data.lunarDay / 2.5)) % 12;
    const signSpan = document.querySelector('[data-i18n="lc-hero-sign"]');
    if (signSpan) {
        // Replace with dynamic mapped values. In a real app we'd map i18n keys for 12 zodiacs.
        signSpan.setAttribute('data-i18n', `zodiac-${signIndex}`);
    }

    // Call updateTexts from language.js to apply the new translations
    if (typeof updateTexts === 'function') {
        updateTexts();
    }
    
    // Patch the phase percentage string separately
    const percentSpan = document.getElementById('lunar-percent-span');
    if (percentSpan) {
        if (data.phaseIndex === 0 || data.phaseIndex === 4) {
            percentSpan.textContent = '';
        } else {
            percentSpan.textContent = ` (${data.illumination}%)`;
        }
    }
    
    // Tweak Moon Visual (CSS pseudo element)
    const moonVisual = document.querySelector('.lunar-moon-visual');
    if (moonVisual) {
        // Simplified mapping for the gradient to mimic moon cycle
        // If cycle < 0.5 (waxing), shadow is on left.
        // If > 0.5 (waning), shadow is on right.
        let shadowSize = Math.abs((data.cycleFraction - 0.5) * 200); // 0 to 100
        let isWaxing = data.cycleFraction < 0.5;
        
        if (data.phaseIndex === 0) {
            moonVisual.style.background = '#111827';
            moonVisual.style.boxShadow = 'none';
        } else if (data.phaseIndex === 4) {
            moonVisual.style.background = '#fef3c7';
            moonVisual.style.boxShadow = '0 0 40px rgba(253, 230, 138, 0.4)';
        } else {
            // Very simple visual approximation
            const color = '#fef3c7';
            const shadowColor = '#111827';
            const deg = isWaxing ? '90deg' : '270deg';
            const stop = `${data.illumination}%`;
            moonVisual.style.background = `linear-gradient(${deg}, ${color} ${stop}, ${shadowColor} ${stop})`;
        }
    }
}
