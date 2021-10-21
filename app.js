const mainScreen = document.querySelector('.pokeData')
const pokeID = document.querySelector('.pokeId')
const pokeName = document.querySelector('.pokeName')
const pokeImageFront = document.querySelector('.pokeImageFront')
const pokeImageBack = document.querySelector('.pokeImageBack')
const pokeHeight = document.querySelector('.pokeHeight')
const pokeWeight = document.querySelector('.pokeWeight')
const pokeTypeOne = document.querySelector('.pokeTypeOne')
const pokeTypeTwo = document.querySelector('.pokeTypeTwo')
const fullList = document.querySelector('.fullList')
const pokemonListItem = document.querySelectorAll('.pokemonItemList')
const prevBtn = document.querySelector('.left')
const nextBtn = document.querySelector('.right')

const capitalise = (string) => string[0].toUpperCase() + string.substring(1);



const pokeListFetched = (url) => {
fetch (url)
    .then (res => res.json())
    .then (data => {
        const results = data['results'];
        for (let i = 0; i<pokemonListItem.length; i++){
            const pokemonListItems = pokemonListItem[i];
            const namesList = results[i]['name']
            const idUrl = results[i]['url']
            const idNum = idUrl.split('/')
            const urlPokeId = idNum[idNum.length-2];
        if(namesList){
            pokemonListItems.textContent = urlPokeId +'. '+ capitalise(namesList);
        }else
            pokemonListItems.textContent = ''
        }
    })
}

const pokeIdFetched = id => {
fetch (`https://pokeapi.co/api/v2/pokemon/${id}`)
    .then (res => res.json())
    .then (data => {
        pokeID.textContent = data['id'].toString().padStart(3,'0');
        pokeName.textContent = capitalise(data['name']);
        pokeHeight.textContent = 'Height: ' + data['height']
        pokeWeight.textContent = 'Weight: ' + data['weight']
        pokeTypeOne.textContent = 'Type 1: ' +capitalise(data['types'][0]['type']['name']);
        const dataTypeTwo = data['types'][1]
        if(dataTypeTwo){
            pokeTypeTwo.textContent = 'Type 2: ' + capitalise(dataTypeTwo['type']['name']);
        }else{
            pokeTypeTwo.textContent = '';
            pokeTypeTwo.style.display = 'none'
        }
        pokeImageFront.style.display = 'block';
        pokeImageBack.style.display = 'block'
        pokeImageFront.src = data['sprites']['front_default'] || '';
        pokeImageBack.src = data['sprites']['back_default'] || ''
})
}
 
for (const pokemonListItems of pokemonListItem) {
    pokemonListItems.addEventListener('click', (e) => {
        const listItem = e.target;
        const id = listItem.textContent.split('.')[0]
        pokeIdFetched(id);
    })
}

pokeListFetched('https://pokeapi.co/api/v2/pokemon?offset=0&limit=30');

