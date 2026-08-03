(function () {
  "use strict";

  function buildCalendar() {
    const body = document.getElementById("mini-calendar-body");
    if (!body) return;
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const today = now.getDate();

    let rows = "";
    let day = 1;
    for (let week = 0; week < 6 && day <= daysInMonth; week++) {
      let row = "<tr>";
      for (let dow = 0; dow < 7; dow++) {
        if (week === 0 && dow < firstDay) {
          row += "<td></td>";
        } else if (day > daysInMonth) {
          row += "<td></td>";
        } else {
          const isToday = day === today;
          row += `<td class="${isToday ? "today" : ""}">${day}</td>`;
          day++;
        }
      }
      row += "</tr>";
      rows += row;
    }
    body.innerHTML = rows;
  }

  const NOTES = {
    "rift-valley|long-rains": "Rift Valley long rains typically run March–May: ideal for maize and beans.",
    "rift-valley|dry-season": "Dry season in the Rift Valley favors irrigated vegetables and drought-tolerant crops.",
    "rift-valley|irrigation": "With irrigation, tomatoes and potatoes can be grown year-round in the Rift Valley.",
    "western|long-rains": "Western region long rains (March–May) suit maize, beans and sugarcane.",
    "western|dry-season": "Dry season in Western Kenya is best for early land preparation and short-season crops.",
    "western|irrigation": "Irrigated plots in Western Kenya can support rice and vegetables through the dry months.",
    "coastal|long-rains": "Coastal long rains favor cassava, cowpeas and coconut-intercropped plots.",
    "coastal|dry-season": "Coastal dry season requires drought-tolerant varieties and mulching to retain moisture.",
    "coastal|irrigation": "Irrigated coastal farms can grow rice and horticultural crops year-round.",
  };

  function updateNote() {
    const region = document.getElementById("region");
    const season = document.getElementById("season");
    const note = document.getElementById("region-season-note");
    if (!region || !season || !note) return;
    const key = `${region.value}|${season.value}`;
    note.textContent = NOTES[key] || "Select a region and season to see tailored guidance.";
    note.classList.add("show");
  }

  document.addEventListener("DOMContentLoaded", () => {
    buildCalendar();
    updateNote();
    document.getElementById("region")?.addEventListener("change", updateNote);
    document.getElementById("season")?.addEventListener("change", updateNote);
  });
})();
