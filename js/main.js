const MAIN_GRID_WIDTH = 650;

const BLACK = '#000000';
const WHITE = '#ffffff';
const GREENYELLOW = '#adff2f';
const RED = '#ff0000';
const LIGHTGREEN = '#90ee90';
const LIGHTGREY_RGB = 'rgb(230, 230, 230)';
const DARKGEY_RGB = 'rgb(100, 100, 100)';


let gridHeight = 16;
let newSquareWidth = MAIN_GRID_WIDTH / gridHeight;  
gridHeight *= gridHeight;

const gridEl = document.getElementById('main-grid');
gridEl.style.width = `${MAIN_GRID_WIDTH+1}px`;
gridEl.style.height = `${MAIN_GRID_WIDTH}px`;

const settingsPanelEl = document.getElementById('settings-panel');
settingsPanelEl.style.height = `${MAIN_GRID_WIDTH}px`;
settingsPanelEl.style.width = `${MAIN_GRID_WIDTH/3}px`;

let penColor = BLACK;
let bgColor = WHITE;
let isErasing = false;
let isGrabbingColor = false;
let randomColorMode = false;
let isShading = false;
let isLightening = false;

let tiles;
const tileBorderCheck = document.getElementById('toggle-tile-border');
tileBorderCheck.addEventListener('change', e => {
    if (!tiles) {
        tiles = document.getElementsByClassName('tile'); 
    };

    let check = e.target.checked;

    Array.from(tiles).forEach(tile => {
        tile.style.border = check ? `1px solid ${BLACK}` : '';
    });
});

const gridSizePicker = document.getElementById('grid-size-range');
const currentGridSizeText = document.getElementById('cur-grid-size');
gridSizePicker.addEventListener('change', e => {
    let newGridHeight = e.target.value;

    newSquareWidth = MAIN_GRID_WIDTH / newGridHeight;
    gridHeight = newGridHeight ** 2;

    const currentTiles = document.getElementsByClassName('tile');
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
    const newBgColor = e.target.value;
    bgColor = newBgColor;
    
    const clearGridBtn = document.getElementById('clear-grid-btn');
    
    const colorRatio = calculateColorRatio(bgColor, clearGridBtn.style.color);

    if (colorRatio >= 0.22) { // it's at a bad level
        clearGridBtn.style.color = clearGridBtn.style.color === 'rgb(0, 0, 0)' ? WHITE : BLACK;
    };

    clearGridBtn.style.backgroundColor = bgColor;

    const currentTiles = document.getElementsByClassName('tile') ;
    Array.from(currentTiles).forEach(tile => {
        tile.style.backgroundColor = newBgColor;
    });
});

const eraserBtn = document.getElementById('eraser-btn');
eraserBtn.addEventListener('click', () => {
    isErasing = !isErasing;

    if (isErasing) {
        eraserBtn.style.backgroundColor = LIGHTGREEN;
        eraserBtn.style.color = BLACK;
    } else {
        eraserBtn.style.backgroundColor = RED;
        eraserBtn.style.color = WHITE;
        
    };
});

const colorGrabberBtn = document.getElementById('color-grabber-btn');
colorGrabberBtn.addEventListener('click', () => {
    isGrabbingColor = !isGrabbingColor;

    if (isGrabbingColor) {
        colorGrabberBtn.style.backgroundColor = LIGHTGREEN;
        colorGrabberBtn.style.color = BLACK;
    } else {
        colorGrabberBtn.style.backgroundColor = RED;
        colorGrabberBtn.style.color = WHITE;
    };
});

const clearGridBtn = document.getElementById('clear-grid-btn');
clearGridBtn.addEventListener('click', () => {
    const currentTiles = document.getElementsByClassName('tile');
    Array.from(currentTiles).forEach(tile => {
        tile.style.backgroundColor = bgColor;
    });
});

const randomModeBtn = document.getElementById('random-mode-btn');
randomModeBtn.addEventListener('click', () => {
    isShading = false; shadeBtn.style.backgroundColor = DARKGEY_RGB;
    isLightening = false; lightenBtn.style.backgroundColor = LIGHTGREY_RGB;

    randomColorMode = !randomColorMode;

    if (randomColorMode) {
        randomModeBtn.style.background = "linear-gradient(90deg, rgba(255,0,0,1) 0%, rgba(255,154,0,1) 10%, rgba(208,222,33,1) 20%,\
                                                                 rgba(79,220,74,1) 30%, rgba(63,218,216,1) 40%, rgba(47,201,226,1) 50%,\
                                                                 rgba(28,127,238,1) 60%, rgba(95,21,242,1) 70%, rgba(186,12,248,1) 80%,\
                                                                 rgba(251,7,217,1) 90%, rgba(255,0,0,1) 100%)";
        randomModeBtn.style.color = WHITE;
    } else {
        randomModeBtn.style.background = WHITE;
        randomModeBtn.style.color = BLACK;
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
        shadeBtn.style.backgroundColor = DARKGEY_RGB;
    };

    lightenBtn.style.backgroundColor = LIGHTGREY_RGB;
});

