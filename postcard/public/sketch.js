var imgBack;
var imgJiji;
var imgKiki;

var ax;
var kiki = {
  x: 900, 
  y: 100, 
  dx: 200,
  dy: 100,
  ax: -5,
  show: function(){
    image(imgKiki, this.x , this.y , this.dx, this.dy);

  },
  move: function(){
    this.x = this.x + this.ax;
    this.y = this.y + random(-1,1);

  }
}

var jijiArray = [];
// var kikiShow = 0;

var jiji = {
  x: 150 ,
  y: 0 ,
  dx: 100,
  dy: 90,
  show: function() {
    
    for (var i = 0; i < numPackage; i += 1){
    // noLoop();
    
    jijiArray[i]=imgJiji;
    
    // image(imgJiji,this.x + random(75, width -100),this.y + height - random(70,150) , this.dx, this.dy);
    
    image(imgJiji,this.x + (width -200)*i/numPackage,this.y + height - (70+20*i) , this.dx, this.dy);
    
    
    };



  },
  move: function() {
    this.x = this.x + random(-0.5,0.5);
  }

}


var moveKiki = false;
var moveJiji = false;




function preload(){
  imgBack = loadImage("images/background.jpg");
  imgJiji = loadImage("images/jiji-01.png");
  imgKiki = loadImage("images/kiki.png");
}

function setup() {
  createCanvas(1080, 760);
  background(0);
  stroke(255);
  // s='Fetch Record'
   // noLoop();
  image(imgBack,0,0);
  fromParse();
  

  

}




function draw(){
image(imgBack,0,0);
  // image(imgKiki, x, y)

  // ellipse(50, 50, 100, 100);
  // fill(200,60,30);

  // textSize(12);
  // fill(100,100,100);
  // text(s, 15, 50, 150);
  

  // if (kikiShow=0){ 
  kiki.show();
// }
   

  if (moveKiki) {
    kiki.move();
    if (kiki.x < -150){
      
      kiki.x =1000;

    } 
    else if (kiki.x > width-200){
      kiki.ax = -5;
    }
  }

  
jiji.show();

  if(moveJiji) {
    jiji.move();

  }
  
  

}



function mousePressed() {
  // loop();
  
  
  

  //jiji.show();
  
  

  //jiji.move();

  moveJiji = true;
  moveKiki = true;

  
}














// var recentx = false;
// var recenty = false;


// var shark = {
//   x:0,
//   y:350,
//   d:300,
//   speed:15,
// show: function () {
//   
//   image(sharkpic, this.x, this.y, this.d, this.d);
// },
// move: function () {
//   this.x = this.x + this.speed;
// },
// bounce: function () {
//   if (this.x > width - 200 || this.x < -100) {
//     this.speed = this.speed * -1;
//   }
// }
// }

// var sea = {
//   x:0,
//   y:0,
//   speed:1,
//   show: function () {
//   //SEA
//   for (this.x = 0; this.x <= width; this.x += 30) {
//     for (this.y = 0; this.y <= height; this.y += 15) {
//       strokeWeight(3);
//       stroke(10, random(80, 150), random(150, 255));
//       // bezier (0, 20, 10, 0, 20, 20, 30, 20);
//       var moveSea = 5*sin(millis()/3);
//       if (this.y % 2) {
//         moveSea *= -1;
//       }
//       bezier(this.x + moveSea, this.y, this.x + 10 + moveSea, this.y - 20, this.x + 20 + moveSea, this.y, this.x + 30 + moveSea, this.y);
//     }
//   }
  

//   }
// }

// function preload() {
//   sharkpic = loadImage("shark.png");
// }

// function setup() {
//   createCanvas(800, 600);
//   angleMode(DEGREES);
// }

// function draw() {
//   background(255);

//   sea.show();
//   shark.show();
//   shark.move();
//   shark.bounce();
//   displaynemo(80, 85, 40, random (30, 35), 255, 140, 0, random (5, 8));
//   displaynemo(300, 250, 40, random (25, 32), 255, 140, 0, random (5, 8));
//   displaynemo(500, 35, 40, random (55, 60), 255, 140, 0, random (5, 8));
//   displaynemo(40, 355, 40, random (25, 28), 255, 140, 0, random (5, 8));
//   displaynemo (640, 315, 40, random (30, 40), 255, 140, 0, random (5, 8));
//   displaynemo (690, 65, 40, random (50, 55), 255, 140, 0, random (5, 8));

//   // if (mouseIsPressed){
//   //   displaynemo (mouseX, mouseY, 40, random (20, 60), random (255), random (255), random (255), 4, 4);
//   // }
  
//   if (recentx && recenty){
//     print('draw fish');
//     displaynemo (recentx, recenty, 40, random (20, 60), random (255), random (255), random (255), 4, 4);
//   }

// }

// function displaynemo (x, y, widthbody, heightbody, r, g, b, z){
//   stroke (0);
//   strokeWeight (2);
//   fill (r, g, b);
//   //tail
//   beginShape ();
//   vertex(x, y);
//   vertex(x+30, y-15);
//   vertex(x+30, y+15);
//   endShape (CLOSE);
//   //body
//   ellipse (x, y, widthbody, heightbody);
//   noStroke ();
//   //eye
//   fill(255);
//   ellipse (x-9, y-4, 13, 13);
//   fill (0);
//   ellipse (x-9, y-4, z, z);
//   //barbatana
//   noFill();
//   stroke (0);
//   strokeWeight (2);
//   arc (x+4, y, 10, 8, 270, 90)

// }

// function mousePressed (){
//   recentx = mouseX;
//   recenty = mouseY;
// }







