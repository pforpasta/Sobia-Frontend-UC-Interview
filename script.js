const questions = [
  {
    question: "Why does Marcel the monkey leave the zoo Ross moves him to?",
    answers: [
      { text: "He gets stolen for acting work", correct: true},
      { text: "He escapes to find Ross", correct: false},
      { text: "He falls out with the other monkeys", correct: false},
      { text: "He gets featured in a music video of The Lion Sleeps Tonight", correct: false}

    ]
  }, 

  {
    question: "Finish the lyrics to Phoebe’s song Smelly Cat…",
    answers: [
      { text: "You don’t deserve the zoo", correct: false},
      { text: "You smell of poo", correct: false},
      { text: "It’s not your fault", correct: true},
      { text: "Come and have a bath", correct: false}

    ]
  },

  {
    question: "How many pages was the letter that Rachel wrote to Ross?",
    answers: [
      { text: "15", correct: false},
      { text: "12", correct: false},
      { text: "18", correct: true},
      { text: "10", correct: false}

    ]
  },

  {
    question: "Who is Central Perk’s Gunther in love with?",
    answers: [
      { text: "Rachel", correct: true},
      { text: "Ross", correct: false},
      { text: "Monica", correct: false},
      { text: "Phoebe", correct: false}

    ]
  },

  {
    question: "Joey lies about something major on his acting resume, but what is it?",
    answers: [
      { text: "He can do an Italian accent", correct: false},
      { text: "He can drink a carton of milk in 10 seconds", correct: false},
      { text: "He can ski", correct: false},
      { text: "He can speak French", correct: true}

    ]
  },

  {
    question: "What is Ross’s second child called?",
    answers: [
      { text: "Ella", correct: false},
      { text: "Emily", correct: false},
      { text: "Ben", correct: false},
      { text: "Emma", correct: true}

    ]
  }

];

const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')
const removeafter = document.getElementById('removeafter')
const removeafterimg = document.getElementById('removeafterimg')
const theend = document.getElementById('theend')

let shuffledQuestions, currentQuestionIndex

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
  currentQuestionIndex++
  setNextQuestion()
})

function startGame() {
  startButton.classList.add('hide', 'smooth')
  removeafter.classList.add('hide', 'smooth')
  removeafterimg.classList.add('hide', 'smooth')
  shuffledQuestions = questions.sort(() => Math.random() - .5)
  currentQuestionIndex = 0
  questionContainerElement.classList.remove('hide')
  setNextQuestion()
}

function setNextQuestion() {
  resetState()
  showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
  questionElement.innerText = question.question
  question.answers.forEach(answer => {
    const button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add('btn')
    if (answer.correct) {
      button.dataset.correct = answer.correct
    }
    button.addEventListener('click', selectAnswer)
    answerButtonsElement.appendChild(button)
  })
}

function resetState() {
  clearStatusClass(document.body)
  nextButton.classList.add('hide')
  theend.classList.add('hide')
  questionElement.classList.remove('hide')
  answerButtonsElement.classList.remove('hide')
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  }
}


function selectAnswer(e) {
  const selectedButton = e.target
  const correct = selectedButton.dataset.correct
  setStatusClass(document.body, correct)
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)
  })
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide')
  } else {
    setTimeout(() => {
      startButton.innerText = 'Restart'
      startButton.classList.remove('hide')
      theend.classList.remove('hide')
      questionElement.classList.add('hide', 'smooth')
      answerButtonsElement.classList.add('hide', 'smooth')
    }, 2000)
    
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element)
  if (correct) {
    element.classList.add('correct', 'smooth')
  } else {
    element.classList.add('wrong', 'smooth')
  }
}

function clearStatusClass(element) {
  element.classList.remove('correct')
  element.classList.remove('wrong')
}