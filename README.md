# POKEDEX

## Project idea
The idea of project is to build a Pokedex that is an encyclopedia of general information Pokemon.

## API used
[https://pokeapi.co/api/v2/]

## User stories
As a Pokemon fan, I want to search for a Pokemon's name and get back Pokemon's information like abilities, types, height and weight.

## MVP Goals
> 
The user can search a Pokemon's principal information by typing the Pokemon's name or id.
The website has a responsive design adaptable to desktop and mobile and a modal to show the Pokemon that is searched.

## Stretch Goals
> 
Make an advanced search option where the user can search by a specific criteria other than name or id, such as ability, color, height, weight and type.

## Technologies
Project is built with:
- HTML;
- CSS;
- JAVASCRIPT;

## Links to the project site
[https://pokedex-jan2023.netlify.app]

## Building
The website has 3 main parts:
- Part 1: Search for a Pokemon by name or id;
- Part 2: Search for Pokemon that satisfy some criteria;
- Part 3: A table of Pokemon card. When the user clicks on a Pokemon card, they will get the Pokemon's detail information. The table initially has 151 Pokemon. However, it will show the result of the advanced search. 
All parts need to get data from Pokemon API.

Part 1 & part 3 are quite similar because they use the same API endpoint and they get Pokemon data by name: 
- Pokemon: [https://pokeapi.co/api/v2/pokemon/{id or name}/]
- Get 151 Pokemons: [https://pokeapi.co/api/v2/?limit=151/

Part 2 has a different approach.
This part first needs to get the list of options for each filter, then it will show the common Pokemon that match the criteria of the users. 
List of different API endpoints used: 
- Abilities: [https://pokeapi.co/api/v2/ability/{id or name}/]
- Growth Rates: [https://pokeapi.co/api/v2/growth-rate/{id or name}/]
- Pokemon Colors:[https://pokeapi.co/api/v2/pokemon-color/{id or name}/]
- Pokemon Shapes: [https://pokeapi.co/api/v2/pokemon-shape/{id or name}/]
- Types: [https://pokeapi.co/api/v2/type/{id or name}/]