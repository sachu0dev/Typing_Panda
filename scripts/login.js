const signUsername = document.getElementById("sign-username");
const signEmail = document.getElementById("sign-email");
const signPswd = document.getElementById("sign-pswd");
const signBtn = document.querySelector(".sign");
const errorBox = document.querySelector(".error-box");
const loginEmail = document.getElementById("login-email");
const loginPswd = document.getElementById("login-pswd");
const loginBtn = document.querySelector(".log");

signBtn.addEventListener("click", signUser);
loginBtn.addEventListener("click", logUser);

async function signUser(e){
  e.preventDefault();
  const username = signUsername.value;
  const email = signEmail.value;
  const password = signPswd.value;
const raw = {
 username,
  password,
  email
};
console.log(raw)
const requestOptions = {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: raw
};
const response = await fetch("http://localhost:3001/signup", {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(raw),
    });

    const result = await response.json();

}

function logUser(){
  const email = loginEmail.value;
  const pswd = loginPswd.value;
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify({
    "email": email,
    "password": pswd
  });

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow"
  };

  fetch("http://localhost:3000/login", requestOptions)
    .then(response => response.text())
    .then(result => {
      // Handle the response accordingly, such as redirecting to a new page or displaying a success message
    })
    .catch(error => console.error(error));
}
