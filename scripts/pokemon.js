
export class Pokemon {

    // Liste de tous les Pokemons créés.
    static listePokemons= [];

    // Déclaration de variables.
    #id = 1
    #nom = "nomPlaceHolder"
    #type = ["TypePlaceHolder"]
    #hp = 100
    #attaque = 10
    #defence = 15
    #vitesse = 10

    // Déclaration du constructeur.
    constructor(id, nom, type, hp, attaque, defence, vitesse){
        this.#id = id
        this.#nom = nom
        this.#type = type
        this.#hp = hp
        this.#attaque = attaque
        this.#defence = defence
        this.#vitesse = vitesse

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

    // Déclarration des getters et setters.
    toJSON() {
        return {
        id      : this.#id,
        nom     : this.#nom,
        type    : this.#type,
        hp      : this.#hp,
        attaque : this.#attaque,
        defence : this.#defence,
        vitesse : this.#vitesse
        }
    }
}