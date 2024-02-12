feather.replace();

const keys = document.querySelectorAll('.key');
let wordSettings ={
  sentences: 4,
  punctuations: true,
  capital: true
}
let words = "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aliquid laboriosam quidem ut nulla consequuntur molestiae labore Perferendis veniam omnis molestias.";
async function fetchParagraph() {
  try {
      const response = await fetch(`http://localhost:3000/generate-paragraph?capital=${wordSettings.capital}&punctuations=${wordSettings.punctuations}&sentences=${wordSettings.sentences}`);
      const data = await response.json();
      console.log(data.paragraph);
      words = data.paragraph;
  } catch (error) {
      console.error('Error fetching paragraph:', error);
  }
}
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
window.addEventListener("DOMContentLoaded", createParagraph(words));


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
let errorCount = 0;

function handleTypingEvents(letterContainers, event) {
  const key = event.key;
  modal.classList.add("hide")
  if (currentLetterIndex >= letterContainers.length) {
    // make a function to save results and start again
    textSection.innerHTML = "";
    currentLetterIndex = 0;
    errorCount = 0;
    createParagraph(words);
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
