let sketch2 = function(p) {
  let myFont;
  let data, url;
  let itemNum = 120;
  let testTakers = [];
  let reading = [];
  let targetNums = [];
  let currentNums = [];
  let textSizeValues = [];

  let num = 10;
  let delay = 50; // flcikering numbers delay time in milliseconds
  let intervalId; // interval ID for clearing later
  let stopTime = 100000; // time to stop in milliseconds
  let decreaseFactor = 1.1; // factor by which the delay is increased
  
    p.preload = function() {
      url = "https://data.cityofnewyork.us/resource/f9bf-2cp4.json" + "?$limit=" + itemNum;
      data = p.loadJSON(url);
  
      myFont = p.loadFont('fonts/caveat.ttf');
    }
  
    p.setup = function() {
      p.textFont(myFont);
      p.createCanvas(p.windowWidth, p.windowHeight).parent('container2');
      p.textAlign(p.CENTER, p.CENTER);
  
      itemNum = Object.keys(data).length;
      for (let i = 0; i < itemNum; i++) {
        writing[i] = data[i].sat_writing_avg_score;
        testTakers[i] = data[i].num_of_sat_test_takers;
        textSizeValues[i] = p.map(testTakers[i], 0, 500, 10, 80);
      }
  
      // initialize targetNums and currentNums arrays
      for (let i = 0; i < writing.length; i++) {
        targetNums[i] = writing[i];
        currentNums[i] = p.random(100, 999);
      }
  
      p.textSize(textSizeValues[0]); // set the initial text size
      intervalId = setInterval(updateNum, delay);
      setTimeout(stopInterval, stopTime);
    }
  
    p.draw = function() {
      p.clear();
  
      // display all of the SAT reading scores
      p.textAlign(p.CENTER, p.CENTER);
      let x = 50;
      let y = 50;
      for (let i = 0; i < writing.length; i++) {
        p.textSize(textSizeValues[i]); // set the text size for each reading score
  
        // if the mouse is hovering over the current number and change the background color accordingly
        if (p.mouseX > x && p.mouseX < x + 50 && p.mouseY > y && p.mouseY < y + 30) {
          p.fill(255, 0, 0);
        } else {
          p.fill('#039B75');
        }
  
        // display the current number
        p.text(p.floor(currentNums[i]), x, y);
        y += 30;
  
        if (y > p.height - 50) {
          y = 50;
          x += 100;
        }
      }
  
      // gradually slow down the flickering numbers to the target numbers
      for (let i = 0; i < currentNums.length; i++) {
        currentNums[i] = p.lerp(currentNums[i], targetNums[i], 0.05);
      }
    }
  
    p.mouseMoved = function() {
      // trigger the draw function to update the background color when the mouse is moved
      p.draw();
    }
  
    function updateNum() {
      // select a random SAT reading score from the JSON data
      let randomIndex = p.floor(p.random(0, itemNum));
  
    let newNum = data[randomIndex].sat_writing_avg_score;
    targetNums[randomIndex] = newNum;
  }
  
  function stopInterval() {
    // stop the interval when the delay time exceeds a threshold
    clearInterval(intervalId);
  }
  }
  
  
  new p5(sketch2);