/**
 * WeatherAI - Export Constructor Logic
 */

document.addEventListener('DOMContentLoaded', () => {
    // Buttons
    const exportBtn = document.getElementById('btn-download');
    const startExportBtn = document.getElementById('start-export-btn');
    const previewBtn = document.getElementById('preview-export-btn');
    const resetBtn = document.getElementById('reset-export-btn');
    const exportModal = document.getElementById('export-modal');
    
    // Inputs
    const periodSelect = document.getElementById('export-period');
    const customRangeInputs = document.getElementById('custom-range-inputs');
    const langSelect = document.getElementById('export-data-lang');
    
    // Chips
    const formatBtns = document.querySelectorAll('.format-chips .format-btn');
    const stepBtns = document.querySelectorAll('#export-step-group .toggle-chip');
    
    // Checkboxes
    const paramTemp = document.getElementById('param-temp');
    const paramHumidity = document.getElementById('param-humidity');
    const paramWind = document.getElementById('param-wind');
    const paramPrecip = document.getElementById('param-precip');
    const paramPressure = document.getElementById('param-pressure');
    const paramAI = document.getElementById('param-ai');
    
    // Preview Box
    const previewBox = document.getElementById('export-preview-content');
    const previewPlaceholder = document.querySelector('.export-preview-placeholder');

    let selectedFormat = 'json';
    let selectedStep = 'hourly';

    const getTranslation = (key, fallback, specificLang = null) => {
        const lang = specificLang || localStorage.getItem('preferredLang') || 'ru';
        if (window.translations && window.translations[lang] && window.translations[lang][key]) {
            return window.translations[lang][key];
        }
        return fallback;
    };

    // Open/Close modal
    if (exportBtn) {
        exportBtn.addEventListener('click', () => {
            // Set data lang to current interface lang by default
            const currentUI = localStorage.getItem('preferredLang') || 'ru';
            if (langSelect) langSelect.value = currentUI;
            exportModal.style.display = 'block';
        });
    }

    // Sync export modal language with main interface language
    if (langSelect) {
        langSelect.addEventListener('change', (e) => {
            const mainLangSelect = document.getElementById('lang-select');
            if (mainLangSelect) {
                mainLangSelect.value = e.target.value;
                mainLangSelect.dispatchEvent(new Event('change'));
            }
        });

        // Also listen to global language changes so the dropdown stays in sync
        // if language is changed from the header while the modal is open 
        // (or just for consistency on next open).
        window.addEventListener('languageChanged', (e) => {
            if (e.detail && e.detail.lang) {
                langSelect.value = e.detail.lang;
            }
        });
    }

    const closeModalBtn = exportModal.querySelector('.close-modal');
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', () => {
            exportModal.style.display = 'none';
        });
    }

    // Toggle custom range inputs
    if (periodSelect) {
        periodSelect.addEventListener('change', () => {
            if (periodSelect.value === 'custom') {
                customRangeInputs.classList.add('active');
            } else {
                customRangeInputs.classList.remove('active');
            }
        });
    }

    // Format selection (Chips)
    formatBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            formatBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            selectedFormat = btn.getAttribute('data-format');
        });
    });

    // Step selection (Chips)
    stepBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            stepBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            selectedStep = btn.getAttribute('data-step');
        });
    });

    // Reset Form
    if (resetBtn) {
        resetBtn.addEventListener('click', () => {
            periodSelect.value = 'week';
            customRangeInputs.classList.remove('active');
            document.getElementById('export-start-date').value = '';
            document.getElementById('export-end-date').value = '';
            
            paramTemp.checked = true;
            paramHumidity.checked = true;
            paramWind.checked = true;
            paramAI.checked = false;
            
            stepBtns[0].click(); // hourly
            formatBtns[0].click(); // json
            
            clearPreview();
        });
    }

    function clearPreview() {
        if (previewBox && previewPlaceholder) {
            previewBox.style.display = 'none';
            previewBox.textContent = '';
            previewPlaceholder.style.display = 'flex';
        }
    }

    function showPreview(content) {
        if (previewBox && previewPlaceholder) {
            previewPlaceholder.style.display = 'none';
            previewBox.style.display = 'block';
            previewBox.textContent = content;
        }
    }

    function setLoader(btn, isLoading) {
        if (isLoading) {
            btn.classList.add('btn-loading');
        } else {
            btn.classList.remove('btn-loading');
        }
    }

    // Start Export
    if (startExportBtn) {
        startExportBtn.addEventListener('click', async () => {
            await processExport(false);
        });
    }

    // Preview Export
    if (previewBtn) {
        previewBtn.addEventListener('click', async () => {
            await processExport(true);
        });
    }

    async function processExport(isPreview) {
        const btn = isPreview ? previewBtn : startExportBtn;
        
        const currentData = window.getCurrentWeatherData ? window.getCurrentWeatherData() : null;
        const currentCoords = window.getCurrentCityCoords ? window.getCurrentCityCoords() : null;

        if (!currentData) {
            const msg = getTranslation('export-error-no-data', 'Нет данных для выгрузки. Сначала найдите город.');
            if (window.showNotification) window.showNotification(msg, 'warning');
            else alert(msg);
            return;
        }

        setLoader(btn, true);
        
        // Simulate a tiny delay for UX (makes the UI feel more active/processing)
        await new Promise(r => setTimeout(r, 400)); 

        const dataLang = langSelect ? langSelect.value : (localStorage.getItem('preferredLang') || 'ru');
        const exportData = prepareExportData(currentData, currentCoords, dataLang);
        
        if (exportData) {
            if (isPreview) {
                const {content} = generateFileContent(exportData, selectedFormat);
                
                // Truncate preview if too long
                const lines = content.split('\n');
                if (lines.length > 20) {
                    showPreview(lines.slice(0, 20).join('\n') + '\n\n... (данные обрезаны для предпросмотра)');
                } else {
                    showPreview(content);
                }
            } else {
                downloadFile(exportData, selectedFormat);
                exportModal.style.display = 'none';
                if (window.showNotification) {
                    window.showNotification(getTranslation('export-success', 'Файл успешно сформирован и скачан'), 'success');
                }
            }
        }
        
        setLoader(btn, false);
    }

    function prepareExportData(rawWeather, coords, dataLang) {
        const period = periodSelect.value;
        const includeTemp = paramTemp ? paramTemp.checked : false;
        const includeHumidity = paramHumidity ? paramHumidity.checked : false;
        const includeWind = paramWind ? paramWind.checked : false;
        const includePrecip = paramPrecip ? paramPrecip.checked : false;
        const includePressure = paramPressure ? paramPressure.checked : false;
        const includeAI = paramAI ? paramAI.checked : false;

        let data = {
            city: coords ? coords.name : (document.getElementById('city-name') ? document.getElementById('city-name').textContent : 'Unknown'),
            country: coords ? coords.country : (document.getElementById('country-name') ? document.getElementById('country-name').textContent : ''),
            export_date: new Date().toISOString(),
            period: period,
            step: selectedStep,
            weather_data: []
        };

        const hourly = rawWeather.hourly;
        const daily = rawWeather.daily;

        let filterStartIndex = 0;
        let filterEndIndex = hourly.time.length;

        const now = new Date();
        const getIndexTarget = (targetDateStr) => {
            const idx = hourly.time.findIndex(t => t.startsWith(targetDateStr));
            return idx !== -1 ? idx : -1;
        };

        if (period === 'today') {
            const todayStr = now.toISOString().split('T')[0];
            const idx = getIndexTarget(todayStr);
            if (idx !== -1) { filterStartIndex = idx; filterEndIndex = idx + 24; }
        } else if (period === 'tomorrow') {
            const tomorrow = new Date(now);
            tomorrow.setDate(tomorrow.getDate() + 1);
            const tomorrowStr = tomorrow.toISOString().split('T')[0];
            const idx = getIndexTarget(tomorrowStr);
            if (idx !== -1) { filterStartIndex = idx; filterEndIndex = idx + 24; }
            else { filterStartIndex = hourly.time.length; filterEndIndex = hourly.time.length; } 
        } else if (period === 'yesterday') {
            const yesterday = new Date(now);
            yesterday.setDate(yesterday.getDate() - 1);
            const yesterdayStr = yesterday.toISOString().split('T')[0];
            const idx = getIndexTarget(yesterdayStr);
            if (idx !== -1) { filterStartIndex = idx; filterEndIndex = idx + 24; }
            else { filterStartIndex = 0; filterEndIndex = Math.min(24, hourly.time.length); }
        } else if (period === 'last6h') {
            const currentHourStr = now.toISOString().slice(0, 14) + "00"; // "YYYY-MM-DDTHH:00"
            const currentIdx = hourly.time.findIndex(t => t.startsWith(currentHourStr));
            if (currentIdx !== -1) {
                filterEndIndex = currentIdx + 1;
                filterStartIndex = Math.max(0, currentIdx - 5);
            }
        } else if (period === 'last24h') {
            const currentHourStr = now.toISOString().slice(0, 14) + "00";
            const currentIdx = hourly.time.findIndex(t => t.startsWith(currentHourStr));
            if (currentIdx !== -1) {
                filterEndIndex = currentIdx + 1;
                filterStartIndex = Math.max(0, currentIdx - 23);
            }
        } else if (period === '3days') {
            const threeAgo = new Date(now);
            threeAgo.setDate(threeAgo.getDate() - 3);
            const threeAgoStr = threeAgo.toISOString().split('T')[0];
            const idx = getIndexTarget(threeAgoStr);
            if (idx !== -1) { filterStartIndex = idx; filterEndIndex = idx + 72; }
            else { filterStartIndex = 0; filterEndIndex = 72; }
        } else if (period === 'week' || period === '2weeks') {
            filterStartIndex = 0;
            filterEndIndex = hourly.time.length;
        } else if (period === 'this_month') {
            const monthStr = now.toISOString().slice(0, 7); // "YYYY-MM"
            const startIdx = hourly.time.findIndex(t => t.startsWith(monthStr));
            if (startIdx !== -1) {
                filterStartIndex = startIdx;
                filterEndIndex = hourly.time.findLastIndex(t => t.startsWith(monthStr)) + 1;
            } else {
                filterStartIndex = hourly.time.length; filterEndIndex = hourly.time.length;
            }
        } else if (period === 'month') {
            const thirtyAgo = new Date(now);
            thirtyAgo.setDate(thirtyAgo.getDate() - 30);
            const thirtyAgoStr = thirtyAgo.toISOString().split('T')[0];
            const idx = getIndexTarget(thirtyAgoStr);
            if (idx !== -1) filterStartIndex = idx;
            else filterStartIndex = 0;
            filterEndIndex = hourly.time.length;
        } else if (period === 'this_year') {
            const yearStr = now.toISOString().slice(0, 4); // "YYYY"
            const startIdx = hourly.time.findIndex(t => t.startsWith(yearStr));
            if (startIdx !== -1) {
                filterStartIndex = startIdx;
                filterEndIndex = hourly.time.findLastIndex(t => t.startsWith(yearStr)) + 1;
            } else {
                filterStartIndex = hourly.time.length; filterEndIndex = hourly.time.length;
            }
        } else if (period === 'last_year') {
            const lastYear = new Date(now);
            lastYear.setFullYear(lastYear.getFullYear() - 1);
            const yearStr = lastYear.toISOString().slice(0, 4); // "YYYY"
            const startIdx = hourly.time.findIndex(t => t.startsWith(yearStr));
            if (startIdx !== -1) {
                filterStartIndex = startIdx;
                filterEndIndex = hourly.time.findLastIndex(t => t.startsWith(yearStr)) + 1;
            } else {
                filterStartIndex = hourly.time.length; filterEndIndex = hourly.time.length;
            }
        } else if (period === 'custom') {
            const start = document.getElementById('export-start-date').value;
            const end = document.getElementById('export-end-date').value;
            if (start) {
                filterStartIndex = hourly.time.findIndex(t => t.startsWith(start));
                if (filterStartIndex === -1) filterStartIndex = 0;
            }
            if (end) {
                filterEndIndex = hourly.time.findLastIndex(t => t.startsWith(end));
                if (filterEndIndex === -1) filterEndIndex = hourly.time.length;
                else filterEndIndex += 24;
            }
        }

        const tDate = getTranslation('export-col-date', 'Дата', dataLang);
        const tTime = getTranslation('export-col-time', 'Время', dataLang);
        const tTemp = getTranslation('export-col-temp', 'Температура (°C)', dataLang);
        const tTempMax = getTranslation('export-col-temp-max', 'Макс. Температура (°C)', dataLang);
        const tTempMin = getTranslation('export-col-temp-min', 'Мин. Температура (°C)', dataLang);
        const tHum = getTranslation('export-col-humidity', 'Влажность (%)', dataLang);
        const tUV = getTranslation('export-col-uv', 'УФ Индекс', dataLang);
        const tWind = getTranslation('export-col-wind', 'Ск. ветра (км/ч)', dataLang);
        const tWindMax = getTranslation('export-col-wind-max', 'Макс. ск. ветра (км/ч)', dataLang);
        const tPrecip = getTranslation('export-col-precip', 'Осадки (мм)', dataLang);
        const tPressure = getTranslation('export-col-pressure', 'Давление (гПа)', dataLang);
        const tAI = getTranslation('export-col-ai', 'Рекомендация ИИ', dataLang);

        if (selectedStep === 'hourly') {
            for (let i = Math.max(0, filterStartIndex); i < Math.min(hourly.time.length, filterEndIndex); i++) {
                let entry = {};
                entry[tTime] = hourly.time[i];
                if (includeTemp) entry[tTemp] = hourly.temperature_2m[i];
                if (includeHumidity && hourly.relative_humidity_2m) entry[tHum] = hourly.relative_humidity_2m[i];
                if (includeWind && hourly.wind_speed_10m) entry[tWind] = hourly.wind_speed_10m[i];
                if (includePrecip && hourly.precipitation) entry[tPrecip] = hourly.precipitation[i];
                if (includePressure && hourly.surface_pressure) entry[tPressure] = hourly.surface_pressure[i];
                if (includeAI) entry[tAI] = getAIRecommendationForExport(hourly.temperature_2m[i], dataLang);
                data.weather_data.push(entry);
            }
        } else {
            let dStartIndex = Math.floor(filterStartIndex / 24);
            let dEndIndex = Math.ceil(filterEndIndex / 24);

            for (let i = Math.max(0, dStartIndex); i < Math.min(daily.time.length, dEndIndex); i++) {
                let entry = {};
                entry[tDate] = daily.time[i];
                if (includeTemp) {
                    entry[tTempMax] = daily.temperature_2m_max[i];
                    entry[tTempMin] = daily.temperature_2m_min[i];
                }
                if (includeHumidity) entry[tUV] = daily.uv_index_max[i];
                if (includeWind) entry[tWindMax] = daily.wind_speed_10m_max[i];
                if (includePrecip && daily.precipitation_sum) entry[tPrecip] = daily.precipitation_sum[i];
                // Note: Open-Meteo doesn't strictly provide daily mean pressure automatically out-of-the-box in the same request, so we'll skip pressure for daily averages unless requested specifically. We'll leave it blank or omit it.
                if (includeAI) entry[tAI] = getAIRecommendationForExport(daily.temperature_2m_max[i], dataLang);
                data.weather_data.push(entry);
            }
        }

        if (data.weather_data.length === 0) {
            window.showNotification(getTranslation('export-error-no-period-data', 'Нет данных за выбранный период'), 'warning');
            return null;
        }

        return data;
    }

    function getAIRecommendationForExport(temp, dataLang) {
        if (temp < 0) return getTranslation('export-ai-cold', "Одевайтесь теплее", dataLang);
        if (temp < 20) return getTranslation('export-ai-comfortable', "Комфортная погода", dataLang);
        return getTranslation('export-ai-hot', "Жарко, пейте больше воды", dataLang);
    }

    function generateFileContent(data, format) {
        let content = '';
        let contentType = '';

        if (format === 'json') {
            content = JSON.stringify(data, null, 2);
            contentType = 'application/json';
        } else if (format === 'csv') {
            const BOM = '\uFEFF';
            const headers = Object.keys(data.weather_data[0]);
            const csvRows = [
                headers.join(','),
                ...data.weather_data.map(row => headers.map(header => {
                    const val = row[header] || '';
                    return `"${val.toString().replace(/"/g, '""')}"`;
                }).join(','))
            ];
            content = BOM + csvRows.join('\n');
            contentType = 'text/csv;charset=utf-8;';
        } else if (format === 'excel') {
            const headers = Object.keys(data.weather_data[0]);
            const tableHeaders = headers.map(h => `<th style="background-color: #4f81bd; color: white;">${h}</th>`).join('');
            const tableRows = data.weather_data.map(row => 
                `<tr>${headers.map(h => `<td>${row[h] || ''}</td>`).join('')}</tr>`
            ).join('');

            content = `
                <html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40">
                <head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>Weather Export</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head>
                <body>
                    <table>
                        <thead><tr>${tableHeaders}</tr></thead>
                        <tbody>${tableRows}</tbody>
                    </table>
                </body>
                </html>
            `;
            contentType = 'application/vnd.ms-excel';
        }

        return {content, contentType};
    }

    function downloadFile(data, format) {
        const cityName = data.city || 'weather_data';
        const timestamp = new Date().getTime();
        let filename = `${cityName}_export_${timestamp}.${format === 'excel' ? 'xlsx' : format}`;
        
        const {content, contentType} = generateFileContent(data, format);

        const blob = new Blob([content], { type: contentType });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }
});

