const size = 8;
const cellSize = 64;

window.addEventListener('load', (e) => {
    let grid = document.createElement('div');
    grid.className = 'board';
    grid.style.gridTemplate = `repeat(${size},1fr)/repeat(${size},1fr)`;

    for (let ci=0; ci<size*size; ci++) {
        let cell = document.createElement('div');
        cell.className = 'cell';
        cell.style.width = cellSize + 'px';
        cell.style.height = cellSize + 'px';
        let row = Math.floor(ci/size);
        let col = ci % size;
        if ( (row + col) % 2 == 1 ) {
        //if (Math.floor(ci/size) % 2 == ci % 2) {
            cell.classList.add('black');
        }
        cell.addEventListener('pointerenter', (e) => {
            cell.classList.add('hover');
        });
        cell.addEventListener('pointerleave', (e) => {
            cell.classList.remove('hover');
        });
        grid.appendChild(cell);
    }

    document.body.appendChild(grid);
});
