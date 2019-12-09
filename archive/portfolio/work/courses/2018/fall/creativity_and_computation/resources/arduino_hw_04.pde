/* Arduino code
 * Arduino-to-processing using photoresistor as sensor
 */
 
int sensorPin = A0;

void setup() {
  // Initialize serial port to transmit data
  Serial.begin(9600);
}

void loop() {
  // Capture data in arduino
  int sensorValue = analogRead(sensorPin);
  // Put data onto serial port
  Serial.println(sensorValue);
}


/* Processing code
 * Light activated noise
 * Anna Garbier, MFADT CC Lab, HW 4
 *
 * Takes serial input from Arduino's light sensor
 * and uses the input value as a switch for audio output.
 *
 * Builds off of Arduino-to-Processing tutorial at
 * https://www.youtube.com/watch?v=NhyB00J6PiM by adding
 * 1) Sensor input to Arduino and
 * 2) Audio output from Processing
 */

// Include serial object library
import processing.serial.*; 

// Import sound library
import ddf.minim.*;

// Create local serial object from serial library
Serial mySerial;

// Create local sound object from sound library
Minim minim;
AudioPlayer player;

// Variable to collect serial data
String myString = null;
// ASCII code for new line (carriage return) in serial
int nl = 10;
// Float for storing converted ASCII serial data
float myVal;
boolean audioOn = false;
float audioAmpValue = .25;

void setup() {
  size(400, 850);
  // Link processing to my serial port
  String myPort = Serial.list()[5];
  mySerial = new Serial(this, myPort, 9600);
  
  // Load sound file
  minim = new Minim(this);
  player = minim.loadFile("crowd.wav");
}

void draw() {
  // While there is available information on the serial port
  while (mySerial.available() > 0) {
    // Strip data off port
    myString = mySerial.readStringUntil(nl);
    // If serial port contained data
    if (myString != null) {
      background(0);
      // Turns data from serial and turns it into a float
      myVal = float(myString);
      float myValMapped = map(myVal, 700, 1200, 0, 100);
      println("myValMapped: " + myValMapped);
      
      if (player.isPlaying()) {
        background(255);
        fill(0);
        println("Sound is playing");
      } else {
        background(0);
        fill(255);
        println("Sound is off");
      }

      if (myValMapped < 50 && player.isPlaying() == false) {
        player.loop();
      } else if (myValMapped > 50 && player.isPlaying() == true) {
        player.pause();
      }
    }
  }
}

