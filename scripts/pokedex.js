
// import {Pokemon} from "./pokemon";

// Déclaration des éléments du DOM.
const champPokemon = document.getElementById("ChampPokemon");
const boutonAjoutCarte = document.querySelector("#ajouterCarte");
boutonAjoutCarte.addEventListener("click", creationPokemon)
boutonAjoutCarte.addEventListener("click", chargerPokemon)

function chargerPokemon() {
    // Au lancement de la page, charge les pokemons.
    for (let i=0; i<sessionStorage.length; i++) {
        const cle = sessionStorage.key(i);
        if (cle.startsWith("Pokemon")) {
            const pokemon = JSON.parse(sessionStorage.getItem(cle))
            console.log(pokemon);

            const carte = document.createElement('div');
            const nom = document.createElement('h3');
            const btnSupprimer = document.createElement('button');
            carte.classList = 'card p-3';
            nom.textContent = `${pokemon.nom}`;
            btnSupprimer.type = 'button';
            btnSupprimer.classList = 'btn btn-warning';
            btnSupprimer.textContent = 'Enlever carte';
            btnSupprimer.addEventListener("click", () => {
                ouvrirModalSuppression(carte)
            })

            carte.append(nom, btnSupprimer);
            champPokemon.append(carte);
        }      
    }
}

function creationPokemon() {
    // Déclaration des éléments.
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
}

function ouvrirModalSuppression(carte) {
    carte.remove();
    sessionStorage.clear();
}

chargerPokemon();