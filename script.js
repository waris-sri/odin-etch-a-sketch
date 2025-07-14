const container = document.querySelector("#container");
const containerSize = 500;
container.style.width = container.style.height = `${containerSize}px`;
const gridSquareNum = 16; // will be replaced with the value from HTML
const squareSize = containerSize / gridSquareNum;

// nested loops not needed since flex-wrap already makes it into a square
for (let i = 0; i < gridSquareNum * gridSquareNum; i++) {
  const square = document.createElement("div");
  square.style.width = square.style.height = `${squareSize}px`;
  container.appendChild(square);
}
