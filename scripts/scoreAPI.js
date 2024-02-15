export default class scoreAPI {
  
  static getAllScore() {
    const date = new Date();
    const scores = JSON.parse(localStorage.getItem(`userScore-${date.getMonth() + 1}${date.getDate()}`)) || [];
    return scores
  }

  static saveScore(scoreToSave) {
    const scores = scoreAPI.getAllScore();
      scoreToSave.updated = new Date().toISOString();
    const date = new Date();
      scores.push(scoreToSave);
      localStorage.setItem(`userScore-${date.getMonth() + 1}${date.getDate()}`, JSON.stringify(scores));
    }
  }