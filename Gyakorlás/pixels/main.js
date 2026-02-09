const _size = 10

function getImagePixels(image) {
    const canvas = document.createElement("canvas")
    const ctx = canvas.getContext("2d")
    canvas.width = image.width
    canvas.height = image.height
    ctx.drawImage(image, 0, 0)

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
    const data = imageData.data

    const pixels = []
    for (let i = 0; i < data.length; i += 4) {
        pixels.push(data[i], data[i + 1], data[i + 2])
    }
    return pixels
}

async function main() {
    const img = document.querySelector('#success-kid')
    const pixels = getImagePixels(img)
    const div = document.querySelector('#pixels')
    let ix = 0
    for (let y = 0; y < img.height; y++) {
        for (let x = 0; x < img.width; x++) {
            const color = `rgb(${pixels[ix++]}, ${pixels[ix++]}, ${pixels[ix++]})`
            let pixel = document.createElement('div')
            pixel.className = 'pixel'
            pixel.style.left = `${x*_size}px`
            pixel.style.top = `${y*_size}px`
            pixel.style.width = `${_size}px`
            pixel.style.height = `${_size}px`
            pixel.style.backgroundColor = color
            div.appendChild(pixel)
        }
    }
}

main()
