
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
const ninjaMode = document.querySelector('.mode');
const accIcon = document.querySelector('.acc-icon');
const accBtn = document.querySelector('.acc-btn');
document.addEventListener('keydown', function(event) {
  if (event.key === "Tab" || event.ctrlKey) {
      event.preventDefault();
      location.reload();
  }
});
let current = "current";
let wordSettings ={
  sentences: 2,
  punctuations: false,
  capital: false,
  ninja: false
}
let words = "";
let score = {
  speed: 0,
  error: 0,
  totalLength: 0,
  acuracy: 0,
}
let times = {
  startTime: 0,
  endTime: 0,
}
punctuationsBtn.addEventListener('click', setPunctuations);
capitalBtn.addEventListener('click', setCapital);
defaultBtn.addEventListener('click', setDefault);
sentencesInput.forEach(function(div) {
  div.addEventListener("click", getTextContent);
});
window.addEventListener('DOMContentLoaded', setLogin);
ninjaMode.addEventListener('click', setNinjaMode);
async function fetchParagraph() { 
  try {
      const response = await fetch(`https://typing-panda-words.vercel.app/generate-paragraph?capital=${wordSettings.capital}&punctuations=${wordSettings.punctuations}&sentences=${wordSettings.sentences}`);
      const data = await response.json();
      words = data.paragraph;
      textSection.innerHTML = "";
      createParagraph(words);
  } catch (error) {
      console.error('Error fetching paragraph:', error + " using local server if available");
      const response = await fetch(`http://localhost:3000/generate-paragraph?capital=${wordSettings.capital}&punctuations=${wordSettings.punctuations}&sentences=${wordSettings.sentences}`);
      const data = await response.json();
      words = data.paragraph;
      textSection.innerHTML = "";
      createParagraph(words);
  }
}
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
  times.startTime = Date.now();
}

let currentLetterIndex = 0;
let isStartedTyping = false;

function handleTypingEvents(letterContainers, event) {
  const key = event.key;
  modal.classList.add("hide");
  if(!isStartedTyping){
    score.totalLength = letterContainers.length;
    startTimer();
    isStartedTyping = true;
  }
  if(key === "Backspace" && wordSettings.ninja){
    if(currentLetterIndex > 0){
      letterContainers[currentLetterIndex].classList.remove(current);
      currentLetterIndex--;
      letterContainers[currentLetterIndex].classList.add(current);
    }
  }
  if (currentLetterIndex >= letterContainers.length) {
    times.endTime = Date.now();
    calculateScore();
    console.log(score)
    scoreAPI.postScore(score);
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
  
  letterContainers[currentLetterIndex].classList.add(current);
  if (letterContainers[currentLetterIndex].textContent === key) {
    letterContainers[currentLetterIndex].classList.remove(current);
    if(wordSettings.ninja){
      if(letterContainers[currentLetterIndex].classList.contains("wrong")){
        score.error--;
        letterContainers[currentLetterIndex].classList.remove("wrong");
      }
    }
    letterContainers[currentLetterIndex].classList.add("correct");
    currentLetterIndex++;
    
    if (currentLetterIndex < letterContainers.length) {
      letterContainers[currentLetterIndex].classList.add(current);
    }
  } else if (/^[a-z]$/.test(key)){
    letterContainers[currentLetterIndex].classList.add("wrong");
    if(wordSettings.ninja){
      letterContainers[currentLetterIndex].classList.remove(current);
      currentLetterIndex++;
      if (currentLetterIndex < letterContainers.length) {
        letterContainers[currentLetterIndex].classList.add(current);
      }
    }
    score.error++;
  }
}

function calculateScore(){
 const timeTaken = (times.endTime - times.startTime) / (1000 * 60);
 score.time = timeTaken.toFixed(2);
 const wordsTyped = (score.totalLength - score.error)/5;
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
  wordSettings.ninja = false;
  wordSettings.sentences = 2;
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
function setNinjaMode(){
  wordSettings.ninja = !wordSettings.ninja;
  ninjaMode.classList.toggle('active-opt');
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
    wordSettings.sentences = 2;
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
// set cursor
const cursorBox = document.querySelector(".current-box");
const cursorBot = document.querySelector(".current-bot");
const cursorLeft = document.querySelector(".current-left");
const cursorAbod = document.querySelector(".current-Abod");
cursorBox.addEventListener("click", ()=>{
  current = "current-box";
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
});
cursorBot.addEventListener("click", ()=>{
  current = "current-bot";
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
});
cursorLeft.addEventListener("click", ()=>{
  current = "current-left";
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
});
cursorAbod.addEventListener("click", ()=>{
  current = "current-Abod";
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
});

function setLogin(){
  const token = localStorage.getItem("token");
  const username = localStorage.getItem("username");
  if(token && username){
    accBtn.classList.add("hide-acc-btn");
    accIcon.classList.add("show-acc-icon");
  }
}
export { score };
