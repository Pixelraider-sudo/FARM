(function () {
  "use strict";

  const alerts = [
    "⚠️ Maize: Watch for fall armyworm in rainy season.",
    "🌧 Heavy rainfall expected in Western region.",
    "🍅 Tomatoes: Risk of early blight during humidity.",
    "🥔 Potatoes: Ensure proper drainage.",
    "🌾 Rice: Maintain consistent water levels.",
  ];

  let index = 0;

  function changeAlert() {
    const el = document.getElementById("alert-text");
    if (!el) return;
    el.classList.remove("fade");
    setTimeout(() => {
      el.textContent = alerts[index];
      el.classList.add("fade");
      index = (index + 1) % alerts.length;
    }, 200);
  }

  document.addEventListener("DOMContentLoaded", () => {
    changeAlert();
    setInterval(changeAlert, 5000);
  });
})();
