let myFont;
let myFont2;
let myFont3;
let data, url;
let itemNum = 120;
let testTakers = [];
let reading = [];
let writing = [];
let math = [];

let num = 10;
let delay = 50; // starting delay time in milliseconds
let intervalId; // interval ID for clearing later
let stopTime = 10000; // time to stop in milliseconds
let decreaseFactor = 1.1; // factor by which the delay is increased

let targetNums = []; // array to store target numbers to gradually slow down to
let currentNums = []; // array to store current flickering numbers
let textSizeValues = []; // array to store the text sizes for the math scores



function preload() {
  //limit a certain number of entries; only works through API links
  url = "https://data.cityofnewyork.us/resource/f9bf-2cp4.json" + "?$limit=" + itemNum;
  data = loadJSON(url);

  myFont = loadFont('fonts/Raj.ttf');
  myFont2 = loadFont('fonts/caveat.ttf');
  myFont3 = loadFont('fonts/rok.ttf');
  
}

function setup() {
  textFont(myFont);
  createCanvas(windowWidth, windowHeight).parent('container3');
  textAlign(CENTER, CENTER);
  
  textFont(myFont);

  

  itemNum = Object.keys(data).length;
for (let i = 0; i < itemNum; i++) {
  math[i] = data[i].sat_math_avg_score;
  testTakers[i] = data[i].num_of_sat_test_takers;
  textSizeValues[i] = map(testTakers[i], 0, 500, 10, 80);
}

  // initialize targetNums and currentNums arrays
  for (let i = 0; i < math.length; i++) {
    targetNums[i] = math[i];
    currentNums[i] = random(100, 999);
  }

  textSize(textSizeValues[0]); // set the initial text size
  intervalId = setInterval(updateNum, delay);
  setTimeout(stopInterval, stopTime);
  
  
}

function draw() {
    clear();
  

  // display all of the SAT math scores
  textAlign(CENTER, CENTER);
  let x = 50;
  let y = 50;
  for (let i = 0; i < math.length; i++) {
    textSize(textSizeValues[i]); // set the text size for each math score

    // if the mouse is hovering over the current number and change the background color accordingly
    if (mouseX > x && mouseX < x + 50 && mouseY > y && mouseY < y + 30) {
      fill(255, 0, 0);
    } else {
      fill('#039B75');
    }

    // display the current number
    text(floor(currentNums[i]), x, y);
    y += 30;

    if (y > height - 50) {
      y = 50;
      x += 100;
    }
  }


  
  // gradually slow down the flickering numbers to the target numbers
  for (let i = 0; i < currentNums.length; i++) {
    currentNums[i] = lerp(currentNums[i], targetNums[i], 0.05);
  }
}


function mouseMoved() {
  // trigger the draw function to update the background color when the mouse is moved
  draw();
}

function updateNum() {
  // select a random SAT math score from the JSON data
  let randomIndex = floor(random(0, itemNum));
  let newNum = data[randomIndex].sat_math_avg_score;
  targetNums[randomIndex] = newNum;
}

function stopInterval() {
  // stop the interval when the delay time exceeds a threshold
  clearInterval(intervalId);
}

function keyPressed() {
  if (key === ' ') {
    location.reload();
  }
}

