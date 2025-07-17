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
function drawGrid(n) {
  container.innerHTML = ""; // reset
  squareSize = containerSize / n;
  for (let i = 0; i < n * n; i++) {
    square = document.createElement("div");
    square.style.width = square.style.height = `${squareSize}px`;
    container.append(square);
    square.addEventListener("mouseenter", (e) => {
      if (rainbowMode.checked) {
        e.target.style.backgroundColor = `rgb(
            ${Math.floor(Math.random() * 256)},
            ${Math.floor(Math.random() * 256)},
            ${Math.floor(Math.random() * 256)}
            )`;
      } else {
        e.target.style.backgroundColor = colorSelector.value;
      }
    });
  }
}

function validate() {
  const size = parseInt(gridSizeInput.value);
  if (isNaN(size) || size < 2 || size > 100) {
    alert("Enter a number from 2 to 100");
    return null;
  }
  return size;
}

generate.addEventListener("click", () => {
  const size = validate();
  if (size !== null) drawGrid(size);
});

gridSizeInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    const size = validate();
    if (size !== null) drawGrid(size);
  }
});

window.addEventListener("DOMContentLoaded", () => {
  defaultMode.checked = true;
  gridSizeInput.value = 16;
  drawGrid(16);
});
