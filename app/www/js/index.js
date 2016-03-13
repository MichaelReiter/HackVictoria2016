var socket = io.connect('http://localhost:3000');

var busMarkers = [];
var mapDiv = document.getElementById('map');

setTimeout(function() {initMap();}, 200);

var map = null; 

function initMap() { 
  map = new google.maps.Map(mapDiv, {
    center: {lat: 48.45, lng: -123.35},
    zoom: 12,
    streetViewControl: false,
    mapTypeControl: false
  });

}

socket.on('busInit', function(activeBusList) {

});

function addMarker(id, lat, lng){
  var marker = new google.maps.Marker({
    position: new google.maps.LatLng(lat, lng),
    map: map
  });
  marker.setPosition(new google.maps.LatLng(lat, lng));
  busMarkers.push({id: id, markerObject: marker});
}

function updateMarker(marker, lat, lng){
  marker.setPosition(new google.maps.LatLng(lat, lng));
}

socket.on('updateBus', function(data) {
  console.log('len of Bus marker List ' + busMarkers.length)
  console.log('updating bus # ' + data.number );

  var id = data.number;
  var lat = data.lat;
  var lng = data.lng;

  var marker = {};
  for (var i = 0; i < busMarkers.length; i++) {
    // console.log(busMarkers);
    if (id === busMarkers[i].id){
      marker = busMarkers[i].markerObject;
      updateMarker(marker, lat, lng);
      return;
    }
  };

  addMarker(id, lat, lng);

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

  // initMap: function() {
  //   var mapDiv = document.getElementById('map');
  //   var map = new google.maps.Map(mapDiv, {
  //     center: {lat: 48.45, lng: -123.35},
  //     zoom: 12,
  //     streetViewControl: false,
  //     mapTypeControl: false
  //   });
  // }
};

app.initialize();

$(document).ready(function() {

  // setTimeout(function(){ app.initMap(); }, 200);
});
