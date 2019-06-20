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

  // firebase sign up
  auth.createUserWithEmailAndPassword(email, password).then((userRef) => {
    $('#signupModal').modal('toggle');
    signupForm.reset();

    // create user profile
    db.collection('users').add({
      name: name,
      email: userRef.user.email,
      userID: userRef.user.uid,
      following: [`${userRef.user.email}`]
    });
  });

});

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
  });
});

// logout
logoutButton.addEventListener('click', (e) => {
  e.preventDefault();
  auth.signOut();
});
