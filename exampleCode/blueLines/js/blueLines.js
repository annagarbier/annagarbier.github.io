const drawing_border = 50;

function setup() {
    createCanvas(windowWidth, windowHeight);
    colorMode(HSB, 1);
    background(.1, .001, .95);

    let y_start = drawing_border;
    let y_end = random(200, 300);

    while (y_end < height - drawing_border) {
        drawLines(y_start, y_end);
        y_start = y_end;
        y_end += random(50, 300);
    }

    let info = createP("Exploring subtle randomness. Refresh page for new image.");
    info.position(drawing_border, windowHeight - 50);
}

function drawLines(y_start, y_end) {
    stroke(.56, .8, random(.2, .7));
    strokeWeight(random(.8, 1));
    for (x = drawing_border; x < width - drawing_border; x += random(4, 3)) {
        line(x, y_start + random(4), x, y_end + random(4));
    }
}
