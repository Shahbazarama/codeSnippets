// consts declared in main.js

codeEntryForm.addEventListener('submit', (e) => {
  e.preventDefault();

  let codeToBeSaved = codeEntry.value;
  var user = auth.currentUser;
  db.collection('snippets').add({
    userID: user.uid,
    author: user.email,
    date: firebase.firestore.Timestamp.fromDate(new Date()),
    snippetCode: codeToBeSaved
  }).catch( (e) =>{
    console.log('error saving snippet, ', e)
  })

  codeEntry.value = ''
  updateFeed(user);
})
