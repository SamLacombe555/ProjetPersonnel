export class Type {

    // Liste de tous les types.
    static listeTypes = [];

    // Déclaration de variable
    #nom
    #faiblesses = []
    #resistances = []
    #immune = []

    // Déclaration du constructeur
    constructor(nom, faiblesses = [], resistances = [], immune = [], id) {
        this.#nom = nom;
        this.#faiblesses = faiblesses;
        this.#resistances = resistances;
        this.#immune = immune;
        this.#id = id

        // Ajoute automatiquement le type à la liste.
        Type.listeTypes.push(this);
    }

    // Déclaration des getters et setters.
    // 'get' offre la permission de lire et 'set' donne la permission d'écrire.
    get nom(){return this.#nom}
    set nom(nom){this.#nom = nom;}

    get #id(){return this.#id}
    set #id(ID){this.id = id}

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


    //const concatArr = firstArr.concat(secondArr)
    // const result = concatArr.filter((item, idx) => concatArr.indexOf(item) === idx)
    // ref: https://gist.github.com/frivolta/4c94fe32b174a8f915f7324f826ee4c8#file-secondsolution-js
    // merge les deux types ensembles
// for type3.faiblesse as t3f:
    // for type3.resistance as t3r:
        // if t3r == t3f:
            // t3r.remove(valeur)
            // t3f.remove(valeur)
    // for type3.immune as t3i:
        // for t3r:
            // if t3r == t3i:
                // t3r.remove(valeur)
        // for t3f:
            // if t3f == t3i:
                // t3f.remove(valeur)

// for type3.immune as t3i:
    // for type3.faiblesse as t3f:
        // if type3.
// for type1.faiblesse as t1f:
    // if t1f == t2r:
        // t3f.remove(t1f)
// for type1.resistance as t1r:
    // if t1r == t2r:
        // t3r.remove(t1r)
// for type1.immune as t1i:
    // if t1i == t3r
        // t3r.remove(t1i)

}