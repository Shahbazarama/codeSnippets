const userWelcomeText = document.querySelector('#userWelcomeText');
const signupButton = document.querySelector('#signupButton');
const loginButton = document.querySelector('#loginButton');
const logoutButton = document.querySelector('#logoutButton');

const userAuthStateChanged = (user) => {
  if (user) {
    userWelcomeText.innerHTML = user.email
    signupButton.style.display = 'none'
    loginButton.style.display = 'none'
    logoutButton.style.display = 'block'
  } else {
    userWelcomeText.innerHTML = "Sign up today!"
    signupButton.style.display = 'block'
    loginButton.style.display = 'block'
    logoutButton.style.display = 'none'
  }
}
