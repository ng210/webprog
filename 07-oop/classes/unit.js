import Entity from "./entity.js"

class Unit extends Entity {
    faction_id
    #unit_type
    attack_power
    defense
    speed
    health
    special_ability
// 1. Hozd létre az Entity osztályból származtatott Unit osztályt
// az alábbi JS objektum alapján:
// {
//     "unit_id": 1,
//     "faction_id": 1,
//     "name": "Marine",
//     "unit_type": "infantry",
//     "attack_power": 6,
//     "defense": 4,
//     "speed": 5,
//     "health": 40,
//     "special_ability": "Stimpack"
//   }
// 2. Az osztály konstruktora a fenti objektumból töltse ki a mezőket!
    constructor(line) {
        const tokens = line.trim().split(';')
        super(parseInt(tokens[0]), tokens[2].replaceAll('"', ''))
        this.faction_id = Number(tokens[1])
        this.#unit_type = tokens[3].replaceAll('"', '')
        this.attack_power = parseInt(tokens[4])
        this.defense = parseInt(tokens[5])
        this.speed = parseInt(tokens[6])
        this.health = parseInt(tokens[7])
        this.special_ability = tokens[8].replaceAll('"', '')
    }

// 3. Készítsd el a toString metódust,
// amely az egység nevét és azonosítóját adja vissza!
    toString() {
        return `${this.name} (${this.id})`
    }

    // 4. Vedd fel az attack és a defend metódusokat,
    // amelyek a megfelelő mezők értékét adja vissza
    // egy véletlen faktorral szorozva.
    attack() {
        return Math.random() * this.attack_power
    }

    defend() {
        return Math.random() * this.defense
    }
}

export default Unit