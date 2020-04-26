let quiz = document.querySelector("#quiz");
let intro = document.querySelector("#introduction");
let assesFT = document.querySelector("#assess-ft");
let progressBar = document.querySelector(".progress");
let startBtn = document.querySelector("#startBtn");
let timeSpan = document.querySelector("#timeSpan");
let questionH5 = document.querySelector("#question");
let answersDiv = document.querySelector("#answers");
let allDone = document.querySelector("#allDone");
let finalScore = document.querySelector("#finalScore");
let audioCorrect = document.querySelector("#audioCorrect");
let audioIncorrect = document.querySelector("#audioIncorrect");
let audioApplause = document.querySelector("#audioApplause");
let audioTollingBell = document.querySelector("#audioTollingBell");
let audioThunder = document.querySelector("#audioThunder");
let submit = document.querySelector("#submit");
let highScoresList = document.querySelector("#highScoresList");
let initials = document.querySelector("#initials");
let clearHighscoresBtn = document.querySelector("#clearHighscoresBtn");

let totalSeconds = 100;
let timeRemining = totalSeconds;
let secondsElapsed = 0;
let discountSeconds = 0;
let currentQuestion = 0;
let progress = 0;
let correctAnswers = 0;
let correctScore = 0;
var localHighscoresArray = [];
let time = setInterval(timer, 1000);
let justRegistered = false;
clearInterval(time);

// Based on: laffgaff "DISNEY TRIVIA QUESTIONS AND ANSWERS": https://laffgaff.com/disney-trivia-questions-answers/
let quizArray = [
  {
    question:
      "In The Jungle Book who teaches Mowgli about The Bare Necesseties of life?",
    options: ["Baloo", "xxx", "xxx"],
    correct: 0,
  },
  {
    question: "Cruella de Vil is the villain in which Disney movie?",
    options: ["101 Dalmatians", "xxx", "xxx"],
    correct: 0,
  },
  {
    question:
      "What is the name of the boy who owns Buzz Lightyear in the movie Toy Story?",
    options: ["Andy", "xxx", "xxx"],
    correct: 0,
  },
  {
    question: "Which Disney princess has a raccoon as a sidekick?",
    options: ["Pocahontas", "xxx", "xxx"],
    correct: 0,
  },
  {
    question:
      "In the movie Frozen, which song does Elsa sing as she builds the castle?",
    options: ["Let It Go.", "xxx", "xxx"],
    correct: 0,
  },
  {
    question:
      "In the movie Finding Nemo, which country has Nemo been taken to?",
    options: ["Australia", "xxx", "xxx"],
    correct: 0,
  },
  {
    question: "What is the name of Bambi’s rabbit friend?",
    options: ["Thumper", "xxx", "xxx"],
    correct: 0,
  },
  {
    question: "What does the crocodile swallow in Peter Pan?",
    options: ["A clock.", "xxx", "xxx"],
    correct: 0,
  },
  {
    question:
      "In Peter Pan, did Captain Hook have a hook for his left hand or his right hand?",
    options: ["His left hand.", "xxx", "xxx"],
    correct: 0,
  },
  {
    question:
      "In the movie Dumbo, what type of animal were Dandy Fat Glasses Preacher and Straw Hat??",
    options: ["Crows", "xxx", "xxx"],
    correct: 0,
  },
  {
    question: "What is the name of Donald Duck’s sister?",
    options: ["Dumbella", "xxx", "xxx"],
    correct: 0,
  },
  {
    question: "What does Cinderella’s fairy godmother turn into a carriage?",
    options: ["A pumpkin.", "xxx", "xxx"],
    correct: 0,
  },
  {
    question:
      "Which was the first Disney movie to receive an Oscar nomination for Best Picture?",
    options: ["Beauty and the Beast.", "xxx", "xxx"],
    correct: 0,
  },
  {
    question: "What type of animal does Jasmine have for a pet in Aladdin?",
    options: ["A tiger called Rajah.", "xxx", "xxx"],
    correct: 0,
  },
  {
    question: "What is the name of The Lion King?",
    options: ["Simba", "xxx", "xxx"],
    correct: 0,
  },
  {
    question: "What type of animal is Bernard in The Rescuers?",
    options: ["A mouse.", "xxx", "xxx"],
    correct: 0,
  },
  {
    question: "The song “You Can Fly” is from which Disney movie?",
    options: ["Peter Pan.", "xxx", "xxx"],
    correct: 0,
  },
  {
    question: "What color are Mickey Mouse’s shorts?",
    options: ["Red", "xxx", "xxx"],
    correct: 0,
  },
  {
    question: "What is the wizard’s name in the movie The Sword in the Stone?",
    options: ["Merlin", "xxx", "xxx"],
    correct: 0,
  },
  {
    question: "What does Dumbo use to fly?",
    options: ["A feather.", "xxx", "xxx"],
    correct: 0,
  },
  {
    question:
      "Which was the first full-length animated movie to be released by Disney?",
    options: ["Snow White and the Seven Dwarfs.", "xxx", "xxx"],
    correct: 0,
  },
  {
    question: "In which city is the Disney movie Ratatouille based?",
    options: ["Paris", "xxx", "xxx"],
    correct: 0,
  },
  {
    question: "Scar is a villain in which Disney movie?",
    options: ["The Lion King.", "xxx", "xxx"],
    correct: 0,
  },
  {
    question: "What is Cinderella’s slipper made of?",
    options: ["Glass", "xxx", "xxx"],
    correct: 0,
  },
  {
    question: "In The Jungle Book, what kind of animal is Shere Khan?",
    options: ["A tiger", "xxx", "xxx"],
    correct: 0,
  },
];