lightenBtn.addEventListener('click', () => {
    isLightening = !isLightening;
    isShading = false;

    if (isLightening) {
        lightenBtn.style.backgroundColor = 'rgb(255, 255, 255)';
    } else {
        lightenBtn.style.backgroundColor = LIGHTGREY_RGB;
    };

    shadeBtn.style.backgroundColor = DARKGEY_RGB;
});

createTiles(gridHeight, newSquareWidth);


function createTiles(gridHeight, squareWidth) {
    while (gridHeight > 0) {
        let newSquare = document.createElement('div');
        newSquare.style.width = `${squareWidth}px`;
        newSquare.style.height = `${squareWidth}px`;
        newSquare.style.border = tileBorderCheck.checked && `1px solid ${BLACK}`;
        newSquare.style.backgroundColor = bgColor;
        newSquare.classList.add('tile');
    
        newSquare.addEventListener('mouseover', (e) => {
            if (e.buttons && !isGrabbingColor) {
                if (isShading) {
                    shadeSquare(newSquare);
                } else if (isLightening) {
                    lightenSquare(newSquare);
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
                    lightenSquare(newSquare);
                } else {
                    newSquare.style.backgroundColor = isErasing ? bgColor : randomColorMode ? getRandomHexColor() : penColor;
                };
            };
        });

        newSquare.addEventListener('click', () => {
            if (isGrabbingColor) {
                penColor = newSquare.style.backgroundColor;

                let { r, g, b } = extractRgb(penColor);

                penColorPicker.value = rgbToHex(+r, +g, +b);
                isGrabbingColor = false;
                colorGrabberBtn.style.backgroundColor = RED;
                colorGrabberBtn.style.color = WHITE;
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
    const currentColor = squareNode.style.backgroundColor;

    let { r, g, b } = extractRgb(currentColor);
    r -= 10; g -= 10; b -= 10;

    squareNode.style.backgroundColor = `rgb(${r > 0 ? r : 0}, ${g > 0 ? g : 0}, ${b > 0 ? b : 0})`;
};

function lightenSquare(squareNode) {
    const currentColor = squareNode.style.backgroundColor;

    let { r, g, b } = extractRgb(currentColor);
    r += 10; g += 10; b += 10;

    squareNode.style.backgroundColor = `rgb(${r < 255 ? r : 255}, ${g < 255 ? g : 255}, ${b < 255 ? b : 255})`;
};

function hexToRgb(hex) {
    var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, function(m, r, g, b) {
      return r + r + g + g + b + b;
    });
  
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
};

function getColorLuminance(r, g, b) {
    var a = [r, g, b].map(function (v) {
        v /= 255;
        return v <= 0.03928
            ? v / 12.92
            : Math.pow( (v + 0.055) / 1.055, 2.4 );
    });
    return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
};

function getColorRatio(c1Luminance, c2Luminance) {
    const ratio = c1Luminance > c2Luminance 
    ? ((c2Luminance + 0.05) / (c1Luminance + 0.05))
    : ((c1Luminance + 0.05) / (c2Luminance + 0.05));

    return ratio;
};

function extractRgb(rgbStr) {
    if (!rgbStr || rgbStr.slice(0, 3) !== 'rgb') {
        return rgbStr;
    };

    let x = rgbStr.split(' ');
    let r = +x[0].slice(4, x[0].length - 1) || 0;
    let g = +x[1].slice(0, x[1].length - 1) || 0;
    let b = +x[2].slice(0, x[2].length - 1) || 0;

    return { r: r, g: g, b: b };
};

function calculateColorRatio(c1, c2) {
    const c1Rgb = c1.slice(0, 3) === 'rgb' ? extractRgb(c1) : hexToRgb(c1 || BLACK);
    const c2Rgb = c2.slice(0, 3) === 'rgb' ? extractRgb(c2) : hexToRgb(c2 || BLACK);

    const c1Luminance = getColorLuminance(c1Rgb.r, c1Rgb.g, c1Rgb.b);
    const c2Luminance = getColorLuminance(c2Rgb.r, c2Rgb.g, c2Rgb.b);

    const colorRatio = getColorRatio(c1Luminance, c2Luminance);

    return colorRatio;
};
