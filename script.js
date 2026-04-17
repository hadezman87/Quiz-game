const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");
const startButton = document.getElementById("start-btn");
const questionText = document.getElementById("question-text");
const answersContainer = document.getElementById("answer-container");
const currentQuestionSpan = document.getElementById("current-question");
const totalQuestionsSpan = document.getElementById("total-questions");
const scoreSpan = document.getElementById("score");
const finalScoreSpan = document.getElementById("final-score");
const maxScoreSpan = document.getElementById("max-score");
const resultMessage = document.getElementById("result-message");
const restartButton = document.getElementById("restart-btn");
const progressBar = document.getElementById("progress");

const quizQuestions = [
    {
        question: "What is the capital of France?",
        answers: [
            { text: "London", correct: false},
            { text: "Berlin", correct: false },
            { text: "Honkong", correct: false },
            { text: "Paris", correct: true },
        ],
 },
 
    {
        question: "what is the largest ocean on th earth",
        answers: [
            { text: "Antalatic ocean", correct: false },
            { text: "Indian ocean", correct: false },
            { text: "Pacific ocean", correct: true }, 
            { text: "Madrid ocean", correct: false },
        ],
    },

    {
        question: "When was Kenyan constitution changed",
        answers: [
            { text: "1998", correct: false },
            { text: "2007", correct: false },
            { text: "2010", correct: true },
            { text: "1968", correct: false },  
        ],
    },

    {
        question: "How many countries is in Africa",
        answers: [
            { text: "55", correct: false },
            { text: "58", correct: true },
            { text: "65", correct: false },
            { text: "63", correct: false },
        ],
    },

    {
        question: "Who is the first prime-minister of Kenya",
        answers: [
            { text: "Ronald Ngala", correct: false },
            { text: "Raila Odinga", correct: true },
            { text: "Tom mboya", correct: false },
            { text: "Gorge Saitoti", correct: false },
        ],
    },

];

//Quiz state Vars
let currentQuestionIndex = 0;
let score = 0;
let answerDisabled = false;

totalQuestionsSpan.textContent = quizQuestions.length;
maxScoreSpan.textContent = quizQuestions.length;

//event listeners

startButton.addEventListener("click", startQuiz);
restartButton.addEventListener("click", restartQuiz)

function startQuiz() {
    //reset vars
    currentQuestionIndex = 0;
    score = 0;
    scoreSpan.textContent = 0;

    startScreen.classList.remove("active");
    quizScreen.classList.add("active");

    showQuestion()
}

function showQuestion() {
    //reset state
    answerDisabled = false;
    const currentQuestion = quizQuestions[currentQuestionIndex]

    currentQuestionSpan.textContent = currentQuestionIndex + 1

    const progresspercent =(currentQuestionIndex / quizQuestions.length) * 100;
    progressBar.style.width = progresspercent+ "%"

    questionText.textContent = currentQuestion.question
    // todo: explain this in a second
    answersContainer.innerHTML = "";

    currentQuestion.answers.forEach((answer) => {
        const button =document.createElement("button");
        button.textContent = answer.text;
        button.classList.add("answer-btn");

        button.dataset.correct = answer.correct;
        button.addEventListener("click", selectAnswer);
        answersContainer.appendChild(button);
    });
}

function selectAnswer(event) {
    //optimization check
    if(answerDisabled) return 

    answerDisabled = true;

    const selectButton = event.target;
    const isCorrect = selectButton.dataset.correct === "true";

    // todo: explain this in a sec
    Array.from(answersContainer.children).forEach((button) => {
        if(button.dataset.correct === "true") {
            button.classList.add("correct");
        } else if (button === selectButton) {
            button.classList.add("incorrect");
        }
    });

    if(isCorrect) {
        score++;
        scoreSpan.textContent = score
    }

     setTimeout (()=> {
        currentQuestionIndex++;

        //check if there are more question or if the quiz is over
        if(currentQuestionIndex < quizQuestions.length) {
            showQuestion()
        } else {
            showResults()
        }
    },1000)
}

function showResults() {
    quizScreen.classList.remove("active")
    resultScreen.classList.add("active")

    finalScoreSpan.textContent = score;

    const percentage = (score/quizQuestions.length) * 100

    if (percentage === 100) {
        resultMessage.textContent = "perfect! You're a genius!";
    } else if (percentage >=80) {
        resultMessage.textContent = "Great job! You know your stuff!";
    } else if (percentage >=60) {
        resultMessage.textContent = "Good effort! keep learning!";
    } else if (percentage >=40) {
        resultMessage.textContent = "Not bad! Try again to improve!";
    } else {
        resultMessage.textContent = "Keep studying! You'll get better!";
    }
}
function restartQuiz() {
    resultScreen.classList.remove("active");

    startQuiz();
}
