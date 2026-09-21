const apiKey = "907326d3292e63231b91284ce68c4b90"; // Replace with your key

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
function getCityFromQuery() {
    const params = new URLSearchParams(window.location.search);
    return params.get('city') || 'Mumbai';
}
function fetchForecast(city) {
    document.getElementById("city-title").textContent = `${city} 5-Day Forecast`;
    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(city)}&units=metric&appid=${apiKey}`)
        .then(res => res.json())
        .then(data => {
            let days = {};
            data.list.forEach(item => {
                let date = item.dt_txt.split(" ")[0];
                if (!days[date] || item.dt_txt.includes("12:00:00"))
                    days[date] = item;
            });
            let html = "";
            Object.keys(days).slice(0,6).forEach((date, i) => {
                let it = days[date];
                html += `<div class="forecast-card${i===0?' selected':''}">
                    <div class="fday">${new Date(date).toLocaleDateString('en-IN', {weekday:'short', month:'short', day:'numeric'})}</div>
                    <img class="ficon" src="${getWeatherIcon(it.weather[0].main)}" alt="">
                    <div class="fdesc">${it.weather[0].description.replace(/^./, s => s.toUpperCase())}</div>
                    <div class="ftemp">${Math.round(it.main.temp_max)}° / ${Math.round(it.main.temp_min)}°C</div>
                    <div class="fstats">💧${it.main.humidity}% &nbsp; 💨${it.wind.speed} km/h</div>
                </div>`;
            });
            document.getElementById("forecast-row").innerHTML = html;
        });
}
const city = getCityFromQuery();
fetchForecast(city);
