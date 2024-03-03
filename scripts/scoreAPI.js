export default class scoreAPI {
    static async postScore(scoreToSave){
      const raw = scoreToSave;
        const response = await fetch("http://localhost:3000/score", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `${localStorage.getItem("token")}`
          },
          body: JSON.stringify(raw),
        });
      
        const result = await response.json();
        console.log(result);
    }
    static async getScore(){
      const response = await fetch("http://localhost:3000/profile", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `${localStorage.getItem("token")}`
        },
      });
      const result = await response.json();
      return result
    }
    static async getRanking(){
      const response = await fetch("http://localhost:3000/ranking", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `${localStorage.getItem("token")}`
        },
      });
      const result = await response.json();
      return result
    }
  }