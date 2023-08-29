const countdownElement = document.getElementById('countdown');
let timeLeft = 20;
let countdown;

function startCountdown() {
    countdown = setInterval(() => {
        if (timeLeft > 0) {
            countdownElement.textContent = timeLeft;
            timeLeft--;
        } else {
            clearInterval(countdown);
            showCorrectAnswer();
            setTimeout(nextQuestion, 3000); // Vai para a próxima pergunta após 3 segundos
        }
    }, 1000);
}

function showCorrectAnswer() {
    const currentQuestion = questions[currentQuestionIndex];
    const correctAnswerIndex = currentQuestion.answers.indexOf(currentQuestion.correctAnswer);
    answerElements[correctAnswerIndex].classList.add('correct'); // Adicione uma classe para destacar a resposta correta
}

function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        resetCountdown();
        showQuestion(currentQuestionIndex);
        startCountdown();
    } else {
        // Exibir tela de resultados ou concluir o jogo
    }
}

function resetCountdown() {
    clearInterval(countdown);
    timeLeft = 20;
    countdownElement.textContent = timeLeft;
}

// Função para verificar a resposta quando uma opção for clicada
answerElements.forEach((answerElement, index) => {
    answerElement.addEventListener('click', () => {
        clearInterval(countdown);
        if (questions[currentQuestionIndex].answers[index] === questions[currentQuestionIndex].correctAnswer) {
            answerElement.classList.add('correct');
        } else {
            answerElement.classList.add('incorrect');
            showCorrectAnswer();
        }
        setTimeout(nextQuestion, 3000); // Vai para a próxima pergunta após 3 segundos
    });
});

showQuestion(currentQuestionIndex);

const questions = [
    {
        question: 'Qual foi a primeira skin lançada em League of Legends?',
        answers: ['Corki Ovni', 'Alistar Negro', 'PAX Twisted Fate', 'Kayle Prateada'],
        correctAnswer: 'Alistar Negro'
    }
];

const questionElement = document.getElementById('question');
const answerElements = document.querySelectorAll('.answer');

let currentQuestionIndex = 0;

function showQuestion(questionIndex) {
    const currentQuestion = questions[questionIndex];
    questionElement.textContent = currentQuestion.question;

    for (let i = 0; i < currentQuestion.answers.length; i++) {
        answerElements[i].textContent = currentQuestion.answers[i];
    }
}