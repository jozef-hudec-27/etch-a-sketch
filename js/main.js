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

let penColor = '#000000';
let bgColor = '#ffffff';
let isErasing = false;
let isGrabbingColor = false;
let randomColorMode = false;
let isShading = false;
let isLightening = false;

let tiles;
const tileBorderCheck = document.getElementById('toggle-tile-border')
tileBorderCheck.addEventListener('change', e => {
    if (!tiles) {
        tiles = document.getElementsByClassName('tile'); 
    };

    let check = e.target.checked

    Array.from(tiles).forEach(tile => {
        tile.style.border = check ? '1px solid #000000' : ''
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
        eraserBtn.style.color = '#000000'
    } else {
        eraserBtn.style.backgroundColor = 'red'
        eraserBtn.style.color = '#ffffff'
        
    };
});

const colorGrabberBtn = document.getElementById('color-grabber-btn');
colorGrabberBtn.addEventListener('click', () => {
    isGrabbingColor = !isGrabbingColor

    if (isGrabbingColor) {
        colorGrabberBtn.style.backgroundColor = 'lightgreen'
        colorGrabberBtn.style.color = '#000000'
    } else {
        colorGrabberBtn.style.backgroundColor = 'red'
        colorGrabberBtn.style.color = '#ffffff'
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
    isShading = false; shadeBtn.style.backgroundColor = 'rgb(100, 100, 100)';
    isLightening = false; lightenBtn.style.backgroundColor = 'rgb(230, 230, 230)';

    randomColorMode = !randomColorMode;

    if (randomColorMode) {
        randomModeBtn.style.background = "linear-gradient(90deg, rgba(255,0,0,1) 0%, rgba(255,154,0,1) 10%, rgba(208,222,33,1) 20%,\
                                                                 rgba(79,220,74,1) 30%, rgba(63,218,216,1) 40%, rgba(47,201,226,1) 50%,\
                                                                 rgba(28,127,238,1) 60%, rgba(95,21,242,1) 70%, rgba(186,12,248,1) 80%,\
                                                                 rgba(251,7,217,1) 90%, rgba(255,0,0,1) 100%)";
    } else {
        randomModeBtn.style.background = '#ffffff';
    };
});

const shadeBtn = document.querySelector('.shade');
const lightenBtn = document.querySelector('.lighten');

shadeBtn.addEventListener('click', () => {
    isShading = !isShading;
    isLightening = false;

    if (isShading) {
        shadeBtn.style.backgroundColor = 'rgb(0, 0, 0)';
    } else {
        shadeBtn.style.backgroundColor = 'rgb(100, 100, 100)';
    };

    lightenBtn.style.backgroundColor = 'rgb(230, 230, 230)';
});

lightenBtn.addEventListener('click', () => {
    isLightening = !isLightening;
    isShading = false;

    if (isLightening) {
        lightenBtn.style.backgroundColor = 'rgb(255, 255, 255)'
    } else {
        lightenBtn.style.backgroundColor = 'rgb(230, 230, 230)';
    };

    shadeBtn.style.backgroundColor = 'rgb(100, 100, 100)';
});

createTiles(gridHeight, newSquareWidth);


function createTiles(gridHeight, squareWidth) {
    while (gridHeight > 0) {
        let newSquare = document.createElement('div');
        newSquare.style.width = `${squareWidth}px`;
        newSquare.style.height = `${squareWidth}px`;
        newSquare.style.border = tileBorderCheck.checked && '1px solid #000000';
        newSquare.style.backgroundColor = bgColor
        newSquare.classList.add('tile')
    
        newSquare.addEventListener('mouseover', (e) => {
            if (e.buttons && !isGrabbingColor) {
                if (isShading) {
                    shadeSquare(newSquare);
                } else if (isLightening) {
                    lightenSquare(newSquare)
                } else {
                    newSquare.style.backgroundColor = isErasing ? bgColor : randomColorMode ? getRandomHexColor() : penColor;
                };
            };
        });
    
        newSquare.addEventListener('mousedown', () => {
            if (!isGrabbingColor) {
                if (isShading) {
                    shadeSquare(newSquare);
                } else if (isLightening) {
                    lightenSquare(newSquare)
                } else {
                    newSquare.style.backgroundColor = isErasing ? bgColor : randomColorMode ? getRandomHexColor() : penColor;
                };
            }
        });

        newSquare.addEventListener('click', () => {
            console.dir(newSquare)

            if (isGrabbingColor) {
                penColor = newSquare.style.backgroundColor;

                let x = penColor.split(' ')
                let r = x[0].slice(4, x[0].length - 1);
                let g = x[1].slice(0, x[1].length - 1);
                let b = x[2].slice(0, x[2].length - 1);

                penColorPicker.value = rgbToHex(+r, +g, +b);
                isGrabbingColor = false;
                colorGrabberBtn.style.backgroundColor = 'red'
                colorGrabberBtn.style.color = '#ffffff'
            };
        });
    
        gridEl.appendChild(newSquare);
    
        gridHeight--;
    };
};

function getRandomHexColor() {
    return '#' + Math.floor(Math.random()*16777215).toString(16);
};

function componentToHex(c) {
    let hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
};

function rgbToHex(r, g, b) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
};

function shadeSquare(squareNode) {
    const currentColor = squareNode.style.backgroundColor

    let x = currentColor.split(' ')
    let r = +x[0].slice(4, x[0].length - 1) - 10 || 0;
    let g = +x[1].slice(0, x[1].length - 1) - 10 || 0;
    let b = +x[2].slice(0, x[2].length - 1) - 10 || 0;

    squareNode.style.backgroundColor = `rgb(${r > 0 ? r : 0}, ${g > 0 ? g : 0}, ${b > 0 ? b : 0})`
};

function lightenSquare(squareNode) {
    const currentColor = squareNode.style.backgroundColor

    let x = currentColor.split(' ')
    let r = +x[0].slice(4, x[0].length - 1) + 10 ;
    let g = +x[1].slice(0, x[1].length - 1) + 10;
    let b = +x[2].slice(0, x[2].length - 1) + 10;

    squareNode.style.backgroundColor = `rgb(${r < 255 ? r : 255}, ${g < 255 ? g : 255}, ${b < 255 ? b : 255})`
};