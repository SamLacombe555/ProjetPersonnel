export class Type {

    // Liste de tous les types.
    static listeTypes = [];

    // Déclaration de variable
    #nom
    #faiblesses = []
    #resistances = []
    #immune = []

    // Déclaration du constructeur
    constructor(nom, faiblesses = [], resistances = [], immune = []) {
        this.#nom = nom;
        this.#faiblesses = faiblesses;
        this.#resistances = resistances;
        this.#immune = immune;

        // Ajoute automatiquement le type à la liste.
        Type.listeTypes.push(this);
    }

    // Déclaration des getters et setters.
    // 'get' offre la permission de lire et 'set' donne la permission d'écrire.
    get nom(){return this.#nom}
    set nom(nom){this.#nom = nom;}

    get faiblesses(){return this.#faiblesses}
    set faiblesses(faiblesses){this.#faiblesses = faiblesses}

    get resistances(){return this.#resistances}
    set resistances(resistances){this.#resistances = resistances}

    get immune(){return this.#immune}
    set immune(immune){this.#immune = immune}

    // Déclarration des getters et setters.
    toJSON() {
        return {
            nom: this.#nom,
            faiblesses: this.#faiblesses,
            resistances: this.#resistances,
            immune: this.#immune,
        }
    }
}