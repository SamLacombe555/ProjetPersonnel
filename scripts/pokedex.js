
// Déclaration des éléments du DOM.
const champPokemon = document.getElementById("ChampPokemon");
const formulaireRecherche = document.getElementById("formulaireRecherche");
const champRecherche = document.getElementById("recherche");
// Contient les données charger de API.
let tousLesPokemons = [];

async function chargerPokemonAPI() {
    // Va chercher les données de mockapi et met dans 'tousLesPokemons'.
    const reponse = await fetch("https://6af2194542c6561ced390228.mockapi.io/Pokemon")
    if (!reponse.ok) {throw new Error(`Erreur: ${reponse.status}`); } 
    tousLesPokemons = await reponse.json();
    afficherPokemons(tousLesPokemons);
}

function creerCarte(pokemon) {
    // Créer et retourne la carte d'un pokemon.
    const carte = document.createElement('div');
    const nom = document.createElement('h3');
    const type = document.createElement('p');
    const btnInspecter = document.createElement('button');
    const btnSupprimer = document.createElement('button');

    carte.classList = 'card p-3';
    nom.textContent = pokemon.nom;
    // '.map()' est semblable à '.join()', différence est:
    // '.map()' ajuste le string lui même.  -> "| Plante "  "| Combat "
    // '.join()' rejoint les deux string.   -> "| Plante | Combat "
    // 't' est l'index de l'array 'pokemon.type'.
    type.textContent = pokemon.type.map(t => `| ${t} `).join('');

    btnInspecter.type = 'button';
    btnInspecter.classList = 'btn btn-info';
    btnInspecter.textContent = 'Inspecter';

    btnSupprimer.type = 'button';
    btnSupprimer.classList = 'btn btn-warning';
    btnSupprimer.textContent = 'Enlever carte';
    btnSupprimer.addEventListener("click", () => {ouvrirModalSuppression(carte)})

    carte.append(nom, type, btnInspecter, btnSupprimer);
    return carte;
}

function afficherPokemons(liste) {
    // Insère les cartes de pokemons dans champPokemon.
    champPokemon.replaceChildren();
    for (const pokemon of liste) {champPokemon.append(creerCarte(pokemon)); }
}

function ouvrirModalSuppression(carte) {
    // N'affice pas actuellement un modal. Je le garde au cas où.
    // Les suppression devraient toujours avoir un modal de confirmation.
    carte.remove();
    sessionStorage.clear();
}

function rechercherPokemon(motCherche, listPokemons) {
    // Fonction pour la barre de recherche qui ferrait apparaître
    // les Pokemons qui y correspondent en utilisant Regex.
    const regex = new RegExp(motCherche, "i");
    return listPokemons.filter(pokemon => regex.test(pokemon.nom));
}

// À chaque intéraction dans 'formulaireRecherche', ajoute l'EventListener.
formulaireRecherche.addEventListener("input", () => {
    afficherPokemons(rechercherPokemon(champRecherche.value, tousLesPokemons)) });
formulaireRecherche.addEventListener("submit", (e) => e.preventDefault());

chargerPokemonAPI();