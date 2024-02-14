export default class scoreAPI {
  
  static getAllScore() {
    const date = new Date();
    const scores = JSON.parse(localStorage.getItem(`user-score-${date.getDate()}-${date.getMonth() + 1}`)) || [];
    return scores
  }

  static saveScore(scoreToSave) {
    const scores = scoreAPI.getAllScore();
      scoreToSave.updated = new Date().toISOString();
    const date = new Date();
      scores.push(scoreToSave);
      localStorage.setItem(`user-score-${date.getDate()}-${date.getMonth() + 1}`, JSON.stringify(scores));
    }
  }