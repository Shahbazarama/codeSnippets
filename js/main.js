const signupForm = document.querySelector('#signupForm');
const loginForm = document.querySelector('#loginForm');
const userWelcomeText = document.querySelector('#userWelcomeText');
const signupButton = document.querySelector('#signupButton');
const loginButton = document.querySelector('#loginButton');
const logoutButton = document.querySelector('#logoutButton');
const codeEntryForm = document.querySelector('#codeEntryForm');
const codeEntry = document.querySelector('#codeEntry');
const snippetFeed = document.querySelector('#snippetFeed');


const userAuthStateChanged = (user) => {
  if (user) {
    db.collection('users').doc(user.uid).get().then(doc => {
      userWelcomeText.innerHTML = `Hello, ${doc.data().name}`
    })
    signupButton.style.display = 'none'
    loginButton.style.display = 'none'
    logoutButton.style.display = 'block'
    codeEntryForm.style.display = 'block'
    updateFeed(user)
  } else {
    userWelcomeText.innerHTML = "Sign up today!"
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
  while (snippetFeed.firstChild) {
    snippetFeed.removeChild(snippetFeed.firstChild);
  }
  var snippetsArray = [];
  db.collection('users').doc(user.uid).collection('snippets').orderBy('date', 'desc').get()
    .then(snapshot => {
      snapshot.docs.slice().forEach(doc => {
        let codeBlock = document.createElement('pre')
        codeBlock.className = "prettyprint linenums js prettyprinted"
        codeBlock.innerHTML = PR.prettyPrintOne(doc.data().snippetCode)
        //codeBlock.append(innerText)
        let emailText = document.createElement('h4')
        db.collection('users').doc(user.uid).get().then(doc => {
          emailText.textContent = doc.data().name
        })
        snippetFeed.append(emailText)
        snippetFeed.append(codeBlock)
      });
    })
    .catch(err => {
      console.log('Error getting documents', err);
    });
}
