#include <analogWrite.h>

/* Comment this out to disable prints and save space */
#define BLYNK_PRINT Serial
#include <WiFi.h>
#include <WiFiClient.h>
#include <BlynkSimpleEsp32.h>

const int potPinA4 = A4;
const int potPinA3 = A3;
const int potPinA2 = A2;
const int buttonPin = 14;

char auth[] = "p8EqTLDKHqyOjGhVEIDmYQklB8TtkuXU";

// Your WiFi credentials.
// Set password to "" for open networks.
char ssid[] = "C39C27VAN6XR";
char pass[] = "easym00ney";


BlynkTimer timer;

int potValueA4 = 0;
int potValueA3 = 0;
int potValueA2 = 0;
int buttonValue = 0;

void onTimer() {
  Blynk.virtualWrite(V6, buttonValue);
}

// called when the device is connected to the Blynk server
BLYNK_CONNECTED() {
  // Your code here
}

// called when an app is connected to the Blynk project
BLYNK_APP_CONNECTED() {
  // Your code goes here
}

// called when an app is disconnceted from the Blynk project
BLYNK_APP_DISCONNECTED(){
}

void setup() {
  // Debug console
  Serial.begin(9600);

  // start the Blink service over WiFi
  Blynk.begin(auth, ssid, pass);

  // configure the blynk timer to call onTimer() every second
  timer.setInterval(1000L, onTimer);

  // setup input pins
  pinMode(potPinA4, INPUT);
  pinMode(potPinA3, INPUT);
  pinMode(potPinA2, INPUT);
  pinMode(buttonPin, INPUT);
}

void loop() {
  // update Blynk connection and automatic values
  Blynk.run();

  // update the Blynk timer
  timer.run();

  // read physical pins
  int tempButtonValue = digitalRead(buttonPin);

  // if button is pressed, send push notification to Blynk app
  if(tempButtonValue && !buttonValue) {
    // careful! notice we're only writing to Blynk in loop() under certain conditions
    Blynk.notify("Yaaay... button is pressed!");
  }
  
  // keep track of latest button value
  buttonValue = tempButtonValue;


  potValueA4 = analogRead(potPinA4);
  Serial.println("potPinA4 = ");
  Serial.println(analogRead(potPinA4));

  potValueA3 = analogRead(potPinA3);
  Serial.println("potPinA3 = ");
  Serial.println(analogRead(potPinA3));

  potValueA2 = analogRead(potPinA2);
  Serial.println("potPinA2 = ");
  Serial.println(analogRead(potPinA2));
  
  buttonValue = digitalRead(14);
  Serial.println(buttonValue);
  

  // do anything else you want ion your sketch
  // but, DO NOT WRITE TO BLYNK HERE CONTINUOUSLY, ONLY IN TIMEOUT HANDLER!
}
