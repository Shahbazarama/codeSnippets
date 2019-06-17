(function() {


  const signupForm = document.querySelector('#signupForm');
  const loginForm = document.querySelector('#loginForm');
  const logoutButton = document.querySelector('#logoutButton');
  const userWelcomeText = document.querySelector('#userWelcomeText');

  // listen for auth status changes
  auth.onAuthStateChanged(user => {
    if (user) {
      userWelcomeText.innerHTML = 'Welcome, ' + user.email
    } else {
      userWelcomeText.innerHTML = ''
    }
  })

  // sign up
  signupForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const email = document.querySelector('#signupEmail').value;
    const password = document.querySelector('#signupPassword').value;

    // sign up the user
    auth.createUserWithEmailAndPassword(email, password).then((user) => {
      $('#signupModal').modal('toggle');
      signupForm.reset();
      console.log(user)
    });
  })

  // login
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const email = document.querySelector('#loginEmail').value;
    const password = document.querySelector('#loginPassword').value;

    // log the user in
    auth.signInWithEmailAndPassword(email, password).then((user) => {
      $('#loginModal').modal('toggle');
      loginForm.reset();
      console.log(user)
    });
  });

  // logout
  logoutButton.addEventListener('click', (e) => {
    e.preventDefault();
    auth.signOut();
  });

}());
