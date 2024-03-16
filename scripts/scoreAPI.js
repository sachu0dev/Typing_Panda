export default class scoreAPI {
    static async postScore(scoreToSave){
      const raw = scoreToSave;
        const response = await fetch("https://typingpanda-backend.vercel.app/score", {
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
      const response = await fetch("https://typingpanda-backend.vercel.app/profile", {
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
      const response = await fetch("https://typingpanda-backend.vercel.app/ranking", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `${localStorage.getItem("token")}`
        },
      });
      const result = await response.json();
      return result
    }
    static async getChart(){
      const response = await fetch("https://typingpanda-backend.vercel.app/chart", {
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