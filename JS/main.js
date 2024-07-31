const questions = [
  {
    question: 'What is the capital of France?',
    answers: [
      { text: 'Paris', correct: true },
      { text: 'London', correct: false },
      { text: 'Berlin', correct: false },
      { text: 'Madrid', correct: false },
    ],
  },
  {
    question: 'What is 2 + 2?',
    answers: [
      { text: '3', correct: false },
      { text: '4', correct: true },
      { text: '5', correct: false },
      { text: '6', correct: false },
    ],
  },
  {
    question: 'What is the capital of Japan?',
    answers: [
      { text: 'Beijing', correct: false },
      { text: 'Seoul', correct: false },
      { text: 'Tokyo', correct: true },
      { text: 'Bangkok', correct: false },
    ],
  },
];

const headerContainer = document.getElementById('header-container');
const headerElement = document.getElementById('header');
const questionContainer = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');
const nextButton = document.getElementById('next-btn');
const scoreContainer = document.getElementById('score-container');
const scoreElement = document.getElementById('score');
const retakeButton = document.getElementById('retake-btn');

let currentQuestionIndex = 0;
let score = 0;

startQuiz();

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.classList.add('hidden');
  scoreContainer.classList.add('hidden');
  showQuestion(questions[currentQuestionIndex]);
}

function showQuestion(question) {
  headerElement.textContent = `Question ${currentQuestionIndex + 1}`;
  questionElement.textContent = question.question;
  answerButtonsElement.innerHTML = '';
  question.answers.forEach((answer) => {
    const button = document.createElement('button');
    button.textContent = answer.text;
    button.classList.add('btn');
    button.addEventListener('click', () => selectAnswer(button, answer));
    answerButtonsElement.appendChild(button);
  });
}

function selectAnswer(button, answer) {
  if (answer.correct) {
    score++;
  } else {
    button.classList.add('incorrect');
  }
  Array.from(answerButtonsElement.children).forEach((btn) => {
    btn.disabled = true;
  });
  setTimeout(() => {
    if (currentQuestionIndex < questions.length - 1) {
      currentQuestionIndex++;
      showQuestion(questions[currentQuestionIndex]);
    } else {
      showScore();
    }
  }, 1000);
}

function showScore() {
  questionContainer.classList.add('hidden');
  nextButton.classList.add('hidden');
  scoreContainer.classList.remove('hidden');
  scoreElement.textContent = `Your score: ${score}`;
}

nextButton.addEventListener('click', () => {
  questionContainer.classList.remove('hidden');
  startQuiz();
});

retakeButton.addEventListener('click', () => {
  questionContainer.classList.remove('hidden');
  scoreContainer.classList.add('hidden');
  startQuiz();
});
