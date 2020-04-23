let quiz = document.querySelector("#quiz");
let intro = document.querySelector("#introduction");
let assesFT = document.querySelector("#assess-ft");
let startBtn = document.querySelector("#startBtn");
let timeSpan = document.querySelector("#timeSpan");
let questionH5 = document.querySelector("#question");
let answersDiv = document.querySelector("#answers");
let allDone = document.querySelector("#allDone");

let totalSeconds = 10;
let secondsElapsed = 0;
let currentQuestion = 0;
let time = setInterval(timer, 1000);
clearInterval(time);

let quizArray = [
  {
    question: "Question 1 Text Text Text",
    options: [
      "Question 1 - Correct Answer",
      "Question 1 - Option 2 Answer",
      "Question 1 - Option 3 Answer",
    ],
    correct: 0,
  },
  {
    question: "Question 2 Text Text Text",
    options: [
      "Question 2 - Option 1 Answer",
      "Question 2 - Correct Answer",
      "Question 2 - Option 3 Answer",
      "Question 2 - Option 4 Answer",
    ],
    correct: 1,
  },
  {
    question: "Question 3 Text Text Text",
    options: [
      "Question 3 - Option 1 Answer",
      "Question 3 - Option 2 Answer",
      "Question 3 - Correct Answer",
      "Question 3 - Option 4 Answer",
    ],
    correct: 2,
  },
];

init();
startBtn.addEventListener("click", startQuiz);
answersDiv.addEventListener("click", assesSelection);

function init() {
  quiz.style.display = "none";
  allDone.style.display = "none";
  assesFT.style.display = "none";
}

function startQuiz() {
  intro.style.display = "none";
  quiz.style.display = "block";
  time = setInterval(timer, 1000);
  showQuestion();
}

function timer() {
  timeSpan.textContent = totalSeconds - secondsElapsed;
  secondsElapsed++;
  if (secondsElapsed === totalSeconds + 1) {
    clearInterval(time);
    disableQuestions();
    gameOver("time_out");
  }
}

function showQuestion() {
  questionH5.textContent = quizArray[currentQuestion].question;
  for (i = 0; i < quizArray[currentQuestion].options.length; i++) {
    var questionBtn = document.createElement("button");
    questionBtn.setAttribute("type", "button");
    questionBtn.setAttribute(
      "class",
      "list-group-item list-group-item-action list-group-item-primary mt-1 answerButton"
    );
    questionBtn.setAttribute("data-index", i);
    questionBtn.textContent = quizArray[currentQuestion].options[i];
    answersDiv.append(questionBtn);
  }
}

function disableQuestions() {
  let questionsAssed = document.querySelectorAll(".answerButton");
  questionsAssed.forEach((element) => {
    element.setAttribute(
      "class",
      "list-group-item list-group-item-action list-group-item-primary mt-1 answerButton disabled"
    );
    if (
      parseInt(element.getAttribute("data-index")) ===
      quizArray[currentQuestion].correct
    ) {
      element.setAttribute(
        "class",
        "list-group-item list-group-item-action list-group-item-success mt-1 answerButton disabled"
      );
    }
  });
}

function assesSelection(event) {
  if (event.target.matches("button")) {
    var index = parseInt(event.target.getAttribute("data-index"));
    var timeInterval = 1000;
    if (quizArray[currentQuestion].correct === index) {
      displayFTAlert(true);
      disableQuestions();
      currentQuestion++;
      if (currentQuestion === quizArray.length) {
        timeInterval = 5000;
        gameOver("questions_done");
      } else {
        setTimeout(removeQuestionsButtons, 1000);
        setTimeout(showQuestion, 1001);
      }
    } else {
      displayFTAlert(false);
    }
    setTimeout(function () {
      assesFT.style.display = "none";
    }, timeInterval);
  }
}

function displayFTAlert(correct) {
  if (correct) {
    assesFT.setAttribute(
      "class",
      "alert alert-success mt-0 mb-0 pt-0 pb-0 text-center"
    );
    assesFT.innerHTML = "<strong>Correct</strong>";
    assesFT.style.display = "block";
  } else {
    assesFT.setAttribute(
      "class",
      "alert alert-danger mt-0 mb-0 pt-0 pb-0 text-center"
    );
    assesFT.innerHTML =
      "<strong>Incorrect. </strong> 5 secs. discounted. Keep trying!!";
    assesFT.style.display = "block";
  }
}

function removeQuestionsButtons() {
  questionH5.textContent = "";
  var child = answersDiv.lastElementChild;
  while (child) {
    answersDiv.removeChild(child);
    child = answersDiv.lastElementChild;
  }
}

function gameOver(cause) {
  if (cause === "questions_done") {
    console.log("QUESTIONS DONE");
    assesFT.setAttribute(
      "class",
      "alert alert-success mt-0 mb-0 pt-0 pb-0 text-center"
    );
    assesFT.innerHTML = "<strong>Quiz finished</strong> Good luck!";
    clearInterval(time);
  } else if (cause === "time_out") {
    console.log("TIME OUT");
    assesFT.setAttribute(
      "class",
      "alert alert-info mt-0 mb-0 pt-0 pb-0 text-center"
    );
    assesFT.innerHTML = "<strong>Time finished</strong> Good luck!";
  } else {
    return false;
  }
  assesFT.style.display = "block";

  setTimeout(function () {
    quiz.style.display = "none";
    allDone.style.display = "block";
    assesFT.style.display = "none";
  }, 5000);
}
