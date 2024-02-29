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
const response = await fetch("http://localhost:3000/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(raw),
    });

    const result = await response.json();
    if(result.message){
      errorBox.textContent = result.message;
      errorBox.classList.add("show-error-box");
      setTimeout(() => {
        errorBox.classList.remove("show-error-box");
      })
    }
}

 async function logUser(e){
  e.preventDefault();
  const email = signEmail.value;
  const password = signPswd.value;
const raw = {
  password,
  email
};
  const response = await fetch("http://localhost:3000/signin", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(raw),
  });

  const result = await response.json();
  console.log(result);
  if(result.message){
    errorBox.textContent = result.message;
    errorBox.classList.add("show-error-box");
    setTimeout(() => {
      errorBox.classList.remove("show-error-box");
    })
  }
}
