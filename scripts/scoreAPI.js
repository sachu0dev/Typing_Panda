export default class scoreAPI {
  static getAllScore() {
    const notes = JSON.parse(localStorage.getItem('user-score')) || [];
    return notes.sort((a, b) =>{
      return new Date(a.updated) > new Date(b.updated)? -1 : 1;
    });
  }

  static saveScore(scoreToSave) {
    const scores = NotesAPI.getAllScore();
      scoreToSave.updated = new Date().toISOString();
      scores.push(scoreToSave);
      localStorage.setItem('user-score', JSON.stringify(scores));
  }
}