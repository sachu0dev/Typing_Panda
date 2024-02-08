import { tempWords as words } from "./wordGen.API.js";

// query selectors
const textSection = document.querySelector('.text-section');

// *******functions********

function createParagraph(words) {
  words = words.split('');
  words.forEach((letter)=>{
    const div = document.createElement('div');
    div.textContent = letter;
    textSection.appendChild(div);
  })
  console.log(words);
}

createParagraph(words)







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

feather.replace();