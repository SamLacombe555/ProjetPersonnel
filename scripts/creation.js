
import { Pokemon } from "./pokemon.js";

// +=====+ Section pour préparer les listes déroulantes. +=====+
let compteType = 1;
const formulaire = document.getElementById("formulairePokemon");
const listeSelectType = document.querySelector('#selectType1');
const boutonAjoutType = document.querySelector('#AjouterType');
const typeValide = ["Normal","Feu","Eau","Electrik","Plante","Glace",
            "Combat","Poison","Sol","Vol","Psy","Insecte","Roche",
            "Spectre","Dragon","Tenebres","Acier","Fee"];

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
    document.getElementById("nom").value || "nomApercu";

    document.getElementById("pointVieApercu").textContent = "Point de vie : " +
    document.getElementById("pointVie").value || 0;

    document.getElementById("attaqueApercu").textContent = "Attaque : " +
    document.getElementById("attaque").value || 0;

    document.getElementById("defenceApercu").textContent = "Défence : " +
    document.getElementById("defence").value || 0;

    document.getElementById("vitesseApercu").textContent = "Vitesse : " +
    document.getElementById("vitesse").value || 0;

    // Met à jour l'aperçu pour la liste de type.
    const listeType = document.querySelector("card ol");
    listeType.innerHTML = "";   // Vide les listes de l'aperçu.
    const containerType = document.querySelectorAll("#containerType select")
    containerType.forEach(select => {
        const liste = document.createElement("li");
        liste.textContent = select.value;
        listeType.append(liste); } )
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
    const pointVie = document.getElementById("pointVie").value;
    const attaque = document.getElementById("attaque").value;
    const defence = document.getElementById("defence").value;
    const vitesse = document.getElementById("vitesse").value;
    const pokemon = new Pokemon(compteurPokemonId, nom, type, pointVie, attaque, defence, vitesse);
    
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

formulaire.addEventListener("submit", creationPokemon)
compterPokemonIdAPI();
