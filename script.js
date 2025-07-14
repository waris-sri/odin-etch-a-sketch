const container = document.querySelector("#container");
const containerSize = 400;
container.style.width = container.style.height = `${containerSize}px`;
const gridSquareNum = 64; // will be replaced with the value from HTML
const squareSize = containerSize / gridSquareNum;
const square = document.createElement("div");

// nested loops not needed since flex-wrap already makes it into a square
for (let i = 0; i < gridSquareNum * gridSquareNum; i++) {
  const squareGrid = square.cloneNode(true);
  squareGrid.style.width = squareGrid.style.height = `${squareSize}px`;
  container.appendChild(squareGrid);
  squareGrid.addEventListener("mousemove", (e) => {
    e.target.style.backgroundColor = "red"; // will be replaced with the value from HTML
  });
}
