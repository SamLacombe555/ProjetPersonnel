
// import {Pokemon} from "./pokemon";

// Déclaration des éléments du DOM.
const champPokemon = document.getElementById("ChampPokemon");

async function chargerPokemonAPI() {
    const reponse = await fetch("https://6af2194542c6561ced390228.mockapi.io/Pokemon")
    if (!reponse.ok) {
        throw new Error(`Erreur: ${reponse.status}`);
    } 
    const resultat = await reponse.json();
    for (let i=0; i<resultat.length; i++)
    {
        const carte = document.createElement('div');
        const nom = document.createElement('h3');
        const type = document.createElement('p');
        const btnInspecter = document.createElement('button');
        const btnSupprimer = document.createElement('button');
        carte.classList = 'card p-3';
        nom.textContent = `${resultat[i].nom}`;
        for (let ii=0; ii<resultat[i].type.length; ii++) {type.textContent += `| ${resultat[i].type[ii]} `; }
        btnInspecter.type = 'button';
        btnInspecter.classList = 'btn btn-info';
        btnInspecter.textContent = 'Inspecter';

        btnSupprimer.type = 'button';
        btnSupprimer.classList = 'btn btn-warning';
        btnSupprimer.textContent = 'Enlever carte';
        btnSupprimer.addEventListener("click", () => {
            ouvrirModalSuppression(carte)
        })

        carte.append(nom, type, btnInspecter, btnSupprimer);
        champPokemon.append(carte);
    }  
}

getData("https://6af2194542c6561ced390228.mockapi.io/Pokemon")
async function getData(url) {
    // L'enveloppe des données.
    const reponse = await fetch(url)
    // Renvoie erreur.
    if (!reponse.ok) {
        throw new Error(`Erreur: ${reponse.status}`);
    }
    // Le contenu
    const resultat = await reponse.json();
    for (let i=0; i<resultat.length; i++)
    {
        console.log(resultat[i].nom);
    } 
}

function ouvrirModalSuppression(carte) {
    carte.remove();
    sessionStorage.clear();
}

function rechercherPokemon(motCherche, listPokemons) {
    // Fonction pour la barre de recherche qui ferrait apparaître les Pokemons qui y correspondent
    const regex = new RegExp(motCherche, "i");

    return listPokemons.filter(i => regex.test(i.nom));

}

async function chargerPokemonRecherche(motCherche) {
    const reponse = await fetch("https://6af2194542c6561ced390228.mockapi.io/Pokemon")
    if (!reponse.ok) {
        throw new Error(`Erreur: ${reponse.status}`);
    }
    const resultat = await reponse.json();
    const pokemonsFiltre = rechercherPokemon(motCherche, resultat);
    for (let i=0; i<pokemonsFiltre.length; i++)
    {
        const carte = document.createElement('div');
        const nom = document.createElement('h3');
        const type = document.createElement('p');
        const btnInspecter = document.createElement('button');
        const btnSupprimer = document.createElement('button');
        carte.classList = 'card p-3';
        nom.textContent = `${pokemonsFiltre[i].nom}`;
        for (let ii=0; ii<pokemonsFiltre[i].type.length; ii++) {type.textContent += `| ${pokemonsFiltre[i].type[ii]} `; }
        btnInspecter.type = 'button';
        btnInspecter.classList = 'btn btn-info';
        btnInspecter.textContent = 'Inspecter';

        btnSupprimer.type = 'button';
        btnSupprimer.classList = 'btn btn-warning';
        btnSupprimer.textContent = 'Enlever carte';
        btnSupprimer.addEventListener("click", () => {
            ouvrirModalSuppression(carte)
        })

        carte.append(nom, type, btnInspecter, btnSupprimer);
        champPokemon.append(carte);
    }
}
//chargerPokemonAPI();
chargerPokemonRecherche("c")