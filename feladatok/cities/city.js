export default class City {
    orszag
    nev
    nepesseg
    nyelv
    penznem
    nevezetesseg

    constructor(line) {
        let tokens = line.split(';')
        let i = 0
        this.orszag = tokens[i++]
        this.nev = tokens[i++]
        this.nepesseg = parseInt(tokens[i++])
        this.nyelv = tokens[i++]
        this.penznem = tokens[i++]
        this.nevezetesseg = tokens[i++]
    }
}