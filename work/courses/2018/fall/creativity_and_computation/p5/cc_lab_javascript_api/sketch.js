const apodBase = "https://api.nasa.gov/planetary/apod?api_key=";
const apodKey = "8DssVfL0pTbszZeUgvHPGbZcKfsnjGDaBlQnL54e";
var apodData;
var img;
let img_width;
let img_height;
let drawCoutner;

function setup() {
	var canvas = createCanvas(window.innerWidth, window.innerHeight);
	console.log("Start setup()");
	// Use p5.js built-in AJAX (Asynchronous JavaScript and XML)
	// technique to load JSON data from URL and trigger a callback
	loadJSON(apodBase + apodKey, gotData);
	console.log("End setup()");
	console.log("");
	drawCounter = 0;
}

// gotData() is called when NASA's "Astronomy Picture of
// the Day" data is successfully retrieved via loadJSON().
function gotData(data) {
	apodData = data;
	img = loadImage(data.hdurl);
	var title = createA(apodData.hdurl, apodData.title);
	var credits = createP(apodData.copyright + ", " + apodData.date);
	title.parent('text-holder');
	credits.parent('text-holder');
}

function draw() {
	if (drawCounter == 0) {
		console.log("Waiting for data to load...");
		if (apodData) {
			img_width = window.innerWidth;
			img_height = img.height * img_width / img.width;
			image(img, 0, 0, img_width, img_height);
			drawCounter++;
			console.log("Data loaded.");
		}
	}
}

// Draw over the NASA image.
function mouseDragged() { 
	strokeWeight(3);
	stroke(255, 65);
	line(mouseX, mouseY, pmouseX, pmouseY);
	console.log("Mouse dragged...");
}

// Refresh the sketch if user presses ENTER.
function refreshSketch() {
	drawCounter = 0;
}

function keyPressed() {
  if (keyCode === ENTER) {
    refreshSketch();
  }
}

