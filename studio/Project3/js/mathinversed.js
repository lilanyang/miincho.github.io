
  let myFont;
  let data, url;
  let itemNum = 160;
  let testTakers = [];
  let math = [];
  let targetNums = [];
  let currentNums = [];
  let textSizeValues = [];

  let num = 10;
  //let delay = 5000; // flcikering numbers delay time in milliseconds
  let intervalId; // interval ID for clearing later
  //let stopTime = 5000; // time to stop in milliseconds
  let decreaseFactor = 1.1; // factor by which the delay is increased

  preload = function() {
    url = "js/testscores.json";
    loadJSON(url, function(jsonData) {
      console.log(jsonData); // log the data to the console to check if it's loaded correctly
      data = jsonData;
    });
  
    myFont = loadFont('fonts/Raj.ttf');
  }

  setup = function() {
    textFont(myFont);

    createCanvas(windowWidth, windowHeight).parent('container3');
    textAlign(CENTER, CENTER);

    //itemNum = Object.keys(data).length;
    for (let i = 0; i < itemNum; i++) {
      math[i] = data[i].sat_math_avg_score;
      testTakers[i] = data[i].num_of_sat_test_takers;
      textSizeValues[i] = map(testTakers[i], 0, 590, 10, 80);
    }

  // initialize targetNums and currentNums arrays
  for (let i = 0; i < math.length; i++) {
    targetNums[i] = math[i];
    currentNums[i] = random(100, 999);
  }

    textSize(textSizeValues[0]); // set the initial text size
    intervalId = setInterval(updateNum);
    //setTimeout(stopInterval, stopTime);


  }

  let selectedScoreIndex = -1; // initialize to -1

  mousePressed = function() {
    // check if the mouse is over a score
    for (let i = 0; i < math.length; i++) {
      let x = 50;
      let y = 50 + i * 30;
      if (mouseX > x && mouseX < x + 50 && mouseY > y && mouseY < y + 30) {
        selectedScoreIndex = i; // save the index of the selected score
        break;
      }
    }
  };


  
  
  draw = function() {
    clear();

    // display all of the SAT reading scores
    textAlign(CENTER, CENTER);
    let x = 50;
    let y = 50;
    for (let i = 0; i < math.length; i++) {
      textSize(textSizeValues[i]); 

    // if the mouse is hovering over the current number and change the background color
    if (mouseX > x && mouseX < x + 50 && mouseY > y && mouseY < y + 30) {
      fill('white');
      // stop flickering numbers on mouse hover
      currentNums[i] = targetNums[i];
    } else {
      fill('#fc648a');
    }
    // display the current number
    text(floor(currentNums[i]), x, y);
    y += 30;


    if (y > height - 50) {
      y = 50;
      x += 100;
    }
  }



  if (selectedScoreIndex >= 0) {
      let schoolName = `<span style="font-weight: 700;">${data[selectedScoreIndex].school_name}</span>`;
      let asian = data[selectedScoreIndex].asian_per;
      let black = data[selectedScoreIndex].black_per;
      let hispanic = data[selectedScoreIndex].hispanic_per;
      let white = data[selectedScoreIndex].white_per;
      let mathScore = data[selectedScoreIndex].sat_math_avg_score;
    
      let highestPercentage = Math.max(asian, black, hispanic, white);
      let popupUrl;
    
      if (highestPercentage == asian || highestPercentage == white) {
        popupUrl = 'EASYpopupinversed.html';
      } else {
        popupUrl = 'newpopupinversed.html';
      }
    
      let popupText =
        `You chose [Math]. The average score for this section at this school is [${mathScore}]. <br><br>
        [${asian}]% Asian<br>
        [${black}]% Black<br>
        [${hispanic}]% Hispanic<br>
        [${white}]% White<br><br>
        <button class="popup-btn-yes"> [Experience] </button> <br>
        <button class="popup-btn-no"> [Leave] </button>
        `;
     
      // create a new div element for the popup
      let popup = createDiv(schoolName);
      popup.parent("#container3"); // set the parent to #container1
      popup.style('background-color', 'black');
      popup.style('border', '2px solid #fc648a');
      //popup.style('text-align', 'left');
      popup.style('padding', '10px');
      popup.child(createP(popupText));
      popup.style('position', 'absolute'); // set position to absolute
      popup.style('left', '50%'); // center horizontally
      popup.style('top', '50%'); // center vertically
      popup.style('transform', 'translate(-50%, -50%)'); // center both horizontally and vertically
     
    
      // apply CSS style to the buttons
      let buttons = popup.elt.getElementsByTagName('button');
      for (let i = 0; i < buttons.length; i++) {
        buttons[i].classList.add('my-btn-style');
      }
    
      // set the position of the container1 div to relative
      let container3 = document.querySelector("#container3");
      container3.style.position = 'relative';
     
      let btnYes = popup.elt.querySelector('.popup-btn-yes');
      btnYes.addEventListener('click', () => {
        // remove the popup element from the DOM
        popup.remove();
        const screenWidth = window.screen.availWidth;
        const screenHeight = window.screen.availHeight;
        const windowWidth = 800;
        const windowHeight = 600;
        const x = (screenWidth - windowWidth) / 2;
        const y = (screenHeight - windowHeight) / 2;
    
        window.open(popupUrl, '_blank', `width=${windowWidth},height=${windowHeight},left=${x},top=${y}`);
      }, 5000);
    
      let btnNo = popup.elt.querySelector('.popup-btn-no');
      btnNo.addEventListener('click', () => {
        popup.remove();
      });
    }

    // gradually slow down the flickering numbers to the target numbers
    for (let i = 0; i < currentNums.length; i++) {
      currentNums[i] = lerp(currentNums[i], targetNums[i], 0.05);
    }}
  
 

  mouseMoved = function() {
    // updating background color on mouse move
    draw();
  }

  mouseReleased = function() {
    // remove the popup when the mouse is released
    selectedScoreIndex = -1;
    draw();
  };

  function updateNum() {
    for (let i = 0; i < math.length; i++) {
      // if the mouse is hovering over the current number, set the current number to the target number
      if (mouseX > 50 && mouseX < 100 && mouseY > 50 + i * 30 && mouseY < 80 + i * 30) {
        currentNums[i] = targetNums[i];
        clearInterval(intervalId); // stop the interval immediately
      } else {
        // otherwise, update the current number with a new random number
        currentNums[i] = random(100, 999);
      }
    }
  }


