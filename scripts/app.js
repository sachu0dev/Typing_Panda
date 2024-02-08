feather.replace();
import { tempWords as words } from "./wordGen.API.js";

// query selectors
const textSection = document.querySelector('.text-section');


// event listeners
window.addEventListener("DOMContentLoaded", createParagraph(words));

// *******functions********

function createParagraph(words) {
  words = words.split('');
  words.forEach((letter)=>{
    const div = document.createElement('div');
    div.textContent = letter;
    div.classList.add('letter');
    textSection.appendChild(div);
  })
  console.log(words);
  const letterConstainers = document.querySelectorAll('.letter');
  console.log(letterConstainers)
  window.addEventListener('keydown', function(event) {
    handeleTypingEvents(letterConstainers,event);
  });
}
let currentLetterIndex = 0;
let errorCount = 0;
function handeleTypingEvents(letterContainers, event) {
  const key = event.key;
  letterContainers[currentLetterIndex].classList.add("current");
  if(letterContainers[currentLetterIndex].textContent.trim() === key){
    letterContainers[currentLetterIndex].classList.remove("current")
    letterContainers[currentLetterIndex].classList.add("correct");
    letterContainers[currentLetterIndex + 1].classList.add("current");
    currentLetterIndex = currentLetterIndex + 1;
  } else {
    letterContainers[currentLetterIndex].classList.add("wrong");
    errorCount= errorCount + 1;
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