
export class Pokemon {
    // Déclaration de variables.
    #id = int
    #nom = "nomPlaceHolder"
    #type = "TypePlaceHolder"
    #hp = 0
    #attaque = 0
    #defence = 0
    #vitesse = 0

    // Déclaration du constructeur.
    constructor(id, nom, type, hp, attaque, defence, vitesse){
        this.#id = id
        this.#nom = nom
        this.#type = type
        this.#hp = hp
        this.#attaque = attaque
        this.#defence = defence
        this.#vitesse = vitesse
    }

    // Déclarration des getters et setters.
    get id() {return this.#id}
    set id(id) {this.#id = id}

    get nom() {return this.#nom}
    set nom(nom) {
        if (nom != string) {throw TypeError("Le nom doit être de type string.")}
        this.#nom = nom }

    get type() {return this.#type}
    set type(type) {
        const typeValide = ["Normal","Feu","Eau","Electrique","Herbe","Glace",
            "Combattant","Poison","Sol","Volant","Psychique","Insect","Roche",
            "Fantome","Dragon","Sombre","Acier","Feerique"]
        if (!(typeValide.includes(type))) {
            throw TypeError("Le type doit être de type valide, donc soit:",
                "Normal, Feu, Eau, Electrique, Herbe, Glace, Combattant, Poison,",
                "Sol, Volant, Psychique, Insect, Roche, Fantome, Dragon, Sombre,",
                "Acier, Feerique.")}
        this.#nom = nom }

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
        if (vitesse != int) {throw TypeError("La défence doit être de type int.")}
        this.#vitesse = vitesse }

}