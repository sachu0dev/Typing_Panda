feather.replace();
import { tempWords as words } from "./wordGen.API.js";

// query selectors
const textSection = document.querySelector('.text-section');


// event listeners
window.addEventListener("DOMContentLoaded", createParagraph(words));


function createParagraph(words) {
  words = words.split('');
  words.forEach((letter)=>{
    const div = document.createElement('div');
    div.textContent = letter;
    div.classList.add('letter');
    textSection.appendChild(div);
  })
  
  const letterContainers = document.querySelectorAll('.letter');
  
  window.addEventListener('keydown', function(event) {
    handleTypingEvents(letterContainers, event);
  });
}

let currentLetterIndex = 0;
let errorCount = 0;

function handleTypingEvents(letterContainers, event) {
  const key = event.key;
  
  if (currentLetterIndex >= letterContainers.length) {
    // make a function to save results and start again
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
  } else {
    letterContainers[currentLetterIndex].classList.add("wrong");
    errorCount++;
  }
}


// keyboard click animations
const keys = document.querySelectorAll('.key');

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

  // Event listener for keyboard input
  document.addEventListener('keypress', handleKeyPress);
});