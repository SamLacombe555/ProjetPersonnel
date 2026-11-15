
// +=====+ Section de Chargement des Pokemons. +=====+
let pokemonInspecter = "";
let tousLesPokemons = [];
let tousLesTypes = [];
const champPokemon = document.getElementById("ChampPokemon");
const formulaireRecherche = document.getElementById("formulaireRecherche");
const champRecherche = document.getElementById("recherche");
const couleursTypes = {
    // Hésite pas à changer des couleurs.
    normal: "#A8A77A",
    feu:    "#EE8130",
    eau:    "#6390F0",
    electrik:"#7AC74C",
    plante: "#F7D02C",
    glace:  "#96D9D6",
    combat: "#C22E28",
    poison: "#A33EA1",
    sol:    "#E2BF65",
    vol:    "#A98FF3",
    psy:    "#F95587",
    insecte:"#A6B91A",
    roche:  "#B6A136",
    spectre:"#735797",
    dragon: "#6F35FC",
    tenebres:"#705746",
    acier:  "#B7B7CE",
    fee:    "#D685AD"
};

async function chargerPokemonAPI() {
    // Va chercher les données de mockapi et les met dans 'tousLesPokemons'.
    const reponse = await fetch("https://6af2194542c6561ced390228.mockapi.io/Pokemon")
    if (!reponse.ok) {throw new Error(`Erreur: ${reponse.status}`); } 
    tousLesPokemons = await reponse.json();
    afficherPokemons(tousLesPokemons);
}

function creerBadgesType(nomType) {
    // Créer des badges pour les types.
    const badge = document.createElement("span");
    const type = nomType.toLowerCase();
    badge.textContent = nomType;
    badge.classList = "badge me-1 mb-1";
    badge.style.color = "white";
    badge.style.backgroundColor = couleursTypes[type];
    return badge
}

function creerCarte(pokemon) {
    // Créer et retourne la carte d'un pokemon.
    const carte = document.createElement('div');
    const nom = document.createElement('h3');
    const types = document.createElement('div');
    const image = document.createElement('img');
    const imageChoisi = Math.floor(Math.random()*5);

    carte.classList = 'card p-3';
    nom.textContent = pokemon.nom;
    for (const type of pokemon.type) {types.append(creerBadgesType(type));}

    // Les images ne viennet pas de l'API, ils seront choisi aléatoirement.
    if (imageChoisi == 0) {image.src = "./multimedia/CharizardAhhShadow.png";}
    else if (imageChoisi == 1) {image.src = "./multimedia/GreninjaAhhShadow.png";}
    else if (imageChoisi == 2) {image.src = "./multimedia/MewtwoAhhShadow.png";}
    else if (imageChoisi == 3) {image.src = "./multimedia/PikachuAhhShadow.png";}
    else if (imageChoisi == 4) {image.src = "./multimedia/RayquazaAhhShadow.png";}
    image.classList = 'card-img-top border border-dark';

    carte.addEventListener("click", () => {afficherInfoPokemonChoisi(pokemon, image.src)})
    carte.append(nom, types, image);
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
function afficherInfoPokemonChoisi (pokemon, imagesrc) {
    // Affiche les informations selon la carte sélectionner.
    document.getElementById("carteAfficher").style.display = "block";
    document.getElementById("nomAfficher").textContent = pokemon.nom;
    document.getElementById("imageAfficher").src = imagesrc;
    document.getElementById("pointVieAfficher").textContent = `Point de vie: ${pokemon.hp}`;
    document.getElementById("attaqueAfficher").textContent = `Point d'attaque: ${pokemon.attaque}`;
    document.getElementById("defenceAfficher").textContent = `Point de défense: ${pokemon.defence}`
    document.getElementById("vitesseAfficher").textContent = `Point de vitesse: ${pokemon.vitesse}`;
    document.getElementById("descriptionAfficher").textContent = 'Endroit qui est reservé pour une '+
        'description. Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo expedita, '+
        'error praesentium est molestias placeat quis, sit unde esse ullam quo distinctio, laudantium '+
        'dolorum nulla commodi. Doloribus magni culpa accusant'

    const listeTypes = document.getElementById("typesAfficher");
    listeTypes.replaceChildren();
    for (const type of pokemon.type) {listeTypes.append(creerBadgesType(type)); }
    
    document.getElementById("tailleAfficher").textContent = "Taille:";
    document.getElementById("poidsAfficher").textContent = "Poids:";
}

async function creerTypes() {
    // Va chercher les données de mockapi et les met dans tousLesTypes
    const reponse = await fetch("https://6af2194542c6561ced390228.mockapi.io/:endpoint")
    if (!reponse.ok) {throw new Error(`Erreur: ${reponse.status}`); }
    tousLesTypes = await reponse.json();
}

//function trouverTypesMatch(types) {
  //  for (const t of types) {
    //    if (tousLesTypes.(t) === -1) {}
    //}
//}