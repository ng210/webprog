JavaScript

# 1. IDE, környezet, modulok #

## IDE: Visual Studio Code
### Alapok
### Funkciók, gyorsbillentyűk
### Debug

## Környezet
### Böngésző
### nodeJS

## Modulok ##
### Modul - moduláris programozás
### Az export és import kulcsszavak ##
### Modul típusok: CommonJS vs ES Module ##
### Modulok használata böngészőben és Node.js környezetben ##

# 2. Alapok #

## Típusok ##

### Primitív típusok ###
  - szöveges (String)
      'alma', "barack", `citrom`, ''
      String('alma')
  - numerikus (Number = 64bit double)
      10, 1000.0, 1e6, NaN, Infinity
      Number(10)
  - logikai (Boolean)
      true, false,
      Boolean(true), Boolean('a'), Boolean('')
  - üres, érték nélküli (null)
  - nem létező, nem definiált (undefined)
  ES6
  - BigInt
      1245646564515635412348923448234842842343546576876789n
  - Symbol
      Symbol("szimbólum")

### Összetett típusok ###
  - Object
      new Object(),
      {
          "id": 101,
          "name": "John Doe",
          "age": 48,
          "print": function() { console.log(this.name); }
      }
  - beépített objektumok (built-in object types), new operátor
    - String: new String(), new String("alma"), new String(12)->'12'
    - Number: new Number(), new Number(10), new Number("alma")->NaN
    - Boolean: new Boolean(), new Boolean(false), new Boolean("false"), new Boolean(0)
    - Date: new Date() [=new Date(Date.now)], new Date("2025-01-01"), new Date(2025, 1, 1), Date()
    - Array: new Array(4), [ 1, 2, "alma", {"id": 12}, new Date(), ['a', 'b'] ]
  - Objektum "gyár" (Factory function)
    - Object('alma'), vagy new Object('alma') -> new String('alma'), primitív értéke 'alma'
    - Object(12) vagy new Object(12) -> new Number(12), primitív értéke 12
    - Object(true), vagy new Object(true) -> new Boolean(true)
    - Object([1, 2]), vagy new Object([1, 2]) -> [1, 2]
    - Object(function a() {}), new Object(function a() {}) -> function a() {}

### Függvények ###
- önálló típus (callable object), de
- technikailag egy objektum
- aszinkron függvények, async/await
- generátor függvények, function*/yield

## Értékek ##
  - statikus értékek, literálok (fixed values)
  - dinamikus értékek, változók (dynamic values)
      - var, let, const
      - gyengén típusosság (weakly typed)
          - összehasonlítás a C# nyelvvel (boxing, unboxing)
      - értékadás vs összehasonlítás vs összehasonlítás típus ellenőrzéssel (=, ==, !=, ===, !==)
      - nyelv kulcsszavai: https://www.tutorialspoint.com/javascript/javascript_reserved_keywords.htm

## Átalakítás, típus ellenőrzés
  -  konverzió (type conversion)
      - implicit (coercion): automatikus, operátortól függ
          - szöveggé
            10 + '5' = String(10) + '5' = '105'
          - számmá
            10 * '5' = 10 * Number('5') = 50
            10 / '5' = 10 / Number('5') = 2
            10 - '5' = 10 - Number('5') = 5
            10 - false = 10 - Number(false) = 10 - 0 = 10
            10 * true = 10 * Number(true) = 10 * 1 = 10
          - logikaivá
            !!"alma" = Boolean('alma') = true
            !!0 = Boolean(0) = false,
            !!new Boolean(false) = Boolean({}) = true
            "false" értékek: false, '', 0, -0, 0n, null, undefined, NaN
            "truthy" értékek (minden egyéb): objektumok (Object), függvények, nem üres stringek, nem nulla számok
      - explicit:
        - konstruktorok függvényként (lásd a primitív értékeknél): String, Number, Boolean
        - parser metódusok: parseInt, parseFloat, Date.parse
        - toString metódus

  - ellenőrzés (type check)
    - typeof operátor: typeof 'alma' === 'string' -> igaz
    - instanceof operátor: new Number(12) instanceof Number -> igaz
    - Object.prototype.toString.call(true) -> [object Boolean]
    - Array.isArray([]) -> igaz
    - konstruktor vizsgálata: (function a() {}).constructor === Function -> igaz

## Operátorok ###

### Aritmetikai ###
  - +, -, *, /, %, **
  - pre és post ++, --
### Összehasonlító ###
  - ==, !=, <, >, <=, >=
  - típus ellenőrzéssel: ===, !==
### Logikai ###
  - !, &&, ||
### Bitenkénti ###
  - &, |, ^, ~, <<, >>, >>> (előjel nélküli 32 bites)
### Értékadás ###
  - =
  - aritmetikai: +=, -=, *=, /=, %=, **=
  - bitenkénti: &=, |=, ^=, >>=, <<=, >>>=
  - logikai: &&=, ||= (falsy), ??= (nullish)
### Feltételes értékadás (ternary operator)
  - ?
### Egyéb ###
  - typeof, instanceof: típus ellenőrzés
  - !!: logikai értékre alakítás
  - ??: nullish ellenőrzés
  - new
  - delete - objektum elemeinek törlése
      - tömb elemének törlése
      - előre definiált objektum törlése
  - vessző (coma)
      - for ciklus, tömb definíció, értékadás
  - csoportosítás, zárójelek (grouping)
      - műveletek sorrendjének (precedence) módosítása
      - azonnal meghívandó függvények (immedietly invoked functions)
  - ... spread operátor
  - await
  - yield
  
