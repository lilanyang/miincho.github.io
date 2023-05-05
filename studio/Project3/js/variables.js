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
let textSizeValues = []; // array to store the text sizes for the reading scores
