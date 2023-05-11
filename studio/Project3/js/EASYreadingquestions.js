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
        question: "The range of colors that homeowners could use on the exterior of their houses was ____ by the community's stringent rules regarding upkeep of property. ",
        answers: {
          a: "circumscribed",
          b: "bolstered",
          c: "embellished",
          d: "insinuated",
          e: "cultivated"
        },
        correctAnswer: "a"
      },
  
      {
        question: "Nightjars possess a camoflauge perhaps unparalleled in the bird world: by day they roost hidden in shady woods, so ____ with their surroundings that they are nearly impossible to ____.",
        answers: {
          a: "vexed...dislodge",
          b: "blended...discern",
          c: "harmonized...interrupt",
          d: "impatient...distinguish",
          e: "integrated...classify"
        },
        correctAnswer: "b"
      },
      {
        question: "Many economists believe that since resources are scarce and since human desires cannot all be ____, a method of ____ is needed.",
        answers: {
          a: "indulged...apportionment",
          b: "verified...distribution",
          c: "usurped...expropriation",
          d: "expressed...reparation",
          e: "anticipated...advertising"
        },
        correctAnswer: "a"
      },
      {
        question: "While traveling near the Sun, the comet Hale-Bopp produced a ____ amount of dust, much more than the comets Halley or Hyakutake",
        answers: {
          a: "voracious",
          b: "disposable",
          c: "redundant",
          d: "superficial",
          e: "prodigious"
        },
        correctAnswer: "e"
      },
      
      {
        question: "No longer narrowly preoccuupied with their own national pasts, historians are increasingly ____ in that they often take a transnational perspective.",
        answers: {
          a: "conciliatory",
          b: "bombastic",
          c: "mendacious",
          d: "cosmopolitan",
          e: "jocular"
        },
        correctAnswer: "d"
      },
  
      {
        question: "Although the administration repeatedly threatened to use its authoirty in order to ____ the student protestors into submission, they refused to be intimidated.",
        answers: {
          a: "ease",
          b: "delude",
          c: "cajole",
          d: "bully",
          e: "nudge"
        },
        correctAnswer: "d"
      },
  
      {
        question: "Only after the campaign volunteers became aware of their candidate's questionable motives could they recognize the ____ statements made in his seemingly ____ speeches.",
        answers: {
          a: "insightful...astute",
          b: "partisan...callous",
          c: "cordial...hostile",
          d: "duplicitous...candid",
          e: "cunning...surreptitious"
        },
        correctAnswer: "d"
      },
  
      {
        question: "The professor commented to other faculty members that Sheila seemed temperamentally suited to the study of logic, given her ____ for ____ intricate arguments.",
        answers: {
          a: "sympathy...influencing",
          b: "penchant...evading",
          c: "disregard...unhinging",
          d: "contempt...following",
          e: "bent...analyzing"
        },
        correctAnswer: "e"
      },
  
      {
        question: "Critics dismissed the engineer's seemingly creative design as being ____, that is, underdeveloped and lacking in sophistication.",
        answers: {
          a: "defunct",
          b: "unorthodox",
          c: "simplistic",
          d: "erroneous",
          e: "ambiguous"
        },
        correctAnswer: "c"
      }
  ];

  // Kick things off
  buildQuiz();

  // Event listeners
  submitButton.addEventListener('click', showResults);
})();