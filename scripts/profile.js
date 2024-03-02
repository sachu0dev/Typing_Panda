
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
export function allDisplay(){
  const scoresList = scoreAPI.getEveryScore();
  let time = 0;
  let lessons = 0;
  let topSpeed = 0;
  let avgSpeed = 0;
  let avgAccuracy = 0;
  let score = 0;
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
  const allStates ={
    time : time,
    lessons : lessons,
    topSpeed : 0,
    avgSpeed : 0,
    avgAccuracy : 0,
    score: 0
  }
  time = formatTime(time);
  allStates.lessons
  allStates.topSpeed = `${topSpeed.toFixed(1)}wpm`;
  allStates.avgSpeed = `${(avgSpeed / (lessons)).toFixed(1)}wpm`;
  allStates.avgAccuracy = `${(avgAccuracy / (lessons)).toFixed(2)}%`;
  allStates.score = (avgSpeed * (lessons)).toFixed(0);
  console.log(allStates);
  scoreAPI.setAllTimeState("set", allStates);

  allTime.innerHTML = time;
  allLessons.innerHTML = lessons;
  allTopSpeed.innerHTML = allStates.topSpeed;
  allAvgSpeed.innerHTML = allStates.avgSpeed;
  allAvgAccuracy.innerHTML = allStates.avgAccuracy;
}

export function todayDisplay(){
  const scores = scoreAPI.getAllScore();
  let time = 0;
  let lessons = 0;
  let topSpeed = 0;
  let avgSpeed = 0;
  let avgAccuracy = 0;
  scores.forEach(score => {
    time += parseFloat(score.time);
    lessons++;
    if(parseFloat(score.speed) > topSpeed){
      topSpeed = parseFloat(score.speed)
    }
    avgSpeed += parseFloat(score.speed);
    avgAccuracy += parseFloat(score.acuracy);
  })
  const todayStates ={
    time : time,
    lessons : lessons,
    topSpeed : 0,
    avgSpeed : 0,
    avgAccuracy : 0,
    score: 0
  }
  time = formatTime(time);
  todayStates.topSpeed = `${topSpeed.toFixed(1)}wpm`;
  todayStates.avgSpeed = `${(avgSpeed / (lessons)).toFixed(1)}wpm`;
  todayStates.avgAccuracy = `${(avgAccuracy / (lessons)).toFixed(2)}%`;
  todayStates.score = (avgSpeed * (lessons)).toFixed(0);
  console.log(todayStates);
  scoreAPI.setTodayState("set", todayStates);

  todayTime.innerHTML = time;
  todayLessons.innerHTML = lessons;
  todayTopSpeed.innerHTML = todayStates.topSpeed;
  todayAvgSpeed.innerHTML =  todayStates.avgSpeed;
  todayAvgAccuracy.innerHTML = todayStates.avgAccuracy;
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