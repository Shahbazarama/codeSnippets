// consts declared in main.js
// listen for auth status changes
auth.onAuthStateChanged(user => {
  if (user) {
    userAuthStateChanged(user);
  } else {
    userAuthStateChanged();
  }
})

// sign up
signupForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const email = document.querySelector('#signupEmail').value;
  const password = document.querySelector('#signupPassword').value;
  const name = document.querySelector('#signupName').value;

  // sign up the user
  auth.createUserWithEmailAndPassword(email, password).then((user) => {
    $('#signupModal').modal('toggle');
    signupForm.reset();

    // create user profile
    db.collection('users').doc(user.user.uid).set({
      name: name,
      email: user.user.email,
      userID: user.user.uid
    });
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
    updateFeed(user);
    console.log(user)
  });
});

// logout
logoutButton.addEventListener('click', (e) => {
  e.preventDefault();
  auth.signOut();
});
