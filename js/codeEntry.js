// consts declared in main.js

codeEntryForm.addEventListener('submit', (e) => {
  e.preventDefault();

  let codeToBeSaved = codeEntry.value;
  var user = auth.currentUser;
  db.collection('users').doc(user.uid).collection('snippets').add({
    date: firebase.firestore.Timestamp.fromDate(new Date()),
    snippetCode: codeToBeSaved
  }).then( () => {
    console.log("snippet saved")
  }).catch( (e) =>{
    console.log('error saving snippet, ', e)
  })
  codeEntry.value = ''

  updateFeed(user);
})
