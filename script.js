const container = document.querySelector("#container");
const containerSize = 400;
container.style.width = container.style.height = `${containerSize}px`;

const gridSizeInput = document.querySelector("#grid-square-num");
const generate = document.querySelector("#generate");
const colorSelector = document.querySelector("#color-selector");
const rainbowMode = document.querySelector("#rainbow");
const shadeMode = document.querySelector("#shade");
const defaultMode = document.querySelector("#default");

let squareSize;
let square;
let isDrawing = false;

function colorSquare(square) {
  if (rainbowMode.checked) {
    square.style.backgroundColor = `rgb(
        ${Math.floor(Math.random() * 256)},
        ${Math.floor(Math.random() * 256)},
        ${Math.floor(Math.random() * 256)}
        )`;
  } else {
    square.style.backgroundColor = colorSelector.value;
  }
}

function drawGrid(n) {
  container.innerHTML = ""; // reset
  squareSize = containerSize / n;
  for (let i = 0; i < n * n; i++) {
    square = document.createElement("div");
    square.style.width = square.style.height = `${squareSize}px`;
    container.append(square);

    // add mousedown event to each square
    square.addEventListener("mousedown", (e) => {
      e.preventDefault(); // prevent text selection
      isDrawing = true;
      colorSquare(e.target);
    });

    // add mouseenter event to each square for drawing while dragging
    square.addEventListener("mouseenter", (e) => {
      if (isDrawing) colorSquare(e.target);
    });
  }
}

// add global mouseup event to stop drawing
document.addEventListener("mouseup", () => {
  isDrawing = false;
});

// prevent context menu appearance on right click
container.addEventListener("contextmenu", (e) => {
  e.preventDefault();
});

function validateInput() {
  const size = parseInt(gridSizeInput.value);
  if (isNaN(size) || size < 2 || size > 100) {
    alert("Enter a positive integer from 2 to 100.");
    return null;
  }
  return size;
}

generate.addEventListener("click", () => {
  const size = validateInput();
  if (size !== null) drawGrid(size);
});

gridSizeInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    const size = validateInput();
    if (size !== null) drawGrid(size);
  }
});

window.addEventListener("DOMContentLoaded", () => {
  defaultMode.checked = true;
  gridSizeInput.value = 16;
  drawGrid(16);
});
