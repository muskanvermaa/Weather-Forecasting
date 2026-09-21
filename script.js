const apiKey = "907326d3292e63231b91284ce68c4b90"; // Replace with your OpenWeatherMap API key

const iconMap = {
    "Clear":  "https://cdn-icons-png.flaticon.com/128/1163/1163661.png",
    "Clouds": "https://cdn-icons-png.flaticon.com/128/1146/1146869.png",
    "Rain":   "https://cdn-icons-png.flaticon.com/128/3076/3076129.png",
    "Drizzle":"https://cdn-icons-png.flaticon.com/128/4150/4150897.png",
    "Thunderstorm":"https://cdn-icons-png.flaticon.com/128/4036/4036540.png",
    "Snow":"https://cdn-icons-png.flaticon.com/128/3845/3845731.png",
    "Mist":"https://cdn-icons-png.flaticon.com/128/1197/1197102.png",
    "Haze":"https://cdn-icons-png.flaticon.com/128/1197/1197102.png",
    "Fog":"https://cdn-icons-png.flaticon.com/128/616/616491.png",
    "Smoke":"https://cdn-icons-png.flaticon.com/128/4380/4380458.png",
    "Dust":"https://cdn-icons-png.flaticon.com/128/4005/4005901.png",
    "Sand":"https://cdn-icons-png.flaticon.com/128/4005/4005901.png",
    "Ash":"https://cdn-icons-png.flaticon.com/128/4150/4150947.png",
    "Squall":"https://cdn-icons-png.flaticon.com/128/1684/1684375.png",
    "Tornado":"https://cdn-icons-png.flaticon.com/128/1779/1779940.png"
};
function getWeatherIcon(condition) {
    return iconMap[condition] || iconMap["Clear"];
}

function getWeather() {
    let city = document.getElementById('city-input').value.trim();
    if (!city) city = 'Mumbai';
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&units=metric&appid=${apiKey}`)
      .then(res => res.json())
      .then(data => {
        document.getElementById('main-icon').src = getWeatherIcon(data.weather[0].main);
        document.getElementById('city').textContent = `${data.name}, ${data.sys.country}`;
        document.getElementById('desc').textContent = data.weather[0].description.replace(/^./, s => s.toUpperCase());
        document.getElementById('temp').textContent = `${Math.round(data.main.temp)}°C`;
        document.getElementById('feels').textContent = `${Math.round(data.main.feels_like)}°C`;
        document.getElementById('humid').textContent = `Humidity: ${data.main.humidity}%`;
        document.getElementById('wind').textContent = `Wind: ${data.wind.speed} km/h`;
        document.getElementById('vis').textContent = `Visibility: ${(data.visibility/1000).toFixed(1)} km`;
        document.getElementById('sunrise').textContent = new Date(data.sys.sunrise*1000).toLocaleTimeString();
        document.getElementById('sunset').textContent = new Date(data.sys.sunset*1000).toLocaleTimeString();
    });
}

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((p) => {
            fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${p.coords.latitude}&lon=${p.coords.longitude}&units=metric&appid=${apiKey}`)
                .then(res => res.json())
                .then(data => {
                    document.getElementById('city-input').value = data.name;
                    getWeather();
                });
        });
    }
}

document.getElementById("forecast-btn").onclick = function() {
    const city = document.getElementById('city-input').value.trim() || 'Mumbai';
    window.open(`5-day.html?city=${encodeURIComponent(city)}`, '_blank');
};

// Initial load
getWeather();

// ... your weather code ...

const tips = [
  "🌦️ Tip: If humidity is high, drink extra water.",
  "☀️ Tip: Check the UV index before heading out!",
  "🌬️ Tip: Wind is strong today, secure loose items!",
  "🌧️ Tip: Carry an umbrella if it's cloudy.",
  "❄️ Tip: Layer up when temperatures drop!",
];
function showTip() {
  const tipBox = document.getElementById('weather-tip');
  if (tipBox) {
    tipBox.textContent = tips[Math.floor(Math.random() * tips.length)];
  }
}
showTip();
// Optionally, rotate tips every few seconds:
setInterval(showTip, 9000);

