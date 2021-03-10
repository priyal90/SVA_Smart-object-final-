let serial; // variable for the serial object
let latestData = "waiting for data"; // variable to hold the data

let bugs = [];
let click = 0;

var spot = {
  x: 100,
  y: 50
}

var col = {
  r:255,
  g:0,
  b:0
}

function setup() {
  background (255,255,255);
  createCanvas(windowWidth, windowHeight);
  // serial constructor
  serial = new p5.SerialPort();
  // get a list of all connected serial devices
  serial.list();
  // serial port to use - you'll need to change this
  serial.open('/dev/tty.usbserial-021FEBEE');
  // callback for when the sketchs connects to the server
  serial.on('connected', serverConnected);
  // callback to print the list of serial devices
  serial.on('list', gotList);
  // what to do when we get serial data
  serial.on('data', gotData);
  // what to do when there's an error
  serial.on('error', gotError);
  // when to do when the serial port opens
  serial.on('open', gotOpen);
  // what to do when the port closes
  serial.on('close', gotClose);
  noStroke();
    for (let i = 0; i < 200; i++) {
      bugs.push(new Jitter());
  }
}

function serverConnected() {
  print("Connected to Server");
}

// list the ports
function gotList(thelist) {
  print("List of Serial Ports:");

  for (let i = 0; i < thelist.length; i++) {
    print(i + " " + thelist[i]);
  }
}

function gotOpen() {
  print("Serial Port is Open");
}

function gotClose() {
  print("Serial Port is Closed");
  latestData = "Serial Port is Closed";
}

function gotError(theerror) {
  print(theerror);
}

// when data is received in the serial buffer

function gotData() {
  let currentString = serial.readLine(); // store the data in a variable
  trim(currentString); // get rid of whitespace
  if (!currentString) return; // if there's nothing in there, ignore it
  console.log(currentString); // print it out
  latestData = currentString; // save it to the global variable
}

function draw() {
  background (255,255,255,100);
  col.r = random(50,255);
  col.g = random(20, 255);
  col.b = random(50, 255);
  spot.x = random(0, width);
  spot.y = random(0, height);
  fill(col.r,col.g,col.b);
  ellipse(spot.x, spot.y, 25, 25);
  
  for (let i = 0; i < bugs.length; i++) {
    bugs[i].move();
    bugs[i].display();
  }
  
  fill(col.r,col.g,col.b);
  text(latestData, 10, 10); // print the data to the sketch

  // in this example, we are reciving a 0 and a 1
  // if the button is not pressed we get a 0
  if (latestData == 0) {
    fill(0, 0, 0);
    ellipse(width / 2, height / 2, 100, 100);
  } else if (latestData == 1)  { // if it is pressed, we get a 1
    rectMode(CENTER);
    fill(0, 0, 0);
    rect(width / 2, height / 2, 100, 100);
  } else if (latestData >= 300)  { // if it is pressed, we get a 1
    fill(255, 0, 0);
    ellipse(width / 2, height / 2, 100, 100);
  }else if (latestData <= 300)  { // if it is pressed, we get a 1
    fill(0, 255, 0);
    ellipse(width / 2, height / 2, 200, 200);
  }
  
  
}

class Jitter {
  constructor() {
    this.x = random(width);
    this.y = random(height);
    this.diameter = random(10, 30);
    this.speed = 1;
  }

  move() {
    this.x += random(-this.speed, this.speed);
    this.y += random(-this.speed, this.speed);
  }

  display() {
    ellipse(this.x, this.y, this.diameter, this.diameter);
  }
}

function mouseClicked(){
  if ( click == 0){
    noLoop();
    click =255;
  } else if ( click == 255){
    loop();
    click = 0;
  }
}
