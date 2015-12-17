var imgBack;
var imgJiji;
var imgKiki;

var ax;
var kiki = {
  x: 900, 
  y: 100, 
  dx: 200,
  dy: 100,
  ax: -2,
  show: function(){
    image(imgKiki, this.x , this.y , this.dx, this.dy);

  },
  move: function(){
    this.x = this.x + this.ax;
    this.y = this.y + random(-1,1);

  }
}

var jijiArray = [];
var jiji = {
  x: 150 ,
  y: 0 ,
  dx: 100,
  dy: 90,
  show: function() {
    
    for (var i = 0; i < numPackage; i += 1){
    
    jijiArray[i]=imgJiji;
    
    
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
  image(imgBack,0,0);
  fromParse();
  
}


function draw(){
image(imgBack,0,0);
  
  kiki.show();   

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
  
  moveJiji = true;
  moveKiki = true;

}
