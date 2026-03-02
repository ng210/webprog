function sum(list) {
    let result = 0
    for (let n of list) {
        result += n
    }
    return result
}

// C# LINQ - Aggregate
list.reduce((result, n) => {
    result += n;
    return result
}, 0)

// C# LINQ - Where
let arr = list.filter(n => n > 0)
arr = list.reduce((result, n) => {
    if (n > 0) {
        result.push(n)
    }
    return result
}, [])

// C# LINQ - Select
let arr2 = list.map(n => `id${n}`)
arr2 = list.reduce((result, n) => {
    result.push(`id${n}`)
    return result
}, [])


// Filter
let resArr = []
for (let n of list) {
    if (n > 0) {
        resArr.push(n)
    }
}
resArr.sort()

list.filter(n => n > 0).sort()

// Map
let strArr = []
for (let n of list) {
    strArr.push(`id${n}`)
}
strArr.sort()

list.map(n => `id${n}`).sort()