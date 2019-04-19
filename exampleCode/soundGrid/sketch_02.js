// PHILHARMONIA ORCHESTRA MEETS GEORG NEES INSPIRED GRID
//
// Credits:
// Sound samples come from The Philharmonia Orchestra Sound Samples bank
// at https://www.philharmonia.co.uk/explore/sound_samples
// Visuals inspired by Georg Nees.
//
// Coded by annagarbier@

// canvas specs
const canvasWidth = 500,
    canvasHeight = canvasWidth * 1.25,
    border = canvasWidth / 25,
    numRows = 20,
    numCols = numRows,
    rowHeight = (canvasHeight - (2 * border)) / numRows,
    colWidth = (canvasWidth - (2 * border)) / numCols,
    canvasCenter = {
        x: canvasWidth / 2,
        y: canvasHeight / 2
    };

let points = [],
    analyzer,
    volume1,
    volume2,
    baseWarpspeed;

function preload() {
    // phrase = loadSound('./sounds/viola_G3_phrase_fortissimo_arco-tremolo.mp3');
    phrase1 = loadSound('./sounds/double-bass_A1_phrase_cresc-decresc_arco-normal.mp3');
    phrase2 = loadSound('./sounds/double-bass_A1_phrase_mezzo-forte_arco-detache.mp3');
    phrase3 = loadSound('./sounds/double-bass_E1_phrase_mezzo-piano_pizz-glissando.mp3');
}

function setup() {
    canvas = createCanvas(canvasWidth, canvasHeight);
    canvas.parent('sketch');

    analyzer1 = new p5.Amplitude();
    analyzer1.setInput(phrase1);

    analyzer2 = new p5.Amplitude();
    analyzer2.setInput(phrase2);

    analyzer3 = new p5.Amplitude();
    analyzer3.setInput(phrase3);

    startButton1 = createButton('Phrase 1');
    startButton1.mousePressed(start_phrase1);

    startButton2 = createButton('Phrase 2');
    startButton2.mousePressed(start_phrase2);

    startButton2 = createButton('Phrase 3');
    startButton2.mousePressed(start_phrase3);

    stopButton = createButton('Stop');
    stopButton.mousePressed(stop);

    stopButton = createButton('Refresh');
    stopButton.mousePressed(refresh);


    for (let r = 0; r < numRows; r++) {
        for (let c = 0; c < numCols; c++) {
            points.push(new Point(c * colWidth + border, r * rowHeight + border));
        }
    }
}

function start_phrase1() {
    phrase1.play();
}

function start_phrase2() {
    phrase2.play();
}

function start_phrase3() {
    phrase3.play();
}

function getVolumes() {
    volume1 = analyzer1.getLevel();
    volume2 = analyzer2.getLevel();
    volume3 = analyzer3.getLevel();
}

function refresh() {
    points = [];
    for (let r = 0; r < numRows; r++) {
        for (let c = 0; c < numCols; c++) {
            points.push(new Point(c * colWidth + border, r * rowHeight + border));
        }
    }
}

function stop() {
    phrase1.stop();
    phrase2.stop();
    phrase3.stop();
}

function draw() {
    background(255);
    fill(0);
    stroke(0);

    getVolumes();
    baseWarpValue = map(volume1 + volume2 + volume3, 0, .06, 0, .2);

    // based on dist from center of canvas, warp
    for (i in points) {
        if (
            dist(
                points[i].pos.x, points[i].pos.y,
                canvasCenter.x - (colWidth / 2), canvasCenter.y - (rowHeight / 2)
            ) < canvasWidth / 4
        ) { 
            points[i].warp(3 * baseWarpValue);
        } else if (
            dist(
                points[i].pos.x, points[i].pos.y,
                canvasCenter.x - (colWidth / 2), canvasCenter.y - (rowHeight / 2)
            ) < canvasWidth / 2
        ) {
            points[i].warp(2 * baseWarpValue);
        } else {
            points[i].warp(1 * baseWarpValue);
        }
    }
    connectPoints();
}

class Point {
    constructor(x, y) {
        this.pos = {
            x: x,
            y: y
        };
    }

    warp(magnitude) {
        this.pos.x = constrain(this.pos.x + random(-magnitude, magnitude), 0, canvasWidth);
        this.pos.y = constrain(this.pos.y + random(-magnitude, magnitude), 0, canvasHeight);
    }
}

function connectPoints() {
    // vertical lines
    for (let i = 0; i < points.length - numRows; i++) {
        line(
            points[i].pos.x, points[i].pos.y,
            points[i + numCols].pos.x, points[i + numCols].pos.y
        );
    }

    // horizontal lines
    for (let j = 0; j < numRows; j++) {
        for (let i = 0; i < numCols - 1; i++) {
            row = j;
            rowStartIndex = j * numCols;
            line(
                points[rowStartIndex + i].pos.x, points[rowStartIndex + i].pos.y,
                points[rowStartIndex + i + 1].pos.x, points[rowStartIndex + i + 1].pos.y
            );    
        }
    }
}