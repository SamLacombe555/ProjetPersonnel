
// +=====+ Section de Chargement des Pokemons. +=====+
let pokemonInspecter = String;
let tousLesPokemons = [];
let tousLesTypes = [];
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

async function creerTypes() {
    // Va chercher les données de mockapi et les met dans tousLesTypes
    const reponse = await fetch("https://6af2194542c6561ced390228.mockapi.io/:endpoint")
    if (!reponse.ok) {throw new Error(`Erreur: ${reponse.status}`); }
    tousLesTypes = await reponse.json();
}

function creerCarte(pokemon) {
    // Créer et retourne la carte d'un pokemon.
    const carte = document.createElement('div');
    const nom = document.createElement('h3');
    const type = document.createElement('p');
    const image = document.createElement('img');
    const btnInspecter = document.createElement('button');
    const btnSupprimer = document.createElement('button');

    carte.classList = 'card p-3';
    nom.textContent = pokemon.nom;
    // '.map()' est semblable à '.join()', différence est:
    // '.map()' ajuste le string lui même.  -> "| Plante "  "| Combat "
    // '.join()' rejoint les deux string.   -> "| Plante | Combat "
    // 't' est l'index de l'array 'pokemon.type'.
    type.textContent = pokemon.type.map(t => `| ${t} `).join('');

    // Il faudra qu'on ajoute le .src dans l'API.
    image.src = "./multimedia/pikachuAhhOutline.png";
    image.classList = 'card-img-top';

    btnInspecter.type = 'button';
    btnInspecter.classList = 'btn btn-info';
    btnInspecter.textContent = 'Inspecter';
    btnInspecter.addEventListener("click", () => {afficherInfoPokemonChoisi(pokemon)})

    btnSupprimer.type = 'button';
    btnSupprimer.classList = 'btn btn-warning';
    btnSupprimer.textContent = 'Enlever carte';
    btnSupprimer.addEventListener("click", () => {ouvrirModalSuppression(carte)})

    carte.append(nom, type, image, btnInspecter, btnSupprimer);
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

//function trouverTypesMatch(types) {
  //  for (const t of types) {
    //    if (tousLesTypes.(t) === -1) {}
    //}
//}

// À chaque intéraction dans 'formulaireRecherche', ajoute l'EventListener.
formulaireRecherche.addEventListener("input", () => {
    afficherPokemons(rechercherPokemon(champRecherche.value, tousLesPokemons)) });
formulaireRecherche.addEventListener("submit", (e) => e.preventDefault());
chargerPokemonAPI();


// +=====+ Section pour l'aperçu des informations. +=====+
function afficherInfoPokemonChoisi (pokemon) {
    // Affiche les informations selon la carte sélectionner.
    document.getElementById("nomApercu").textContent = pokemon.nom;
    // Les pokemons n'ont pas encore une parametre pour leur image, y faudra en ajouter un.
    document.getElementById("imageApercu").src = "./multimedia/pikachuAhhOutline.png";
    document.getElementById("pointVieApercu").textContent = `Point de vie: ${pokemon.hp}`;
    document.getElementById("attaqueApercu").textContent = `Point d'attaque: ${pokemon.attaque}`;
    document.getElementById("defenceApercu").textContent = `Point de défense: ${pokemon.defence}`
    document.getElementById("vitesseApercu").textContent = `Point de vitesse: ${pokemon.vitesse}`;

    const listeType = document.getElementById("typeApercu");
    listeType.innerHTML = "";   // Vide les listes de l'aperçu.
    for (let type of pokemon.type) {
        const liste = document.createElement("li");
        liste.textContent = type;
        listeType.append(liste); }
}