import { Pokemon } from "./pokemon.js";

// Déclarations des élèments du DOM.
let compteType = 1;
// +=====+ Déclarations des élèments pour les listes de types. +=====+
const listeSelectType = document.querySelector('#selectType1');
const boutonAjoutType = document.querySelector('#AjouterType');
const typeValide = ["Normal","Feu","Eau","Electrique","Herbe","Glace",
            "Combattant","Poison","Sol","Volant","Psychique","Insect",
            "Roche","Fantome","Dragon","Sombre","Acier","Feerique"];

// Déclatation de fonctions.
function PreparerListeDeroulanteType(listeDeroulante) {
    // Remplis une 'select' élement avec 'typeValide'.
    for (let i=0; i<typeValide.length; i++) {
        const option = document.createElement('option');
        option.innerHTML = typeValide[i];
        listeDeroulante.append(option) }
}

function AjouterListeDeroulanteType() {
    // Ajoute un 'select' élement dans le 'containerType'.
    if (compteType < 3) {
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
        
        if (compteType == 3) {boutonAjoutType.remove(); } }
}

// Déclarations d'écouteurs d'évènments.
boutonAjoutType.addEventListener("click", AjouterListeDeroulanteType);
PreparerListeDeroulanteType(listeSelectType);


// +=====+ Création d'un nouveau Pokemon à partir du formulaire. +=====+
// Explication: compteur reçoit "compteurPokemon". S'il est false, parce qu'il ne contient
//      pas un chiffre parce qu'on a accèder au fichier pour la première fois, le compteur
//      commence à 0.
let compteurPokemon = parseInt(sessionStorage.getItem("CompteurPokemon"), 10) || 0;

const formulaire = document.getElementById("formulairePokemon");

function creationPokemon(event) {
    compteurPokemon += 1;
    event.preventDefault();

    const nom = document.getElementById("nom").value;
    const niveau = document.getElementById("niveau").value;
    const pointVie = document.getElementById("pointVie").value;
    const attaque = document.getElementById("attaque").value;
    const defence = document.getElementById("defence").value;
    const vitesse = document.getElementById("vitesse").value;
    const pokemon = new Pokemon(compteurPokemon, nom, "typePlaceHolder",
        niveau, pointVie, attaque, defence, vitesse);

    sessionStorage.setItem("CompteurPokemon", compteurPokemon);
    sessionStorage.setItem(`Pokemon${compteurPokemon}`, JSON.stringify(pokemon));
    console.log(pokemon);
    
}

formulaire.addEventListener("submit", creationPokemon)