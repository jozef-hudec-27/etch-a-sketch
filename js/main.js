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
let bgColor = 'white';
let isErasing = false;
let randomColorMode = false;

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

    createTiles(gridHeight, newSquareWidth);
});
gridSizePicker.addEventListener('input', e => {
    let newSize = e.target.value;
    currentGridSizeText.textContent = `${newSize}x${newSize}`;
});

const penColorPicker = document.getElementById('pen-color-picker');
penColorPicker.addEventListener('change', e => {
    const newPenColor = e.target.value;
    penColor = newPenColor;
});

const bgColorPicker = document.getElementById('bg-color-picker');
bgColorPicker.addEventListener('input', e => {
    const newBgColor = e.target.value
    bgColor = newBgColor

    document.getElementById('clear-grid-btn').style.backgroundColor = bgColor

    const currentTiles = document.getElementsByClassName('tile') ;
    Array.from(currentTiles).forEach(tile => {
        tile.style.backgroundColor = newBgColor;
    });
});

const eraserBtn = document.getElementById('eraser-btn');
eraserBtn.addEventListener('click', () => {
    isErasing = !isErasing;

    if (isErasing) {
        eraserBtn.style.backgroundColor = 'lightgreen'
        eraserBtn.style.color = 'black'
    } else {
        eraserBtn.style.backgroundColor = 'red'
        eraserBtn.style.color = 'white'
        
    };
});

const clearGridBtn = document.getElementById('clear-grid-btn');
clearGridBtn.addEventListener('click', () => {
    const currentTiles = document.getElementsByClassName('tile') ;
    Array.from(currentTiles).forEach(tile => {
        tile.style.backgroundColor = bgColor;
    });
});

const randomModeBtn = document.getElementById('random-mode-btn')
randomModeBtn.addEventListener('click', () => {
    randomColorMode = !randomColorMode;

    if (randomColorMode) {
        randomModeBtn.style.background = "linear-gradient(90deg, rgba(255,0,0,1) 0%, rgba(255,154,0,1) 10%, rgba(208,222,33,1) 20%,\
                                                                 rgba(79,220,74,1) 30%, rgba(63,218,216,1) 40%, rgba(47,201,226,1) 50%,\
                                                                 rgba(28,127,238,1) 60%, rgba(95,21,242,1) 70%, rgba(186,12,248,1) 80%,\
                                                                 rgba(251,7,217,1) 90%, rgba(255,0,0,1) 100%)"
    } else {
        randomModeBtn.style.background = 'white'
    };
});


createTiles(gridHeight, newSquareWidth);


function createTiles(gridHeight, squareWidth) {
    while (gridHeight > 0) {
        let newSquare = document.createElement('div');
        newSquare.style.width = `${squareWidth}px`;
        newSquare.style.height = `${squareWidth}px`;
        newSquare.style.border = tileBorderCheck.checked && '1px solid black';
        newSquare.style.backgroundColor = bgColor
        newSquare.classList.add('tile')
    
        newSquare.addEventListener('mouseover', (e) => {
            if (e.buttons) {
                newSquare.style.backgroundColor = isErasing ? bgColor : randomColorMode ? getRandomHexColor() : penColor;
            }
        });
    
        newSquare.addEventListener('mousedown', () => {
            newSquare.style.backgroundColor = isErasing ? bgColor : randomColorMode ? getRandomHexColor() : penColor;
        });
    
        gridEl.appendChild(newSquare);
    
        gridHeight--;
    };
};

function getRandomHexColor() {
    return '#' + Math.floor(Math.random()*16777215).toString(16);
};