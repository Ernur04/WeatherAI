/**
 * WeatherAI - Mini Calendar Logic
 */

document.addEventListener("DOMContentLoaded", () => {
  const calendarToggle = document.getElementById("calendar-toggle");
  const calendarPopup = document.getElementById("calendar-popup");
  const calendarMonthYear = document.getElementById("calendar-month-year");
  const calendarDays = document.getElementById("calendar-days");
  const prevMonthBtn = document.getElementById("prev-month");
  const nextMonthBtn = document.getElementById("next-month");

  let currentDate = new Date();

  const getTranslation = (key, fallback) => {
    const lang = localStorage.getItem('preferredLang') || 'ru';
    if (window.translations && window.translations[lang] && window.translations[lang][key]) {
      return window.translations[lang][key];
    }
    return fallback;
  };

  const getMonthNames = () => {
    return getTranslation('calendar-months', [
      "Январь", "Февраль", "Март", "Апрель", "Май", "Июнь",
      "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"
    ]);
  };

  const getWeekdays = () => {
    return getTranslation('calendar-weekdays-short', ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"]);
  };

  const getHolidays = () => {
    const holidayMap = {
      "0-1": "holiday-new-year",
      "0-2": "holiday-new-year",
      "2-8": "holiday-women",
      "2-21": "holiday-nauryz",
      "2-22": "holiday-nauryz",
      "2-23": "holiday-nauryz",
      "4-1": "holiday-unity",
      "4-7": "holiday-defender",
      "4-9": "holiday-victory",
      "6-6": "holiday-capital",
      "7-30": "holiday-constitution",
      "9-25": "holiday-republic",
      "11-16": "holiday-independence",
    };

    const translatedHolidays = {};
    for (const [date, key] of Object.entries(holidayMap)) {
      translatedHolidays[date] = getTranslation(key, key);
    }
    return translatedHolidays;
  };

  const updateWeekdaysUI = () => {
    const weekdaysContainer = document.querySelector('.calendar-weekdays');
    if (!weekdaysContainer) return;

    const weekdays = getWeekdays();
    weekdaysContainer.innerHTML = "";
    weekdays.forEach((day, index) => {
      const dayDiv = document.createElement("div");
      dayDiv.textContent = day;
      if (index >= 5) dayDiv.classList.add("weekend");
      weekdaysContainer.appendChild(dayDiv);
    });
  };

  const renderCalendar = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const monthNames = getMonthNames();
    const holidays = getHolidays();

    // Set month and year in header
    calendarMonthYear.textContent = `${monthNames[month]} ${year}`;

    // Clear previous days
    calendarDays.innerHTML = "";

    // Get first day of month and last day of month
    const firstDayOfMonth = new Date(year, month, 1).getDay(); // 0 is Sunday
    const lastDateOfMonth = new Date(year, month + 1, 0).getDate();

    // Adjust first day to start from Monday (1) instead of Sunday (0)
    // If firstDayOfMonth is 0 (Sunday), it should be 6
    let adjustFirstDay = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;

    // Add empty cells for days from previous month
    for (let i = 0; i < adjustFirstDay; i++) {
      const emptyDay = document.createElement("div");
      emptyDay.classList.add("calendar-day", "empty");
      calendarDays.appendChild(emptyDay);
    }

    // Add days of current month
    const today = new Date();
    for (let i = 1; i <= lastDateOfMonth; i++) {
      const dayElement = document.createElement("div");
      dayElement.classList.add("calendar-day");
      dayElement.textContent = i;

      // Check if it's today
      if (
        i === today.getDate() &&
        month === today.getMonth() &&
        year === today.getFullYear()
      ) {
        dayElement.classList.add("today");
      }

      // Check if it's a holiday
      const dateKey = `${month}-${i}`;
      if (holidays[dateKey]) {
        dayElement.classList.add("holiday");
        dayElement.title = holidays[dateKey];
      }

      calendarDays.appendChild(dayElement);
    }
  };

  // Toggle calendar visibility
  calendarToggle.addEventListener("click", (e) => {
    e.stopPropagation();
    calendarPopup.classList.toggle("active");
    if (calendarPopup.classList.contains("active")) {
      renderCalendar();
    }
  });

  // Close calendar when clicking outside
  document.addEventListener("click", (e) => {
    if (
      !calendarPopup.contains(e.target) &&
      !calendarToggle.contains(e.target)
    ) {
      calendarPopup.classList.remove("active");
    }
  });

  // Navigation
  prevMonthBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    currentDate.setMonth(currentDate.getMonth() - 1);
    renderCalendar();
  });

  nextMonthBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    currentDate.setMonth(currentDate.getMonth() + 1);
    renderCalendar();
  });

  // Prevent click inside calendar from closing it
  calendarPopup.addEventListener("click", (e) => {
    e.stopPropagation();
  });

  // Re-render calendar when language changes
  window.addEventListener('languageChanged', () => {
    updateWeekdaysUI();
    if (calendarPopup.classList.contains("active")) {
      renderCalendar();
    }
  });

  // Initial UI update for weekdays
  updateWeekdaysUI();
});
