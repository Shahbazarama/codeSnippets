const signupForm = document.querySelector('#signupForm');
const loginForm = document.querySelector('#loginForm');
const followForm = document.querySelector('#followForm');
const followEmail = document.querySelector('#followEmail');
const userWelcomeText = document.querySelector('#userWelcomeText');
const signupButton = document.querySelector('#signupButton');
const signupErrorText = document.querySelector('#signupErrorText');
const loginErrorText = document.querySelector('#loginErrorText');
const loginButton = document.querySelector('#loginButton');
const logoutButton = document.querySelector('#logoutButton');
const codeEntryForm = document.querySelector('#codeEntryForm');
const codeEntry = document.querySelector('#codeEntry');
const snippetFeed = document.querySelector('#snippetFeed');
const deleteButton = document.querySelector('#deleteButton');
const newUserToast = document.querySelector('#newUserToast');
const templateSnippetFeed = document.querySelector('#templateSnippetFeed');
const userFollowingList = document.querySelector('#userFollowingList');
const dropDownMenu = document.querySelector('#dropDownMenu');


const userAuthStateChanged = (user) => {
  if (user) {
    db.collection('users').where("userID", "==", `${user.uid}`).get().then((snapshot) => {
      snapshot.docs.forEach((doc) => {
        userWelcomeText.innerHTML = `Hello, ${doc.data().name}`
      })
    })
    dropDownMenu.style.display = ''
    followForm.style.display = ''
    signupButton.style.display = 'none'
    loginButton.style.display = 'none'
    logoutButton.style.display = 'block'
    codeEntryForm.style.display = 'block'
    templateSnippetFeed.style.display = 'none'
    updateFeed(user)
    setUpFollowingList(user)
  } else {
    userWelcomeText.innerHTML = ""
    dropDownMenu.style.display = 'none'
    followForm.style.display = 'none'
    signupButton.style.display = 'block'
    loginButton.style.display = 'block'
    logoutButton.style.display = 'none'
    codeEntryForm.style.display = 'none'
    templateSnippetFeed.style.display = ''
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
  removeSnippetFeed()

  var followingUsers;

  db.collection('users').where('userID', '==', `${user.uid}`).get()
  .then((snapshot) => {
    // get data of who the current user is following
    followingUsers = snapshot.docs[0].data().following
  }).then(() => {

    db.collection('snippets').orderBy('date', 'desc').get().then((snapshot) => {
      snapshot.docs.forEach((doc) => {

        // check if user is on following list
        if (followingUsers.includes(doc.data().author)) {

          // DOM to write snippet to window
          let titleRow = document.createElement('div')
          titleRow.className = 'row justify-content-between'

          let codeBlock = document.createElement('pre')
          codeBlock.className = "prettyprint js prettyprinted"
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
  }).catch ( (e) => {
    console.log('no posts', e)
  })
}

// set up better text editor
