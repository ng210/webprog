export default class Entity {
    id
    name

    constructor(obj) {
        this.id = parseInt(obj.unit_id)
        this.name = obj.name
    }

    toString() {
        return `${this.name} (${id})`
    }
}