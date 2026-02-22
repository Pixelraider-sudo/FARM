const alerts = [
    "⚠️ Maize: Watch for fall armyworm in rainy season.",
    "🌧 Heavy rainfall expected in Western region.",
    "🍅 Tomatoes: Risk of early blight during humidity.",
    "🥔 Potatoes: Ensure proper drainage.",
    "🌾 Rice: Maintain consistent water levels."
];

const alertText = document.getElementById("alert-text");

let index = 0;

function changeAlert() {
    alertText.classList.remove("fade");

    // small delay to restart animation
    setTimeout(() => {
        alertText.textContent = alerts[index];
        alertText.classList.add("fade");
        index = (index + 1) % alerts.length;
    }, 200);
}

// Show first alert
changeAlert();

// Change every 5 seconds
setInterval(changeAlert, 5000);