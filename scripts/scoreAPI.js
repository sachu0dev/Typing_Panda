export default class scoreAPI {
  
  static getAllScore(scoresList) {
    const date = new Date();
    const scores = JSON.parse(localStorage.getItem(`userScore-${date.getMonth() + 1}${date.getDate()}`)) || [];
    return scores
  }

  static getEveryScore(){
    const scores = JSON.parse(localStorage.getItem("everyScore")) || [];
    return scores
  }

  static saveEveryScore() {
    const scoresList = scoreAPI.getEveryScore();
    const date = new Date(); // Declare date here
    const today = `userScore-${date.getMonth() + 1}${date.getDate()}`;
    if (!scoresList.includes(today)) {
      scoresList.push(today);
      localStorage.setItem("everyScore", JSON.stringify(scoresList));
    }
  }
  
  static saveScore(scoreToSave) {
    scoreAPI.saveEveryScore();
    const scores = scoreAPI.getAllScore();
      scoreToSave.updated = new Date().toISOString();
    const date = new Date();
      scores.push(scoreToSave);
      localStorage.setItem(`userScore-${date.getMonth() + 1}${date.getDate()}`, JSON.stringify(scores));
    }

    static setAllTimeState(req, stats){
      if(req === "get"){
        stats = JSON.parse(localStorage.getItem("allTimeState"));
        return stats
      } else if(req === "set"){
        localStorage.setItem("allTimeState", JSON.stringify(stats));
      }
    }

    static setTodayState(req, stats){
      if(req === "get"){
        stats = JSON.parse(localStorage.getItem("allTimeState"));
        return stats
      } else if(req === "set"){
        localStorage.setItem("todayState", JSON.stringify(stats));
      }
    }
  }