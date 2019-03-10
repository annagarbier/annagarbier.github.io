// require https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.5.14/p5.js
// require https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.5.14/addons/p5.dom.js

// Get user input in the form of a natural language string.
// Attempt to parse it, and translate it into a simple drawing on
// the screen. Note that this is a 90-minute prototype. While it has
// several easy-to-discover limitations, it does the basics
// well enough to prove that the interaction
// (i.e. lanuage input -> inmmediate image output) is engaging. 

// Canvas specs
const canvas = {
    width: 800,
    height: 750
};

// Visually defines the frame of the drawing; sits within canvas
// TODO: get rid of the hardcoded positioning throughout.
const drawSpace = {
    width: canvas.width - 20,
    height: canvas.height - 300,
    pos: {
        x: 10,
        y: 10
    }
}

// The user input and instructions space.
const requestSpace = {
    width: canvas.width - 20,
    height: 250,
    pos: {
        x: 50,
        y: drawSpace.pos.y + drawSpace.height + 30
    }
}

// Initialize Shape object with default settings.
let defaultStroke = "gray";
let defaultSize = 100;
let defaultPos = {
    x: drawSpace.pos.x + (.5 * drawSpace.width),
    y: drawSpace.pos.y + (.5 * drawSpace.height)
}
let request;

// keyword lists
const colors = [
    /red/,
    /orange/,
    /yellow/,
    /green/,
    /blue/,
    /indigo/,
    /violet/,
    /purple/,
    /pink/,
    /black/,
    /brown/,
    /teal/,
    /maroon/,
    /white/,
    /gray|grey/
];

const sizes = [
    /gigantic|huu+ge/,
    /huge/, 
    /big/,
    /medium/,
    /small|little/,
    /tiny/
];

xPositions = [
    /left/,
    /right/,
    /center|middle/
];

yPositions = [
    /top|up/,
    /bottom|down|( |^)low/
];

const shapes = [
    /rectangle|rect|square|box/,
    /ellipse|circle/,
    /triangle/
];

// Setup //////////////////////////////////////////////////////////
function setup() {
    createCanvas(canvas.width, canvas.height);
    // drawInputControls();
    rectMode(CENTER);
    textFont("Courier");

    // input controls
    request = createInput("Type here...");
    request.position(requestSpace.pos.x, requestSpace.pos.y + 20);
    request.class('inputbox');

    let instructions = createP(
        "Try typing phrases like: 'make a big blue circle' or " + 
        "'draw a tiny purple square in the top left'..."
    );

    instructions.position(requestSpace.pos.x, requestSpace.pos.y + 40);

    shape = new Shape(
        defaultStroke,
        defaultSize,
        defaultPos.x,
        defaultPos.y,
        null
    );
}

function draw() {
    getInput();
    refreshDrawSpace();
    shape.updateDisplaySettings();
    shape.display();
}


// Drawing space background
function refreshDrawSpace() {
    background(255);
    push();
    rectMode(CORNER);
    noStroke();
    fill(247, 245, 225);
    rect(drawSpace.pos.x, drawSpace.pos.y, drawSpace.width, drawSpace.height);

    let pixelsPerSquare = 15;
    // Draw horizontal lines
    for (y = drawSpace.pos.y; y < (drawSpace.pos.y + drawSpace.height); y++) {
        if (y % pixelsPerSquare === 0) {
            strokeWeight(.2);
            stroke(59, 180, 255);
            line(drawSpace.pos.x, y, drawSpace.pos.x + drawSpace.width, y);
        }
    }
    // Draw vertical lines
    for (x = drawSpace.pos.x; x < (drawSpace.pos.x + drawSpace.width); x++) {
        if (x % pixelsPerSquare === 0) {
            strokeWeight(.2);
            stroke(59, 180, 255);
            line(x, drawSpace.pos.y, x, drawSpace.pos.y + drawSpace.height);
        }
    }
    pop();
}

// Read string input
function getInput() {
    // Returns a lowercased string from text input
    return request.value().toLowerCase();
}

function returnColor() {
    // Returns color; if not defined, returns null
    let string = getInput();
    colorSubstring = null;

    for (i = 0; i < colors.length; i++) {
        let regex = colors[i];

        // if a match is found
        if (regex.test(string) === true) {
            match = string.match(regex);
            colorSubstring = match[0];
        }
    }
    return colorSubstring;
}

function returnSize() {
    // Returns size; if not defined, returns null
    let string = getInput();
    sizeSubstring = null;

    for (i = 0; i < sizes.length; i++) {
        let regex = sizes[i];

        // if a match is found
        if (regex.test(string) === true) {
            match = string.match(regex);
            sizeSubstring = match[0];
        }
    }
    return sizeSubstring;
}

