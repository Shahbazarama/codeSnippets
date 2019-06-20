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
const deleteButton = document.querySelector('#deleteButton');

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
          let titleRow = document.createElement('div')
          titleRow.className = 'row justify-content-between'

          let codeBlock = document.createElement('pre')
          codeBlock.className = "prettyprint linenums js prettyprinted"
          codeBlock.innerHTML = PR.prettyPrintOne(doc.data().snippetCode)

          let emailText = document.createElement('h4')
          emailText.textContent = doc.data().author
          titleRow.append(emailText)

          // give it a delete button if it's the current user's post
          if (doc.data().author == user.email) {
            let deleteButton = document.createElement('button')
            deleteButton.id = "deleteButton"
            deleteButton.className = "btn btn-danger btn-sm"
            deleteButton.value = doc.id;
            deleteButton.innerHTML = "Delete Post"

            // look for snippet that has id equal to id set to button value
            deleteButton.addEventListener('click', (e) => {
              db.collection('snippets').get().then((snapshot) => {
                snapshot.docs.forEach((doc) => {
                  if (doc.id == deleteButton.value) {
                    doc.ref.delete();
                    updateFeed(auth.currentUser)
                  }
                })
              })
            })

            titleRow.append(deleteButton)
          }
          snippetFeed.append(titleRow)
          snippetFeed.append(codeBlock)
        }
      })
    })
  })
}

// set up better text editor
