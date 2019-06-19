const express = require('express');
const path = require('path')
const port = process.env.PORT || 8000;

const app = express();
app.use(express.static(__dirname + '/js'));
app.use(express.static(__dirname + '/codemirror'));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('index')
})

app.listen(port, function() {
  console.log('listening on port, ', port);
})
