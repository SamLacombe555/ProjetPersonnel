
import { Pokemon } from "./pokemon.js";

// +=====+ Déclarations des élèments pour les listes de types. +=====+
// Déclarations des éléments du DOM.
let compteType = 1;
const listeSelectType = document.querySelector('#selectType1');
const boutonAjoutType = document.querySelector('#AjouterType');
const typeValide = ["Normal","Feu","Eau","Electrique","Herbe","Glace",
            "Combattant","Poison","Sol","Volant","Psychique","Insect",
            "Roche","Fantome","Dragon","Sombre","Acier","Feerique"];

// Déclaration des fonctions.
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
    // Créer un pokemon avec les réponses du formulaire et l'envoie dans 'sessionstorage'.
    compteurPokemon += 1;
    event.preventDefault();
    
    const nom = document.getElementById("nom").value;
    const type = [];
    // Boucle circule dans les boites de type afin de les mettre dans l'array 'type'.
    for (let i=1; i<=compteType; i++) {
        const typeChoisi = document.querySelector(`#selectType${i}`).value;
        type.push(typeChoisi); }
    const pointVie = document.getElementById("pointVie").value;
    const attaque = document.getElementById("attaque").value;
    const defence = document.getElementById("defence").value;
    const vitesse = document.getElementById("vitesse").value;
    const pokemon = new Pokemon(compteurPokemon, nom, type, pointVie, attaque, defence, vitesse);
    
    sessionStorage.setItem("CompteurPokemon", compteurPokemon);
    sessionStorage.setItem(`Pokemon${compteurPokemon}`, JSON.stringify(pokemon));

    
}

getData("https://6af2194542c6561ced390228.mockapi.io/testing")
    async function getData(url) {
        // L'enveloppe des données.
        const reponse = await fetch(url)
        // Renvoie erreur.
        if (!reponse.ok) {
            throw new Error(`Erreur: ${reponse.status}`);
        }
        // Le contenu
        const resultat = await reponse.json();
        for (let i=0; i<resultat.length; i++)
        {
            console.log(resultat[i].nom);
        }
        
    }

formulaire.addEventListener("submit", creationPokemon)

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
        listeType.append(liste); }
    )
}

formulaire.addEventListener("input", mettreAjourApercu);
mettreAjourApercu();
