// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyAvYQ5y6O5TsXcMUJ8WgV7WDvRC3TyKiTk",
  authDomain: "code-snippets-255de.firebaseapp.com",
  databaseURL: "https://code-snippets-255de.firebaseio.com",
  projectId: "code-snippets-255de",
  storageBucket: "code-snippets-255de.appspot.com",
  messagingSenderId: "131891731517",
  appId: "1:131891731517:web:2c7d53355056c149"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();
