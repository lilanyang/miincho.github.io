
function preload(){
font = loadFont('fonts/DMMono-Regular.otf');
}


let gridSize = 4;
let points = [];
let font;




    function setup() {
        createCanvas(windowWidth, windowHeight);

        
        background(255);
        textFont(font);
        textSize(60);
        textAlign(LEFT);
        fill(0);
        noStroke();
        textWrap(WORD);
 
    text('The mind acts, the mind wills a poem, often against our own will; somehow this happens, somehow a poem gets written in the middle of a chaotic holiday party that has just run out of ice, and its your house. ', 90, 60, 800);
   // text(' “The poem is an interpretation of weird theatrical shit.” the weird theatrical shit is what goes on around us every day of our lives; an animal of only instinct, Johnny Ferret, has in his actions drama, but no theater; theater requires that you draw a circle around  the action and observe it from outside the circle; in other words, self-consciousness is theatre.', width/2, height/2);


      
        loadPixels();
        for (let y=0; y<height; y+=gridSize) {
          for(let x=0; x<width; x+=gridSize){
            let px = get(x,y);
            let r = px[0];
            if (r < 127) {
              points.push( createVector(x,y) );
          }
         }   
        }
      console.log(points);
    }

    function draw() {
        background(0);
        
      
    let = mutationAmt = map( mouseX, 0, width, 1, width/200);
      randomSeed(0);
      
      
      
      
        for (let i=0; i<points.length; i++) {
          let x=points[i].x;
          let y=points[i].y;
          x += random(-mutationAmt, mutationAmt);
          y += random(-mutationAmt, mutationAmt);
          


          
          fill(220);
          stroke (0,100);
          circle(x,y, gridSize);
        }
    }