function returnPosX() {
    // Returns xposition; if not defined, returns null
    let string = getInput();
    posXSubstring = null;

    for (i = 0; i < xPositions.length; i++) {
        let regex = xPositions[i];

        // if a match is found
        if (regex.test(string) === true) {
            match = string.match(regex);
            posXSubstring = match[0];
        }
    }
    return posXSubstring;
}

function returnPosY() {
    // Returns yposition; if not defined, returns null
    let string = getInput();
    posYSubstring = null;

    for (i = 0; i < yPositions.length; i++) {
        let regex = yPositions[i];

        // if a match is found
        if (regex.test(string) === true) {
            match = string.match(regex);
            posYSubstring = match[0];
        }
    }
    return posYSubstring;
}

function returnShape() {
    // Returns shape from string input; if not defined, returns null
    let string = getInput();
    shapeSubstring = null;

    for (i = 0; i < shapes.length; i++) {
        let regex = shapes[i];

        // if a match is found
        if (regex.test(string) === true) {
            match = string.match(regex);
            shapeSubstring = match[0];
        }
    }
    return shapeSubstring;
}


// Shape object is the thing that's drawn on the canvas
// after parsing the user's input.
class Shape {
    constructor(color, size, xpos, ypos, shape) {
        this.color = color;
        this.size = size;
        this.pos = {
            x: xpos,
            y: ypos
        }
        this.shape = shape;
    }

    updateDisplaySettings() {
        // Set this.color
        if (returnColor() != null) { // if we're getting a read on color
            this.color = returnColor();
        } else {
            this.color = defaultStroke;
        }

        // Set this.size
        // TODO: udpate to `switch` and/or parameterize these blocks.
        if (returnSize() != null) { // if we're getting a read on size
            if (
                returnSize().match(sizes[0])
            ) {
                this.size = 400;
            } else if (
                returnSize().match(sizes[1])
            ) {
                this.size = 300;
            } else if (
                returnSize().match(sizes[2])
            ) {
                this.size = 200;
            } else if (
                returnSize().match(sizes[3])
            ) {
                this.size = 100;
            } else if (
                returnSize().match(sizes[4])
            ) {
                this.size = 50;
            } else if (
                returnSize().match(sizes[5])
            ) {
                this.size = 10;
            }
        } else {
            this.size = defaultSize;
        }

        // Set this.pos.x
        if (returnPosX() != null) { // if we're getting a read on xpos
            if (
                returnPosX().match(xPositions[0])
            ) {
                this.pos.x = drawSpace.pos.x + this.size / 2 + 10;
            } else if (
                returnPosX().match(xPositions[1])
            ) {
                this.pos.x = drawSpace.pos.x + drawSpace.width - this.size / 2 - 10;
            }
        } else {
            this.pos.x = defaultPos.x;

        }

        // Set this.pos.y
        if (returnPosY() != null) { // if we're getting a read on color
            if (
                returnPosY().match(yPositions[0])
            ) {
                this.pos.y = drawSpace.pos.y + this.size / 2 + 10;
            } else if (
                returnPosY().match(yPositions[1])
            ) {
                this.pos.y = drawSpace.pos.y + drawSpace.height - this.size / 2 - 10;
            }
        } else {
            this.pos.y = defaultPos.y;
        }

        // Set this.shape
        if (returnShape() != null) { // if we're getting a read on color
            if (
                returnShape().match(shapes[0])
            ) {
                this.shape = "rect";
            } else if (
                returnShape().match(shapes[1])
            ) {
                this.shape = "ellipse";
            } else if (
                returnShape().match(shapes[2])
            ) {
                this.shape = "triangle";
            }
        } else {
            this.shape = null;
        }
    }

    display() {
        push();
        strokeWeight(5);
        noFill();
        stroke(this.color);

        if (this.shape) { // if a shape is specified
            if (this.shape === "rect") {
                // draw rect
                rect(this.pos.x, this.pos.y, this.size, this.size);
            } else if (this.shape === "ellipse") {
                // draw ellipse
                ellipse(this.pos.x, this.pos.y, this.size, this.size);
            } else if (this.shape === "triangle") {
                // draw triangle
                triangle(
                    this.pos.x, this.pos.y - (this.size / 2),
                    this.pos.x - (this.size / 2), this.pos.y + (this.size / 2),
                    this.pos.x + (this.size / 2), this.pos.y + (this.size / 2)
                );
            }
        }
        pop();
    }
}