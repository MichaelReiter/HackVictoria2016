// test_app
var express = require('express');
var path = require('path')
var app = express();


app.get('/', function (req, res) {
  res.sendFile(
    path.join('static', 'index.html'),
    {'root': __dirname}
  );
});

app.get('/test_end', function (req, res) {
  res.send('test!');
});



app.listen(3000, function () {
  console.log('Bus app listening on port 3000!');
});