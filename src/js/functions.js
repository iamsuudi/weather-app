
function renderCurrentWeather(
    temp_c,
    text,
    icon,
    localtime,
    city,
    country
) {
    const temp = document.querySelector('span.temp');
    const weatheIcon = document.querySelector('.icon');
    const location = document.querySelector('p.location');
    const currentTime = document.querySelector('.time');
    const condition = document.querySelector('p.text');

    const time = localtime.split(' ').pop().split(':');
    const timeLocal =
        +time[0] < 12 ? `${time.join(':')} AM` : `${+time[0] - 12}:${time[1]} PM`;

    temp.textContent = temp_c;
    weatheIcon.style.backgroundImage = `url(${icon})`;
    weatheIcon.style.backgroundSize = `cover`;
    location.textContent = `${city}, ${country}`;
    currentTime.textContent = timeLocal;
    condition.textContent = text;
}

function renderCurrentWind(wind_kph, wind_degree, wind_dir) {
    const windSpeed = document.querySelector('span.wind_kph');
    const windDegree = document.querySelector('span.wind_degree');
    const windDirection = document.querySelector('span.wind_dir');

    windSpeed.textContent = wind_kph;
    windDegree.textContent = wind_degree;
    windDirection.textContent = wind_dir;
}

function renderHumidity(precip_mm, humi, clo, u) {
    const precipitation = document.querySelector('span.precip_mm');
    const humidity = document.querySelector('span.humidity');
    const cloud = document.querySelector('span.cloud');
    const uv = document.querySelector('span.uv');

    precipitation.textContent = precip_mm;
    humidity.textContent = humi;
    cloud.textContent = clo;
    uv.textContent = u;
}

async function getWeather(city) {

    const apiKey = '45591ccca56b4ddf865170037242401';
    
    const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=yes`;

    const response = await fetch(url, { mode: 'cors' });
    const parsed = await response.json();

    const { location, current } = parsed;

    const { localtime, country } = location;

    const { condition } = current;

    const { icon, text } = condition;

    const {
        wind_kph,
        wind_degree,
        wind_dir,
        precip_mm,
        humidity,
        cloud,
        uv,
        temp_c,
    } = current;

    renderCurrentWeather(temp_c, text, icon, localtime, city, country);
    renderCurrentWind(wind_kph, wind_degree, wind_dir);
    renderHumidity(precip_mm, humidity, cloud, uv);
}

export default getWeather;