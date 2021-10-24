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
const prevBtn = document.querySelector('.right')
const nextBtn = document.querySelector('.left')


let prevPoke = null;
let nextPoke = null;


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

let pokeIdFetched = id => {
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
        let id = listItem.textContent.split('.')[0];
        pokeIdFetched(id);

        let prevPoke = id--;
        let nextPoke = id++;

        let prevBtnClicked = (e) => {
            if (prevPoke !== 0){
                pokeIdFetched (prevPoke);
            }
        }
        let nextBtnClicked = (e) => {
            pokeIdFetched (nextPoke);
        }
        
        prevBtn.addEventListener('click', prevBtnClicked);
        nextBtn.addEventListener('click', nextBtnClicked);

        })
}





pokeListFetched('https://pokeapi.co/api/v2/pokemon?offset=0&limit=30');

/*  function prev(prevPoke) {
            if (prevPoke===0){
                prevBtn.disabled=true;
                nextBtn.disabled=false;
            }else{
                return prevPoke;
            }} 




function prev() {
    let i = pokeIdFetched;
    for (let i = 0; i = pokemonListItem.length; i++) {
    if (i=0){
        prevBtn.disabled=true;
        nextBtn.disabled=false;
    }else{
        return i++;
    }}
}
prevBtn.addEventListener('click', prev);


onRightClick = (e) => {
    let i = 0;
    let nextIndex = i++;
    if (nextIndex === pokemonListItem.length) {
       return 0;
    } else {
       return nextIndex;
    }
    
}

onLeftClick = (e) => {
    let i = 0;
    let previousIndex = i--;
    if (previousIndex === -1) {
       return pokemonListItem.length - 1;
    } else {
         return previousIndex;
    }
}
*/

