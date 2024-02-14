export default class scoreAPI {
  static getAllScore() {
    const scores = JSON.parse(localStorage.getItem('user-score')) || [];
    return scores
  }

  static saveScore(scoreToSave) {
    const scores = scoreAPI.getAllScore();
      scoreToSave.updated = new Date().toISOString();

      scores.push(scoreToSave);
      localStorage.setItem('user-score', JSON.stringify(scores));
  }
}