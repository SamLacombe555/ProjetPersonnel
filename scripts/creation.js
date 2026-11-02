
// Déclarations des élèments du DOM.
let compteType = 1;

// Déclarations des élèments DOM pour les listes de types.
const containerType = document.getElementById('containerType');
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
        // Création des élément du DOM et attribution des classes.
        const blocListeDeroulante = document.createElement('div');
        const labelListeDeroulante = document.createElement('label');
        const listeDeroulante = document.createElement('select');

        blocListeDeroulante.className = 'mb-3';
        labelListeDeroulante.classList = 'form-label';
        labelListeDeroulante.for = `selectType${compteType}`;
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