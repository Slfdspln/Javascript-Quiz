// variable to control time which will also be users score
let timer = 30;
let countdown;

// variable and array to control questions
let currentquestion = 0
let questions = [
  {
    question: "Which of the following statements is true about JavaScript variables?",
    choices: ["a: Javascript variables are declared using the 'var' keyword.", "b: JavaScript variables are case-sensitive.", "c: JavaScript variables can only store string values.", "d: JavaScript variables cannot be reassigned after they are declared."],
    answer: "b: JavaScript variables are case-sensitive."
  },
  {
    question: "Which of the following is NOT a valid data type in JavaScript?",
    choices: ["a: string", "b: number", "c: boolean", "d: array"],
    answer: "d: array"
  },
  {
    question: "What is the correct syntax for creating a new object in Javascript?",
    choices: ["a: var obj = {};", "b: var obj = ();", "c: var obj = [];", "d: var obj = new Object();"],
    answer: "a: var obj = {};"
  },
  {
    question: "Which of the following statements is used to test a specific condition and execute a block of code if the condition is true in JavaScript?",
    choices: ["a: for loop", "b: if statement", "c: switch statement", "d: while loop"],
    answer: "b: if statement"
  },
]

// function to display question and choices the user can select from
function displayQuestion() {
document.getElementById('question-text').innerText = questions[currentquestion].question
document.getElementById('btn1').innerText = questions[currentquestion].choices[0]
document.getElementById('btn2').innerText = questions[currentquestion].choices[1]
document.getElementById('btn3').innerText = questions[currentquestion].choices[2]
document.getElementById('btn4').innerText = questions[currentquestion].choices[3]
}

// funtion that displays start-container element and starts timer when start button is clicked. It also clears the timer and ends the quiz if time runs out.
function startQuiz() {
	document.getElementById('start-container').style.display = 'none';
	document.getElementById('quiz-form').style.display = 'block';
  displayQuestion()
	countdown = setInterval(function() {
		timer--;
		document.getElementById('timer').textContent = timer + ' seconds remaining';
		if (timer <= 0) {
			clearInterval(countdown);
			document.getElementById('timer').textContent = 'Time is up!';
      displayScoringScreen();
		}
	}, 1000);
}

// function that checks if the answer selected is correct or not. If it is incorrect, timer is reduced by 5 seconds. If it is the last question, the quiz ends and the scoring-screen element is displayed.
function checkAnswer(event) {
console.log(event)
let selected = event.target.innerText
let correct = questions[currentquestion].answer
if (selected !== correct){
timer -= 5}

if (currentquestion === questions.length - 1){
  document.getElementById('quiz-form').style.display = 'none';
  clearInterval(countdown);
  displayScoringScreen();
}

currentquestion++
displayQuestion()
}

// event listeners for buttons
document.getElementById('btn1').addEventListener('click', checkAnswer)
document.getElementById('btn2').addEventListener('click', checkAnswer)
document.getElementById('btn3').addEventListener('click', checkAnswer)
document.getElementById('btn4').addEventListener('click', checkAnswer)


// funtion that displays scoring-screen element and displays the users score
function displayScoringScreen() {
  document.getElementById('quiz-form').style.display = 'none';
  document.getElementById('scoring-screen').style.display = 'block';
  document.getElementById('finalscore').textContent = "You Scored" + " " + timer + " " + "points!";
}

// function that displays highscores-screen element and displays highscores from local storage if there are any saved scores in local storage already
function displayHighScoreScreen() {
  document.getElementById('scoring-screen').style.display = 'none';
  document.getElementById('highscore-screen').style.display = 'block';
  let scores = JSON.parse(localStorage.getItem('highscore'))||[]
  scores.forEach(score => {
    let li = document.createElement('li');
    li.textContent = score.initials + ' - ' + score.score;
    document.getElementById('highscore-list').appendChild(li);
  })
}

// event listener for submit button
document.getElementById('submit').addEventListener('click', handleFormSubmit);

// function that saves score to local storage
function saveScore() {
  let initials = document.getElementById('initials').value;
  let scoreObj = {
    initials: initials,
    score: timer
  }
  let scores = JSON.parse(localStorage.getItem('highscore'))||[]
  scores.push(scoreObj);
  localStorage.setItem('highscore', JSON.stringify(scores));
}



// function that calls saveScore() and displayHighScoreScreen() and prevents the form from refreshing the page when submit button is clicked
function handleFormSubmit(event) {
  event.preventDefault();
  saveScore();
  displayHighScoreScreen();
}


// function that clears scores from local storage and highscores-screen element when clear button is clicked
function clearHighScores() {
  localStorage.clear();
  document.getElementById('highscore-list').innerHTML = '';
}

// function that resets the quiz and displays the start-container element when the reset button is clicked and refreshes the page
function resetQuiz() {
  timer = 30;
  score = 0;
  currentquestion = 0;
  displayQuestion();
  document.getElementById('highscore-screen').style.display = 'none';
  document.getElementById('start-container').style.display = 'block';
  location.reload();
}