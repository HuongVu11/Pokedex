

//--------------------------- FUNCTIONS --------------------------------

// Declare a function that show up modal
const showModal = () => {
    document.querySelector('.modal-container').classList.add('show')
}

// Declare a function that close modal
const closeModal = () => {
    document.querySelector('.modal-container').classList.remove('show')
    document.querySelector('.modal').innerHTML = ''
}

//Search pokemon function that have a parameter that can be a name or Id.
//This function allow to fetch API and get back pokemon's informations and create a HTML code to store these informations and append it to modal div.
const search = (name) => {
    fetch('https://pokeapi.co/api/v2/pokemon/'+name.toLowerCase())
    .then((response) => response.json())
    .then((json) => {
        console.log(json)
        const modalContent = `
            <h2 class="modal-name">${json.name}</h2>
            <img class="modal-image" src="${json.sprites.front_default}" alt="${json.name}'s image">
            <div class="modal-text">
                <p class="left">ID:</p>
                <p class="right"># ${json.id}</p>
                <p class="left">Height:</p>
                <p class="right">${json.height/10}m</p>
                <p class="left">Weight: </p>
                <p class="right">${json.weight/10}kg</p>
                <p class="left">Types:</p>
                <p class="right">${json.types.map(element => element.type.name).join(' | ')}</p>
                <p class="left">Abilities:</p>
                <p class="right">${json.abilities.map(element => element.ability.name).join(' | ')}</p>
            </div>
            <button class="close" onclick = "closeModal()">X</button>
        `
        document.querySelector('.modal').innerHTML = modalContent
        showModal()
    })
    .catch((err) => {
        console.log(err, 'this was an error')
        const content = `
            <p>POKEMON NOT FOUND</p>
            <button class="close" onclick = "closeModal()">X</button>
        `
        document.querySelector('.modal').innerHTML = content
        const modalChildren = document.querySelector('.modal').firstElementChild
        modalChildren.style.backgroundColor = 'red'
        modalChildren.style.padding = '10px'
        modalChildren.style.textAlign= 'center'
        showModal()
        // or show an alert instead of a modal
    })
}

// Declare a function that show the 151 original pokemons, and that allow to show pokemon's details when user click on it.
const search151 = () => {
    fetch('https://pokeapi.co/api/v2/pokemon?limit=151')
    .then((response) => response.json())
    .then((json) => {
        //using map() to make a new array of html code for each pokemon, then display it inside the div #main-2 in HTML
        const createPokemonDiv = json.results.map(element => `
            <div class="pokemon-card">
                <img class="pokemon-image" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${json.results.indexOf(element)+1}.png" alt="${element.name}'s image">
                <p class="pokemon-name">${element.name}</p>
            </div>
        `)
        document.querySelector('#main-2').innerHTML = createPokemonDiv.join('')
        const pokemonCard = document.querySelectorAll('.pokemon-card')
        pokemonCard.forEach(pokemon => {
            pokemon.addEventListener('click', (e) => {
                search(pokemon.innerText)
            })
        })
    })
}


// ------------------------ EVENTS ------------------------------
search151()
window.onload = () => {
    document.querySelector('form').addEventListener('submit', (e) => {
        e.preventDefault()
        const pokemonName = document.querySelector('input[type="text"]').value
        search(pokemonName)
    })
}

