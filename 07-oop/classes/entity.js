export default class Entity {
    #id
    get id() { return this.#id }
    name

    constructor(id, name) {
        this.#id = id
        this.name = name
    }

    toString() {
        return `${this.name} (${id})`
    }

    // "absztrakt" metódusok
    attack() {
        throw new Error('Not implemented!')
    }

    defend() {
        throw new Error('Not implemented!')
    }
}