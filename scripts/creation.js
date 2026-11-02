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
    if (compteType < 3) { compteType += 1;
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
const formulaire = document.getElementById("formulairePokemon");

function creationPokemon(event) {
    event.preventDefault();

    const nom = document.getElementById("nom").value;
    const niveau = document.getElementById("niveau").value;
    const pointVie = document.getElementById("pointVie").value;
    const attaque = document.getElementById("attaque").value;
    const defence = document.getElementById("defence").value;
    const vitesse = document.getElementById("vitesse").value;

    console.log(nom);
    console.log(niveau);
    console.log(pointVie);
    console.log(attaque);
    console.log(defence);
    console.log(vitesse);
    const pokemon = new Pokemon(compteType, nom, "typePlaceHolder", niveau, pointVie, attaque, defence, vitesse);
    console.log(pokemon);
}

formulaire.addEventListener("submit", creationPokemon)