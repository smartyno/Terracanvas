let svgList = [];
let grid = [];
const gridSize = 32;
const svgWidth = 16;
const svgHeight = 16;
let selectedSVG = 1;
let input;
let fillInput, strokeInput, backgroundInput; // Input fields for color parameters

// Define three different color palettes (fill, stroke, background)
const colorPalettes = [
  {
    fill: '#FF5733',    // Fill color (Palette 1)
    stroke: '#0066FF',  // Stroke color (Palette 1)
    background: '#FFFFCC' // Background color (Palette 1)
  },
  {
    fill: '#00FF66',    // Fill color (Palette 2)
    stroke: '#FF3333',  // Stroke color (Palette 2)
    background: '#66CCFF' // Background color (Palette 2)
  },
  {
    fill: '#FFCC00',    // Fill color (Palette 3)
    stroke: '#6600FF',  // Stroke color (Palette 3)
    background: '#CCFFFF' // Background color (Palette 3)
  }
];

function preload() {
  // Load 3 SVG files from the GitHub repository
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
      grid[x][y] = floor(random(1, 4)); // Assign random numerical IDs (1 to 3)
    }
  }

  // Create input fields for numeric input and color parameters
  input = createInput();
  input.position(10, height + 10);
  input.attribute('placeholder', 'Enter SVG ID (1-3)');
  input.input(handleInput);

  fillInput = createInput(colorPalettes[selectedSVG - 1].fill);
  fillInput.position(10, height + 40);
  fillInput.attribute('placeholder', 'Fill Color');
  fillInput.input(updateFillColor);

  strokeInput = createInput(colorPalettes[selectedSVG - 1].stroke);
  strokeInput.position(10, height + 70);
  strokeInput.attribute('placeholder', 'Stroke Color');
  strokeInput.input(updateStrokeColor);

  backgroundInput = createInput(colorPalettes[selectedSVG - 1].background);
  backgroundInput.position(10, height + 100);
  backgroundInput.attribute('placeholder', 'Background Color');
  backgroundInput.input(updateBackgroundColor);
}

function draw() {
  background(255);

  // Display the grid with SVGs
  for (let x = 0; x < gridSize; x++) {
    for (let y = 0; y < gridSize; y++) {
      let svgID = grid[x][y];

      // Apply the selected color palette to the SVG
      let paletteIndex = (svgID - 1) % colorPalettes.length;
      let palette = colorPalettes[paletteIndex];

      push();
      fill(palette.fill);
      stroke(palette.stroke);
      strokeWeight(2);
      rect(x * svgWidth, y * svgHeight, svgWidth, svgHeight);
      image(svgList[svgID - 1], x * svgWidth, y * svgHeight, svgWidth, svgHeight);
      pop();
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
    console.error("Invalid input. Enter a numeric value between 1 and 3.");
  }
}

// Update fill color based on user input
function updateFillColor() {
  colorPalettes[selectedSVG - 1].fill = fillInput.value();
  redraw();
}

// Update stroke color based on user input
function updateStrokeColor() {
  colorPalettes[selectedSVG - 1].stroke = strokeInput.value();
  redraw();
}

// Update background color based on user input
function updateBackgroundColor() {
  colorPalettes[selectedSVG - 1].background = backgroundInput.value();
  redraw();
}
