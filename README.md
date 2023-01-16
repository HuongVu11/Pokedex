# POKEDEX

## Project idea
The idea of project is to build a pokedex that is an encyclopedia of general information pokemon.

## API used
https://pokeapi.co/api/v2/

## User stories
As a pokemon's fan, I want to search for a pokemon's name and get back pokemon's informations like abilities, types, height and weight.

## MVP Goals
> 
The user can search a pokemon's principal informations by typing the pokemon's name or id.
The website has a responsive design adaptable to desktop and mobile and a modal to show up the pokemon that is searched.

## Stretch Goals
> 
Make an advanced search option where the user can search by a specific criteria other than name or id, such as ability, color, height, weight and type.

## Technologies
Project is built with:
- HTML;
- CSS;
- JAVASCRIPT;

## Links to the project site
[https://spectacular-cascaron-f96394.netlify.app/]

## Building
The website has 3 main parts:
- Part 1: Search for a pokemon by name or id;
- Part 2: Search for pokemon that satisfy some criteria;
- Part 3: A table of pokemon image with name. When the user clicked on a pokemon card, they will get back the pokemon's detail information The table initially has 151 pokemon. However it will shows the result of the advanced search. 
All parts need to get data from pokemon API.

Part 1 & part 3 are quite similar, use the same API endpoint, get pokemon data by name: 
- Pokemon: [https://pokeapi.co/api/v2/pokemon/{id or name}/]
- Get 151 pokemon: [https://pokeapi.co/api/v2/?limit=151/

Part 2 has a different approach.
This part first need get the list of option for each filter, then shows the common pokemon that matched the criteria of the users. 
List of different API endpoints used: 
- Abilities: [https://pokeapi.co/api/v2/ability/{id or name}/]
- Growth Rates: [https://pokeapi.co/api/v2/growth-rate/{id or name}/]
- Pokemon Colors:[https://pokeapi.co/api/v2/pokemon-color/{id or name}/]
- Pokemon Shapes: [https://pokeapi.co/api/v2/pokemon-shape/{id or name}/]
- Types: [https://pokeapi.co/api/v2/type/{id or name}/]