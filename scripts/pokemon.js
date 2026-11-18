
// Les types valides qui seront utilisés pour 'pokemon.types' et 'pokemon.faiblesses'.
const typeValide = ["Normal","Feu","Eau","Electrik","Plante","Glace",
            "Combat","Poison","Sol","Vol","Psy","Insecte","Roche","Spectre",
            "Dragon","Tenebres","Acier","Fee"];

export class Pokemon {
    // Déclaration de variables.
    #id = 1
    #nom = ""
    #types = []
    #faiblesses = []
    #resistances = []
    #hp = 100
    #attaque = 10
    #defence = 15
    #vitesse = 10
    #taille = 5
    #poids = 35
    #description = ""

    // Déclaration du constructeur.
    constructor(id,
            nom,
            types,
            faiblesses,
            resistances,
            hp,
            attaque,
            defence,
            vitesse,
            taille,
            poids,
            description){
        this.#id = id
        this.#nom = nom
        this.#types = types
        this.#faiblesses = faiblesses
        this.#resistances = resistances
        this.#hp = hp
        this.#attaque = attaque
        this.#defence = defence
        this.#vitesse = vitesse
        this.#taille = taille
        this.#poids = poids
        this.#description = description
    }

    // Déclarration des getters et setters.
    // 'get' offre la permission de lire et 'set' donne la permission d'écrire.
    // J'ai pu véridier les types des paramètres en me référant à ce site:
    // https://www.index.dev/blog/javascript-type-checking-with-examples
    get id() {return this.#id}
    set id(id) {this.#id = id}

    get nom() {return this.#nom}
    set nom(nom) {
        if (nom !== "string") {throw TypeError("Le nom doit être de type string.")}
        this.#nom = nom }

    get types() {return this.#types}
    set types(types) {
        if (!Array.isArray(types)) {throw new TypeError("Types doit être un array.")}
        for (const type of types) {
            if (!typeValide.includes(type)) {
                throw new TypeError("Types contient un type invalide")}} 
        this.#types = types }

    get faiblesses() {return this.#faiblesses}
    set faiblesses(faiblesses) {
        if (!Array.isArray(faiblesses)) {throw new TypeError("Faiblesses doit être un array.")}
        for (const faiblesse of faiblesses) {
            if (!typeValide.includes(faiblesse)) {
                throw new TypeError("Faiblesses contient un type invalide")}} 
        this.#faiblesses = faiblesses }

    get resistances() {return this.#resistances}
    set resistances(resistances) {
        if (!Array.isArray(resistances)) {throw new TypeError("Résistances doit être un array.")}
        for (const resistance of resistances) {
            if (!typeValide.includes(resistance)) {
                throw new TypeError("Résistances contient un type invalide")}}
        this.#resistances = resistances }

    get hp() {return this.#hp}
    set hp(hp) {
        if (!Number.isInteger(hp)) {throw TypeError("Hp doit être de type number.")}
        this.#hp = hp }

    get attaque() {return this.#attaque}
    set attaque(attaque) {
        if (!Number.isInteger(attaque)) {throw TypeError("Attaque doit être de type number.")}
        this.#attaque = attaque }

    get defence() {return this.#defence}
    set defence(defence) {
        if (!Number.isInteger(defence)) {throw TypeError("Défence doit être de type number.")}
        this.#defence = defence }

    get vitesse() {return this.#vitesse}
    set vitesse(vitesse) {
        if (!Number.isInteger(vitesse)) {throw TypeError("Vitesse doit être de type number.")}
        this.#vitesse = vitesse }

    get taille() {return this.#taille}
    set taille(taille) {
        if (!Number.isInteger(taille)) {throw TypeError("Taille doit être de type number.")}
        this.#taille = taille }
    
    get poids() {return this.#poids}
    set poids(poids) {
        if (!Number.isInteger(poids)) {throw TypeError("Poids doit être de type number.")}
        this.#poids = poids }
    
    get description() {return this.#description}
    set description(description) {
        if (description != "string") {throw TypeError("La description doit être de type string.")}
        this.#description = description }
    
    // Déclarration du toJSON pour le mettre au 'sessionStorage'. Maintenant, API.
    toJSON() {
        return {
        id          : this.#id,
        nom         : this.#nom,
        types       : this.#types,
        faiblesses  : this.#faiblesses,
        resistances : this.#resistances,
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