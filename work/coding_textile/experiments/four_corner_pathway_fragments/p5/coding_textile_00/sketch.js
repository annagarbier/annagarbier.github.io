/* Moving in a clockwise direction, connect each corner
 * of a square to a random point on an opposing edge.
 * 
 * Basic configuration
 *  canvasWidth: width of canvas in pixels
 *  canvasHeight: height of canvas in pixels
 *  numColumns: number of blocks drawn on each row
 *  rotateAngle: rotate the squares by a degree
 *  framesPerSecond: number of lines drawn per second
 *  squareStrokeColor: color of square (0 for black; 255 for white)
 *  connectorStrokeColor: color of connectors (0 for black; 255 for white)
 *  backgroundColor: color of background (0 for black; 255 for white)
 *  
 * Anna Garbier
 * 2018-10-30
 */

// Basic anvas and program configuration
const canvasWidth = 750;
const canvasHeight = 500;
const numCols = 5;

const rotateAngle = 45;
const framesPerSecond = 5;

const squareStrokeColor = 0;
const connectorStrokeColor = 0;
const backgroundColor = 255;

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
	createCanvas(canvasWidth, canvasHeight);
	background(backgroundColor);
	noFill();
	angleMode(DEGREES);
	rectMode(CENTER);
	ellipseMode(CENTER);
	frameRate(framesPerSecond);

	squareWidth = squareDiagonal / sqrt(2);
	squareWidthHalved = squareWidth / 2;
	squareDiagonalHalved = squareDiagonal / 2;
	numRows = Math.floor(canvasHeight / squareDiagonal);
}

function draw() {
	if (rowCounter < numRows) {
		drawRow();
	} else {
		console.log("Program complete.");
	}
}

function drawLine(startX, startY) {
	// Pick a random number, 1 or 0. This is used later
	// to randomly pick one of two sides to "attach to".
	let sideSelector = Math.round(random(0, 1));

	// Pick a random point on one of the two opposed
	// edges from (startX, startY). .8 means we never
	// connect to a point that is too close to another point
	if (sideSelector == 1) {
		endX = -1 * startX;
		endY = .8 * random(-squareWidthHalved, squareWidthHalved);
	} else {
		endX = .8 * random(-squareWidthHalved, squareWidthHalved);
		endY = -1 * startY;
	}

	// Connect the corner at (startX, startY) to a random
	// point on one of two opposite edges
	line(startX, startY, endX, endY);
}

// Draw a box, with four internal "connectors", each of which
// connects a corner to a random point on an opposing edge
function drawBlock() {
	console.log("Row " + rowCounter +
				", Column " + colCounter +
				", Corner "+ cornerCounter);
	if (cornerCounter == 0) {
		stroke(squareStrokeColor);
		rect(0, 0, squareWidth, squareWidth);
		stroke(connectorStrokeColor);
		cornerCounter++;
	}
	else if (cornerCounter == 1) {
		drawLine(-1 * squareWidthHalved, -1 * squareWidthHalved);
		cornerCounter++;
	} else if (cornerCounter == 2) {
		drawLine(squareWidthHalved, -1 * squareWidthHalved);
		cornerCounter++;
	} else if (cornerCounter == 3) {
		drawLine(squareWidthHalved, squareWidthHalved);
		cornerCounter++;
	} else if (cornerCounter == 4) {
		drawLine(-1 * squareWidthHalved, squareWidthHalved);
		// Move on to the next column
		colCounter++;
		// Add a spacer in console output for readability
		console.log(""); 
		// Reset the corner counter to queue up a new block
		cornerCounter = 0;
	}
}

// Draw a row of blocks
function drawRow() {
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
