let id =[];
let pokemonId;
const grid = document.querySelector('.grid')
const pokeID = document.querySelector('.pokeId')
const pokeName = document.querySelector('.pokeName')
const pokeImageFront = document.querySelector('.pokeImageFront')
const pokeImageBack = document.querySelector('.pokeImageBack')
const pokeHeight = document.querySelector('.pokeHeight')
const pokeWeight = document.querySelector('.pokeWeight')
const pokeTypeOne = document.querySelector('.pokeTypeOne')
const pokeTypeTwo = document.querySelector('.pokeTypeTwo')
const fullList = document.querySelector('.fullList')
const prevBtn = document.querySelector('.prev')
const nextBtn = document.querySelector('.next')
const pokemonItemList = document.querySelectorAll('.pokemonItemList')
const searchBar = document.querySelector('#searchBar')
const colours = {
    fire: 'rgb(255, 194, 173)',
    grass: 'rgb(203, 245, 174)',
    electric: 'yellow',
    water: 'rgb(174, 245, 245)',
    ground: 'rgb(209, 191, 171)',
    rock: 'rgb(181, 178, 174)',
    fairy: 'rgb(245, 213, 237)',
    poison:'rgb(211, 172, 230)',
    bug: 'turquoise',
    dragon:'navy',
    psychic: 'gold',
    flying: 'skyblue',
    fighting: 'rgb(245, 76, 87)',
    normal: 'white'
};

const capitalise = (string) => string[0].toUpperCase() + string.substring(1)

function prevId(){pokemonId--}
function nextId(){pokemonId++}

function pokeIdFetched (number) {
fetch (`https://pokeapi.co/api/v2/pokemon/${number}`)
    .then (res => res.json())
    .then (data => {      
        pokeID.textContent = data['id'];
        pokeName.textContent = capitalise(data['name']);
        pokeHeight.textContent = 'Height: ' + data['height']
        pokeWeight.textContent = 'Weight: ' + data['weight']
        const dataTypeOne = data['types'][0]['type']['name']
        const dataTypeTwo = data['types'][1]
        pokeTypeOne.textContent = 'Type 1: ' + capitalise(dataTypeOne);
        if(dataTypeTwo){
            pokeTypeTwo.textContent = 'Type 2: ' + capitalise(dataTypeTwo['type']['name']);
        }else{
            pokeTypeTwo.textContent = '';
        }
        pokeImageFront.src = data['sprites']['front_default'] || '';
        pokeImageBack.src = data['sprites']['back_default'] || '' ; 
        pokeImageFront.style.display = 'block';
        pokeImageBack.style.display = 'block';

        const colour = colours[dataTypeOne]
        grid.style.backgroundColor = colour;
    })
}

function fetchedList (url)  {
    fetch (url)
        .then (res => res.json())
        .then (data => {
            const results = data['results'];
            for (let i = 0; i<results.length; i++){               
                const namesList = results[i]['name']
                const idUrl = i+1   
                let theList = document.createElement('p');
                theList.innerHTML = `<p class="pokemonItemList">${idUrl}. ${capitalise(namesList)}</p>`
                fullList.appendChild(theList);     
            }
        })
}

fullList.addEventListener('click', (e) => {
    const listItem = e.target.innerText;
    let pokeIdNum = listItem.split('.')[0];
    let idNum = parseInt(pokeIdNum); 
    pokemonId = idNum;
})

window.addEventListener('click', (e) => {
    if(e.target.className === 'prev' && pokemonId>1){
        prevId();
    }
    if(e.target.className === 'next'&& pokemonId<150){
        nextId()
    }
    pokeIdFetched(pokemonId)
})

searchBar.addEventListener('keyup', () => {
    let searchInput = searchBar.value.toUpperCase();
    let existingPokeList = fullList.childNodes;
    for (i = 0; i < existingPokeList.length; i++) {
      p = existingPokeList[i].getElementsByTagName("p")[0];
      txtValue = p.textContent || p.innerText;
      if (txtValue.toUpperCase().indexOf(searchInput) > -1) {
        existingPokeList[i].style.display = "";
      } else {
        existingPokeList[i].style.display = "none";
      }
    }
})

fetchedList('https://pokeapi.co/api/v2/pokemon/?offset=0&limit=150');

