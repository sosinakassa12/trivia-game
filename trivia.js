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
let currentQuestion = null;

questionBtn.addEventListener('click', () => {
    getTriviaQuestion()
    .then((question) => {
        currentQuestion = question;
        displayQuestion(question);
    })
    .catch((error)=> {
        console.log(error);
    })
})

function getTriviaQuestion(){
    return new Promise((resolve, reject) => {
        setTimeout(()=> {
           const index = Math.floor(Math.random() * questions.length);
           const question = questions[index];
           if (index > questions.length) {
                reject('An error occurred while fetching the trivia question.');
            } else {
                    resolve(question);
            }
            },1000);        
    });
}

function displayQuestion(triviaQuestion ){
    questionDiv.textContent(triviaQuestion.question);
    answerDiv.value('');
    feedbackDiv.textContent('');
}