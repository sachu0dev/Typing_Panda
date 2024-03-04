
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
const username = document.querySelector('.username');
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
    const username = localStorage.getItem("username");
    if(!username){
      window.location.href = "./login.html";
    }
  }
}
async 

window.addEventListener('DOMContentLoaded', allDisplay);
window.addEventListener('DOMContentLoaded', displayUsername);
function displayUsername(){
  username.innerHTML = `@${localStorage.getItem("username")}`;
}
// charts 
// import Chart from 'chart.js/auto';

// async function displayAcquisitions() {
//   const data = await scoreAPI.getChart();

//   new Chart(
//     document.getElementById('acquisitions'),
//     {
//       type: 'bar',
//       data: {
//         labels: data.map(row => row.year),
//         datasets: [
//           {
//             label: 'Acquisitions by year',
//             data: data.map(row => row.count)
//           }
//         ]
//       }
//     }
//   );
// };

// displayAcquisitions();
