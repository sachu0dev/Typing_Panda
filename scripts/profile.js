
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
async function allDisplay(){
  try {
    const allScore = await scoreAPI.getScore();
    allTime.innerHTML = allScore.allTimeStats.time;
    allLessons.innerHTML = allScore.allTimeStats.lessons;
    allTopSpeed.innerHTML = allScore.allTimeStats.topSpeed;
    allAvgSpeed.innerHTML = allScore.allTimeStats.avgSpeed;
    allAvgAccuracy.innerHTML = allScore.allTimeStats.avgAccuracy;

    todayTime.innerHTML = allScore.todayStats.time;
    todayLessons.innerHTML = allScore.todayStats.lessons;
    todayTopSpeed.innerHTML = allScore.todayStats.topSpeed;
    todayAvgSpeed.innerHTML = allScore.todayStats.avgSpeed;
    todayAvgAccuracy.innerHTML = allScore.todayStats.avgAccuracy;
  } catch (error) {
    console.error('Error fetching score:', error);
    window.location.href = "./login.html";
  }
}


window.addEventListener('DOMContentLoaded', allDisplay);

function formatTime(input) {
  const hours = Math.floor(input / 60); 
  const remainingMinutes = input % 60; 
  const minutes = Math.floor(remainingMinutes); 
  const seconds = Math.round((remainingMinutes - minutes) * 60);
  
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}