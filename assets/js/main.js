const questions = [
    {
        question: "When was the United States Bowling Congress (USBC) established?",
        options: ["1895", "1923", "1978", "2005"],
        correctAnswer: "2005"
    },
    {
        question: "What is the maximum score you can achieve in bowling?",
        options: ["200", "300", "299", "250"],
        correctAnswer: "300"
    },
    {
        question: "Who currently holds the record for most PBA tour titles?",
        options: ["Walter Ray Williams Jr.", "Earl Anthony", "Pete Weber", "Norm Duke"],
        correctAnswer: "Walter Ray Williams Jr."
    },
    {
        question: "What is the name of the bowling ball company that is endorced by professional bowler Jason Belmonte?",
        options: ["Storm", "Brunswick", "Ebonite", "Roto Grip"],
        correctAnswer: "Storm"
    },
    {
        question: "What is the maximum weight of a bowling ball?",
        options: ["10 lbs", "15 lbs", "16 lbs", "25 lbs"],
        correctAnswer: "16 lbs"
    }
];

let currentQuestionIndex = 0;
let score = 0;
let timer;
let timeRemaining = 30; // Initial time in seconds


function startQuiz() {
    document.getElementById("start-container").style.display = "none";
    document.getElementById("question-container").style.display = "block";
    showQuestion();
    startTimer();
}

function startTimer() {
    // Set a 1-second interval to update the timer
    timer = setInterval(() => {
        timeRemaining--;
        updateTimer();

        if (timeRemaining === 0) {
            endQuiz();
        }
    }, 1000);
}

function updateTimer() {
    // Update the timer display on the page
    document.getElementById("timer-span").textContent = timeRemaining;
}

function resetTimer() {
    // Reset the timer for the next question
    clearInterval(timer);
    timeRemaining = 30;
    updateTimer();
    startTimer();
}

function endQuiz() {
    // End the quiz when the timer reaches zero
    clearInterval(timer);
    showResult();
}

function showQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    document.getElementById("question-text").textContent = currentQuestion.question;

    const optionsContainer = document.getElementById("options-container");
    optionsContainer.innerHTML = "";

    currentQuestion.options.forEach((option, index) => {
        const button = document.createElement("button");
        button.textContent = option;
        button.onclick = () => checkAnswer(option);
        optionsContainer.appendChild(button);
    });
}

function checkAnswer(userAnswer) {
    const currentQuestion = questions[currentQuestionIndex];
    if (userAnswer === currentQuestion.correctAnswer) {
        score++;
    }

    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showResult();
    }
}

function showResult() {
    document.getElementById("question-container").style.display = "none";
    document.getElementById("result-container").style.display = "block";
    document.getElementById("score").textContent = score;

    saveHighScore();
}

function saveHighScore() {
    const playerName = prompt('Enter your name:');
    const highScores = JSON.parse(localStorage.getItem('highScores')) || [];

    highScores.push({ name: playerName, score: score });
    highScores.sort((a, b) => b.score - a.score);
    highScores.splice(10); // Keep only the top 10 scores

    localStorage.setItem('highScores', JSON.stringify(highScores));
}

function restartQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    document.getElementById("result-container").style.display = "none";
    document.getElementById("start-container").style.display = "block";
}

function viewHighScores() {
    // Navigate to the high score page
    window.location.href = "highscores.html";
}
