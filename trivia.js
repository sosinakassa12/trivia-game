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
let currentQuestion = null;
let tries = 0;
let score  = 0;

scoreDiv.textContent = `You scored ${score} out of ${tries} tries.`;

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

answerBtn.addEventListener('click', () => {
   tries ++;
    if ( answerDiv.value.trim().toLowerCase() === currentQuestion.answer.toLowerCase()){
        score ++;
        feedbackDiv.style.color = 'green';        
        feedbackDiv.textContent = 'You are Correct.';
        scoreDiv.textContent = `You scored ${score} out of ${tries} tries.`;
    }else {
        feedbackDiv.style.color = 'red'; 
        feedbackDiv.textContent = `You are not Correct. the answer is ${currentQuestion.answer}.`;
        scoreDiv.textContent = `You scored ${score} out of ${tries} tries.`;
    }
})

function getTriviaQuestion(){
    return new Promise((resolve, reject) => {
        setTimeout(()=> {
           const index = Math.floor(Math.random() * questions.length);
           const question = questions[index];
           console.log(question);
           if (index > questions.length) {
                reject('An error occurred while fetching the trivia question.');
            } else {
                    resolve(question);
            }
            },1000);        
    });
}

function displayQuestion(triviaQuestion){
    questionDiv.textContent = triviaQuestion.question;
    answerDiv.value = '';
    feedbackDiv.textContent = '';
}

function scoreKeeping(){

}