init();
startBtn.addEventListener("click", startQuiz);
answersDiv.addEventListener("click", assesSelection);
submit.addEventListener("click", addToHighscores);
clearHighscoresBtn.addEventListener("click", clearHighscores);
$("#staticBackdrop").on("shown.bs.modal", function (e) {
  loadHighScores();
});
$("#staticBackdrop").on("hidden.bs.modal", function (e) {
  if (justRegistered) {
    init();
  }
});

function init() {
  timeSpan.textContent = timeRemining;
  quiz.style.display = "none";
  allDone.style.display = "none";
  assesFT.style.display = "none";
  intro.style.display = "block";
  progressBar.style.display = "none";

  totalSeconds = 100;
  timeRemining = totalSeconds;
  secondsElapsed = 0;
  discountSeconds = 0;
  currentQuestion = 0;
  progress = 0;
  correctAnswers = 0;
  correctScore = 0;
  justRegistered = false;
  timeSpan.textContent = timeRemining;

  localHighscoresArray = localStorage.getItem("highscore").split(",");
  clearInterval(time);
  updateProgress();

  allDone.firstElementChild.setAttribute("class", "alert alert-info mt-0 mb-0");
  submit.setAttribute("class", "btn btn-info");
  progressBar.firstElementChild.setAttribute(
    "class",
    "progress-bar bg-info progress-bar-striped progress-bar-animated"
  );
}

function startQuiz() {
  intro.style.display = "none";
  quiz.style.display = "block";
  time = setInterval(timer, 1000);
  progressBar.style.display = "block";
  showQuestion();
}

function timer() {
  timeRemining = totalSeconds - secondsElapsed - 1 - discountSeconds;
  timeSpan.textContent = timeRemining;
  secondsElapsed++;
  if (timeRemining <= 0) {
    clearInterval(time);
    disableQuestions();
    gameOver("time_out");
  }
}

function showQuestion() {
  questionH5.textContent = quizArray[currentQuestion].question;
  var optionsBtnsArray = [];
  var indexArray = [];
  for (i = 0; i < quizArray[currentQuestion].options.length; i++) {
    var questionBtn = document.createElement("button");
    questionBtn.setAttribute("type", "button");
    questionBtn.setAttribute(
      "class",
      "list-group-item list-group-item-action list-group-item-info mt-1 answerButton"
    );
    questionBtn.setAttribute("data-index", i);
    if (i === 0) {
      questionBtn.setAttribute("correct", "yes");
    } else {
      questionBtn.setAttribute("correct", "no");
    }
    questionBtn.textContent = quizArray[currentQuestion].options[i];
    answersDiv.append(questionBtn);
    indexArray.push(i);
  }

  answersDiv.childNodes.forEach(function (child) {
    var rndIndex = Math.floor(Math.random() * indexArray.length);
    answersDiv.append(answersDiv.children[rndIndex]);
    indexArray.splice(rndIndex, 1);
  });
}

// Source: w3resource "JavaScript: Randomly arrange or shuffle an array": https://www.w3resource.com/javascript-exercises/javascript-array-exercise-17.php
function shuffle(arra1) {
  var ctr = arra1.length,
    temp,
    index;

  // While there are elements in the array
  while (ctr > 0) {
    // Pick a random index
    index = Math.floor(Math.random() * ctr);
    // Decrease ctr by 1
    ctr--;
    // And swap the last element with it
    temp = arra1[ctr];
    arra1[ctr] = arra1[index];
    arra1[index] = temp;
  }
  return arra1;
}

