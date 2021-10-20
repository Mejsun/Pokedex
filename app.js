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


const capitalise = (string) => string[0].toUpperCase() + string.substring(1);

fetch ('https://pokeapi.co/api/v2/pokemon?offset=0&limit=20')
    .then (res => res.json())
    .then (data => {
        const results = data['results'];
        for (let i = 0; i<pokemonListItem.length; i++){
            const pokemonListItems = pokemonListItem[i];
            const namesList = results[i]['name']
            const idUrl = results[i]['url']
            const idNum = idUrl .split('/')
            const urlPokeId = idNum[idNum.length-2];
        if(namesList){
            pokemonListItems.textContent = urlPokeId +'. '+ capitalise(namesList);
        }else
            pokemonListItems.textContent = ''
        }
    })

fetch ('https://pokeapi.co/api/v2/pokemon/1')
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
        pokeImageFront.src = data['sprites']['front_default'] || '';
        pokeImageBack.src = data['sprites']['back_default'] || ''
})