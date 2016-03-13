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

var pathArr = __dirname.split("\\");
var pathStr = "";
for (var i = 0; i < pathArr.length - 1; i++) {
  pathStr += pathArr[i] + '\\';
}
pathStr = path.join(pathStr, 'app\\www\\');
app.use(express.static(pathStr));

var busList = [
  { number: "1", route: "Downtown/Richardson", hasMetric: false },
  { number: "2/2A", route: "Oak Bay/Willows/Downtown", hasMetric: false },
  { number: "3", route: "Beacon Hill/Gonzales", hasMetric: false },
  { number: "4", route: "UVic/Downtown", hasMetric: false },
  { number: "6", route: "Downtown/Royal Oak Exch", hasMetric: false },
  { number: "7", route: "UVic/Downtown", hasMetric: false },
  { number: "8", route: "Interurban/Tillicum Mall/Oak Bay", hasMetric: false },
  { number: "10", route: "Songhees/Royal Jubilee", hasMetric: false },
  { number: "11", route: "Tillicum Mall/UVic", hasMetric: false },
  { number: "12", route: "UVic/Univ Heights", hasMetric: false },
  { number: "13", route: "Ten Mile Point/UVic", hasMetric: false },
  { number: "14", route: "Vic General/UVic", hasMetric: false },
  { number: "15", route: "Esquimalt/UVic", hasMetric: false },
  { number: "16", route: "Uptown/UVic", hasMetric: false },
  { number: "17", route: "Cedar Hill", hasMetric: false },
  { number: "19", route: "Hillside Mall", hasMetric: false },
  { number: "21", route: "Downtown/Interurban", hasMetric: false },
  { number: "22/22n", route: "Vic General/Burnside/Hillside Mall/Downtown", hasMetric: false },
  { number: "24", route: "Cedar Hill/Admirals Walk", hasMetric: false },
  { number: "25", route: "Maplewood/Admirals Walk/Colwood Exch", hasMetric: false },
  { number: "26", route: "UVic/Dockyard", hasMetric: false },
  { number: "27x/28x", route: "Downtown Express/Majestic Express", hasMetric: false },
  { number: "27/28", route: "Gordon Head/Majestic/Downtown/Beacon Hill", hasMetric: false },
  { number: "30/31", route: "James Bay/Beacon Hill/Royal Oak Exch", hasMetric: false },
  { number: "32", route: "Cordova Bay/Royal Oak", hasMetric: false },
  { number: "33", route: "UVic", hasMetric: false },
  { number: "35", route: "Ridge", hasMetric: false },
  { number: "39", route: "Royal Roads/UVic/Royal Oak", hasMetric: false },
  { number: "47", route: "Goldstream Mdws/Downtown", hasMetric: false },
  { number: "48", route: "Happy Valley/Downtown", hasMetric: false },
  { number: "50", route: "Downtown/Langford", hasMetric: false },
  { number: "51", route: "Langford/UVic", hasMetric: false },
  { number: "52", route: "Colwood/Millstream/Bear Mtn", hasMetric: false },
  { number: "53", route: "Langford Exch/Colwood Exch", hasMetric: false },
  { number: "54", route: "Metchosin", hasMetric: false },
  { number: "55", route: "Happy Valley", hasMetric: false },
  { number: "56", route: "Thetis Heights/Langford Exch", hasMetric: false },
  { number: "57", route: "Thetis Heights/Westhills", hasMetric: false },
  { number: "58", route: "Goldstream Mdws", hasMetric: false },
  { number: "59/60", route: "Triangle Mtn/Wishart", hasMetric: false },
  { number: "61", route: "Langford/Downtown/Sooke", hasMetric: false },
  { number: "63", route: "Otter Point", hasMetric: false },
  { number: "64", route: "East Sooke", hasMetric: false },
  { number: "70/71/72", route: "Downtown Express/Swartz Bay/Downtown", hasMetric: false },
  { number: "75", route: "Royal Oak/Downtown/Saanichton", hasMetric: false },
  { number: "76", route: "Swartz Bay/UVic", hasMetric: false },
  { number: "81", route: "Swartz Bay/Sidney/Brentwood/Keating X", hasMetric: false },
  { number: "83", route: "Royal Oak Exch/Sidney", hasMetric: false },
  { number: "85", route: "North Saanich", hasMetric: false },
  { number: "88", route: "Airport/Sidney", hasMetric: false },
  // { number: "-1", route: "Narnia/Westeros", hasMetric: true, lat: 48.45, lng: -123.35  },
  // { number: "-2", route: "Narnia/Westeros", hasMetric: true, lat: 48.4716147, lng: -123.3346729  }

];

//48.4715862,-123.3346515

io.on('connection', function(socket) {
  console.log("connected");
  activeBusList = [];
  for (var i = 0; i < busList.length; i++) {
    if (busList[i].hasMetric) {
      activeBusList.push(busList[i]);
    }
  }
  io.emit('busInit', activeBusList);
});

app.get('/', function(req, res) {
  console.log(pathStr);
  res.sendFile(
    path.join(pathStr, 'index.html')
  );

});

app.get('/test_end', function(req, res) {
  res.send('test!');
});

app.post('/location', function(req, res) {
  var data = req.body;
  console.log(data);
  io.emit('updateBus', data);
  res.sendStatus(200);
});

httpServer.listen(3000, function() {
  console.log('listening on 3000');
})