(function(){

    // Declare shuffledQuestions in the outer scope
    let shuffledQuestions;

    function buildQuiz(){
  
        // variable to store the HTML output
        const output = [];
      
        // randomly select 5 questions from myQuestions
        shuffledQuestions = myQuestions.sort(() => 0.5 - Math.random()).slice(0, 5);
      
        // for each question...
        shuffledQuestions.forEach(
          (currentQuestion, questionNumber) => {
      
            // variable to store the list of possible answers
            const answers = [];
      
            // and for each available answer...
            for(letter in currentQuestion.answers){
      
              // ...add an HTML radio button
              answers.push(
                `<label>
                  <input type="radio" name="question${questionNumber}" value="${letter}">
                  ${letter} :
                  ${currentQuestion.answers[letter]}
                  ${letter === currentQuestion.correctAnswer ? `<span style="color:white;">(Correct Answer)</span>` : ''}
                </label>`
              );
            }
      
            // add this question and its answers to the output
            output.push(
              `<div class="question"> ${currentQuestion.question} </div>
              <div class="answers"> ${answers.join('')} </div>`
            );
          }
        );
        // finally combine our output list into one string of HTML and put it on the page
        quizContainer.innerHTML = output.join('');
      }

function showResults(){
  // gather answer containers from our quiz
  const answerContainers = quizContainer.querySelectorAll('.answers');

  // keep track of user's answers
  let numCorrect = 0;

  // for each question...
  shuffledQuestions.forEach( (currentQuestion, questionNumber) => {
    // find selected answer
    const answerContainer = answerContainers[questionNumber];
    const selector = `input[name=question${questionNumber}]:checked`;
    const userAnswer = (answerContainer.querySelector(selector) || {}).value;

    // if answer is correct
    if(userAnswer === currentQuestion.correctAnswer){
      // add to the number of correct answers
      numCorrect++;
      // color the answers green
      answerContainers[questionNumber].style.color = 'lightgreen';
    }
    // if answer is wrong or blank
    else{
      // color the answers red
      answerContainers[questionNumber].style.color = 'red';
    }
  });

  // show the score based on the number of correct answers
  let score = 0;
  if (numCorrect === 5) {
    score = 600;
  } else if (numCorrect === 4) {
    score = 450;
  } else if (numCorrect === 3) {
    score = 300;
  } else if (numCorrect === 2) {
    score = 150;
  } else if (numCorrect === 1) {
    score = 50;
  }

  resultsContainer.innerHTML = `You scored ${score} on the Math section.`;
}

  const quizContainer = document.getElementById('quiz');
  const resultsContainer = document.getElementById('results');
  const submitButton = document.getElementById('submit');
  //const modules = document.getElementById('modules');
  const directions = document.getElementById('directions');
  const ready = document.getElementById('ready');

  const yesButton = document.getElementById('yes');
  var timer = document.getElementById("timer");
  var countdown;
  
  yesButton.addEventListener('click', function() {
    quizContainer.style.display = "block";
    submitButton.style.display = "block";
    resultsContainer.style.display = "block";
    //modules.style.display = "none";
    directions.style.display="none";
    ready.style.display="none";


    countdown = setInterval(function() {
      var time = timer.innerHTML.split(":");
      var minutes = parseInt(time[0]);
      var seconds = parseInt(time[1]);
      if (seconds == 0) {
          if (minutes == 0) {
              clearInterval(countdown);
              alert("Time's up!");
              return;
          } else {
              minutes--;
              seconds = 59;
          }
      } else {
          seconds--;
      }
      timer.innerHTML = (minutes < 10 ? "0" + minutes : minutes) + ":" + (seconds < 10 ? "0" + seconds : seconds);
  }, 1000);
  });


  submitButton.addEventListener('click', function() {
    clearInterval(countdown); // stop the timer
    showResults(); // show the quiz results
    quizContainer.style.display = "none";

    submitButton.style.display = "none";
  });



const myQuestions = [
  {
    question: "In a certain store, the regular price of a refrigerator is $600. How much money is saved by buying this refrigerator at 20 percent off the regular price rather than buying it on sale at 10 percent off the regular price with an additional discount of 10 percent off the sale",
    answers: {
      a: "$6",
      b: "$12",
      c: "$24",
      d: "$54",
      e: "$60"
    },
    correctAnswer: "a"
  },
  {
    question: "What is the greatest possible area of a triangle with one side of length 7 and another side of length 10?",
    answers: {
      a: "17",
      b: "34",
      c: "35",
      d: "70",
      e: "140"
    },
    correctAnswer: "c"
  },
  {
    question: "if j, k, and n are consecutive integers such that 0 < j < k < n and the units (ones) digit of the product jn is 9, what is the units digit of k?",
    answers: {
      a: "0",
      b: "1",
      c: "2",
      d: "3",
      e: "4"
    },
    correctAnswer: "a"
  },
  {
    question: "if t is a number greater than 1, then t^2 is how much greater than t?",
    answers: {
      a: "1",
      b: "2",
      c: "t",
      d: "t(t-1)",
      e: "(t-1)(t+1)"
    },
    correctAnswer: "d"
  },
  {
    question: "The height of a right circular cylinder is 5 and the diameter of its base is 4. What is the distance from the center of one base to a point on the circumference of the other base?",
    answers: {
      a: "3",
      b: "5",
      c: "√(29)",
      d: "√(33)",
      e: "√(41)"
    },
    correctAnswer: "c"
  },
  {
    question: "A total of 120,000 votes were cast for 2 opposing candidates, Garcia and Perez. If Garcia won by a ratio of 5 to 3, what was the number of votes cast for Perez?",
    answers: {
      a: "15,000",
      b: "30,000",
      c: "45,000",
      d: "75,000",
      e: "80,000"
    },
    correctAnswer: "c"
  },
  {
    question: "If the function f is defined by f(x) = 3x+4, then 2f(x) +4 = ",
    answers: {
      a: "5x+4",
      b: "5x+8",
      c: "6x+4",
      d: "6x+8",
      e: "6x+12"
    },
    correctAnswer: "e"
  },
  {
    question: "The average (arithmetic mean) of t and y is 15, and the average of w and x is 15. What is the average of t,w,x, and y?",
    answers: {
      a: "7.5",
      b: "15",
      c: "22.5",
      d: "30",
      e: "60"
    },
    correctAnswer: "b"
  },
  {
    question: "The average (arithmetic mean) of t and y is 15, and the average of w and x is 15. What is the average of t,w,x, and y?",
    answers: {
      a: "7.5",
      b: "15",
      c: "22.5",
      d: "30",
      e: "60"
    },
    correctAnswer: "b"
  },
  {
    question: "Let ▽x be defined as x + 1/x for all nonzero integers x. if ▽x = t, where t is an integer, which of the following is a possible value of t?",
    answers: {
      a: "1",
      b: "0",
      c: "-1",
      d: "-2",
      e: "-3"
    },
    correctAnswer: "d"
  },
  {
    question: "If x and y are integers, 7 < y < 16, and x/y = 2/5, how many possible values are there for x?",
    answers: {
      a: "one",
      b: "two",
      c: "three",
      d: "four",
      e: "five"
    },
    correctAnswer: "b"
  },
  {
    question: "Two spheres, one with radius 7 and one with radius 4, are tangent to each other If P is any point on one sphere and Q is any point on the other sphere, what is the maximum possible length of line PQ? ",
    answers: {
      a: "7",
      b: "11",
      c: "14",
      d: "18",
      e: "22"
    },
    correctAnswer: "e"
  }
  ];

  // Kick things off
  buildQuiz();

  // Event listeners
  submitButton.addEventListener('click', showResults);
})();