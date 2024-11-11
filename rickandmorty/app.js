const URL_BASE = 'https://rickandmortyapi.com/api';
const container = document.querySelector('.container');
const divCharacters = document.querySelector('.characters');
const divButtons = document.querySelector('.buttons');

function createCard(character) {
    const card = document.createElement('div');
    let html =
        `
    <img src=' ${character.image} 'width="200px">
    <div>
    <h1> ${character.name} </h1>
    <p> ${character.status} - ${character.species} </p>
    <p class="titulos"> Ultima ubicacion </p>
    <p> ${character.location.name} </p>
    <p class="titulos">Primera aparicion</p>
    <p>${character.origin.name}</p>
    </div>
    `;
    card.innerHTML = html;
    card.className = 'card';
    return card;
}

function createCards(character) {
    divCharacters.innerHTML = '';
    character.forEach(c => { //la c es pqra objetos individuales
        divCharacters.appendChild(createCard(c))
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
}

createButtons();

async function getCharacters(page = 1) {
    const response = await fetch(URL_BASE + '/character/?page=' + page) //Es una promesa, este hace la consulta a la API
    const data = await response.json(); //convierte en objetos la consulta
    const characters = data.results;
    createCards(characters);
}

async function getCharactersByStatus(status) {
    const response = await fetch(URL_BASE + '/character/?status=' + status) //Es una promesa, este hace la consulta a la API
    const data = await response.json(); //convierte en objetos la consulta
    const characters = data.results;
    createCards(characters);
}

getCharacters();

divButtons.addEventListener('click', (e) => {
    if (e.target.classList.contains('btn')) {
        const id = e.target.getAttribute('data-id');
        getCharacters(id);
        if (e.target.innerHTML === 'Anterior')
            page--;
        else
            page++;
        if (page === 0) page === 1
        if (page === 43) page === 42
        createButtons();
    }
});

document.querySelector('#status').addEventListener('change', e => {
    getCharactersByStatus(e.target.value);
})