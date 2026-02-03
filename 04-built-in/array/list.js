export default class List {
    #data = null

    get length() {
        return this.#data.length
    }

    // #region Konstruktorok
    // List<T>() - üres lista létrehozása
    // List<T>(IEnumerable<T> iterable) - lista létrehozása a megadott felsorolható elemekből 
    // List<T>(Int32) - megadott kapacitású lista létrehozása
    constructor(arg) {
        this.#data = []
        if (this.#isIterable(arg)) {
            this.addRange(arg)
        }
        else if (typeof arg === 'number') {
            this.#data = new Array(arg)
        }

		// A Proxy segítségével megadhatjuk, hogy a List objektumaink elemeinek (property)
		// írása vagy olvasása hogyan működjön. Ha a property neve egy szám, akkor a #data
		// privát elem indexeként használjuk. Ha a Symbol.iterator, azaz a list objektum
		// iterátorát kérjük le (pl. for..of ciklusnál vagy a ... spred operátorhoz), akkor
		// a privát #data tömb iterátorát adjuk vissza.
        return new Proxy(this, {
            get(target, prop, receiver) {
				if (prop === Symbol.iterator) {
					return target.#data[Symbol.iterator].bind(target.#data);
				}

                if (typeof prop === "string" && !isNaN(prop)) {
                    return target.#data[Number(prop)];
                }

				const value = target[prop];
				if (typeof value === "function") {
					return value.bind(target);
				}

				return target[prop];
            },

            set(target, prop, value, receiver) {
                if (typeof prop === "string" && !isNaN(prop)) {
                    target.#data[Number(prop)] = value;
                    return true;
                }

				target[prop] = value;
                return true;
            }
        });
    }
    //#endregion

    //#region Egyéb metódusok
    #isIterable(obj) {
        return obj != null && typeof obj[Symbol.iterator] === "function"
    }

	toString() {
		return this.#data+''
	}
    //#endregion

    // #region Elem hozzáadása / eltávolítása
    // void Add(T item) - Egy elem hozzáadása a lista végéhez
    add(item) {
        if (item !== undefined) {
            this.#data.push(item)
        }
    }
    // void AddRange(IEnumerable<T> iterable) - Több elem hozzáadása egyszerre
    addRange(iterable) {
        if (this.#isIterable(iterable)) {
            for (const item of iterable) {
                this.#data.push(item)
            }
        }
    }
    // void Insert(int index, T item) - Elem beszúrása adott indexre
    insert(index, item) {
        if (item !== undefined) {
            this.#data.splice(index, 0, item)
        }
    }
    // void InsertRange(int index, IEnumerable<T> items) - Elem beszúrása adott indexre
    insertRange(index, iterable) {
        if (this.#isIterable(iterable)) {
            for (const item of iterable) {
                this.#data.splice(index, 0, item)
                index++
            }
        }
    }
    // bool Remove(T item) - Az első egyező elem törlése
    remove(item) {
        const index = this.#data.indexOf(item)
        if (index == -1) return false
        const removed = this.#data.splice(index, 1)
        return removed.length != 0
    }

    // void RemoveAt(int index) - Elem törlése index alapján
    removeAt(index) {
        if (index >= 0 && index < this.length) {
            this.#data.splice(index, 1)
        }
    }

    // int RemoveAll(Predicate<T>) - Minden elem törlése, ami megfelel a feltételnek
    removeAll(predicate) {
        if (typeof predicate !== 'function') return 0
        let wi = 0
        for (let ri = 0; ri < this.#data.length; ri++) {
            if (!predicate(this.#data[ri])) {
                this.#data[wi++] = this.#data[ri]
            }
        }

        const count = this.#data.length - wi
        this.#data.length = wi

        return count
    }

    // Clear() - A lista teljes ürítése
    clear() {
        this.#data.length = 0
    }
    //#endregion

    // #region Keresés és vizsgálat
    // bool Contains(T item) - Megnézi, hogy az elem szerepel-e
    contains(item) {
        return this.#data.includes(item)
    }
    // int IndexOf(T item) - Az elem indexe (vagy -1)
    indexOf(item) {
        return this.#data.indexOf(item)
    }
    // T Find(Predicate<T>) - Első elem, ami megfelel a feltételnek
    find(predicate) {
        if (typeof predicate !== 'function') return null
        return this.#data.find(predicate)
    }

    // FindAll(Predicate<T>) - Összes megfelelő elem
    findAll(predicate) {
        if (typeof predicate !== 'function') return null
        return this.#data.filter(predicate)
    }

    // bool Exists(Predicate<T>) - Van-e legalább egy megfelelő elem
    exists(predicate) {
        if (typeof predicate !== 'function') return false
        return this.#data.some(predicate)
    }
    //#endregion

    // #region Rendezés és módosítás
    // Sort() - Lista rendezése
    // Sort(Comparison<T>) - Egyedi rendezési logika
    sort(compare) {
        if (typeof compare !== 'function') compare = undefined
        this.#data.sort(compare)
    }
    // Reverse() - Lista megfordítása
    reverse(start = 0, end = this.#data.length - 1) {
        if (start < 0) start = 0
        if (end >= this.#data.length) end = this.#data.length-1
        while (start < end) {
            const tmp = this.#data[start]
            this.#data[start] = this.#data[end]
            this.#data[end] = tmp
            start++
            end--
        }
    }
    // void ForEach(Action<T>) - Minden elemre művelet végrehajtása
    forEach(action) {
        if (typeof action === 'function') {
            this.#data.forEach(action)
        }
    }
    //#endregion

    // List<U> Select() - Leképezés (objektum → másik forma)
    select(selector) {
        let newList = new List()
        newList.addRange(this.#data.map(selector))
        return newList
    }
    // FirstOrDefault() - Első elem vagy null / default
    firstOrDefault(predicate) {
        return this.find(predicate)
    }
    // Any() - Van-e legalább egy elem
    any(predicate) {
        return this.#data.some(predicate)
    }

    // All() - Minden elem megfelel-e
    all(predicate) {
        return this.#data.every(predicate)
    }

    // Count() - Elemek száma (feltétellel is)
    count(predicate) {
        if (typeof predicate !== 'function') return this.length
        let count = this.#data.reduce(
            (acc, current) => {
                if (predicate(current)) acc++
                return acc
            }, 0)
        return count
    }

    sum(predicate) {
        if (typeof predicate !== 'function') return 0
        let count = this.#data.reduce(
            (acc, current) => {
                if (!isNaN(current) && predicate(current)) acc += current
                return acc
            }, 0)
        return count
    }
}