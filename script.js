
// Questions Array with 8+ question objects
const questions = [
    {
        question: "Which keyword is used to declare a block-scoped variable in JavaScript?",
        options: ["var", "let", "function", "define"],
        correct: "let"
    },
    {
        question: "What does DOM stand for?",
        options: ["Data Object Model", "Document Oriented Model", "Document Object Model", "Dynamic Operational Module"],
        correct: "Document Object Model"
    },
    {
        question: "Which method is used to select an HTML element by its unique ID?",
        options: ["getElementByClass", "querySelectorAll", "getElementById", "selectElement"],
        correct: "getElementById"
    },
    {
        question: "Which operator is used for strict equality comparison (checking both value and type)?",
        options: ["==", "===", "=", "!=="],
        correct: "==="
    },
    {
        question: "Which array method adds one or more elements to the end of an array?",
        options: ["push()", "pop()", "shift()", "unshift()"],
        correct: "push()"
    },
    {
        question: "How do you write a single-line comment in JavaScript?",
        options: ["<!-- This is a comment -->", "/* This is a comment */", "// This is a comment", "# This is a comment"],
        correct: "// This is a comment"
    },
    {
        question: "What is the output of typeof null in JavaScript?",
        options: ["null", "undefined", "object", "number"],
        correct: "object"
    },
    {
        question: "Which event occurs when a user clicks on an HTML element?",
        options: ["onmouseover", "onclick", "onchange", "onkeydown"],
        correct: "onclick"
    }
];

// State Variables
let currentQuestionIndex = 0;
let score = 0;
let isAnswered = false;

// DOM Element References
const quizMain = document.getElementById("quiz-main");
const progressDisplay = document.getElementById("quiz-progress");

// Initialize Quiz
function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    loadQuestion();
}

// Load and Render Current Question
function loadQuestion() {
    isAnswered = false;
    const currentQ = questions[currentQuestionIndex];

    // Update Progress Header
    progressDisplay.textContent = `Question ${currentQuestionIndex + 1} of ${questions.length}`;

    // Clear previous content
    quizMain.innerHTML = "";

    // Create Question Text Element
    const questionEl = document.createElement("div");
    questionEl.classList.add("question-text");
    questionEl.textContent = currentQ.question;
    quizMain.appendChild(questionEl);

    // Create Options Container
    const optionsContainer = document.createElement("div");
    optionsContainer.classList.add("options-container");

    // Loop through options and create buttons dynamically
    currentQ.options.forEach(option => {
        const optionBtn = document.createElement("button");
        optionBtn.classList.add("option-btn");
        optionBtn.textContent = option;

        // Event listener for selecting an option
        optionBtn.addEventListener("click", () =>
            handleOptionClick(optionBtn, option, currentQ.correct, optionsContainer)
        );

        optionsContainer.appendChild(optionBtn);
    });

    quizMain.appendChild(optionsContainer);

    // Create Action Container with 'Next Question' Button
    const actionContainer = document.createElement("div");
    actionContainer.classList.add("action-container");

    const nextBtn = document.createElement("button");
    nextBtn.id = "next-btn";
    nextBtn.textContent = currentQuestionIndex === questions.length - 1 ? "Finish Quiz" : "Next Question";
    nextBtn.disabled = true;

    nextBtn.addEventListener("click", () => {
        currentQuestionIndex++;

        if (currentQuestionIndex < questions.length) {
            loadQuestion();
        } else {
            showFinalScreen();
        }
    });

    actionContainer.appendChild(nextBtn);
    quizMain.appendChild(actionContainer);
}

// Handle Option Selection
function handleOptionClick(selectedBtn, selectedAnswer, correctAnswer, optionsContainer) {
    if (isAnswered) return;
    isAnswered = true;

    const allOptionButtons = optionsContainer.querySelectorAll(".option-btn");

    // Disable all option buttons after selection
    allOptionButtons.forEach(btn => btn.disabled = true);

    // Enable the Next button
    const nextBtn = document.getElementById("next-btn");
    nextBtn.disabled = false;

    // Check if the answer is correct
    if (selectedAnswer === correctAnswer) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("wrong");

        // Reveal the correct answer button
        allOptionButtons.forEach(btn => {
            if (btn.textContent === correctAnswer) {
                btn.classList.add("correct");
            }
        });
    }
}

// Show Final Score Screen
function showFinalScreen() {
    progressDisplay.textContent = "Quiz Completed";
    quizMain.innerHTML = "";

    const finalScreen = document.createElement("div");
    finalScreen.classList.add("final-screen");

    const heading = document.createElement("h2");
    heading.textContent = "Quiz Completed!";

    const scorePara = document.createElement("p");

    // Generate dynamic feedback message based on score
    let feedback = "";
    const percentage = (score / questions.length) * 100;

    if (percentage === 100) {
        feedback = "Outstanding! You are a JavaScript master!";
    } else if (percentage >= 70) {
        feedback = "Great job! You have a solid grasp of JavaScript fundamentals.";
    } else if (percentage >= 40) {
        feedback = "Good effort! Review DOM manipulation and arrays to improve further.";
    } else {
        feedback = "Keep practicing! Review JavaScript fundamentals and try again.";
    }

    scorePara.innerHTML = `You scored <strong>${score}</strong> out of <strong>${questions.length}</strong><br><br>${feedback}`;

    const restartBtn = document.createElement("button");
    restartBtn.id = "restart-btn";
    restartBtn.textContent = "Restart Quiz";
    restartBtn.addEventListener("click", startQuiz);

    finalScreen.appendChild(heading);
    finalScreen.appendChild(scorePara);
    finalScreen.appendChild(restartBtn);

    quizMain.appendChild(finalScreen);
}

// Run quiz on load
startQuiz();
    