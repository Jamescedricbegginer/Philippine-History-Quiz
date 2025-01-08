let currentQuestionIndex = 0;
let score = 0;

function loadQuestion() {
    const questionContainer = document.getElementById("question-container");
    const currentQuestion = questions[currentQuestionIndex];
    
    questionContainer.innerHTML = `
        <p>${currentQuestion.question}</p>
        ${currentQuestion.options.map((option, index) => {
            return `
                <label class="option">
                    <input type="radio" name="answer" value="${index}" onclick="checkAnswer(${index})"> ${option}
                </label><br>
            `;
        }).join('')}
    `;
}

function checkAnswer(selectedAnswerIndex) {
    const currentQuestion = questions[currentQuestionIndex];
    const correctAnswerIndex = currentQuestion.correctAnswer;
    
    // Magbigay ng feedback gamit ang kulay at pop-up
    const resultMessage = document.getElementById("result");
    
    if (selectedAnswerIndex === correctAnswerIndex) {
        resultMessage.innerHTML = "Tama! +1 point.";
        resultMessage.classList.remove("incorrect");
        resultMessage.classList.add("correct");
        score++;
        alert("Correct!"); // Pop-up kapag tama ang sagot
    } else {
        resultMessage.innerHTML = "Mali! Subukan ulit.";
        resultMessage.classList.remove("correct");
        resultMessage.classList.add("incorrect");
        alert("Try Again!"); // Pop-up kapag mali ang sagot
    }
    
    // Pagtago ng mga options at pagpapakita ng susunod na tanong button
    const nextButton = document.querySelector("button");
    nextButton.disabled = false;  // Gawing active ang 'Next Question' button
}

function nextQuestion() {
    // Itago ang feedback at i-disable ang 'Next Question' button habang nagloload ng susunod na tanong
    const resultMessage = document.getElementById("result");
    resultMessage.innerHTML = "";
    
    // I-disable ang 'Next Question' button hanggang walang sagot
    const nextButton = document.querySelector("button");
    nextButton.disabled = true;

    // Mag-load ng susunod na tanong
    currentQuestionIndex++;
    
    if (currentQuestionIndex < questions.length) {
        loadQuestion();
    } else {
        showResult();
    }
}

function showResult() {
    const resultContainer = document.getElementById("result");
    resultContainer.innerHTML = `Nakuha mong ${score} sa ${questions.length} na tanong!`;
    document.getElementById("quiz-container").innerHTML = "";
    resultContainer.style.fontSize = "24px";
}

loadQuestion(); // I-load ang unang tanong kapag binuksan ang page