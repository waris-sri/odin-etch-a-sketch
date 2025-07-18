const container = document.querySelector("#container");
let containerSize = 400; // default size

// responsive grid
function updateContainerSize() {
  const screenWidth = window.innerWidth;
  if (screenWidth <= 320) {
    containerSize = 200;
  } else if (screenWidth <= 375) {
    containerSize = 250;
  } else if (screenWidth <= 425) {
    containerSize = 300;
  } else {
    containerSize = 400;
  }
  document.querySelector("#container").style.width = `${containerSize}px`;
  document.querySelector("#container").style.height = `${containerSize}px`;
  document.querySelector("fieldset").style.width = `${containerSize}px`;
  document.querySelector("#generate").style.width = `${containerSize}px`;
  if (container.children.length > 0) {
    const currentGridSize = Math.sqrt(container.children.length);
    drawGrid(currentGridSize);
  }
}
window.addEventListener("resize", updateContainerSize);

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
    /* for mouse/desktops */
    // these events are scoped to the grid
    square.addEventListener("mousedown", (e) => {
      e.preventDefault(); // prevent text selection
      isDrawing = true;
      colorSquare(e.target);
    });
    square.addEventListener("mouseenter", (e) => {
      if (isDrawing) colorSquare(e.target);
    });
    /* for touchscreens */
    square.addEventListener("touchstart", (e) => {
      e.preventDefault(); // prevent selection
      isDrawing = true;
      colorSquare(e.target);
    });
  }
}

/*
declare these events at global scope because the area where the user can tap/click is basically
the whole page, and those in the grid scope are because you can only start drawing within the grid
*/

/* for mouse/desktop */
// add global event to stop drawing
document.addEventListener("mouseup", () => {
  isDrawing = false;
});
container.addEventListener("contextmenu", (e) => {
  e.preventDefault(); // prevent showing menu on right click
});
/* for touchscreens */
document.addEventListener("touchmove", (e) => {
  if (isDrawing) {
    const element = document.elementFromPoint(
      e.touches[0].clientX, // first touchpoint in `touches` array
      e.touches[0].clientY
    );
    // also check whether the element is inside the container and not null/undefined,
    // e.g., when touchpoint is outside browser window
    if (element && element.parentElement === container) colorSquare(element);
  }
});
document.addEventListener("touchend", () => {
  isDrawing = false;
  generate.innerText = "Generate";
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
