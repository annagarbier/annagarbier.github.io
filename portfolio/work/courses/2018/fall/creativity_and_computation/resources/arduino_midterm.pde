/* Bubbles
 * Anna Garbier
 * MFADT, 2018
 *
 * 1) Reads Serial data in as a tab-separated string of three
 *    sensor values.
 * 2) Outputs a "bubble noise" when any of the three input
 *    values exceeds a threshold.
 */

// Include serial object library
import processing.serial.*; 

// Import sound library
import ddf.minim.*;

// Create local serial object from serial library
Serial mySerial;

// Create local sound objects from sound library
Minim minim;
AudioPlayer player0;
AudioPlayer player1;
AudioPlayer player2;
AudioPlayer[] players = new AudioPlayer[3];

// Variable to collect serial data
String sensorString = null;
// ASCII code for new line (carriage return) in serial
int nl = 10;
int sensorValThreshold = 550;

void setup() {
  // Link processing to my serial port
  println(Serial.list());
  String myPort = Serial.list()[2];
  mySerial = new Serial(this, myPort, 9600);
    
  // Load sound file
  minim = new Minim(this);
  
  // Blops
  player0 = minim.loadFile("Blop-Mark_DiAngelo-79054334.mp3");
  player1 = minim.loadFile("Blop-Mark_DiAngelo-79054334.mp3");
  player2 = minim.loadFile("Blop-Mark_DiAngelo-79054334.mp3");
  players[0] = player0;
  players[1] = player1;
  players[2] = player2;
}

void draw() {
  // While there is available information on the serial port
  while (mySerial.available() > 0) {
    // Strip data off port
    sensorString = mySerial.readStringUntil(nl);
    // If serial port contained data
    if (sensorString != null) {
      
      // Parse the data from serial into sensor value array
      String[] sensorStringArray = trim(split(sensorString, '\t'));
      float sensorVal0 = float(sensorStringArray[0]);
      float sensorVal1 = float(sensorStringArray[1]);
      float sensorVal2 = float(sensorStringArray[2]);
      
      println(sensorVal0 + ", " + sensorVal1 + ", " + sensorVal2);

      // todo: function for playing audio
      // todo: amp based on pressure sensor value
      if (sensorVal0 > sensorValThreshold) {
        println("Sensor 0 activated (" + sensorVal0 + ")");
        //players[0].amp(0.5);
        players[0].play();
      } else if (sensorVal0 <= sensorValThreshold) {
        players[0].pause();
        players[0].rewind();
      }
      
      if (sensorVal1 > sensorValThreshold) {
        println("Sensor 1 activated (" + sensorVal1 + ")");
        players[1].play();
      } else if (sensorVal0 <= sensorValThreshold) {
        players[1].pause();
        players[1].rewind();
      }
      
      if (sensorVal2 > sensorValThreshold) {
        println("Sensor 1 activated (" + sensorVal2 + ")");
        players[2].play();
      } else if (sensorVal0 <= sensorValThreshold) {
        players[2].pause();
        players[2].rewind();
      }
    }
  }
}

void stop() {
  // Close all the players
  for (int p = 0; p < players.length; p++) {
    players[p].close();
  }
   minim.stop();
   super.stop();
}


/* CORRESPONDING ARDUINO CODE BELOW
int sensorVal = 0;
int sensors[] = {0, 2, 4};
int numSensors = 3;
 
void setup() {
  Serial.begin(9600);
}

void loop() {
  for (int i = 0; i < numSensors; i++) {
    sensorVal = constrain(analogRead(sensors[i]), 0, 1000);
    Serial.print(sensorVal);
    Serial.print("\t");
  }
  Serial.println();
}
*/