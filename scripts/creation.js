
// Déclarations des élèments du DOM.
let compteType = 1;
const listeType = document.getElementById('containerType');
const listeSelectType = document.querySelector('#selectType');
const typeValide = ["Normal","Feu","Eau","Electrique","Herbe","Glace",
            "Combattant","Poison","Sol","Volant","Psychique","Insect","Roche",
            "Fantome","Dragon","Sombre","Acier","Feerique"]

const boutonAjoutType = document.querySelector('#AjouterType');

boutonAjoutType.addEventListener("click", AjouterListeDeroulanteType);

function PreparerListeDeroulanteType() {
    const listeTempType = []
    for (let i=0; i<typeValide.length; i++) {
        listeTempType.push(document.createElement('option'));
        listeTempType[i].innerText = typeValide[i]; }
    for (let i=0; i<typeValide.length; i++) {
        listeSelectType.append(listeTempType[i]); }
}

function AjouterListeDeroulanteType() {
    if (compteType < 3) {
        // Création d'élément du DOM
        const blocListeDeroulante = document.createElement('div');
        const labelListeDeroulante = document.createElement('label');
        const listeDeroulante = document.createElement('select');

        blocListeDeroulante.className = 'mb-3';
        labelListeDeroulante.classList = 'form-label';
        labelListeDeroulante.textContent = 'Choisissez un type: ';
        listeDeroulante.classList = 'form-select';

        // Remplir la liste avec les types.
        for (let i=0; i<typeValide.length; i++) {
            const option = document.createElement('option');
            option.innerText = typeValide[i];
            listeDeroulante.append(option)
        }

        blocListeDeroulante.append(labelListeDeroulante, listeDeroulante);
        boutonAjoutType.before(blocListeDeroulante);
        compteType += 1;
    }
   
}



PreparerListeDeroulanteType();