// When "New Question" is clicked:
// - Pick a random question from our list
// - Show that question on the screen
// - Save the correct answer for later

// When "Submit Answer" is clicked:
// - Get what the user typed
// - Compare it to the correct answer
// - If it's right, show "Correct!"
// - If it's wrong, show "Try again"
let questionDiv = document.getElementById('question');
let answerDiv  = document.getElementById('answer');
let questionBtn = document.getElementById('questionBtn');
let answerBtn = document.getElementById('answerBtn');
let feedbackDiv  = document.getElementById('feedback');
let scoreDiv  = document.getElementById('score');
let playerDiv = document.getElementById('player');


let currentQuestion = null;
let currentPlayer = 1;
let scores = { 1: 0, 2: 0 };
let tries = { 1: 0, 2: 0 };
let usedQuestions = [];

updateScoreDisplay();

questionBtn.addEventListener('click', () => {
    getTriviaQuestion()
    .then((question) => {
        currentQuestion = question;
        console.log(currentQuestion);
        displayQuestion(question);
    })
    .catch((error)=> {
        console.log(error);
    })
})

answerBtn.addEventListener('click', () => {
    if (!currentQuestion) return;

    tries[currentPlayer]++;
    const userAnswer = answerDiv.value.trim().toLowerCase();
    const correctAnswer = currentQuestion.answer.toLowerCase();

    if (userAnswer === correctAnswer) {
        scores[currentPlayer]++;
        feedbackDiv.style.color = 'green';
        feedbackDiv.textContent = `Correct, Player ${currentPlayer}!`;
    } else {
        feedbackDiv.style.color = 'red';
        feedbackDiv.textContent = `Incorrect, Player ${currentPlayer}. The answer was "${currentQuestion.answer}".`;
    }

    updateScoreDisplay();
    switchPlayer();
    currentQuestion = null;
});

function getTriviaQuestion() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (usedQuestions.length === questions.length) {
                reject('All questions have been used!');
                return;
            }

            let index;
            do {
                index = Math.floor(Math.random() * questions.length);
            } while (usedQuestions.includes(index));

            usedQuestions.push(index);
            resolve(questions[index]);
        }, 1000);
    });
}


function displayQuestion(triviaQuestion) {
    questionDiv.textContent = triviaQuestion.question;
    answerDiv.value = '';
    feedbackDiv.textContent = '';
}

function updateScoreDisplay() {
    scoreDiv.textContent = `Player 1: ${scores[1]} out of ${tries[1]} tries | Player 2: ${scores[2]} out of ${tries[2]} tries.`;
    playerDiv.textContent = `Current Turn: Player ${currentPlayer}`;
}

function switchPlayer() {
    currentPlayer = currentPlayer === 1 ? 2 : 1;
    updateScoreDisplay();
}