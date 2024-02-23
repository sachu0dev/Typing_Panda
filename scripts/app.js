import scoreAPI from "./scoreAPI.js";
feather.replace();
const punctuationsBtn = document.querySelector('.punctuation');
const capitalBtn = document.querySelector('.capital');
const defaultBtn = document.querySelector('.default');
const sentencesInput = document.querySelectorAll('.sentences');
const speedDisplay = document.querySelector('.speed');
const acuracyDisplay = document.querySelector('.acuracy');
const timerDisplay = document.querySelector('.timer');
const keys = document.querySelectorAll('.key');
let wordSettings ={
  sentences: 2,
  punctuations: false,
  capital: false
}
let words = "";
let score = {
  startTime: 0,
  endTime: 0,
  speed: 0,
  error: 0,
  totalLength: 0,
  acuracy: 0,
}
punctuationsBtn.addEventListener('click', setPunctuations);
capitalBtn.addEventListener('click', setCapital);
defaultBtn.addEventListener('click', setDefault);
sentencesInput.forEach(function(div) {
  div.addEventListener("click", getTextContent);
});
async function fetchParagraph() { 
  try {
      const response = await fetch(`https://sachu0dev-random-wordsapigit-x.hsingh.site/generate-paragraph?capital=${wordSettings.capital}&punctuations=${wordSettings.punctuations}&sentences=${wordSettings.sentences}`);
      const data = await response.json();
      console.log(data.paragraph);
      words = data.paragraph;
      createParagraph(words);
  } catch (error) {
      console.error('Error fetching paragraph:', error + " using local server if available");
      const response = await fetch(`http://localhost:3000/generate-paragraph?capital=${wordSettings.capital}&punctuations=${wordSettings.punctuations}&sentences=${wordSettings.sentences}`);
      const data = await response.json();
      console.log(data.paragraph);
      words = data.paragraph;
      createParagraph(words);
  }
}
// async function fetchParagraph() { 
//       const response = await fetch(`http://localhost:3000/generate-paragraph?capital=${wordSettings.capital}&punctuations=${wordSettings.punctuations}&sentences=${wordSettings.sentences}`);
//       const data = await response.json();
//       console.log(data.paragraph);
//       words = data.paragraph;
//       createParagraph(words);
// }
window.addEventListener('DOMContentLoaded', fetchParagraph);
window.addEventListener('DOMContentLoaded', function () {

  function handleKeyPress(event) {
    const key = event.key.toLowerCase();
    keys.forEach(function (element) {
      if (element.textContent.trim().toLowerCase() === key) {
        element.classList.add('active');
        setTimeout(()=> {
          element.classList.remove('active');
        },200)
      }
    });
  }
  document.addEventListener('keypress', handleKeyPress);
});

let isEventTrue = false;
let letterContainers = null;
// query selectors
const textSection = document.querySelector('.text-section');
const modal = document.querySelector('.modal');
// event listeners


function createParagraph(words) {
  words = words.split('');
  words.forEach((letter)=>{
    const div = document.createElement('div');
    div.textContent = letter;
    div.classList.add('letter');
    textSection.appendChild(div);
  })
  
  letterContainers = document.querySelectorAll('.letter');
  if(!isEventTrue){
    window.addEventListener('keydown', function(event) {
      handleTypingEvents(letterContainers, event);
    });
    isEventTrue = true;
  }
  score.startTime = Date.now();
  startTimer();
}

let currentLetterIndex = 0;
let isStartedTyping = false;

function handleTypingEvents(letterContainers, event) {
  const key = event.key;
  modal.classList.add("hide");
  if(!isStartedTyping){
    score.totalLength = letterContainers.length;
    console.log(score.startTime);
    isStartedTyping = true;
  }
  if (currentLetterIndex >= letterContainers.length) {
    // make a function to save results and start again
    score.endTime = Date.now();
    calculateScore();
    scoreAPI.saveScore(score);
    isStartedTyping = false;
    score = {
      speed: 0,
      error: 0,
      totalLength: 0
    }
    textSection.innerHTML = "";
    currentLetterIndex = 0;
    fetchParagraph();
    resetTimer();
    return;
  }
  
  letterContainers[currentLetterIndex].classList.add("current");
  if (letterContainers[currentLetterIndex].textContent === key) {
    letterContainers[currentLetterIndex].classList.remove("current");
    letterContainers[currentLetterIndex].classList.add("correct");
    currentLetterIndex++;
    
    if (currentLetterIndex < letterContainers.length) {
      letterContainers[currentLetterIndex].classList.add("current");
    }
  } else if (/^[a-z]$/.test(key)){
    letterContainers[currentLetterIndex].classList.add("wrong");
    score.error++;
  }
}

function calculateScore(){

 const timeTaken = (score.endTime - score.startTime) / (1000 * 60);
 score.time = timeTaken.toFixed(2);
 const wordsTyped = (score.totalLength)/5;
 score.speed = (wordsTyped / timeTaken).toFixed(2);
 score.acuracy = (((score.totalLength - score.error) / score.totalLength) * 100).toFixed(2);
 speedDisplay.innerHTML = `${score.speed} WPM`;
 acuracyDisplay.innerHTML = `${score.acuracy}%`;
}

function setPunctuations(){
  wordSettings.punctuations = !wordSettings.punctuations;
  punctuationsBtn.classList.toggle('active-opt');
  isStartedTyping = false;
  score = {
    speed: 0,
    error: 0,
    totalLength: 0
  }
  textSection.innerHTML = "";
  currentLetterIndex = 0;
  fetchParagraph();
}
function setCapital(){
  wordSettings.capital = !wordSettings.capital;
  capitalBtn.classList.toggle('active-opt');
  isStartedTyping = false;
  score = {
    speed: 0,
    error: 0,
    totalLength: 0
  }
  textSection.innerHTML = "";
  currentLetterIndex = 0;
  fetchParagraph();
  resetTimer();
}
function setDefault(){
  wordSettings.punctuations = false;
  wordSettings.capital = false;
  wordSettings.sentences = 4;
  punctuationsBtn.classList.remove('active-opt');
  capitalBtn.classList.remove('active-opt');
  isStartedTyping = false;
  score = {
    speed: 0,
    error: 0,
    totalLength: 0
  }
  textSection.innerHTML = "";
  currentLetterIndex = 0;
  fetchParagraph();
  resetTimer();
}
function setSentencesNumber(){
}
function getTextContent(event) {
  var textContent = event.target.textContent.trim();
  textContent = parseInt(textContent);
  if(typeof textContent === 'number'){
    wordSettings.sentences = textContent;
    isStartedTyping = false;
    score = {
      speed: 0,
      error: 0,
      totalLength: 0
    }
  } else {
    wordSettings.sentences = 4;
  }
  textSection.innerHTML = "";
  currentLetterIndex = 0;
  fetchParagraph();
  resetTimer();
}
let intervalId;
let seconds = 0;
let minutes = 0;

function updateTimer() {
  seconds++;
  if (seconds >= 60) {
    seconds = 0;
    minutes++;
  }
  timerDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function startTimer() {
  clearInterval(intervalId);
  intervalId = setInterval(updateTimer, 1000);
}

function resetTimer() {
  clearInterval(intervalId);
  seconds = 0;
  minutes = 0;
  const display = document.getElementById('timer');
  display.textContent = '00:00';
}