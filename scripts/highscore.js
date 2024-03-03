
const userRanks = document.querySelector(".user-ranks");

window.addEventListener('DOMContentLoaded', displayRank);
async function getRanking(){
  const response = await fetch("http://localhost:3000/rankings", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `${localStorage.getItem("token")}`
    },
  });
  const result = await response.json();
  return result
}
async function displayRank() {
  try {
    const scores = await getRanking();
    const leaderboard = scores.leaderboard;
    leaderboard.forEach((user, index) => {
      const rank = document.createElement("div");
      rank.classList.add("rank-col");
      rank.innerHTML = `
        <span>${index + 1}.</span>
        <span>${user.username}</span>
        <span>${user.topSpeed}WPM</span>
      `;
      userRanks.appendChild(rank);
    });
  } catch (error) {
    const username = localStorage.getItem("username");
    if (!username) {
      window.location.href = "./login.html";
    } else {
      console.error("Error fetching ranking:", error);
    }
  }
}

