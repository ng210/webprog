import Entity from "./entity"

export default class Unit extends Entity {
    factionId
    type
    attack
    defense
    speed
    health
    special
    faction

    constructor(obj) {
        super(obj)
        this.factionId = parseInt(obj.faction_id)
        this.type = obj.unit_type
        this.attack = parseInt(obj.attack_power)
        this.defense = parseInt(obj.defense)
        this.speed = parseInt(obj.speed)
        this.health = parseInt(obj.health)
        this.special = obj.special_ability
        faction = null
    }

    attack() {
        return Math.floor(this.attack * Math.random()) 
    }

    defense() {
        return Math.floor(this.defense * Math.random()) 
    }
}