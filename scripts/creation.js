
import { Pokemon } from "./pokemon.js";

// +=====+ Section pour préparer les listes déroulantes. +=====+
let compteType = 1;
const formulaire = document.getElementById("formulairePokemon");
const listeSelectType = document.querySelector('#selectType1');
const boutonAjoutType = document.querySelector('#AjouterType');
const typeValide = ["Normal","Feu","Eau","Electrik","Plante","Glace",
            "Combat","Poison","Sol","Vol","Psy","Insecte","Roche",
            "Spectre","Dragon","Tenebres","Acier","Fee"];
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

function PreparerListeDeroulanteType(listeDeroulante) {
    // Remplis une 'select' élement avec 'typeValide'.
    for (let i=0; i<typeValide.length; i++) {
        const option = document.createElement('option');
        option.innerHTML = typeValide[i];
        listeDeroulante.append(option) }
}

function AjouterListeDeroulanteType() {
    // Ajoute un 'select' élement dans le 'containerType'.
    if (compteType < 2) {
        compteType += 1;
        const blocListeDeroulante = document.createElement('div');
        const labelListeDeroulante = document.createElement('label');
        const listeDeroulante = document.createElement('select');

        blocListeDeroulante.className = 'mb-3';
        labelListeDeroulante.classList = 'form-label';
        labelListeDeroulante.htmlFor = `selectType${compteType}`;
        labelListeDeroulante.textContent = 'Choisissez un type: ';
        listeDeroulante.classList = 'form-select';
        listeDeroulante.id = `selectType${compteType}`;
        listeDeroulante.name = `selectTypeChoisi${compteType}`;
        PreparerListeDeroulanteType(listeDeroulante);

        // Ajoute les nouvelles listeDéroulante avant le bouton d'ajout.
        blocListeDeroulante.append(labelListeDeroulante, listeDeroulante);
        boutonAjoutType.before(blocListeDeroulante);
        if (compteType == 2) {boutonAjoutType.remove(); } }
}

boutonAjoutType.addEventListener("click", AjouterListeDeroulanteType);
PreparerListeDeroulanteType(listeSelectType);


// +=====+ Section pour la partie: Aperçu de la carte. +=====+
function mettreAjourApercu () {
    // Met à jour l'apercu de la carte après chaque 'input' des informations.
    document.getElementById("nomApercu").textContent =
    document.getElementById("nom").value || "Apercu";

    document.getElementById("pointVieApercu").textContent = "Point de vie: "+
    document.getElementById("pointVie").value || 0;

    document.getElementById("attaqueApercu").textContent = "Point d'attaque: "+
    document.getElementById("attaque").value || 0;

    document.getElementById("defenceApercu").textContent = "Point de défense: "+
    document.getElementById("defence").value || 0;

    document.getElementById("vitesseApercu").textContent = "Point de vitesse: "+
    document.getElementById("vitesse").value || 0;

    document.getElementById("tailleApercu").textContent = "Taille: "+
    document.getElementById("taille").value || 0;

    document.getElementById("poidsApercu").textContent = "Poids: "+
    document.getElementById("poids").value || 0;

    document.getElementById("typesApercu").replaceChildren();
    for (let i=1; i<=compteType; i++) {
        const typeChoisi = document.querySelector(`#selectType${i}`).value;
        document.getElementById("typesApercu").append(creerBadgesType(typeChoisi)); }
}

formulaire.addEventListener("input", mettreAjourApercu);
mettreAjourApercu();


// +=====+ Section de création d'un Pokemon à partir du formulaire. +=====+
let tousLesPokemons = [];
let compteurPokemonId = 0;
async function compterPokemonIdAPI() {
    // Va chercher les données de mockapi et les met dans 'tousLesPokemons'.
    const reponse = await fetch("https://6af2194542c6561ced390228.mockapi.io/Pokemon")
    if (!reponse.ok) {throw new Error(`Erreur: ${reponse.status}`); } 
    tousLesPokemons = await reponse.json();
    compteurPokemonId = tousLesPokemons.length;
}

async function creationPokemon(event) {
    // Créer un pokemon avec le formulaire et l'envoie dans 'sessionstorage'.
    event.preventDefault();
    compteurPokemonId += 1;
    
    const nom = document.getElementById("nom").value;
    const type = [];
    // Circule dans les boites de type pour les mettre dans l'array 'type'.
    for (let i=1; i<=compteType; i++) {
        const typeChoisi = document.querySelector(`#selectType${i}`).value;
        type.push(typeChoisi); }
    // Convertie toutes les entrées chiffre en 'number'.
    const pointVie = Number(document.getElementById("pointVie").value);
    const attaque = Number(document.getElementById("attaque").value);
    const defence = Number(document.getElementById("defence").value);
    const vitesse = Number(document.getElementById("vitesse").value);
    const taille = Number(document.getElementById("taille").value);
    const poids = Number(document.getElementById("poids").value);

    const description = document.getElementById("description").value;
    const pokemon = new Pokemon(compteurPokemonId, nom, type, pointVie, attaque, defence,
        vitesse, taille, poids, description);
    
    // Envoye le pokemon crée dans l'API.
    const reponse = await fetch("https://6af2194542c6561ced390228.mockapi.io/Pokemon", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(pokemon)
    })
    if (!reponse.ok) {throw new Error(`Erreur: ${reponse.status}`)}
    const Verification = await reponse.json();
    console.log(Verification)

    // Cette partie sera remplacer pour l'API.
    // sessionStorage.setItem("CompteurPokemon", compteurPokemonId);
    // sessionStorage.setItem(`Pokemon${compteurPokemonId}`, JSON.stringify(pokemon));
}

function combinerTypes(type1, type2) {

    //const concatArr = firstArr.concat(secondArr)
    // const result = concatArr.filter((item, idx) => concatArr.indexOf(item) === idx)
    // Fonction permettant de combiner deux array en un et d'enlever les doubles
    // Source : https://gist.github.com/frivolta/4c94fe32b174a8f915f7324f826ee4c8#file-secondsolution-js
    let type3 = {
        faiblesse: type1.faiblesse.concat(type2.faiblesse),
        resistance: type1.resistance.concat(type2.resistance),
        immune: type1.immune.concat(type2.immune)
    };

    // Enlever les doubles
    type3.faiblesse = type3.faiblesse.filter(
        (item, idx, arr) => arr.indexOf(item) === idx
    );

    type3.resistance = type3.resistance.filter(
        (item, idx, arr) => arr.indexOf(item) === idx
    );

    type3.immune = type3.immune.filter(
        (item, idx, arr) => arr.indexOf(item) === idx
    );

    // Annuler les resistances et faiblesses
    for (const f of type3.faiblesse) {
        if (type3.resistance.includes(f)) {
            // Source pour filtrer array : https://stackoverflow.com/questions/3954438/how-to-remove-item-from-array-by-value
            type3.faiblesse = type3.faiblesse.filter(
                item => item !== f
            );

            type3.resistance = type3.resistance.filter(
                item => item !== f
            );
        }
    }

    // Immunité annule la resistance et faiblesse
    for (const i of type3.immune) {
        type3.faiblesse = type3.faiblesse.filter(
            item => item !== i
        );

        type3.resistance = type3.resistance.filter(
            item => item !== i
        );
    }

    return type3;
}

formulaire.addEventListener("submit", creationPokemon)
compterPokemonIdAPI();
