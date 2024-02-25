const signUsername = document.getElementById("sign-username");
const signEmail = document.getElementById("sign-email");
const signPswd = document.getElementById("sign-pswd");
const signBtn = document.querySelector(".sign");

const loginEmail = document.getElementById("login-email");
const loginPswd = document.getElementById("login-pswd");
const loginBtn = document.querySelector(".log");
signBtn.addEventListener("click", signUser);
loginBtn.addEventListener("click", logUser);

function signUser(){
  const username = signUsername.value;
  const email = signEmail.value;
  const pswd = signPswd.value;
  postSign(username, email, pswd);
}

function logUser(){
  const username = loginEmail.value;
  const email = loginEmail.value;
  const pswd = loginPswd.value;
  postLogin(username, email, pswd);
}

function signUser(username, email, pswd){ 
  const raw = JSON.stringify({
    "email": email,
    "password": pswd,
    "username": username
  });

const requestOptions = {
  method: "POST",
  body: raw,
  redirect: "follow"
};

fetch("http://localhost:3000/signup", requestOptions)
  .then((response) => response.text())
  .then((result) => console.log(result))
  .catch((error) => console.error(error));
}

function logUser(username, email, pswd){
  const raw = JSON.stringify({
    "email": email,
    "password": pswd,
    "username": username
  });
  
  const requestOptions = {
    method: "POST",
    body: raw,
    redirect: "follow"
  };
  
  fetch("http://localhost:3000/signin", requestOptions)
    .then((response) => response.text())
    .then((result) => {
      console.log(result);
      if(result === "success"){
        window.location.href = "index.html";
        localStorage.setItem("authToken", result);
      }else{
        alert("Wrong username or password");
      }
    })
    .catch((error) => console.error(error));
}
