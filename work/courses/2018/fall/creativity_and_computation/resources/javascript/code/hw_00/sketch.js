/* Playing with JavaScript using p5
 * Creativity and Computation HW
 *
 * Anna Garbier
 * 2018-10-30
 */

// Basic canvas and program configuration
const canvasWidth = 750;
const canvasHeight =450;
let numCols = 20;

const framesPerSecond = 5;
let rotateAngle = 0;

const squareStrokeColor = 0;
const connectorStrokeColor = 0;
const backgroundColor = 255; 
let fillColorSlider;
let fillColor = 0;

// Size of square is determined by canvas size
// and the number of columns
const squareDiagonal = canvasWidth / numCols;
let squareWidth;
let squareWidthHalved;
let squareDiagonalHalved;

// Variables used to navigate the space of
// the canvas throughout draw
let rowStartX;
let rowStartY;
let cornerCounter = 0;
let colCounter = 0;
let rowCounter = 0;

function setup() {
	console.log("Start setup");

	var canvas = createCanvas(canvasWidth, canvasHeight);
	canvas.parent('sketch-holder');
	background(backgroundColor);
	noStroke();
	angleMode(DEGREES);
	rectMode(CENTER);
	ellipseMode(CENTER);
	frameRate(framesPerSecond);

	squareWidth = squareDiagonal / sqrt(2);
	squareWidthHalved = squareWidth / 2;
	squareDiagonalHalved = squareDiagonal / 2;
	numRows = Math.floor(canvasHeight / squareDiagonal);

	// Make some sliders to control the drawing
	createP("Color slider (dark to light)");
	fillColorSlider = createSlider(10, 245, 0);
	createP("Tilt slider (0 deg. to 90 deg.)");
	tiltSlider = createSlider(0, 90, 0);
	createP("Frame Rate slider (1 to 50 frames per sec.)");
	frameRateSlider = createSlider(1, 50, 10);
	console.log("End setup");
}

function draw() {
	console.log("Running draw...");
	if (rowCounter < numRows) {
		drawRow();
	}
}

function drawBlock() {
	console.log("Running drawBlock...");
	console.log("Row " + rowCounter +
				", Column " + colCounter +
				", Color "+ fillColorSlider.value() +
				", Frame Rate " + frameRateSlider.value());
	rotate(tiltSlider.value());
	fill(fillColorSlider.value());
	frameRate(frameRateSlider.value());
	rect(0, 0, squareWidth, squareWidth);
	colCounter++;
}

// Draw a row of blocks
function drawRow() {
	console.log("running drawRow...");
	if (colCounter <= numCols) {
		rowStartX = squareDiagonalHalved;
		rowStartY = squareDiagonalHalved +
					(squareDiagonal * rowCounter);

		translateStepX = sqrt(sq(squareWidth) + sq(squareWidth));
		translateStepY = translateStepX / 2;
		x = rowStartX + (translateStepX * colCounter);
		y = rowStartY;
		translate(x, y);
		rotate(rotateAngle);
		drawBlock();
	} else {
		// Move to the next row, and reset the column counter
		rowCounter++;
		colCounter = 0;
	}
}

function restartSketch() {
    location.reload();
}
