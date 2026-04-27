import Entity from "./entity"

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

// 3. Készítsd el a toString metódust,
// amely az egység nevét és azonosítóját adja vissza!

// 4. Vedd fel az attack és a defend metódusokat,
// amelyek a megfelelő mezők értékét adja vissza
// egy véletlen faktorral szorozva.