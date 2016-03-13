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
      console.log(busList[bus]);
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

[
{ number: "1", route: "Downtown/Richardson", hasMetric: false }, 
{ number: "2/2A", route: "Oak Bay/Willows/Downtown", hasMetric: false }, 
{ number: "3", route: "Beacon Hill/Gonzales", hasMetric: false }, 

 
4 UVic/Downtown
6 Downtown/Royal Oak Exch
7 UVic/Downtown
8 Interurban/Tillicum Mall/Oak Bay
10 Songhees/Royal Jubilee
11 Tillicum Mall/UVic
12 UVic/Univ Heights
13 Ten Mile Point/UVic
14 Vic General/UVic
15 Esquimalt/UVic
16 Uptown/UVic
17 Cedar Hill
19 Hillside Mall
21 Downtown/Interurban
22/22n Vic General/Burnside/Hillside Mall/Downtown
24 Cedar Hill/Admirals Walk
25 Maplewood/Admirals Walk/Colwood Exch
26 UVic/Dockyard
27x/28x Downtown Express/Majestic Express
27/28 Gordon Head/Majestic/Downtown/Beacon Hill
30/31 James Bay/Beacon Hill/Royal Oak Exch
32 Cordova Bay/Royal Oak
33 UVic
35 Ridge
39 Royal Roads/UVic/Royal Oak
47 Goldstream Mdws/Downtown
48 Happy Valley/Downtown
50 Downtown/Langford
51 Langford/UVic
52 Colwood/Millstream/Bear Mtn
53 Langford Exch/Colwood Exch
54 Metchosin
55 Happy Valley
56 Thetis Heights/Langford Exch
57 Thetis Heights/Westhills
58 Goldstream Mdws
59/60 Triangle Mtn/Wishart
61 Langford/Downtown/Sooke
63 Otter Point
64 East Sooke
70/71/72 Downtown Express/Swartz Bay/Downtown
75 Royal Oak/Downtown/Saanichton
76 Swartz Bay/UVic
81 Swartz Bay/Sidney/Brentwood/Keating X
83 Royal Oak Exch/Sidney
85 North Saanich
88 Airport/Sidney
]