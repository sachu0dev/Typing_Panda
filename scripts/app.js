feather.replace();
import scoreAPI from "./scoreAPI.js";
const keys = document.querySelectorAll('.key');
let wordSettings ={
  sentences: 1,
  punctuations: false,
  capital: false
}
let words = "";
let score = {
  startTime: 0,
  endTime: 0,
  speed: 0,
  error: 0,
  totalLength: 0
}
async function fetchParagraph() {
  try {
      const response = await fetch(`https://sachu0dev-random-wordsapi-x.hsingh.site/generate-paragraph?capital=${wordSettings.capital}&punctuations=${wordSettings.punctuations}&sentences=${wordSettings.sentences}`);
      const data = await response.json();
      console.log(data.paragraph);
      words = data.paragraph;
      createParagraph(words);
  } catch (error) {
      console.error('Error fetching paragraph:', error);
      words = "There was an error fetching the paragraph. Please try again later. or you can practice on error massage";
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
}

let currentLetterIndex = 0;
let isStartedTyping = false;

function handleTypingEvents(letterContainers, event) {
  const key = event.key;
  modal.classList.add("hide");
  if(!isStartedTyping){
    score.startTime = Date.now();
    score.totalLength = letterContainers.length;
    console.log(score.startTime);
    isStartedTyping = true;
  }
  if (currentLetterIndex >= letterContainers.length) {
    // make a function to save results and start again
    score.endTime = Date.now();
    calculateSpeed();
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

function calculateSpeed(){

 const timeTaken = (score.endTime - score.startTime) / (1000 * 60);
 const wordsTyped = (score.totalLength - score.error)/5;
 score.speed = (wordsTyped / timeTaken).toFixed(2);
}

// keyboard click animations