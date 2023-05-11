let sketch2 = function(p) {
  let myFont;
  let data, url;
  let itemNum = 160;
  let testTakers = [];
  let writing = [];
  let targetNums = [];
  let currentNums = [];
  let textSizeValues = [];

  let num = 10;
  //let delay = 5000; // flcikering numbers delay time in milliseconds
  let intervalId; // interval ID for clearing later
  //let stopTime = 5000; // time to stop in milliseconds
  let decreaseFactor = 1.1; // factor by which the delay is increased

  p.preload = function() {
    url = "js/testscores.json";
    p.loadJSON(url, function(jsonData) {
      console.log(jsonData); // log the data to the console to check if it's loaded correctly
      data = jsonData;
    });
  
    myFont = p.loadFont('fonts/Raj.ttf');
  }

  p.setup = function() {
    p.textFont(myFont);

    p.createCanvas(p.windowWidth, p.windowHeight).parent('container2');
    p.textAlign(p.CENTER, p.CENTER);

    //itemNum = Object.keys(data).length;
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
    intervalId = setInterval(updateNum);
    //setTimeout(stopInterval, stopTime);


  }

  let selectedScoreIndex = -1; // initialize to -1

  p.mousePressed = function() {
    // check if the mouse is over a score
    for (let i = 0; i < writing.length; i++) {
      let x = 50;
      let y = 50 + i * 30;
      if (p.mouseX > x && p.mouseX < x + 50 && p.mouseY > y && p.mouseY < y + 30) {
        selectedScoreIndex = i; // save the index of the selected score
        break;
      }
    }
  };


  
  
  p.draw = function() {
    p.clear();

    // display all of the SAT reading scores
    p.textAlign(p.CENTER, p.CENTER);
    let x = 50;
    let y = 50;
    for (let i = 0; i < writing.length; i++) {
      p.textSize(textSizeValues[i]); 

    // if the mouse is hovering over the current number and change the background color
    if (p.mouseX > x && p.mouseX < x + 50 && p.mouseY > y && p.mouseY < y + 30) {
      p.fill('white');
      // stop flickering numbers on mouse hover
      currentNums[i] = targetNums[i];
    } else {
      p.fill('#fc648a');
    }
    // display the current number
    p.text(p.floor(currentNums[i]), x, y);
    y += 30;


    if (y > p.height - 50) {
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
      let writingScore = data[selectedScoreIndex].sat_writing_avg_score;
    
      let highestPercentage = Math.max(asian, black, hispanic, white);
      let popupUrl;
    
      if (highestPercentage == asian || highestPercentage == white) {
        popupUrl = 'EASYwritinginversed.html';
      } else {
        popupUrl = 'newpopupinversed.html';
      }
    
      let popupText =
        `You chose [Writing]. The average score for this section at this school is [${writingScore}]. <br><br>
        [${asian}]% Asian<br>
        [${black}]% Black<br>
        [${hispanic}]% Hispanic<br>
        [${white}]% White<br><br>
        <button class="popup-btn-yes"> [Experience] </button> <br>
        <button class="popup-btn-no"> [Leave] </button>
        `;
     
      // create a new div element for the popup
      let popup = p.createDiv(schoolName);
      popup.parent("#container2"); // set the parent to #container1
      popup.style('background-color', 'black');
      popup.style('border', '2px solid #fc648a');
      //popup.style('text-align', 'left');
      popup.style('padding', '10px');
      popup.child(p.createP(popupText));
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
      let container2 = document.querySelector("#container2");
      container2.style.position = 'relative';
     
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
      currentNums[i] = p.lerp(currentNums[i], targetNums[i], 0.05);
    }}
  
 

  p.mouseMoved = function() {
    // updating background color on mouse move
    p.draw();
  }

  p.mouseReleased = function() {
    // remove the popup when the mouse is released
    selectedScoreIndex = -1;
    p.draw();
  };

  function updateNum() {
    for (let i = 0; i < writing.length; i++) {
      // if the mouse is hovering over the current number, set the current number to the target number
      if (p.mouseX > 50 && p.mouseX < 100 && p.mouseY > 50 + i * 30 && p.mouseY < 80 + i * 30) {
        currentNums[i] = targetNums[i];
        clearInterval(intervalId); // stop the interval immediately
      } else {
        // otherwise, update the current number with a new random number
        currentNums[i] = p.random(100, 999);
      }
    }
  }


}
new p5(sketch2);


