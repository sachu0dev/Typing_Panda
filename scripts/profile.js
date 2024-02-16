import scoreAPI from "./scoreAPI.js";
// all time stats
const allTime = document.querySelector('.all-time');
const allLessons = document.querySelector('.all-lessons');
const allTopSpeed = document.querySelector('.all-top-speed');
const allAvgSpeed = document.querySelector('.all-avg-speed');
const allAvgAccuracy = document.querySelector('.all-avg-accuracy');
// today stats
const todayTime = document.querySelector('.today-time');
const todayLessons = document.querySelector('.today-lessons');
const todayTopSpeed = document.querySelector('.today-top-speed');
const todayAvgSpeed = document.querySelector('.today-avg-speed');
const todayAvgAccuracy = document.querySelector('.today-avg-accuracy');

function allDisplay(){
  const scoresList = scoreAPI.getEveryScore();
  let time = 0;
  let lessons = 0;
  let topSpeed = 0;
  let avgSpeed = 0;
  let avgAccuracy = 0;
  scoresList.forEach(scores => {
    const myScore = JSON.parse(localStorage.getItem(scores));
    myScore.forEach(score => {
      time += parseFloat(score.time);
      lessons++;
      if(parseFloat(score.speed) > topSpeed)[
        topSpeed = parseFloat(score.speed)
      ]
      avgSpeed += parseFloat(score.speed);
      avgAccuracy += parseFloat(score.acuracy);
    })
  })
  time = formatTime(time);
  allTime.innerHTML = time;
  allLessons.innerHTML = lessons;
  allTopSpeed.innerHTML = `${topSpeed.toFixed(1)}wpm`;
  allAvgSpeed.innerHTML = `${(avgSpeed / (lessons)).toFixed(1)}wpm`;
  allAvgAccuracy.innerHTML = `${(avgAccuracy / (lessons)).toFixed(2)}%`;

}

function todayDisplay(){
  const scores = scoreAPI.getAllScore();
  let time = 0;
  let lessons = 0;
  let topSpeed = 0;
  let avgSpeed = 0;
  let avgAccuracy = 0;
  scores.forEach(score => {
    time += parseFloat(score.time);
    lessons++;
    if(parseFloat(score.speed) > topSpeed)[
      topSpeed = parseFloat(score.speed)
    ]
    avgSpeed += parseFloat(score.speed);
    avgAccuracy += parseFloat(score.acuracy);
  })
  time = formatTime(time);
  todayTime.innerHTML = time;
  todayLessons.innerHTML = lessons;
  todayTopSpeed.innerHTML = `${topSpeed.toFixed(1)}wpm`;
  avgSpeed = avgSpeed / lessons;
  todayAvgSpeed.innerHTML =  `${avgSpeed.toFixed(1)}wpm`;
  todayAvgAccuracy.innerHTML = `${(avgAccuracy / lessons).toFixed(2)}%`;
}
window.addEventListener('DOMContentLoaded', todayDisplay);
window.addEventListener('DOMContentLoaded', allDisplay);





function formatTime(input) {
  const hours = Math.floor(input / 60); 
  const remainingMinutes = input % 60; 
  const minutes = Math.floor(remainingMinutes); 
  const seconds = Math.round((remainingMinutes - minutes) * 60);
  
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}