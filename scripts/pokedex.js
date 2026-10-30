
// import {Pokemon} from "./pokemon";

// Déclaration des éléments du DOM.
const champPokemon = document.getElementById("ChampPokemon");
const boutonAjoutCarte = document.querySelector("#ajouterCarte");
boutonAjoutCarte.addEventListener("click", creationPokemon)

function creationPokemon() {
    // Constantes des informations du DOM.
    
    // Constante de création d'élément<
    const carte = document.createElement('div');
    const nom = document.createElement('h3');
    const btnSupprimer = document.createElement('button');
    carte.classList = 'card p-3';
    nom.textContent = 'Am a Pokemon!';
    btnSupprimer.type = 'button';
    btnSupprimer.classList = 'btn btn-warning';
    btnSupprimer.textContent = 'Enlever carte';
    btnSupprimer.addEventListener("click", () => {
        ouvrirModalSuppression(carte)
    })

    carte.append(nom, btnSupprimer);
    champPokemon.append(carte);

    for (let i=0; i<champPokemon.childNodes.length; i++) {
        sessionStorage.setItem(`Carte${i}`, champPokemon[i])
        console.log('A');
    }
}

function ouvrirModalSuppression(carte) {
    carte.remove();
    sessionStorage.clear();
}