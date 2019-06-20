// consts declared in main.js

followForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const emailToFollow = followEmail.value;

  let userRef = auth.currentUser;

  if (userRef) {
    // get current following, then append new on in array and set
    let currentFollowing = [];

    db.collection('users').where('userID', '==', `${userRef.uid}`).get().then((snapshot) => {
      currentFollowing = snapshot.docs[0].data().following
      currentFollowing.push(emailToFollow)
    }).then(() => {
      db.collection('users').where('userID', '==', `${userRef.uid}`).get().then((snapshot) => {
        snapshot.docs.forEach( (doc) => {
          doc.ref.update({
            following: currentFollowing
          }).then(() => {
            followEmail.value = ''
            followEmail.placeholder = 'User followed!'
            updateFeed(userRef)
          })
        })
      })
    });

  }
})
