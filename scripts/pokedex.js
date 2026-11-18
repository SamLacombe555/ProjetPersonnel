
// +=====+ Section de Chargement des Pokemons. +=====+
let tousLesPokemons = [];
let tousLesTypes = [];
const champPokemon = document.getElementById("ChampPokemon");
const formulaireRecherche = document.getElementById("formulaireRecherche");
const champRecherche = document.getElementById("recherche");
const couleursTypes = {
    // Hésite pas à changer des couleurs.
    // Acier et Electrik sont difficiles à lire.
    normal: "#78774E",
    feu:    "#BB580F",
    eau:    "#326DEB",
    electrik:"#8C7205",
    plante: "#4A8229",
    glace:  "#2F817D",
    combat: "#C22E28",
    poison: "#A33EA1",
    sol:    "#906F1B",
    vol:    "#7F58ED",
    psy:    "#E7084C",
    insecte:"#6E7A11",
    roche:  "#837427",
    spectre:"#735797",
    dragon: "#6F35FC",
    tenebres:"#705746",
    acier:  "#71719E",
    fee:    "#C14884"
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

    carte.classList = 'card p-3 mb-3';
    nom.textContent = pokemon.nom;
    types.classList = 'mb-3';
    for (const type of pokemon.types) {types.append(creerBadgesType(type));}

    // Les images ne viennet pas de l'API, ils seront choisi aléatoirement.
    if (imageChoisi == 0) {image.src = "./multimedia/CharizardAhhShadow.png";}
    else if (imageChoisi == 1) {image.src = "./multimedia/GreninjaAhhShadow.png";}
    else if (imageChoisi == 2) {image.src = "./multimedia/MewtwoAhhShadow.png";}
    else if (imageChoisi == 3) {image.src = "./multimedia/PikachuAhhShadow.png";}
    else if (imageChoisi == 4) {image.src = "./multimedia/RayquazaAhhShadow.png";}
    image.classList = 'card-img-top';
    image.alt = `Image de ${pokemon.nom}`;

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

// À chaque intéraction dans 'formulaireRecherche', ajoute l'EventListener.
formulaireRecherche.addEventListener("input", () => {
    afficherPokemons(rechercherPokemon(champRecherche.value, tousLesPokemons)) });
formulaireRecherche.addEventListener("submit", (event) => event.preventDefault());
chargerPokemonAPI();


// +=====+ Section pour l'aperçu des informations. +=====+


function afficherInfoPokemonChoisi (pokemon, imagesrc) {
    // 1er colonnes affiche les informations selon la carte sélectionner.
    document.documentElement.scrollTop = 0;
    document.getElementById("carteAfficher").style.display = "block";
    document.getElementById("nomAfficher").textContent = pokemon.nom;
    document.getElementById("idAfficher").textContent = `ID: ${pokemon.id}`;
    document.getElementById("imageAfficher").src = imagesrc;
    document.getElementById("imageAfficher").alt = `Image agrandi de ${pokemon.nom}`;
    document.getElementById("pointVieAfficher").textContent = `Point de vie: ${pokemon.hp}`;
    document.getElementById("attaqueAfficher").textContent = `Point d'attaque: ${pokemon.attaque}`;
    document.getElementById("defenceAfficher").textContent = `Point de défense: ${pokemon.defence}`
    document.getElementById("vitesseAfficher").textContent = `Point de vitesse: ${pokemon.vitesse}`;
    
    // 2ème colonne, pour les informations concernant les types du pokemon.
    document.getElementById("descriptionAfficher").textContent = pokemon.description;
    const listeTypes = document.getElementById("typesAfficher");
    const listeFaiblesse = document.getElementById("faiblessesAfficher");
    listeTypes.replaceChildren();
    listeFaiblesse.replaceChildren();
    for (const type of pokemon.types) {listeTypes.append(creerBadgesType(type)); }
    for (const faiblesse of pokemon.faiblesses) {listeFaiblesse.append(creerBadgesType(faiblesse)); }
    document.getElementById("tailleAfficher").textContent = `Taille: ${pokemon.taille} m`;
    document.getElementById("poidsAfficher").textContent = `Poids: ${pokemon.poids} kg`;

    // TODO: Semble ajouter un id de trop à chaque clique.
    document.getElementById("btnSuppression").onclick = () => {modalSuppression(pokemon.id)};
}

function modalSuppression(IDpokemonInspecter) {
     // Efface le pokemon hors des pokemons de l'API quand confirmer.
    const modal = document.getElementById("modal");
    modal.classList.add("show");

    document.getElementById("btnAnnuler").onclick =()=> {
        modal.classList.remove("show");}

    document.getElementById("btnConfirmer").onclick =()=> {
        modal.classList.remove("show");
        document.getElementById("carteAfficher").style.display = "none";
        fetch(`https://6af2194542c6561ced390228.mockapi.io/Pokemon/${IDpokemonInspecter}`,
            { method: "DELETE"});
        // '.filter' sert à analyser un array avec une fonction. Dance ce cas, elever 'IDpokemonInspecter'.
        tousLesPokemons = tousLesPokemons.filter(pokemon => pokemon.id != IDpokemonInspecter);
        afficherPokemons(tousLesPokemons);
    }
}
