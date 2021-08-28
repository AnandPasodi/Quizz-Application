
  const checkAnswer = (event) => {
    console.log("event", event.target.textContent);
    if (quizData[activeQuestionId].answer === event.target.textContent) {
      score++;
    } else {
      score--;
    }
    document.getElementById("scoreValue").textContent = score;
    changeQuestion();
  };

  const calculateScore = answerType => {
    if (answerType === "correct") {
      console.log(quizData[activeQuestionId].diffcultyScore * seconds);
      score = score + quizData[activeQuestionId].diffcultyScore * seconds;
    }
  };

  let activeQuestionId = 0;
  let timerId = null;
  let timeoutId = null;
  let score = 0;
  let seconds = 0;
  const changeQuestion = () => {
    activeQuestionId++;
    console.log("activeQuestionId", activeQuestionId);
    if (activeQuestionId < quizData.length) {
      const Child = document.getElementById("quiz-section").childNodes;
      document.getElementById("quiz-section").removeChild(Child[0]);
      clearInterval(timerId);
      clearTimeout(timeoutId);
      clockStart();
      createQuestion();
    }
    if (activeQuestionId === quizData.length) {
      document.getElementById("cong-popup").style.display = "flex";
      document.getElementById("t-score").textContent = score;
      clearInterval(timerId);
      clearTimeout(timeoutId);
    }
  };

  const timerClock = () => {
    const timer = document.createElement("div");
    timer.classList.add("timer");
    timer.setAttribute("id", "timerclock");
    clockStart();
    document.body.insertBefore(
      timer,
      document.getElementById("quiz-section")
    );
  };

  const clockStart = () => {
    seconds = 1;
    timerId = setInterval(function() {
      document.getElementById("timerclock").textContent = seconds++;
    }, 1000);
    timeoutId = setTimeout(() => {
      console.log("seconds", seconds);
      document.getElementById("scoreValue").textContent = score;
      clearInterval(timerId);
      clearTimeout(timeoutId);
      changeQuestion();
    }, 10000);
  };

  const createQuestion = () => {
    if (activeQuestionId === 0) {
      timerClock();
    }
    const questionContainer = document.createElement("div");
    questionContainer.classList.add("question-container");
    const questionText = document.createElement("div");
    questionText.classList.add("question-text");
    questionText.textContent = quizData[activeQuestionId].questionText;
    const questionCategory = document.createElement("div");
    questionCategory.classList.add("question-category");
    questionCategory.textContent = quizData[activeQuestionId].category;
    if (quizData[activeQuestionId].questionImg) {
      questionContainer.appendChild(questionImg);
      const questionImg = document.createElement("img");
    }
    const optionsOl = document.createElement("ol");
    optionsOl.classList.add("options-list");
    for (var i = 0; i < 4; i++) {
      const optionsLi = document.createElement("li");
      optionsLi.style.listStyleType = "upper-alpha";
      optionsLi.textContent = quizData[activeQuestionId].options[i];
      optionsLi.addEventListener("click", checkAnswer);
      optionsOl.appendChild(optionsLi);
    }
    questionContainer.appendChild(questionCategory);
    questionContainer.appendChild(questionText);
    questionContainer.appendChild(optionsOl);
    document.getElementById("quiz-section").appendChild(questionContainer);
  };
  createQuestion();