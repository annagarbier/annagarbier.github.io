/* Shy robot
 * 
 * As you approach the ultrasonic range finder, the LCD displays messages
 * based on the distance. Get too close, and the buzzer also kicks in.
 * 
 * This code builds off of the piblic Liquid Crystal Hello World tutorail
 * at http://www.arduino.cc/en/Tutorial/HelloWorld.
 * 
 * Author: Anna Garbier
 * Date: 2018-09-22
*/

// Include LCD library
#include <LiquidCrystal.h>

// Variables for LCD display
const int rs = 12, en = 11, d4 = 5, d5 = 4, d6 = 3, d7 = 2;
LiquidCrystal lcd(rs, en, d4, d5, d6, d7);

// Variables for buzzer
#define NOTE_B0  31
int buzzerPin = 8;

// Variables for ultrasonic sensor
const int trigPin = 9;
const int echoPin = 10;
long duration;
int distance;

void setup() {
  // Set up LCD display
  lcd.begin(16, 2);
  
  // Set up ultrasonic input and output
  pinMode(trigPin, OUTPUT);
  pinMode(echoPin, INPUT);
  
  // Initialize logging
  Serial.begin(9600);
}

void loop() {
  digitalWrite(trigPin, LOW);
  delayMicroseconds(2);

  digitalWrite(trigPin, HIGH);
  delayMicroseconds(10);
  digitalWrite(trigPin, LOW);

  duration = pulseIn(echoPin, HIGH);
  distance = duration * 0.034/2;
  
  Serial.print("Distance: ");
  Serial.println(distance);

  // Set the cursor to column 0, line 0
  lcd.setCursor(0, 0);
  if (distance < 10) {
    lcd.print("NO. TOO CLOSE!");
    tone(buzzerPin, NOTE_B0, 250);
  } else if (distance < 20) {
    lcd.print("Mehhh...      ");
  } else {
    lcd.print("That's nice...");
  }
}
