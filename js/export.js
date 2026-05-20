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
    const paramUV = document.getElementById('param-uv');
    const paramVisibility = document.getElementById('param-visibility');
    const paramSunrise = document.getElementById('param-sunrise');
    const paramSunset = document.getElementById('param-sunset');
    const paramCloud = document.getElementById('param-cloud Cover'); 
    const paramMoonphase = document.getElementById('param-moonphase');
    const paramClothing = document.getElementById('param-clothing');
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
            periodSelect.value = 'today';
            customRangeInputs.classList.remove('active');
            document.getElementById('export-start-date').value = '';
            document.getElementById('export-end-date').value = '';
            
            if(paramTemp) paramTemp.checked = true;
            if(paramHumidity) paramHumidity.checked = true;
            if(paramWind) paramWind.checked = true;
            if(paramPrecip) paramPrecip.checked = true;
            if(paramPressure) paramPressure.checked = true;
            if(paramUV) paramUV.checked = true;
            if(paramVisibility) paramVisibility.checked = true;
            if(paramSunrise) paramSunrise.checked = true;
            if(paramSunset) paramSunset.checked = true;
            if(paramCloud) paramCloud.checked = true;
            if(paramMoonphase) paramMoonphase.checked = true;
            if(paramClothing) paramClothing.checked = true;
            if(paramAI) paramAI.checked = false;
            
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
        await new Promise(r => setTimeout(r, 400)); 

        const dataLang = langSelect ? langSelect.value : (localStorage.getItem('preferredLang') || 'ru');
        const exportData = prepareExportData(currentData, currentCoords, dataLang);
        
        if (exportData) {
            const {content} = generateFileContent(exportData, selectedFormat);
            if (isPreview) {
                showPreview(content); 
            } else {
                downloadFile(content, exportData.city || 'weather_data', selectedFormat);
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
        const includeUV = paramUV ? paramUV.checked : false;
        const includeVisibility = paramVisibility ? paramVisibility.checked : false;
        const includeSunrise = paramSunrise ? paramSunrise.checked : false;
        const includeSunset = paramSunset ? paramSunset.checked : false;
        const includeCloud = paramCloud ? paramCloud.checked : false;
        const includeMoonphase = paramMoonphase ? paramMoonphase.checked : false;
        const includeClothing = paramClothing ? paramClothing.checked : false;
        const includeAI = paramAI ? paramAI.checked : false;

        let data = {
            city: coords ? coords.name : (document.getElementById('city-name') ? document.getElementById('city-name').textContent : 'Unknown'),
            country: coords ? coords.country : (document.getElementById('country-name') ? document.getElementById('country-name').textContent : ''),
            export_date: new Date().toISOString(),
            period: period,
            step: selectedStep,
            weather_data: []
        };

        const hourly = rawWeather.hourly || {};
        const daily = rawWeather.daily || {};

        let filterStartIndex = 0;
        let filterEndIndex = hourly.time ? hourly.time.length : 0;

        const now = new Date();
        const getIndexTarget = (targetDateStr) => {
            if (!hourly.time) return -1;
            const idx = hourly.time.findIndex(t => t.startsWith(targetDateStr));
            return idx !== -1 ? idx : -1;
        };

        const todayStr = now.toISOString().split('T')[0];

        if (period === 'today') {
            const idx = getIndexTarget(todayStr);
            if (idx !== -1) { filterStartIndex = idx; filterEndIndex = idx + 24; }
        } else if (period === 'tomorrow') {
            const tomorrow = new Date(now);
            tomorrow.setDate(tomorrow.getDate() + 1);
            const tomorrowStr = tomorrow.toISOString().split('T')[0];
            const idx = getIndexTarget(tomorrowStr);
            if (idx !== -1) { filterStartIndex = idx; filterEndIndex = idx + 24; }
            else { filterStartIndex = hourly.time.length; filterEndIndex = hourly.time.length; } 
        } else if (period === 'today_tomorrow') {
            const idx = getIndexTarget(todayStr);
            if (idx !== -1) { filterStartIndex = idx; filterEndIndex = idx + 48; }
        } else if (period === '3days') {
            const idx = getIndexTarget(todayStr);
            if (idx !== -1) { filterStartIndex = idx; filterEndIndex = idx + 72; }
        } else if (period === '5days') {
            const idx = getIndexTarget(todayStr);
            if (idx !== -1) { filterStartIndex = idx; filterEndIndex = idx + 120; }
        } else if (period === '7days') {
            const idx = getIndexTarget(todayStr);
            if (idx !== -1) { filterStartIndex = idx; filterEndIndex = idx + 168; }
        } else if (period === 'yesterday') {
            const yesterday = new Date(now);
            yesterday.setDate(yesterday.getDate() - 1);
            const yesterdayStr = yesterday.toISOString().split('T')[0];
            const idx = getIndexTarget(yesterdayStr);
            if (idx !== -1) { filterStartIndex = idx; filterEndIndex = idx + 24; }
            else { filterStartIndex = 0; filterEndIndex = Math.min(24, hourly.time.length); }
        } else if (period === 'last6h') {
            const currentHourStr = now.toISOString().slice(0, 14) + "00";
            const currentIdx = hourly.time ? hourly.time.findIndex(t => t.startsWith(currentHourStr)) : -1;
            if (currentIdx !== -1) {
                filterEndIndex = currentIdx + 1;
                filterStartIndex = Math.max(0, currentIdx - 5);
            }
        } else if (period === 'last24h') {
            const currentHourStr = now.toISOString().slice(0, 14) + "00";
            const currentIdx = hourly.time ? hourly.time.findIndex(t => t.startsWith(currentHourStr)) : -1;
            if (currentIdx !== -1) {
                filterEndIndex = currentIdx + 1;
                filterStartIndex = Math.max(0, currentIdx - 23);
            }
        } else if (period === 'custom') {
            const start = document.getElementById('export-start-date').value;
            const end = document.getElementById('export-end-date').value;
            if (start && hourly.time) {
                filterStartIndex = hourly.time.findIndex(t => t.startsWith(start));
                if (filterStartIndex === -1) filterStartIndex = 0;
            }
            if (end && hourly.time) {
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
        const tWind = getTranslation('export-col-wind', 'Ск. ветра (км/ч)', dataLang);
        const tWindMax = getTranslation('export-col-wind-max', 'Макс. ск. ветра (км/ч)', dataLang);
        const tPrecip = getTranslation('export-col-precip', 'Осадки (мм)', dataLang);
        const tPressure = getTranslation('export-col-pressure', 'Давление (гПа)', dataLang);
        
        const tUV = getTranslation('export-col-uv', 'УФ Индекс', dataLang);
        const tVisibility = getTranslation('export-col-visibility', 'Видимость (км)', dataLang);
        const tSunrise = getTranslation('export-col-sunrise', 'Восход', dataLang);
        const tSunset = getTranslation('export-col-sunset', 'Закат', dataLang);
        const tCloud = getTranslation('export-col-cloud', 'Облачность (%)', dataLang);
        const tMoonphase = getTranslation('export-col-moonphase', 'Фаза Луны', dataLang);
        const tClothing = getTranslation('export-col-clothing', 'Совет одежды', dataLang);
        const tAI = getTranslation('export-col-ai', 'Рекомендация ИИ', dataLang);

        if (selectedStep === 'hourly' && hourly.time) {
            for (let i = Math.max(0, filterStartIndex); i < Math.min(hourly.time.length, filterEndIndex); i++) {
                let entry = {};
                entry[tTime] = hourly.time[i].replace('T', ' ');
                
                if (includeTemp && hourly.temperature_2m !== undefined) entry[tTemp] = hourly.temperature_2m[i];
                if (includeHumidity && hourly.relative_humidity_2m !== undefined) entry[tHum] = hourly.relative_humidity_2m[i];
                if (includeWind && hourly.wind_speed_10m !== undefined) entry[tWind] = hourly.wind_speed_10m[i];
                if (includePrecip && hourly.precipitation !== undefined) entry[tPrecip] = hourly.precipitation[i];
                if (includePressure && hourly.surface_pressure !== undefined) entry[tPressure] = hourly.surface_pressure[i];
                if (includeUV && hourly.uv_index !== undefined) entry[tUV] = hourly.uv_index[i];
                if (includeVisibility && hourly.visibility !== undefined) entry[tVisibility] = (hourly.visibility[i] / 1000).toFixed(1);
                if (includeCloud && hourly.cloud_cover !== undefined) entry[tCloud] = hourly.cloud_cover[i];
                
                if ((includeSunrise || includeSunset || includeMoonphase) && daily.time) {
                    const currentHourDate = hourly.time[i].split('T')[0];
                    const dIdx = daily.time.findIndex(d => d === currentHourDate);
                    if (dIdx !== -1) {
                        if (includeSunrise && daily.sunrise) entry[tSunrise] = daily.sunrise[dIdx].split('T')[1] || daily.sunrise[dIdx];
                        if (includeSunset && daily.sunset) entry[tSunset] = daily.sunset[dIdx].split('T')[1] || daily.sunset[dIdx];
                        if (includeMoonphase && daily.moon_phase !== undefined) entry[tMoonphase] = daily.moon_phase[dIdx];
                    }
                }
                
                if (includeClothing && hourly.temperature_2m !== undefined) entry[tClothing] = getAIRecommendationForExport(hourly.temperature_2m[i], dataLang);
                if (includeAI && hourly.temperature_2m !== undefined) entry[tAI] = getAIRecommendationForExport(hourly.temperature_2m[i], dataLang);
                
                data.weather_data.push(entry);
            }
        } 
        else if (selectedStep === 'daily' && daily.time) {
            let dStartIndex = Math.floor(filterStartIndex / 24);
            let dEndIndex = Math.ceil(filterEndIndex / 24);

            for (let i = Math.max(0, dStartIndex); i < Math.min(daily.time.length, dEndIndex); i++) {
                let entry = {};
                entry[tDate] = daily.time[i];
                
                if (includeTemp) {
                    if (daily.temperature_2m_max !== undefined) entry[tTempMax] = daily.temperature_2m_max[i];
                    if (daily.temperature_2m_min !== undefined) entry[tTempMin] = daily.temperature_2m_min[i];
                }
                if (includeHumidity && daily.relative_humidity_2m_max !== undefined) entry[tHum] = daily.relative_humidity_2m_max[i];
                if (includeWind && daily.wind_speed_10m_max !== undefined) entry[tWindMax] = daily.wind_speed_10m_max[i];
                if (includePrecip && daily.precipitation_sum !== undefined) entry[tPrecip] = daily.precipitation_sum[i];
                if (includeUV && daily.uv_index_max !== undefined) entry[tUV] = daily.uv_index_max[i];
                if (includeVisibility && daily.visibility_min !== undefined) entry[tVisibility] = (daily.visibility_min[i] / 1000).toFixed(1);
                if (includeSunrise && daily.sunrise) entry[tSunrise] = daily.sunrise[i].split('T')[1] || daily.sunrise[i];
                if (includeSunset && daily.sunset) entry[tSunset] = daily.sunset[i].split('T')[1] || daily.sunset[i];
                if (includeCloud && daily.cloud_cover_mean !== undefined) entry[tCloud] = daily.cloud_cover_mean[i];
                if (includeMoonphase && daily.moon_phase !== undefined) entry[tMoonphase] = daily.moon_phase[i];
                
                const avgTemp = daily.temperature_2m_max ? daily.temperature_2m_max[i] : 0;
                if (includeClothing) entry[tClothing] = getAIRecommendationForExport(avgTemp, dataLang);
                if (includeAI) entry[tAI] = getAIRecommendationForExport(avgTemp, dataLang);
                
                data.weather_data.push(entry);
            }
        }

        if (data.weather_data.length === 0) {
            const noDataMsg = getTranslation('export-error-no-period-data', 'Нет данных за выбранный период');
            if (window.showNotification) window.showNotification(noDataMsg, 'warning');
            else alert(noDataMsg);
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
                    const val = row[header] !== undefined ? row[header] : '';
                    return `"${val.toString().replace(/"/g, '""')}"`;
                }).join(','))
            ];
            content = BOM + csvRows.join('\n');
            contentType = 'text/csv;charset=utf-8;';
        } else if (format === 'xml') {
            let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
            xml += `<weather_report>\n`;
            xml += `  <meta>\n`;
            xml += `    <city>${data.city}</city>\n`;
            xml += `    <country>${data.country}</country>\n`;
            xml += `    <export_date>${data.export_date}</export_date>\n`;
            xml += `    <period>${data.period}</period>\n`;
            xml += `    <step>${data.step}</step>\n`;
            xml += `  </meta>\n`;
            xml += `  <records>\n`;
            
            data.weather_data.forEach(row => {
                xml += `    <record>\n`;
                Object.keys(row).forEach(key => {
                    const cleanKey = key.replace(/[^a-zA-Z0-9_]/g, '_').replace(/^_+|_+$/g, '');
                    xml += `      <${cleanKey}>${row[key]}</${cleanKey}>\n`;
                });
                xml += `    </record>\n`;
            });
            
            xml += `  </records>\n`;
            xml += `</weather_report>`;
            content = xml;
            contentType = 'application/xml;charset=utf-8;';
        } else if (format === 'txt') {
            let txt = `==================================================\n`;
            txt += `ОТЧЕТ О ПОГОДЕ: ${data.city}, ${data.country}\n`;
            txt += `Период: ${data.period} | Шаг данных: ${data.step}\n`;
            txt += `Дата генерации: ${new Date(data.export_date).toLocaleString()}\n`;
            txt += `==================================================\n\n`;

            const headers = Object.keys(data.weather_data[0]);
            const colWidths = headers.map(h => {
                let maxLen = h.length;
                data.weather_data.forEach(row => {
                    const valStr = row[h] !== undefined ? row[h].toString() : '';
                    if (valStr.length > maxLen) maxLen = valStr.length;
                });
                return maxLen + 3;
            });

            let headerLine = '';
            headers.forEach((h, idx) => {
                headerLine += h.padEnd(colWidths[idx]);
            });
            txt += headerLine + '\n';
            txt += '-'.repeat(colWidths.reduce((a, b) => a + b, 0)) + '\n';

            data.weather_data.forEach(row => {
                let rowLine = '';
                headers.forEach((h, idx) => {
                    const valStr = row[h] !== undefined ? row[h].toString() : '';
                    rowLine += valStr.padEnd(colWidths[idx]);
                });
                txt += rowLine + '\n';
            });

            content = txt;
            contentType = 'text/plain;charset=utf-8;';
        } else if (format === 'xls' || format === 'doc') {
            const BOM = '\uFEFF';
            let html = `<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:${format === 'xls' ? 'excel' : 'word'}" xmlns="http://www.w3.org/TR/REC-html40">\n`;
            html += `<head><meta charset="utf-8">\n`;
            if (format === 'doc') {
                html += `
                <style>
                    @page WordSection1 {
                        size: 841.9pt 595.3pt; /* A4 Landscape */
                        mso-page-orientation: landscape;
                        margin: 1.0in 1.0in 1.0in 1.0in;
                    }
                    div.WordSection1 { page: WordSection1; }
                    table { border-collapse: collapse; width: 100%; font-family: sans-serif; font-size: 10pt; }
                    th, td { border: 1px solid #999; padding: 4px; text-align: center; vertical-align: middle; }
                    th { background-color: #f2f2f2; font-weight: bold; }
                    body { font-family: sans-serif; font-size: 11pt; }
                </style>\n`;
            } else if (format === 'xls') {
                html += `
                <style>
                    table { border-collapse: collapse; font-family: sans-serif; font-size: 10pt; }
                    th, td { border: 1px solid #999; padding: 4px; text-align: center; vertical-align: middle; mso-number-format:"\@"; }
                    th { background-color: #f2f2f2; font-weight: bold; }
                    body { font-family: sans-serif; font-size: 11pt; }
                </style>\n`;
            }
            html += `</head><body>\n`;
            
            if (format === 'doc') {
                html += `<div class="WordSection1">\n`;
            }
            
            html += `<h2>ОТЧЕТ О ПОГОДЕ: ${data.city}, ${data.country}</h2>\n`;
            html += `<p><strong>Период:</strong> ${data.period} | <strong>Шаг данных:</strong> ${data.step}</p>\n`;
            html += `<p><strong>Дата генерации:</strong> ${new Date(data.export_date).toLocaleString()}</p>\n<br>\n`;
            
            const headers = Object.keys(data.weather_data[0]);
            
            if (format === 'xls') {
                html += `<table border="1" cellpadding="5" cellspacing="0">\n`;
            } else {
                html += `<table>\n`;
            }

            html += `  <thead>\n    <tr>\n`;
            headers.forEach(h => {
                html += `      <th>${h}</th>\n`;
            });
            html += `    </tr>\n  </thead>\n  <tbody>\n`;
            
            data.weather_data.forEach(row => {
                html += `    <tr>\n`;
                headers.forEach(h => {
                    const val = row[h] !== undefined ? row[h] : '';
                    html += `      <td>${val}</td>\n`;
                });
                html += `    </tr>\n`;
            });
            
            html += `  </tbody>\n</table>\n`;
            
            if (format === 'doc') {
                html += `</div>\n`;
            }
            html += `</body></html>`;
            
            content = BOM + html;
            contentType = format === 'xls' ? 'application/vnd.ms-excel;charset=utf-8;' : 'application/msword;charset=utf-8;';
        }

        return {content, contentType};
    }

    function downloadFile(content, cityName, format) {
        const timestamp = new Date().getTime();
        let filename = `${cityName}_export_${timestamp}.${format}`;
        
        const blob = new Blob([content], { type: 'text/plain;charset=utf-8;' });
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