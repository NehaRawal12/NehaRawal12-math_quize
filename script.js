// Global Variables
let currentCategory = ''; 
let currentQuestion = 0;
let score = 0;
let questions = [];
let userAnswers = []; 

const welcomeScreen = document.getElementById('welcome-screen');
const categoryButtonsContainer = document.getElementById('category-buttons');
const quizScreen = document.getElementById('quiz-screen');
const resultScreen = document.getElementById('result-screen');
const questionElement = document.getElementById('question');
const answerInput = document.getElementById('answer-input');
const submitButton = document.getElementById('submit-btn');
const undoButton = document.getElementById('undo-btn');
const backButton = document.getElementById('back-btn');
const resultsList = document.getElementById('results-list');
const scoreElement = document.getElementById('score');

function showScreen(screen) {
    const screens = document.querySelectorAll('.screen');
    screens.forEach(s => s.style.display = 'none');
    document.getElementById(screen).style.display = 'block';
}






const categories = ['addition', 'subtraction', 'multiplication', 'division', 'counting'];

categories.forEach(category => {
    const button = document.createElement('button');
    button.innerText = category.charAt(0).toUpperCase() + category.slice(1); // Capitalize first letter
    button.addEventListener('click', () => {
        currentCategory = category;
        generateQuestions();
        showScreen('quiz-screen');
        loadQuestion();
    });
    categoryButtonsContainer.appendChild(button);
});

const numberButtonsContainer = document.getElementById('number-buttons');
for (let i = 0; i <= 9; i++) {
    const button = document.createElement('button');
    button.innerText = i;
    button.addEventListener('click', () => {
        answerInput.value += i;
    });
    numberButtonsContainer.appendChild(button);
}

undoButton.addEventListener('click', () => {
    answerInput.value = answerInput.value.slice(0, -1);
});

submitButton.addEventListener('click', () => {
    checkAnswer();
    if (currentQuestion < 9) {
        currentQuestion++;
        loadQuestion();
    } else {
        showResults(); 
    }
});

backButton.addEventListener('click', () => {
    showScreen('welcome-screen');
});

function generateQuestions() {
    questions = [];
    for (let i = 0; i < 10; i++) {
        let question;
        const num1 = Math.floor(Math.random() * 10);
        let num2 = Math.floor(Math.random() * 10);

        if (currentCategory === 'division' && num2 === 0) {
            num2 = Math.floor(Math.random() * 9) + 1; 
        }

        switch (currentCategory) {
            case 'addition':
                question = { category: 'addition', question: `${num1} + ${num2}`, answer: num1 + num2 };
                break;
            case 'subtraction':
                question = { category: 'subtraction', question: `${num1} - ${num2}`, answer: num1 - num2 };
                break;
            case 'multiplication':
                question = { category: 'multiplication', question: `${num1} * ${num2}`, answer: num1 * num2 };
                break;
            case 'division':
                question = { category: 'division', question: `${num1 * num2} / ${num2}`, answer: num1 };
                break;
            case 'counting':
                question = { category: 'counting', question: `What comes after ${num1}?`, answer: num1 + 1 };
                break;
        }
        questions.push(question);
    }
}

function loadQuestion() {
    const current = questions[currentQuestion];
    questionElement.innerText = current.question;
    answerInput.value = '';
}

function checkAnswer() {
    const current = questions[currentQuestion];
    const userAnswer = parseFloat(answerInput.value.trim()); 
    if (isNaN(userAnswer)) {
        alert('Please enter a valid number.');
        return;
    }

    const isCorrect = userAnswer === current.answer;  
    userAnswers.push({ category: current.category, question: current.question, userAnswer, isCorrect });
    alert(isCorrect ? 'Correct!' : 'Incorrect!');
    score += isCorrect ? 1 : 0; 
}

function showResults() {
    showScreen('result-screen');
    resultsList.innerHTML = ''; 
    const filteredResults = userAnswers.filter(answer => answer.category === currentCategory);
    filteredResults.forEach(ans => {
        const li = document.createElement('li');
        li.innerHTML = `${ans.question} - Your answer: ${ans.userAnswer} <span>${ans.isCorrect ? '✓' : '✗'}</span>`;
        resultsList.appendChild(li);
    });
    scoreElement.innerText = `Your score: ${score}/10`;
    score = 0;
    currentQuestion = 0;
    userAnswers = [];
}

const startButton = document.getElementById('start-btn');
startButton.addEventListener('click', () => {
    showScreen('welcome-screen'); 
});

showScreen('start-screen');
