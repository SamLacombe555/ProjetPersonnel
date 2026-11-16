
export class Pokemon {
    // Liste de tous les Pokemons créés.
    static listePokemons= [];
    // Déclaration de variables.
    #id = 1
    #nom = "nomTemporaire"
    #type = ["typeTemporaire"]
    #faiblesse = ["faiblesseTemporaire"]
    #hp = 100
    #attaque = 10
    #defence = 15
    #vitesse = 10
    #taille = 5
    #poids = 35
    #description = "descriptionTemporaire"

    // Déclaration du constructeur.
    constructor(id,
            nom,
            types,
            faiblesses,
            hp,
            attaque,
            defence,
            vitesse,
            taille,
            poids,
            description){
        this.#id = id
        this.#nom = nom
        this.#type = types
        this.#faiblesse = faiblesses
        this.#hp = hp
        this.#attaque = attaque
        this.#defence = defence
        this.#vitesse = vitesse
        this.#taille = taille
        this.#poids = poids
        this.#description = description
        // Ajoute automatique le Pokemon à la liste.
        Pokemon.listePokemons.push(this);
    }

    // Déclarration des getters et setters.
    // 'get' offre la permission de lire et 'set' donne la permission d'écrire.
    get id() {return this.#id}
    set id(id) {this.#id = id}

    get nom() {return this.#nom}
    set nom(nom) {
        if (nom != string) {throw TypeError("Le nom doit être de type string.")}
        this.#nom = nom }

    get type() {return this.#type}
    set type(type) {
        const typeValide = ["Normal","Feu","Eau","Electrik","Plante","Glace",
            "Combat","Poison","Sol","Vol","Psy","Insecte","Roche","Spectre",
            "Dragon","Tenebres","Acier","Fee"]
        for (typeRegarder of type) {
            if (!(typeValide.includes(type))) {
            throw TypeError("Le type doit être de type valide, donc soit:",
                "Normal, Feu, Eau, Electrik, Plante, Glace, Combat, Poison,",
                "Sol, Vol, Psy, Insecte, Roche, Spectre, Dragon, Tenebres,",
                "Acier, Fee.") }
            this.#type = type } }

    get faiblesse() {return this.#faiblesse}
    set faiblesse(faiblesse) {
        const typeValide = ["Normal","Feu","Eau","Electrik","Plante","Glace",
            "Combat","Poison","Sol","Vol","Psy","Insecte","Roche","Spectre",
            "Dragon","Tenebres","Acier","Fee"]
        for (typeRegarder of type) {
            if (!(typeValide.includes(type))) {
            throw TypeError("La faiblesse doit être de type valide, donc soit:",
                "Normal, Feu, Eau, Electrik, Plante, Glace, Combat, Poison,",
                "Sol, Vol, Psy, Insecte, Roche, Spectre, Dragon, Tenebres,",
                "Acier, Fee.") }
            this.#faiblesse = faiblesse } }

    get hp() {return this.#hp}
    set hp(hp) {
        if (hp != int) {throw TypeError("L'hp doit être de type int.")}
        this.#hp = hp }

    get attaque() {return this.#attaque}
    set attaque(attaque) {
        if (attaque != int) {throw TypeError("L'attaque doit être de type int.")}
        this.#attaque = attaque }

    get defence() {return this.#defence}
    set defence(defence) {
        if (defence != int) {throw TypeError("La défence doit être de type int.")}
        this.#defence = defence }

    get vitesse() {return this.#vitesse}
    set vitesse(vitesse) {
        if (vitesse != int) {throw TypeError("La vitesse doit être de type int.")}
        this.#vitesse = vitesse }

    get taille() {return this.#taille}
    set taille(taille) {
        if (taille != float) {throw TypeError("La taille doit être de type float.")}
        this.#taille = taille }
    
    get poids() {return this.#poids}
    set poids(poids) {
        if (poids != float) {throw TypeError("Le poids doit être de type int.")}
        this.#poids = poids }

    get description() {return this.#description}
    set description(description) {
        if (description != string) {throw TypeError("La description doit être de type string.")}
        this.#description = description }
    
    // Déclarration des getters et setters.
    toJSON() {
        return {
        id          : this.#id,
        nom         : this.#nom,
        type        : this.#type,
        faiblesse   : this.#faiblesse,
        hp          : this.#hp,
        attaque     : this.#attaque,
        defence     : this.#defence,
        vitesse     : this.#vitesse,
        taille      : this.#taille,
        poids       : this.#poids,
        description : this.#description
        }
    }
}