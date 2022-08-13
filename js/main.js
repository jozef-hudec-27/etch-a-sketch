const MAIN_GRID_WIDTH = 600;

const outerGridContainerEl = document.querySelector('.outer-grid-container');
outerGridContainerEl.style.height = `${MAIN_GRID_WIDTH}px`;

const gridEl = document.getElementById('main-grid');
gridEl.style.width = `${MAIN_GRID_WIDTH}px`;
gridEl.style.height = `${MAIN_GRID_WIDTH}px`;


let gridSize = +prompt('How big do you want the grid to be?');

const newSquareWidth = MAIN_GRID_WIDTH / gridSize; 

gridSize *= gridSize;

while (gridSize > 0) {
    let newSquare = document.createElement('div');
    newSquare.style.width = `${newSquareWidth}px`;
    newSquare.style.height = `${newSquareWidth}px`;
    newSquare.style.border = '1px solid black';

    newSquare.addEventListener('mouseover', (e) => {
        if (e.buttons) {
            newSquare.style.backgroundColor = 'black';
        }
    });

    newSquare.addEventListener('mousedown', () => {
        newSquare.style.backgroundColor = 'black';
    });

    gridEl.appendChild(newSquare);

    gridSize--;
};