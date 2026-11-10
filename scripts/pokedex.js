
// import {Pokemon} from "./pokemon";

// Déclaration des éléments du DOM.
const champPokemon = document.getElementById("ChampPokemon");

function chargerPokemon() {
    // Au lancement de la page, charge les pokemons.
    for (let i=0; i<sessionStorage.length; i++) {
        const cle = sessionStorage.key(i);
        if (cle.startsWith("Pokemon")) {
            const pokemon = JSON.parse(sessionStorage.getItem(cle))
            console.log(pokemon);

            const carte = document.createElement('div');
            const nom = document.createElement('h3');
            const type = document.createElement('p');
            const btnInspecter = document.createElement('button');
            const btnSupprimer = document.createElement('button');
            carte.classList = 'card p-3';
            nom.textContent = `${pokemon.nom}`;
            for (let i=0; i<pokemon.type.length; i++) {type.textContent += `| ${pokemon.type[i]} `; }
            btnInspecter.type = 'button';
            btnInspecter.classList = 'btn btn-info';
            btnInspecter.textContent = 'Inspecter';

            btnSupprimer.type = 'button';
            btnSupprimer.classList = 'btn btn-warning';
            btnSupprimer.textContent = 'Enlever carte';
            btnSupprimer.addEventListener("click", () => {
                ouvrirModalSuppression(carte)
            })

            carte.append(nom, type, btnInspecter, btnSupprimer);
            champPokemon.append(carte);
        }      
    }
}

function ouvrirModalSuppression(carte) {
    carte.remove();
    sessionStorage.clear();
}

function rechercherPokemon(motCherche, listPokemons) {
    // Fonction pour la barre de recherche qui ferrait apparaître les Pokemons qui y correspondent
    const regex = new RegExp(motCherche, "gi");

    return listPokemons.filter(listPokemons => regex.test(listPokemons.nom));

}

chargerPokemon();