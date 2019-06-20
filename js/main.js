const signupForm = document.querySelector('#signupForm');
const loginForm = document.querySelector('#loginForm');
const followForm = document.querySelector('#followForm');
const followEmail = document.querySelector('#followEmail');
const userWelcomeText = document.querySelector('#userWelcomeText');
const signupButton = document.querySelector('#signupButton');
const loginButton = document.querySelector('#loginButton');
const logoutButton = document.querySelector('#logoutButton');
const codeEntryForm = document.querySelector('#codeEntryForm');
const codeEntry = document.querySelector('#codeEntry');
const snippetFeed = document.querySelector('#snippetFeed');


const userAuthStateChanged = (user) => {
  if (user) {
    db.collection('users').where("userID", "==", `${user.uid}`).get().then((snapshot) => {
      snapshot.docs.forEach((doc) => {
        userWelcomeText.innerHTML = `Hello, ${doc.data().name}`
      })
    })
    followForm.style.display = ''
    signupButton.style.display = 'none'
    loginButton.style.display = 'none'
    logoutButton.style.display = 'block'
    codeEntryForm.style.display = 'block'
    updateFeed(user)
  } else {
    userWelcomeText.innerHTML = "Sign up today!"
    followForm.style.display = 'none'
    signupButton.style.display = 'block'
    loginButton.style.display = 'block'
    logoutButton.style.display = 'none'
    codeEntryForm.style.display = 'none'
    removeSnippetFeed()
  }
}

const removeSnippetFeed = () => {
  while (snippetFeed.firstChild) {
    snippetFeed.removeChild(snippetFeed.firstChild);
  }
}

const updateFeed = (user) => {
  // clear current feed
  while (snippetFeed.firstChild) {
    snippetFeed.removeChild(snippetFeed.firstChild);
  }

  var followingUsers;
  db.collection('users').where('userID', '==', `${user.uid}`).get().then((snapshot) => {
    followingUsers = snapshot.docs[0].data().following
  }).then(() => {

    //var snippetsToLoad = [];
    db.collection('snippets').orderBy('date', 'desc').get().then((snapshot) => {
      snapshot.docs.forEach((doc) => {

        // check if user is on following list
        if (followingUsers.includes(doc.data().author)) {

          // DOM to write snippet to window
          let codeBlock = document.createElement('pre')
          codeBlock.className = "prettyprint linenums js prettyprinted"
          codeBlock.innerHTML = PR.prettyPrintOne(doc.data().snippetCode)
          let emailText = document.createElement('h4')
          emailText.textContent = doc.data().author
          snippetFeed.append(emailText)
          snippetFeed.append(codeBlock)
        }
      })
    })
  })
}

// set up better text editor