function disableQuestions() {
  let questionsAssed = document.querySelectorAll(".answerButton");
  questionsAssed.forEach((element) => {
    element.setAttribute(
      "class",
      "list-group-item list-group-item-action list-group-item-danger mt-1 answerButton disabled"
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
    disableQuestions();
    console.log(event.target.getAttribute("correct"));
    if (event.target.getAttribute("correct") === "yes") {
      displayFTAlert(true);
      correctAnswers++;
    } else {
      discountSeconds += 3;
      clearInterval(time);
      time = setInterval(timer, 1000);
      displayFTAlert(false);
    }
    currentQuestion++;
    updateProgress();

    if (currentQuestion === quizArray.length) {
      timeInterval = 5000;
      gameOver("questions_done");
    } else {
      setTimeout(removeQuestionsButtons, 1000);
      setTimeout(showQuestion, 1001);
    }

    setTimeout(function () {
      assesFT.style.display = "none";
    }, timeInterval);
  }
}

function updateProgress() {
  progress = Math.floor((currentQuestion / quizArray.length) * 100);
  var styleStr = String("width: " + progress + "%; height: 100%;");
  progressBar.firstElementChild.setAttribute("style", styleStr);
  progressBar.firstElementChild.textContent = progress + " %";
  correctScore = Math.floor((correctAnswers / quizArray.length) * 100);
}

function displayFTAlert(correct) {
  if (correct) {
    audioCorrect.play();
    assesFT.setAttribute(
      "class",
      "alert alert-success mt-0 mb-0 pt-0 pb-0 text-center"
    );
    assesFT.innerHTML = "<strong>Correct</strong>";
    assesFT.style.display = "block";
  } else {
    audioIncorrect.play();
    assesFT.setAttribute(
      "class",
      "alert alert-danger mt-0 mb-0 pt-0 pb-0 text-center"
    );
    assesFT.innerHTML =
      "<strong>Incorrect. </strong> 3 secs. discounted. Keep trying!!";
    assesFT.style.display = "block";
    timeSpan.style.color = "red";
    setTimeout(function () {
      timeSpan.style.color = "black";
    }, 1000);
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
    setTimeout(() => {
      assesFT.setAttribute(
        "class",
        "alert alert-dark mt-0 mb-0 pt-0 pb-0 text-center"
      );
      assesFT.innerHTML = "<strong>Quiz finished</strong> Good luck!";
    }, 1500);
    clearInterval(time);
  } else if (cause === "time_out") {
    console.log("TIME OUT");
    audioTollingBell.play();
    setTimeout(() => {
      audioTollingBell.pause();
    }, 4000);
    assesFT.setAttribute(
      "class",
      "alert alert-info mt-0 mb-0 pt-0 pb-0 text-center"
    );
    assesFT.innerHTML = "<strong>Time finished</strong> Good luck!";
  } else {
    return false;
  }
  assesFT.style.display = "block";
  if (correctScore >= 70) {
    setTimeout(() => {
      audioApplause.play();
    }, 5000);
  } else {
    setTimeout(() => {
      audioThunder.play();
      allDone.firstElementChild.setAttribute(
        "class",
        "alert alert-danger mt-0 mb-0"
      );
      progressBar.firstElementChild.setAttribute(
        "class",
        "progress-bar bg-danger progress-bar-striped progress-bar-animated"
      );
      submit.setAttribute("class", "btn btn-danger");
    }, 5000);
  }
  setTimeout(function () {
    finalScore.textContent = correctScore;
    quiz.style.display = "none";
    allDone.style.display = "block";
    assesFT.style.display = "none";
    removeQuestionsButtons();
  }, 5000);
}

function addToHighscores() {
  var highScoreElement = document.createElement("li");
  var highscoreStr = initials.value + " - " + correctScore;
  localHighscoresArray.push(highscoreStr);
  var highscoreArrayStr = localHighscoresArray.toString();
  highScoreElement.textContent = highscoreStr;
  highScoresList.append(highScoreElement);
  localStorage.setItem("highscore", localHighscoresArray);
  justRegistered = true;
  initials.value = "";
  // Modal
  $("#staticBackdrop").modal("show");
}

function loadHighScores() {
  while (highScoresList.hasChildNodes()) {
    highScoresList.removeChild(highScoresList.childNodes[0]);
  }
  var localScore = 0;
  for (i = 0; i < localHighscoresArray.length; i++) {
    var highScoreElement = document.createElement("li");
    highScoreElement.textContent = localHighscoresArray[i];
    for (j = 2; j >= 0; j--) {
      var lastPos = localHighscoresArray[i].length - 1;
      var lastChar = localHighscoresArray[i][lastPos - j];
      if (lastChar && lastChar >= 0 && lastChar <= 9) {
        localScore += lastChar;
      }
      localScore = parseInt(localScore);
    }
    if (localScore >= 70) {
      highScoreElement.setAttribute(
        "class",
        "list-group-item list-group-item-info"
      );
    } else {
      highScoreElement.setAttribute(
        "class",
        "list-group-item list-group-item-danger"
      );
    }
    localScore = 0;
    highScoresList.append(highScoreElement);
  }
}

function clearHighscores() {
  localHighscoresArray = [];
  localStorage.setItem("highscore", localHighscoresArray);
  loadHighScores();
}

sortScores();
let numberLocalHighscoresArray = [];
function sortScores() {}
