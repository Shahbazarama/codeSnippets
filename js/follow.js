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
      if (!currentFollowing.includes(emailToFollow)) {
        currentFollowing.push(emailToFollow)
      } else {
        console.log('already following')
      }
    }).then(() => {
      db.collection('users').where('userID', '==', `${userRef.uid}`).get().then((snapshot) => {
        snapshot.docs.forEach((doc) => {
          doc.ref.update({
            following: currentFollowing
          }).then(() => {
            followEmail.value = ''
            followEmail.placeholder = 'User followed!'
            updateFeed(userRef)
            setUpFollowingList(userRef)
          })
        })
      })
    });
  }
})

const clearFollowingList = () => {
  while (userFollowingList.firstChild) {
    userFollowingList.removeChild(userFollowingList.firstChild);
  }
}

function setUpFollowingList(user) {

  let currentFollowing = []

  db.collection('users').where('userID', '==', `${user.uid}`).get().then((snapshot) => {
    currentFollowing = snapshot.docs[0].data().following
  }).then(() => {
    // build out following list and add event listener to unfollow on click
    clearFollowingList()
    for (var i = 1; i < currentFollowing.length; i++) {
      console.log(currentFollowing[i])
      let followingAnchor = document.createElement('a')
      followingAnchor.className = 'dropdown-item'
      followingAnchor.innerHTML = currentFollowing[i]
      followingAnchor.data = currentFollowing[i]
      followingAnchor.addEventListener('click', () => {

        db.collection('users').where('userID', '==', `${user.uid}`).get().then((snapshot) => {
          let currentFollowing = snapshot.docs[0].data().following;
        }).then(() => {
          var index = currentFollowing.indexOf(followingAnchor.data);
          if (index !== -1) {
            currentFollowing.splice(index, 1);
          }
        }).then(() => {
          db.collection('users').where('userID', '==', `${user.uid}`).get().then((snapshot) => {
            snapshot.docs[0].ref.update({
              following: currentFollowing
            }).then(() => {
              updateFeed(user)
              setUpFollowingList(user)
            })
          })
        })
      })
      userFollowingList.append(followingAnchor);
    }
  })
}
