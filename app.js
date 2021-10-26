const mainScreen = document.querySelector('.pokeData')
const grid = document.querySelector('.grid')
const cell = document.querySelectorAll('.cell')
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
const searchBar = document.querySelector('.searchBar')
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

const capitalise = (string) => string[0].toUpperCase() + string.substring(1);

const resetScreen = () => {
    grid.classList.add('hide');
}
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
        }else{
            pokemonListItems.textContent = ''
        }
        
        pokemonListItems.addEventListener('click', (e) => {
            const listItem = e.target;
            let id = listItem.textContent.split('.')[0];
            pokeIdFetched(id);
            
        })
        
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
        const dataTypeOne = data['types'][0]['type']['name']
        pokeTypeOne.textContent = 'Type 1: ' +capitalise(dataTypeOne);
        const dataTypeTwo = data['types'][1];
        if(dataTypeTwo){
            pokeTypeTwo.textContent = 'Type 2: ' + capitalise(dataTypeTwo['type']['name']);
        }else{
            pokeTypeTwo.textContent = '';
            pokeTypeTwo.style.display = 'none'
        }
        
        const colour = colours[dataTypeOne]
        grid.style.backgroundColor = colour;
        
        pokeImageFront.style.display = 'block';
        pokeImageBack.style.display = 'block'
        pokeImageFront.src = data['sprites']['front_default'] || '';
        pokeImageBack.src = data['sprites']['back_default'] || ''


        for (let i = id; i <= pokemonListItem.length; i++){
            let i = parseInt(id);
            let prevPoke = i-1;
            let nextPoke = i+1;

            function prevBtnClicked (){
                console.log(prevPoke)
                if (prevPoke !==0) {
                    return prevPoke;   
                }else{
                    prevPoke.disabled = true
                }}
        
            function nextBtnClicked () {
                console.log(nextPoke)
                if (nextPoke) {
                    return nextPoke;
                }else{
                    nextPoke.disabled = true;
                }}

            resetScreen();

            prevBtn.addEventListener('click', prevBtnClicked);
            nextBtn.addEventListener('click', nextBtnClicked);
        }
    })

}

pokeListFetched('https://pokeapi.co/api/v2/pokemon?offset=0&limit=30');


/*  

        nextBtn.onclick = () => {
            if (nextPoke) {
                return nextPoke;
            }
        };

        prevBtn.onclick = () => {
            if (prevPoke !== 0) {
                return prevPoke;  
            }  
        };

        searchBar.addEventListener('keyup', (e) => {
            a = pokemonListItem.textContent;
            input = searchBar.innerText;
            if (input === a) {
            console.log(pokemonListItem)
            } 
        })

    }


    nextBtn.addEventListener('click', nextBtnClick);
    prevBtn.addEventListener('click', prevBtnClick);
}

for (let i = id; i < pokemonListItem.length; i++) {
            
        let nextPoke = i++;
        
        let nextBtnClicked = () => {
            if (nextPoke){
            return nextPoke;
            }
        }
        nextBtn.addEventListener('click', nextBtnClicked);
        }
let prevBtnClicked = () => {
            if (prevPoke !== 0){
                return prevPoke;
            }
        }
prevBtn.addEventListener('click', prevBtnClicked);

function prev(prevPoke) {
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

for (let i = 0; i < pokemonListItem.length; i++) {
        const nextPoke = id++;
        let nextBtnClicked  = () => {
            if (nextPoke){
                pokeIdFetched (nextPoke);
        }}}
        for (let i = 0; i < pokemonListItem.length; i--) {
        const prevPoke = id--;
        let prevBtnClicked= () => {
            if (prevPoke !== 0){
                pokeIdFetched (prevPoke);
        }}}


reset screen, add pokelist, search bar, prev and next btns

        */

