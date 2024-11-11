const URL_BASE = 'https://api.openweathermap.org/data/2.5/weather?';
const API_KEY = '59c0795cca3d8d408283720284f6af6d';
const container = document.querySelector('.container');
const body = document.querySelector('body');

function createCards(data) {
    const card = document.createElement('div');
    if (data.main.temp > 24) {
        changeColorCalida();
    } else if (data.main.temp > 16) {
        changeColorTemplada();
    } else {
        changeColorFria();
    }
    let html =
        `
    <div>
    <h1> ${data.name} </h1>
    <p>Longitud: ${data.coord.lon} - Latitud: ${data.coord.lat} </p>
    <p> Grados </p>
    <p> ${data.main.temp} </p>
    <p>Clima</p>
    <p>${data.weather[0].main}</p>
    </div>
    `;
    card.innerHTML = html;
    card.className = 'card';
    return card;
}
//-------------------CAMBIAR COLOR-----------------
const changeColorCalida = () => {
    let color = 'rgb(255, 165, 0)';
    body.style.backgroundColor = color;
}
const changeColorTemplada = () => {
    let color = 'rgb(107, 142, 35)';
    body.style.backgroundColor = color;
}
const changeColorFria = () => {
    let color = 'rgb(95, 158, 160)';
    body.style.backgroundColor = color;
}

async function getClimaCity(city) {
    const result = await fetch(`${URL_BASE}q=${city}&appid=${API_KEY}&units=metric`);
    const data = await result.json();
    container.appendChild(createCards(data));
}

async function getClima(lat, lon) {
    const result = await fetch(`${URL_BASE}lat=${lat}&lon=${lon}&lang=sp&appid=${API_KEY}&units=metric`);
    const data = await result.json();
    container.appendChild(createCards(data));
}

navigator.geolocation.getCurrentPosition((pos) => {
    const lat = pos.coords.latitude;
    const lon = pos.coords.longitude;
    getClima(lat, lon);
});

document.querySelector('.buscar').addEventListener('change', e => {
    getClimaCity(e.target.value);
});