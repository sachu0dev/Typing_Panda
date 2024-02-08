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
function handeleTypingEvents(letterContainers, event) {
  const key = event.key;
  letterContainers.forEach((letter, index) => {
    if (letter.textContent.trim() === key) {
      letter.classList.remove('current');
      letter.classList.add('correct');
      letterContainers[index + 1].classList.add('current');
      // continue;
    } else {
      letter.classList.remove('wrong');
    }
  });
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