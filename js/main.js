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
    userWelcomeText.innerHTML = user.email
    signupButton.style.display = 'none'
    loginButton.style.display = 'none'
    logoutButton.style.display = 'block'
    codeEntryForm.style.display = 'block'
    //setupSnippetFeed()
  } else {
    userWelcomeText.innerHTML = "Sign up today!"
    signupButton.style.display = 'block'
    loginButton.style.display = 'block'
    logoutButton.style.display = 'none'
    codeEntryForm.style.display = 'none'
    //removeSnippetFeed()
  }
}



const updateFeed = (user) => {
  const snippets = [];
  db.collection('users').doc(user.uid).collection('snippets').orderBy('date', 'desc').get()
    .then(snapshot => {
      snapshot.docs.slice().reverse().forEach(doc => {
        snippets.push(doc.data());
      });
    })
    .catch(err => {
      console.log('Error getting documents', err);
    });
  buildFeed(snippets);
}
function buildFeed(snippets) {
  console.log(snippets.length)
  for (var i = 0; i < snippets.length; i++) {
    console.log('hit build feed')

    let codeBlock = document.createElement('pre')
    codeBlock.className = "prettyprint linenums js"
    let innerText = document.createTextNode(snippets[i].snippetCode)
    codeBlock.append(innerText)
    snippetFeed.append(codeBlock)
  }
}
