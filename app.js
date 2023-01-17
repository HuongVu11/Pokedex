

//--------------------------- GENERAL FUNCTIONS --------------------------------

// Declare a function that show modal
const showModal = () => {
    document.querySelector('.modal-container').classList.add('show')
}

// Declare a function that close modal
const closeModal = () => {
    document.querySelector('.modal-container').classList.remove('show')
    document.querySelector('.modal').innerHTML = ''
}

// Declare a function that show Loader and hide content
const showLoader = () => {
    document.querySelector('#loader-container').classList.remove('hide')
    document.querySelector('#content').classList.add('hide')
}

// Declare a function that hide Loader and show content
const hideLoader = () => {
    document.querySelector('#loader-container').classList.add('hide')
    document.querySelector('#content').classList.remove('hide')
}

// Declare Search(name) - a function that has a parameter which is a name or Id.
//This function allow to retrieve Pokemon's information from API and create a HTML code to store this information and append it to modal div.
const search = (name) => {
    fetch('https://pokeapi.co/api/v2/pokemon/'+name.toLowerCase())
    .then((response) => response.json())
    .then((json) => {
        console.log(json)
        let img =''
        if(json.sprites.front_default !== null) {
            img = `
                <img class="modal-image" id="modal-img1" src="${json.sprites.front_default}" alt="${json.name}'s image">
                <img class="modal-image" id="modal-img2" src="${json.sprites.front_shiny}" alt="${json.name}'s image">`
        } else {
            img = `<h5>Image not available</h5>`
        }
        const modalContent = `
            <h3 class="modal-name">${json.name}</h3>
            <div id="modal-mtp-img">
                ${img}
            </div>
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
        // show the modal with a message POKEMON NOT FOUND
        const content = `
            <p class="modal-no-result">POKEMON NOT FOUND</p>
            <button class="close" onclick = "closeModal()">X</button>
        `
        document.querySelector('.modal').innerHTML = content
        showModal()
    })
}

// Declare a function that show the 151 original Pokemons and allow to show Pokemon's detail information when the user clicks on it.
const search151 = () => {
    fetch('https://pokeapi.co/api/v2/pokemon?limit=151')
    .then((response) => response.json())
    .then((json) => {
        //using map() to make a new array of html code for each Pokemon, then display it inside the div #main-2 in HTML
        const createPokemonDiv = json.results.map(element => `
            <div class="pokemon-card">
                <div class="pokemon-img-container">
                <img class="pokemon-image" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${json.results.indexOf(element)+1}.png" alt="${element.name}'s image">
                </div>
                <p class="pokemon-name">${element.name}</p>
            </div>
        `)
        document.querySelector('#main-2').innerHTML = createPokemonDiv.join('')
        const pokemonCard = document.querySelectorAll('.pokemon-card')
        pokemonCard.forEach(pokemon => {
            pokemon.addEventListener('click', (e) => {
                //pokemon-Card div has an innerText with the name of pokemon.
                search(pokemon.innerText)
            })
        })
    })
}

// ---------------------- ADVANCED SEARCH FUNCTIONS ----------------------------

// 1. Get a dropdown list for each criteria
// 1.1. Show total 327 abilities's Pokemon when clicked and let user choose one.
const searchAbilityData = async () => {
    await fetch(`https://pokeapi.co/api/v2/ability?limit=327`)
    .then((response) => response.json())
    .then((json) => {
        console.log(json)
        const array = json.results.map(element => element.name).sort()
        for (let element of array) {
            let li = document.createElement('li')
            li.className = 'ability'
            li.innerText = element
            document.querySelector('ul').appendChild(li)
        }
    })
    .catch((err) => {
        console.log(err, 'this was an error')
    })
    const options = document.querySelectorAll('.ability')
    document.querySelector('.select-ability-text').addEventListener('click', () => {
        document.querySelector('.options-ability').classList.add('show')})
        options.forEach(option => {
            option.addEventListener('click', () => {
                document.querySelector('.select-ability-text').innerText = option.innerText
                document.querySelector('.options-ability').classList.remove('show')
            })
    })
}
// 1.2. searchData funtion is used to get choices from others criterias through option tag.
const searchData = (name,criteria) => {
    fetch(`https://pokeapi.co/api/v2/${name}`)
    .then((response) => response.json())
    .then((json) => {
        console.log(json)
        const array = json.results.map(element => element.name).sort()
        for (const element of array) {
            const option = document.createElement('option')
            option.value = element
            option.innerText = element
            document.querySelector(criteria).appendChild(option)
        }
    })
    .catch((err) => {
        console.log(err, 'this was an error')
    })
}

// 2. Advanced search for Pokemons that satisfy some criteria
const showAdvancedSearchResult = async () => {
    let commonPokemon = []
    // 2.1. Define variable that contain the choice of the user for each search criteria
    const abilityChoice = document.querySelector('.select-ability-text').innerText
    const colorChoice = document.querySelector('#filter-color').value
    const shapeChoice = document.querySelector('#filter-shape').value
    const typeChoice = document.querySelector('#filter-type').value
    const growthChoice = document.querySelector('#filter-growth').value
    // 2.2. Get data from Pokemon API for the selected criterias.
    // 2.2.1. Delare variables to store data received for each criteria. These arrays have an initial value of 0 which means that no choice is selected.
    let abilityArray = []
    let colorArray = []
    let shapeArray = []
    let typeArray = []
    let growthArray = []
    // 2.2.2. For each selected criteria, get data from pokemon API.
    if (abilityChoice !== '-Select-') {
        await fetch(`https://pokeapi.co/api/v2/ability/${abilityChoice}`)
        .then((response) => response.json())
        .then((json) => {
            console.log(json)
            abilityArray = json.pokemon.map(element => element.pokemon.name)
            console.log(abilityArray)
        })
    }
    if (colorChoice !== '') {
        await fetch(`https://pokeapi.co/api/v2/pokemon-color/${colorChoice}`)
        .then((response) => response.json())
        .then((json) => {
            console.log(json)
            colorArray = json.pokemon_species.map(element => element.name)
            console.log(colorArray)
        })
    }
    if (shapeChoice !== '') {
        await fetch(`https://pokeapi.co/api/v2/pokemon-shape/${shapeChoice}`)
        .then((response) => response.json())
        .then((json) => {
            console.log(json)
            shapeArray = json.pokemon_species.map(element => element.name)
            console.log(shapeArray)
        })
    }
    if (typeChoice !== '') {
        await fetch(`https://pokeapi.co/api/v2/type/${typeChoice}`)
        .then((response) => response.json())
        .then((json) => {
            console.log(json)
            typeArray = json.pokemon.map(element => element.pokemon.name)
            console.log(typeArray)
        })
    }
    if (growthChoice !== '') {
        await fetch(`https://pokeapi.co/api/v2/growth-rate/${growthChoice}`)
        .then((response) => response.json())
        .then((json) => {
            console.log(json)
            growthArray = json.pokemon_species.map(element => element.name)
            console.log(growthArray)
        })
    }
    // 2.3. Find a list of pokemon from data above that satisfy user's criterias
    // 2.3.1. Create an valid array that store all the data from all user's criterias
    // That means if the user doesn't search by a criteria, this criteria array has no value, and we need to remove it.
    const allArray = [abilityArray,colorArray,shapeArray,typeArray,growthArray]
    const validArray = allArray.filter(array => array.length !== 0)
    console.log('all', allArray)
    console.log('valid', validArray)
    // 2.3.2. If there is only one criteria used by the user, the valid array has only one array that become the result of the advanced research.
    if (validArray.length === 1) {
        commonPokemon = validArray[0] 
    } else {
    // 2.3.3. If there are multiple criterias, find an array with the least Pokemon. This array will be used to compare with the other array to find common Pokemons.
        let referenceArray = []
        for (let i = 0; i < validArray.length-1; i++) {
            let min = []
            // compare 2 array together to get the array with minimum value.
            if (validArray[i].length < validArray[i+1].length) {
                min = validArray[i]
            } else {
                min = validArray[i+1]
            }
            // then compare the current min with previous min (reference array) to get the true min.
            if (referenceArray.length === 0 || referenceArray.length > min.length) {
                referenceArray = min
            }
        }
        console.log('reference', referenceArray)
    // 2.3.4. Remove referrence Array from valid Array
        validArray.splice(validArray.indexOf(referenceArray),1)
        console.log('valid', validArray)
    // 2.3.5. Find common Pokemon: Compare each Pokemon of referrence array with the rest array (valid array).
        for (let pokemon of referenceArray) {
            //test if every array inside the validArray (after removing reference array) contains the same Pokemon as referrence Array
            if (validArray.every(array => array.includes(pokemon))) {
                commonPokemon.push(pokemon)
            }
        }
    }
    console.log('common Pokemons',commonPokemon)
    // 2.4. Show the result of the advanced search
    // 2.4.1. Declare a function createPokemonCard() to get data and write HTML code for each pokemon found.
    const createPokemonCard = async () => {
        showLoader()
        document.querySelector('#main-2').innerHTML=''
        for (const pokemon of commonPokemon) {
            await fetch('https://pokeapi.co/api/v2/pokemon/'+pokemon)
            .then((response) => response.json())
            .then((json) => {
                console.log(json)
                let img=''
                if(json.sprites.front_default !== null) {
                    img = `
                        <img class="pokemon-image" src=${json.sprites.front_default} alt="${json.name}'s image">`
                } else {
                    img = `<h5>Image not available</h5>`
                }
                const content = `
                    <div class="pokemon-img-container">
                        ${img}
                    </div>
                    <p class="pokemon-name">${json.name}</p>`
                const newDiv = document.createElement('div')
                newDiv.className ='pokemon-card'
                newDiv.innerHTML = content
                document.querySelector('#main-2').appendChild(newDiv)
                hideLoader()
                const pokemonCard = document.querySelectorAll('.pokemon-card')
                pokemonCard.forEach(pokemon => {
                    pokemon.addEventListener('click', (e) => {
                        console.log(pokemon)
                    search(pokemon.children[1].innerText)
                    })
                })  
            })
            .catch(err => {
                console.log('error', err)
            })
        }
    }
    // 2.4.2. Show the result
    if (commonPokemon.length === 0) {
        const noResult = `
            <p class="modal-no-result">POKEMON NOT FOUND</p>
            <button class="close" onclick = "closeModal()">X</button>`
        document.querySelector('.modal').innerHTML = noResult
        showModal()
    } else {
        createPokemonCard()  
    } 
}
//3. Reset button
const reset = () => {
    document.querySelector('#reset').addEventListener('click', () => {
        search151()
        // reset ability choice
        document.querySelector('.select-ability-text').innerText = '-Select-'
        // reset all other choices
        const options = document.querySelectorAll('option')
        options.forEach(option => option.selected=false)
    })  
}

// ------------------------ SET UP & EVENTS ------------------------------

search151()
searchAbilityData()
searchData('pokemon-color','#filter-color')
searchData('pokemon-shape','#filter-shape')
searchData('type','#filter-type')
searchData('growth-rate','#filter-growth')

window.onload = () => {
    hideLoader()
    // Normal search submitted
    document.querySelector('form').addEventListener('submit', (e) => {
        e.preventDefault()
        const pokemonName = document.querySelector('input[type="text"]').value
        search(pokemonName)
    })
    // Show advanced search form when clicked
    document.querySelector('#adv-search-title').addEventListener('click', (e) => {
        e.preventDefault()
        let fieldset = document.querySelector('fieldset')
        console.log(fieldset)
        if (fieldset.classList.value === '') {
            fieldset.classList.add('show')
            document.querySelector('#arrow').style.transform ='rotate(180deg)'
        } else {
            fieldset.classList.remove('show')
            document.querySelector('#arrow').style.transform ='none'
        } 
    })
    // Advanced search submitted
    document.querySelector('#adv-submit').addEventListener('click', (e) => {
        e.preventDefault()
        showAdvancedSearchResult()
    })
    reset()
}
    
