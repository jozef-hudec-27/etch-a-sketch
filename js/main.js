const MAIN_GRID_WIDTH = 700;

let gridHeight = 16;
let newSquareWidth = MAIN_GRID_WIDTH / gridHeight; 
gridHeight *= gridHeight;

const outerGridContainerEl = document.querySelector('.outer-grid-container');
outerGridContainerEl.style.height = `${MAIN_GRID_WIDTH}px`;

const gridEl = document.getElementById('main-grid');
gridEl.style.width = `${MAIN_GRID_WIDTH}px`;
gridEl.style.height = `${MAIN_GRID_WIDTH}px`;

const settingsPanelEl = document.getElementById('settings-panel')
settingsPanelEl.style.height = `${MAIN_GRID_WIDTH}px`;
settingsPanelEl.style.width = `${MAIN_GRID_WIDTH/3}px`;

let penColor = 'black';

let tiles;
const tileBorderCheck = document.getElementById('toggle-tile-border')
tileBorderCheck.addEventListener('change', e => {
    if (!tiles) {
        tiles = document.getElementsByClassName('tile'); 
    };

    let check = e.target.checked

    Array.from(tiles).forEach(tile => {
        tile.style.border = check ? '1px solid black' : ''
    })
})

const gridSizePicker = document.getElementById('grid-size-range');
const currentGridSizeText = document.getElementById('cur-grid-size')
gridSizePicker.addEventListener('change', e => {
    let newGridHeight = e.target.value;

    newSquareWidth = MAIN_GRID_WIDTH / newGridHeight
    gridHeight = newGridHeight ** 2

    const currentTiles = document.getElementsByClassName('tile') 
    Array.from(currentTiles).forEach(tile => {
        tile.parentNode.removeChild(tile);
    });

    createTiles(gridHeight, newSquareWidth)
});
gridSizePicker.addEventListener('input', e => {
    let newSize = e.target.value
    currentGridSizeText.textContent = `${newSize}x${newSize}`
});

const penColorPicker = document.getElementById('pen-color-picker')
penColorPicker.addEventListener('change', e => {
    const newPenColor = e.target.value
    penColor = newPenColor
})


createTiles(gridHeight, newSquareWidth)


function createTiles(gridHeight, squareWidth) {
    while (gridHeight > 0) {
        let newSquare = document.createElement('div');
        newSquare.style.width = `${squareWidth}px`;
        newSquare.style.height = `${squareWidth}px`;
        newSquare.style.border = tileBorderCheck.checked && '1px solid black';
        newSquare.classList.add('tile')
    
        newSquare.addEventListener('mouseover', (e) => {
            if (e.buttons) {
                newSquare.style.backgroundColor = penColor;
            }
        });
    
        newSquare.addEventListener('mousedown', () => {
            newSquare.style.backgroundColor = penColor;
        });
    
        gridEl.appendChild(newSquare);
    
        gridHeight--;
    };
};