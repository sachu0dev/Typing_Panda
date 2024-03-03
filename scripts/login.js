
const sign_in_btn = document.querySelector("#sign-in-btn");
const sign_up_btn = document.querySelector("#sign-up-btn");
const container = document.querySelector(".container");

sign_up_btn.addEventListener("click", () => {
  container.classList.add("sign-up-mode");
});

sign_in_btn.addEventListener("click", () => {
  container.classList.remove("sign-up-mode");
});
// signup form
const logEmail = document.querySelector("#log-email");
const logPass = document.querySelector("#log-pass");
const logBtn = document.querySelector("#log-btn");
// signup form
const signEmail = document.querySelector("#sign-email");
const signUsername = document.querySelector("#sign-username");
const signPass = document.querySelector("#sign-pass");
const signBtn = document.querySelector("#sign-btn");

const errorBox = document.querySelector(".error-box");

signBtn.addEventListener("click", signUser);
logBtn.addEventListener("click", logUser);
// 
async function signUser(e){
  e.preventDefault();
  const username = signUsername.value;
  const email = signEmail.value;
  const password = signPass.value;
const raw = {
 username,
  password,
  email
};
const response = await fetch("http://localhost:3000/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(raw),
    });

    const result = await response.json();
    if(result){
      showError(result);
    }
}

 async function logUser(e){
  e.preventDefault();
  const email = logEmail.value;
  const password = logPass.value;
const raw = {
  password,
  email
};
  const response = await fetch("https://typingpanda-backend.vercel.app/signin", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(raw),
  });

  const result = await response.json();
  console.log(result);
  if(result){
    showError(result);
  }
}

function showError(result){
  errorBox.textContent = result.message;
  const token = result.token;
  const username = result.username;
  if(token){
    localStorage.setItem("token", token);
    localStorage.setItem("username", username);
    setTimeout(() => {
      window.location.href = "index.html";
    },2000)
  }
  errorBox.classList.add("show-error");
  setTimeout(() => {
    errorBox.classList.remove("show-error");
    errorBox.textContent = "";
  },2000)
}