let svgList = [];
let grid = [];
const gridSize = 32;
const svgWidth = 32;
const svgHeight = 32;
let selectedSVG = 1;
let input;

function preload() {
  // Load 2 SVG files from the GitHub repository
  for (let i = 0; i < 3; i++) {
    // Replace 'username/repo' and 'path/to/svg' with your GitHub repository's information
    let githubRawURL = `https://raw.githubusercontent.com/smartyno/Terraforms/main/symbols/s${i + 1}.svg`;
    svgList[i] = loadImage(githubRawURL);
  }
}

function setup() {
  createCanvas(gridSize * svgWidth, gridSize * svgHeight);

  // Generate grid and populate with random SVGs
  for (let x = 0; x < gridSize; x++) {
    grid[x] = [];
    for (let y = 0; y < gridSize; y++) {
      grid[x][y] = floor(random(1, 4)); // Assign random numerical IDs (1 or 2)
    }
  }

  // Create an input field for numeric input
  input = createInput();
  input.position(10, height + 10);
  input.attribute('placeholder', 'Enter SVG ID (1-3)');
  input.input(handleInput);
}

function draw() {
  background(255);

  // Display the grid with SVGs
  for (let x = 0; x < gridSize; x++) {
    for (let y = 0; y < gridSize; y++) {
      let svgID = grid[x][y];
      image(svgList[svgID - 1], x * svgWidth, y * svgHeight, svgWidth, svgHeight);
    }
  }
}

function mouseClicked() {
  // Change SVG at the clicked coordinates
  let x = floor(mouseX / svgWidth);
  let y = floor(mouseY / svgHeight);

  // Assign a new numerical ID to the clicked coordinate
  grid[x][y] = selectedSVG;

  // Update the grid
  redraw();
}

// Handle numeric input from the user
function handleInput() {
  let newValue = input.value();
  if (!isNaN(newValue) && (newValue >= 1 && newValue <= 3)) {
    selectedSVG = int(newValue);
    console.log(`Selected SVG: ${selectedSVG}`);
  } else {
    console.error("Invalid input. Enter a numeric value between 1 and 5.");
  }
}
