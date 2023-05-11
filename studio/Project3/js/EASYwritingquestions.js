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
    score = 800;
  } else if (numCorrect === 4) {
    score = 650;
  } else if (numCorrect === 3) {
    score = 400;
  } else if (numCorrect === 2) {
    score = 350;
  } else if (numCorrect === 1) {
    score = 200;
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
        question: "The article featured the Sea Islands because [many were known there to live] much as their ancestors of a century ago had lived.",
        answers: {
          a: "many were known there to live",
          b: "they were known there for living",
          c: "many of the people there were known to live",
          d: "of the many people, they were there living",
          e: "of knowing that many people lived there"
        },
        correctAnswer: "c"
      },
      {
        question: "When for the first time the United States imported more oil than it exported, Americans should have realized that an energy crisis [was imminent and could hapen in the future].",
        answers: {
          a: "was imminent and could happen in the future",
          b: "could happen imminently in the future",
          c: "will be imminent and happening soon",
          d: "is an imminent thing",
          e: "might be imminent"
        },
        correctAnswer: "e"
      },
      {
        question: "Intimacy, love, and marriage are three [different, if interrelated, subjects].",
        answers: {
          a: "different, interrelated, subjects",
          b: "interrelated subjects, being, however, different",
          c: "different subjects, wheras they are interrelated",
          d: "different subjects when interrelated",
          e: "subjects that are different although being interrelated"
        },
        correctAnswer: "a"
      },

      {
        question: "Meals prepared by the Algonquin Indians, who were farmers as well as hunrers, included more maize and [pumpkin than other Indian tribes].",
        answers: {
          a: "pumpkin than other Indian tribes",
          b: "pumpkin than did those prepared by other Indian tribes",
          c: "pumpkin than that which other Indian tribes did",
          d: "pumpkin, and this was not the same as other Indian tribes",
          e: "pumpkin; and other Indian tribes did not prepare meals in this way"
        },
        correctAnswer: "b"
      },

      {
        question: "Born of Ibuza parents in Nigeria, novelist Buchi Emecheta moved to England in [1962, since which she has lived in North London].",
        answers: {
          a: "1962, since which she has livedin North London",
          b: "1962 and has lived since then in North London",
          c: "1962,since then she has lived in North London",
          d: "1962 and lived since then in North London",
          e: "1962, and living in North London since that time"
        },
        correctAnswer: "b"
      },

      {
        question: "Among the most flavorful cuisines in the United States, [New Orleaans has also become] one of the most popular.",
        answers: {
          a: "New Orleans has also become",
          b: "New Orleans has also become famous as",
          c: "the cuisine of New Orleans is also",
          d: "cuisines in New Orleans also have become",
          e: "also the cuisine of New Orleans is"
        },
        correctAnswer: "c"
      },

      {
        question: "Medical insurance coverage [that requires high monthly premiums and that is] beyond the financial means of many people.",
        answers: {
          a: "that requires high monthly premiums and that is",
          b: "that requires high monthly premiums and it is",
          c: "requiring high monthly premiums are",
          d: "with the requirements of high monthly premiums are",
          e: "that requires high monthly premiums is"
        },
        correctAnswer: "e"
      },

      {
        question: "Traditional Jamaican music, enriched with rock, jazz, and other modern ryhtms from America, [were the basis for] reggae.",
        answers: {
          a: "were the basis for",
          b: "have been a basis for",
          c: "become the basis of",
          d: "was the basis for",
          e: "being the basis of"
        },
        correctAnswer: "d"
      },
      
      {
        question: "The charges against the organization are being investigated by a [committee, it includes] several senators.",
        answers: {
          a: "committee, it includes",
          b: "committee; it including",
          c: "committee, and it will include",
          d: "committee, they include",
          e: "committee that includes"
        },
        correctAnswer: "e"
      },

      {
        question: "Spread by rat fleas, [millions of people in medieval Europe were killed by bubonic plague].",
        answers: {
          a: "millions of people in medieval Europe were killed by bubonic plague",
          b: "and millions of medieval Europeans killed by bubonic plague",
          c: "this led to the killing of millions of medieval Europeans by bubonic plague",
          d: "bubonic plague in medieval Europe was why millions of people were killed",
          e: "bubonic plague killed millions of people in medieval Europe"
        },
        correctAnswer: "e"
      }
  ];

  // Kick things off
  buildQuiz();

  // Event listeners
  submitButton.addEventListener('click', showResults);
})();