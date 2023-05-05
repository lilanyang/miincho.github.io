let s = 100; // diameter of circle
let x = 50; // x-coordinate starts at 50
let y = 50; // y-coordinate starts at 50
let vx = 2; // velocity in x-direction
let vy = 2;//velocity in y-direction

let face; //create an image

function preload(){
  face = loadImage('img/face.png');
}
 
function setup() {
  createCanvas(windowWidth, windowHeight);

  
}

function draw() {
  background(220);
  imageMode(CENTER);
  face.resize(s,s);
  image(face, x,y);
  

  //ellipse(x, y, d);
  x = x + vx; // updating the x-coordinate
  y = y + vy; // updating the y-coordinate
  // d = d + 1;  // d++;
  
  console.log(face.width);

  if (x + face.width / 2 >= windowWidth || x - face.width/2 <= 0) {
    vx = -vx;
  }
  if (y + face.height / 2 >=windowHeight || y - face.height/2 <= 0) {
    vy = -vy;
  }

  
}
