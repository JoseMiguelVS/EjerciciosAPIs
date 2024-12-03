const URL_BASE = 'https://api.jikan.moe';
const container = document.querySelector('.container');
const divAnimes = document.querySelector('.animes');
const divButtons = document.querySelector('.buttons');

function createCard(data) {
    const card = document.createElement('div');
    let html =
        `
    <img src=' ${data.images.jpg.image_url} '>
    <div>
    <h1> ${data.title} </h1>
    <p> ${data.type} - ${data.status} </p>
    <p class="titulos"> Puntuacion </p>
    <p> ${data.score} </p>
    <p class="titulos">Genero(s)</p>
    <p>${data.genres.map(g => g.name).join(', ')}</p>
    </div>
    `;
    card.innerHTML = html;
    card.className = 'card';
    return card;
};

function createCards(data) {
    divAnimes.innerHTML = '';
    data.forEach(c => {
        divAnimes.appendChild(createCard(c))
    });
}

let page = 1;
function createButtons() {
    divButtons.innerHTML = '';
    const btnLeft = document.createElement('button');
    btnLeft.innerText = 'Anterior';
    btnLeft.className = 'btn';
    btnLeft.setAttribute('data-id', page - 1);

    const btnRight = document.createElement('button');
    btnRight.innerText = 'Siguiente';
    btnRight.className = 'btn';
    btnRight.setAttribute('data-id', page + 1);
    divButtons.appendChild(btnLeft);
    divButtons.appendChild(btnRight);
};

createButtons();

async function getAnimes(page = 1) {
    const response = await fetch(URL_BASE + '/v4/top/anime?page=' + page);
    const result = await response.json();
    createCards(result.data);
};

async function getAnimesByType(type) {
    const response = await fetch(URL_BASE + '/v4/top/anime?type=' + type);
    const result = await response.json();
    createCards(result.data);
};

getAnimes();

divButtons.addEventListener('click', (e) => {
    if (e.target.classList.contains('btn')) {
        const id = e.target.getAttribute('data-id');
        getAnimes(id);
        if (e.target.innerHTML === 'Anterior')
            page--;
        else
            page++;
        if (page === 0) page === 1
        if (page === 43) page === 42
        createButtons();
    }
});

document.querySelector('#type').addEventListener('change', e => {
    getAnimesByType(e.target.value);
});