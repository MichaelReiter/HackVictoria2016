var express = require('express');
var path = require('path');
var socketio = require('socket.io');
var http = require('http');
var bodyParser = require('body-parser');

var app = express();
var httpServer = http.Server(app);
var io = socketio(httpServer);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

io.on('connection', function(socket) {
  console.log("connected");
});

app.get('/', function (req, res) {
  res.sendFile(
    path.join(__dirname, 'static/index.html')
  );
});

app.get('/test_end', function (req, res) {
  res.send('test!');
});

app.post('/location', function(req, res) {
  var data = req.body;
  console.log(data);
  io.emit('busMetrics', data);
  res.sendStatus(200);
});

httpServer.listen(3000, function() {
  console.log('listening on 3000');
})