
// +=====+ Section de Chargement des Pokemons. +=====+
let tousLesPokemons = [];
const champPokemon = document.getElementById("ChampPokemon");
const formulaireRecherche = document.getElementById("formulaireRecherche");
const champRecherche = document.getElementById("recherche");

async function chargerPokemonAPI() {
    // Va chercher les données de mockapi et les met dans 'tousLesPokemons'.
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

    // Todo: Faire en sorte que quand on clique 'Inspecter', que le
    //      programme comprend que le sélectionne.
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

function rechercherPokemon(motCherche, listPokemons) {
    // Permet à la barre de recherche d'afficher les pokemons selon Regex.
    const regex = new RegExp(motCherche, "i");
    return listPokemons.filter(pokemon => regex.test(pokemon.nom));
}

function afficherPokemons(liste) {
    // Insère les cartes de pokemons dans champPokemon.
    champPokemon.replaceChildren();
    for (const pokemon of liste) {champPokemon.append(creerCarte(pokemon)); }
}

function ouvrirModalSuppression(carte) {
    // N'affiche pas actuellement un modal. Je le garde au cas où.
    // Les suppression devraient toujours avoir un modal de confirmation.
    carte.remove();
    sessionStorage.clear();
}

// À chaque intéraction dans 'formulaireRecherche', ajoute l'EventListener.
formulaireRecherche.addEventListener("input", () => {
    afficherPokemons(rechercherPokemon(champRecherche.value, tousLesPokemons)) });
formulaireRecherche.addEventListener("submit", (e) => e.preventDefault());
chargerPokemonAPI();


// +=====+ Section pour l'aperçu des informations. +=====+
function afficherInfoPokemonChoisi () {
    // Todo: Affiche les informations selon la carte sélectionner.
    document.getElementById("nomApercu").textContent = "";
    document.getElementById("pointVieApercu").textContent = "";
    document.getElementById("attaqueApercu").textContent = "";
    document.getElementById("defenceApercu").textContent = "";
    document.getElementById("vitesseApercu").textContent = "";
}