const startButton = document.getElementById("startQuiz");
const difficultySelect = document.getElementById("difficulty");
const quizSettings = document.getElementById("quiz-settings");
const quizSection = document.getElementById("quiz-section");
const questionText = document.getElementById("question");
const optionsList = document.getElementById("options");
const timerElement = document.getElementById("time");

let currentQuestionIndex = 0;
let score = 0;
let timer;
let timeLeft = 10;
let timeSpent = [];
let selectedQuestions = [];  // Store selected difficulty questions

// Function to start the quiz with selected difficulty
startButton.addEventListener("click", () => {
    const selectedDifficulty = difficultySelect.value;
    selectedQuestions = questions[selectedDifficulty];  // Get questions for chosen difficulty
    
    quizSettings.style.display = "none";  
    quizSection.style.display = "block";  
    loadQuestion();
});

// Function to load a question
function loadQuestion() {
    clearInterval(timer);
    timeLeft = 10;
    timerElement.textContent = timeLeft;
    
    const questionData = selectedQuestions[currentQuestionIndex];
    questionText.textContent = questionData.question;
    optionsList.innerHTML = "";

    questionData.options.forEach(option => {
        const li = document.createElement("li");
        li.textContent = option;
        li.addEventListener("click", () => selectAnswer(option));
        optionsList.appendChild(li);
    });

    timer = setInterval(updateTimer, 1000);
}

// Function to update the timer
function updateTimer() {
    timeLeft--;
    timerElement.textContent = timeLeft;
    if (timeLeft === 0) {
        clearInterval(timer);
        timeSpent.push(10 - timeLeft); // Record time spent
        nextQuestion();
    }
}

// Function to handle answer selection
function selectAnswer(selectedOption) {
    clearInterval(timer);
    const correctAnswer = selectedQuestions[currentQuestionIndex].correct;
    
    if (selectedOption === correctAnswer) {
        score++;
    }
    
    timeSpent.push(10 - timeLeft);
    nextQuestion();
}

// Function to load next question or show results
function nextQuestion() {
    currentQuestionIndex++;

    if (currentQuestionIndex < selectedQuestions.length) {
        loadQuestion();
    } else {
        showResults();
    }
}

// Function to show quiz results with chart
function showResults() {
    quizSection.innerHTML = `
        <h2>Quiz Completed!</h2>
        <p>You scored ${score} out of ${selectedQuestions.length}.</p>
        <canvas id="resultChart"></canvas>
        <canvas id="timeChart"></canvas>
        <button onclick="location.reload()">Restart Quiz</button>
    `;

    drawCharts();
}

// Function to draw charts using Chart.js
function drawCharts() {
    const ctx1 = document.getElementById("resultChart").getContext("2d");
    new Chart(ctx1, {
        type: "pie",
        data: {
            labels: ["Correct", "Incorrect"],
            datasets: [{
                data: [score, selectedQuestions.length - score],
                backgroundColor: ["#4CAF50", "#FF5733"]
            }]
        },
        options: {
            responsive: true
        }
    });

    const ctx2 = document.getElementById("timeChart").getContext("2d");
    new Chart(ctx2, {
        type: "bar",
        data: {
            labels: selectedQuestions.map((_, i) => `Q${i + 1}`),
            datasets: [{
                label: "Time Spent (sec)",
                data: timeSpent,
                backgroundColor: "#3498DB"
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: { beginAtZero: true }
            }
        }
    });
}
