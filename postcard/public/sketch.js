var a = 80;  // Create a global variable "a"

function setup() {
  createCanvas(720, 400);
  background(0);
  stroke(255);
  noLoop();
}

function draw() {
  // Draw a line using the global variable "a"
  line(a, 0, a, height);
  
  // Create a new variable "a" local to the for() statement 
  for (var a = 120; a < 200; a += 3) {
    line(a, 0, a, height);
  }
  
  // Create a new variable "a" local to the draw() function
  var a = 300;
  // Draw a line using the new local variable "a"
  line(a, 0, a, height);  
  
  // Make a call to the custom function drawAnotherLine()
  drawAnotherLine();
  
  
}

function drawAnotherLine() {
  // Create a new variable "a" local to this method
  var a = 320;
  // Draw a line using the local variable "a"
  line(a, 0, a, height);
}

