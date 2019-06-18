const functions = require('firebase-functions');
const express = require('express');
const firebase = require('firebase-admin')
const path = require('path')

const firebaseApp = firebase.initializeApp(
  functions.config().firebase
);

const app = express();

//app.use(express.static(path.join(__dirname, 'js')))
app.set('views', './views')
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('index')
})

exports.app = functions.https.onRequest(app);

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
