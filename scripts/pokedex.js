
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

function creerCarte(pokemon) {
    // Créer et retourne la carte d'un pokemon.
    const carte = document.createElement('div');
    const nom = document.createElement('h3');
    const type = document.createElement('p');
    const image = document.createElement('img');
    const btnInspecter = document.createElement('button');
    const btnSupprimer = document.createElement('button');
    const imageChoisi = Math.floor(Math.random()*5);

    carte.classList = 'card p-3';
    nom.textContent = pokemon.nom;
    // '.map()' est semblable à '.join()', différence est:
    // '.map()' ajuste le string lui même.  -> "| Plante "  "| Combat "
    // '.join()' rejoint les deux string.   -> "| Plante | Combat "
    // 't' est l'index de l'array 'pokemon.type'.
    type.textContent = pokemon.type.map(t => `| ${t} `).join('');

    // Les images ne viennet pas de l'API, ils seront choisi aléatoirement.
    if (imageChoisi == 0) {image.src = "./multimedia/CharizardAhhOutline.png";}
    else if (imageChoisi == 1) {image.src = "./multimedia/GreninjaAhhOutline.png";}
    else if (imageChoisi == 2) {image.src = "./multimedia/MewtwoAhhOutline.png";}
    else if (imageChoisi == 3) {image.src = "./multimedia/PikachuAhhOutline.png";}
    else if (imageChoisi == 4) {image.src = "./multimedia/RayquazaAhhOutline.png";}
    image.classList = 'card-img-top';

    btnInspecter.type = 'button';
    btnInspecter.classList = 'btn btn-info';
    btnInspecter.textContent = 'Inspecter';
    btnInspecter.addEventListener("click", () => {afficherInfoPokemonChoisi(pokemon, image.src)})

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

// À chaque intéraction dans 'formulaireRecherche', ajoute l'EventListener.
formulaireRecherche.addEventListener("input", () => {
    afficherPokemons(rechercherPokemon(champRecherche.value, tousLesPokemons)) });
formulaireRecherche.addEventListener("submit", (e) => e.preventDefault());
chargerPokemonAPI();


// +=====+ Section pour l'aperçu des informations. +=====+
function afficherInfoPokemonChoisi (pokemon, imagesrc) {
    // Affiche les informations selon la carte sélectionner.
    document.getElementById("nomAfficher").textContent = pokemon.nom;
    document.getElementById("imageAfficher").src = imagesrc;
    document.getElementById("pointVieAfficher").textContent = `Point de vie: ${pokemon.hp}`;
    document.getElementById("attaqueAfficher").textContent = `Point d'attaque: ${pokemon.attaque}`;
    document.getElementById("defenceAfficher").textContent = `Point de défense: ${pokemon.defence}`
    document.getElementById("vitesseAfficher").textContent = `Point de vitesse: ${pokemon.vitesse}`;

    const listeType = document.getElementById("typesAfficher");
    listeType.innerHTML = "";   // Vide les listes de l'aperçu.
    for (let type of pokemon.type) {
        const liste = document.createElement("li");
        liste.textContent = type;
        listeType.append(liste); }
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