### Sorrend (precedence)
  1 (): csoportosítás
  2  . vagy []: objektum tagjának elérése,
  2 (): függvényhívás
  2 new: objektum létrehozása, 
  3 --, ++: postfix csökkentés, növelés,
  4 --, ++: prefix csökkentés, növelés,
  4 typeof: típus lekérdezése,
  4 !: logikai tagadás
  4 ~: bitenkénti tagadás
  4 -, +: előjelváltás
  4 delete: objektum elemének törlése
  5 **: hatványozás
  6 *, /, %: szorzás, osztás, maradékos osztás
  7 +, -: összeadás, kivonás
  8 <<, >>, >>>: bitenkénti eltolás
  9 in: objektum elemének ellenőrzése
  9 instanceof: objektum típusának ellenőrzése
  9 <, <=, >, >=: összehasonlítás
 10 ==, !=, ===, !==: egyenlőség vizsgálata
 11 &: bitenkénti és
 12 ^: bitenkénti kizáró vagy
 13 |: bitenknénti vagy
 14 &&: logikai és
 15 ||: logikai vagy
 16 ??: nullish érték kezelése
 17 =, +=, -=, *=, /=, %=, **=, stb: művelet és értékadás
 17 =>: nyíl operátor (nyíl függvényben)
 17 ...:	Spread operátor
 18 yield: generátor függvényben
 19 ,: vessző

## Vezérlési szerkezetek ##

### Feltétel ###
  - if ... else
  - switch
  - ? operátor

### Ciklus vezérlése ###
  - break, continue
  - címke (label)

### for ciklus ###
  - for
  - for .. in
  - for .. of

### while ciklus ###
  - while ...
  - do ... while

### Iterátor, iterálhatóság (Symbol.iterator tag) ###
  - next metódus
  - generátor függvény

## Függvények ##

### Függvény létrehozása ###
  - definíció
  - paraméterek, alapértemezett (default) értékek, destructuring, polimorfizmus
  - nevesített, névtelen függvények
  - függvény mint változó
  - call, apply, bind
  - konstruktor függvény (new, this)
  - metódusok

### Nyílfüggvény ###
  - szintaxis
  - kontextus (this, scope)
  - kapcsolat a C# lambda kifejezéssel

# 3. OOP #

## A JavaScript objektum ##

### Objektum ###
  - a hashmap tulajdonságai
  - objektum definíálása
      - jellemzők (tagváltozók)
      - metódusok (tagfüggvények)
  - primitív érték vs objektum
 
### A prototípus ###
  - prototipzálás vs OOP
  - a prototype és a __proto__ jellemzők
  - konstruktor függvény, prototype és class kapcsolata 

### Klónozás, szerializálás ###
  - referencia és érték típusok
  - sekély/mély másolat (shallow/deep copy)
  - JSON api

## OOP elvek JavaScriptben ##

### Egységbe zárás (encapsulation) ###
  - objektum
      - getter és setter
      - Statikus metódusok
  - public, privát és protected láthatóság
### Absztrakció (abstraction) ###
  - osztály szinten közvetlenül nem támogatott
  - metódus szinten létezik
### Öröklődés (inheritance) ###
  - prototype, __proto__
  - class és extends
  - kompozíció, Object.assign
### Polimorfizmus ###
  - függvény felüldefiniálása (overriding) támogatott
  - függvény túlterhelése (overloading) nem támogatott

# 4. JavaScript eseménykezelés #

## Eseménykezelés alapjai ##

### Event objektum és eseménytípusok ##
  - Általános: load, unload, resize, scroll
  - Mutató: mouse, pointer események, click
  - Bevitel: change, keydown, keyup, focus
  - Egyéni események

### Esemény delegálás, bubbling, capturing

## Eseménykezelő hozzáadása, törlése ##
  - addEventListener vs onxxx attribútum
  - removeEventListener

# 5. JavaScript és a DOM (Document Object Model) #

## Alapfogalmak ##

### Fa struktúra, DOM ###
  - csomópontok (node)
  - attribútumok (attribute)
  - szülő-gyermek viszony

## HTML Elemek ##

### Tulajdonságok ###
  - beépített (built-in)
  - bővíthetőség, módosítás (customization)
      - alosztály (subclass)
      - mixin
      - proxy
  - fontos attribútumok
      - id
      - class/className
      - name
      - innerHTML
      - style
      - value

### Gyakran használt HTML elemek ###
  - HTMLInputElement
  - HTMLButtonElement
  - HTMLDivElement
  - HTMLTableElement (row, header és data cell)

## Elemek létrehozása ##
  - osztály példányosítása
  - document.createElement
  - szülő .innerHTML attribútumának írása

## Elemek lekérdezése ##

### DOM bejárásával ###
  - getElementById, getElementsBy...
  - parentNode, parentElement, childNodes, children
  - nextSibling, previousSibling, firstChild, lastChild

### CSS szelektorokkal ###
  - querySelector
  - CSS szelektorok

## Tartalom generálása ##


# 6. Webkomponens #

## Alapfogalmak, célok ##
    - HTML elemek kibővítése
    - új HTML elemek definiálása
    - Metódusok
      - connectedCallback, disconnectedCallback, adoptedCallback, attributeChangedCallback
    - ObservedAttributes
    - <template> használata

# 7. Aszinkronitás
  - Callback
  - Promise
  - async/await
  - feladatok láncolása (chaining)
  - Időzítő műveletek: setTimeout, setInterval

# 8. A fetch API #

## AJAX ##

##  API ismertetése

### GET kérés

### POST kérés
