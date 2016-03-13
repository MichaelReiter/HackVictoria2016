var socket = io.connect('http://localhost:3000');

socket.on('busMetrics', function(data) {
  console.log(data);
});

var app = {
  // Application Constructor
  initialize: function() {
    this.bindEvents();
  },
  // Bind Event Listeners
  //
  // Bind any events that are required on startup. Common events are:
  // 'load', 'deviceready', 'offline', and 'online'.
  bindEvents: function() {
    document.addEventListener('deviceready', this.onDeviceReady, false);
  },
  // deviceready Event Handler
  //
  // The scope of 'this' is the event. In order to call the 'receivedEvent'
  // function, we must explicitly call 'app.receivedEvent(...);'
  onDeviceReady: function() {
    app.receivedEvent('deviceready');
  },
  // Update DOM on a Received Event
  receivedEvent: function(id) {
    var parentElement = document.getElementById(id);
    var listeningElement = parentElement.querySelector('.listening');
    var receivedElement = parentElement.querySelector('.received');

    listeningElement.setAttribute('style', 'display:none;');
    receivedElement.setAttribute('style', 'display:block;');

    console.log('Received Event: ' + id);
  },

  initMap: function() {
    var mapDiv = document.getElementById('map');
    var map = new google.maps.Map(mapDiv, {
      center: {lat: 48.45, lng: -123.35},
      zoom: 12,
      streetViewControl: false,
      mapTypeControl: false
    });
  },

  populateBusList: function(busList) {
    for (var bus in busList) {
      var listElement = document.createElement('li');
      listElement.className = 'table-view-cell';
      document.getElementsByClassName('table-view')[0].appendChild(listElement);
      var anchor = document.createElement('a');
      anchor.className = 'navigate-right';
      listElement.appendChild(anchor);
      var busNumber = document.createTextNode(busList[bus].number);
      anchor.appendChild(busNumber);
    }
  }
};

app.initialize();

$(document).ready(function() {
  setTimeout(function() {app.initMap();}, 200);
});

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
  { number: "88", route: "Airport/Sidney", hasMetric: false }
]