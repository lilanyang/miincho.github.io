let data, url; 
let itemNum;
let latitudes = [];
let longitudes = [];

let xCoords = [];
let yCoords = [];


function preload(){
  //limit a certain number of entries; only works through API links
  url= "data.json";
  data = loadJSON(url);
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  console.log(data); //prints out everything
  //console.log(data[0]); // prints out value of first squirrel
  //console.log(data[0].x); //accessing first coordinate of the squirrel 
  //console.log(data[0].y);
  //console.log(data[0].date);
}

function draw() {
  background(220);
  

    
  itemNum = Object.keys(data).length; //automatically shows the length of the data set
  

  
  for(let i = 0; i < itemNum; i++){
    latitudes[i] = data[i].Latitude;
    longitudes[i] = data[i].Longitude;
    
    xCoords[i] = map(longitudes[i], -122.28, -90.708, 0, windowWidth);
    yCoords[i] = map(latitudes [i], 22.558, 42.821, 0, windowHeight);
    

    fill("green")
    noStroke();
    
    
    circle(xCoords[i], yCoords[i], 10);

  
  
  //console.log(xCoords[0]);
  //console.log(latitudes);
  }
}