

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
      busNumber = document.createTextNode(busList[bus].number);
      listElement.appendChild(busNumber);
    }
  }
};

app.initialize();

$(document).ready(function() {
  setTimeout(function(){ app.initMap(); }, 200);
});
